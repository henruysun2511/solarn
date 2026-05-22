import { SortOrder, StudentSortBy } from "@/constants/sort";
import { GenderType } from "@/constants/type";
import z from "zod";

export const studentProfileSchema = z.object({
  profileId: z.string().uuid().optional(),
  accountId: z.string().uuid().optional(),
  fullName: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  gender: z.nativeEnum(GenderType).nullable().optional(),
  avatarUrl: z.string().nullable().optional(),
  dob: z.string().nullable().optional(),
});

export const studentSchema = z.object({
  studentId: z.string().uuid(),
  studentCode: z.string(),
  profileId: z.string().uuid().optional(),
  profile: studentProfileSchema.optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type Student = z.infer<typeof studentSchema>;

export const studentParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.enum([StudentSortBy.NAME]).optional().default(StudentSortBy.NAME),
});
export type StudentParams = z.input<typeof studentParamsSchema>;

export const updateStudentProfileSchema = z.object({
  fullName: z.string().min(1, "Họ tên không được để trống"),
  phone: z.string().optional().nullable(),
  gender: z.nativeEnum(GenderType).optional().nullable(),
  dob: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
});
export type UpdateStudentProfileInput = z.input<typeof updateStudentProfileSchema>;
