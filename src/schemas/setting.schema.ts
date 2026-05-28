import { z } from "zod";

export const settingSchema = z.object({
  settingId: z.string().uuid().optional(),
  siteName: z.string().min(1, "Tên trang web là bắt buộc").max(255),
  logoUrl: z.string().nullable().optional(),
  hotline: z.string().max(20).nullable().optional(),
  email: z.string().max(255).nullable().optional(),
  address: z.string().nullable().optional(),
  metaTitle: z.string().max(255).nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Setting = z.infer<typeof settingSchema>;

export const settingInputSchema = settingSchema.omit({
  settingId: true,
  createdAt: true,
  updatedAt: true,
});

export type SettingInput = z.infer<typeof settingInputSchema>;
