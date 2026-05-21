"use client";

import { Badge } from "@/components/ui/badge";
import { Request } from "@/schemas/request.schema";
import { ColumnDef } from "@tanstack/react-table";
import { RequestStatus } from "@/constants/type";

const statusLabels: Record<string, string> = {
  [RequestStatus.PENDING]: "Chờ duyệt",
  [RequestStatus.APPROVED]: "Đã duyệt",
  [RequestStatus.REJECTED]: "Từ chối",
};

const statusColors: Record<string, string> = {
  [RequestStatus.PENDING]: "bg-amber-100 text-amber-700",
  [RequestStatus.APPROVED]: "bg-emerald-100 text-emerald-700",
  [RequestStatus.REJECTED]: "bg-red-100 text-red-700",
};

export const getComplaintColumns = (): ColumnDef<Request>[] => [
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
    id: "salaryPeriod",
    header: "Kỳ lương",
    cell: ({ row }) => {
      const salary = (row.original as any).salary;
      if (!salary?.salaryDate) return <span className="text-gray-400">—</span>;
      const d = new Date(salary.salaryDate);
      return (
        <span className="font-semibold text-gray-600">
          Tháng {d.getMonth() + 1}/{d.getFullYear()}
        </span>
      );
    },
  },
  {
    accessorKey: "proposedAmount",
    header: "Số tiền yêu cầu",
    cell: ({ row }) => {
      const val = row.original.proposedAmount;
      if (val == null) return <span className="text-gray-400">—</span>;
      return (
        <span className="font-semibold text-gray-800">
          {Number(val).toLocaleString()}₫
        </span>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Lý do",
    cell: ({ row }) => (
      <span className="text-gray-500 line-clamp-2 max-w-[250px]">
        {row.original.reason || "—"}
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
];
