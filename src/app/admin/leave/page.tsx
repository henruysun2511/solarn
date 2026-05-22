"use client";

import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { SortOrder } from "@/constants/sort";
import { useGetLeaveRequests, useProcessLeaveRequest } from "@/queries/useRequestQuery";
import { LeaveRequestParams } from "@/schemas/request.schema";
import { useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./leave-columns";
import { LeaveFilter } from "./leave-filter";

export default function AdminStudentLeavePage() {
  const [params, setParams] = useState<LeaveRequestParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: "createdAt",
  });
  const [processingId, setProcessingId] = useState<string | null>(null);

  const { data, isLoading } = useGetLeaveRequests(params);
  const processMutation = useProcessLeaveRequest();

  const requests = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  const handleApprove = async (requestId: string) => {
    setProcessingId(requestId);
    try {
      await processMutation.mutateAsync({ requestId, data: { isSuccess: true } });
      toast.success("Phê duyệt yêu cầu bảo lưu thành công!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Phê duyệt thất bại!");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (requestId: string) => {
    setProcessingId(requestId);
    try {
      await processMutation.mutateAsync({ requestId, data: { isSuccess: false } });
      toast.success("Đã từ chối yêu cầu bảo lưu!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Từ chối thất bại!");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <AdminPageTitle title="Xét duyệt bảo lưu" subtitle="Quản lý" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <LeaveFilter
          onSearch={(val) => setParams((prev) => ({ ...prev, search: val, page: 1 }))}
          onFilterChange={(filters) => setParams((prev) => ({ ...prev, ...filters, page: 1 }))}
          onRowsPerPageChange={(val) => setParams((prev) => ({ ...prev, limit: val, page: 1 }))}
        />

        <div className="p-0">
          <DataTable
            columns={getColumns({ onApprove: handleApprove, onReject: handleReject, processingId })}
            data={requests}
            loading={isLoading}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-t border-gray-200">
          <PaginationInfo
            page={Number(params.page) || 1}
            limit={Number(params.limit) || 10}
            totalItems={totalItems}
            currentLength={requests.length}
          />
          <DataPagination
            page={Number(params.page)!}
            totalPages={totalPages}
            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
          />
        </div>
      </div>
    </div>
  );
}
