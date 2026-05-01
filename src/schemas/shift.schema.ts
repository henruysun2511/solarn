import { SortOrder, StudyShiftSortBy } from "@/constants/sort";
import { z } from "zod";

export const shiftSchema = z.object({
  shiftId: z.string().uuid().optional(),
  shiftCode: z.string().min(1, "Mã ca học là bắt buộc").max(50),
  shiftName: z.string().min(1, "Tên ca học là bắt buộc").max(255),
  timeRange: z.string().min(1, "Khoảng thời gian là bắt buộc").max(50),
});

export type StudyShift = z.infer<typeof shiftSchema>;

export const shiftParamsSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  search: z.string().optional(),
  timeRange: z.string().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.enum([
    StudyShiftSortBy.SHIFT_CODE,
    StudyShiftSortBy.SHIFT_NAME,
    StudyShiftSortBy.TIME_RANGE,
  ]).optional().default(StudyShiftSortBy.SHIFT_CODE),
});

export type StudyShiftParams = z.infer<typeof shiftParamsSchema>;

export const shiftInputSchema = shiftSchema.omit({
  shiftId: true,
});

export type StudyShiftInput = z.infer<typeof shiftInputSchema>;
