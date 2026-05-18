import { ClassSessionStatus } from "@/constants/type";
import { SortOrder } from "@/constants/sort";
import z from "zod";

export const scheduleSessionSchema = z.object({
  sessionId: z.string().uuid().optional(),
  classId: z.string().uuid(),
  shiftCode: z.string(),
  studyDate: z.string(),
  status: z.nativeEnum(ClassSessionStatus),
});
export type ScheduleSession = z.infer<typeof scheduleSessionSchema>;

export const scheduleSessionParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  classId: z.string().uuid().optional(),
  shiftCode: z.string().optional(),
  status: z.nativeEnum(ClassSessionStatus).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("studyDate"),
});
export type ScheduleSessionParams = z.infer<typeof scheduleSessionParamsSchema>;

export const updateSessionStatusSchema = z.object({
  status: z.nativeEnum(ClassSessionStatus),
});
export type UpdateSessionStatusInput = z.infer<typeof updateSessionStatusSchema>;
