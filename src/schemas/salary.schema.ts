import { SalarySortBy, SortOrder } from "@/constants/sort";
import z from "zod";

export const teacherProfileSchema = z.object({
  fullName: z.string().nullable().optional(),
});

export const teacherSalarySchema = z.object({
  teacherId: z.string().uuid(),
  teacherCode: z.string(),
  profile: teacherProfileSchema.nullable().optional(),
});

export const salarySchema = z.object({
  salaryId: z.string().uuid().optional(),
  teacherId: z.string().uuid(),
  salaryDate: z.string(),
  totalSessions: z.number().int(),
  bonus: z.string(),
  deduction: z.string(),
  totalAmount: z.string(),
  teacher: teacherSalarySchema.optional(),
});
export type Salary = z.infer<typeof salarySchema>;

export const salaryParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  teacherId: z.string().uuid().optional(),
  year: z.coerce.number().int().min(2000).optional(),
  month: z.coerce.number().int().min(1).max(12).optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.enum([SalarySortBy.SALARY_DATE, SalarySortBy.TOTAL_SESSIONS, SalarySortBy.TOTAL_AMOUNT]).optional().default(SalarySortBy.SALARY_DATE),
});
export type SalaryParams = z.infer<typeof salaryParamsSchema>;

export const calculateSalarySchema = z.object({
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(2000),
});
export type CalculateSalaryInput = z.infer<typeof calculateSalarySchema>;

export const mySalaryParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  year: z.coerce.number().int().min(2000).optional(),
  month: z.coerce.number().int().min(1).max(12).optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.enum([SalarySortBy.SALARY_DATE, SalarySortBy.TOTAL_SESSIONS, SalarySortBy.TOTAL_AMOUNT]).optional().default(SalarySortBy.SALARY_DATE),
});
export type MySalaryParams = z.infer<typeof mySalaryParamsSchema>;
