import { SortOrder } from "@/constants/sort";
import z from "zod";

export const salarySchema = z.object({
  salaryId: z.string().uuid().optional(),
  teacherId: z.string().uuid(),
  salaryDate: z.string(),
  totalSessions: z.number().int(),
  bonus: z.string(),
  deduction: z.string(),
  totalAmount: z.string(),
  createdAt: z.string().optional(),
});
export type Salary = z.infer<typeof salarySchema>;

export const salaryParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  teacherId: z.string().uuid().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("salaryDate"),
});
export type SalaryParams = z.infer<typeof salaryParamsSchema>;

export const calculateSalarySchema = z.object({
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(2000),
});
export type CalculateSalaryInput = z.infer<typeof calculateSalarySchema>;
