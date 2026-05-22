"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOrder } from "@/constants/sort";
import { MyAssignmentResultParams } from "@/schemas/assignment-result.schema";
import { SortAsc, SortDesc } from "lucide-react";

interface AssignmentResultFilterProps {
  classOptions: { classId: string; displayName: string }[];
  selectedClassId: string;
  sessionOptions: { sessionId: string; displayName: string }[];
  selectedSessionId: string;
  onFilterChange: (filters: Partial<MyAssignmentResultParams>) => void;
  onRowsPerPageChange: (value: number) => void;
}

export function AssignmentResultFilter({
  classOptions,
  selectedClassId,
  sessionOptions,
  selectedSessionId,
  onFilterChange,
  onRowsPerPageChange,
}: AssignmentResultFilterProps) {
  return (
    <div className="p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Select
          value={selectedClassId}
          onValueChange={(val) => onFilterChange({ classId: val || undefined, sessionId: undefined })}
        >
          <SelectTrigger data-role="student" className="w-[220px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Chọn lớp học" />
          </SelectTrigger>
          <SelectContent data-role="student" className="rounded-2xl">
            {classOptions.map((c) => (
              <SelectItem key={c.classId} value={c.classId}>
                {c.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedSessionId}
          onValueChange={(val) => onFilterChange({ sessionId: val || undefined })}
          disabled={!selectedClassId || sessionOptions.length === 0}
        >
          <SelectTrigger data-role="student" className="w-[240px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder={selectedClassId ? "Chọn buổi học" : "Chọn lớp trước"} />
          </SelectTrigger>
          <SelectContent data-role="student" className="rounded-2xl">
            {sessionOptions.map((s) => (
              <SelectItem key={s.sessionId} value={s.sessionId}>
                {s.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4 ml-auto lg:ml-0">
        <Select
          defaultValue={SortOrder.DESC}
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
            defaultValue="10"
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
