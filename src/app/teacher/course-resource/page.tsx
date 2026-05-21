"use client";

import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";
import { SortOrder } from "@/constants/sort";
import {
  useCreateCourseResource,
  useDeleteCourseResource,
  useGetCourseResources,
} from "@/queries/useCourseResourceQuery";
import { useGetMyClasses } from "@/queries/useClassQuery";
import { CourseResource, CourseResourceInput, CourseResourceParams } from "@/schemas/course-resource.schema";
import { handleError } from "@/utils/handleError";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./course-resource-columns";
import { CourseResourceDialog } from "./course-resource-dialog";
import { CourseResourceFilter } from "./course-resource-filter";

export default function TeacherCourseResourcePage() {
  const [params, setParams] = useState<CourseResourceParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: myClassesData } = useGetMyClasses({ page: 1, limit: 100 });
  const myClasses = useMemo(() => (myClassesData?.data || []).map((c: any) => ({
    courseId: c.course?.courseId || c.course?.couseId,
    displayName: c.course?.courseName
      ? `${c.course.courseName} (${c.roomCode})`
      : c.classId?.substring(0, 8),
  })), [myClassesData]);

  const { data, isLoading } = useGetCourseResources(params);
  const createMutation = useCreateCourseResource();
  const deleteMutation = useDeleteCourseResource();

  const resources = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  const activeCourseId = params.courseId || "";

  const handleSearch = (value: string) => {
    setParams((prev) => ({ ...prev, search: value || undefined, page: 1 }));
  };

  const handleFilterChange = (newFilters: Partial<CourseResourceParams>) => {
    setParams((prev) => ({ ...prev, ...newFilters }));
  };

  const handleDeleteTrigger = (id: string) => {
    setDeletingId(id);
    setConfirmOpen(true);
  };

  const handleSubmit = async (formData: CourseResourceInput) => {
    try {
      await createMutation.mutateAsync(formData);
      toast.success("Thêm tài nguyên thành công!");
      setDialogOpen(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success("Xóa tài nguyên thành công!");
      setConfirmOpen(false);
      setDeletingId(null);
    } catch (error) {
      handleError(error);
    }
  };

  const columns = getColumns({
    onDelete: handleDeleteTrigger,
  });

  return (
    <div data-role="teacher" className="w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col gap-6 min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter">Tài nguyên học tập</h1>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">Giáo viên</p>
          </div>

          <Button
            onClick={() => setDialogOpen(true)}
            disabled={!activeCourseId}
            className="h-11 px-5 rounded-2xl bg-[var(--primary)] text-white font-black shadow-lg shadow-[var(--primary)]/20 hover:opacity-95 text-sm gap-2"
          >
            <PlusIcon className="size-4" />
            Thêm tài nguyên
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <CourseResourceFilter
            classOptions={myClasses}
            selectedCourseId={activeCourseId}
            params={params}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onRowsPerPageChange={(limit) => handleFilterChange({ limit, page: 1 })}
          />

          <DataTable
            columns={columns}
            data={resources}
            loading={isLoading}
          />

          {resources.length > 0 && (
            <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <PaginationInfo
                page={Number(params.page || 1)}
                limit={Number(params.limit) || 10}
                totalItems={totalItems}
                currentLength={resources.length}
              />
              <DataPagination
                page={Number(params.page) || 1}
                totalPages={totalPages}
                onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
              />
            </div>
          )}
        </div>
      </div>

      <CourseResourceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        courseId={activeCourseId || undefined}
        loading={createMutation.isPending}
      />

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirmDelete}
        loading={deleteMutation.isPending}
        title="Xác nhận xóa tài nguyên"
        description="Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác."
      />
    </div>
  );
}
