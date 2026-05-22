import { 
  AssignmentResultParams, 
  MyAssignmentResultParams,
  BulkUpsertAssignmentResultInput 
} from "@/schemas/assignment-result.schema";
import assignmentResultService from "@/services/assignment-result.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ASSIGNMENT_RESULT_QUERY_KEY = ["assignment-results"];

export const useGetAssignmentResults = (params?: AssignmentResultParams) => {
  return useQuery({
    queryKey: [...ASSIGNMENT_RESULT_QUERY_KEY, params],
    queryFn: () => assignmentResultService.getAssignmentResults(params).then((res) => res.data),
  });
};

export const useGetMyTeacherAssignmentResults = (params?: MyAssignmentResultParams) => {
  return useQuery({
    queryKey: [...ASSIGNMENT_RESULT_QUERY_KEY, "my-teacher", params],
    queryFn: () => assignmentResultService.getMyTeacherAssignmentResults(params).then((res) => res.data),
  });
};

export const useGetMyStudentAssignmentResults = (params?: MyAssignmentResultParams) => {
  return useQuery({
    queryKey: [...ASSIGNMENT_RESULT_QUERY_KEY, "my-student", params],
    queryFn: () => assignmentResultService.getMyStudentAssignmentResults(params).then((res) => res.data),
  });
};

export const useBulkUpsertAssignmentResults = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BulkUpsertAssignmentResultInput) => 
      assignmentResultService.upsertBulk(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_RESULT_QUERY_KEY });
    },
  });
};

export const useDeleteAssignmentResult = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => assignmentResultService.deleteAssignmentResult(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ASSIGNMENT_RESULT_QUERY_KEY });
    },
  });
};
