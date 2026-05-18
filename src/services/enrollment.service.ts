import { ApiResponse } from "@/constants/apiResponse";
import { 
  Enrollment, 
  EnrollmentInput, 
  EnrollmentParams 
} from "@/schemas/enrollment.schema";
import http from "@/utils/http";

const prefix = "/enrollments";

const enrollmentService = {
  getEnrollments: (params?: EnrollmentParams) => {
    return http.get<ApiResponse<Enrollment[]>>(prefix, { params });
  },
  
  createEnrollment: (data: EnrollmentInput) => {
    return http.post<ApiResponse<Enrollment>>(prefix, data);
  },

  updateEnrollment: (id: string, data: Partial<EnrollmentInput>) => {
    return http.put<ApiResponse<Enrollment>>(`${prefix}/${id}`, data);
  },

  deleteEnrollment: (id: string) => {
    return http.delete<ApiResponse<any>>(`${prefix}/${id}`);
  },
};

export default enrollmentService;
