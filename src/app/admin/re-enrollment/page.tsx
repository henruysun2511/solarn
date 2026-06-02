"use client";

import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { SortOrder } from "@/constants/sort";
import {
  useGetReEnrollmentRequests,
  useProcessReEnrollmentRequest,
} from "@/queries/useRequestQuery";
import {
  ProcessReEnrollmentRequestInput,
  ReEnrollmentRequestParams,
} from "@/schemas/request.schema";
import { handleError } from "@/utils/handleError";
import { useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./re-enrollment-columns";
import { ReEnrollmentFilter } from "./re-enrollment-filter";
import { ReEnrollmentProcessDialog } from "./re-enrollment-process-dialog";
import { Request } from "@/schemas/request.schema";

export default function AdminReEnrollmentPage() {
  const [params, setParams] = useState<ReEnrollmentRequestParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: "createdAt",
  });
  const [processingId, setProcessingId] = useState<string | null>(null);

  const { data, isLoading } = useGetReEnrollmentRequests(params);
  const processMutation = useProcessReEnrollmentRequest();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [dialogMode, setDialogMode] = useState(true);

  const handleApprove = async (requestId: string) => {
    const record = data?.data?.find((r: Request) => r.requestId === requestId);
    if (record) {
      setSelectedRequest(record);
      setDialogMode(true);
      setDialogOpen(true);
    }
  };

  const handleReject = async (requestId: string) => {
    const record = data?.data?.find((r: Request) => r.requestId === requestId);
    if (record) {
      setSelectedRequest(record);
      setDialogMode(false);
      setDialogOpen(true);
    }
  };

  const handleProcessSubmit = async (data: ProcessReEnrollmentRequestInput) => {
    if (!selectedRequest?.requestId) return;
    setProcessingId(selectedRequest.requestId);
    try {
      await processMutation.mutateAsync(
        { requestId: selectedRequest.requestId, data },
        {
          onSuccess: (response: any) => {
            toast.success(response?.message || "Xử lý yêu cầu thành công");
            setDialogOpen(false);
            setSelectedRequest(null);
          },
          onError: (error: any) => {
            handleError(error, "Không thể xử lý yêu cầu");
          },
        }
      );
    } catch (error) {
      console.error("Process failed", error);
    } finally {
      setProcessingId(null);
    }
  };

  const requests = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  return (
    <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <AdminPageTitle
          title="Yêu cầu tái nhập học"
          subtitle="Quản lý"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <ReEnrollmentFilter
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

        <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <PaginationInfo
            page={params.page || 1}
            limit={params.limit || 10}
            totalItems={totalItems}
            currentLength={requests.length}
          />
          <DataPagination
            page={params.page!}
            totalPages={totalPages}
            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
          />
        </div>
      </div>

      <ReEnrollmentProcessDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleProcessSubmit}
        loading={processMutation.isPending}
        defaultIsSuccess={dialogMode}
        selectedRequest={selectedRequest}
      />
    </div>
  );
}
