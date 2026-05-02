"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Room } from "@/schemas/room.schema";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";

interface ColumnProps {
  onEdit: (room: Room) => void;
  onDelete: (id: string) => void;
}

export const getColumns = ({ onEdit, onDelete }: ColumnProps): ColumnDef<Room>[] => [
  {
    accessorKey: "roomCode",
    header: "Mã phòng",
    cell: ({ row }) => (
      <span className="font-semibold text-primary">{row.original.roomCode}</span>
    ),
  },
  {
    accessorKey: "capacity",
    header: "Sức chứa",
    cell: ({ row }) => (
      <div className="font-semibold text-gray-800">{row.original.capacity}</div>
    ),
  },
  {
    accessorKey: "branch.branchName",
    header: "Chi nhánh",
    cell: ({ row }) => <span className="text-gray-500">{row.original.branch?.branchName || "---"}</span>,
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
            <DropdownMenuItem onClick={() => row.original.roomId && onDelete(row.original.roomId)} className="text-red-600">
              <TrashIcon className="mr-2 size-4" />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
