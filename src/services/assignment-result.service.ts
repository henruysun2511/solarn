import { ApiResponse } from "@/constants/apiResponse";
import { 
  AssignmentResult, 
  AssignmentResultParams, 
  MyAssignmentResultParams,
  BulkUpsertAssignmentResultInput 
} from "@/schemas/assignment-result.schema";
import http from "@/utils/http";

const prefix = "/assignment-results";

const assignmentResultService = {
  getAssignmentResults: (params?: AssignmentResultParams) => {
    return http.get<ApiResponse<AssignmentResult[]>>(prefix, { params });
  },

  getAllAssignmentResultsForExport: (params?: Omit<AssignmentResultParams, "page" | "limit">) => {
    return http.get<ApiResponse<AssignmentResult[]>>(prefix, {
      params: { ...params, page: 1, limit: 9999999 },
    });
  },
  
  getMyTeacherAssignmentResults: (params?: MyAssignmentResultParams) => {
    return http.get<ApiResponse<AssignmentResult[]>>(`${prefix}/my-teacher`, { params });
  },

  getMyStudentAssignmentResults: (params?: MyAssignmentResultParams) => {
    return http.get<ApiResponse<AssignmentResult[]>>(`${prefix}/my-student`, { params });
  },

  upsertBulk: (data: BulkUpsertAssignmentResultInput) => {
    return http.post<ApiResponse<any>>(`${prefix}/bulk`, data);
  },

  deleteAssignmentResult: (id: string) => {
    return http.delete<ApiResponse<any>>(`${prefix}/${id}`);
  },
};

export default assignmentResultService;
