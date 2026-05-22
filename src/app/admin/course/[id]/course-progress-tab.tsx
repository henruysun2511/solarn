"use client";

import { Badge } from "@/components/ui/badge";
import { Loading } from "@/components/common/loading";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetStudentProgressList } from "@/queries/useCourseQuery";
import {
    CheckCircle2,
    Clock,
    XCircle,
    RotateCcw,
} from "lucide-react";
import { EnrollmentStatus } from "@/constants/type";

interface CourseProgressTabProps {
  courseId: string;
}

const statusBadge: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  [EnrollmentStatus.NOT_STARTED]: {
    label: "Chưa BĐ",
    icon: <Clock className="w-3 h-3" />,
    className: "bg-orange-50 text-orange-600 border-orange-100",
  },
  [EnrollmentStatus.IN_PROGRESS]: {
    label: "Đang học",
    icon: <CheckCircle2 className="w-3 h-3" />,
    className: "bg-blue-50 text-blue-600 border-blue-100",
  },
  [EnrollmentStatus.COMPLETED]: {
    label: "HT",
    icon: <CheckCircle2 className="w-3 h-3" />,
    className: "bg-green-50 text-green-600 border-green-100",
  },
  [EnrollmentStatus.DROPPED]: {
    label: "Đã hủy",
    icon: <XCircle className="w-3 h-3" />,
    className: "bg-red-50 text-red-600 border-red-100",
  },
  [EnrollmentStatus.DEFERRED]: {
    label: "BL",
    icon: <RotateCcw className="w-3 h-3" />,
    className: "bg-purple-50 text-purple-600 border-purple-100",
  },
};

function ProgressBar({ percent }: { percent: number }) {
  const color =
    percent >= 80 ? "bg-green-500" :
    percent >= 50 ? "bg-blue-500" :
    percent >= 20 ? "bg-yellow-500" :
    "bg-red-500";

  return (
    <div className="flex items-center gap-3 min-w-[180px]">
      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
      <span className="text-xs font-bold text-gray-600 w-12 text-right tabular-nums">
        {percent}%
      </span>
    </div>
  );
}

export function CourseProgressTab({ courseId }: CourseProgressTabProps) {
  const { data, isLoading } = useGetStudentProgressList(courseId);

  const students = data?.students ?? [];

  return (
    <div data-role="admin" className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            Tiến độ học viên
          </h3>
          <p className="text-gray-400 text-xs font-medium mt-0.5">
            {data?.courseName} &middot; {data?.totalSessions ?? 0} buổi học
          </p>
        </div>
      </div>

      {isLoading ? (
        <Loading message="Đang tải tiến độ học viên..." />
      ) : students.length === 0 ? (
        <div className="py-12 text-center text-xs font-black text-gray-400 uppercase tracking-widest">
          Chưa có học viên nào trong khóa học này.
        </div>
      ) : (
        <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400 pl-6">Mã HS</TableHead>
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Học sinh</TableHead>
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Email</TableHead>
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Lớp</TableHead>
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Buổi (KT/Tổng)</TableHead>
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Có mặt</TableHead>
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Vắng</TableHead>
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Tiến độ</TableHead>
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">TT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-50 bg-white">
              {students.map((s: any) => {
                const badge = statusBadge[s.enrollmentStatus];
                return (
                  <TableRow key={s.studentId} className="hover:bg-gray-50/20 transition-colors">
                    <TableCell className="p-4 pl-6 font-mono text-xs font-bold text-primary">{s.studentCode}</TableCell>
                    <TableCell className="p-4 text-xs font-bold text-gray-800">{s.fullName}</TableCell>
                    <TableCell className="p-4 text-xs text-gray-500">{s.email || "---"}</TableCell>
                    <TableCell className="p-4 text-xs font-semibold text-gray-600">{s.roomCode}</TableCell>
                    <TableCell className="p-4 text-xs font-bold text-gray-700">{s.endedSessions}/{s.totalSessions}</TableCell>
                    <TableCell className="p-4 text-xs font-bold text-green-600">{s.attendedSessions}</TableCell>
                    <TableCell className="p-4 text-xs font-bold text-red-500">{s.absentSessions}</TableCell>
                    <TableCell className="p-4">
                      <ProgressBar percent={s.progressPercent} />
                    </TableCell>
                    <TableCell className="p-4">
                      {badge ? (
                        <Badge className={`${badge.className} px-2.5 py-0.5 rounded-lg flex items-center gap-1 w-fit font-black text-[9px]`}>
                          {badge.icon} {badge.label}
                        </Badge>
                      ) : (
                        <span className="text-xs text-gray-400">{s.enrollmentStatus}</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
