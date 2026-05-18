import { AttendanceStatus } from "@/constants/type";
import { SortOrder } from "@/constants/sort";
import z from "zod";

export const attendanceSchema = z.object({
  attendanceId: z.string().uuid().optional(),
  studentId: z.string().uuid(),
  sessionId: z.string().uuid(),
  status: z.nativeEnum(AttendanceStatus),
  note: z.string().optional().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type Attendance = z.infer<typeof attendanceSchema>;

export const attendanceParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  sessionId: z.string().uuid().optional(),
  studentId: z.string().uuid().optional(),
  status: z.nativeEnum(AttendanceStatus).optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("createdAt"),
});
export type AttendanceParams = z.infer<typeof attendanceParamsSchema>;

export const upsertAttendanceSchema = z.object({
  sessionId: z.string().uuid(),
  studentId: z.string().uuid(),
  status: z.nativeEnum(AttendanceStatus),
  note: z.string().optional(),
});

export const bulkUpsertAttendanceSchema = z.array(upsertAttendanceSchema);
export type BulkUpsertAttendanceInput = z.infer<typeof bulkUpsertAttendanceSchema>;
