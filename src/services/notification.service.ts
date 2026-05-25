import { ApiResponse } from "@/constants/apiResponse";
import { Notification } from "@/schemas/notification.schema";
import http from "@/utils/http";

const prefix = "/notifications";

const notificationService = {
  getMyNotifications: () => {
    return http.get<ApiResponse<Notification[]>>(prefix);
  },
};

export default notificationService;
