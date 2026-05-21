import { ApiResponse } from "@/constants/apiResponse";
import { 
  Feedback, 
  FeedbackInput, 
  FeedbackParams,
  FeedbackClassParams
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

  createFeedback: (data: FeedbackInput) => {
    return http.post<ApiResponse<Feedback>>(prefix, data);
  },

  deleteFeedback: (id: string) => {
    return http.delete<ApiResponse<any>>(`${prefix}/${id}`);
  },
};

export default feedbackService;
