"use client";

import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BlogSortBy, SortOrder } from "@/constants/sort";
import {
  useCreateBlog,
  useDeleteBlog,
  useGetBlogs,
  useUpdateBlog,
} from "@/queries/useBlogQuery";
import { Blog, BlogInput, BlogParams } from "@/schemas/blog.schema";
import { formatDate } from "@/utils/format";
import { handleError } from "@/utils/handleError";
import { NewspaperIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./blog-columns";
import { BlogDialog } from "./blog-dialog";
import { BlogFilter } from "./blog-filter";

export default function AdminBlogPage() {
  const [params, setParams] = useState<BlogParams>({
    page: 1, limit: 10, sortOrder: SortOrder.DESC, sortBy: BlogSortBy.CREATED_AT,
  });

  const { data, isLoading } = useGetBlogs(params);
  const createMutation = useCreateBlog();
  const updateMutation = useUpdateBlog();
  const deleteMutation = useDeleteBlog();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [viewingBlog, setViewingBlog] = useState<Blog | null>(null);

  const handleAdd = () => { setEditingBlog(null); setDialogOpen(true); };
  const handleEdit = (blog: Blog) => { setEditingBlog(blog); setDialogOpen(true); };
  const handleView = (blog: Blog) => { setViewingBlog(blog); setDetailOpen(true); };
  const handleDeleteTrigger = (id: string) => { setDeleteId(id); setConfirmOpen(true); };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId, {
        onSuccess: (response: any) => { toast.success(response?.message || "Xóa bài viết thành công"); setConfirmOpen(false); setDeleteId(null); },
        onError: (error: any) => { handleError(error, "Không thể xóa bài viết"); },
      });
    } catch (error) { console.error("Delete failed", error); }
  };

  const handleSubmit = async (formData: BlogInput) => {
    try {
      if (editingBlog?.blogId) {
        await updateMutation.mutateAsync({ id: editingBlog.blogId, data: formData }, {
          onSuccess: (response: any) => { toast.success(response?.message || "Cập nhật thành công"); setDialogOpen(false); },
          onError: (error: any) => { handleError(error, "Cập nhật thất bại"); },
        });
      } else {
        await createMutation.mutateAsync(formData, {
          onSuccess: (response: any) => { toast.success(response?.message || "Tạo mới thành công"); setDialogOpen(false); },
          onError: (error: any) => { handleError(error, "Tạo mới thất bại"); },
        });
      }
    } catch (error) { console.error("Submit failed", error); }
  };

  const blogs = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  const columns = getColumns({ onEdit: handleEdit, onDelete: handleDeleteTrigger, onView: handleView });

  return (
    <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <AdminPageTitle title="Quản lý Blog" subtitle="Bài viết" />
        <Button onClick={handleAdd} className="bg-primary text-white px-6 h-11 rounded-md font-semibold">
          <PlusIcon className="mr-2 size-4" /> Thêm bài viết
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <BlogFilter
          onSearch={(val) => setParams((prev) => ({ ...prev, search: val, page: 1 }))}
          onFilterChange={(filters) => setParams((prev) => ({ ...prev, ...filters, page: 1 }))}
          onRowsPerPageChange={(val) => setParams((prev) => ({ ...prev, limit: val, page: 1 }))}
        />
        <div className="p-0">
          <DataTable columns={columns} data={blogs} loading={isLoading} />
        </div>
        <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <PaginationInfo page={params.page || 1} limit={params.limit || 10} totalItems={totalItems} currentLength={blogs.length} />
          <DataPagination page={params.page!} totalPages={totalPages} onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))} />
        </div>
      </div>

      <BlogDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleSubmit} initialData={editingBlog} loading={createMutation.isPending || updateMutation.isPending} />
      <ConfirmDialog open={confirmOpen} onOpenChange={setConfirmOpen} onConfirm={handleConfirmDelete} loading={deleteMutation.isPending} />
      <DetailDialog open={detailOpen} onOpenChange={setDetailOpen} blog={viewingBlog} />
    </div>
  );
}

function DetailDialog({ open, onOpenChange, blog }: { open: boolean; onOpenChange: (v: boolean) => void; blog: Blog | null }) {
  const [tab, setTab] = useState<"preview" | "html">("preview");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-role="admin" className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-0 font-sans">
        <DialogHeader className="p-8 bg-white border-b border-gray-50">
          <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
            <NewspaperIcon className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tighter text-gray-900">{blog?.title}</DialogTitle>
          <DialogDescription className="text-gray-400 font-medium">
            {blog?.author && `Tác giả: ${blog.author}  •  `}{blog?.publishedAt ? `Xuất bản: ${formatDate(blog.publishedAt)}` : "Chưa xuất bản"}
          </DialogDescription>
        </DialogHeader>
        <div className="p-8 space-y-6">
          {blog?.thumbnail && (
            <img src={blog.thumbnail} alt="" className="w-full rounded-2xl object-cover max-h-[300px]" />
          )}
          {blog?.excerpt && (
            <p className="text-gray-500 italic font-medium">{blog.excerpt}</p>
          )}
          <div className="flex gap-2 border-b border-gray-100 pb-2">
            <button onClick={() => setTab("preview")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${tab === "preview" ? "bg-primary/10 text-primary" : "text-gray-400 hover:text-gray-600"}`}>Xem trước</button>
            <button onClick={() => setTab("html")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${tab === "html" ? "bg-primary/10 text-primary" : "text-gray-400 hover:text-gray-600"}`}>HTML</button>
          </div>
          {tab === "preview" ? (
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: blog?.content || "" }} />
          ) : (
            <pre className="bg-gray-50 p-4 rounded-xl text-xs overflow-x-auto max-h-[400px]">{blog?.content}</pre>
          )}
        </div>
        <DialogFooter className="p-8 bg-white border-t border-gray-50">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="h-12 px-6 rounded-xl font-bold text-gray-400 hover:bg-gray-50">Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
