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

  getMySalaryComplaints: (params?: SalaryComplaintParams) => {
    return http.get<ApiResponse<Request[]>>(`${prefix}/my-salary-complaints`, { params });
  },

  getMyLeaveRequests: (params?: LeaveRequestParams) => {
    return http.get<ApiResponse<Request[]>>(`${prefix}/my-leave-requests`, { params });
  },

  getMyScheduleChanges: (params?: ScheduleChangeParams) => {
    return http.get<ApiResponse<Request[]>>(`${prefix}/my-schedule-changes`, { params });
  },

  getMyTransferRequests: (params?: TransferRequestParams) => {
    return http.get<ApiResponse<Request[]>>(`${prefix}/my-transfer-requests`, { params });
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

  processLeaveRequest: (requestId: string, data: { isSuccess: boolean; approvalNote?: string }) => {
    return http.patch<ApiResponse<any>>(`${prefix}/leave-request/${requestId}/process`, data);
  },

  processTransferRequest: (requestId: string, data: { isSuccess: boolean; approvalNote?: string }) => {
    return http.patch<ApiResponse<any>>(`${prefix}/transfer/${requestId}/process`, data);
  },

  processScheduleChangeRequest: (requestId: string, data: { isSuccess: boolean; approvalNote?: string }) => {
    return http.patch<ApiResponse<any>>(`${prefix}/schedule-change/${requestId}/process`, data);
  },

  processSalaryComplaintRequest: (requestId: string, data: { isSuccess: boolean; approvalNote?: string }) => {
    return http.patch<ApiResponse<any>>(`${prefix}/salary-complaint/${requestId}/process`, data);
  },
};

export default requestService;
