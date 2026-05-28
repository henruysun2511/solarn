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
import { Textarea } from "@/components/ui/textarea";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useDeleteMedia } from "@/queries/useCloudinaryQuery";
import { Setting, SettingInput, settingInputSchema } from "@/schemas/setting.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlobeIcon, ImageIcon, Loader2Icon, MailIcon, MapPinIcon, PhoneIcon, SearchIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface SettingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SettingInput) => void;
  initialData?: Setting | null;
  loading?: boolean;
}

export function SettingDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  loading,
}: SettingDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SettingInput>({
    resolver: zodResolver(settingInputSchema),
    defaultValues: {
      siteName: "",
      logoUrl: "",
      hotline: "",
      email: "",
      address: "",
      metaTitle: "",
      metaDescription: "",
    },
  });

  const { handleUpload, isUploading } = useImageUpload();
  const deleteMediaMutation = useDeleteMedia();
  const currentLogo = watch("logoUrl");
  const [oldPublicId, setOldPublicId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      reset({
        siteName: initialData?.siteName || "",
        logoUrl: initialData?.logoUrl || "",
        hotline: initialData?.hotline || "",
        email: initialData?.email || "",
        address: initialData?.address || "",
        metaTitle: initialData?.metaTitle || "",
        metaDescription: initialData?.metaDescription || "",
      });
      setOldPublicId(null);
    }
  }, [initialData, reset, open]);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (oldPublicId) {
      deleteMediaMutation.mutate({ publicId: oldPublicId, resourceType: "image" });
    }

    const result = await handleUpload(file, "media", "settings");
    if (result) {
      setValue("logoUrl", result.url);
      setOldPublicId(result.publicId);
    }
  };

  const removeLogo = () => {
    if (oldPublicId) {
      deleteMediaMutation.mutate({ publicId: oldPublicId, resourceType: "image" });
    }
    setValue("logoUrl", "");
    setOldPublicId(null);
  };

  const fields: {
    label: string;
    key: string;
    icon?: any;
    placeholder: string;
    required?: boolean;
    colSpan?: boolean;
    textarea?: boolean;
  }[] = [
    { label: "Tên trang web", key: "siteName", icon: GlobeIcon, placeholder: "VD: SOLARN", required: true, colSpan: true },
    { label: "Hotline", key: "hotline", icon: PhoneIcon, placeholder: "1900123456" },
    { label: "Email", key: "email", icon: MailIcon, placeholder: "contact@solarn.edu.vn" },
    { label: "Địa chỉ", key: "address", icon: MapPinIcon, placeholder: "123 Lê Lợi, Quận 1, TP.HCM", colSpan: true, textarea: true },
    { label: "Meta Title", key: "metaTitle", icon: SearchIcon, placeholder: "SOLARN - Trung tâm đào tạo", colSpan: true },
    { label: "Meta Description", key: "metaDescription", icon: SearchIcon, placeholder: "Mô tả SEO cho trang web", colSpan: true, textarea: true },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-role="admin"
        className="sm:max-w-[700px] rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans"
      >
        <DialogHeader className="p-8 bg-white border-b border-gray-50">
          <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
            <GlobeIcon className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tighter text-gray-900">
            Cài đặt trang web
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-medium">
            Cập nhật thông tin chung, liên hệ và SEO cho toàn bộ hệ thống.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 grid grid-cols-2 gap-6 bg-white max-h-[60vh] overflow-y-auto custom-scrollbar">
            {/* Logo Upload */}
            <div className="col-span-2 space-y-3">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Logo trang web
              </Label>
              <div className="relative group">
                {currentLogo ? (
                  <div className="relative h-56 w-full rounded-3xl overflow-hidden border-2 border-gray-100 shadow-inner">
                    <img src={currentLogo} alt="Logo Preview" className="w-full h-full object-contain p-6" />
                    <button
                      type="button"
                      onClick={removeLogo}
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
                        <span className="text-sm font-bold text-gray-500">Tải logo lên (Click hoặc kéo thả)</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">PNG, JPG tối đa 5MB</span>
                      </>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={onFileChange} disabled={isUploading} />
                  </label>
                )}
              </div>
            </div>

            {/* Other fields */}
            {fields.map(({ label, key, icon: Icon, placeholder, required, colSpan, textarea }) => (
              <div key={key} className={`space-y-2 ${colSpan ? "col-span-2" : ""}`}>
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                  {label} {required && <span className="text-red-500">*</span>}
                </Label>
                {textarea ? (
                  <Textarea
                    placeholder={placeholder}
                    className="min-h-[80px] rounded-xl border-gray-200 bg-white resize-none py-3"
                    {...register(key as keyof SettingInput)}
                  />
                ) : (
                  <div className="relative">
                    {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />}
                    <Input
                      placeholder={placeholder}
                      className={`h-12 rounded-xl border-gray-200 bg-white focus-visible:ring-primary/10 ${Icon ? "pl-10" : ""}`}
                      {...register(key as keyof SettingInput)}
                    />
                  </div>
                )}
                {errors[key as keyof SettingInput] && (
                  <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                    {errors[key as keyof SettingInput]?.message}
                  </p>
                )}
              </div>
            ))}
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
              className="h-12 px-10 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
            >
              {loading || isUploading ? "Đang xử lý..." : "Cập nhật cài đặt"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
