"use client";

import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";
import { SortOrder } from "@/constants/sort";
import { useGetMyTeacherAssignmentResults, useBulkUpsertAssignmentResults } from "@/queries/useAssignmentResultQuery";
import { useGetMyClasses } from "@/queries/useClassQuery";
import { useGetScheduleSessionsByClass } from "@/queries/useScheduleSessionQuery";
import { useGetStudentsByClass } from "@/queries/useStudentQuery";
import { MyAssignmentResultParams } from "@/schemas/assignment-result.schema";
import { handleError } from "@/utils/handleError";
import { UploadIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AssignmentResultDialog } from "./assignment-result-dialog";
import { getColumns } from "./assignment-result-columns";
import { AssignmentResultFilter } from "./assignment-result-filter";

export default function TeacherAssignmentResultPage() {
  const [params, setParams] = useState<MyAssignmentResultParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: "createdAt",
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: myClassesData } = useGetMyClasses({ page: 1, limit: 100 });
  const myClasses = useMemo(() => (myClassesData?.data || []).map((c: any) => ({
    classId: c.classId,
    displayName: c.course?.courseName
      ? `${c.course.courseName} (${c.roomCode})`
      : c.classId?.substring(0, 8),
  })), [myClassesData]);

  const { data: sessionsData } = useGetScheduleSessionsByClass(params.classId || "", { page: 1, limit: 100, sortOrder: SortOrder.DESC, sortBy: "studyDate" });
  const sessionOptions = useMemo(() => (sessionsData?.data || []).map((s: any) => ({
    sessionId: s.sessionId,
    displayName: `${new Date(s.studyDate).toLocaleDateString("vi-VN")} - Ca ${s.shiftCode} (${s.shift?.timeRange || ""})`,
  })), [sessionsData]);

  const { data: studentsData } = useGetStudentsByClass(params.classId || "", { page: 1, limit: 100 });
  const students = useMemo(() => (studentsData?.data || []).map((s: any) => ({
    studentId: s.studentId,
    studentCode: s.studentCode,
    fullName: s.profile?.fullName || s.studentCode,
  })), [studentsData]);

  const { data, isLoading } = useGetMyTeacherAssignmentResults(params);
  const upsertMutation = useBulkUpsertAssignmentResults();

  const results = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  const selectedSession = useMemo(
    () => sessionOptions.find((s) => s.sessionId === params.sessionId),
    [sessionOptions, params.sessionId]
  );

  const handleSearch = (value: string) => {
    setParams((prev) => ({ ...prev, search: value || undefined, page: 1 }));
  };

  const handleFilterChange = (filters: Partial<MyAssignmentResultParams>) => {
    setParams((prev) => ({ ...prev, ...filters, page: 1 }));
  };

  const handleSubmitScores = async (data: { sessionId: string; studentId: string; score: number; feedback?: string }[]) => {
    try {
      await upsertMutation.mutateAsync(data);
      toast.success(`Lưu ${data.length} điểm thành công!`);
      setDialogOpen(false);
    } catch (error) {
      handleError(error, "Không thể lưu điểm");
    }
  };

  return (
    <div data-role="teacher" className="w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col gap-6 min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter">Kết quả bài tập</h1>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">Giáo viên</p>
          </div>

          <Button
            onClick={() => setDialogOpen(true)}
            disabled={!params.sessionId}
            className="h-11 px-5 rounded-2xl bg-[var(--primary)] text-white font-black shadow-lg shadow-[var(--primary)]/20 hover:opacity-95 text-sm gap-2"
          >
            <UploadIcon className="size-4" />
            Nhập điểm
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <AssignmentResultFilter
            classOptions={myClasses}
            selectedClassId={params.classId || ""}
            sessionOptions={sessionOptions}
            selectedSessionId={params.sessionId || ""}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onRowsPerPageChange={(limit) => setParams((prev) => ({ ...prev, limit, page: 1 }))}
          />

          <DataTable
            columns={getColumns()}
            data={results}
            loading={isLoading}
          />

          {results.length > 0 && (
            <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <PaginationInfo
                page={Number(params.page || 1)}
                limit={Number(params.limit || 10)}
                totalItems={totalItems}
                currentLength={results.length}
                label="kết quả"
              />
              <DataPagination
                page={Number(params.page) || 1}
                totalPages={totalPages}
                onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
              />
            </div>
          )}
        </div>
      </div>

      <AssignmentResultDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmitScores}
        isPending={upsertMutation.isPending}
        sessionId={params.sessionId || ""}
        sessionLabel={selectedSession?.displayName}
        students={students}
      />
    </div>
  );
}
