import { SortOrder } from "@/constants/sort";
import z from "zod";

export const classSchema = z.object({
  classId: z.string().uuid().optional(),
  courseId: z.string().uuid(),
  teacherId: z.string().uuid(),
  startDate: z.string(),
  maxStudents: z.number().int().min(1),
  scheduleTemplateId: z.string().uuid().optional().nullable(),
  roomCode: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type Class = z.infer<typeof classSchema>;

export const classParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  courseId: z.string().uuid().optional(),
  teacherId: z.string().uuid().optional(),
  roomCode: z.string().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("startDate"),
});
export type ClassParams = z.infer<typeof classParamsSchema>;

export const classInputSchema = z.object({
  courseId: z.string().uuid(),
  teacherId: z.string().uuid(),
  startDate: z.string(),
  maxStudents: z.coerce.number().int().min(1),
  scheduleTemplateId: z.string().uuid(),
  roomCode: z.string(),
});
export type ClassInput = z.infer<typeof classInputSchema>;

export const addStudentToClassSchema = z.object({
  studentId: z.string().uuid(),
});
export type AddStudentToClassInput = z.infer<typeof addStudentToClassSchema>;
