import { ApiResponse } from "@/constants/apiResponse";
import { Student, StudentParams } from "@/schemas/student.schema";
import http from "@/utils/http";

const prefix = "/student";

const studentService = {
  getStudents: (params?: StudentParams) => {
    return http.get<ApiResponse<Student[]>>(`${prefix}`, { params });
  },
  getStudentsByClass: (classId: string, params?: StudentParams) => {
    return http.get<ApiResponse<Student[]>>(`${prefix}/class/${classId}`, { params });
  },
};

export default studentService;
