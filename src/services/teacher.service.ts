import { ApiResponse } from "@/constants/apiResponse";
import { Teacher, TeacherParams, UpdateTeacherProfileInput } from "@/schemas/teacher.schema";
import http from "@/utils/http";

const prefix = "/teacher";

const teacherService = {
  getTeachers: (params?: TeacherParams) => {
    return http.get<ApiResponse<Teacher[]>>(`${prefix}`, { params });
  },

  getMyProfile: () => {
    return http.get<ApiResponse<Teacher>>(`${prefix}/profile`);
  },

  updateMyProfile: (data: UpdateTeacherProfileInput) => {
    return http.patch<ApiResponse<Teacher>>(`${prefix}/profile`, data);
  },
};

export default teacherService;
