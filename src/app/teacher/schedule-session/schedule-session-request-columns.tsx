"use client";

import { Badge } from "@/components/ui/badge";
import { Request } from "@/schemas/request.schema";
import { ColumnDef } from "@tanstack/react-table";
import { REQUEST_STATUS_LABELS, REQUEST_STATUS_COLORS } from "@/constants/label";

export const getScheduleChangeRequestColumns = (): ColumnDef<Request>[] => [
  {
    accessorKey: "createdAt",
    header: "Ngày gửi",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      if (!date) return <span className="text-gray-400">—</span>;
      const d = new Date(date);
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
    id: "course",
    header: "Lớp",
    cell: ({ row }) => {
      const session = (row.original as any).session;
      return (
        <span className="font-semibold text-gray-700">
          {session?.class?.course?.courseName || "—"}
        </span>
      );
    },
  },
  {
    id: "currentSchedule",
    header: "Lịch cũ",
    cell: ({ row }) => {
      const session = (row.original as any).session;
      if (!session?.studyDate) return <span className="text-gray-400">—</span>;
      const d = new Date(session.studyDate);
      return (
        <span className="text-gray-600">
          {d.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
          })}
          {" · "}
          Ca {session.shiftCode || "?"}
        </span>
      );
    },
  },
  {
    id: "proposedSchedule",
    header: "Lịch mới",
    cell: ({ row }) => {
      const r = row.original;
      const shift = (row.original as any).proposedShift;
      if (!r.proposedStudyDate) return <span className="text-gray-400">—</span>;
      const d = new Date(r.proposedStudyDate);
      return (
        <span className="text-gray-600">
          {d.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
          })}
          {" · "}
          {shift?.shiftName || r.proposedShiftCode || "?"}
        </span>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Lý do",
    cell: ({ row }) => (
      <span className="text-gray-500 line-clamp-2 max-w-[200px]">
        {row.original.reason || "—"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      const label = REQUEST_STATUS_LABELS[status] || status;
      const color = REQUEST_STATUS_COLORS[status] || "bg-gray-100 text-gray-600";
      return <Badge className={`font-bold px-3 py-1 ${color}`}>{label}</Badge>;
    },
  },
];
