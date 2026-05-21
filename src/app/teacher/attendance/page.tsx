"use client";

import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { AttendanceStatus, ClassSessionStatus } from "@/constants/type";
import { ScheduleSessionSortBy, SortOrder } from "@/constants/sort";
import { useGetMyClasses } from "@/queries/useClassQuery";
import { useGetScheduleSessionsByClass, useUpdateSessionStatus } from "@/queries/useScheduleSessionQuery";
import { useGetAttendanceBySession, useBulkUpsertAttendance } from "@/queries/useAttendanceQuery";
import { AttendanceRecord } from "@/schemas/attendance.schema";
import { handleError } from "@/utils/handleError";
import {
  CheckCircle2Icon,
  ClockIcon,
  PlayIcon,
  SaveAllIcon,
  Users,
  XCircleIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./attendance-columns";
import { AttendanceFilter } from "./attendance-filter";

export default function TeacherAttendancePage() {
  const [params, setParams] = useState<Record<string, any>>({
    classId: "",
    sessionId: "",
    search: "",
  });

  const [attendanceValues, setAttendanceValues] = useState<Record<string, AttendanceStatus>>({});
  const [noteValues, setNoteValues] = useState<Record<string, string>>({});
  const [startDialogOpen, setStartDialogOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const { data: myClassesData } = useGetMyClasses({ page: 1, limit: 100 });
  const classOptions = useMemo(() => {
    return (myClassesData?.data || []).map((c: any) => ({
      classId: c.classId,
      displayName: c.course?.courseName
        ? `${c.course.courseName} (${c.roomCode})`
        : c.classId?.substring(0, 8),
    }));
  }, [myClassesData]);

  const { data: sessionsData } = useGetScheduleSessionsByClass(params.classId, {
    page: 1,
    limit: 100,
    sortBy: ScheduleSessionSortBy.STUDY_DATE,
    sortOrder: SortOrder.DESC,
  });
  const sessions = sessionsData?.data || [];

  const selectedSession = useMemo(() => {
    return sessions.find((s: any) => s.sessionId === params.sessionId) || null;
  }, [sessions, params.sessionId]);

  const { data: attendanceData, isLoading: isAttendanceLoading, refetch: refetchAttendance } = useGetAttendanceBySession(
    params.sessionId && selectedSession?.status !== ClassSessionStatus.NOT_STARTED ? params.sessionId : ""
  );
  const records = useMemo(() => {
    if (!attendanceData?.records) return [];
    return attendanceData.records as AttendanceRecord[];
  }, [attendanceData]);

  const summary = attendanceData?.summary;

  const bulkUpsertMutation = useBulkUpsertAttendance();
  const updateStatusMutation = useUpdateSessionStatus();

  const filteredRecords = useMemo(() => {
    if (!params.search) return records;
    const q = params.search.toLowerCase();
    return records.filter(
      (r: AttendanceRecord) =>
        r.student.studentCode.toLowerCase().includes(q) ||
        r.student?.profile?.fullName?.toLowerCase().includes(q)
    );
  }, [records, params.search]);

  const isEnded = selectedSession?.status === ClassSessionStatus.ENDED;
  const isInProgress = selectedSession?.status === ClassSessionStatus.IN_PROGRESS;
  const isNotStarted = selectedSession?.status === ClassSessionStatus.NOT_STARTED;
  const isSessionSelected = !!params.sessionId && selectedSession?.status !== ClassSessionStatus.NOT_STARTED;

  const handleFilterChange = (filters: Record<string, any>) => {
    setParams((prev) => ({ ...prev, ...filters }));
    if (filters.sessionId || filters.classId) {
      setAttendanceValues({});
      setNoteValues({});
    }
  };

  const handleSearch = (val: string) => {
    setParams((prev) => ({ ...prev, search: val }));
  };

  const handleAttendanceChange = (recordId: string, status: AttendanceStatus) => {
    setAttendanceValues((prev) => ({ ...prev, [recordId]: status }));
  };

  const handleNoteChange = (recordId: string, note: string) => {
    setNoteValues((prev) => ({ ...prev, [recordId]: note }));
  };

  const handleStartSession = () => {
    if (!params.sessionId) return;
    updateStatusMutation.mutate(
      { id: params.sessionId, data: { status: ClassSessionStatus.IN_PROGRESS } },
      {
        onSuccess: () => {
          toast.success("Bắt đầu buổi học thành công");
          setStartDialogOpen(false);
          refetchAttendance();
        },
        onError: (error: any) => {
          handleError(error, "Không thể bắt đầu buổi học");
        },
      }
    );
  };

  const handleSaveAttendance = async () => {
    if (!params.sessionId || records.length === 0) return;
    try {
      const bulkData = records.map((r: AttendanceRecord) => {
        const recordId = r.attendanceId || r.studentId;
        return {
          sessionId: params.sessionId,
          studentId: r.studentId,
          status: attendanceValues[recordId] || r.status,
          note: noteValues[recordId] !== undefined ? noteValues[recordId] : r.note || undefined,
        };
      });

      await bulkUpsertMutation.mutateAsync(bulkData, {
        onSuccess: () => {
          toast.success("Lưu điểm danh thành công");
          setSaveDialogOpen(false);
          updateStatusMutation.mutate(
            { id: params.sessionId, data: { status: ClassSessionStatus.ENDED } },
            {
              onSuccess: () => {
                toast.success("Kết thúc buổi học");
                setAttendanceValues({});
                setNoteValues({});
              },
              onError: (error: any) => {
                handleError(error, "Không thể kết thúc buổi học");
              },
            }
          );
        },
        onError: (error: any) => {
          handleError(error, "Không thể lưu điểm danh");
        },
      });
    } catch (error) {
      console.error("Save failed", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 min-h-screen pb-10 w-full max-w-full overflow-x-hidden">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
            Quản lý
          </p>
          <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
            Điểm danh lớp học
          </h1>
        </div>
        <div className="flex gap-3">
          {isInProgress && (
            <Button
              onClick={() => setSaveDialogOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 h-12 rounded-2xl font-black shadow-lg shadow-red-100"
              disabled={updateStatusMutation.isPending}
            >
              <SaveAllIcon className="mr-2 size-4" />
              Lưu điểm danh
            </Button>
          )}
          {isNotStarted && (
            <Button
              onClick={() => setStartDialogOpen(true)}
              className="bg-primary hover:bg-primary/80 text-white px-8 h-12 rounded-2xl font-black shadow-lg shadow-primary/20"
              disabled={updateStatusMutation.isPending}
            >
              <PlayIcon className="mr-2 size-4" />
              Bắt đầu buổi học
            </Button>
          )}
        </div>
      </div>

      {/* FILTER */}
      <AttendanceFilter
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        classOptions={classOptions}
        selectedClassId={params.classId}
        sessions={sessions}
        selectedSessionId={params.sessionId}
        selectedSession={selectedSession}
      />

      {/* SUMMARY */}
      {isSessionSelected && summary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle2Icon className="size-5 text-green-600" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-green-600">Hiện diện</p>
              <p className="text-2xl font-black text-green-700">{summary.present}</p>
            </div>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <ClockIcon className="size-5 text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-amber-600">Đi muộn</p>
              <p className="text-2xl font-black text-amber-700">{summary.late}</p>
            </div>
          </div>
          <div className="bg-red-50 rounded-xl p-4 flex items-center gap-3">
            <div className="size-10 rounded-lg bg-red-100 flex items-center justify-center">
              <XCircleIcon className="size-5 text-red-600" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-red-600">Vắng mặt</p>
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

      {/* TABLE */}
      <DataTable
        columns={getColumns({
          attendanceValues,
          noteValues,
          onAttendanceChange: handleAttendanceChange,
          onNoteChange: handleNoteChange,
          isEnded,
        })}
        data={filteredRecords}
        loading={isAttendanceLoading}
      />

      {/* ConfirmDialog: Bắt đầu buổi học */}
      <ConfirmDialog
        open={startDialogOpen}
        onOpenChange={setStartDialogOpen}
        onConfirm={handleStartSession}
        loading={updateStatusMutation.isPending}
        title="Bắt đầu buổi học"
        description="Bạn có chắc chắn muốn bắt đầu buổi học này? Sau khi bắt đầu, bạn có thể tiến hành điểm danh cho học viên."
        buttonText="Bắt đầu"
      />

      {/* ConfirmDialog: Lưu điểm danh */}
      <ConfirmDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        onConfirm={handleSaveAttendance}
        loading={bulkUpsertMutation.isPending}
        title="Lưu điểm danh"
        description="Sau khi lưu, buổi học sẽ kết thúc và không thể chỉnh sửa điểm danh. Bạn có chắc chắn muốn lưu?"
        buttonText="Lưu và kết thúc"
      />
    </div>
  );
}
