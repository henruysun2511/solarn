import { RoomSortBy, SortOrder } from "@/constants/sort";
import { z } from "zod";
import { branchSchema } from "./branch.schema";

export const roomSchema = z.object({
  roomId: z.string().uuid().optional(),
  roomCode: z.string().min(1, "Mã phòng là bắt buộc").max(50),
  capacity: z.coerce.number().min(1, "Sức chứa phải ít nhất là 1"),
  branchId: z.string().uuid().optional().nullable(),
  branch: branchSchema.optional().nullable(),
});

export type Room = z.infer<typeof roomSchema>;

export const roomParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  branchId: z.string().uuid().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.enum([RoomSortBy.ROOM_CODE, RoomSortBy.CAPACITY]).optional().default(RoomSortBy.ROOM_CODE),
});

export type RoomParams = z.infer<typeof roomParamsSchema>;

export const roomInputSchema = roomSchema.omit({
  roomId: true,
  branch: true,
});

export type RoomInput = z.input<typeof roomInputSchema>;
