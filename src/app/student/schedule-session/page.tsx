"use client";

import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { DataPagination } from "@/components/common/data-pagination";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SortOrder, ScheduleSessionSortBy } from "@/constants/sort";
import { useGetScheduleSessions } from "@/queries/useScheduleSessionQuery";
import { useGetMyEnrolledClasses } from "@/queries/useClassQuery";
import { useGetShifts } from "@/queries/useShiftQuery";
import { ScheduleSessionParams } from "@/schemas/schedule-session.schema";
import { ListIcon, CalendarDays } from "lucide-react";
import { useMemo, useState } from "react";
import { getColumns } from "./schedule-session-columns";
import { ScheduleSessionFilter } from "./schedule-session-filter";
import { ScheduleSessionCalendar } from "@/app/teacher/schedule-session/schedule-session-calendar-view";

export default function StudentScheduleSessionPage() {
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [params, setParams] = useState<ScheduleSessionParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: ScheduleSessionSortBy.STUDY_DATE,
  });

  const { data, isLoading } = useGetScheduleSessions(params);

  const { data: myClassesData } = useGetMyEnrolledClasses({ page: 1, limit: 100 });
  const myClasses = useMemo(() => (myClassesData?.data || []).map((c: any) => ({
    ...c,
    classCode: c.course?.courseName
      ? `${c.course.courseName} (${c.roomCode})`
      : c.classId?.substring(0, 8),
  })), [myClassesData]);

  const { data: shiftsResponse } = useGetShifts();
  const shiftsList = shiftsResponse?.data || [];

  const sessions = data?.data || [];
  const totalItems = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / (params.limit || 10));

  const handleFilterChange = (newFilters: Partial<ScheduleSessionParams>) => {
    setParams((prev) => ({ ...prev, ...newFilters }));
  };

  const columns = getColumns();

  return (
    <div data-role="student" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
          Quản lý
        </p>
        <div className="flex items-center gap-3">
          <div className="bg-[var(--accent)] p-2.5 rounded-2xl">
            <CalendarDays className="size-5 text-[var(--primary)]" />
          </div>
          <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
            Lịch học
          </h1>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 self-start md:self-auto mb-4">
        <Button
          size="sm"
          variant={viewMode === "table" ? "outline" : "ghost"}
          onClick={() => setViewMode("table")}
          className={`rounded-xl font-bold h-9 px-4 flex items-center gap-2 ${
            viewMode === "table" ? "shadow-sm border border-gray-100 text-primary" : "text-gray-500"
          }`}
        >
          <ListIcon className="size-4" />
          <span>Dạng bảng</span>
        </Button>
        <Button
          size="sm"
          variant={viewMode === "calendar" ? "outline" : "ghost"}
          onClick={() => setViewMode("calendar")}
          className={`rounded-xl font-bold h-9 px-4 flex items-center gap-2 ${
            viewMode === "calendar" ? "shadow-sm border border-gray-100 text-primary" : "text-gray-500"
          }`}
        >
          <CalendarDays className="size-4" />
          <span>Lịch tuần</span>
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <ScheduleSessionFilter
          params={params}
          classes={myClasses}
          shifts={shiftsList}
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
          <div>
            {viewMode === "table" && (
              <div className="overflow-x-auto">
                <DataTable columns={columns} data={sessions} />
              </div>
            )}

            {viewMode === "calendar" && (
              <div className="p-5">
                <ScheduleSessionCalendar
                  sessions={sessions}
                  onSessionClick={() => {}}
                />
              </div>
            )}

            {sessions.length === 0 && (
              <div className="py-20 text-center font-medium text-gray-400 italic">
                Không tìm thấy dữ liệu ca học nào phù hợp.
              </div>
            )}
          </div>
        )}

        {!isLoading && viewMode === "table" && sessions.length > 0 && (
          <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <PaginationInfo
              page={params.page || 1}
              limit={params.limit || 10}
              totalItems={totalItems}
              currentLength={sessions.length}
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
