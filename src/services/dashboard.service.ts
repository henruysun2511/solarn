import { ApiResponse } from "@/constants/apiResponse";
import { AdminDashboard, FinanceDashboard, RequestDashboard, StudentDashboard, TeacherDashboard, TrainingDashboard } from "@/schemas/dashboard.schema";
import http from "@/utils/http";

const prefix = "/dashboard";

const dashboardService = {
  getTeacherDashboard: () => {
    return http.get<ApiResponse<TeacherDashboard>>(`${prefix}/teacher`);
  },
  getStudentDashboard: () => {
    return http.get<ApiResponse<StudentDashboard>>(`${prefix}/student`);
  },
  getAdminDashboard: () => {
    return http.get<ApiResponse<AdminDashboard>>(`${prefix}/admin`);
  },
  getFinanceDashboard: () => {
    return http.get<ApiResponse<FinanceDashboard>>(`${prefix}/admin/finance`);
  },
  getTrainingDashboard: () => {
    return http.get<ApiResponse<TrainingDashboard>>(`${prefix}/admin/training`);
  },
  getRequestDashboard: () => {
    return http.get<ApiResponse<RequestDashboard>>(`${prefix}/admin/request`);
  },
};

export default dashboardService;
