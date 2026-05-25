import z from "zod";

export const notificationSchema = z.object({
  notificationId: z.string(),
  accountId: z.string(),
  title: z.string(),
  content: z.string(),
  type: z.string(),
  metadata: z.any().nullable(),
  createdAt: z.string(),
});

export type Notification = z.infer<typeof notificationSchema>;
