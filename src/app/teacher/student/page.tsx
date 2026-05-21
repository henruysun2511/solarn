"use client";

import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { SortOrder, StudentSortBy } from "@/constants/sort";
import { useGetStudentsByClass } from "@/queries/useStudentQuery";
import { useGetMyClasses } from "@/queries/useClassQuery";
import { StudentParams } from "@/schemas/student.schema";
import { useMemo, useState } from "react";
import { getColumns } from "./student-columns";
import { StudentFilter } from "./student-filter";

export default function TeacherStudentPage() {
  const [params, setParams] = useState<StudentParams & { classId: string }>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: StudentSortBy.NAME,
    classId: "",
  });

  const { data: myClassesData } = useGetMyClasses({ page: 1, limit: 100 });
  const myClasses = useMemo(() => (myClassesData?.data || []).map((c: any) => ({
    classId: c.classId,
    displayName: c.course?.courseName
      ? `${c.course.courseName} (${c.roomCode})`
      : c.classId?.substring(0, 8),
  })), [myClassesData]);

  const queryParams = useMemo(() => {
    const { classId: _, ...rest } = params;
    return rest;
  }, [params]);

  const { data, isLoading } = useGetStudentsByClass(params.classId, queryParams);

  const students = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  const handleFilterChange = (filters: Partial<StudentParams & { classId: string }>) => {
    setParams((prev) => ({ ...prev, ...filters, page: 1 }));
  };

  const handleSearch = (val: string) => {
    setParams((prev) => ({ ...prev, search: val, page: 1 }));
  };

  return (
    <div data-role="teacher" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <AdminPageTitle
          title="Danh sách học sinh"
          subtitle="Quản lý"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <StudentFilter
          classOptions={myClasses}
          selectedClassId={params.classId}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
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
