"use client";

import { Badge } from "@/components/ui/badge";
import { AttendanceStatus } from "@/constants/type";
import { MyAttendance } from "@/schemas/attendance.schema";
import { ColumnDef } from "@tanstack/react-table";

const statusLabels: Record<string, string> = {
  [AttendanceStatus.PRESENT]: "Có mặt",
  [AttendanceStatus.ABSENT]: "Vắng",
  [AttendanceStatus.LATE]: "Đi trễ",
};

const statusColors: Record<string, string> = {
  [AttendanceStatus.PRESENT]: "bg-emerald-100 text-emerald-700",
  [AttendanceStatus.ABSENT]: "bg-red-100 text-red-700",
  [AttendanceStatus.LATE]: "bg-amber-100 text-amber-700",
};

export const getAttendanceColumns = (): ColumnDef<MyAttendance>[] => [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => (
      <span className="text-gray-400 font-mono text-sm">
        {String(row.index + 1).padStart(2, "0")}
      </span>
    ),
  },
  {
    id: "date",
    header: "Ngày",
    cell: ({ row }) => {
      const d = new Date(row.original.session?.studyDate);
      return (
        <span className="font-medium text-gray-700">
          {d.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    id: "shift",
    header: "Ca",
    cell: ({ row }) => {
      const session = row.original.session;
      const shiftName = session?.shift?.shiftName || `Ca ${session?.shiftCode}`;
      return (
        <span className="font-semibold text-gray-600">
          {shiftName}
        </span>
      );
    },
  },
  {
    id: "course",
    header: "Lớp",
    cell: ({ row }) => (
      <span className="font-semibold text-gray-700">
        {row.original.session?.class?.course?.courseName || "—"}
      </span>
    ),
  },
  {
    id: "timeRange",
    header: "Giờ",
    cell: ({ row }) => (
      <span className="text-gray-500 text-sm">
        {row.original.session?.shift?.timeRange || "—"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      const label = statusLabels[status] || status;
      const color = statusColors[status] || "bg-gray-100 text-gray-600";
      return <Badge className={`font-bold px-3 py-1 ${color}`}>{label}</Badge>;
    },
  },
  {
    accessorKey: "note",
    header: "Ghi chú",
    cell: ({ row }) => (
      <span className="text-gray-500 line-clamp-2 max-w-[200px]">
        {row.original.note || "—"}
      </span>
    ),
  },
];
