"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { SortOrder } from "@/constants/sort";
import { useGetClassesByCourseId } from "@/queries/useClassQuery";
import { useGetCourses } from "@/queries/useCourseQuery";
import { useGetScheduleSessionsByClass } from "@/queries/useScheduleSessionQuery";
import { AssignmentResultParams } from "@/schemas/assignment-result.schema";
import { BookOpen, Layers, CalendarDays } from "lucide-react";

interface AssignmentResultFilterProps {
  params: AssignmentResultParams;
  onFilterChange: (filters: Partial<AssignmentResultParams>) => void;
}

export function AssignmentResultFilter({ params, onFilterChange }: AssignmentResultFilterProps) {
  const { data: coursesData } = useGetCourses({ limit: 100, page: 1 });
  const courses = coursesData?.data || [];

  const courseId = params.courseId as string | undefined;
  const classId = params.classId as string | undefined;

  const { data: classesData, isLoading: classesLoading } = useGetClassesByCourseId(courseId || "", { page: 1, limit: 100 });
  const classes = courseId ? (classesData?.data || []) : [];

  const { data: sessionsData, isLoading: sessionsLoading } = useGetScheduleSessionsByClass(classId || "", { page: 1, limit: 200, sortOrder: SortOrder.ASC, sortBy: "studyDate" });
  const sessions = classId ? (sessionsData?.data || []) : [];

  return (
    <div className="p-5 border-b border-gray-200 flex flex-wrap items-center gap-4">
      {/* Course */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
          <BookOpen className="size-3" /> Khóa học
        </label>
        <Select
          value={courseId || ""}
          onValueChange={(val) => onFilterChange({ courseId: val || undefined, classId: undefined, sessionId: undefined, page: 1 })}
        >
          <SelectTrigger className="w-[260px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue placeholder="Chọn khóa học" />
          </SelectTrigger>
          <SelectContent data-role="admin">
            {courses.map((c: any) => (
              <SelectItem key={c.courseId} value={c.courseId}>{c.courseName}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Class */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
          <Layers className="size-3" /> Lớp
        </label>
        {classesLoading ? (
          <Skeleton className="w-[220px] h-10 rounded-xl" />
        ) : (
          <Select
            value={classId || ""}
            disabled={!courseId}
            onValueChange={(val) => onFilterChange({ classId: val || undefined, sessionId: undefined, page: 1 })}
          >
            <SelectTrigger className="w-[220px] h-10 border-gray-300 bg-white shadow-sm">
              <SelectValue placeholder={courseId ? "Chọn lớp" : "Chọn khóa học trước"} />
            </SelectTrigger>
            <SelectContent data-role="admin">
              {classes.map((c: any) => (
                <SelectItem key={c.classId} value={c.classId}>{c.roomCode}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Session */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1">
          <CalendarDays className="size-3" /> Buổi học
        </label>
        {sessionsLoading ? (
          <Skeleton className="w-[220px] h-10 rounded-xl" />
        ) : (
          <Select
            value={params.sessionId || ""}
            disabled={!classId}
            onValueChange={(val) => onFilterChange({ sessionId: val || undefined, page: 1 })}
          >
            <SelectTrigger className="w-[220px] h-10 border-gray-300 bg-white shadow-sm">
              <SelectValue placeholder={classId ? "Chọn buổi học" : "Chọn lớp trước"} />
            </SelectTrigger>
            <SelectContent data-role="admin">
              {sessions.map((s: any) => (
                <SelectItem key={s.sessionId} value={s.sessionId}>
                  {new Date(s.studyDate).toLocaleDateString("vi-VN")} (Ca {s.shiftCode})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
