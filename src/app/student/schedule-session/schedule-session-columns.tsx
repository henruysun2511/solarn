"use client";

import { Badge } from "@/components/ui/badge";
import { ClassSessionStatus } from "@/constants/type";
import { ScheduleSession } from "@/schemas/schedule-session.schema";
import { ColumnDef } from "@tanstack/react-table";
import { CalendarIcon, ClockIcon } from "lucide-react";

export const getColumns = (): ColumnDef<ScheduleSession>[] => [
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
    accessorKey: "shiftCode",
    header: "Ca Học",
    cell: ({ row }) => {
      const session = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-bold text-gray-700">{session.shiftCode}</span>
          <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
            <ClockIcon className="size-3 text-slate-400" />
            {session.shift?.timeRange || "---"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "studyDate",
    header: "Ngày Học",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
        <CalendarIcon className="size-4 text-primary" />
        <span>{new Date(row.original.studyDate).toLocaleDateString("vi-VN")}</span>
      </div>
    ),
  },
  {
    accessorKey: "class.room.roomCode",
    header: "Phòng học",
    cell: ({ row }) => (
      <span className="font-bold text-gray-800">{row.original.class?.room?.roomCode || "---"}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant="secondary"
          className={`font-bold px-3 py-1 rounded-xl ${status === ClassSessionStatus.ENDED
              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
              : status === ClassSessionStatus.IN_PROGRESS
                ? "bg-amber-50 text-amber-600 border-amber-100"
                : "bg-slate-50 text-slate-500 border-slate-100"
            }`}
        >
          {status === ClassSessionStatus.ENDED
            ? "Đã kết thúc"
            : status === ClassSessionStatus.IN_PROGRESS
              ? "Đang diễn ra"
              : "Chưa bắt đầu"}
        </Badge>
      );
    },
  },
];
