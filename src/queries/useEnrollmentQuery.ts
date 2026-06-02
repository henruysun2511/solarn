import { 
  EnrollmentInput, 
  EnrollmentParams 
} from "@/schemas/enrollment.schema";
import enrollmentService from "@/services/enrollment.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ENROLLMENT_QUERY_KEY = ["enrollments"];

export const useGetEnrollments = (params?: EnrollmentParams) => {
  return useQuery({
    queryKey: [...ENROLLMENT_QUERY_KEY, params],
    queryFn: () => enrollmentService.getEnrollments(params).then((res) => res.data),
  });
};

export const MY_ENROLLMENT_QUERY_KEY = ["my-enrollments"];

export const useGetMyEnrollments = () => {
  return useQuery({
    queryKey: MY_ENROLLMENT_QUERY_KEY,
    queryFn: () => enrollmentService.getMyEnrollments().then((res) => res.data),
  });
};

export const useCreateEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EnrollmentInput) => enrollmentService.createEnrollment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ENROLLMENT_QUERY_KEY });
    },
  });
};

export const useUpdateEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EnrollmentInput> }) => 
      enrollmentService.updateEnrollment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ENROLLMENT_QUERY_KEY });
    },
  });
};

export const useDeleteEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => enrollmentService.deleteEnrollment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ENROLLMENT_QUERY_KEY });
    },
  });
};
