import { ApiResponse } from "@/constants/apiResponse";
import { AuthResponse, ChangePasswordInput, LoginInput, RefreshTokenResponse, RegisterInput, VerifyOtpInput } from "@/schemas/auth.schema";
import http from "@/utils/http";
import { refreshApi } from "@/utils/axios";

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

  logout: () => {
    return http.post<ApiResponse<null>>(`${prefix}/logout`);
  },

  changePassword: (data: ChangePasswordInput) => {
    return http.post<ApiResponse<any>>(`${prefix}/change-password`, data);
  },

  refreshToken: () => {
    return refreshApi.post<ApiResponse<RefreshTokenResponse>>(`${prefix}/refresh-token`);
  },
};

export default authService;
