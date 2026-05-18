import { EnrollmentStatus } from "@/constants/type";
import { SortOrder } from "@/constants/sort";
import z from "zod";

export const enrollmentSchema = z.object({
  enrollmentId: z.string().uuid().optional(),
  studentId: z.string().uuid(),
  classId: z.string().uuid(),
  status: z.nativeEnum(EnrollmentStatus),
  createdAt: z.string().optional(),
});
export type Enrollment = z.infer<typeof enrollmentSchema>;

export const enrollmentParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  studentId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
  status: z.nativeEnum(EnrollmentStatus).optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("createdAt"),
});
export type EnrollmentParams = z.infer<typeof enrollmentParamsSchema>;

export const enrollmentInputSchema = z.object({
  studentId: z.string().uuid(),
  classId: z.string().uuid(),
  status: z.nativeEnum(EnrollmentStatus).optional(),
});
export type EnrollmentInput = z.infer<typeof enrollmentInputSchema>;
