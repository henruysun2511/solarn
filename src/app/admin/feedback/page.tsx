"use client";

import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { SortOrder } from "@/constants/sort";
import { useGetFeedbacks, useUpdateFeedbackIsFeatured } from "@/queries/useFeedbackQuery";
import { FeedbackParams } from "@/schemas/feedback.schema";
import { useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./feedback-columns";
import { FeedbackFilter } from "./feedback-filter";

export default function AdminFeedbackPage() {
  const [params, setParams] = useState<FeedbackParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: "createdAt",
  });

  const { data, isLoading } = useGetFeedbacks(params);
  const updateFeatured = useUpdateFeedbackIsFeatured();

  const feedbacks = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  const toggleFeatured = async (feedbackId: string, isFeatured: boolean) => {
    try {
      await updateFeatured.mutateAsync({ feedbackId, isFeatured });
      toast.success(isFeatured ? "Đã bật hiển thị lên trang chủ" : "Đã tắt hiển thị");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Cập nhật thất bại!");
    }
  };

  return (
    <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <AdminPageTitle title="Đánh giá" subtitle="Quản lý" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <FeedbackFilter
          onSearch={(val) => setParams((prev) => ({ ...prev, search: val, page: 1 }))}
          onFilterChange={(filters) => setParams((prev) => ({ ...prev, ...filters, page: 1 }))}
          onRowsPerPageChange={(val) => setParams((prev) => ({ ...prev, limit: val, page: 1 }))}
        />

        <div className="p-0">
          <DataTable
            columns={getColumns({ toggleFeatured })}
            data={feedbacks}
            loading={isLoading}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-t border-gray-200">
          <PaginationInfo
            page={Number(params.page) || 1}
            limit={Number(params.limit!) || 10}
            totalItems={totalItems}
            currentLength={feedbacks.length}
          />
          <DataPagination
            page={Number(params.page!)}
            totalPages={totalPages}
            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
          />
        </div>
      </div>
    </div>
  );
}
