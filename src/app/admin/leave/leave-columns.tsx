"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RequestStatus } from "@/constants/type";
import { REQUEST_STATUS_CONFIG } from "@/constants/label";
import { ColumnDef } from "@tanstack/react-table";
import {
    ThumbsUp,
    ThumbsDown,
    Loader2,
    Calendar
} from "lucide-react";

interface ColumnProps {
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
  processingId: string | null;
}

export const getColumns = ({ onApprove, onReject, processingId }: ColumnProps): ColumnDef<any>[] => [
  {
    accessorKey: "requestId",
    header: "Mã đơn",
    cell: ({ row }) => (
      <span className="font-mono text-xs font-bold text-primary">
        {row.original.requestId?.slice(0, 8).toUpperCase()}
      </span>
    ),
  },
  {
    id: "studentName",
    header: "Học sinh",
    cell: ({ row }) => (
      <span className="font-semibold text-gray-800">
        {row.original.senderAccount?.profile?.fullName || "---"}
      </span>
    ),
  },
  {
    id: "classInfo",
    header: "Lớp",
    cell: ({ row }) => {
      const cls = row.original.enrollment?.class;
      return (
        <span className="text-gray-600 text-xs">
          {cls?.course?.courseName} ({cls?.roomCode})
        </span>
      );
    },
  },
  {
    accessorKey: "leaveStartDate",
    header: "Bảo lưu từ",
    cell: ({ row }) => {
      const d = row.original.leaveStartDate;
      return d ? (
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <Calendar className="w-3 h-3" /> {new Date(d).toLocaleDateString("vi-VN")}
        </span>
      ) : "---";
    },
  },
  {
    accessorKey: "leaveEndDate",
    header: "Đến ngày",
    cell: ({ row }) => {
      const d = row.original.leaveEndDate;
      return d ? (
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <Calendar className="w-3 h-3" /> {new Date(d).toLocaleDateString("vi-VN")}
        </span>
      ) : "---";
    },
  },
  {
    accessorKey: "reason",
    header: "Lý do",
    cell: ({ row }) => (
      <p className="text-sm text-slate-500 line-clamp-1 font-medium italic max-w-[200px]">
        &ldquo;{row.original.reason}&rdquo;
      </p>
    ),
  },
  {
    accessorKey: "progressAtRequest",
    header: "Tiến độ",
    cell: ({ row }) => {
      const p = row.original.progressAtRequest;
      return p !== null && p !== undefined ? (
        <span className="text-xs font-bold text-gray-600">{p}%</span>
      ) : "---";
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status as string;
      const config = REQUEST_STATUS_CONFIG[status];
      if (!config) return <span className="text-gray-400">{status}</span>;
      return (
        <Badge className={`${config.className} px-3 py-1 rounded-lg flex items-center gap-1.5 w-fit font-black text-[10px]`}>
          {config.icon} {config.label}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-6">Thao tác</div>,
    cell: ({ row }) => {
      const status = row.original.status;
      const requestId = row.original.requestId;
      const isPending = status === RequestStatus.PENDING;
      const isProcessing = processingId === requestId;

      if (!isPending) {
        return <div className="text-right pr-6 text-[10px] text-gray-400 font-medium">Đã xử lý</div>;
      }

      return (
        <div className="flex justify-end gap-2 pr-6">
          <Button
            size="sm"
            disabled={isProcessing}
            onClick={() => onApprove(requestId)}
            className="h-8 px-3 rounded-lg bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 disabled:opacity-40 font-bold text-[11px] flex items-center gap-1"
          >
            {isProcessing ? <Loader2 className="w-3 h-3 animate-spin" /> : <ThumbsUp className="w-3 h-3" />}
            Duyệt
          </Button>
          <Button
            size="sm"
            disabled={isProcessing}
            onClick={() => onReject(requestId)}
            className="h-8 px-3 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 disabled:opacity-40 font-bold text-[11px] flex items-center gap-1"
          >
            {isProcessing ? <Loader2 className="w-3 h-3 animate-spin" /> : <ThumbsDown className="w-3 h-3" />}
            Từ chối
          </Button>
        </div>
      );
    },
  },
];
