import { ApiResponse } from "@/constants/apiResponse";
import { 
  Attendance, 
  AttendanceParams, 
  AttendanceSessionResponse,
  BulkUpsertAttendanceInput,
  MyAttendance,
  MyAttendanceParams
} from "@/schemas/attendance.schema";
import http from "@/utils/http";

const prefix = "/attendances";

const attendanceService = {
  getAttendances: (params?: AttendanceParams) => {
    return http.get<ApiResponse<Attendance[]>>(prefix, { params });
  },

  getAttendanceBySession: (sessionId: string) => {
    return http.get<ApiResponse<AttendanceSessionResponse>>(`${prefix}/session/${sessionId}`);
  },
  
  upsertBulk: (data: BulkUpsertAttendanceInput) => {
    return http.post<ApiResponse<any>>(`${prefix}/bulk`, data);
  },

  deleteAttendance: (id: string) => {
    return http.delete<ApiResponse<any>>(`${prefix}/${id}`);
  },

  getMyAttendances: (params?: MyAttendanceParams) => {
    return http.get<ApiResponse<MyAttendance[]>>(`${prefix}/my`, { params });
  },
};

export default attendanceService;
