"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetRooms } from "@/queries/useRoomQuery";
import { useGetTeachers } from "@/queries/useTeacherQuery";
import { useGetTemplates } from "@/queries/useTemplateQuery";
import { ClassInput, classInputSchema } from "@/schemas/class.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCapIcon } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface CourseClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ClassInput) => void;
  courseId: string;
  loading?: boolean;
}

export function CourseClassDialog({
  open,
  onOpenChange,
  onSubmit,
  courseId,
  loading,
}: CourseClassDialogProps) {
  const { data: teacherResponse } = useGetTeachers();
  const teachers = teacherResponse?.data || [];
  const { data: templateResponse } = useGetTemplates();
  const templates = templateResponse?.data || [];
  const { data: roomResponse } = useGetRooms();
  const rooms = roomResponse?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ClassInput>({
    resolver: zodResolver(classInputSchema),
    defaultValues: {
      courseId,
      maxStudents: 20,
      roomCode: "",
      startDate: "",
      teacherId: "",
      scheduleTemplateId: undefined,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        courseId,
        maxStudents: 20,
        roomCode: "",
        startDate: new Date().toISOString().split("T")[0],
        teacherId: "",
        scheduleTemplateId: undefined,
      });
    }
  }, [open, courseId, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-role="admin" className="sm:max-w-[550px] rounded-[2.5rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans">
        <DialogHeader className="p-8 bg-white border-b border-gray-50">
          <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
            <GraduationCapIcon className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tighter text-gray-900">
            Khai giảng lớp học mới
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-medium">
            Thiết lập thông tin phân lớp nhỏ, phân công giảng viên và phòng học tương ứng.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 space-y-5 bg-white">
            {/* Giảng viên phụ trách */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Giảng viên phụ trách
              </Label>
              <Controller
                control={control}
                name="teacherId"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                      <SelectValue placeholder="Chọn giảng viên đứng lớp..." />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers?.map((t) => (
                        <SelectItem key={t.teacherId} value={t.teacherId}>
                          {t.profile?.fullName || "Giảng viên chưa đặt tên"} ({t.teacherCode})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.teacherId && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.teacherId.message}
                </p>
              )}
            </div>

            {/* Khung giờ học (Schedule Template) */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Khung giờ học mẫu (Schedule Template)
              </Label>
              <Controller
                control={control}
                name="scheduleTemplateId"
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => field.onChange(val === "none" ? null : val)}
                    value={field.value || "none"}
                  >
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                      <SelectValue placeholder="Chọn khung giờ học mẫu..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Không áp dụng mẫu</SelectItem>
                      {templates?.map((t) => (
                        <SelectItem key={t.templateId} value={t.templateId}>
                          {t.templateName} ({t.weekdays} • Ca {t.shiftCode})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.scheduleTemplateId && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.scheduleTemplateId.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Ngày khai giảng */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                  Ngày khai giảng
                </Label>
                <div className="relative">
                  <Input
                    type="date"
                    className="h-12 rounded-xl border-gray-200 bg-white pr-10"
                    {...register("startDate")}
                  />
                </div>
                {errors.startDate && (
                  <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              {/* Sĩ số tối đa */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                  Sĩ số tối đa
                </Label>
                <Input
                  type="number"
                  placeholder="20"
                  className="h-12 rounded-xl border-gray-200 bg-white"
                  {...register("maxStudents", { valueAsNumber: true })}
                />
                {errors.maxStudents && (
                  <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                    {errors.maxStudents.message}
                  </p>
                )}
              </div>
            </div>

            {/* Phòng học */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Phòng học
              </Label>
              <Controller
                control={control}
                name="roomCode"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                      <SelectValue placeholder="Chọn phòng học..." />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms?.map((r) => (
                        <SelectItem key={r.roomId || r.roomCode} value={r.roomCode}>
                          {r.roomCode} (Sức chứa: {r.capacity} học viên)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.roomCode && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.roomCode.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="p-8 bg-white border-t border-gray-50 flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="h-12 px-6 rounded-xl font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-10 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:opacity-90 transition-all animate-in fade-in zoom-in-95 duration-150"
            >
              {loading ? "Đang xử lý..." : "Khai giảng lớp"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
