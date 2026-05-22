"use client";

import { Badge } from "@/components/ui/badge";
import { ResourceType } from "@/constants/type";
import { CourseResource } from "@/schemas/course-resource.schema";
import { ColumnDef } from "@tanstack/react-table";
import {
  ExternalLink,
  FileAudio,
  FileText,
  FileVideo,
} from "lucide-react";

const getResourceIcon = (type: ResourceType) => {
  switch (type) {
    case ResourceType.DOCUMENT:
      return { icon: <FileText className="size-4" />, className: "bg-blue-50 text-blue-600 border-blue-100" };
    case ResourceType.VIDEO:
      return { icon: <FileVideo className="size-4" />, className: "bg-amber-50 text-amber-600 border-amber-100" };
    case ResourceType.AUDIO:
      return { icon: <FileAudio className="size-4" />, className: "bg-purple-50 text-purple-600 border-purple-100" };
    default:
      return { icon: <FileText className="size-4" />, className: "bg-gray-50 text-gray-600 border-gray-100" };
  }
};

export const getColumns = (): ColumnDef<CourseResource>[] => [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => (
      <span className="text-gray-400 font-mono text-sm">
        {String(row.index + 1).padStart(2, "0")}
      </span>
    ),
  },
  {
    accessorKey: "title",
    header: "Tên tài nguyên",
    cell: ({ row }) => {
      const resource = row.original;
      const config = getResourceIcon(resource.type);
      return (
        <div className="flex items-center gap-3 py-1">
          <div className={`p-2.5 rounded-xl border flex-shrink-0 ${config.className}`}>
            {config.icon}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-gray-800 text-sm truncate max-w-[280px]">
              {resource.title}
            </span>
            <span className="text-[11px] text-gray-400 font-medium truncate max-w-[280px]">
              Khóa: {resource.course?.courseName || "---"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Định dạng",
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-xl uppercase tracking-wider text-[10px]">
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "fileUrl",
    header: "Liên kết",
    cell: ({ row }) => (
      <a
        href={row.original.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold text-primary hover:underline flex items-center gap-1.5 max-w-[220px] truncate"
      >
        <ExternalLink className="size-3.5 flex-shrink-0" />
        <span className="truncate">{row.original.fileUrl}</span>
      </a>
    ),
  },
];
