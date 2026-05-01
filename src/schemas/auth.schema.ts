import { GenderType } from "@/constants/type";
import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username không được để trống"),
  password: z.string().min(5, "Mật khẩu phải có ít nhất 5 ký tự"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z.string()
    .min(3, "Username phải có ít nhất 3 ký tự")
    .max(100)
    .regex(/^[a-zA-Z0-9_-]+$/, "Username chỉ chứa chữ cái, số, dấu gạch dưới và dấu gạch ngang"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  passwordConfirm: z.string().min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
  fullName: z.string().min(1, "Họ tên không được để trống").max(255),
  email: z.string().email("Email không hợp lệ").max(255),
  phone: z.string().max(20, "Số điện thoại tối đa 20 ký tự").optional(),
  gender: z.nativeEnum(GenderType).default(GenderType.UNKNOWN),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["passwordConfirm"],
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const verifyOtpSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  otp: z.string().length(6, "Mã OTP phải có 6 chữ số"),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

export interface AuthResponse {
  user: {
    accountId: string;
    username: string;
    fullName: string;
    email: string;
    role: string;
    avatar?: string;
  };
  accessToken: string;
}
