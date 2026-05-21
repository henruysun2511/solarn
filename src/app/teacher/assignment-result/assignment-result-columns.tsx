"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (): ColumnDef<any>[] => [
  {
    accessorKey: "student.studentCode",
    header: "Mã học sinh",
    cell: ({ row }) => (
      <span className="font-semibold text-primary">{row.original.student?.studentCode || "---"}</span>
    ),
  },
  {
    id: "studentName",
    header: "Tên học sinh",
    cell: ({ row }) => (
      <span className="font-medium text-gray-800">
        {row.original.student?.profile?.fullName || "---"}
      </span>
    ),
  },
  {
    id: "sessionInfo",
    header: "Buổi học",
    cell: ({ row }) => {
      const session = row.original.session;
      if (!session) return <span className="text-gray-400">---</span>;
      const date = new Date(session.studyDate).toLocaleDateString("vi-VN");
      return (
        <span className="text-sm text-gray-600">
          {date} - Ca {session.shiftCode}
        </span>
      );
    },
  },
  {
    accessorKey: "score",
    header: "Điểm",
    cell: ({ row }) => {
      const score = Number(row.original.score);
      let color = "text-red-500";
      if (score >= 8) color = "text-emerald-600";
      else if (score >= 5) color = "text-amber-600";
      return (
        <span className={`font-black text-lg ${color}`}>
          {score.toFixed(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "feedback",
    header: "Nhận xét",
    cell: ({ row }) => (
      <span className="text-gray-500 text-sm line-clamp-2 max-w-[250px]">
        {row.original.feedback || "—"}
      </span>
    ),
  },
];
