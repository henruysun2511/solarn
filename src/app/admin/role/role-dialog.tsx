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
import { RoleInput, roleInputSchema } from "@/schemas/role.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface RoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: RoleInput) => void;
  loading?: boolean;
}

export function RoleDialog({
  open,
  onOpenChange,
  onSubmit,
  loading,
}: RoleDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoleInput>({
    resolver: zodResolver(roleInputSchema),
    defaultValues: {
      roleName: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        roleName: "",
      });
    }
  }, [reset, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-role="admin"
        className="sm:max-w-[500px] rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans"
      >
        <DialogHeader className="p-8 bg-white border-b border-gray-50">
          <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
            <Shield className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tighter text-gray-900">
            Thêm vai trò mới
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-medium">
            Thiết lập vai trò hệ thống mới phục vụ phân quyền người dùng.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 space-y-4 bg-white">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Tên vai trò
              </Label>
              <Input
                placeholder="VD: TEACHER, STAFF,..."
                className="h-12 rounded-xl border-gray-200 bg-white uppercase"
                {...register("roleName")}
              />
              {errors.roleName && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.roleName.message}
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
              className="h-12 px-10 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
            >
              {loading ? "Đang xử lý..." : "Lưu vai trò"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
