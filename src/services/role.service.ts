import { ApiResponse } from "@/constants/apiResponse";
import { Role, RoleInput } from "@/schemas/role.schema";
import http from "@/utils/http";

const prefix = "/roles";

const roleService = {
  getRoles: () => {
    return http.get<ApiResponse<Role[]>>(prefix);
  },
  createRole: (data: RoleInput) => {
    return http.post<ApiResponse<Role>>(prefix, data);
  },
};

export default roleService;
