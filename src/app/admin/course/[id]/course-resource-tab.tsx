"use client";

import { DataPagination } from "@/components/common/data-pagination";
import { Loading } from "@/components/common/loading";
import { PaginationInfo } from "@/components/common/pagination-info";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ResourceType } from "@/constants/type";
import {
  useCreateCourseResource,
  useDeleteCourseResource,
  useGetCourseResources,
} from "@/queries/useCourseResourceQuery";
import { CourseResourceInput } from "@/schemas/course-resource.schema";
import {
  BookOpen,
  ExternalLink,
  FileAudio,
  FileText,
  FileVideo,
  GridIcon,
  ListIcon,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CourseResourceDialog } from "./course-resource-dialog";

interface CourseResourceTabProps {
  courseId: string;
}

export function CourseResourceTab({ courseId }: CourseResourceTabProps) {
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    limit: 8,
  });

  const { data: resourceRes, isLoading } = useGetCourseResources({
    courseId,
    page: params.page || 1,
    limit: params.limit || 8,
    type: filterType === "ALL" ? undefined : (filterType as ResourceType),
  });

  const resources = resourceRes?.data || [];
  const totalItems = resources.length;
  const totalPages = Math.ceil(totalItems / params.limit);
  const paginatedResources = resources.slice(
    (params.page - 1) * params.limit,
    params.page * params.limit
  );
  const createResourceMutation = useCreateCourseResource();
  const deleteResourceMutation = useDeleteCourseResource();

  const handleCreateResource = (data: CourseResourceInput) => {
    createResourceMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Tải lên tài nguyên học tập mới thành công!");
        setDialogOpen(false);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Lưu tài nguyên thất bại!");
      },
    });
  };

  const handleDeleteTrigger = (resourceId: string) => {
    setDeleteId(resourceId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteResourceMutation.mutateAsync(deleteId, {
        onSuccess: () => {
          toast.success("Xóa tài nguyên học tập thành công!");
          setConfirmOpen(false);
          setDeleteId(null);
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || "Xóa tài nguyên thất bại!");
        },
      });
    } catch (error) {
      console.error("Delete resource failed", error);
    }
  };

  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case ResourceType.VIDEO:
        return <FileVideo className="size-5 text-red-500" />;
      case ResourceType.AUDIO:
        return <FileAudio className="size-5 text-blue-500" />;
      default:
        return <FileText className="size-5 text-emerald-600" />;
    }
  };

  return (
    <div data-role="admin" className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 font-sans">
      {/* Controls Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            Kho tài nguyên học trình
          </h3>
          <p className="text-gray-400 text-xs font-medium mt-0.5">
            Bài tập, slide bài giảng, video ghi âm hỗ trợ học viên tự học.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Select filter type */}
          <div className="w-full sm:w-48">
            <Select
              value={filterType}
              onValueChange={(val) => {
                setFilterType(val);
                setParams((prev) => ({ ...prev, page: 1 }));
              }}
            >
              <SelectTrigger data-role="admin" className="h-10 rounded-xl border-gray-200 bg-white text-xs font-semibold">
                <SelectValue placeholder="Lọc theo loại..." />
              </SelectTrigger>
              <SelectContent data-role="admin">
                <SelectItem value="ALL">Tất cả tài nguyên</SelectItem>
                <SelectItem value={ResourceType.DOCUMENT}>Tài liệu (PDF, DOC)</SelectItem>
                <SelectItem value={ResourceType.VIDEO}>Video (MP4, Youtube)</SelectItem>
                <SelectItem value={ResourceType.AUDIO}>Tệp âm thanh (MP3)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid/Table Switcher */}
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 p-1 rounded-xl w-max">
            <button
              onClick={() => setViewMode("card")}
              className={`p-1.5 rounded-lg transition-all ${viewMode === "card"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-400 hover:text-gray-600"
                }`}
              title="Xem dạng Card"
            >
              <GridIcon className="size-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-all ${viewMode === "table"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-400 hover:text-gray-600"
                }`}
              title="Xem dạng Table"
            >
              <ListIcon className="size-4" />
            </button>
          </div>

          {/* Add resource button */}
          <Button
            onClick={() => setDialogOpen(true)}
            className="rounded-xl font-black bg-primary h-10 px-5 text-white text-xs transition-all flex items-center gap-1.5"
          >
            <Plus className="size-4" /> Tải lên tài liệu mới
          </Button>
        </div>
      </div>


      {isLoading ? (
        <Loading message="Đang tải kho tài nguyên..." />
      ) : resources.length === 0 ? (
        <div className="bg-white rounded-[2rem] p-8 text-center py-12 border-2 border-dashed border-gray-100">
          <BookOpen className="size-8 text-gray-300 mx-auto mb-3" />
          <h4 className="font-black text-sm text-gray-900 tracking-tight">
            Chưa có tài nguyên nào được tải lên
          </h4>
          <p className="text-gray-450 text-[11px] font-medium mt-0.5 max-w-xs mx-auto">
            Học viên và giáo viên sẽ chưa xem được tài liệu tham khảo cho chuyên ngành này.
          </p>
        </div>
      ) : viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-200">
          {paginatedResources.map((res: any) => (
            <div
              key={res.resourceId}
              className="group p-5 rounded-2xl border border-gray-150 hover:border-primary/20 hover:bg-primary/5/10 transition-all cursor-pointer bg-white shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="size-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                    {getResourceIcon(res.type)}
                  </div>
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTrigger(res.resourceId);
                    }}
                    className="size-8 p-0 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>

                <div>
                  <h4 className="font-black text-gray-900 tracking-tight group-hover:text-primary transition-colors text-sm line-clamp-2">
                    {res.title}
                  </h4>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-gray-50 text-gray-500 text-[9px] font-black uppercase tracking-wider border border-gray-100">
                    {res.type}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-50 mt-4 pt-3 flex items-center justify-end">
                <a
                  href={res.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-wider hover:underline"
                >
                  Mở liên kết <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm animate-in fade-in duration-200">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400 pl-6 w-12">
                  Loại
                </TableHead>
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Tên tài nguyên học tập
                </TableHead>
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Liên kết tài nguyên (URL)
                </TableHead>
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400 text-right pr-6 w-20">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-50 bg-white">
              {paginatedResources.map((res: any) => (
                <TableRow key={res.resourceId} className="hover:bg-gray-50/20 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="size-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                      {getResourceIcon(res.type)}
                    </div>
                  </td>
                  <td className="p-4 text-xs font-black text-gray-900 max-w-xs truncate">
                    {res.title}
                  </td>
                  <td className="p-4 text-xs text-gray-500 font-medium">
                    <a
                      href={res.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1 w-64 truncate"
                    >
                      {res.fileUrl} <ExternalLink className="size-3 shrink-0" />
                    </a>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteTrigger(res.resourceId)}
                      className="size-8 p-0 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* 4. FOOTER PAGINATION */}
      {!isLoading && resources.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <PaginationInfo
            page={params.page}
            limit={params.limit}
            totalItems={totalItems}
            currentLength={paginatedResources.length}
          />
          <DataPagination
            page={params.page}
            totalPages={totalPages}
            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
          />
        </div>
      )}

      {/* Creation Resource Dialog Modal */}
      <CourseResourceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreateResource}
        courseId={courseId}
        loading={createResourceMutation.isPending}
      />

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirmDelete}
        loading={deleteResourceMutation.isPending}
      />
    </div>
  );
}
