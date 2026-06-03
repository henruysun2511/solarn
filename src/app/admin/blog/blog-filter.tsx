"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogSortBy, SortOrder } from "@/constants/sort";
import { BlogParams } from "@/schemas/blog.schema";
import { FilterIcon, SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface BlogFilterProps {
  onSearch: (value: string) => void;
  onFilterChange: (filters: Partial<BlogParams>) => void;
  onRowsPerPageChange: (value: number) => void;
}

export function BlogFilter({ onSearch, onFilterChange, onRowsPerPageChange }: BlogFilterProps) {
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
            placeholder="Tìm kiếm bài viết..."
            className="pl-9 h-10 border-gray-300 bg-white pr-9"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <XIcon className="size-4" />
            </button>
          )}
        </form>

        <Select onValueChange={(val) => onFilterChange({ isPublished: val === "PUBLISHED" ? true : val === "DRAFT" ? false : undefined })}>
          <SelectTrigger className="w-[160px] h-10 border-gray-300 bg-white shadow-sm">
            <FilterIcon className="size-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent data-role="admin">
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="PUBLISHED">Đã xuất bản</SelectItem>
            <SelectItem value="DRAFT">Nháp</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue={BlogSortBy.CREATED_AT} onValueChange={(val) => onFilterChange({ sortBy: val as any })}>
          <SelectTrigger className="w-[160px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent data-role="admin">
            <SelectItem value={BlogSortBy.CREATED_AT}>Ngày tạo</SelectItem>
            <SelectItem value={BlogSortBy.PUBLISHED_AT}>Ngày xuất bản</SelectItem>
            <SelectItem value={BlogSortBy.TITLE}>Tiêu đề</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue={SortOrder.DESC} onValueChange={(val) => onFilterChange({ sortOrder: val as any })}>
          <SelectTrigger className="w-[130px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Thứ tự" />
          </SelectTrigger>
          <SelectContent data-role="admin">
            <SelectItem value={SortOrder.DESC}>Mới nhất</SelectItem>
            <SelectItem value={SortOrder.ASC}>Cũ nhất</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Hiển thị:</span>
        <Select defaultValue="10" onValueChange={(val) => onRowsPerPageChange(Number(val))}>
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
