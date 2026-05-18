import { ApiResponse } from "@/constants/apiResponse";
import { 
  AssignmentResult, 
  AssignmentResultParams, 
  BulkUpsertAssignmentResultInput 
} from "@/schemas/assignment-result.schema";
import http from "@/utils/http";

const prefix = "/assignment-results";

const assignmentResultService = {
  getAssignmentResults: (params?: AssignmentResultParams) => {
    return http.get<ApiResponse<AssignmentResult[]>>(prefix, { params });
  },
  
  upsertBulk: (data: BulkUpsertAssignmentResultInput) => {
    return http.post<ApiResponse<any>>(`${prefix}/bulk`, data);
  },

  deleteAssignmentResult: (id: string) => {
    return http.delete<ApiResponse<any>>(`${prefix}/${id}`);
  },
};

export default assignmentResultService;
