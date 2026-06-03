import { ApiResponse } from "@/constants/apiResponse";
import {
  ScheduleSession,
  UpdateSessionStatusInput,
  ScheduleSessionParams,
  ScheduleSessionClassParams,
  CreateScheduleSessionInput
} from "@/schemas/schedule-session.schema";
import http from "@/utils/http";

const prefix = "/schedule-session";

const scheduleSessionService = {
  getScheduleSessions: (params?: ScheduleSessionParams) => {
    return http.get<ApiResponse<ScheduleSession[]>>(prefix, { params });
  },

  getAllScheduleSessionsForExport: (params?: Omit<ScheduleSessionParams, "page" | "limit">) => {
    return http.get<ApiResponse<ScheduleSession[]>>(prefix, {
      params: { ...params, page: 1, limit: 100 },
    });
  },

  getScheduleSessionsByClass: (classId: string, params?: ScheduleSessionClassParams) => {
    return http.get<ApiResponse<ScheduleSession[]>>(`${prefix}/class/${classId}`, { params });
  },

  updateStatus: (id: string, data: UpdateSessionStatusInput) => {
    return http.patch<ApiResponse<any>>(`${prefix}/${id}/status`, data);
  },

  getScheduleSessionById: (id: string) => {
    return http.get<ApiResponse<ScheduleSession>>(`${prefix}/${id}`);
  },

  createOneForClass: (classId: string, data: CreateScheduleSessionInput) => {
    return http.post<ApiResponse<any>>(`${prefix}/class/${classId}`, data);
  },
};

export default scheduleSessionService;
