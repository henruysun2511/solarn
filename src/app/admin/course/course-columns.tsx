"use client";

import { BadgeLevel } from "@/components/common/badge-level";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Course } from "@/schemas/course.schema";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";

interface ColumnProps {
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export const getColumns = ({ onEdit, onDelete, onView }: ColumnProps): ColumnDef<Course>[] => [
  {
    accessorKey: "courseName",
    header: "Khóa học",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="flex items-center gap-3 py-1">
          <div className="size-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-100 shadow-sm flex-shrink-0">
            {course.image ? (
              <img src={course.image} alt={course.courseName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary text-[10px] font-bold uppercase">
                {course.courseName.substring(0, 2)}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-800 leading-tight text-primary">{course.courseName}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "level",
    header: "Trình độ",
    cell: ({ row }) => (
      <BadgeLevel level={row.original.level || "Unknown"} />
    ),
  },
  {
    accessorKey: "totalSessions",
    header: "Số buổi",
    cell: ({ row }) => (
      <span className="font-semibold text-gray-600">{row.original.totalSessions} buổi</span>
    ),
  },
  {
    accessorKey: "tuitionFee",
    header: "Học phí",
    cell: ({ row }) => (
      <span className="font-black text-primary ">
        {Number(row.original.tuitionFee).toLocaleString()}₫
      </span>
    ),
  },
  {
    accessorKey: "totalClasses",
    header: "Số lớp",
    cell: ({ row }) => (
      <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold px-3">
        {row.original.totalClasses || 0} lớp
      </Badge>
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
            <DropdownMenuItem onClick={() => row.original.courseId && onView(row.original.courseId)}>
              <EyeIcon className="mr-2 size-4" />
              Xem chi tiết
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onEdit(row.original)}
            >
              <PencilIcon className="mr-2 size-4" />
              Sửa
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => row.original.courseId && onDelete(row.original.courseId)}
              className="text-red-600"
            >
              <TrashIcon className="mr-2 size-4" />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];


