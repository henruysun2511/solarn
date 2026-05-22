"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RequestStatus } from "@/constants/type";
import { SalaryComplaintParams } from "@/schemas/request.schema";
import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface ComplaintFilterProps {
  onSearch: (value: string) => void;
  onFilterChange: (filters: Partial<SalaryComplaintParams>) => void;
  onRowsPerPageChange: (value: number) => void;
}

export function ComplaintFilter({ onSearch, onFilterChange, onRowsPerPageChange }: ComplaintFilterProps) {
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
        <form onSubmit={handleSearch} className="relative w-[280px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Tên giáo viên hoặc mã đơn..."
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

        <Select onValueChange={(val) => onFilterChange({ status: val === "all" ? undefined : val as RequestStatus })}>
          <SelectTrigger className="w-[160px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent data-role="admin">
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value={RequestStatus.PENDING}>Chờ duyệt</SelectItem>
            <SelectItem value={RequestStatus.APPROVED}>Đã duyệt</SelectItem>
            <SelectItem value={RequestStatus.REJECTED}>Từ chối</SelectItem>
            <SelectItem value={RequestStatus.CANCELLED}>Đã hủy</SelectItem>
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
