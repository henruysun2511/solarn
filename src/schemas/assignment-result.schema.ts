import { SortOrder } from "@/constants/sort";
import z from "zod";

export const assignmentResultSchema = z.object({
  assignmentResultId: z.string().uuid().optional(),
  sessionId: z.string().uuid(),
  studentId: z.string().uuid(),
  score: z.number().min(0).max(10),
  feedback: z.string().optional().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type AssignmentResult = z.infer<typeof assignmentResultSchema>;

export const assignmentResultParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  sessionId: z.string().uuid().optional(),
  studentId: z.string().uuid().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("createdAt"),
});
export type AssignmentResultParams = z.infer<typeof assignmentResultParamsSchema>;

export const upsertAssignmentResultSchema = z.object({
  sessionId: z.string().uuid(),
  studentId: z.string().uuid(),
  score: z.number().min(0).max(10),
  feedback: z.string().optional(),
});

export const bulkUpsertAssignmentResultSchema = z.array(upsertAssignmentResultSchema);
export type BulkUpsertAssignmentResultInput = z.infer<typeof bulkUpsertAssignmentResultSchema>;
