import { ApiResponse } from "@/constants/apiResponse";
import { Setting, SettingInput } from "@/schemas/setting.schema";
import http from "@/utils/http";

const prefix = "/settings";

const settingService = {
  getSetting: () => {
    return http.get<ApiResponse<Setting>>(prefix);
  },

  updateSetting: (data: SettingInput) => {
    return http.put<ApiResponse<Setting>>(prefix, data);
  },
};

export default settingService;
