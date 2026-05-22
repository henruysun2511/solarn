import { InvoiceStatus } from "@/constants/type";
import { SortOrder } from "@/constants/sort";
import z from "zod";

export const invoiceSchema = z.object({
  invoiceId: z.string().uuid().optional(),
  studentId: z.string().uuid(),
  classId: z.string().uuid(),
  amount: z.string(), // Decimal as string
  status: z.nativeEnum(InvoiceStatus),
  transactionId: z.string(),
  createdAt: z.string().optional(),
  class: z.object({
    roomCode: z.string(),
    course: z.object({
      courseName: z.string(),
    }),
  }).optional(),
});
export type Invoice = z.infer<typeof invoiceSchema>;

export const invoiceParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  studentId: z.string().uuid().optional(),
  classId: z.string().uuid().optional(),
  status: z.nativeEnum(InvoiceStatus).optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("createdAt"),
});
export type InvoiceParams = z.infer<typeof invoiceParamsSchema>;

export const myInvoiceParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  classId: z.string().uuid().optional(),
  status: z.nativeEnum(InvoiceStatus).optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("createdAt"),
});
export type MyInvoiceParams = z.infer<typeof myInvoiceParamsSchema>;

export const invoiceInputSchema = z.object({
  classId: z.string().uuid(),
});
export type InvoiceInput = z.infer<typeof invoiceInputSchema>;
