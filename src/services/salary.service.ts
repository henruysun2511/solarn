import { ApiResponse } from "@/constants/apiResponse";
import {
  Salary,
  CalculateSalaryInput,
  SalaryParams,
  MySalaryParams
} from "@/schemas/salary.schema";
import http from "@/utils/http";

const prefix = "/salaries";

const salaryService = {
  getSalaries: (params?: SalaryParams) => {
    return http.get<ApiResponse<Salary[]>>(prefix, { params });
  },

  getAllSalariesForExport: (params?: Omit<SalaryParams, "page" | "limit">) => {
    return http.get<ApiResponse<Salary[]>>(prefix, {
      params: { ...params, page: 1, limit: 100 },
    });
  },

  getMySalaries: (params?: MySalaryParams) => {
    return http.get<ApiResponse<Salary[]>>(`${prefix}/my-salaries`, { params });
  },

  previewSalary: (data: CalculateSalaryInput) => {
    return http.post<ApiResponse<any>>(`${prefix}/preview`, data);
  },

  saveSalary: (data: CalculateSalaryInput) => {
    return http.post<ApiResponse<any>>(`${prefix}/save`, data);
  },

  getSalaryById: (id: string) => {
    return http.get<ApiResponse<Salary>>(`${prefix}/${id}`);
  },
};

export default salaryService;
