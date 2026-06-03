import cloudinaryService from "@/services/cloudinary.service";

export const uploadImage = async (file: File): Promise<string> => {
  const res = await cloudinaryService.uploadMedia(file, "blog");
  return res.data.data.url;
};
