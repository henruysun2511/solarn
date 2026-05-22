"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AttendanceStatus } from "@/constants/type";
import { MyAttendanceParams } from "@/schemas/attendance.schema";
import { Search, X } from "lucide-react";
import { useCallback, useState } from "react";

interface AttendanceFilterProps {
  params: MyAttendanceParams;
  onFilterChange: (filters: Partial<MyAttendanceParams>) => void;
  onRowsPerPageChange: (value: number) => void;
}

export function AttendanceFilter({
  params,
  onFilterChange,
  onRowsPerPageChange,
}: AttendanceFilterProps) {
  const [searchValue, setSearchValue] = useState(params.search || "");

  const handleSearch = useCallback(() => {
    onFilterChange({ search: searchValue || undefined, page: 1 });
  }, [searchValue, onFilterChange]);

  const clearSearch = useCallback(() => {
    setSearchValue("");
    onFilterChange({ search: undefined, page: 1 });
  }, [onFilterChange]);

  return (
    <div className="p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Tìm kiếm lớp học..."
            className="h-10 w-[220px] rounded-xl border border-gray-300 bg-white pl-10 pr-8 text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 cursor-pointer"
            onClick={handleSearch}
          />
          {searchValue && (
            <X
              className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={clearSearch}
            />
          )}
        </div>

        {/* Status Filter */}
        <Select
          value={params.status || "all"}
          onValueChange={(val) =>
            onFilterChange({ status: val === "all" ? undefined : (val as AttendanceStatus), page: 1 })
          }
        >
          <SelectTrigger data-role="student" className="w-[160px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent data-role="student">
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value={AttendanceStatus.PRESENT}>Có mặt</SelectItem>
            <SelectItem value={AttendanceStatus.ABSENT}>Vắng</SelectItem>
            <SelectItem value={AttendanceStatus.LATE}>Đi trễ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rows Per Page */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-500">Hiển thị</span>
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
        <span className="text-sm font-medium text-gray-500">/ trang</span>
      </div>
    </div>
  );
}
