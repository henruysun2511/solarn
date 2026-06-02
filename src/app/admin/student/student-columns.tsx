"use client";

import { UserAvatar } from "@/components/common/user-avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Student } from "@/schemas/student.schema";
import { genderLabel } from "@/constants/label";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";

interface ColumnProps {
  onEdit?: (student: Student) => void;
  onDelete?: (id: string) => void;
}

export const getColumns = ({ onEdit, onDelete }: ColumnProps = {}): ColumnDef<Student>[] => [
  {
    accessorKey: "studentCode",
    header: "Mã học sinh",
    cell: ({ row }) => (
      <span className="font-semibold text-primary">{row.original.studentCode}</span>
    ),
  },
  {
    accessorKey: "profile.fullName",
    header: "Tên học sinh",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <UserAvatar
          avatarUrl={row.original.profile?.avatarUrl}
          gender={row.original.profile?.gender}
          fullName={row.original.profile?.fullName}
        />
        <div className="font-semibold text-gray-800">{row.original.profile?.fullName || "---"}</div>
      </div>
    ),
  },
  {
    accessorKey: "profile.email",
    header: "Email",
    cell: ({ row }) => <span className="text-gray-500 line-clamp-1">{row.original.profile?.email || "---"}</span>,
  },
  {
    accessorKey: "profile.phone",
    header: "Số điện thoại",
    cell: ({ row }) => <span className="text-gray-500">{row.original.profile?.phone || "---"}</span>,
  },
  {
    accessorKey: "profile.gender",
    header: "Giới tính",
    cell: ({ row }) => {
      const gender = row.original.profile?.gender;
      return <span className="text-gray-700">{gender ? genderLabel[gender] : "---"}</span>;
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
              <DropdownMenuItem onClick={() => row.original.studentId && onDelete(row.original.studentId)} className="text-red-600">
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
