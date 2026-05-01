import { ClassScheduleTemplateInput, ClassScheduleTemplateParams } from "@/schemas/template.schema";
import templateService from "@/services/template.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const TEMPLATE_QUERY_KEY = ["schedule-templates"];

export const useGetTemplates = (params?: ClassScheduleTemplateParams) => {
  return useQuery({
    queryKey: [...TEMPLATE_QUERY_KEY, params],
    queryFn: () => templateService.getTemplates(params).then((res) => res.data),
  });
};

export const useCreateTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ClassScheduleTemplateInput) => templateService.createTemplate(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TEMPLATE_QUERY_KEY }),
  });
};

export const useUpdateTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ClassScheduleTemplateInput> }) =>
      templateService.updateTemplate(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TEMPLATE_QUERY_KEY }),
  });
};

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => templateService.deleteTemplate(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TEMPLATE_QUERY_KEY }),
  });
};
