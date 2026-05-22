"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOrder } from "@/constants/sort";
import { ResourceType } from "@/constants/type";
import { CourseResourceParams } from "@/schemas/course-resource.schema";
import { SearchIcon, SortAsc, SortDesc, XIcon } from "lucide-react";
import { useState } from "react";

interface CourseResourceFilterProps {
  classOptions: { courseId: string; displayName: string }[];
  selectedCourseId: string;
  params: CourseResourceParams;
  onSearch: (value: string) => void;
  onFilterChange: (filters: Partial<CourseResourceParams>) => void;
  onRowsPerPageChange: (value: number) => void;
}

export function CourseResourceFilter({
  classOptions,
  selectedCourseId,
  params,
  onSearch,
  onFilterChange,
  onRowsPerPageChange,
}: CourseResourceFilterProps) {
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
        <Select
          value={selectedCourseId}
          onValueChange={(val) => onFilterChange({ courseId: val || undefined })}
        >
          <SelectTrigger data-role="student" className="w-[220px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Chọn lớp học" />
          </SelectTrigger>
          <SelectContent data-role="student" className="rounded-2xl">
            {classOptions.map((c) => (
              <SelectItem key={c.courseId} value={c.courseId}>
                {c.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <form onSubmit={handleSearch} className="relative w-[280px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm tài nguyên..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9 h-10 border-gray-300 bg-white pr-9"
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

        <Select
          value={params.type || "ALL"}
          onValueChange={(val) =>
            onFilterChange({ type: val === "ALL" ? undefined : (val as ResourceType), page: 1 })
          }
        >
          <SelectTrigger data-role="student" className="w-[180px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Định dạng" />
          </SelectTrigger>
          <SelectContent data-role="student">
            <SelectItem value="ALL">Tất cả loại</SelectItem>
            <SelectItem value={ResourceType.DOCUMENT}>Tài liệu</SelectItem>
            <SelectItem value={ResourceType.VIDEO}>Video</SelectItem>
            <SelectItem value={ResourceType.AUDIO}>Âm thanh</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4 ml-auto lg:ml-0">
        <Select
          value={params.sortOrder}
          onValueChange={(val) => onFilterChange({ sortOrder: val as SortOrder })}
        >
          <SelectTrigger data-role="student" className="w-[150px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent data-role="student">
            <SelectItem value={SortOrder.DESC}>
              <div className="flex items-center gap-2">
                <SortDesc className="size-4 text-gray-400" />
                <span>Mới nhất</span>
              </div>
            </SelectItem>
            <SelectItem value={SortOrder.ASC}>
              <div className="flex items-center gap-2">
                <SortAsc className="size-4 text-gray-400" />
                <span>Cũ nhất</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Hiển thị:</span>
          <Select
            value={String(params.limit || 10)}
            onValueChange={(val) => onRowsPerPageChange(Number(val))}
          >
            <SelectTrigger data-role="student" className="w-[80px] h-10 border-gray-300 bg-white shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent data-role="student">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
