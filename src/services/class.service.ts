import { ApiResponse } from "@/constants/apiResponse";
import { 
  Class, 
  ClassInput, 
  ClassParams, 
  AddStudentToClassInput 
} from "@/schemas/class.schema";
import http from "@/utils/http";

const prefix = "/classes";

const classService = {
  getClasses: (params?: ClassParams) => {
    return http.get<ApiResponse<Class[]>>(prefix, { params });
  },
  
  createClass: (data: ClassInput) => {
    return http.post<ApiResponse<Class>>(prefix, data);
  },

  updateClass: (id: string, data: Partial<ClassInput>) => {
    return http.put<ApiResponse<Class>>(`${prefix}/${id}`, data);
  },

  deleteClass: (id: string) => {
    return http.delete<ApiResponse<any>>(`${prefix}/${id}`);
  },

  addStudentToClass: (classId: string, data: AddStudentToClassInput) => {
    return http.post<ApiResponse<any>>(`${prefix}/${classId}/students`, data);
  },

  getClassById: (id: string) => {
    return http.get<ApiResponse<Class>>(`${prefix}/${id}`);
  },

  getClassesByCourseId: (courseId: string, params?: ClassParams) => {
    return http.get<ApiResponse<Class[]>>(`${prefix}/course/${courseId}`, { params });
  },

  getMyClasses: (params?: ClassParams) => {
    return http.get<ApiResponse<Class[]>>(`${prefix}/my-classes`, { params });
  },
};

export default classService;
