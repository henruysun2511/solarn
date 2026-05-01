import { LoginInput, RegisterInput, VerifyOtpInput } from "@/schemas/auth.schema";
import authService from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
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
