"use client";

import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";
import { AccountSortBy, SortOrder } from "@/constants/sort";
import { AccountStatus } from "@/constants/status";
import {
  useChangeAccountStatus,
  useCreateAccount,
  useGetAccounts,
} from "@/queries/useAccountQuery";
import { AccountInput, AccountParams } from "@/schemas/account.schema";
import { handleError } from "@/utils/handleError";
import { UserPlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./account-columns";
import { AccountDialog } from "./account-dialog";
import { AccountFilter } from "./account-filter";

export default function AdminAccountPage() {
  const [params, setParams] = useState<AccountParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: AccountSortBy.CREATED_AT,
  });

  const { data, isLoading } = useGetAccounts(params);
  const createMutation = useCreateAccount();
  const changeStatusMutation = useChangeAccountStatus();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusChangeId, setStatusChangeId] = useState<{ id: string; status: AccountStatus } | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleAdd = () => {
    setDialogOpen(true);
  };

  const handleStatusChangeTrigger = (id: string, status: AccountStatus) => {
    setStatusChangeId({ id, status });
    setConfirmOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!statusChangeId) return;
    try {
      await changeStatusMutation.mutateAsync(statusChangeId, {
        onSuccess: (response: any) => {
          toast.success(response?.message || "Cập nhật trạng thái thành công");
          setConfirmOpen(false);
          setStatusChangeId(null);
        },
        onError: (error: any) => {
          handleError(error, "Không thể cập nhật trạng thái");
        }
      });
    } catch (error) {
      console.error("Status change failed", error);
    }
  };

  const handleSubmit = async (formData: AccountInput) => {
    try {
      await createMutation.mutateAsync(formData, {
        onSuccess: (response: any) => {
          toast.success(response?.message || "Tạo tài khoản thành công");
          setDialogOpen(false);
        },
        onError: (error: any) => {
          handleError(error, "Tạo tài khoản thất bại");
        }
      });
    } catch (error) {
      console.error("Submit failed", error);
    }
  };

  const accounts = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  return (
    <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <AdminPageTitle
          title="Quản trị tài khoản"
          subtitle="Hệ thống"
        />

        <Button
          onClick={handleAdd}
          className="bg-primary text-white px-6 h-11 rounded-md font-semibold"
        >
          <UserPlusIcon className="mr-2 size-4" />
          Thêm tài khoản
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <AccountFilter
          onSearch={(val) => setParams((prev) => ({ ...prev, search: val, page: 1 }))}
          onFilterChange={(filters) => setParams((prev) => ({ ...prev, ...filters, page: 1 }))}
          onRowsPerPageChange={(val) => setParams((prev) => ({ ...prev, limit: val, page: 1 }))}
        />

        <div className="p-0">
          <DataTable
            columns={getColumns({
              onChangeStatus: handleStatusChangeTrigger,
            })}
            data={accounts}
            loading={isLoading}
          />
        </div>

        <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <PaginationInfo
            page={params.page || 1}
            limit={params.limit || 10}
            totalItems={totalItems}
            currentLength={accounts.length}
          />
          <DataPagination
            page={params.page!}
            totalPages={totalPages}
            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
          />
        </div>
      </div>

      <AccountDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        loading={createMutation.isPending}
      />

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirmStatusChange}
        loading={changeStatusMutation.isPending}
        title="Xác nhận thay đổi trạng thái"
        description={`Bạn có chắc chắn muốn ${statusChangeId?.status === AccountStatus.ACTIVE ? "mở khóa" : "khóa"} tài khoản này không?`}
        buttonText="Cập nhật trạng thái"
      />
    </div>
  );
}
