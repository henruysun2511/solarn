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
import { GenderType } from "@/constants/type";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useDeleteMedia } from "@/queries/useCloudinaryQuery";
import { useUpdateMyProfile } from "@/queries/useTeacherQuery";
import { Teacher, UpdateTeacherProfileInput, updateTeacherProfileSchema } from "@/schemas/teacher.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CameraIcon, Loader2Icon, UserIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher: Teacher;
}

export function ProfileDialog({ open, onOpenChange, teacher }: ProfileDialogProps) {
  const [publicId, setPublicId] = useState<string>("");
  const { handleUpload, isUploading } = useImageUpload();
  const deleteMediaMutation = useDeleteMedia();
  const updateProfileMutation = useUpdateMyProfile();

  const profile = teacher.profile;

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateTeacherProfileInput>({
    resolver: zodResolver(updateTeacherProfileSchema),
    defaultValues: {
      fullName: profile?.fullName || "",
      phone: profile?.phone || "",
      gender: profile?.gender || undefined,
      dob: profile?.dob ? profile.dob.split("T")[0] : "",
      avatarUrl: profile?.avatarUrl || "",
    },
  });

  const avatarUrlValue = watch("avatarUrl");

  useEffect(() => {
    if (open) {
      reset({
        fullName: profile?.fullName || "",
        phone: profile?.phone || "",
        gender: profile?.gender || undefined,
        dob: profile?.dob ? profile.dob.split("T")[0] : "",
        avatarUrl: profile?.avatarUrl || "",
      });
      setPublicId("");
    }
  }, [open, profile, reset]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await handleUpload(file, "avatar");
      if (res) {
        setValue("avatarUrl", res.url);
        setPublicId(res.publicId);
        toast.success("Tải ảnh lên thành công!");
      }
    } catch {
      toast.error("Không thể tải ảnh lên.");
    }
  };

  const handleRemoveAvatar = async () => {
    if (publicId) {
      try {
        await deleteMediaMutation.mutateAsync({ publicId, resourceType: "image" });
      } catch {
        /* ignore */
      }
    }
    setValue("avatarUrl", "");
    setPublicId("");
  };

  const onSubmit = async (data: UpdateTeacherProfileInput) => {
    try {
      await updateProfileMutation.mutateAsync(data);
      toast.success("Cập nhật thông tin thành công");
      onOpenChange(false);
    } catch {
      toast.error("Cập nhật thất bại");
    }
  };

  const isPending = updateProfileMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-role="teacher" className="!max-w-lg p-0 overflow-hidden rounded-[2rem] border-none shadow-2xl bg-slate-50/90 backdrop-blur-xl">
        <DialogHeader className="p-8 pb-4 bg-white border-b border-gray-50">
          <div className="size-12 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-4">
            <UserIcon className="size-6 text-[var(--primary)]" />
          </div>
          <DialogTitle className="text-2xl font-black text-gray-800 tracking-tight">
            Chỉnh sửa thông tin
          </DialogTitle>
          <DialogDescription className="text-sm font-medium text-gray-400 mt-1">
            Cập nhật thông tin cá nhân của bạn.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            <div className="flex justify-center">
              <div className="relative group/avatar">
                <div className="size-28 rounded-full bg-[var(--accent)] border-4 border-[var(--primary)]/10 overflow-hidden shadow-lg">
                  {avatarUrlValue ? (
                    <img src={avatarUrlValue} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-black text-[var(--primary)]/30">
                      <UserIcon className="size-10" />
                    </div>
                  )}
                </div>
                <label className="absolute -bottom-1 -right-1 size-9 rounded-full bg-[var(--primary)] text-white flex items-center justify-center cursor-pointer shadow-lg hover:opacity-90 transition-all border-4 border-white">
                  <CameraIcon className="size-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
                {avatarUrlValue && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="absolute -top-1 -right-1 size-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-all border-2 border-white"
                  >
                    <XIcon className="size-3" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Họ và tên
              </Label>
              <Input
                placeholder="Nhập họ và tên"
                className="h-12 rounded-xl border-gray-200 bg-white"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 font-medium ml-1">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Số điện thoại
              </Label>
              <Input
                placeholder="Nhập số điện thoại"
                className="h-12 rounded-xl border-gray-200 bg-white"
                {...register("phone")}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Giới tính
              </Label>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || undefined}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value={GenderType.MALE}>Nam</SelectItem>
                      <SelectItem value={GenderType.FEMALE}>Nữ</SelectItem>
                      <SelectItem value={GenderType.UNKNOWN}>Khác</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Ngày sinh
              </Label>
              <Input
                type="date"
                className="h-12 rounded-xl border-gray-200 bg-white"
                {...register("dob")}
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
              disabled={isPending || isUploading}
              className="h-12 px-10 rounded-xl bg-[var(--primary)] text-white font-black shadow-lg shadow-[var(--primary)]/20 hover:opacity-90 transition-all"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Loader2Icon className="size-4 animate-spin" />
                  <span>Đang xử lý...</span>
                </div>
              ) : (
                "Lưu thay đổi"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
