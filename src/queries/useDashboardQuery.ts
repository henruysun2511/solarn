import dashboardService from "@/services/dashboard.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const TEACHER_DASHBOARD_QUERY_KEY = ["teacher-dashboard"];
export const STUDENT_DASHBOARD_QUERY_KEY = ["student-dashboard"];
export const ADMIN_DASHBOARD_QUERY_KEY = ["admin-dashboard"];
export const FINANCE_DASHBOARD_QUERY_KEY = ["finance-dashboard"];
export const TRAINING_DASHBOARD_QUERY_KEY = ["training-dashboard"];
export const REQUEST_DASHBOARD_QUERY_KEY = ["request-dashboard"];

export const useGetTeacherDashboard = (
  options?: Omit<UseQueryOptions<any, Error, any, any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: TEACHER_DASHBOARD_QUERY_KEY,
    queryFn: () => dashboardService.getTeacherDashboard().then((res) => res.data),
    ...options,
  });
};

export const useGetStudentDashboard = (
  options?: Omit<UseQueryOptions<any, Error, any, any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: STUDENT_DASHBOARD_QUERY_KEY,
    queryFn: () => dashboardService.getStudentDashboard().then((res) => res.data),
    ...options,
  });
};

export const useGetAdminDashboard = (
  options?: Omit<UseQueryOptions<any, Error, any, any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ADMIN_DASHBOARD_QUERY_KEY,
    queryFn: () => dashboardService.getAdminDashboard().then((res) => res.data),
    ...options,
  });
};

export const useGetFinanceDashboard = (
  options?: Omit<UseQueryOptions<any, Error, any, any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: FINANCE_DASHBOARD_QUERY_KEY,
    queryFn: () => dashboardService.getFinanceDashboard().then((res) => res.data),
    ...options,
  });
};

export const useGetTrainingDashboard = (
  options?: Omit<UseQueryOptions<any, Error, any, any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: TRAINING_DASHBOARD_QUERY_KEY,
    queryFn: () => dashboardService.getTrainingDashboard().then((res) => res.data),
    ...options,
  });
};

export const useGetRequestDashboard = (
  options?: Omit<UseQueryOptions<any, Error, any, any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: REQUEST_DASHBOARD_QUERY_KEY,
    queryFn: () => dashboardService.getRequestDashboard().then((res) => res.data),
    ...options,
  });
};
