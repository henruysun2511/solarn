import { CourseInput, CourseParams } from "@/schemas/course.schema";
import courseService from "@/services/course.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const COURSE_QUERY_KEY = ["courses"];

export const useGetCourses = (params?: CourseParams) => {
  return useQuery({
    queryKey: [...COURSE_QUERY_KEY, params],
    queryFn: () => courseService.getCourses(params).then((res) => res.data),
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CourseInput) => courseService.createCourse(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: COURSE_QUERY_KEY }),
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CourseInput }) =>
      courseService.updateCourse(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: COURSE_QUERY_KEY }),
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => courseService.deleteCourse(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: COURSE_QUERY_KEY }),
  });
};

export const useGetCourseById = (id: string) => {
  return useQuery({
    queryKey: [...COURSE_QUERY_KEY, id],
    queryFn: () => courseService.getCourseById(id).then((res) => res.data),
    enabled: !!id,
  });
};
