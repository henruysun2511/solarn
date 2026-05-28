import { SettingInput } from "@/schemas/setting.schema";
import settingService from "@/services/setting.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const SETTING_QUERY_KEY = ["settings"];

export const useGetSetting = () => {
  return useQuery({
    queryKey: SETTING_QUERY_KEY,
    queryFn: () => settingService.getSetting().then((res) => res.data),
  });
};

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SettingInput) => settingService.updateSetting(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SETTING_QUERY_KEY }),
  });
};
