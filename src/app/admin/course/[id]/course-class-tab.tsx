"use client";

import { DataPagination } from "@/components/common/data-pagination";
import { Loading } from "@/components/common/loading";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useCreateClass, useGetClassesByCourseId } from "@/queries/useClassQuery";
import { ClassInput, ClassParams } from "@/schemas/class.schema";
import { ArrowUpRight, GridIcon, ListIcon, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CourseClassDialog } from "./course-class-dialog";

interface CourseClassTabProps {
  courseId: string;
}

export function CourseClassTab({ courseId }: CourseClassTabProps) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [params, setParams] = useState<ClassParams>({
    page: 1,
    limit: 8,
  });

  const { data: classResponse, isLoading } = useGetClassesByCourseId(courseId, {
    page: params.page || 1,
    limit: params.limit || 8,
    search: search.trim() || undefined,
  });

  const classes = classResponse?.data || [];
  const meta = classResponse?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  const createClassMutation = useCreateClass();

  const handleCreateClass = (data: ClassInput) => {
    console.log(data);
    createClassMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Khai giảng lớp học mới thành công!");
        setDialogOpen(false);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Khai giảng lớp học thất bại!");
      },
    });
  };

  return (
    <div data-role="admin" className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 font-sans">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            Lớp học đang vận hành
          </h3>
          <p className="text-gray-400 text-xs font-medium mt-0.5">
            Danh sách phân lớp nhỏ đang học giáo trình này.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input
              placeholder="Tìm theo Mã lớp (ID)..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setParams((prev) => ({ ...prev, page: 1 }));
              }}
              className="h-10 pl-10 rounded-xl border-gray-200 bg-white placeholder:text-gray-400 text-xs font-semibold"
            />
          </div>

          {/* View Switcher Toggle */}
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 p-1 rounded-xl w-max">
            <button
              onClick={() => setViewMode("card")}
              className={`p-1.5 rounded-lg transition-all ${viewMode === "card"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-400 hover:text-gray-600"
                }`}
              title="Xem dạng Card"
            >
              <GridIcon className="size-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-all ${viewMode === "table"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-400 hover:text-gray-600"
                }`}
              title="Xem dạng Table"
            >
              <ListIcon className="size-4" />
            </button>
          </div>

          {/* Create Button */}
          <Button
            onClick={() => setDialogOpen(true)}
            className="rounded-xl font-black bg-primary h-10 px-5 text-white text-xs transition-all flex items-center gap-1.5"
          >
            <Plus className="size-4" /> Khai giảng lớp mới
          </Button>
        </div>
      </div>

      {isLoading ? (
        <Loading message="Đang tải dữ liệu lớp học..." />
      ) : classes.length === 0 ? (
        <div className="py-12 text-center text-xs font-black text-gray-400 uppercase tracking-widest">
          Không tìm thấy lớp học nào.
        </div>
      ) : viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-200">
          {classes.map((cls: any) => (
            <div
              key={cls.classId}
              className="group p-5 rounded-2xl border-2 border-gray-50 hover:border-primary/20 hover:bg-blue-50/10 transition-all cursor-pointer bg-white shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="font-mono text-[10px] font-black text-primary bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10 truncate max-w-[150px]">
                    ID: {cls.classId.substring(0, 8)}...
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-wider border border-emerald-100">
                    Đang chạy
                  </span>
                </div>
                <h4 className="font-black text-gray-900 tracking-tight group-hover:text-primary transition-colors text-sm truncate">
                  Phòng: {cls.roomCode}
                </h4>
                <p className="text-gray-400 text-[10px] font-bold mt-1">
                  Khai giảng: {new Date(cls.startDate).toLocaleDateString("vi-VN")}
                </p>
                <p className="text-gray-500 text-xs font-semibold mb-4 mt-2">
                  {cls.scheduleTemplate
                    ? `${cls.scheduleTemplate.templateName} (${cls.scheduleTemplate.weekdays} • Ca ${cls.scheduleTemplate.shiftCode})`
                    : "Lịch học tự do"}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-400">
                    Sĩ số: <strong className="text-gray-700 font-extrabold">{cls.registeredStudents}</strong>/{cls.maxStudents} học viên
                  </span>
                </div>
                <ArrowUpRight className="size-4 text-gray-300 group-hover:text-primary transition-all cursor-pointer" onClick={() => router.push(`/admin/class/${cls.classId}`)} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm animate-in fade-in duration-200">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400 pl-6">
                  Mã lớp học (ID)
                </TableHead>
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Lịch học & Ca học
                </TableHead>
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Phòng học
                </TableHead>
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Ngày bắt đầu
                </TableHead>
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Sĩ số lớp
                </TableHead>
                <TableHead className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-50 bg-white">
              {classes.map((cls: any) => (
                <TableRow key={cls.classId} className="hover:bg-gray-50/20 transition-colors">
                  <td className="p-4 pl-6 font-mono text-xs font-bold text-primary">
                    {cls.classId}
                  </td>
                  <td className="p-4 text-xs font-bold text-gray-600">
                    {cls.scheduleTemplate
                      ? `${cls.scheduleTemplate.templateName} (${cls.scheduleTemplate.weekdays} • Ca ${cls.scheduleTemplate.shiftCode})`
                      : "Không có khung mẫu"}
                  </td>
                  <td className="p-4 text-xs font-black text-gray-900">
                    {cls.roomCode}
                  </td>
                  <td className="p-4 text-xs text-gray-500 font-medium">
                    {new Date(cls.startDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="p-4 text-xs font-bold text-gray-600">
                    {cls.registeredStudents} / {cls.maxStudents} học viên
                  </td>
                  <td className="p-4 pl-6">
                    <ArrowUpRight className="size-4 text-black hover:text-primary transition-all cursor-pointer" onClick={() => router.push(`/admin/class/${cls.classId}`)} />
                  </td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* 4. FOOTER PAGINATION */}
      {!isLoading && classes.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <PaginationInfo
            page={Number(params.page || 1)}
            limit={Number(params.limit || 8)}
            totalItems={totalItems}
            currentLength={classes.length}
          />
          <DataPagination
            page={Number(params.page || 1)}
            totalPages={totalPages}
            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
          />
        </div>
      )}

      {/* Creation Dialog Modal */}
      <CourseClassDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreateClass}
        courseId={courseId}
        loading={createClassMutation.isPending}
      />
    </div>
  );
}
