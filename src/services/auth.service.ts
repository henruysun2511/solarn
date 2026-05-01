import { ApiResponse } from "@/constants/apiResponse";
import { AuthResponse, LoginInput, RegisterInput, VerifyOtpInput } from "@/schemas/auth.schema";
import http from "@/utils/http";

const prefix = "/auth";

const authService = {
  login: (data: LoginInput) => {
    return http.post<ApiResponse<AuthResponse>>(`${prefix}/login`, data);
  },

  signUp: (data: RegisterInput) => {
    return http.post<ApiResponse<any>>(`${prefix}/sign-up`, data);
  },

  verifyEmail: (data: VerifyOtpInput) => {
    return http.post<ApiResponse<any>>(`${prefix}/verify-email`, data);
  },
};

export default authService;
