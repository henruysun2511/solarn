"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SalarySortBy, SortOrder } from "@/constants/sort";
import { MySalaryParams } from "@/schemas/salary.schema";
import { ArrowUpDown, CalendarDays, SortAsc, SortDesc } from "lucide-react";

interface SalaryFilterProps {
  onFilterChange: (filters: Partial<MySalaryParams>) => void;
  onRowsPerPageChange: (value: number) => void;
}

export function SalaryFilter({
  onFilterChange,
  onRowsPerPageChange,
}: SalaryFilterProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Select
          onValueChange={(val) =>
            onFilterChange({ year: val === "all" ? undefined : Number(val) })
          }
        >
          <SelectTrigger data-role="teacher" className="w-[150px] h-10 border-gray-300 bg-white shadow-sm">
            <CalendarDays className="size-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Năm" />
          </SelectTrigger>
          <SelectContent data-role="teacher">
            <SelectItem value="all">Tất cả năm</SelectItem>
            {years.map((y) => (
              <SelectItem key={y} value={String(y)}>
                Năm {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(val) =>
            onFilterChange({ month: val === "all" ? undefined : Number(val) })
          }
        >
          <SelectTrigger data-role="teacher" className="w-[180px] h-10 border-gray-300 bg-white shadow-sm">
            <CalendarDays className="size-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Tháng" />
          </SelectTrigger>
          <SelectContent data-role="teacher">
            <SelectItem value="all">Tất cả tháng</SelectItem>
            {months.map((m) => (
              <SelectItem key={m} value={String(m)}>
                Tháng {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          defaultValue={SalarySortBy.SALARY_DATE}
          onValueChange={(val) => onFilterChange({ sortBy: val as SalarySortBy })}
        >
          <SelectTrigger data-role="teacher" className="w-[200px] h-10 border-gray-300 bg-white shadow-sm">
            <ArrowUpDown className="size-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent data-role="teacher">
            <SelectItem value={SalarySortBy.SALARY_DATE}>Kỳ lương</SelectItem>
            <SelectItem value={SalarySortBy.TOTAL_SESSIONS}>Số buổi</SelectItem>
            <SelectItem value={SalarySortBy.TOTAL_AMOUNT}>Thực nhận</SelectItem>
          </SelectContent>
        </Select>

        <Select
          defaultValue={SortOrder.DESC}
          onValueChange={(val) => onFilterChange({ sortOrder: val as SortOrder.ASC | SortOrder.DESC })}
        >
          <SelectTrigger data-role="teacher" className="w-[150px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent data-role="teacher">
            <SelectItem value={SortOrder.DESC}>
              <div className="flex items-center gap-2">
                <SortDesc className="size-4 text-gray-400" />
                <span>Giảm dần</span>
              </div>
            </SelectItem>
            <SelectItem value={SortOrder.ASC}>
              <div className="flex items-center gap-2">
                <SortAsc className="size-4 text-gray-400" />
                <span>Tăng dần</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Hiển thị:</span>
        <Select
          defaultValue="10"
          onValueChange={(val) => onRowsPerPageChange(Number(val))}
        >
          <SelectTrigger data-role="teacher" className="w-[80px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent data-role="teacher">
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
