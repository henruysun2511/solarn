"use client";

import { DataTable } from "@/components/common/data-table";
import { useGetAttendanceBySession } from "@/queries/useAttendanceQuery";
import { AttendanceRecord } from "@/schemas/attendance.schema";
import { CheckCircle2, Clock, Users, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { getColumns } from "./attendance-columns";
import { AttendanceFilter } from "./attendance-filter";

export default function AdminAttendancePage() {
  const [courseId, setCourseId] = useState("");
  const [classId, setClassId] = useState("");
  const [sessionId, setSessionId] = useState("");

  const { data: attendanceData, isLoading } = useGetAttendanceBySession(sessionId);
  const records = useMemo(() => {
    if (!attendanceData?.records) return [];
    return attendanceData.records as AttendanceRecord[];
  }, [attendanceData]);

  const summary = attendanceData?.summary;

  const handleFilterChange = (filters: { courseId?: string; classId?: string; sessionId?: string }) => {
    if (filters.courseId !== undefined) setCourseId(filters.courseId);
    if (filters.classId !== undefined) setClassId(filters.classId);
    if (filters.sessionId !== undefined) setSessionId(filters.sessionId);
  };

  return (
    <div className="flex flex-col gap-6 min-h-screen">
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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <AttendanceFilter
          courseId={courseId}
          classId={classId}
          sessionId={sessionId}
          onFilterChange={handleFilterChange}
        />

        {!sessionId ? (
          <div className="py-20 text-center font-medium text-gray-400 italic">
            Vui lòng chọn khóa học, lớp và buổi học để xem điểm danh.
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            {summary && (
              <div className="p-5 border-b border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="size-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-green-600">Có mặt</p>
                    <p className="text-2xl font-black text-green-700">{summary.present}</p>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Clock className="size-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-amber-600">Đi muộn</p>
                    <p className="text-2xl font-black text-amber-700">{summary.late}</p>
                  </div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <XCircle className="size-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-red-600">Vắng</p>
                    <p className="text-2xl font-black text-red-700">{summary.absent}</p>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Users className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-blue-600">Tổng</p>
                    <p className="text-2xl font-black text-blue-700">{summary.total}</p>
                  </div>
                </div>
              </div>
            )}

            <DataTable
              columns={getColumns()}
              data={records}
              loading={isLoading}
            />
          </>
        )}
      </div>
    </div>
  );
}
