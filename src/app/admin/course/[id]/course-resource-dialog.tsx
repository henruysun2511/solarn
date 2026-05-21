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
import { ResourceType } from "@/constants/type";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useDeleteMedia } from "@/queries/useCloudinaryQuery";
import { CourseResourceInput, courseResourceInputSchema } from "@/schemas/course-resource.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileTextIcon, Loader2Icon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface CourseResourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CourseResourceInput) => void;
  courseId: string;
  loading?: boolean;
}

export function CourseResourceDialog({
  open,
  onOpenChange,
  onSubmit,
  courseId,
  loading,
}: CourseResourceDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CourseResourceInput>({
    resolver: zodResolver(courseResourceInputSchema),
    defaultValues: {
      courseId,
      title: "",
      fileUrl: "",
      type: ResourceType.DOCUMENT,
    },
  });

  const { handleUpload, isUploading } = useImageUpload();
  const deleteMediaMutation = useDeleteMedia();
  const [oldPublicId, setOldPublicId] = useState<string | null>(null);

  const fileUrl = watch("fileUrl");

  useEffect(() => {
    if (open) {
      reset({
        courseId,
        title: "",
        fileUrl: "",
        type: ResourceType.DOCUMENT,
      });
      setOldPublicId(null);
    }
  }, [open, courseId, reset]);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (oldPublicId) {
      deleteMediaMutation.mutate({ publicId: oldPublicId, resourceType: "auto" });
    }

    const result = await handleUpload(file, "media", "resources");
    if (result) {
      setValue("fileUrl", result.url);
      setOldPublicId(result.publicId);
    }
  };

  const removeFile = () => {
    if (oldPublicId) {
      deleteMediaMutation.mutate({ publicId: oldPublicId, resourceType: "auto" });
    }
    setValue("fileUrl", "");
    setOldPublicId(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-role="admin"
        className="sm:max-w-[500px] rounded-[2.5rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans"
      >
        <DialogHeader className="p-8 bg-white border-b border-gray-50">
          <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
            <FileTextIcon className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tighter text-gray-900">
            Thêm tài nguyên học tập
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-medium">
            Tải lên giáo trình mẫu, video bài giảng hoặc tài liệu tham khảo cho học viên.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 space-y-5 bg-white max-h-[55vh] overflow-y-auto custom-scrollbar">
            {/* Tiêu đề tài liệu */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Tiêu đề tài nguyên
              </Label>
              <Input
                placeholder="VD: Slide bài giảng Next.js 14 Buổi 1"
                className="h-12 rounded-xl border-gray-200 bg-white"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Loại tài nguyên (Type) */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Loại tài nguyên
              </Label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                      <SelectValue placeholder="Chọn loại tài nguyên..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ResourceType.DOCUMENT}>Tài liệu (DOCUMENT)</SelectItem>
                      <SelectItem value={ResourceType.VIDEO}>Video bài giảng (VIDEO)</SelectItem>
                      <SelectItem value={ResourceType.AUDIO}>Tập tin âm thanh (AUDIO)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.type.message}
                </p>
              )}
            </div>

            {/* Tải lên tệp hoặc Nhập URL trực tiếp */}
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                  Tải tệp tin lên hệ thống
                </Label>

                {/* File Upload Dropzone */}
                <div className="relative group">
                  {fileUrl ? (
                    <div className="relative flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 gap-3">
                      {/* Bọc khối thông tin và thêm min-w-0 để ép chữ phải truncate */}
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <FileTextIcon className="size-5" />
                        </div>
                        {/* min-w-0 kết hợp truncate block sẽ xử lý hoàn hảo các URL siêu dài */}
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-bold text-gray-700 truncate block">
                            {fileUrl.split('/').pop() || fileUrl}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                            Tải lên thành công
                          </span>
                        </div>
                      </div>

                      {/* Nút xóa giữ nguyên vị trí, không bao giờ bị đẩy lệch */}
                      <button
                        type="button"
                        onClick={removeFile}
                        className="size-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shadow-sm hover:bg-red-100 transition-all shrink-0"
                      >
                        <XIcon className="size-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-24 w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-primary/30 transition-all cursor-pointer group">
                      {isUploading ? (
                        <Loader2Icon className="size-8 text-primary animate-spin" />
                      ) : (
                        <>
                          <span className="text-xs font-bold text-gray-500">Click hoặc kéo thả để tải lên</span>
                          <span className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">PDF, MP4, MP3 tối đa 10MB</span>
                        </>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        onChange={onFileChange}
                        disabled={isUploading}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Or paste link */}
              <div className="space-y-2">
                <Label className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-450 ml-1">
                  Hoặc nhập liên kết trực tiếp (Drive, Youtube, v.v...)
                </Label>
                <Input
                  placeholder="https://example.com/files/slide.pdf"
                  className="h-12 rounded-xl border-gray-200 bg-white"
                  {...register("fileUrl")}
                />
                {errors.fileUrl && (
                  <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                    {errors.fileUrl.message}
                  </p>
                )}
              </div>
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
              disabled={loading || isUploading}
              className="h-12 px-10 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:opacity-90 transition-all animate-in fade-in zoom-in-95 duration-150"
            >
              {loading ? "Đang xử lý..." : "Lưu tài nguyên"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
