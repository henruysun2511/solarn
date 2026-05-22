import {
  ClassInput,
  ClassParams,
  AddStudentToClassInput
} from "@/schemas/class.schema";
import classService from "@/services/class.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { STUDENT_QUERY_KEY } from "./useStudentQuery";

export const CLASS_QUERY_KEY = ["classes"];

export const useGetClasses = (params?: ClassParams) => {
  return useQuery({
    queryKey: [...CLASS_QUERY_KEY, params],
    queryFn: () => classService.getClasses(params).then((res) => res.data),
  });
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ClassInput) => classService.createClass(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLASS_QUERY_KEY });
    },
  });
};

export const useUpdateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ClassInput> }) =>
      classService.updateClass(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLASS_QUERY_KEY });
    },
  });
};

export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => classService.deleteClass(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLASS_QUERY_KEY });
    },
  });
};

export const useAddStudentToClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ classId, data }: { classId: string; data: AddStudentToClassInput }) =>
      classService.addStudentToClass(classId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLASS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: STUDENT_QUERY_KEY });
    },
  });
};

export const useGetClassesByCourseId = (courseId: string, params?: ClassParams) => {
  return useQuery({
    queryKey: [...CLASS_QUERY_KEY, "course", courseId, params],
    queryFn: () => classService.getClassesByCourseId(courseId, params).then((res) => res.data),
    enabled: !!courseId,
  });
};

export const useGetClassById = (id: string) => {
  return useQuery({
    queryKey: [...CLASS_QUERY_KEY, id],
    queryFn: () => classService.getClassById(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useGetMyClasses = (params?: ClassParams) => {
  return useQuery({
    queryKey: [...CLASS_QUERY_KEY, "my-classes", params],
    queryFn: () => classService.getMyClasses(params).then((res) => res.data),
  });
};

export const useGetMyEnrolledClasses = (params?: ClassParams) => {
  return useQuery({
    queryKey: [...CLASS_QUERY_KEY, "my-enrolled-classes", params],
    queryFn: () => classService.getMyEnrolledClasses(params).then((res) => res.data),
  });
};
