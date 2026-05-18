import { ApiResponse } from "@/constants/apiResponse";
import { 
  CourseResource, 
  CourseResourceInput, 
  CourseResourceParams 
} from "@/schemas/course-resource.schema";
import http from "@/utils/http";

const prefix = "/course-resources";

const courseResourceService = {
  getCourseResources: (params?: CourseResourceParams) => {
    return http.get<ApiResponse<CourseResource[]>>(prefix, { params });
  },
  
  createCourseResource: (data: CourseResourceInput) => {
    return http.post<ApiResponse<CourseResource>>(prefix, data);
  },

  updateCourseResource: (id: string, data: Partial<CourseResourceInput>) => {
    return http.put<ApiResponse<CourseResource>>(`${prefix}/${id}`, data);
  },

  deleteCourseResource: (id: string) => {
    return http.delete<ApiResponse<any>>(`${prefix}/${id}`);
  },
};

export default courseResourceService;
