"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Calendar, Clock, Award } from "lucide-react";

export const getColumns = (): ColumnDef<any>[] => [
  {
    id: "studentCode",
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
    cell: ({ row }) => (
      <span className="font-semibold text-gray-800">
        {row.original.student?.profile?.fullName || "---"}
      </span>
    ),
  },
  {
    id: "classInfo",
    header: "Lớp",
    cell: ({ row }) => (
      <span className="text-xs text-gray-600">
        {row.original.session?.class?.course?.courseName} ({row.original.session?.class?.roomCode})
      </span>
    ),
  },
  {
    id: "sessionDate",
    header: "Buổi học",
    cell: ({ row }) => {
      const s = row.original.session;
      if (!s) return "---";
      return (
        <div className="text-xs text-gray-500 flex flex-col gap-0.5">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(s.studyDate).toLocaleDateString("vi-VN")}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Ca {s.shift?.shiftName || s.shiftCode} {s.shift?.timeRange ? `(${s.shift.timeRange})` : ""}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "score",
    header: "Điểm",
    cell: ({ row }) => {
      const score = row.original.score;
      if (score == null) return <span className="text-gray-400">---</span>;
      const numScore = Number(score);
      let color = "text-red-600";
      if (numScore >= 8) color = "text-green-600";
      else if (numScore >= 5) color = "text-blue-600";
      else if (numScore >= 3) color = "text-yellow-600";
      return (
        <span className={`font-bold text-lg flex items-center gap-1 ${color}`}>
          <Award className="w-4 h-4" />
          {numScore.toFixed(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "feedback",
    header: "Nhận xét",
    cell: ({ row }) => (
      <p className="text-sm text-slate-500 line-clamp-1 italic max-w-[200px]">
        {row.original.feedback ? `"${row.original.feedback}"` : "---"}
      </p>
    ),
  },
  {
    accessorKey: "gradedAt",
    header: "Nhập điểm lúc",
    cell: ({ row }) => {
      const d = row.original.gradedAt;
      if (!d) return <span className="text-gray-400">---</span>;
      return (
        <span className="text-xs text-gray-500">
          {new Date(d).toLocaleString("vi-VN")}
        </span>
      );
    },
  },
];
