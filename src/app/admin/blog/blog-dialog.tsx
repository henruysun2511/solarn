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
import { Blog, BlogInput, blogInputSchema } from "@/schemas/blog.schema";
import { uploadImage } from "@/utils/uploadImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, NewspaperIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const TinyEditor = dynamic(() => import("@/components/common/tiny-editor"), { ssr: false });

interface BlogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: BlogInput) => void;
  initialData?: Blog | null;
  loading?: boolean;
}

export function BlogDialog({ open, onOpenChange, onSubmit, initialData, loading }: BlogDialogProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogInput>({
    resolver: zodResolver(blogInputSchema),
    defaultValues: { isPublished: false },
  });

  const isPublished = watch("isPublished");
  const thumbnail = watch("thumbnail");
  const content = watch("content");

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          title: initialData.title,
          slug: initialData.slug,
          thumbnail: initialData.thumbnail,
          content: initialData.content,
          excerpt: initialData.excerpt,
          author: initialData.author,
          isPublished: initialData.isPublished,
        });
      } else {
        reset({ title: "", slug: "", thumbnail: "", content: "", excerpt: "", author: "", isPublished: false });
      }
    }
  }, [initialData, reset, open]);

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setValue("thumbnail", url);
    } finally {
      setUploading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
      .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
      .replace(/ì|í|ị|ỉ|ĩ/g, "i")
      .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
      .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
      .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => {
          if (e.target instanceof Element && e.target.closest('.tox')) {
            e.preventDefault();
          }
        }}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        data-role="admin" className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-0 font-sans">
        <DialogHeader className="p-8 bg-white border-b border-gray-50">
          <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
            <NewspaperIcon className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tighter text-gray-900">
            {initialData ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-medium">
            {initialData ? "Cập nhật thông tin bài viết..." : "Tạo bài viết mới cho blog..."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 grid grid-cols-2 gap-6 bg-white">
            <div className="col-span-2 space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Tiêu đề</Label>
              <Input
                placeholder="Nhập tiêu đề bài viết"
                className="h-12 rounded-xl border-gray-200 bg-white"
                {...register("title")}
                onChange={(e) => {
                  register("title").onChange(e);
                  if (!initialData) {
                    setValue("slug", generateSlug(e.target.value));
                  }
                }}
              />
              {errors.title && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">{errors.title.message}</p>}
            </div>

            <div className="col-span-2 md:col-span-1 space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Slug</Label>
              <Input placeholder="slug-bai-viet" className="h-12 rounded-xl border-gray-200 bg-white" {...register("slug")} />
              {errors.slug && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">{errors.slug.message}</p>}
            </div>

            <div className="col-span-2 md:col-span-1 space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Tác giả</Label>
              <Input placeholder="Tên tác giả" className="h-12 rounded-xl border-gray-200 bg-white" {...register("author")} />
            </div>

            <div className="col-span-2 space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Ảnh thumbnail</Label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnailUpload}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="h-12 px-6 rounded-xl border-gray-200"
                >
                  <ImageIcon className="mr-2 size-4" />
                  {uploading ? "Đang tải..." : "Chọn ảnh"}
                </Button>
                {thumbnail && (
                  <div className="relative size-16 rounded-xl overflow-hidden border">
                    <img src={thumbnail} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-2 space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Mô tả ngắn</Label>
              <Textarea
                placeholder="Mô tả ngắn về bài viết..."
                className="min-h-[80px] rounded-xl border-gray-200 bg-white resize-none"
                {...register("excerpt")}
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Nội dung</Label>
              <TinyEditor
                value={content || ""}
                onChange={(val) => setValue("content", val)}
              />
              {errors.content && <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">{errors.content.message}</p>}
            </div>

            <div className="col-span-2 flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
              <div>
                <Label className="text-sm font-bold text-gray-700">Xuất bản</Label>
                <p className="text-xs text-gray-400">Hiển thị bài viết công khai trên website</p>
              </div>
              <Switch checked={isPublished} onCheckedChange={(val) => setValue("isPublished", val)} className="data-[state=checked]:bg-primary" />
            </div>
          </div>

          <DialogFooter className="p-8 bg-white border-t border-gray-50 flex gap-3">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="h-12 px-6 rounded-xl font-bold text-gray-400 hover:bg-gray-50">
              Hủy bỏ
            </Button>
            <Button type="submit" disabled={loading || uploading} className="h-12 px-10 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/20">
              {loading ? "Đang xử lý..." : initialData ? "Cập nhật bài viết" : "Lưu bài viết"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
