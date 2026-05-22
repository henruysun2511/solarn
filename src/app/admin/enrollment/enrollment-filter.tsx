"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClassSortBy, CourseSortBy, SortOrder } from "@/constants/sort";
import { EnrollmentStatus } from "@/constants/type";
import { EnrollmentParams } from "@/schemas/enrollment.schema";
import { useGetCourses } from "@/queries/useCourseQuery";
import { useGetClassesByCourseId } from "@/queries/useClassQuery";
import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface EnrollmentFilterProps {
  onSearch: (value: string) => void;
  onFilterChange: (filters: Partial<EnrollmentParams>) => void;
  onRowsPerPageChange: (value: number) => void;
  selectedClassId?: string;
  onClassChange: (classId: string | undefined) => void;
}

export function EnrollmentFilter({ onSearch, onFilterChange, onRowsPerPageChange, selectedClassId, onClassChange }: EnrollmentFilterProps) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const { data: coursesRes } = useGetCourses({ page: 1, limit: 100, sortBy: CourseSortBy.COURSE_NAME, sortOrder: SortOrder.ASC });
  const courses = coursesRes?.data ?? [];

  const { data: classesRes } = useGetClassesByCourseId(selectedCourseId, { page: 1, limit: 100, sortOrder: SortOrder.DESC, sortBy: ClassSortBy.START_DATE });
  const classes = classesRes?.data ?? [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const clearSearch = () => {
    setSearchValue("");
    onSearch("");
  };

  const handleCourseChange = (courseId: string) => {
    const val = courseId === "all" ? "" : courseId;
    setSelectedCourseId(val);
    onClassChange(undefined);
  };

  const handleClassChange = (classId: string) => {
    onClassChange(classId === "all" ? undefined : classId);
  };

  return (
    <div className="p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <form onSubmit={handleSearch} className="relative w-[280px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Mã HS hoặc tên học sinh..."
            className="pl-9 h-10 border-gray-300 bg-white pr-9"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <button type="button" onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <XIcon className="size-4" />
            </button>
          )}
        </form>

        <Select value={selectedCourseId} onValueChange={handleCourseChange}>
          <SelectTrigger className="w-[200px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Chọn khóa học" />
          </SelectTrigger>
          <SelectContent data-role="admin">
            <SelectItem value="all">Tất cả khóa học</SelectItem>
            {courses.map((c: any) => (
              <SelectItem key={c.courseId} value={c.courseId}>
                {c.courseName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedClassId || ""} onValueChange={handleClassChange} disabled={!selectedCourseId}>
          <SelectTrigger className="w-[200px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Chọn lớp học" />
          </SelectTrigger>
          <SelectContent data-role="admin">
            <SelectItem value="all">Tất cả lớp học</SelectItem>
            {classes.map((c: any) => (
              <SelectItem key={c.classId} value={c.classId}>
                {c.classCode} - {c.course?.courseName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => onFilterChange({ status: val as EnrollmentStatus || undefined })}>
          <SelectTrigger className="w-[150px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent data-role="admin">
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value={EnrollmentStatus.NOT_STARTED}>Chưa bắt đầu</SelectItem>
            <SelectItem value={EnrollmentStatus.IN_PROGRESS}>Đang học</SelectItem>
            <SelectItem value={EnrollmentStatus.COMPLETED}>Hoàn thành</SelectItem>
            <SelectItem value={EnrollmentStatus.DROPPED}>Đã hủy</SelectItem>
            <SelectItem value={EnrollmentStatus.DEFERRED}>Bảo lưu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Hiển thị:</span>
        <Select
          defaultValue="10"
          onValueChange={(val) => onRowsPerPageChange(Number(val))}
        >
          <SelectTrigger className="w-[80px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent data-role="admin">
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
