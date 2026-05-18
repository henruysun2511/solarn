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
import { Textarea } from "@/components/ui/textarea";
import { CourseLevel } from "@/constants/type";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useDeleteMedia } from "@/queries/useCloudinaryQuery";
import { Course, CourseInput, courseInputSchema } from "@/schemas/course.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpenIcon, ImageIcon, Loader2Icon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface CourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CourseInput) => void;
  loading?: boolean;
  initialData?: Course | null;
}

export function CourseDialog({
  open,
  onOpenChange,
  onSubmit,
  loading,
  initialData,
}: CourseDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CourseInput>({
    resolver: zodResolver(courseInputSchema),
  });

  const { handleUpload, isUploading } = useImageUpload();
  const deleteMediaMutation = useDeleteMedia();
  const currentImage = watch("image");
  const currentLevel = watch("level");
  const [oldPublicId, setOldPublicId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          courseName: initialData.courseName,
          tuitionFee: initialData.tuitionFee.toString(),
          level: initialData.level,
          totalSessions: initialData.totalSessions,
          image: initialData.image,
          description: initialData.description,
        });

      } else {
        reset({
          courseName: "",
          tuitionFee: "",
          level: "",
          totalSessions: 0,
          image: null,
          description: "",
        });
      }
      setOldPublicId(null);
    }
  }, [reset, open, initialData]);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // If there was a previous upload in this session, delete it
    if (oldPublicId) {
      deleteMediaMutation.mutate({ publicId: oldPublicId, resourceType: "image" });
    }

    const result = await handleUpload(file, "media", "courses");
    if (result) {
      setValue("image", result.url);
      setOldPublicId(result.publicId);
    }
  };

  const removeImage = () => {
    if (oldPublicId) {
      deleteMediaMutation.mutate({ publicId: oldPublicId, resourceType: "image" });
    }
    setValue("image", null);
    setOldPublicId(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-role="admin"
        className="sm:max-w-[700px] rounded-[2.5rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans"
      >
        <DialogHeader className="p-10 bg-white border-b border-gray-50">
          <div className="size-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
            <BookOpenIcon className="size-7 text-primary" />
          </div>
          <DialogTitle className="text-3xl font-black tracking-tighter text-gray-900">
            {initialData ? "Cập nhật khóa học" : "Thêm khóa học mới"}
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-medium text-lg">
            Thiết lập lộ trình học tập và thông tin chi tiết cho khóa học.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-10 grid grid-cols-2 gap-8 bg-white max-h-[60vh] overflow-y-auto custom-scrollbar">
            {/* Image Upload Area */}
            <div className="col-span-2 space-y-3">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Hình ảnh khóa học
              </Label>
              <div className="relative group">
                {currentImage ? (
                  <div className="relative h-56 w-full rounded-3xl overflow-hidden border-2 border-gray-100 shadow-inner">
                    <img src={currentImage} alt="Course Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-4 right-4 size-10 rounded-full bg-white/90 text-red-500 flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <XIcon className="size-5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-56 w-full rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-primary/30 transition-all cursor-pointer group">
                    {isUploading ? (
                      <Loader2Icon className="size-10 text-primary animate-spin" />
                    ) : (
                      <>
                        <div className="size-14 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                          <ImageIcon className="size-7 text-gray-400" />
                        </div>
                        <span className="text-sm font-bold text-gray-500">Tải ảnh lên (Click hoặc kéo thả)</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">PNG, JPG tối đa 5MB</span>
                      </>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={onFileChange} disabled={isUploading} />
                  </label>
                )}
              </div>
            </div>

            <div className="col-span-2 space-y-3">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Tên khóa học
              </Label>
              <Input
                placeholder="VD: English Foundation A1"
                className="h-14 rounded-2xl border-gray-200 bg-white text-lg font-bold focus-visible:ring-primary/10 transition-all"
                {...register("courseName")}
              />
              {errors.courseName && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.courseName.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Trình độ (Level)
              </Label>
              <Select
                value={currentLevel || ""}
                onValueChange={(val) => setValue("level", val as CourseLevel)}
              >
                <SelectTrigger className="h-14 rounded-2xl border-gray-200 bg-white font-bold">
                  <SelectValue placeholder="Chọn trình độ" />
                </SelectTrigger>
                <SelectContent data-role="admin">
                  {Object.values(CourseLevel).map((lvl) => (
                    <SelectItem key={lvl} value={lvl}>
                      {lvl}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Số buổi học (Sessions)
              </Label>
              <Input
                type="number"
                placeholder="VD: 24"
                className="h-14 rounded-2xl border-gray-200 bg-white font-bold"
                {...register("totalSessions")}
              />
              {errors.totalSessions && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.totalSessions.message}
                </p>
              )}
            </div>

            <div className="col-span-2 space-y-3">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Học phí (VNĐ)
              </Label>
              <div className="relative">
                <Input
                  placeholder="VD: 2500000"
                  className="h-14 rounded-2xl border-gray-200 bg-white pl-12 text-xl font-black text-primary transition-all"
                  {...register("tuitionFee")}
                />
                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-gray-400">₫</span>
              </div>
              {errors.tuitionFee && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.tuitionFee.message}
                </p>
              )}
            </div>

            <div className="col-span-2 space-y-3">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Mô tả chi tiết
              </Label>
              <Textarea
                placeholder="Nhập thông tin giới thiệu về khóa học..."
                className="min-h-[120px] rounded-3xl border-gray-200 bg-white resize-none font-medium text-gray-600 focus-visible:ring-primary/10 p-5"
                {...register("description")}
              />
            </div>
          </div>

          <DialogFooter className="p-10 bg-white border-t border-gray-50 flex gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="h-14 px-8 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              disabled={loading || isUploading}
              className="h-14 px-12 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:opacity-90 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? "Đang xử lý..." : initialData ? "Cập nhật khóa học" : "Lưu khóa học"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
