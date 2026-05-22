"use client";

import { UserAvatar } from "@/components/common/user-avatar";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export const getProgressColumns = (): ColumnDef<any>[] => [
  {
    accessorKey: "studentCode",
    header: "Mã HS",
    cell: ({ row }) => (
      <span className="font-semibold text-primary">{row.original.studentCode}</span>
    ),
  },
  {
    accessorKey: "fullName",
    header: "Học sinh",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <UserAvatar
          avatarUrl={row.original.avatarUrl}
          fullName={row.original.fullName}
        />
        <div className="font-semibold text-gray-800">{row.original.fullName || "---"}</div>
      </div>
    ),
  },
  {
    accessorKey: "roomCode",
    header: "Lớp",
    cell: ({ row }) => <span className="text-gray-500">{row.original.roomCode}</span>,
  },
  {
    accessorKey: "attendedSessions",
    header: "Có mặt",
    cell: ({ row }) => (
      <span className="text-green-600 font-semibold">{row.original.attendedSessions}</span>
    ),
  },
  {
    accessorKey: "absentSessions",
    header: "Vắng",
    cell: ({ row }) => (
      <span className="text-red-500 font-semibold">{row.original.absentSessions}</span>
    ),
  },
  {
    accessorKey: "unmarkedSessions",
    header: "Chưa ĐD",
    cell: ({ row }) => (
      <span className="text-orange-400 font-semibold">{row.original.unmarkedSessions}</span>
    ),
  },
  {
    accessorKey: "endedSessions",
    header: "Đã kết thúc",
    cell: ({ row }) => (
      <span className="text-gray-600">{row.original.endedSessions}/{row.original.totalSessions}</span>
    ),
  },
  {
    accessorKey: "progressPercent",
    header: "Tiến độ",
    cell: ({ row }) => {
      const pct = row.original.progressPercent;
      let color = "bg-green-500";
      if (pct < 30) color = "bg-red-500";
      else if (pct < 70) color = "bg-amber-500";
      return (
        <div className="flex items-center gap-2">
          <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
          </div>
          <span className="font-semibold text-sm">{pct}%</span>
        </div>
      );
    },
  },
];
