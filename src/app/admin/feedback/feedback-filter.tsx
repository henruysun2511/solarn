"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FeedbackParams } from "@/schemas/feedback.schema";
import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface FeedbackFilterProps {
  onSearch: (value: string) => void;
  onFilterChange: (filters: Partial<FeedbackParams>) => void;
  onRowsPerPageChange: (value: number) => void;
}

export function FeedbackFilter({ onSearch, onFilterChange, onRowsPerPageChange }: FeedbackFilterProps) {
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
            placeholder="Tìm nội dung đánh giá..."
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

        <Select onValueChange={(val) => onFilterChange({ starRating: val === "all" ? undefined : Number(val) as any })}>
          <SelectTrigger className="w-[150px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Số sao" />
          </SelectTrigger>
          <SelectContent data-role="admin">
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="5">5 sao</SelectItem>
            <SelectItem value="4">4 sao</SelectItem>
            <SelectItem value="3">3 sao</SelectItem>
            <SelectItem value="2">2 sao</SelectItem>
            <SelectItem value="1">1 sao</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(val) => onFilterChange({ isFeatured: val === "all" ? undefined : val })}>
          <SelectTrigger className="w-[180px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Hiển thị" />
          </SelectTrigger>
          <SelectContent data-role="admin">
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="true">Đang hiển thị</SelectItem>
            <SelectItem value="false">Không hiển thị</SelectItem>
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
