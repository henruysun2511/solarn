import { RoomInput, RoomParams } from "@/schemas/room.schema";
import roomService from "@/services/room.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ROOM_QUERY_KEY = ["rooms"];

export const useGetRooms = (params?: RoomParams) => {
  return useQuery({
    queryKey: [...ROOM_QUERY_KEY, params],
    queryFn: () => roomService.getRooms(params).then((res) => res.data),
  });
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RoomInput) => roomService.createRoom(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ROOM_QUERY_KEY }),
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RoomInput> }) =>
      roomService.updateRoom(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ROOM_QUERY_KEY }),
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => roomService.deleteRoom(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ROOM_QUERY_KEY }),
  });
};
