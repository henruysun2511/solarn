"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChangePassword } from "@/queries/useAuthQuery";
import { ChangePasswordInput, changePasswordSchema } from "@/schemas/auth.schema";
import { handleError } from "@/utils/handleError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, KeyRound, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ChangePasswordForm() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const mutation = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordInput) => {
    await mutation.mutateAsync(data, {
      onSuccess: (response: any) => {
        toast.success(response?.data?.message || "Đổi mật khẩu thành công");
        reset();
      },
      onError: (error) => {
        handleError(error, "Đổi mật khẩu thất bại");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <Lock className="size-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Đổi mật khẩu</h3>
          <p className="text-xs text-gray-400 font-medium">Vui lòng nhập thông tin dưới đây</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
          Mật khẩu cũ
        </label>
        <div className="relative">
          <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-300" />
          <Input
            type={showOld ? "text" : "password"}
            placeholder="••••••••"
            className="h-12 pl-10 pr-10 rounded-xl border-gray-200 bg-white font-medium placeholder:text-gray-300"
            {...register("oldPassword")}
          />
          <button
            type="button"
            onClick={() => setShowOld(!showOld)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
          >
            {showOld ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.oldPassword && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.oldPassword.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
          Mật khẩu mới
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-300" />
          <Input
            type={showNew ? "text" : "password"}
            placeholder="••••••••"
            className="h-12 pl-10 pr-10 rounded-xl border-gray-200 bg-white font-medium placeholder:text-gray-300"
            {...register("newPassword")}
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
          >
            {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.newPassword && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.newPassword.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
          Xác nhận mật khẩu mới
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-300" />
          <Input
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••"
            className="h-12 pl-10 pr-10 rounded-xl border-gray-200 bg-white font-medium placeholder:text-gray-300"
            {...register("newPasswordConfirm")}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
          >
            {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.newPasswordConfirm && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.newPasswordConfirm.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={mutation.isPending}
        className="h-12 px-8 rounded-xl bg-primary text-white font-bold shadow-lg hover:opacity-90 active:scale-[0.98] transition-all"
      >
        {mutation.isPending ? "Đang thực hiện..." : "Cập nhật mật khẩu"}
      </Button>
    </form>
  );
}
