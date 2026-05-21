import { ApiResponse } from "@/constants/apiResponse";
import { Course, CourseInput, CourseParams } from "@/schemas/course.schema";
import http from "@/utils/http";

const prefix = "/courses";

const courseService = {
  getCourses: (params?: CourseParams) => {
    return http.get<ApiResponse<Course[]>>(prefix, { params });
  },

  createCourse: (data: CourseInput) => {
    return http.post<ApiResponse<Course>>(prefix, data);
  },

  updateCourse: (id: string, data: CourseInput) => {
    return http.put<ApiResponse<Course>>(`${prefix}/${id}`, data);
  },

  deleteCourse: (id: string) => {
    return http.delete<ApiResponse<any>>(`${prefix}/${id}`);
  },

  getCourseById: (id: string) => {
    return http.get<ApiResponse<Course>>(`${prefix}/${id}`);
  },
};

export default courseService;
