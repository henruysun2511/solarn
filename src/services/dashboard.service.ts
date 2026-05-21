import { ApiResponse } from "@/constants/apiResponse";
import { TeacherDashboard } from "@/schemas/dashboard.schema";
import http from "@/utils/http";

const prefix = "/dashboard";

const dashboardService = {
  getTeacherDashboard: () => {
    return http.get<ApiResponse<TeacherDashboard>>(`${prefix}/teacher`);
  },
};

export default dashboardService;
