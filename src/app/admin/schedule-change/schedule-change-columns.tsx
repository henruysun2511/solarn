"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RequestStatus } from "@/constants/type";
import { ColumnDef } from "@tanstack/react-table";
import {
    CheckCircle2,
    Clock,
    XCircle,
    RotateCcw,
    ThumbsUp,
    ThumbsDown,
    Loader2,
    Calendar,
    ClockIcon,
} from "lucide-react";

const statusConfig: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  [RequestStatus.PENDING]: {
    label: "Chờ duyệt",
    icon: <Clock className="w-3 h-3" />,
    className: "bg-orange-50 text-orange-600 border-orange-100",
  },
  [RequestStatus.APPROVED]: {
    label: "Đã duyệt",
    icon: <CheckCircle2 className="w-3 h-3" />,
    className: "bg-green-50 text-green-600 border-green-100",
  },
  [RequestStatus.REJECTED]: {
    label: "Từ chối",
    icon: <XCircle className="w-3 h-3" />,
    className: "bg-red-50 text-red-600 border-red-100",
  },
  [RequestStatus.CANCELLED]: {
    label: "Đã hủy",
    icon: <RotateCcw className="w-3 h-3" />,
    className: "bg-gray-50 text-gray-500 border-gray-100",
  },
};

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
    id: "senderName",
    header: "Người gửi",
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
      const cls = row.original.session?.class;
      return cls ? (
        <span className="text-gray-600 text-xs">
          {cls.course?.courseName}
        </span>
      ) : "---";
    },
  },
  {
    id: "currentSession",
    header: "Buổi hiện tại",
    cell: ({ row }) => {
      const session = row.original.session;
      if (!session) return "---";
      return (
        <div className="text-xs text-gray-500 flex flex-col gap-0.5">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(session.studyDate).toLocaleDateString("vi-VN")}
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon className="w-3 h-3" />
            Ca {session.shiftCode}
          </span>
        </div>
      );
    },
  },
  {
    id: "proposed",
    header: "Đề xuất mới",
    cell: ({ row }) => {
      const d = row.original.proposedStudyDate;
      const shift = row.original.proposedShift;
      return (
        <div className="text-xs text-gray-500 flex flex-col gap-0.5">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {d ? new Date(d).toLocaleDateString("vi-VN") : "---"}
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon className="w-3 h-3" />
            {shift ? `${shift.shiftName} (${shift.timeRange})` : row.original.proposedShiftCode || "---"}
          </span>
        </div>
      );
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
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status as string;
      const config = statusConfig[status];
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
