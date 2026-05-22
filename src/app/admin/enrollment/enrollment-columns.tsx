"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EnrollmentStatus } from "@/constants/type";
import { ColumnDef } from "@tanstack/react-table";
import {
    CheckCircle2,
    Clock,
    MoreVerticalIcon,
    PencilIcon,
    TrashIcon,
    XCircle,
    Ban,
    RotateCcw
} from "lucide-react";

interface ColumnProps {
  onEdit?: (enrollment: any) => void;
  onDelete?: (id: string) => void;
}

const statusConfig: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  [EnrollmentStatus.NOT_STARTED]: {
    label: "Chưa bắt đầu",
    icon: <Clock className="w-3 h-3" />,
    className: "bg-orange-50 text-orange-600 border-orange-100"
  },
  [EnrollmentStatus.IN_PROGRESS]: {
    label: "Đang học",
    icon: <CheckCircle2 className="w-3 h-3" />,
    className: "bg-blue-50 text-blue-600 border-blue-100"
  },
  [EnrollmentStatus.COMPLETED]: {
    label: "Hoàn thành",
    icon: <CheckCircle2 className="w-3 h-3" />,
    className: "bg-green-50 text-green-600 border-green-100"
  },
  [EnrollmentStatus.DROPPED]: {
    label: "Đã hủy",
    icon: <XCircle className="w-3 h-3" />,
    className: "bg-red-50 text-red-600 border-red-100"
  },
  [EnrollmentStatus.DEFERRED]: {
    label: "Bảo lưu",
    icon: <RotateCcw className="w-3 h-3" />,
    className: "bg-purple-50 text-purple-600 border-purple-100"
  }
};

export const getColumns = ({ onEdit, onDelete }: ColumnProps = {}): ColumnDef<any>[] => [
  {
    accessorKey: "student.studentCode",
    header: "Mã HS",
    cell: ({ row }) => (
      <span className="font-semibold text-primary">{row.original.student?.studentCode}</span>
    ),
  },
  {
    accessorKey: "student.profile.fullName",
    header: "Học sinh",
    cell: ({ row }) => (
      <span className="font-semibold text-gray-800">{row.original.student?.profile?.fullName || "---"}</span>
    ),
  },
  {
    accessorKey: "student.profile.email",
    header: "Email",
    cell: ({ row }) => <span className="text-gray-500 line-clamp-1">{row.original.student?.profile?.email || "---"}</span>,
  },
  {
    accessorKey: "class.classCode",
    header: "Lớp",
    cell: ({ row }) => (
      <span className="font-semibold text-gray-700">{row.original.class?.classCode || "---"}</span>
    ),
  },
  {
    accessorKey: "class.course.courseName",
    header: "Khóa học",
    cell: ({ row }) => (
      <span className="text-gray-600">{row.original.class?.course?.courseName || "---"}</span>
    ),
  },
  {
    accessorKey: "class.roomCode",
    header: "Phòng",
    cell: ({ row }) => (
      <span className="text-gray-500">{row.original.class?.roomCode || "---"}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Ngày ĐK",
    cell: ({ row }) => {
      const d = row.original.createdAt;
      return <span className="text-gray-500">{d ? new Date(d).toLocaleDateString("vi-VN") : "---"}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status as string;
      const config = statusConfig[status];
      if (!config) return <span className="text-gray-400">{status}</span>;
      return (
        <Badge className={`${config.className} px-3 py-1 rounded-lg flex items-center gap-1.5 w-fit font-black text-[10px] hover:${config.className}`}>
          {config.icon} {config.label}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-6">Thao tác</div>,
    cell: ({ row }) => (
      <div className="text-right pr-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-9">
              <MoreVerticalIcon className="size-5 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(row.original)}>
                <PencilIcon className="mr-2 size-4" />
                Sửa
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem onClick={() => row.original.enrollmentId && onDelete(row.original.enrollmentId)} className="text-red-600">
                <TrashIcon className="mr-2 size-4" />
                Xóa
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
