"use client";

import { BadgeLevel } from "@/components/common/badge-level";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Course } from "@/schemas/course.schema";
import {
  ClockIcon,
  Edit2Icon,
  EyeIcon,
  LayersIcon,
  MoreVerticalIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react";

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export function CourseCard({ course, onEdit, onDelete, onView }: CourseCardProps) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm group hover:shadow-md transition-all">
      <div className="h-40 relative">
        {course.image ? (
          <img
            src={course.image}
            alt={course.courseName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-primary/5 flex items-center justify-center text-primary font-black text-2xl uppercase">
            {course.courseName.substring(0, 2)}
          </div>
        )}
        <div className="absolute top-3 left-3">
          <BadgeLevel level={course.level || "Unknown"} />
        </div>
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="size-8 rounded-full bg-white/90 text-gray-800 hover:bg-white shadow-sm"
              >
                <MoreVerticalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 p-2 rounded-2xl border-gray-100 shadow-xl"
            >
              <DropdownMenuItem
                onClick={() => onView(course.courseId || "")}
                className="flex items-center gap-2 p-3 rounded-xl cursor-pointer hover:bg-primary/5 font-bold transition-colors"
              >
                <EyeIcon className="size-4" />
                <span>Xem chi tiết</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onEdit(course)}
                className="flex items-center gap-2 p-3 rounded-xl cursor-pointer hover:bg-primary/5 font-bold transition-colors"
              >
                <Edit2Icon className="size-4" />
                <span>Chỉnh sửa</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => course.courseId && onDelete(course.courseId)}
                className="flex items-center gap-2 p-3 rounded-xl cursor-pointer hover:bg-red-50 text-red-500 font-bold transition-colors"
              >
                <Trash2Icon className="size-4" />
                <span>Xóa khóa học</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">
          {course.courseId?.substring(0, 8)}
        </p>
        <h3 className="font-bold text-gray-800 line-clamp-1 mb-4">{course.courseName}</h3>

        <div className="grid grid-cols-2 gap-y-3 mb-5">
          <div className="flex items-center gap-2 text-gray-500">
            <ClockIcon className="size-3.5 text-slate-400" />
            <span className="text-xs font-medium">{course.totalSessions} tiết</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <UsersIcon className="size-3.5 text-slate-400" />
            <span className="text-xs font-medium">{course.totalClasses || 0} lớp</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 col-span-2">
            <LayersIcon className="size-3.5 text-slate-400" />
            <span className="text-xs font-medium truncate">Level: {course.level || "---"}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-dashed border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-gray-400 uppercase">Học phí</span>
            <span className="text-lg font-black text-gray-800">
              {Number(course.tuitionFee).toLocaleString()}đ
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="rounded-xl text-primary font-bold hover:bg-primary/5"
            onClick={() => course.courseId && onView(course.courseId)}
          >
            Chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
}


