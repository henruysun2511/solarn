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
import { StudyShift, StudyShiftInput, shiftInputSchema } from "@/schemas/shift.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ShiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: StudyShiftInput) => void;
  initialData?: StudyShift | null;
  loading?: boolean;
}

// Kiểu dữ liệu tạm thời để quản lý form chọn giờ
interface ShiftFormInput extends Omit<StudyShiftInput, "timeRange"> {
  startTime: string;
  endTime: string;
}

export function ShiftDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  loading,
}: ShiftDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ShiftFormInput>({
    resolver: zodResolver(shiftInputSchema.omit({ timeRange: true }), undefined, { raw: true }) as any,
    defaultValues: {
      shiftCode: "",
      shiftName: "",
      startTime: "07:00",
      endTime: "09:00",
    }
  });

  const startTime = watch("startTime");
  const endTime = watch("endTime");

  useEffect(() => {
    if (open) {
      if (initialData && initialData.timeRange) {
        // Tách chuỗi "07:00-09:00" thành 2 phần
        const [start, end] = initialData.timeRange.split("-");
        reset({
          shiftCode: initialData.shiftCode,
          shiftName: initialData.shiftName,
          startTime: start || "07:00",
          endTime: end || "09:00",
        });
      } else {
        reset({
          shiftCode: "",
          shiftName: "",
          startTime: "07:00",
          endTime: "09:00",
        });
      }
    }
  }, [initialData, reset, open]);

  // Hàm xử lý trung gian để ghép chuỗi timeRange
  const onInternalSubmit = (data: ShiftFormInput) => {
    const formattedData: StudyShiftInput = {
      shiftCode: data.shiftCode,
      shiftName: data.shiftName,
      timeRange: `${data.startTime}-${data.endTime}`,
    };
    onSubmit(formattedData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-role="admin"
        className="sm:max-w-[500px] rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans"
      >
        <DialogHeader className="p-8 bg-white border-b border-gray-50">
          <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
            <ClockIcon className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tighter text-gray-900">
            {initialData ? "Chỉnh sửa ca học" : "Thêm ca học mới"}
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-medium">
            Thiết lập thời gian bắt đầu và kết thúc cho ca học.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onInternalSubmit)}>
          <div className="p-8 space-y-6 bg-white">
            {/* Tên ca học */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Tên ca học
              </Label>
              <Input
                placeholder="VD: Ca sáng"
                className="h-12 rounded-xl border-gray-200 bg-white focus-visible:ring-primary/10 font-bold"
                {...register("shiftName")}
              />
              {errors.shiftName && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.shiftName.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Mã ca học */}
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                  Mã ca học
                </Label>
                <Input
                  placeholder="VD: S1"
                  className="h-12 rounded-xl border-gray-200 bg-white font-bold"
                  {...register("shiftCode")}
                />
                {errors.shiftCode && (
                  <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                    {errors.shiftCode.message}
                  </p>
                )}
              </div>

              {/* Chọn khoảng thời gian */}
              <div className="col-span-2 space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                  Khoảng thời gian (Bắt đầu - Kết thúc)
                </Label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Input
                      type="time"
                      className="h-12 rounded-xl border-gray-200 bg-white font-bold px-4"
                      {...register("startTime")}
                    />
                  </div>
                  <ArrowRightIcon className="size-4 text-gray-300" />
                  <div className="flex-1 relative">
                    <Input
                      type="time"
                      className="h-12 rounded-xl border-gray-200 bg-white font-bold px-4"
                      {...register("endTime")}
                    />
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-dashed border-gray-200 flex justify-center">
                  <span className="text-xs font-black text-primary uppercase tracking-widest">
                    {startTime} — {endTime}
                  </span>
                </div>
              </div>
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
              {loading ? "Đang xử lý..." : initialData ? "Cập nhật" : "Lưu ca học"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}