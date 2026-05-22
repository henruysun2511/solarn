"use client";

import { Switch } from "@/components/ui/switch";
import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";

interface ColumnProps {
  toggleFeatured: (feedbackId: string, isFeatured: boolean) => void;
}

export const getColumns = ({ toggleFeatured }: ColumnProps): ColumnDef<any>[] => [
  {
    accessorKey: "feedbackId",
    header: "Mã ĐG",
    cell: ({ row }) => (
      <span className="font-mono text-xs font-bold text-primary">
        {row.original.feedbackId?.slice(0, 8).toUpperCase()}
      </span>
    ),
  },
  {
    id: "studentName",
    header: "Học sinh",
    cell: ({ row }) => (
      <span className="font-semibold text-gray-800">
        {row.original.student?.profile?.fullName || "---"}
      </span>
    ),
  },
  {
    id: "teacherName",
    header: "Giáo viên",
    cell: ({ row }) => (
      <span className="text-gray-700">
        {row.original.teacher?.profile?.fullName || "---"}
      </span>
    ),
  },
  {
    id: "classInfo",
    header: "Lớp",
    cell: ({ row }) => (
      <span className="text-xs text-gray-600">
        {row.original.class?.course?.courseName} ({row.original.class?.roomCode})
      </span>
    ),
  },
  {
    accessorKey: "content",
    header: "Nội dung",
    cell: ({ row }) => (
      <p className="text-sm text-slate-500 line-clamp-2 italic max-w-[250px]">
        &ldquo;{row.original.content}&rdquo;
      </p>
    ),
  },
  {
    accessorKey: "starRating",
    header: "Sao",
    cell: ({ row }) => {
      const rating = row.original.starRating;
      return (
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`size-3.5 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
            />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => {
      const d = row.original.createdAt;
      if (!d) return <span className="text-gray-400">---</span>;
      return (
        <span className="text-xs text-gray-500">
          {new Date(d).toLocaleDateString("vi-VN")}
        </span>
      );
    },
  },
  {
    id: "isFeatured",
    header: () => <div className="text-center">Hiển thị</div>,
    cell: ({ row }) => {
      const feedbackId = row.original.feedbackId;
      const isFeatured = row.original.isFeatured || false;
      return (
        <div className="flex justify-center">
          <Switch
            checked={isFeatured}
            onCheckedChange={(checked) => toggleFeatured(feedbackId, checked)}
          />
        </div>
      );
    },
  },
];
