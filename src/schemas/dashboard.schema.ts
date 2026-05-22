import { GenderType } from "@/constants/type";
import z from "zod";

export const topStudentSchema = z.object({
  studentId: z.string(),
  fullName: z.string(),
  studentCode: z.string(),
  avatarUrl: z.string().nullable(),
  avgScore: z.number(),
});

export type TopStudent = z.infer<typeof topStudentSchema>;

export const scoreDistributionSchema = z.object({
  excellent: z.number(),
  good: z.number(),
  average: z.number(),
  weak: z.number(),
  poor: z.number(),
});

export type ScoreDistribution = z.infer<typeof scoreDistributionSchema>;

export const todaySessionSchema = z.object({
  sessionId: z.string(),
  studyDate: z.string(),
  shiftCode: z.string(),
  shiftName: z.string(),
  timeRange: z.string(),
  status: z.string(),
  class: z.object({
    classId: z.string(),
    courseName: z.string(),
    roomCode: z.string(),
  }),
});

export type TodaySession = z.infer<typeof todaySessionSchema>;

export const teacherDashboardSchema = z.object({
  totalSessions: z.number(),
  totalIncome: z.number(),
  totalClasses: z.number(),
  totalStudents: z.number(),
  topStudents: z.array(topStudentSchema),
  scoreDistribution: scoreDistributionSchema,
  attendanceRate: z.number(),
  pendingScheduleChanges: z.number(),
  todaySessions: z.array(todaySessionSchema),
});

export type TeacherDashboard = z.infer<typeof teacherDashboardSchema>;

export const studentDashboardSchema = z.object({
  totalClasses: z.number(),
  totalAttended: z.number(),
  totalAbsent: z.number(),
  attendanceRate: z.number(),
  averageScore: z.number(),
  upcomingSessions: z.array(todaySessionSchema),
  totalInvoices: z.number(),
  paidInvoices: z.number(),
  unpaidInvoices: z.number(),
  pendingLeaveRequests: z.number(),
});

export type StudentDashboard = z.infer<typeof studentDashboardSchema>;
