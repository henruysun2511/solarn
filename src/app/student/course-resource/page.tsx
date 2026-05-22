"use client";

import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { SortOrder } from "@/constants/sort";
import {
  useGetCourseResources,
} from "@/queries/useCourseResourceQuery";
import { useGetMyEnrolledClasses } from "@/queries/useClassQuery";
import { CourseResourceParams } from "@/schemas/course-resource.schema";
import { BookOpen } from "lucide-react";
import { useMemo, useState } from "react";
import { getColumns } from "./course-resource-columns";
import { CourseResourceFilter } from "./course-resource-filter";

export default function StudentCourseResourcePage() {
  const [params, setParams] = useState<CourseResourceParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
  });

  const { data: myClassesData } = useGetMyEnrolledClasses({ page: 1, limit: 100 });
  const myClasses = useMemo(() => (myClassesData?.data || []).map((c: any) => ({
    courseId: c.course?.courseId || c.course?.couseId,
    displayName: c.course?.courseName
      ? `${c.course.courseName} (${c.roomCode})`
      : c.classId?.substring(0, 8),
  })), [myClassesData]);

  const { data, isLoading } = useGetCourseResources(params);

  const resources = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  const handleSearch = (value: string) => {
    setParams((prev) => ({ ...prev, search: value || undefined, page: 1 }));
  };

  const handleFilterChange = (newFilters: Partial<CourseResourceParams>) => {
    setParams((prev) => ({ ...prev, ...newFilters }));
  };

  const columns = getColumns();

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
              Tài nguyên học tập
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <CourseResourceFilter
            classOptions={myClasses}
            selectedCourseId={params.courseId || ""}
            params={params}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onRowsPerPageChange={(limit) => handleFilterChange({ limit, page: 1 })}
          />

          <DataTable
            columns={columns}
            data={resources}
            loading={isLoading}
          />

          {resources.length > 0 && (
            <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <PaginationInfo
                page={Number(params.page || 1)}
                limit={Number(params.limit) || 10}
                totalItems={totalItems}
                currentLength={resources.length}
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
