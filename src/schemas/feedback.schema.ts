import { SortOrder, FeedbackClassSortBy } from "@/constants/sort";
import z from "zod";

export const feedbackSchema = z.object({
  feedbackId: z.string().uuid().optional(),
  studentId: z.string().uuid(),
  classId: z.string().uuid(),
  teacherId: z.string().uuid(),
  content: z.string().min(1),
  starRating: z.number().int().min(1).max(5),
  isFeatured: z.boolean().optional(),
  createdAt: z.string().optional(),
  student: z.object({
    studentCode: z.string().optional(),
    profile: z.object({
      fullName: z.string().nullable().optional(),
      avatarUrl: z.string().nullable().optional(),
    }).nullable().optional(),
  }).nullable().optional(),
  teacher: z.object({
    profile: z.object({
      fullName: z.string().nullable().optional(),
    }).nullable().optional(),
  }).nullable().optional(),
  class: z.object({
    roomCode: z.string(),
    course: z.object({
      courseName: z.string(),
    }),
  }).nullable().optional(),
});
export type Feedback = z.infer<typeof feedbackSchema>;

export const feedbackParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  studentId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
  teacherId: z.string().uuid().optional(),
  starRating: z.coerce.number().int().min(1).max(5).optional(),
  isFeatured: z.string().optional(),
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

export const myFeedbackParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.enum([FeedbackClassSortBy.CREATED_AT]).optional().default(FeedbackClassSortBy.CREATED_AT),
});
export type MyFeedbackParams = z.infer<typeof myFeedbackParamsSchema>;

export const feedbackInputSchema = z.object({
  classId: z.string().uuid(),
  teacherId: z.string().uuid(),
  content: z.string().min(1),
  starRating: z.coerce.number().int().min(1).max(5),
});
export type FeedbackInput = z.infer<typeof feedbackInputSchema>;
