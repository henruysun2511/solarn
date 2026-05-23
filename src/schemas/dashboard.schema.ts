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

export const monthlyRevenueSchema = z.object({
  month: z.string(),
  revenue: z.number(),
  enrollments: z.number(),
});

export type MonthlyRevenue = z.infer<typeof monthlyRevenueSchema>;

export const topCourseSchema = z.object({
  courseId: z.string(),
  courseName: z.string(),
  totalStudents: z.number(),
  totalRevenue: z.number(),
});

export type TopCourse = z.infer<typeof topCourseSchema>;

export const recentEnrollmentSchema = z.object({
  enrollmentId: z.string(),
  studentName: z.string(),
  courseName: z.string(),
  amount: z.string(),
  status: z.string(),
  createdAt: z.string(),
});

export type RecentEnrollment = z.infer<typeof recentEnrollmentSchema>;

export const adminDashboardSchema = z.object({
  totalStudents: z.number(),
  totalTeachers: z.number(),
  totalCourses: z.number(),
  totalRevenue: z.number(),
  revenueGrowth: z.number(),
  studentGrowth: z.number(),
  newStudentsThisMonth: z.number(),
  activeClasses: z.number(),
  pendingLeaves: z.number(),
  pendingSalaryComplaints: z.number(),
  monthlyRevenue: z.array(monthlyRevenueSchema),
  topCourses: z.array(topCourseSchema),
  recentEnrollments: z.array(recentEnrollmentSchema),
});

export type AdminDashboard = z.infer<typeof adminDashboardSchema>;

export const financeDashboardSchema = z.object({
  totalRevenue: z.number(),
  totalPaid: z.number(),
  totalPending: z.number(),
  totalCancelled: z.number(),
  revenueGrowth: z.number(),
  paidGrowth: z.number(),
  pendingGrowth: z.number(),
  monthlyRevenue: z.array(monthlyRevenueSchema),
  revenueByCourse: z.array(topCourseSchema),
  recentTransactions: z.array(z.object({
    transactionId: z.string(),
    studentName: z.string(),
    courseName: z.string(),
    amount: z.string(),
    status: z.string(),
    createdAt: z.string(),
  })),
});

export type FinanceDashboard = z.infer<typeof financeDashboardSchema>;

export const trainingDashboardSchema = z.object({
  totalCourses: z.number(),
  totalClasses: z.number(),
  totalSessions: z.number(),
  totalStudents: z.number(),
  courseGrowth: z.number(),
  classGrowth: z.number(),
  studentGrowth: z.number(),
  attendanceRate: z.number(),
  averageScore: z.number(),
  topCourses: z.array(topCourseSchema),
  scoreDistribution: scoreDistributionSchema,
  monthlyEnrollments: z.array(z.object({
    month: z.string(),
    enrollments: z.number(),
  })),
});

export type TrainingDashboard = z.infer<typeof trainingDashboardSchema>;

export const requestDashboardSchema = z.object({
  totalRequests: z.number(),
  pendingRequests: z.number(),
  approvedRequests: z.number(),
  rejectedRequests: z.number(),
  cancelledRequests: z.number(),
  resolvedRequests: z.number(),
  requestsGrowth: z.number(),
  requestsByType: z.array(z.object({ type: z.string(), count: z.number() })),
  requestsByStatus: z.array(z.object({ status: z.string(), count: z.number() })),
  monthlyRequests: z.array(z.object({ month: z.string(), requests: z.number() })),
  recentRequests: z.array(z.object({
    requestId: z.string(),
    type: z.string(),
    reason: z.string(),
    status: z.string(),
    senderName: z.string(),
    createdAt: z.date().or(z.string()),
  })),
});

export type RequestDashboard = z.infer<typeof requestDashboardSchema>;
