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
import { useGetShifts } from "@/queries/useShiftQuery";
import { ClassScheduleTemplate, ClassScheduleTemplateInput, templateInputSchema } from "@/schemas/template.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDaysIcon, ClockIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface TemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ClassScheduleTemplateInput) => void;
  initialData?: ClassScheduleTemplate | null;
  loading?: boolean;
}

export function TemplateDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  loading,
}: TemplateDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClassScheduleTemplateInput>({
    resolver: zodResolver(templateInputSchema),
  });

  const shiftCode = watch("shiftCode");

  // Lấy danh sách ca học để chọn
  const { data: shiftsData, isLoading: isLoadingShifts } = useGetShifts({ limit: 100 });
  const shifts = shiftsData?.data || [];

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          templateName: initialData.templateName,
          weekdays: initialData.weekdays,
          shiftCode: initialData.shiftCode,
        });
      } else {
        reset({
          templateName: "",
          weekdays: "2,4,6",
          shiftCode: "",
        });
      }
    }
  }, [initialData, reset, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-role="admin"
        className="sm:max-w-[550px] rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans"
      >
        <DialogHeader className="p-8 bg-white border-b border-gray-50">
          <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
            <CalendarDaysIcon className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tighter text-gray-900">
            {initialData ? "Chỉnh sửa lịch mẫu" : "Thêm lịch mẫu mới"}
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-medium">
            Thiết lập tên lịch, các thứ trong tuần và ca học tương ứng.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 space-y-6 bg-white">
            {/* Tên lịch mẫu */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Tên lịch mẫu
              </Label>
              <Input
                placeholder="VD: Lịch T2-T4-T6"
                className="h-12 rounded-xl border-gray-200 bg-white focus-visible:ring-primary/10 font-bold"
                {...register("templateName")}
              />
              {errors.templateName && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.templateName.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Các thứ trong tuần */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                  Các thứ (VD: 2,4,6)
                </Label>
                <Input
                  placeholder="2,4,6 hoặc 2-6"
                  className="h-12 rounded-xl border-gray-200 bg-white font-bold"
                  {...register("weekdays")}
                />
                {errors.weekdays && (
                  <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                    {errors.weekdays.message}
                  </p>
                )}
              </div>

              {/* Chọn ca học */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                  Chọn ca học
                </Label>
                <Select
                  value={shiftCode}
                  onValueChange={(val) => setValue("shiftCode", val)}
                  disabled={isLoadingShifts}
                >
                  <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white font-bold">
                    <SelectValue placeholder="Chọn ca" />
                  </SelectTrigger>
                  <SelectContent data-role="admin">
                    {shifts.map((shift) => (
                      <SelectItem key={shift.shiftId} value={shift.shiftCode}>
                        <div className="flex flex-col items-start py-1">
                          <span className="font-bold text-gray-900">{shift.shiftCode} - {shift.shiftName}</span>
                          <div className="flex items-center gap-1 text-[10px] text-gray-400">
                            <ClockIcon className="size-3" />
                            <span>{shift.timeRange}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.shiftCode && (
                  <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                    {errors.shiftCode.message}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-200">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Ghi chú</p>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                - Thứ 2 đến Thứ 7 nhập từ <span className="text-primary font-bold">2-7</span>.
                <br />
                - Chủ nhật nhập số <span className="text-primary font-bold">8</span>.
                <br />
                - Có thể nhập dạng chuỗi như <span className="text-primary font-bold">2,4,6</span> hoặc khoảng <span className="text-primary font-bold">2-6</span>.
              </p>
            </div>
          </div>

          <DialogFooter className="p-8 bg-white border-t border-gray-50 flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="h-12 px-6 rounded-xl font-bold text-gray-400 hover:bg-gray-50 transition-colors"
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-10 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
            >
              {loading ? "Đang xử lý..." : initialData ? "Cập nhật" : "Lưu lịch mẫu"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
