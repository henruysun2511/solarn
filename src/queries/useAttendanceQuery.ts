import { 
  AttendanceParams, 
  BulkUpsertAttendanceInput 
} from "@/schemas/attendance.schema";
import attendanceService from "@/services/attendance.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ATTENDANCE_QUERY_KEY = ["attendances"];

export const useGetAttendances = (params?: AttendanceParams) => {
  return useQuery({
    queryKey: [...ATTENDANCE_QUERY_KEY, params],
    queryFn: () => attendanceService.getAttendances(params).then((res) => res.data),
  });
};

export const useBulkUpsertAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BulkUpsertAttendanceInput) => 
      attendanceService.upsertBulk(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEY });
    },
  });
};

export const useDeleteAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => attendanceService.deleteAttendance(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEY });
    },
  });
};
