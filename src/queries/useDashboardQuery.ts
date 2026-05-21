import dashboardService from "@/services/dashboard.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const DASHBOARD_QUERY_KEY = ["teacher-dashboard"];

export const useGetTeacherDashboard = (
  options?: Omit<UseQueryOptions<any, Error, any, any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: () => dashboardService.getTeacherDashboard().then((res) => res.data),
    ...options,
  });
};
