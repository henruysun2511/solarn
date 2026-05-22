import { ApiResponse } from "@/constants/apiResponse";
import { 
  Feedback, 
  FeedbackInput, 
  FeedbackParams,
  FeedbackClassParams,
  MyFeedbackParams
} from "@/schemas/feedback.schema";
import http from "@/utils/http";

const prefix = "/feedback";

const feedbackService = {
  getFeedbacks: (params?: FeedbackParams) => {
    return http.get<ApiResponse<Feedback[]>>(prefix, { params });
  },
  
  getFeedbacksByClass: (classId: string, params?: FeedbackClassParams) => {
    return http.get<ApiResponse<Feedback[]>>(`${prefix}/class/${classId}`, { params });
  },

  getMyFeedbacks: (params?: MyFeedbackParams) => {
    return http.get<ApiResponse<Feedback[]>>(`${prefix}/teacher/my-feedbacks`, { params });
  },

  getMyStudentFeedbacks: (params?: MyFeedbackParams) => {
    return http.get<ApiResponse<Feedback[]>>(`${prefix}/my`, { params });
  },

  createFeedback: (data: FeedbackInput) => {
    return http.post<ApiResponse<Feedback>>(prefix, data);
  },

  deleteFeedback: (id: string) => {
    return http.delete<ApiResponse<any>>(`${prefix}/${id}`);
  },

  updateIsFeatured: (feedbackId: string, isFeatured: boolean) => {
    return http.patch<ApiResponse<any>>(`${prefix}/${feedbackId}/featured`, { isFeatured });
  },

  getFeaturedFeedbacks: () => {
    return http.get<ApiResponse<any>>(`${prefix}/featured`);
  },
};

export default feedbackService;
