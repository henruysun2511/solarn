"use client";

import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";
import { ScheduleTemplateSortBy, SortOrder } from "@/constants/sort";
import {
  useCreateTemplate,
  useDeleteTemplate,
  useGetTemplates,
  useUpdateTemplate,
} from "@/queries/useTemplateQuery";
import { ClassScheduleTemplate, ClassScheduleTemplateInput, ClassScheduleTemplateParams } from "@/schemas/template.schema";
import { handleError } from "@/utils/handleError";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./template-columns";
import { TemplateDialog } from "./template-dialog";
import { TemplateFilter } from "./template-filter";

export default function AdminScheduleTemplatePage() {
  const [params, setParams] = useState<ClassScheduleTemplateParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: ScheduleTemplateSortBy.TEMPLATE_NAME,
  });

  const { data, isLoading } = useGetTemplates(params);
  const createMutation = useCreateTemplate();
  const updateMutation = useUpdateTemplate();
  const deleteMutation = useDeleteTemplate();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ClassScheduleTemplate | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleAdd = () => {
    setEditingTemplate(null);
    setDialogOpen(true);
  };

  const handleEdit = (template: ClassScheduleTemplate) => {
    setEditingTemplate(template);
    setDialogOpen(true);
  };

  const handleDeleteTrigger = (id: string) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId, {
        onSuccess: (response: any) => {
          toast.success(response?.message || "Xóa lịch mẫu thành công");
          setConfirmOpen(false);
          setDeleteId(null);
        },
        onError: (error: any) => {
          handleError(error, "Không thể xóa lịch mẫu");
        }
      });
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleSubmit = async (formData: ClassScheduleTemplateInput) => {
    try {
      if (editingTemplate?.templateId) {
        await updateMutation.mutateAsync({
          id: editingTemplate.templateId,
          data: formData,
        }, {
          onSuccess: (response: any) => {
            toast.success(response?.message || "Cập nhật thành công");
            setDialogOpen(false);
          },
          onError: (error: any) => {
            handleError(error, "Cập nhật thất bại");
          }
        });
      } else {
        await createMutation.mutateAsync(formData, {
          onSuccess: (response: any) => {
            toast.success(response?.message || "Tạo mới thành công");
            setDialogOpen(false);
          },
          onError: (error: any) => {
            handleError(error, "Tạo mới thất bại");
          }
        });
      }
    } catch (error) {
      console.error("Submit failed", error);
    }
  };

  const templates = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  return (
    <div data-role="admin" className="flex flex-col gap-6 min-h-screen font-sans">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <AdminPageTitle
          title="Danh sách lịch mẫu"
          subtitle="Quản lý"
        />

        <Button
          onClick={handleAdd}
          className="bg-primary text-white px-6 h-11 rounded-xl font-black shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
        >
          <PlusIcon className="mr-2 size-4" />
          Thêm lịch mẫu
        </Button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <TemplateFilter
          onSearch={(val) => setParams((prev) => ({ ...prev, search: val, page: 1 }))}
          onFilterChange={(filters) => setParams((prev) => ({ ...prev, ...filters, page: 1 }))}
          onRowsPerPageChange={(val) => setParams((prev) => ({ ...prev, limit: val, page: 1 }))}
        />

        <div className="p-0">
          <DataTable
            columns={getColumns({
              onEdit: handleEdit,
              onDelete: handleDeleteTrigger,
            })}
            data={templates}
            loading={isLoading}
          />
        </div>

        <div className="p-8 border-t border-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <PaginationInfo
            page={params.page || 1}
            limit={params.limit || 10}
            totalItems={totalItems}
            currentLength={templates.length}
          />
          <DataPagination
            page={params.page!}
            totalPages={totalPages}
            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
          />
        </div>
      </div>

      <TemplateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={editingTemplate}
        loading={createMutation.isPending || updateMutation.isPending}
      />

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirmDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
