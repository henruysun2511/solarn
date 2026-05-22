import { ApiResponse } from "@/constants/apiResponse";
import { StudentDashboard, TeacherDashboard } from "@/schemas/dashboard.schema";
import http from "@/utils/http";

const prefix = "/dashboard";

const dashboardService = {
  getTeacherDashboard: () => {
    return http.get<ApiResponse<TeacherDashboard>>(`${prefix}/teacher`);
  },
  getStudentDashboard: () => {
    return http.get<ApiResponse<StudentDashboard>>(`${prefix}/student`);
  },
};

export default dashboardService;
