"use client";

import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { SortOrder } from "@/constants/sort";
import { useGetAssignmentResults } from "@/queries/useAssignmentResultQuery";
import { AssignmentResultParams } from "@/schemas/assignment-result.schema";
import { useState } from "react";
import { getColumns } from "./assignment-result-columns";
import { AssignmentResultFilter } from "./assignment-result-filter";

export default function AdminAssignmentResultPage() {
  const [params, setParams] = useState<AssignmentResultParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: "createdAt",
  });

  const { data, isLoading } = useGetAssignmentResults(params);

  const results = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  return (
    <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <AdminPageTitle title="Kết quả bài tập" subtitle="Quản lý" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <AssignmentResultFilter
          params={params}
          onFilterChange={(filters) => setParams((prev) => ({ ...prev, ...filters, page: 1 }))}
        />

        {!params.sessionId ? (
          <div className="py-20 text-center font-medium text-gray-400 italic">
            Vui lòng chọn khóa học, lớp và buổi học để xem kết quả.
          </div>
        ) : (
          <>
            <div className="p-0">
              <DataTable
                columns={getColumns()}
                data={results}
                loading={isLoading}
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-t border-gray-200">
              <PaginationInfo
                page={Number(params.page) || 1}
                limit={Number(params.limit!) || 10}
                totalItems={totalItems}
                currentLength={results.length}
              />
              <DataPagination
                page={Number(params.page!)}
                totalPages={totalPages}
                onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
