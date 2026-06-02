"use client";

import { AttendanceStatus } from "@/constants/type";
import { ATTENDANCE_STATUS_CONFIG } from "@/constants/label";
import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (): ColumnDef<any>[] => [
  {
    accessorKey: "student.studentCode",
    header: "Mã HS",
    cell: ({ row }) => (
      <span className="font-mono text-xs font-bold text-primary">
        {row.original.student?.studentCode || "---"}
      </span>
    ),
  },
  {
    id: "studentName",
    header: "Học sinh",
    cell: ({ row }) => {
      const fullName = row.original.student?.profile?.fullName || "Unknown";
      return (
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center text-xs font-bold text-gray-500">
            {fullName.split(" ").pop()?.charAt(0) || "?"}
          </div>
          <span className="font-semibold text-gray-800">{fullName}</span>
        </div>
      );
    },
  },
  {
    id: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status as string;
      const config = ATTENDANCE_STATUS_CONFIG[status];
      if (!config) return <span className="text-gray-400">---</span>;
      return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-[11px] ${config.className}`}>
          {config.icon} {config.label}
        </span>
      );
    },
  },
  {
    accessorKey: "note",
    header: "Ghi chú",
    cell: ({ row }) => (
      <p className="text-sm text-slate-500 line-clamp-1 italic max-w-[200px]">
        {row.original.note ? `"${row.original.note}"` : "---"}
      </p>
    ),
  },
];
