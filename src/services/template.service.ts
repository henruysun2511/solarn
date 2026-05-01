import { ApiResponse } from "@/constants/apiResponse";
import { ClassScheduleTemplate, ClassScheduleTemplateInput, ClassScheduleTemplateParams } from "@/schemas/template.schema";
import http from "@/utils/http";

const prefix = "/schedule-templates";

const templateService = {
  getTemplates: (params?: ClassScheduleTemplateParams) => {
    return http.get<ApiResponse<ClassScheduleTemplate[]>>(prefix, { params });
  },

  createTemplate: (data: ClassScheduleTemplateInput) => {
    return http.post<ApiResponse<ClassScheduleTemplate>>(prefix, data);
  },

  updateTemplate: (id: string, data: Partial<ClassScheduleTemplateInput>) => {
    return http.put<ApiResponse<ClassScheduleTemplate>>(`${prefix}/${id}`, data);
  },

  deleteTemplate: (id: string) => {
    return http.delete<ApiResponse<null>>(`${prefix}/${id}`);
  },
};

export default templateService;
