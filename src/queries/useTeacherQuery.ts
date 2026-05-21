import teacherService from "@/services/teacher.service";
import { useQuery } from "@tanstack/react-query";

export const TEACHER_QUERY_KEY = ["teachers"];

export const useGetTeachers = () => {
  return useQuery({
    queryKey: TEACHER_QUERY_KEY,
    queryFn: () => teacherService.getTeachers().then((res) => res.data),
  });
};
