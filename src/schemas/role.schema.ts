import { z } from "zod";

export const roleSchema = z.object({
  roleId: z.string().uuid(),
  roleName: z.string(),
});

export type Role = z.infer<typeof roleSchema>;

export const roleInputSchema = z.object({
  roleName: z.string().min(1, "Tên vai trò không được để trống"),
});

export type RoleInput = z.infer<typeof roleInputSchema>;

