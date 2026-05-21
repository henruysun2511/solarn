import { SortOrder, FeedbackClassSortBy } from "@/constants/sort";
import z from "zod";

export const feedbackSchema = z.object({
  feedbackId: z.string().uuid().optional(),
  studentId: z.string().uuid(),
  classId: z.string().uuid(),
  teacherId: z.string().uuid(),
  content: z.string().min(1),
  createdAt: z.string().optional(),
});
export type Feedback = z.infer<typeof feedbackSchema>;

export const feedbackParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  studentId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
  teacherId: z.string().uuid().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("createdAt"),
});
export type FeedbackParams = z.infer<typeof feedbackParamsSchema>;

export const feedbackClassParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.enum([FeedbackClassSortBy.CREATED_AT]).optional().default(FeedbackClassSortBy.CREATED_AT),
});
export type FeedbackClassParams = z.infer<typeof feedbackClassParamsSchema>;

export const feedbackInputSchema = z.object({
  classId: z.string().uuid(),
  teacherId: z.string().uuid(),
  content: z.string().min(1),
});
export type FeedbackInput = z.infer<typeof feedbackInputSchema>;
