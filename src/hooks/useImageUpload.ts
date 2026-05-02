import { useState } from "react";
import { useUploadMedia, useUploadAvatar } from "@/queries/useCloudinaryQuery";
import { toast } from "sonner";
import { handleError } from "@/utils/handleError";

export const useImageUpload = () => {
  const uploadMediaMutation = useUploadMedia();
  const uploadAvatarMutation = useUploadAvatar();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file: File, type: "media" | "avatar" = "media", folder?: string) => {
    setIsUploading(true);
    try {
      const mutation = type === "avatar" ? uploadAvatarMutation : uploadMediaMutation;
      const res = await mutation.mutateAsync(type === "avatar" ? (file as any) : { file, folder });
      
      if (res.data) {
        toast.success("Tải ảnh lên thành công");
        return res.data.data;
      }
    } catch (error) {
      handleError(error, "Lỗi khi tải ảnh lên");
    } finally {
      setIsUploading(false);
    }
    return null;
  };

  return {
    handleUpload,
    isUploading,
  };
};
