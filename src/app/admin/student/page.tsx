"use client";

import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";
import { SortOrder, StudentSortBy } from "@/constants/sort";
import { useGetStudents } from "@/queries/useStudentQuery";
import { StudentParams } from "@/schemas/student.schema";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { getColumns } from "./student-columns";
import { StudentFilter } from "./student-filter";

export default function AdminStudentPage() {
  const [params, setParams] = useState<StudentParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: StudentSortBy.NAME,
  });

  const { data, isLoading } = useGetStudents(params);

  const students = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  return (
    <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <AdminPageTitle
          title="Danh sách học sinh"
          subtitle="Quản lý"
        />

        <Button
          className="bg-primary text-white px-6 h-11 rounded-md font-semibold"
          disabled
        >
          <PlusIcon className="mr-2 size-4" />
          Thêm học sinh
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <StudentFilter
          onSearch={(val) => setParams((prev) => ({ ...prev, search: val, page: 1 }))}
          onFilterChange={(filters) => setParams((prev) => ({ ...prev, ...filters, page: 1 }))}
          onRowsPerPageChange={(val) => setParams((prev) => ({ ...prev, limit: val, page: 1 }))}
        />

        <div className="p-0">
          <DataTable
            columns={getColumns()}
            data={students}
            loading={isLoading}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-t border-gray-200">
           <PaginationInfo
            page={Number(params.page) || 1}
            limit={Number(params.limit) || 10}
            totalItems={totalItems}
            currentLength={students.length}
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