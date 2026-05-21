import { ScheduleTemplateSortBy, SortOrder } from "@/constants/sort";
import { z } from "zod";
import { shiftSchema } from "./shift.schema";

export const templateSchema = z.object({
  templateId: z.string().uuid(),
  templateName: z.string().min(1, "Tên lịch mẫu là bắt buộc").max(255),
  weekdays: z.string()
    .min(1, "Các thứ trong tuần là bắt buộc")
    .max(20)
    .regex(/^[2-8](?:(?:\s*,\s*|\s*-\s*)[2-8])*$/, "Định dạng không hợp lệ (VD: 2,4,6 hoặc 2-5)"),
  shiftCode: z.string().min(1, "Mã ca học là bắt buộc").max(50),
  shift: shiftSchema.pick({ shiftName: true, timeRange: true }).optional(),
});

export type ClassScheduleTemplate = z.infer<typeof templateSchema>;

export const templateParamsSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  search: z.string().optional(),
  shiftCode: z.string().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.enum([
    ScheduleTemplateSortBy.TEMPLATE_NAME,
    ScheduleTemplateSortBy.SHIFT_CODE,
  ]).optional().default(ScheduleTemplateSortBy.TEMPLATE_NAME),
});

export type ClassScheduleTemplateParams = z.input<typeof templateParamsSchema>;

export const templateInputSchema = templateSchema.omit({
  templateId: true,
  shift: true,
});

export type ClassScheduleTemplateInput = z.infer<typeof templateInputSchema>;
