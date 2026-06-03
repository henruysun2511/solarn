"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Blog } from "@/schemas/blog.schema";
import { formatDate } from "@/utils/format";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";

interface ColumnProps {
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
  onView: (blog: Blog) => void;
}

export const getColumns = ({ onEdit, onDelete, onView }: ColumnProps): ColumnDef<Blog>[] => [
  {
    accessorKey: "title",
    header: "Tiêu đề",
    cell: ({ row }) => (
      <div className="flex items-center gap-3 max-w-[300px]">
        {row.original.thumbnail && (
          <img src={row.original.thumbnail} alt="" className="size-10 rounded-lg object-cover flex-shrink-0" />
        )}
        <button onClick={() => onView(row.original)} className="font-semibold text-gray-800 line-clamp-2 hover:text-primary transition-colors text-left">
          {row.original.title}
        </button>
      </div>
    ),
  },
  {
    accessorKey: "author",
    header: "Tác giả",
    cell: ({ row }) => <span className="text-gray-500">{row.original.author || "---"}</span>,
  },
  {
    accessorKey: "isPublished",
    header: "Trạng thái",
    cell: ({ row }) => (
      <Badge className={row.original.isPublished ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}>
        {row.original.isPublished ? "Đã xuất bản" : "Nháp"}
      </Badge>
    ),
  },
  {
    accessorKey: "publishedAt",
    header: "Ngày xuất bản",
    cell: ({ row }) => (
      <span className="text-gray-500 text-sm">
        {row.original.publishedAt ? formatDate(row.original.publishedAt) : "---"}
      </span>
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
            <DropdownMenuItem onClick={() => onView(row.original)}>
              <EyeIcon className="mr-2 size-4" /> Xem
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <PencilIcon className="mr-2 size-4" /> Sửa
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => row.original.blogId && onDelete(row.original.blogId)} className="text-red-600">
              <TrashIcon className="mr-2 size-4" /> Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
