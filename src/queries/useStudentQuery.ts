import { StudentParams, UpdateStudentProfileInput } from "@/schemas/student.schema";
import studentService from "@/services/student.service";
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";

export const STUDENT_QUERY_KEY = ["students"];

export const useGetStudents = (
  params?: StudentParams,
  options?: Omit<UseQueryOptions<any, Error, any, any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: [...STUDENT_QUERY_KEY, params],
    queryFn: () => studentService.getStudents(params).then((res) => res.data),
    ...options,
  });
};

export const useGetStudentsByClass = (classId: string, params?: StudentParams) => {
  return useQuery({
    queryKey: [...STUDENT_QUERY_KEY, "class", classId, params],
    queryFn: () => studentService.getStudentsByClass(classId, params).then((res) => res.data),
    enabled: !!classId,
  });
};

export const MY_STUDENT_PROFILE_QUERY_KEY = ["my-student-profile"];

export const useGetMyStudentProfile = (
  options?: Omit<UseQueryOptions<any, Error, any, any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: MY_STUDENT_PROFILE_QUERY_KEY,
    queryFn: () => studentService.getMyProfile().then((res) => res.data),
    ...options,
  });
};

export const useUpdateMyStudentProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateStudentProfileInput) =>
      studentService.updateMyProfile(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MY_STUDENT_PROFILE_QUERY_KEY });
    },
  });
};    
