import { ApiResponse } from "@/constants/apiResponse";
import { Room, RoomInput, RoomParams } from "@/schemas/room.schema";
import http from "@/utils/http";

const prefix = "/rooms";

const roomService = {
  getRooms: (params?: RoomParams) => {
    return http.get<ApiResponse<Room[]>>(prefix, { params });
  },

  createRoom: (data: RoomInput) => {
    return http.post<ApiResponse<Room>>(prefix, data);
  },

  updateRoom: (id: string, data: Partial<RoomInput>) => {
    return http.put<ApiResponse<Room>>(`${prefix}/${id}`, data);
  },

  deleteRoom: (id: string) => {
    return http.delete<ApiResponse<null>>(`${prefix}/${id}`);
  },
};

export default roomService;
