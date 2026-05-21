import { StudentParams } from "@/schemas/student.schema";
import studentService from "@/services/student.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

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
