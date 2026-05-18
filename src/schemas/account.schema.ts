import { AccountSortBy, SortOrder } from "@/constants/sort";
import { AccountStatus } from "@/constants/status";
import { GenderType } from "@/constants/type";
import { z } from "zod";
import { roleSchema } from "./role.schema";

export const accountSchema = z.object({
  accountId: z.string().uuid().optional(),
  username: z.string().min(3, "Username phải có ít nhất 3 ký tự").max(100),
  status: z.nativeEnum(AccountStatus),
  roleId: z.string().uuid(),
  createdAt: z.string().datetime().optional(),
  role: roleSchema.optional(),
  profile: z.object({
    fullName: z.string().min(1, "Họ tên là bắt buộc"),
    email: z.string().email().optional().nullable(),
    phone: z.string().optional().nullable(),
    avatarUrl: z.string().url().optional().nullable(),
    gender: z.nativeEnum(GenderType).optional().nullable(),
  }).optional(),
});

export type Account = z.infer<typeof accountSchema>;

export const accountParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  username: z.string().optional(),
  roleId: z.string().uuid().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.enum([AccountSortBy.USERNAME, AccountSortBy.CREATED_AT, AccountSortBy.STATUS]).optional().default(AccountSortBy.CREATED_AT),
});

export type AccountParams = z.infer<typeof accountParamsSchema>;

export const accountInputSchema = z.object({
  username: z.string().min(3, "Username phải có ít nhất 3 ký tự").max(100),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  passwordConfirm: z.string().min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
  roleId: z.string().uuid("Vui lòng chọn quyền"),
  salaryRate: z.string().optional(),
  profile: z.object({
    fullName: z.string().min(1, "Họ tên là bắt buộc"),
  }).optional(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["passwordConfirm"],
});

export type AccountInput = z.infer<typeof accountInputSchema>;
