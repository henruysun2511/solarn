import { ApiResponse } from "@/constants/apiResponse";
import http from "@/utils/http";

const prefix = "/teacher";

const teacherService = {
  getTeachers: () => {
    return http.get<ApiResponse<any[]>>(prefix);
  },
};

export default teacherService;
