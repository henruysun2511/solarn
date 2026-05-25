import notificationService from "@/services/notification.service";
import { useQuery } from "@tanstack/react-query";

export const NOTIFICATION_QUERY_KEY = ["notifications"];

export const useGetMyNotifications = () => {
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEY,
    queryFn: () => notificationService.getMyNotifications().then((res) => res.data),
    refetchInterval: 30000,
  });
};
