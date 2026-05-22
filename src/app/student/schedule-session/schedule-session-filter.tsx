"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOrder } from "@/constants/sort";
import { ClassSessionStatus } from "@/constants/type";
import { ScheduleSessionParams } from "@/schemas/schedule-session.schema";
import { StudyShift } from "@/schemas/shift.schema";
import { FilterX } from "lucide-react";

interface FilterProps {
  onFilterChange: (filters: Partial<ScheduleSessionParams>) => void;
  onRowsPerPageChange: (value: number) => void;
  params: ScheduleSessionParams;
  classes: any[];
  shifts: StudyShift[];
}

export function ScheduleSessionFilter({
  onFilterChange,
  onRowsPerPageChange,
  params,
  classes = [],
  shifts = [],
}: FilterProps) {
  const clearFilters = () => {
    onFilterChange({
      classId: undefined,
      shiftCode: undefined,
      status: undefined,
      startDate: undefined,
      endDate: undefined,
      page: 1,
    });
  };

  const hasActiveFilters = !!(
    params.classId ||
    params.shiftCode ||
    params.status ||
    params.startDate ||
    params.endDate
  );

  return (
    <div className="p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Lọc theo Lớp học */}
        <Select
          value={params.classId || "ALL"}
          onValueChange={(val) => onFilterChange({ classId: val === "ALL" ? undefined : val, page: 1 })}
        >
          <SelectTrigger data-role="student" className="w-[200px] h-10 rounded-2xl border-gray-200 bg-white font-medium text-sm">
            <SelectValue placeholder="Chọn lớp học" />
          </SelectTrigger>
          <SelectContent data-role="student" className="rounded-2xl max-h-[300px]">
            <SelectItem value="ALL" className="rounded-xl">Tất cả lớp học</SelectItem>
            {classes.map((cls: any) => (
              <SelectItem key={cls.classId} value={cls.classId} className="rounded-xl font-bold">
                {cls.course?.courseName
                  ? `${cls.course.courseName} (${cls.roomCode})`
                  : cls.classId?.substring(0, 8)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Lọc theo Ca học */}
        <Select
          value={params.shiftCode || "ALL"}
          onValueChange={(val) => onFilterChange({ shiftCode: val === "ALL" ? undefined : val, page: 1 })}
        >
          <SelectTrigger data-role="student" className="w-[160px] h-10 rounded-2xl border-gray-200 bg-white font-medium text-sm">
            <SelectValue placeholder="Chọn ca học" />
          </SelectTrigger>
          <SelectContent data-role="student" className="rounded-2xl">
            <SelectItem value="ALL" className="rounded-xl">Tất cả ca học</SelectItem>
            {shifts.map((shift) => (
              <SelectItem key={shift.shiftCode} value={shift.shiftCode} className="rounded-xl">
                Ca {shift.shiftCode} {shift.timeRange ? `(${shift.timeRange})` : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Lọc Trạng thái */}
        <Select
          value={params.status || "ALL"}
          onValueChange={(val) => onFilterChange({ status: val === "ALL" ? undefined : val as ClassSessionStatus, page: 1 })}
        >
          <SelectTrigger data-role="student" className="w-[160px] h-10 rounded-2xl border-gray-200 bg-white font-medium text-sm">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent data-role="student" className="rounded-2xl">
            <SelectItem value="ALL" className="rounded-xl">Tất cả trạng thái</SelectItem>
            <SelectItem value={ClassSessionStatus.NOT_STARTED} className="rounded-xl">Chưa bắt đầu</SelectItem>
            <SelectItem value={ClassSessionStatus.IN_PROGRESS} className="rounded-xl">Đang diễn ra</SelectItem>
            <SelectItem value={ClassSessionStatus.ENDED} className="rounded-xl">Đã kết thúc</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs font-black text-red-500 hover:text-red-600 bg-red-50/80 px-3.5 h-10 rounded-2xl transition-all border border-red-100"
          >
            <FilterX className="size-3.5" />
            Xóa lọc
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 ml-auto lg:ml-0">
        <Select
          value={params.sortOrder}
          onValueChange={(val) => onFilterChange({ sortOrder: val as SortOrder })}
        >
          <SelectTrigger data-role="student" className="w-[140px] h-10 rounded-2xl border-gray-200 bg-white font-medium text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent data-role="student" className="rounded-2xl">
            <SelectItem value={SortOrder.DESC} className="rounded-xl">Mới nhất trước</SelectItem>
            <SelectItem value={SortOrder.ASC} className="rounded-xl">Cũ nhất trước</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
          <span>Hiển thị:</span>
          <Select
            value={String(params.limit || 10)}
            onValueChange={(val) => onRowsPerPageChange(Number(val))}
          >
            <SelectTrigger data-role="student" className="w-[80px] h-10 rounded-2xl border-gray-200 bg-white font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent data-role="student" className="rounded-2xl">
              <SelectItem value="10" className="rounded-xl">10</SelectItem>
              <SelectItem value="25" className="rounded-xl">25</SelectItem>
              <SelectItem value="50" className="rounded-xl">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
