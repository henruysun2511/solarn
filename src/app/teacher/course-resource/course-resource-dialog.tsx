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
import { toast } from "sonner";

interface CourseResourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CourseResourceInput) => void;
  courseId?: string;
  loading?: boolean;
}

export function CourseResourceDialog({
  open,
  onOpenChange,
  onSubmit,
  courseId,
  loading,
}: CourseResourceDialogProps) {
  const [publicId, setPublicId] = useState<string>("");

  const { handleUpload, isUploading } = useImageUpload();
  const deleteMediaMutation = useDeleteMedia();

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
      courseId: courseId || "",
      title: "",
      type: ResourceType.DOCUMENT,
      fileUrl: "",
    },
  });

  const fileUrlValue = watch("fileUrl");

  useEffect(() => {
    if (open) {
      reset({
        courseId: courseId || "",
        title: "",
        type: ResourceType.DOCUMENT,
        fileUrl: "",
      });
      setPublicId("");
    }
  }, [open, courseId, reset]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await handleUpload(file, "media");
      if (res) {
        setValue("fileUrl", res.url);
        setPublicId(res.publicId);
        toast.success("Tải file lên thành công!");
      } else {
        toast.error("Tải file lên thất bại.");
      }
    } catch (error) {
      toast.error("Không thể tải file lên.");
    }
  };

  const handleRemoveFile = async () => {
    if (!publicId) return;

    try {
      await deleteMediaMutation.mutateAsync({
        publicId: publicId,
        resourceType: "auto",
      });
      setValue("fileUrl", "");
      setPublicId("");
      toast.success("Đã xóa file đính kèm.");
    } catch (error) {
      toast.error("Không thể xóa file từ hệ thống cloud.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-role="teacher" className="!max-w-2xl p-0 overflow-hidden rounded-[2rem] border-none shadow-2xl bg-slate-50/90 backdrop-blur-xl">
        <DialogHeader className="p-8 pb-4 bg-white border-b border-gray-50">
          <div className="size-12 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-4">
            <FileTextIcon className="size-6 text-[var(--primary)]" />
          </div>
          <DialogTitle className="text-2xl font-black text-gray-800 tracking-tight">
            Thêm tài nguyên học tập
          </DialogTitle>
          <DialogDescription className="text-sm font-medium text-gray-400 mt-1">
            Tải lên tài liệu, video bài giảng hỗ trợ cho khóa học.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Tiêu đề tài nguyên
              </Label>
              <Input
                placeholder="Ví dụ: Slide bài giảng Buổi 1..."
                className="h-12 rounded-xl border-gray-200 bg-white"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-red-500 font-medium ml-1">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Loại tài nguyên
              </Label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                      <SelectValue placeholder="Chọn loại tài nguyên" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value={ResourceType.DOCUMENT}>Tài liệu (PDF, Word, Excel)</SelectItem>
                      <SelectItem value={ResourceType.VIDEO}>Video bài giảng</SelectItem>
                      <SelectItem value={ResourceType.AUDIO}>File âm thanh</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                  Tải lên File đính kèm
                </Label>

                {!fileUrlValue ? (
                  <div className="border-2 border-dashed border-gray-200 hover:border-[var(--primary)]/50 rounded-2xl bg-white p-8 transition-all flex flex-col items-center justify-center gap-3 relative group">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      disabled={isUploading}
                      className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2Icon className="size-8 text-[var(--primary)] animate-spin" />
                        <span className="text-xs font-bold text-gray-500">Đang tải file lên...</span>
                      </div>
                    ) : (
                      <>
                        <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-gray-400 group-hover:text-[var(--primary)] group-hover:bg-[var(--primary)]/5 transition-colors">
                          <FileTextIcon className="size-5" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-gray-700">Kéo thả hoặc nhấn để chọn file</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">Hỗ trợ các định dạng Tài liệu, Video, Zip,...</p>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <FileTextIcon className="size-5 text-emerald-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-emerald-800 truncate">Đã kết nối file thành công</p>
                        <p className="text-[10px] text-emerald-600/80 font-medium truncate max-w-[400px]">
                          {fileUrlValue}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleRemoveFile}
                      disabled={deleteMediaMutation.isPending}
                      className="size-8 rounded-lg text-emerald-700 hover:bg-emerald-100/50 hover:text-red-600 transition-colors"
                    >
                      {deleteMediaMutation.isPending ? (
                        <Loader2Icon className="size-4 animate-spin" />
                      ) : (
                        <XIcon className="size-4" />
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Hoặc</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-450 ml-1">
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
              disabled={loading || isUploading || !courseId}
              className="h-12 px-10 rounded-xl bg-[var(--primary)] text-white font-black shadow-lg shadow-[var(--primary)]/20 hover:opacity-90 transition-all"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2Icon className="size-4 animate-spin" />
                  <span>Đang xử lý...</span>
                </div>
              ) : (
                "Lưu tài nguyên"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
