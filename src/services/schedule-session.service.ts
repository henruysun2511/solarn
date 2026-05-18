import { ApiResponse } from "@/constants/apiResponse";
import { 
  ScheduleSession, 
  UpdateSessionStatusInput, 
  ScheduleSessionParams 
} from "@/schemas/schedule-session.schema";
import http from "@/utils/http";

const prefix = "/schedule-session";

const scheduleSessionService = {
  getScheduleSessions: (params?: ScheduleSessionParams) => {
    return http.get<ApiResponse<ScheduleSession[]>>(prefix, { params });
  },
  
  updateStatus: (id: string, data: UpdateSessionStatusInput) => {
    return http.patch<ApiResponse<any>>(`${prefix}/${id}/status`, data);
  },

  getScheduleSessionById: (id: string) => {
    return http.get<ApiResponse<ScheduleSession>>(`${prefix}/${id}`);
  },
};

export default scheduleSessionService;
