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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Branch, BranchInput, branchInputSchema } from "@/schemas/branch.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2Icon } from "lucide-react"; // Icon đại diện cho chi nhánh
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface BranchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: BranchInput) => void;
  initialData?: Branch | null;
  loading?: boolean;
}

export function BranchDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  loading,
}: BranchDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BranchInput>({
    resolver: zodResolver(branchInputSchema),
    defaultValues: {
      isActive: true,
    },
  });

  const isActive = watch("isActive");

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          branchCode: initialData.branchCode,
          branchName: initialData.branchName,
          address: initialData.address,
          phone: initialData.phone,
          isActive: initialData.isActive,
        });
      } else {
        reset({
          branchCode: "",
          branchName: "",
          address: "",
          phone: "",
          isActive: true,
        });
      }
    }
  }, [initialData, reset, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-role="admin"
        className="sm:max-w-[600px] rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans"
      >
        {/* Header: Trắng tinh khôi với đường kẻ mảnh */}
        <DialogHeader className="p-8 bg-white border-b border-gray-50">
          <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
            <Building2Icon className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tighter text-gray-900">
            {initialData ? "Chỉnh sửa chi nhánh" : "Thêm chi nhánh mới"}
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-medium">
            {initialData
              ? "Cập nhật lại thông tin địa điểm và liên hệ của chi nhánh."
              : "Thiết lập thông tin cơ bản cho chi nhánh mới trong hệ thống."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 grid grid-cols-2 gap-6 bg-white">
            {/* Tên chi nhánh - Chiếm trọn 2 cột */}
            <div className="col-span-2 space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Tên chi nhánh
              </Label>
              <Input
                placeholder="VD: Chi nhánh Quận 1 - Hồ Chí Minh"
                className="h-12 rounded-xl border-gray-200 bg-white focus-visible:ring-primary/10"
                {...register("branchName")}
              />
              {errors.branchName && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.branchName.message}
                </p>
              )}
            </div>

            {/* Mã chi nhánh */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Mã chi nhánh
              </Label>
              <Input
                placeholder="VD: CN-Q1-001"
                className="h-12 rounded-xl border-gray-200 bg-white"
                {...register("branchCode")}
              />
              {errors.branchCode && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.branchCode.message}
                </p>
              )}
            </div>

            {/* Số điện thoại */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Số điện thoại
              </Label>
              <Input
                placeholder="028.XXXX.XXXX"
                className="h-12 rounded-xl border-gray-200 bg-white"
                {...register("phone")}
              />
            </div>

            {/* Địa chỉ - Chiếm 2 cột */}
            <div className="col-span-2 space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Địa chỉ chi tiết
              </Label>
              <Textarea
                placeholder="Số nhà, tên đường, phường/xã..."
                className="min-h-[100px] rounded-xl border-gray-200 bg-white resize-none py-3"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Trạng thái hoạt động */}
            <div className="col-span-2 flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold text-gray-700">Trạng thái hoạt động</Label>
                <p className="text-xs text-gray-400">Cho phép chi nhánh này xuất hiện trên hệ thống</p>
              </div>
              <Switch
                checked={isActive}
                onCheckedChange={(val) => setValue("isActive", val)}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>

          {/* Footer: Thiết kế nút đồng bộ với CourseCreateDialog */}
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
              className="h-12 px-10 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
            >
              {loading ? "Đang xử lý..." : initialData ? "Cập nhật chi nhánh" : "Lưu chi nhánh"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}