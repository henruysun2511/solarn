"use client";

import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { Button } from "@/components/ui/button";
import { useGetSetting, useUpdateSetting } from "@/queries/useSettingQuery";
import { SettingInput } from "@/schemas/setting.schema";
import { handleError } from "@/utils/handleError";
import { GlobeIcon, Loader2Icon, MailIcon, MapPinIcon, PhoneIcon, SearchIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SettingDialog } from "./setting-dialog";

export default function AdminSettingPage() {
  const { data, isLoading } = useGetSetting();
  const updateMutation = useUpdateSetting();
  const [dialogOpen, setDialogOpen] = useState(false);

  const setting = data?.data;

  const handleSubmit = async (formData: SettingInput) => {
    try {
      await updateMutation.mutateAsync(formData, {
        onSuccess: (response: any) => {
          toast.success(response?.message || "Cập nhật cài đặt thành công");
          setDialogOpen(false);
        },
        onError: (error: any) => {
          handleError(error, "Cập nhật thất bại");
        },
      });
    } catch (error) {
      console.error("Submit failed", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2Icon className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <AdminPageTitle title="Cài đặt website" subtitle="Quản lý" />
        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-primary text-white px-6 h-11 rounded-md font-semibold"
        >
          <SettingsIcon className="mr-2 size-4" />
          Chỉnh sửa
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Thông tin chung */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-base font-black text-gray-800 mb-4 flex items-center gap-2">
            <GlobeIcon className="size-5 text-primary" />
            Thông tin chung
          </h3>
          <div className="space-y-4">
            {setting?.logoUrl && (
              <div className="flex items-center gap-6 pb-4 border-b border-gray-100">
                <div className="size-20 rounded-2xl border-2 border-gray-100 overflow-hidden flex items-center justify-center bg-gray-50 p-2">
                  <img src={setting.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{setting.siteName}</p>
                  <p className="text-xs text-gray-400">Logo trang web</p>
                </div>
              </div>
            )}
            <InfoRow label="Tên trang web" value={setting?.siteName} />
          </div>
        </div>

        {/* Liên hệ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-base font-black text-gray-800 mb-4 flex items-center gap-2">
            <PhoneIcon className="size-5 text-primary" />
            Thông tin liên hệ
          </h3>
          <div className="space-y-4">
            <InfoRow label="Hotline" value={setting?.hotline} />
            <InfoRow label="Email" value={setting?.email} />
            <InfoRow label="Địa chỉ" value={setting?.address} />
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-base font-black text-gray-800 mb-4 flex items-center gap-2">
            <SearchIcon className="size-5 text-primary" />
            SEO Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow label="Meta Title" value={setting?.metaTitle} />
            <InfoRow label="Meta Description" value={setting?.metaDescription} className="md:col-span-2" />
          </div>
        </div>
      </div>

      <SettingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={setting}
        loading={updateMutation.isPending}
      />
    </div>
  );
}

function InfoRow({ label, value, className }: { label: string; value?: string | null; className?: string }) {
  return (
    <div className={`flex items-start gap-4 ${className || ""}`}>
      <span className="text-sm font-semibold text-gray-500 w-32 shrink-0">{label}</span>
      <span className="text-sm font-medium text-gray-800 break-all">
        {value || <span className="text-gray-300 italic">Chưa thiết lập</span>}
      </span>
    </div>
  );
}
