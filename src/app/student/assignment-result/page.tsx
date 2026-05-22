"use client";

import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { SortOrder } from "@/constants/sort";
import { useGetMyStudentAssignmentResults } from "@/queries/useAssignmentResultQuery";
import { useGetMyEnrolledClasses } from "@/queries/useClassQuery";
import { useGetScheduleSessionsByClass } from "@/queries/useScheduleSessionQuery";
import { MyAssignmentResultParams } from "@/schemas/assignment-result.schema";
import { BookOpen } from "lucide-react";
import { useMemo, useState } from "react";
import { getColumns } from "./assignment-result-columns";
import { AssignmentResultFilter } from "./assignment-result-filter";

export default function StudentAssignmentResultPage() {
  const [params, setParams] = useState<MyAssignmentResultParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: "createdAt",
  });

  const { data: myClassesData } = useGetMyEnrolledClasses({ page: 1, limit: 100 });
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

  const { data, isLoading } = useGetMyStudentAssignmentResults(params);

  const results = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  const handleFilterChange = (filters: Partial<MyAssignmentResultParams>) => {
    setParams((prev) => ({ ...prev, ...filters, page: 1 }));
  };

  return (
    <div data-role="student" className="w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col gap-6 min-h-screen">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
            Theo dõi
          </p>
          <div className="flex items-center gap-3">
            <div className="bg-[var(--accent)] p-2.5 rounded-2xl">
              <BookOpen className="size-5 text-[var(--primary)]" />
            </div>
            <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
              Kết quả bài tập
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <AssignmentResultFilter
            classOptions={myClasses}
            selectedClassId={params.classId || ""}
            sessionOptions={sessionOptions}
            selectedSessionId={params.sessionId || ""}
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
    </div>
  );
}
