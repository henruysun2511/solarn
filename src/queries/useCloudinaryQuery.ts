import { DeleteMediaInput } from "@/schemas/cloudinary.schema";
import cloudinaryService from "@/services/cloudinary.service";
import { useMutation } from "@tanstack/react-query";

export const useUploadMedia = () => {
  return useMutation({
    mutationFn: ({ file, folder }: { file: File; folder?: string }) =>
      cloudinaryService.uploadMedia(file, folder),
  });
};

export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: (file: File) => cloudinaryService.uploadAvatar(file),
  });
};

export const useDeleteMedia = () => {
  return useMutation({
    mutationFn: (data: DeleteMediaInput) => cloudinaryService.deleteMedia(data),
  });
};
