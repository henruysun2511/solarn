import { BranchSortBy, SortOrder } from "@/constants/sort";
import { z } from "zod";

export const branchSchema = z.object({
  branchId: z.string().uuid().optional(),
  branchCode: z.string().min(1, "Mã chi nhánh là bắt buộc").max(50),
  branchName: z.string().min(1, "Tên chi nhánh là bắt buộc").max(255),
  address: z.string().min(1, "Địa chỉ là bắt buộc"),
  phone: z.string().max(20).optional().nullable(),
  isActive: z.boolean(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Branch = z.infer<typeof branchSchema>;

export const branchParamsSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  search: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.enum([BranchSortBy.BRANCH_CODE, BranchSortBy.BRANCH_NAME, BranchSortBy.CREATED_AT]).optional().default(BranchSortBy.CREATED_AT),
});

export type BranchParams = z.infer<typeof branchParamsSchema>;

export const branchInputSchema = branchSchema.omit({
  branchId: true,
  createdAt: true,
  updatedAt: true,
});

export type BranchInput = z.infer<typeof branchInputSchema>;
