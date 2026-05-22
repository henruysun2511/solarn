import { ApiResponse } from "@/constants/apiResponse";
import { Student, StudentParams, UpdateStudentProfileInput } from "@/schemas/student.schema";
import http from "@/utils/http";

const prefix = "/student";

const studentService = {
  getStudents: (params?: StudentParams) => {
    return http.get<ApiResponse<Student[]>>(`${prefix}`, { params });
  },
  getStudentsByClass: (classId: string, params?: StudentParams) => {
    return http.get<ApiResponse<Student[]>>(`${prefix}/class/${classId}`, { params });
  },
  getMyProfile: () => {
    return http.get<ApiResponse<Student>>(`${prefix}/profile`);
  },
  updateMyProfile: (data: UpdateStudentProfileInput) => {
    return http.patch<ApiResponse<Student>>(`${prefix}/profile`, data);
  },
};

export default studentService;
