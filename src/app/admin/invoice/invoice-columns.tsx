"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Receipt } from "lucide-react";
import { INVOICE_STATUS_LABELS, INVOICE_STATUS_COLORS } from "@/constants/label";

export const getColumns = (): ColumnDef<any>[] => [
  {
    accessorKey: "invoiceId",
    header: "Mã HD",
    cell: ({ row }) => (
      <span className="font-mono text-xs font-bold text-primary">
        {row.original.invoiceId?.slice(0, 8).toUpperCase()}
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
    id: "studentCode",
    header: "Mã HS",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-gray-500">
        {row.original.student?.studentCode || "---"}
      </span>
    ),
  },
  {
    id: "courseName",
    header: "Khóa học",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Receipt className="size-4 text-gray-400" />
        <span className="font-semibold text-gray-700">
          {row.original.class?.course?.courseName || "---"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Số tiền",
    cell: ({ row }) => {
      const val = row.original.amount;
      if (val == null) return <span className="text-gray-400">—</span>;
      return (
        <span className="font-bold text-gray-800">
          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(val))}
        </span>
      );
    },
  },
  {
    accessorKey: "transactionId",
    header: "Mã giao dịch",
    cell: ({ row }) => (
      <span className="text-sm text-gray-500 font-mono">
        {row.original.transactionId || "—"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      if (!date) return <span className="text-gray-400">—</span>;
      return (
        <span className="font-medium text-gray-700">
          {new Date(date).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      const label = INVOICE_STATUS_LABELS[status] || status;
      const color = INVOICE_STATUS_COLORS[status] || "bg-gray-100 text-gray-600";
      return <Badge className={`font-bold px-3 py-1 ${color}`}>{label}</Badge>;
    },
  },
];
