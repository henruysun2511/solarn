import { ApiResponse } from "@/constants/apiResponse";
import { StudyShift, StudyShiftInput, StudyShiftParams } from "@/schemas/shift.schema";
import http from "@/utils/http";

const prefix = "/study-shifts";

const shiftService = {
  getShifts: (params?: StudyShiftParams) => {
    return http.get<ApiResponse<StudyShift[]>>(prefix, { params });
  },

  createShift: (data: StudyShiftInput) => {
    return http.post<ApiResponse<StudyShift>>(prefix, data);
  },

  updateShift: (id: string, data: Partial<StudyShiftInput>) => {
    return http.put<ApiResponse<StudyShift>>(`${prefix}/${id}`, data);
  },

  deleteShift: (id: string) => {
    return http.delete<ApiResponse<null>>(`${prefix}/${id}`);
  },
};

export default shiftService;
