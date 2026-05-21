import { ClassSessionStatus } from "@/constants/type";
import { SortOrder, ScheduleSessionSortBy } from "@/constants/sort";
import z from "zod";

export const scheduleSessionSchema = z.object({
  sessionId: z.string().uuid().optional(),
  classId: z.string().uuid(),
  shiftCode: z.string(),
  studyDate: z.string(),
  status: z.nativeEnum(ClassSessionStatus),
  shift: z.object({
    shiftId: z.string().uuid(),
    shiftCode: z.string(),
    shiftName: z.string(),
    timeRange: z.string(),
  }).optional(),
  class: z.object({
    classId: z.string().uuid(),
    classCode: z.string(),
    room: z.object({
      roomId: z.string().uuid(),
      roomCode: z.string(),
    }).optional(),
  }).optional(),
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
  sortBy: z.enum([ScheduleSessionSortBy.STUDY_DATE, ScheduleSessionSortBy.STATUS]).optional().default(ScheduleSessionSortBy.STUDY_DATE),
});
export type ScheduleSessionParams = z.infer<typeof scheduleSessionParamsSchema>;

export const scheduleSessionClassParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  studyDate: z.string().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.enum([ScheduleSessionSortBy.STUDY_DATE, ScheduleSessionSortBy.STATUS]).optional().default(ScheduleSessionSortBy.STUDY_DATE),
});
export type ScheduleSessionClassParams = z.infer<typeof scheduleSessionClassParamsSchema>;

export const updateSessionStatusSchema = z.object({
  status: z.nativeEnum(ClassSessionStatus),
});
export type UpdateSessionStatusInput = z.infer<typeof updateSessionStatusSchema>;
