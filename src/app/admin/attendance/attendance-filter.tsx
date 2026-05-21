"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScheduleSession } from "@/schemas/schedule-session.schema";
import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface AttendanceFilterProps {
  onSearch: (value: string) => void;
  onFilterChange: (filters: Record<string, any>) => void;
  onRowsPerPageChange: (value: number) => void;
  courses: { courseId: string; courseName: string }[];
  selectedCourseId: string;
  classes: { classId: string; classCode?: string }[];
  selectedClassId: string;
  sessions: ScheduleSession[];
  selectedSessionId: string;
  selectedShiftCode: string;
  shifts: { shiftCode: string; shiftName: string }[];
}

export function AttendanceFilter({
  onSearch,
  onFilterChange,
  onRowsPerPageChange,
  courses,
  selectedCourseId,
  classes,
  selectedClassId,
  sessions,
  selectedSessionId,
  selectedShiftCode,
  shifts,
}: AttendanceFilterProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const clearSearch = () => {
    setSearchValue("");
    onSearch("");
  };

  return (
    <div className="p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Tìm kiếm */}
        <form onSubmit={handleSearch} className="relative w-[220px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Tìm học viên..."
            className="pl-9 h-10 border-gray-300 bg-white pr-9"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <XIcon className="size-4" />
            </button>
          )}
        </form>

        {/* Course Select */}
        <Select
          value={selectedCourseId}
          onValueChange={(val) => {
            onFilterChange({ courseId: val, classId: "", sessionId: "", shiftCode: "all" });
          }}
        >
          <SelectTrigger className="w-[180px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Khóa học" />
          </SelectTrigger>
          <SelectContent data-role="admin">
            {courses.map((c) => (
              <SelectItem key={c.courseId} value={c.courseId}>
                {c.courseName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Class Select */}
        <Select
          value={selectedClassId}
          onValueChange={(val) => {
            onFilterChange({ classId: val, sessionId: "", shiftCode: "all" });
          }}
          disabled={!selectedCourseId}
        >
          <SelectTrigger className="w-[180px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder={selectedCourseId ? "Lớp học" : "Chọn khóa học"} />
          </SelectTrigger>
          <SelectContent data-role="admin">
            {classes.map((c) => (
              <SelectItem key={c.classId} value={c.classId}>
                {c.classCode || c.classId?.substring(0, 8)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Shift Filter */}
        <Select
          value={selectedShiftCode}
          onValueChange={(val) => {
            onFilterChange({ shiftCode: val, sessionId: "" });
          }}
          disabled={!selectedClassId}
        >
          <SelectTrigger className="w-[160px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Ca học" />
          </SelectTrigger>
          <SelectContent data-role="admin">
            <SelectItem value="all">Tất cả ca</SelectItem>
            {shifts.map((s) => (
              <SelectItem key={s.shiftCode} value={s.shiftCode}>
                {s.shiftName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Session Select */}
        <Select
          value={selectedSessionId}
          onValueChange={(val) => {
            onFilterChange({ sessionId: val });
          }}
          disabled={sessions.length === 0}
        >
          <SelectTrigger className="w-[260px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Chọn buổi học" />
          </SelectTrigger>
          <SelectContent data-role="admin">
            {sessions.map((s) => (
              <SelectItem key={s.sessionId} value={s.sessionId!}>
                {s.studyDate} — {s.shift?.shiftName || s.shiftCode}
              </SelectItem>
            ))}
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
