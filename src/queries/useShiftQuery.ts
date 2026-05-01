import { StudyShiftInput, StudyShiftParams } from "@/schemas/shift.schema";
import shiftService from "@/services/shift.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const SHIFT_QUERY_KEY = ["study-shifts"];

export const useGetShifts = (params?: StudyShiftParams) => {
  return useQuery({
    queryKey: [...SHIFT_QUERY_KEY, params],
    queryFn: () => shiftService.getShifts(params).then((res) => res.data),
  });
};

export const useCreateShift = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: StudyShiftInput) => shiftService.createShift(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SHIFT_QUERY_KEY }),
  });
};

export const useUpdateShift = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<StudyShiftInput> }) =>
      shiftService.updateShift(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SHIFT_QUERY_KEY }),
  });
};

export const useDeleteShift = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => shiftService.deleteShift(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SHIFT_QUERY_KEY }),
  });
};
