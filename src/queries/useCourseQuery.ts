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

export const MY_STUDENT_PROGRESS_QUERY_KEY = ["my-student-progress"];
export const TEACHER_PROGRESS_QUERY_KEY = ["teacher-progress"];
export const STUDENT_PROGRESS_LIST_QUERY_KEY = ["student-progress-list"];

export const useGetMyStudentProgress = () => {
  return useQuery({
    queryKey: MY_STUDENT_PROGRESS_QUERY_KEY,
    queryFn: () => courseService.getMyStudentProgress().then((res) => res.data),
  });
};

export const useGetTeacherProgress = (params?: { classId?: string }) => {
  return useQuery({
    queryKey: [...TEACHER_PROGRESS_QUERY_KEY, params],
    queryFn: () => courseService.getTeacherProgress(params).then((res) => res.data),
  });
};

export const useGetStudentProgressList = (courseId: string) => {
  return useQuery({
    queryKey: [...STUDENT_PROGRESS_LIST_QUERY_KEY, courseId],
    queryFn: () => courseService.getStudentProgressList(courseId).then((res) => res.data.data),
    enabled: !!courseId,
  });
};
