"use client";

import { DataPagination } from "@/components/admin/pagination/data-pagination";
import { DataTable } from "@/components/admin/table/data-table";
import { Button } from "@/components/ui/button";
import { BranchSortBy, SortOrder } from "@/constants/sort";
import {
  useCreateBranch,
  useDeleteBranch,
  useGetBranches,
  useUpdateBranch,
} from "@/queries/useBranchQuery";
import { Branch, BranchInput, BranchParams } from "@/schemas/branch.schema";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { getColumns } from "./branch-columns";
import { BranchDialog } from "./branch-dialog";
import { BranchFilter } from "./branch-filter";

export default function AdminBranchPage() {
  const [params, setParams] = useState<BranchParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: BranchSortBy.CREATED_AT,
  });

  const { data, isLoading } = useGetBranches(params);
  const createMutation = useCreateBranch();
  const updateMutation = useUpdateBranch();
  const deleteMutation = useDeleteBranch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

  const handleAdd = () => {
    setEditingBranch(null);
    setDialogOpen(true);
  };

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa chi nhánh này?")) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  const handleSubmit = async (formData: BranchInput) => {
    try {
      if (editingBranch?.branchId) {
        await updateMutation.mutateAsync({
          id: editingBranch.branchId,
          data: formData,
        });
      } else {
        await createMutation.mutateAsync(formData);
      }
      setDialogOpen(false);
    } catch (error) {
      console.error("Submit failed", error);
    }
  };


  const branches = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  return (
    <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
            Quản lý
          </p>
          <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
            Danh sách chi nhánh
          </h1>
        </div>

        <Button
          onClick={handleAdd}
          className="bg-primary text-white px-6 h-11 rounded-md font-semibold"
        >
          <PlusIcon className="mr-2 size-4" />
          Thêm chi nhánh
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <BranchFilter
          onSearch={(val) => setParams((prev) => ({ ...prev, search: val, page: 1 }))}
          onFilterChange={(filters) => setParams((prev) => ({ ...prev, ...filters, page: 1 }))}
          onRowsPerPageChange={(val) => setParams((prev) => ({ ...prev, limit: val, page: 1 }))}
        />

        <div className="p-0">
          <DataTable
            columns={getColumns({
              onEdit: handleEdit,
              onDelete: handleDelete,
            })}
            data={branches}
            loading={isLoading}
          />
        </div>

        <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-gray-500">
            Hiển thị {branches.length > 0 ? (params.page! - 1) * params.limit! + 1 : 0} đến{" "}
            {Math.min(params.page! * params.limit!, totalItems)} trong tổng số{" "}
            {totalItems} bản ghi
          </p>
          <DataPagination
            page={params.page!}
            totalPages={totalPages}
            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
          />
        </div>
      </div>

      <BranchDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={editingBranch}
        loading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
