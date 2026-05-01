"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ClassScheduleTemplate } from "@/schemas/template.schema";
import { ColumnDef } from "@tanstack/react-table";
import { ClockIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";

interface ColumnProps {
  onEdit: (template: ClassScheduleTemplate) => void;
  onDelete: (id: string) => void;
}

export const getColumns = ({ onEdit, onDelete }: ColumnProps): ColumnDef<ClassScheduleTemplate>[] => [
  {
    accessorKey: "templateName",
    header: "Tên lịch mẫu",
    cell: ({ row }) => (
      <div className="font-semibold text-gray-800">{row.original.templateName}</div>
    ),
  },
  {
    accessorKey: "weekdays",
    header: "Các thứ trong tuần",
    cell: ({ row }) => {
      const weekdays = row.original.weekdays.split(',').map(d => {
        const day = d.trim();
        return day === '8' ? 'CN' : `T${day}`;
      }).join(', ');
      return <span className="text-gray-500 font-medium">{weekdays}</span>;
    },
  },
  {
    accessorKey: "shiftCode",
    header: "Ca học",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-black bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase">
            {row.original.shiftCode}
          </span>
          <span className="font-bold text-gray-700 text-sm">
            {row.original.shift?.shiftName}
          </span>
        </div>
        <div className="flex items-center gap-1 text-gray-400 text-[11px]">
          <ClockIcon className="size-3" />
          <span>{row.original.shift?.timeRange}</span>
        </div>
      </div>
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
            <DropdownMenuItem onClick={() => row.original.templateId && onDelete(row.original.templateId)} className="text-red-600">
              <TrashIcon className="mr-2 size-4" />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
