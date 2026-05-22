"use client";

import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";
import { SortOrder, StudyShiftSortBy } from "@/constants/sort";
import {
  useCreateShift,
  useDeleteShift,
  useGetShifts,
  useUpdateShift,
} from "@/queries/useShiftQuery";
import { StudyShift, StudyShiftInput, StudyShiftParams } from "@/schemas/shift.schema";
import { handleError } from "@/utils/handleError";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./shift-columns";
import { ShiftDialog } from "./shift-dialog";
import { ShiftFilter } from "./shift-filter";

export default function AdminStudyShiftPage() {
  const [params, setParams] = useState<StudyShiftParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: StudyShiftSortBy.SHIFT_CODE,
  });

  const { data, isLoading } = useGetShifts(params);
  const createMutation = useCreateShift();
  const updateMutation = useUpdateShift();
  const deleteMutation = useDeleteShift();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<StudyShift | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleAdd = () => {
    setEditingShift(null);
    setDialogOpen(true);
  };

  const handleEdit = (shift: StudyShift) => {
    setEditingShift(shift);
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
          toast.success(response?.message || "Xóa ca học thành công");
          setConfirmOpen(false);
          setDeleteId(null);
        },
        onError: (error: any) => {
          handleError(error, "Không thể xóa ca học");
        }
      });
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleSubmit = async (formData: StudyShiftInput) => {
    console.log("Submit called with data:", formData);
    console.log("Editing shift:", editingShift);
    try {
      if (editingShift?.shiftId) {
        await updateMutation.mutateAsync({
          id: editingShift.shiftId,
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

  const shifts = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  return (
    <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <AdminPageTitle
          title="Danh sách ca học"
          subtitle="Quản lý"
        />

        <Button
          onClick={handleAdd}
          className="bg-primary text-white px-6 h-11 rounded-md font-semibold"
        >
          <PlusIcon className="mr-2 size-4" />
          Thêm ca học
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <ShiftFilter
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
            data={shifts}
            loading={isLoading}
          />
        </div>

        <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <PaginationInfo
            page={params.page || 1}
            limit={params.limit || 10}
            totalItems={totalItems}
            currentLength={shifts.length}
          />
          <DataPagination
            page={params.page!}
            totalPages={totalPages}
            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
          />
        </div>
      </div>

      <ShiftDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={editingShift}
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
