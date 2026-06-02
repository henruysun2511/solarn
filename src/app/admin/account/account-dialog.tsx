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
import { useGetRoles } from "@/queries/useRoleQuery";
import { AccountInput, accountInputSchema } from "@/schemas/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlusIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AccountInput) => void;
  loading?: boolean;
}

export function AccountDialog({
  open,
  onOpenChange,
  onSubmit,
  loading,
}: AccountDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AccountInput>({
    resolver: zodResolver(accountInputSchema),
    defaultValues: {
      profile: {
        fullName: "",
      }
    }
  });

  const roleId = watch("roleId");
  const { data: rolesData } = useGetRoles();
  const roles = rolesData?.data || [];

  useEffect(() => {
    if (open) {
      reset({
        username: "",
        password: "",
        passwordConfirm: "",
        roleId: undefined,
        salaryRate: "",
        profile: {
          fullName: "",
        },
      });
    }
  }, [reset, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-role="admin"
        className="sm:max-w-[600px] rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans"
      >
        <DialogHeader className="p-8 bg-white border-b border-gray-50">
          <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
            <UserPlusIcon className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tighter text-gray-900">
            Thêm tài khoản mới
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-medium">
            Thiết lập thông tin đăng nhập và quyền hạn cho thành viên mới.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 grid grid-cols-2 gap-6 bg-white">
            <div className="col-span-2 space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Họ và tên
              </Label>
              <Input
                placeholder="VD: Nguyễn Văn A"
                className="h-12 rounded-xl border-gray-200 bg-white"
                {...register("profile.fullName")}
              />
              {errors.profile?.fullName && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.profile.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Tên đăng nhập
              </Label>
              <Input
                placeholder="VD: admin01"
                className="h-12 rounded-xl border-gray-200 bg-white focus-visible:ring-primary/10"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Quyền hạn
              </Label>
              <Select
                value={roleId || ""}
                onValueChange={(val) => setValue("roleId", val, { shouldValidate: true })}
              >
                <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white shadow-none">
                  <SelectValue placeholder="Chọn quyền" />
                </SelectTrigger>
                <SelectContent data-role="admin">
                  {roles?.map((role) => (
                    <SelectItem key={role.roleId} value={role.roleId}>
                      {role.roleName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.roleId && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.roleId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Mật khẩu
              </Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="h-12 rounded-xl border-gray-200 bg-white"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Xác nhận mật khẩu
              </Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="h-12 rounded-xl border-gray-200 bg-white"
                {...register("passwordConfirm")}
              />
              {errors.passwordConfirm && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>

            <div className="col-span-2 space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Lương cơ bản (Nếu là giáo viên)
              </Label>
              <Input
                placeholder="VD: 150000"
                className="h-12 rounded-xl border-gray-200 bg-white"
                {...register("salaryRate")}
              />
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
              {loading ? "Đang xử lý..." : "Lưu tài khoản"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
