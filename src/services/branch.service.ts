import { ApiResponse } from "@/constants/apiResponse";
import { Branch, BranchInput, BranchParams } from "@/schemas/branch.schema";
import http from "@/utils/http";

const prefix = "/branches";

const branchService = {
  getBranches: (params?: BranchParams) => {
    return http.get<ApiResponse<Branch[]>>(prefix, { params });
  },

  createBranch: (data: BranchInput) => {
    return http.post<ApiResponse<Branch>>(prefix, data);
  },

  updateBranch: (id: string, data: Partial<BranchInput>) => {
    return http.patch<ApiResponse<Branch>>(`${prefix}/${id}`, data);
  },

  deleteBranch: (id: string) => {
    return http.delete<ApiResponse<null>>(`${prefix}/${id}`);
  },
};

export default branchService;
