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

export const attendanceProfileSchema = z.object({
  fullName: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
});

export const attendanceStudentSchema = z.object({
  studentCode: z.string(),
  profile: attendanceProfileSchema.nullable().optional(),
});

export const attendanceRecordSchema = z.object({
  attendanceId: z.string(),
  studentId: z.string(),
  sessionId: z.string(),
  status: z.nativeEnum(AttendanceStatus),
  note: z.string().nullable().optional(),
  student: attendanceStudentSchema,
});
export type AttendanceRecord = z.infer<typeof attendanceRecordSchema>;

export const attendanceSummarySchema = z.object({
  present: z.number(),
  absent: z.number(),
  late: z.number(),
  total: z.number(),
});
export type AttendanceSummary = z.infer<typeof attendanceSummarySchema>;

export const attendanceSessionResponseSchema = z.object({
  records: z.array(attendanceRecordSchema),
  summary: attendanceSummarySchema,
});
export type AttendanceSessionResponse = z.infer<typeof attendanceSessionResponseSchema>;

export const myAttendanceSessionSchema = z.object({
  sessionId: z.string(),
  studyDate: z.string(),
  shiftCode: z.string(),
  shift: z.object({
    shiftName: z.string(),
    timeRange: z.string(),
  }).nullable().optional(),
  class: z.object({
    classId: z.string(),
    course: z.object({
      courseName: z.string(),
    }),
  }),
});

export const myAttendanceSchema = z.object({
  attendanceId: z.string(),
  studentId: z.string(),
  sessionId: z.string(),
  status: z.nativeEnum(AttendanceStatus),
  note: z.string().nullable().optional(),
  session: myAttendanceSessionSchema,
});
export type MyAttendance = z.infer<typeof myAttendanceSchema>;

export const myAttendanceParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  status: z.nativeEnum(AttendanceStatus).optional(),
  classId: z.string().uuid().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("studyDate"),
});
export type MyAttendanceParams = z.infer<typeof myAttendanceParamsSchema>;
