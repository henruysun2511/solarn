import { RequestType, RequestStatus } from "@/constants/type";
import { SortOrder, RequestClassSortBy } from "@/constants/sort";
import z from "zod";

const classRefSchema = z.object({
  classId: z.string().uuid(),
  roomCode: z.string(),
  course: z.object({ courseName: z.string() }).optional(),
});

export const requestSchema = z.object({
  requestId: z.string().uuid().optional(),
  type: z.nativeEnum(RequestType),
  senderAccountId: z.string().uuid(),
  reason: z.string(),
  status: z.nativeEnum(RequestStatus),
  approverAccountId: z.string().uuid().optional().nullable(),
  approvalNote: z.string().optional().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),

  // Specific fields
  sessionId: z.string().uuid().optional().nullable(),
  proposedShiftCode: z.string().optional().nullable(),
  proposedStudyDate: z.string().optional().nullable(),
  salaryId: z.string().uuid().optional().nullable(),
  proposedAmount: z.number().optional().nullable(),
  enrollmentId: z.string().uuid().optional().nullable(),
  leaveStartDate: z.string().optional().nullable(),
  leaveEndDate: z.string().optional().nullable(),
  fromClassId: z.string().uuid().optional().nullable(),
  toClassId: z.string().uuid().optional().nullable(),
  fromClass: classRefSchema.optional().nullable(),
  toClass: classRefSchema.optional().nullable(),
  progressAtRequest: z.string().optional().nullable(),
  leaveStatus: z.string().optional().nullable(),
  enrollment: z.object({
    enrollmentId: z.string().uuid(),
    status: z.string(),
    class: classRefSchema,
  }).optional().nullable(),
});
export type Request = z.infer<typeof requestSchema>;

export const requestParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  type: z.nativeEnum(RequestType).optional(),
  status: z.nativeEnum(RequestStatus).optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("createdAt"),
});
export type RequestParams = z.infer<typeof requestParamsSchema>;

export const requestClassParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.enum([RequestClassSortBy.CREATED_AT, RequestClassSortBy.STATUS]).optional().default(RequestClassSortBy.CREATED_AT),
});
export type RequestClassParams = z.infer<typeof requestClassParamsSchema>;

export const salaryComplaintSchema = z.object({
  salaryId: z.string().uuid(),
  proposedAmount: z.coerce.number().min(0),
  reason: z.string().min(1),
});
export type SalaryComplaintInput = z.infer<typeof salaryComplaintSchema>;

export const transferRequestSchema = z.object({
  fromClassId: z.string().uuid(),
  toClassId: z.string().uuid(),
  reason: z.string().min(1),
});
export type TransferRequestInput = z.infer<typeof transferRequestSchema>;

export const leaveRequestSchema = z.object({
  enrollmentId: z.string().uuid(),
  leaveStartDate: z.string(),
  leaveEndDate: z.string(),
  reason: z.string().min(1),
});
export type LeaveRequestInput = z.infer<typeof leaveRequestSchema>;

export const scheduleChangeSchema = z.object({
  sessionId: z.string().uuid(),
  proposedShiftCode: z.string(),
  proposedStudyDate: z.string(),
  reason: z.string().min(1),
});
export type ScheduleChangeInput = z.infer<typeof scheduleChangeSchema>;

// Search Params Schemas
export const salaryComplaintParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  status: z.nativeEnum(RequestStatus).optional(),
  senderAccountId: z.string().uuid().optional(),
  salaryId: z.string().uuid().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("createdAt"),
});
export type SalaryComplaintParams = z.infer<typeof salaryComplaintParamsSchema>;

export const transferRequestParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  status: z.nativeEnum(RequestStatus).optional(),
  senderAccountId: z.string().uuid().optional(),
  fromClassId: z.string().uuid().optional(),
  toClassId: z.string().uuid().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("createdAt"),
});
export type TransferRequestParams = z.input<typeof transferRequestParamsSchema>;

export const leaveRequestParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  status: z.nativeEnum(RequestStatus).optional(),
  senderAccountId: z.string().uuid().optional(),
  enrollmentId: z.string().uuid().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("createdAt"),
});
export type LeaveRequestParams = z.infer<typeof leaveRequestParamsSchema>;

export const scheduleChangeParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  status: z.nativeEnum(RequestStatus).optional(),
  senderAccountId: z.string().uuid().optional(),
  sessionId: z.string().uuid().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("createdAt"),
});
export type ScheduleChangeParams = z.infer<typeof scheduleChangeParamsSchema>;

