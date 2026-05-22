"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOrder } from "@/constants/sort";
import { InvoiceStatus } from "@/constants/type";
import { MyInvoiceParams } from "@/schemas/payment.schema";
import { Search, X } from "lucide-react";
import { useCallback, useState } from "react";

interface InvoiceFilterProps {
  params: MyInvoiceParams;
  classOptions: { classId: string; displayName: string }[];
  onFilterChange: (filters: Partial<MyInvoiceParams>) => void;
  onRowsPerPageChange: (value: number) => void;
}

export function InvoiceFilter({
  params,
  classOptions,
  onFilterChange,
  onRowsPerPageChange,
}: InvoiceFilterProps) {
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
            placeholder="Tìm kiếm khóa học..."
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

        {/* Class Filter */}
        <Select
          value={params.classId || "ALL"}
          onValueChange={(val) => onFilterChange({ classId: val === "ALL" ? undefined : val, page: 1 })}
        >
          <SelectTrigger data-role="student" className="w-[220px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Chọn lớp học" />
          </SelectTrigger>
          <SelectContent data-role="student" className="rounded-2xl">
            <SelectItem value="ALL">Tất cả lớp</SelectItem>
            {classOptions.map((c) => (
              <SelectItem key={c.classId} value={c.classId}>
                {c.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select
          value={params.status || "ALL"}
          onValueChange={(val) =>
            onFilterChange({ status: val === "ALL" ? undefined : (val as InvoiceStatus), page: 1 })
          }
        >
          <SelectTrigger data-role="student" className="w-[180px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent data-role="student">
            <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
            <SelectItem value={InvoiceStatus.PENDING}>Chờ thanh toán</SelectItem>
            <SelectItem value={InvoiceStatus.PAID}>Đã thanh toán</SelectItem>
            <SelectItem value={InvoiceStatus.CANCELLED}>Đã hủy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4 ml-auto lg:ml-0">
        <SortOrderSelect
          value={params.sortOrder}
          onChange={(val) => onFilterChange({ sortOrder: val as SortOrder })}
        />
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
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

function SortOrderSelect({
  value,
  onChange,
}: {
  value?: string;
  onChange: (val: string) => void;
}) {
  return (
    <Select value={value || SortOrder.DESC} onValueChange={onChange}>
      <SelectTrigger data-role="student" className="w-[150px] h-10 border-gray-300 bg-white shadow-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent data-role="student">
        <SelectItem value={SortOrder.DESC}>Mới nhất trước</SelectItem>
        <SelectItem value={SortOrder.ASC}>Cũ nhất trước</SelectItem>
      </SelectContent>
    </Select>
  );
}
