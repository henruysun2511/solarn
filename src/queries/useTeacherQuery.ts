import { TeacherParams, UpdateTeacherProfileInput } from "@/schemas/teacher.schema";
import teacherService from "@/services/teacher.service";
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";

export const TEACHER_QUERY_KEY = ["teachers"];

export const useGetTeachers = (
  params?: TeacherParams,
  options?: Omit<UseQueryOptions<any, Error, any, any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: [...TEACHER_QUERY_KEY, params],
    queryFn: () => teacherService.getTeachers(params).then((res) => res.data),
    ...options,
  });
};

export const MY_PROFILE_QUERY_KEY = ["my-profile"];

export const useGetMyProfile = (
  options?: Omit<UseQueryOptions<any, Error, any, any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: MY_PROFILE_QUERY_KEY,
    queryFn: () => teacherService.getMyProfile().then((res) => res.data),
    ...options,
  });
};

export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateTeacherProfileInput) =>
      teacherService.updateMyProfile(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MY_PROFILE_QUERY_KEY });
    },
  });
};
