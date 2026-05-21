"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Salary } from "@/schemas/salary.schema";
import { ColumnDef } from "@tanstack/react-table";
import { AlertCircleIcon, EyeIcon } from "lucide-react";

interface ColumnProps {
  onView: (salary: Salary) => void;
  onComplaint: (salary: Salary) => void;
}

export const getColumns = ({ onView, onComplaint }: ColumnProps): ColumnDef<Salary>[] => [
  {
    accessorKey: "salaryDate",
    header: "Kỳ lương",
    cell: ({ row }) => {
      const date = row.original.salaryDate;
      const d = new Date(date);
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      return (
        <span className="font-bold text-gray-700">
          Tháng {month}/{year}
        </span>
      );
    },
  },
  {
    accessorKey: "totalSessions",
    header: "Số buổi",
    cell: ({ row }) => (
      <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold px-3">
        {row.original.totalSessions} buổi
      </Badge>
    ),
  },
  {
    accessorKey: "bonus",
    header: "Thưởng",
    cell: ({ row }) => {
      const val = Number(row.original.bonus);
      return val > 0 ? (
        <span className="font-semibold text-emerald-600">+{val.toLocaleString()}₫</span>
      ) : (
        <span className="text-gray-300">—</span>
      );
    },
  },
  {
    accessorKey: "deduction",
    header: "Khấu trừ",
    cell: ({ row }) => {
      const val = Number(row.original.deduction);
      return val > 0 ? (
        <span className="font-semibold text-red-500">-{val.toLocaleString()}₫</span>
      ) : (
        <span className="text-gray-300">—</span>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Thực nhận",
    cell: ({ row }) => (
      <span className="font-black text-[var(--primary)]">
        {Number(row.original.totalAmount).toLocaleString()}₫
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center">Hành động</div>,
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-9 rounded-xl border-slate-200 text-xs font-bold gap-1.5 hover:bg-[var(--accent)] hover:text-[var(--primary)] transition-colors"
          onClick={() => onView(row.original)}
        >
          <EyeIcon className="size-3.5" /> Xem
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 rounded-xl text-amber-600 hover:text-amber-700 hover:bg-amber-50 font-bold text-xs gap-1.5"
          onClick={() => onComplaint(row.original)}
        >
          <AlertCircleIcon className="size-3.5" /> Khiếu nại
        </Button>
      </div>
    ),
  },
];
