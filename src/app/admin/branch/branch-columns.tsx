"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Branch } from "@/schemas/branch.schema";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";

interface ColumnProps {
  onEdit: (branch: Branch) => void;
  onDelete: (id: string) => void;
}

export const getColumns = ({ onEdit, onDelete }: ColumnProps): ColumnDef<Branch>[] => [
  {
    accessorKey: "branchCode",
    header: "Mã chi nhánh",
    cell: ({ row }) => (
      <span className="font-semibold text-primary">{row.original.branchCode}</span>
    ),
  },
  {
    accessorKey: "branchName",
    header: "Tên chi nhánh",
    cell: ({ row }) => (
      <div className="font-semibold text-gray-800">{row.original.branchName}</div>
    ),
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
    cell: ({ row }) => <span className="text-gray-500 line-clamp-1">{row.original.address}</span>,
  },
  {
    accessorKey: "phone",
    header: "Số điện thoại",
    cell: ({ row }) => <span className="text-gray-500">{row.original.phone || "---"}</span>,
  },
  {
    accessorKey: "isActive",
    header: "Trạng thái",
    cell: ({ row }) => (
      <Badge className={row.original.isActive ? "bg-green-100 text-green-600 hover:bg-green-100" : "bg-red-100 text-red-600 hover:bg-red-100"}>
        {row.original.isActive ? "Hoạt động" : "Ngưng hoạt động"}
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
            <Button variant="ghost" size="icon" className="size-9">
              <MoreVerticalIcon className="size-5 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <PencilIcon className="mr-2 size-4" />
              Sửa
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => row.original.branchId && onDelete(row.original.branchId)} className="text-red-600">
              <TrashIcon className="mr-2 size-4" />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
