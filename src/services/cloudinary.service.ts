import { ApiResponse } from "@/constants/apiResponse";
import { DeleteMediaInput, UploadMediaResponse } from "@/schemas/cloudinary.schema";
import http from "@/utils/http";

const prefix = "/cloudinaries";

const cloudinaryService = {
  uploadMedia: (file: File, folder?: string) => {
    const formData = new FormData();
    formData.append("file", file);
    if (folder) {
      formData.append("folder", folder);
    }
    return http.post<ApiResponse<UploadMediaResponse>>(`${prefix}/media`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return http.post<ApiResponse<UploadMediaResponse>>(`${prefix}/avatars`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteMedia: (data: DeleteMediaInput) => {
    return http.delete<ApiResponse<any>>(`${prefix}/media`, { data });
  },
};

export default cloudinaryService;
