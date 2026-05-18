import { ApiResponse } from "@/constants/apiResponse";
import { 
  Attendance, 
  AttendanceParams, 
  BulkUpsertAttendanceInput 
} from "@/schemas/attendance.schema";
import http from "@/utils/http";

const prefix = "/attendances";

const attendanceService = {
  getAttendances: (params?: AttendanceParams) => {
    return http.get<ApiResponse<Attendance[]>>(prefix, { params });
  },
  
  upsertBulk: (data: BulkUpsertAttendanceInput) => {
    return http.post<ApiResponse<any>>(`${prefix}/bulk`, data);
  },

  deleteAttendance: (id: string) => {
    return http.delete<ApiResponse<any>>(`${prefix}/${id}`);
  },
};

export default attendanceService;
