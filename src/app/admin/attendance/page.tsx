"use client";

import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { ScheduleSessionSortBy, SortOrder } from "@/constants/sort";
import { AttendanceStatus } from "@/constants/type";
import { useGetClassesByCourseId } from "@/queries/useClassQuery";
import { useGetCourses } from "@/queries/useCourseQuery";
import { useGetScheduleSessions } from "@/queries/useScheduleSessionQuery";
import { useBulkUpsertAttendance, useGetAttendanceBySession } from "@/queries/useAttendanceQuery";
import { AttendanceRecord } from "@/schemas/attendance.schema";
import { handleError } from "@/utils/handleError";
import {
  CheckCircle2Icon,
  ClockIcon,
  Loader2Icon,
  SaveAllIcon,
  UsersIcon,
  XCircleIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./attendance-columns";
import { AttendanceFilter } from "./attendance-filter";

export default function AdminAttendancePage() {
  const [params, setParams] = useState<Record<string, any>>({
    page: 1,
    limit: 10,
    courseId: "",
    classId: "",
    shiftCode: "all",
    sessionId: "",
    search: "",
  });

  const { data: coursesData } = useGetCourses({ page: 1, limit: 100, sortOrder: SortOrder.ASC });
  const courses = coursesData?.data || [];

  const { data: classesData } = useGetClassesByCourseId(params.courseId, { page: 1, limit: 100 });
  const classes = classesData?.data || [];

  const { data: sessionsData } = useGetScheduleSessions(
    params.classId
      ? { classId: params.classId, page: 1, limit: 100, sortBy: ScheduleSessionSortBy.STUDY_DATE, sortOrder: SortOrder.DESC }
      : undefined
  );
  const allSessions = sessionsData?.data || [];

  const sessions = useMemo(() => {
    if (params.shiftCode === "all") return allSessions;
    return allSessions.filter((s: any) => s.shiftCode === params.shiftCode);
  }, [allSessions, params.shiftCode]);

  const { data: attendanceData, isLoading: isAttendanceLoading } = useGetAttendanceBySession(params.sessionId);
  const records = useMemo(() => {
    if (!attendanceData?.records) return [];
    return attendanceData.records as AttendanceRecord[];
  }, [attendanceData]);

  const summary = attendanceData?.summary;

  const [attendanceValues, setAttendanceValues] = useState<Record<string, AttendanceStatus>>({});
  const [noteValues, setNoteValues] = useState<Record<string, string>>({});

  const handleFilterChange = (filters: Record<string, any>) => {
    setParams((prev) => ({ ...prev, ...filters }));
    if (filters.sessionId && filters.sessionId !== params.sessionId) {
      setAttendanceValues({});
      setNoteValues({});
    }
    if (filters.classId || filters.courseId) {
      setAttendanceValues({});
      setNoteValues({});
    }
  };

  const handleSearch = (val: string) => {
    setParams((prev) => ({ ...prev, search: val }));
  };

  const handleRowsPerPageChange = (val: number) => {
    setParams((prev) => ({ ...prev, limit: val }));
  };

  const handleAttendanceChange = (recordId: string, status: AttendanceStatus) => {
    setAttendanceValues((prev) => ({ ...prev, [recordId]: status }));
  };

  const handleNoteChange = (recordId: string, note: string) => {
    setNoteValues((prev) => ({ ...prev, [recordId]: note }));
  };



  const isSessionSelected = !!params.sessionId;

  return (
    <div className="flex flex-col gap-6 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
            Quản lý
          </p>
          <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
            Điểm danh
          </h1>
        </div>

      </div>

      {/* Filter & Content Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <AttendanceFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          courses={courses.map((c: any) => ({ courseId: c.courseId, courseName: c.courseName }))}
          selectedCourseId={params.courseId}
          classes={classes.map((c: any) => ({ classId: c.classId, classCode: c.classCode }))}
          selectedClassId={params.classId}
          sessions={sessions}
          selectedSessionId={params.sessionId}
          selectedShiftCode={params.shiftCode}
          shifts={Array.from(new Set(allSessions.map((s: any) => s.shiftCode))).map((code) => {
            const session = allSessions.find((s: any) => s.shiftCode === code);
            return { shiftCode: code as string, shiftName: (session as any)?.shift?.shiftName || (code as string) };
          })}
        />

        {/* Summary Cards */}
        {isSessionSelected && summary && (
          <div className="p-5 border-b border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle2Icon className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-green-600">Present</p>
                <p className="text-2xl font-black text-green-700">{summary.present}</p>
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <ClockIcon className="size-5 text-amber-600" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-amber-600">Late</p>
                <p className="text-2xl font-black text-amber-700">{summary.late}</p>
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-lg bg-red-100 flex items-center justify-center">
                <XCircleIcon className="size-5 text-red-600" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-red-600">Absent</p>
                <p className="text-2xl font-black text-red-700">{summary.absent}</p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <UsersIcon className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-blue-600">Total</p>
                <p className="text-2xl font-black text-blue-700">{summary.total}</p>
              </div>
            </div>
          </div>
        )}

        {/* Attendance Table using DataTable */}
        <DataTable
          columns={getColumns({
            attendanceValues,
            noteValues,
            onAttendanceChange: handleAttendanceChange,
            onNoteChange: handleNoteChange,
          })}
          data={records}
          loading={isAttendanceLoading}
        />
      </div>
    </div>
  );
}
