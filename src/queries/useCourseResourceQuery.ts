import { 
  CourseResourceInput, 
  CourseResourceParams 
} from "@/schemas/course-resource.schema";
import courseResourceService from "@/services/course-resource.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const COURSE_RESOURCE_QUERY_KEY = ["course-resources"];

export const useGetCourseResources = (params?: CourseResourceParams) => {
  return useQuery({
    queryKey: [...COURSE_RESOURCE_QUERY_KEY, params],
    queryFn: () => courseResourceService.getCourseResources(params).then((res) => res.data),
  });
};

export const useCreateCourseResource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CourseResourceInput) => courseResourceService.createCourseResource(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_RESOURCE_QUERY_KEY });
    },
  });
};

export const useUpdateCourseResource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CourseResourceInput> }) => 
      courseResourceService.updateCourseResource(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_RESOURCE_QUERY_KEY });
    },
  });
};

export const useDeleteCourseResource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => courseResourceService.deleteCourseResource(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_RESOURCE_QUERY_KEY });
    },
  });
};
