"use client";

import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { DataPagination } from "@/components/common/data-pagination";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SortOrder, ScheduleSessionSortBy } from "@/constants/sort";
import { useGetScheduleSessions, useUpdateSessionStatus } from "@/queries/useScheduleSessionQuery";
import { useGetMyClasses } from "@/queries/useClassQuery";
import { useGetShifts } from "@/queries/useShiftQuery";
import { useCreateScheduleChangeRequest, useGetMyScheduleChanges } from "@/queries/useRequestQuery";
import { ScheduleChangeParams } from "@/schemas/request.schema";
import { ScheduleSession, ScheduleSessionParams } from "@/schemas/schedule-session.schema";
import { ListIcon, CalendarDays, ClockArrowUp } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./schedule-session-columns";
import { getScheduleChangeRequestColumns } from "./schedule-session-request-columns";
import { ScheduleSessionFilter } from "./schedule-session-filter";
import { ScheduleSessionCalendar } from "./schedule-session-calendar-view";
import { ScheduleChangeRequestDialog } from "./schedule-session-request-dialog";

type TabKey = "session" | "request";

export default function TeacherScheduleSessionPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("session");
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [params, setParams] = useState<ScheduleSessionParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: ScheduleSessionSortBy.STUDY_DATE,
  });
  const [requestParams, setRequestParams] = useState<ScheduleChangeParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: "createdAt",
  });
  const [requestSession, setRequestSession] = useState<ScheduleSession | null>(null);

  const { data, isLoading } = useGetScheduleSessions(params);
  const { data: requestData, isLoading: requestLoading } = useGetMyScheduleChanges(requestParams);

  const { data: myClassesData } = useGetMyClasses({ page: 1, limit: 100 });
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

  const requests = requestData?.data || [];
  const requestTotalItems = requestData?.meta?.total || 0;
  const requestTotalPages = Math.ceil(requestTotalItems / (requestParams.limit || 10));

  const scheduleChangeMutation = useCreateScheduleChangeRequest();

  const handleFilterChange = (newFilters: Partial<ScheduleSessionParams>) => {
    setParams((prev) => ({ ...prev, ...newFilters }));
  };

  const handleScheduleChangeClick = (session: ScheduleSession) => {
    setRequestSession(session);
  };

  const handleScheduleChangeSubmit = async (formData: {
    sessionId: string;
    proposedShiftCode: string;
    proposedStudyDate: string;
    reason: string;
  }) => {
    try {
      await scheduleChangeMutation.mutateAsync(formData);
      toast.success("Gửi yêu cầu dời lịch thành công!");
      setRequestSession(null);
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const columns = getColumns({
    onScheduleChange: handleScheduleChangeClick,
  });

  const requestColumns = getScheduleChangeRequestColumns();

  return (
    <div data-role="teacher" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
            Quản lý
          </p>
          <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
            Lịch học
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("session")}
          className={`px-6 py-3 text-sm font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
            activeTab === "session"
              ? "bg-white text-[var(--primary)] border border-b-white border-gray-200 -mb-px"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <CalendarDays className="size-4" />
          Lịch học
        </button>
        <button
          onClick={() => setActiveTab("request")}
          className={`px-6 py-3 text-sm font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
            activeTab === "request"
              ? "bg-white text-[var(--primary)] border border-b-white border-gray-200 -mb-px"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <ClockArrowUp className="size-4" />
          Yêu cầu dời lịch
        </button>
      </div>

      {/* Session Tab */}
      {activeTab === "session" && (
        <div>
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
                      onSessionClick={handleScheduleChangeClick}
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
      )}

      {/* Request Tab */}
      {activeTab === "request" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-0">
            <DataTable
              columns={requestColumns}
              data={requests}
              loading={requestLoading}
            />
          </div>

          {!requestLoading && requests.length === 0 && (
            <div className="py-20 text-center font-medium text-gray-400 italic">
              Không có yêu cầu dời lịch nào.
            </div>
          )}

          {!requestLoading && requests.length > 0 && (
            <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <PaginationInfo
                page={requestParams.page || 1}
                limit={requestParams.limit || 10}
                totalItems={requestTotalItems}
                currentLength={requests.length}
                label="yêu cầu"
              />
              <DataPagination
                page={requestParams.page!}
                totalPages={requestTotalPages}
                onPageChange={(p) =>
                  setRequestParams((prev) => ({ ...prev, page: p }))
                }
              />
            </div>
          )}
        </div>
      )}

      <ScheduleChangeRequestDialog
        session={requestSession}
        isOpen={!!requestSession}
        onClose={() => setRequestSession(null)}
        onSubmit={handleScheduleChangeSubmit}
        loading={scheduleChangeMutation.isPending}
      />
    </div>
  );
}
