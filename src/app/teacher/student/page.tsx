"use client";

import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOrder, StudentSortBy } from "@/constants/sort";
import { useGetStudentsByClass } from "@/queries/useStudentQuery";
import { useGetMyClasses } from "@/queries/useClassQuery";
import { useGetTeacherProgress } from "@/queries/useCourseQuery";
import { StudentParams } from "@/schemas/student.schema";
import { useMemo, useState } from "react";
import { getColumns } from "./student-columns";
import { StudentFilter } from "./student-filter";
import { getProgressColumns } from "./progress-columns";

type TabKey = "students" | "progress";

export default function TeacherStudentPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("students");

  const [params, setParams] = useState<StudentParams & { classId: string }>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: StudentSortBy.NAME,
    classId: "",
  });

  const [progressClassId, setProgressClassId] = useState("");

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
  const { data: progressData, isLoading: progressLoading } = useGetTeacherProgress(
    progressClassId ? { classId: progressClassId } : undefined
  );

  const students = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  const progressItems = Array.isArray(progressData) ? progressData : [];

  const handleFilterChange = (filters: Partial<StudentParams & { classId: string }>) => {
    setParams((prev) => ({ ...prev, ...filters, page: 1 }));
  };

  const handleSearch = (val: string) => {
    setParams((prev) => ({ ...prev, search: val, page: 1 }));
  };

  return (
    <div data-role="teacher" className="w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col gap-6 min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter">Quản lý học sinh</h1>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">
              Giáo viên
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("students")}
            className={`px-6 py-3 text-sm font-bold rounded-t-xl transition-colors ${
              activeTab === "students"
                ? "bg-white text-[var(--primary)] border border-b-white border-gray-200 -mb-px"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Danh sách học sinh
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`px-6 py-3 text-sm font-bold rounded-t-xl transition-colors ${
              activeTab === "progress"
                ? "bg-white text-[var(--primary)] border border-b-white border-gray-200 -mb-px"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Tiến độ học tập
          </button>
        </div>

        {/* Students Tab */}
        {activeTab === "students" && (
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
        )}

        {/* Progress Tab */}
        {activeTab === "progress" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Select
                  value={progressClassId}
                  onValueChange={setProgressClassId}
                >
                  <SelectTrigger data-role="teacher" className="w-[220px] h-10 border-gray-300 bg-white shadow-sm">
                    <SelectValue placeholder="Tất cả lớp" />
                  </SelectTrigger>
                  <SelectContent data-role="teacher" className="rounded-2xl">
                    {myClasses.map((c) => (
                      <SelectItem key={c.classId} value={c.classId}>
                        {c.displayName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="p-0">
              <DataTable
                columns={getProgressColumns()}
                data={progressItems}
                loading={progressLoading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
