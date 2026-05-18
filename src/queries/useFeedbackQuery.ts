import { 
  FeedbackInput, 
  FeedbackParams 
} from "@/schemas/feedback.schema";
import feedbackService from "@/services/feedback.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const FEEDBACK_QUERY_KEY = ["feedback"];

export const useGetFeedbacks = (params?: FeedbackParams) => {
  return useQuery({
    queryKey: [...FEEDBACK_QUERY_KEY, params],
    queryFn: () => feedbackService.getFeedbacks(params).then((res) => res.data),
  });
};

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FeedbackInput) => feedbackService.createFeedback(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEEDBACK_QUERY_KEY });
    },
  });
};

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => feedbackService.deleteFeedback(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FEEDBACK_QUERY_KEY });
    },
  });
};
