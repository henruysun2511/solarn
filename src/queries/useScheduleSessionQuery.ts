import { 
  UpdateSessionStatusInput, 
  ScheduleSessionParams 
} from "@/schemas/schedule-session.schema";
import scheduleSessionService from "@/services/schedule-session.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const SCHEDULE_SESSION_QUERY_KEY = ["schedule-sessions"];

export const useGetScheduleSessions = (params?: ScheduleSessionParams) => {
  return useQuery({
    queryKey: [...SCHEDULE_SESSION_QUERY_KEY, params],
    queryFn: () => scheduleSessionService.getScheduleSessions(params).then((res) => res.data),
  });
};

export const useUpdateSessionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSessionStatusInput }) => 
      scheduleSessionService.updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCHEDULE_SESSION_QUERY_KEY });
    },
  });
};

export const useGetScheduleSession = (id: string) => {
  return useQuery({
    queryKey: [...SCHEDULE_SESSION_QUERY_KEY, id],
    queryFn: () => scheduleSessionService.getScheduleSessionById(id).then((res) => res.data),
    enabled: !!id,
  });
};
