import { ApiResponse } from "@/constants/apiResponse";
import { Branch, BranchInput, BranchParams } from "@/schemas/branch.schema";
import http from "@/utils/http";

const branchService = {
  getBranches: (params?: BranchParams) => {
    return http.get<ApiResponse<Branch[]>>("/branches", { params });
  },

  createBranch: (data: BranchInput) => {
    return http.post<ApiResponse<Branch>>("/branches", data);
  },

  updateBranch: (id: string, data: Partial<BranchInput>) => {
    return http.patch<ApiResponse<Branch>>(`/branches/${id}`, data);
  },

  deleteBranch: (id: string) => {
    return http.delete<ApiResponse<null>>(`/branches/${id}`);
  },
};

export default branchService;
