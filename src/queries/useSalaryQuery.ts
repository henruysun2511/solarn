import { 
  CalculateSalaryInput, 
  SalaryParams 
} from "@/schemas/salary.schema";
import salaryService from "@/services/salary.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const SALARY_QUERY_KEY = ["salaries"];

export const useGetSalaries = (params?: SalaryParams) => {
  return useQuery({
    queryKey: [...SALARY_QUERY_KEY, params],
    queryFn: () => salaryService.getSalaries(params).then((res) => res.data),
  });
};

export const usePreviewSalary = () => {
  return useMutation({
    mutationFn: (data: CalculateSalaryInput) => salaryService.previewSalary(data),
  });
};

export const useSaveSalary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CalculateSalaryInput) => salaryService.saveSalary(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SALARY_QUERY_KEY });
    },
  });
};
