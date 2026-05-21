"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Salary } from "@/schemas/salary.schema";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, MoreVerticalIcon } from "lucide-react";

interface ColumnProps {
  onView: (salary: Salary) => void;
}

export const getColumns = ({ onView }: ColumnProps): ColumnDef<Salary>[] => [
  {
    accessorKey: "teacher",
    header: "Giảng viên",
    cell: ({ row }) => {
      const salary = row.original;
      const teacher = salary.teacher;
      const fullName = teacher?.profile?.fullName || "N/A";
      const teacherCode = teacher?.teacherCode || "";
      return (
        <div className="flex items-center gap-3 py-1">
          <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">
            {fullName.split(" ").pop()?.substring(0, 2).toUpperCase() || "GV"}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-800 leading-tight">{fullName}</span>
            {teacherCode && (
              <span className="text-[11px] font-medium text-gray-400">{teacherCode}</span>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "salaryDate",
    header: "Kỳ lương",
    cell: ({ row }) => {
      const date = row.original.salaryDate;
      const d = new Date(date);
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      return (
        <span className="font-semibold text-gray-600">
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
      <span className="font-black text-primary">
        {Number(row.original.totalAmount).toLocaleString()}₫
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-6">Thao tác</div>,
    cell: ({ row }) => (
      <div className="text-right pr-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-9 hover:bg-gray-100 rounded-xl">
              <MoreVerticalIcon className="size-5 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(row.original)}>
              <EyeIcon className="mr-2 size-4" />
              Xem chi tiết
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
