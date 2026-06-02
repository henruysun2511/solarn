import { 
  CreateReEnrollmentRequestInput,
  ProcessReEnrollmentRequestInput,
  ReEnrollmentRequestParams,
  RequestParams,
  RequestClassParams,
  SalaryComplaintInput,
  TransferRequestInput,
  LeaveRequestInput,
  ScheduleChangeInput,
  SalaryComplaintParams,
  TransferRequestParams,
  LeaveRequestParams,
  ScheduleChangeParams
} from "@/schemas/request.schema";
import requestService from "@/services/request.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const REQUEST_QUERY_KEY = ["requests"];

export const useGetRequests = (params?: RequestParams) => {
  return useQuery({
    queryKey: [...REQUEST_QUERY_KEY, params],
    queryFn: () => requestService.getRequests(params).then((res) => res.data),
  });
};

export const useGetRequestsByClass = (classId: string, params?: RequestClassParams) => {
  return useQuery({
    queryKey: [...REQUEST_QUERY_KEY, "class", classId, params],
    queryFn: () => requestService.getRequestsByClass(classId, params).then((res) => res.data),
    enabled: !!classId,
  });
};

export const SALARY_COMPLAINT_QUERY_KEY = ["requests", "salary-complaint"];
export const TRANSFER_REQUEST_QUERY_KEY = ["requests", "transfer"];
export const LEAVE_REQUEST_QUERY_KEY = ["requests", "leave-request"];
export const SCHEDULE_CHANGE_QUERY_KEY = ["requests", "schedule-change"];

export const useGetSalaryComplaints = (params?: SalaryComplaintParams) => {
  return useQuery({
    queryKey: [...SALARY_COMPLAINT_QUERY_KEY, params],
    queryFn: () => requestService.getSalaryComplaints(params).then((res) => res.data),
  });
};

export const MY_SALARY_COMPLAINT_QUERY_KEY = ["requests", "my-salary-complaints"];

export const useGetMySalaryComplaints = (params?: SalaryComplaintParams) => {
  return useQuery({
    queryKey: [...MY_SALARY_COMPLAINT_QUERY_KEY, params],
    queryFn: () => requestService.getMySalaryComplaints(params).then((res) => res.data),
  });
};

export const useGetMyLeaveRequests = (params?: LeaveRequestParams) => {
  return useQuery({
    queryKey: [...REQUEST_QUERY_KEY, "my-leave-requests", params],
    queryFn: () => requestService.getMyLeaveRequests(params).then((res) => res.data),
  });
};

export const useGetMyScheduleChanges = (params?: ScheduleChangeParams) => {
  return useQuery({
    queryKey: [...REQUEST_QUERY_KEY, "my-schedule-changes", params],
    queryFn: () => requestService.getMyScheduleChanges(params).then((res) => res.data),
  });
};

export const useGetMyTransferRequests = (params?: TransferRequestParams) => {
  return useQuery({
    queryKey: [...REQUEST_QUERY_KEY, "my-transfer-requests", params],
    queryFn: () => requestService.getMyTransferRequests(params).then((res) => res.data),
  });
};

export const useGetTransferRequests = (params?: TransferRequestParams) => {
  return useQuery({
    queryKey: [...TRANSFER_REQUEST_QUERY_KEY, params],
    queryFn: () => requestService.getTransferRequests(params).then((res) => res.data),
  });
};

export const useGetLeaveRequests = (params?: LeaveRequestParams) => {
  return useQuery({
    queryKey: [...LEAVE_REQUEST_QUERY_KEY, params],
    queryFn: () => requestService.getLeaveRequests(params).then((res) => res.data),
  });
};

export const useGetScheduleChanges = (params?: ScheduleChangeParams) => {
  return useQuery({
    queryKey: [...SCHEDULE_CHANGE_QUERY_KEY, params],
    queryFn: () => requestService.getScheduleChanges(params).then((res) => res.data),
  });
};

export const useCreateSalaryComplaint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SalaryComplaintInput) => requestService.createSalaryComplaint(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUEST_QUERY_KEY });
    },
  });
};

export const useCreateTransferRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TransferRequestInput) => requestService.createTransferRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUEST_QUERY_KEY });
    },
  });
};

export const useCreateLeaveRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LeaveRequestInput) => requestService.createLeaveRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUEST_QUERY_KEY });
    },
  });
};

export const useCreateScheduleChangeRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ScheduleChangeInput) => requestService.createScheduleChangeRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUEST_QUERY_KEY });
    },
  });
};

export const useDeleteRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => requestService.deleteRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUEST_QUERY_KEY });
    },
  });
};

export const useProcessLeaveRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId, data }: { requestId: string; data: { isSuccess: boolean; approvalNote?: string } }) =>
      requestService.processLeaveRequest(requestId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LEAVE_REQUEST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: REQUEST_QUERY_KEY });
    },
  });
};

export const useProcessTransferRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId, data }: { requestId: string; data: { isSuccess: boolean; approvalNote?: string } }) =>
      requestService.processTransferRequest(requestId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSFER_REQUEST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: REQUEST_QUERY_KEY });
    },
  });
};

export const useProcessScheduleChangeRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId, data }: { requestId: string; data: { isSuccess: boolean; approvalNote?: string } }) =>
      requestService.processScheduleChangeRequest(requestId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHEDULE_CHANGE_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: REQUEST_QUERY_KEY });
    },
  });
};

export const useProcessSalaryComplaintRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId, data }: { requestId: string; data: { isSuccess: boolean; approvalNote?: string } }) =>
      requestService.processSalaryComplaintRequest(requestId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SALARY_COMPLAINT_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: REQUEST_QUERY_KEY });
    },
  });
};

export const RE_ENROLLMENT_QUERY_KEY = ["requests", "re-enrollment"];

export const useGetReEnrollmentRequests = (params?: ReEnrollmentRequestParams) => {
  return useQuery({
    queryKey: [...RE_ENROLLMENT_QUERY_KEY, params],
    queryFn: () => requestService.getReEnrollmentRequests(params).then((res) => res.data),
  });
};

export const useGetMyReEnrollmentRequests = (params?: ReEnrollmentRequestParams) => {
  return useQuery({
    queryKey: [...REQUEST_QUERY_KEY, "my-re-enrollment-requests", params],
    queryFn: () => requestService.getMyReEnrollmentRequests(params).then((res) => res.data),
  });
};

export const useCreateReEnrollmentRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReEnrollmentRequestInput) => requestService.createReEnrollmentRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUEST_QUERY_KEY });
    },
  });
};

export const useProcessReEnrollmentRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId, data }: { requestId: string; data: ProcessReEnrollmentRequestInput }) =>
      requestService.processReEnrollmentRequest(requestId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RE_ENROLLMENT_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: REQUEST_QUERY_KEY });
    },
  });
};
