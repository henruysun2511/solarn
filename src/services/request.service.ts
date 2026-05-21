import { ApiResponse } from "@/constants/apiResponse";
import {
  LeaveRequestInput,
  Request,
  RequestParams,
  RequestClassParams,
  SalaryComplaintInput,
  ScheduleChangeInput,
  TransferRequestInput,
  SalaryComplaintParams,
  TransferRequestParams,
  LeaveRequestParams,
  ScheduleChangeParams
} from "@/schemas/request.schema";
// Assuming types are named correctly based on schemas
import http from "@/utils/http";

const prefix = "/requests";

const requestService = {
  getRequests: (params?: RequestParams) => {
    return http.get<ApiResponse<Request[]>>(prefix, { params });
  },

  getRequestsByClass: (classId: string, params?: RequestClassParams) => {
    return http.get<ApiResponse<Request[]>>(`${prefix}/class/${classId}`, { params });
  },

  createSalaryComplaint: (data: SalaryComplaintInput) => {
    return http.post<ApiResponse<Request>>(`${prefix}/salary-complaint`, data);
  },

  createTransferRequest: (data: TransferRequestInput) => {
    return http.post<ApiResponse<Request>>(`${prefix}/transfer`, data);
  },

  createLeaveRequest: (data: LeaveRequestInput) => {
    return http.post<ApiResponse<Request>>(`${prefix}/leave-request`, data);
  },

  createScheduleChangeRequest: (data: ScheduleChangeInput) => {
    return http.post<ApiResponse<Request>>(`${prefix}/schedule-change`, data);
  },

  getSalaryComplaints: (params?: SalaryComplaintParams) => {
    return http.get<ApiResponse<Request[]>>(`${prefix}/salary-complaint`, { params });
  },

  getTransferRequests: (params?: TransferRequestParams) => {
    return http.get<ApiResponse<Request[]>>(`${prefix}/transfer`, { params });
  },

  getLeaveRequests: (params?: LeaveRequestParams) => {
    return http.get<ApiResponse<Request[]>>(`${prefix}/leave-request`, { params });
  },

  getScheduleChanges: (params?: ScheduleChangeParams) => {
    return http.get<ApiResponse<Request[]>>(`${prefix}/schedule-change`, { params });
  },

  getRequestById: (id: string) => {
    return http.get<ApiResponse<Request>>(`${prefix}/${id}`);
  },

  deleteRequest: (id: string) => {
    return http.delete<ApiResponse<any>>(`${prefix}/${id}`);
  },
};

export default requestService;
