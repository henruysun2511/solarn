"use client";

import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (): ColumnDef<any>[] => [
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
    id: "sessionInfo",
    header: "Buổi học",
    cell: ({ row }) => {
      const session = row.original.session;
      if (!session) return <span className="text-gray-400">---</span>;
      const date = new Date(session.studyDate).toLocaleDateString("vi-VN");
      return (
        <div className="flex flex-col">
          <span className="font-medium text-gray-700">
            {date} - Ca {session.shiftCode}
          </span>
          {session.shift && (
            <span className="text-xs text-gray-400">{session.shift.shiftName} ({session.shift.timeRange})</span>
          )}
        </div>
      );
    },
  },
  {
    id: "courseName",
    header: "Lớp",
    cell: ({ row }) => (
      <span className="font-semibold text-gray-700">
        {row.original.session?.class?.course?.courseName || "---"}
      </span>
    ),
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
