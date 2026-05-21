import { SortOrder, TeacherSortBy } from "@/constants/sort";
import { GenderType } from "@/constants/type";
import z from "zod";

export const teacherSpecialtySchema = z.object({
  specialtyId: z.string().uuid(),
  teacherId: z.string().uuid(),
  courseId: z.string().uuid(),
  course: z.object({
    courseId: z.string().uuid(),
    courseName: z.string(),
    tuitionFee: z.number(),
    level: z.string().nullable().optional(),
    totalSessions: z.number(),
    image: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
  }).optional(),
});

export type TeacherSpecialty = z.infer<typeof teacherSpecialtySchema>;

export const teacherSchema = z.object({
  teacherId: z.string().uuid(),
  teacherCode: z.string(),
  profileId: z.string().uuid(),
  salaryRate: z.number(),
  warningCount: z.number().optional().default(0),
  profile: z.object({
    profileId: z.string().uuid(),
    accountId: z.string().uuid(),
    fullName: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    gender: z.nativeEnum(GenderType).nullable().optional(),
    avatarUrl: z.string().nullable().optional(),
    dob: z.string().nullable().optional(),
  }).optional(),
  teacherSpecialties: z.array(teacherSpecialtySchema).optional().default([]),
});

export type Teacher = z.infer<typeof teacherSchema>;

export const teacherParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.enum([TeacherSortBy.NAME, TeacherSortBy.CODE]).optional().default(TeacherSortBy.NAME),
});

export type TeacherParams = z.input<typeof teacherParamsSchema>;

export const updateTeacherProfileSchema = z.object({
  fullName: z.string().min(1, "Họ tên không được để trống"),
  phone: z.string().optional().nullable(),
  gender: z.nativeEnum(GenderType).optional().nullable(),
  dob: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
});

export type UpdateTeacherProfileInput = z.input<typeof updateTeacherProfileSchema>;
