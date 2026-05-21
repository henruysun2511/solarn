import { SortOrder } from "@/constants/sort";
import { ResourceType } from "@/constants/type";
import z from "zod";

export const courseResourceSchema = z.object({
  resourceId: z.string().uuid().optional(),
  courseId: z.string().uuid(),
  title: z.string().min(1),
  fileUrl: z.string().url(),
  type: z.nativeEnum(ResourceType),
  course: z.object({
    courseName: z.string(),
  }).optional()
});
export type CourseResource = z.infer<typeof courseResourceSchema>;

export const courseResourceParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  courseId: z.string().uuid().optional(),
  type: z.nativeEnum(ResourceType).optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("title"),
});
export type CourseResourceParams = z.input<typeof courseResourceParamsSchema>;

export const courseResourceInputSchema = z.object({
  courseId: z.string().uuid(),
  title: z.string().min(1),
  fileUrl: z.string().url(),
  type: z.nativeEnum(ResourceType),
});
export type CourseResourceInput = z.infer<typeof courseResourceInputSchema>;
