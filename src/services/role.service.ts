import { ApiResponse } from "@/constants/apiResponse";
import { Role } from "@/schemas/role.schema";
import http from "@/utils/http";

const prefix = "/roles";

const roleService = {
  getRoles: () => {
    return http.get<ApiResponse<Role[]>>(prefix);
  },
};

export default roleService;
