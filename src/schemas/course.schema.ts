import { SortOrder } from "@/constants/sort";
import { CourseLevel } from "@/constants/type";
import z from "zod";

export const courseSchema = z.object({
  courseId: z.string().uuid().optional(),
  courseName: z.string().min(1, "Tên khóa học là bắt buộc").max(255),
  tuitionFee: z.string().regex(/^\d+(\.\d{1,2})?$/, "Học phí phải là số hợp lệ"),
  level: z.nativeEnum(CourseLevel).optional().nullable(),
  totalSessions: z.number().int().min(1, "Số buổi học phải ít nhất là 1"),
  image: z.string().url().optional().nullable(),
  description: z.string().optional().nullable(),
  totalClasses: z.number().optional(),
});

export type Course = z.infer<typeof courseSchema>;

export const courseParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  courseName: z.string().optional(),
  level: z.string().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("courseName"),
});

export type CourseParams = z.infer<typeof courseParamsSchema>;

export const courseInputSchema = z.object({
  courseName: z.string().min(1, "Tên khóa học là bắt buộc").max(255),
  tuitionFee: z.string().regex(/^\d+(\.\d{1,2})?$/, "Học phí phải là số hợp lệ"),
  level: z.string().max(20).optional().nullable(),
  totalSessions: z.coerce.number().int().min(1, "Số buổi học phải ít nhất là 1"),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

export type CourseInput = z.input<typeof courseInputSchema>;
