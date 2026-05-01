"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { StudyShift } from "@/schemas/shift.schema";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";

interface ColumnProps {
  onEdit: (shift: StudyShift) => void;
  onDelete: (id: string) => void;
}

export const getColumns = ({ onEdit, onDelete }: ColumnProps): ColumnDef<StudyShift>[] => [
  {
    accessorKey: "shiftCode",
    header: "Mã ca học",
    cell: ({ row }) => (
      <span className="font-semibold text-primary">{row.original.shiftCode}</span>
    ),
  },
  {
    accessorKey: "shiftName",
    header: "Tên ca học",
    cell: ({ row }) => (
      <div className="font-semibold text-gray-800">{row.original.shiftName}</div>
    ),
  },
  {
    accessorKey: "timeRange",
    header: "Khoảng thời gian",
    cell: ({ row }) => <span className="text-gray-500">{row.original.timeRange}</span>,
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
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <PencilIcon className="mr-2 size-4" />
              Sửa
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => row.original.shiftId && onDelete(row.original.shiftId)} className="text-red-600">
              <TrashIcon className="mr-2 size-4" />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
