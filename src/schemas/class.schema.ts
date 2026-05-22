import { ClassSortBy, SortOrder } from "@/constants/sort";
import z from "zod";

export const classSchema = z.object({
  classId: z.string().uuid(),
  courseId: z.string().uuid(),
  teacherId: z.string().uuid(),
  startDate: z.string(),
  maxStudents: z.number().int().min(1),
  scheduleTemplateId: z.string().uuid().optional().nullable(),
  roomCode: z.string(),
  enrollmentId: z.string().uuid().optional().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  // Joined fields from list by courseId API
  registeredStudents: z.number().optional(),
  scheduleTemplate: z.object({
    templateId: z.string().uuid(),
    templateName: z.string(),
    weekdays: z.string(),
    shiftCode: z.string(),
  }).optional().nullable(),
  teacher: z.object({
    teacherId: z.string().uuid(),
    teacherCode: z.string(),
    profile: z.object({
      fullName: z.string().nullable().optional(),
      avatarUrl: z.string().nullable().optional(),
    }).optional().nullable(),
  }).optional().nullable(),
  course: z.object({
    couseId: z.string().uuid(),
    courseName: z.string(),
    profile: z.object({
      fullName: z.string().nullable().optional(),
      avatarUrl: z.string().nullable().optional(),
    }).optional().nullable(),
  }),
  // Attendance stats (from get class detail API)
  endedSessions: z.number().optional(),
  averageAttendanceRate: z.number().optional(),
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
  sortBy: z.enum([ClassSortBy.CLASS_ID, ClassSortBy.START_DATE]).optional().default(ClassSortBy.START_DATE),
});
export type ClassParams = z.input<typeof classParamsSchema>;

export const classInputSchema = z.object({
  courseId: z.string().uuid(),
  teacherId: z.string().uuid(),
  startDate: z.string(),
  maxStudents: z.coerce.number().int().min(1),
  scheduleTemplateId: z.string().uuid(),
  roomCode: z.string(),
});
export type ClassInput = z.input<typeof classInputSchema>;

export const addStudentToClassSchema = z.object({
  studentId: z.string().uuid(),
});
export type AddStudentToClassInput = z.infer<typeof addStudentToClassSchema>;
