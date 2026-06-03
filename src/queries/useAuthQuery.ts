import { handleError } from "@/utils/handleError";
import { ChangePasswordInput, LoginInput, RegisterInput, VerifyOtpInput } from "@/schemas/auth.schema";
import authService from "@/services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import Cookies from "js-cookie";
import { RoleType } from "@/constants/type";

const ACCESS_TOKEN_KEY = "accessToken";

export const useLogin = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: async (response) => {
      const { roleName, username, accessToken, refreshToken } = response.data.data;
      const user = { roleName, username, accessToken };
      setAuth(user, accessToken);
      useAuthStore.getState().setRefreshToken(refreshToken);
      Cookies.set(ACCESS_TOKEN_KEY, accessToken, { expires: 7 });

      const rolePath = roleName === RoleType.TEACHER ? "/teacher/dashboard" : roleName === RoleType.ADMIN ? "/admin/dashboard/overview" : "/student/dashboard";
      router.replace(rolePath);
    }
  });
};

export const useLogout = () => {
  const router = useRouter();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logout();
      Cookies.remove(ACCESS_TOKEN_KEY);
      router.replace("/auth/login");
    },
    onError: () => {
      logout();
      Cookies.remove(ACCESS_TOKEN_KEY);
      router.replace("/auth/login");
    },
  });
};

export const useRefreshToken = () => {
  return useQuery({
    queryKey: ["refreshToken"],
    queryFn: () => authService.refreshToken(),
    retry: false,
    enabled: false,
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: RegisterInput) => authService.signUp(data),
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (data: VerifyOtpInput) => authService.verifyEmail(data),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordInput) => authService.changePassword(data),
  });
};
