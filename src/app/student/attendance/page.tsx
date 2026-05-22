"use client";

import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { DataPagination } from "@/components/common/data-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { SortOrder } from "@/constants/sort";
import { MyAttendanceParams } from "@/schemas/attendance.schema";
import { useGetMyAttendances } from "@/queries/useAttendanceQuery";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { getAttendanceColumns } from "./attendance-columns";
import { AttendanceFilter } from "./attendance-filter";

export default function StudentAttendancePage() {
  const [params, setParams] = useState<MyAttendanceParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: "studyDate",
  });

  const { data, isLoading } = useGetMyAttendances(params);

  const records = data?.data || [];
  const totalItems = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / (params.limit || 10));

  const handleFilterChange = (newFilters: Partial<MyAttendanceParams>) => {
    setParams((prev) => ({ ...prev, ...newFilters }));
  };

  const columns = getAttendanceColumns();

  return (
    <div data-role="student" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
          Theo dõi
        </p>
        <div className="flex items-center gap-3">
          <div className="bg-[var(--accent)] p-2.5 rounded-2xl">
            <CalendarDays className="size-5 text-[var(--primary)]" />
          </div>
          <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
            Lịch sử điểm danh
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <AttendanceFilter
          params={params}
          onFilterChange={handleFilterChange}
          onRowsPerPageChange={(limit) => handleFilterChange({ limit, page: 1 })}
        />

        {isLoading ? (
          <div className="p-10 space-y-4">
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <DataTable columns={columns} data={records} />
          </div>
        )}

        {!isLoading && records.length === 0 && (
          <div className="py-20 text-center font-medium text-gray-400 italic">
            Không có dữ liệu điểm danh nào.
          </div>
        )}

        {!isLoading && records.length > 0 && (
          <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <PaginationInfo
              page={params.page || 1}
              limit={params.limit || 10}
              totalItems={totalItems}
              currentLength={records.length}
              label="bản ghi"
            />
            <DataPagination
              page={params.page!}
              totalPages={totalPages}
              onPageChange={(p) => handleFilterChange({ page: p })}
            />
          </div>
        )}
      </div>
    </div>
  );
}
