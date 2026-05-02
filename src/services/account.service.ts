import { ApiResponse } from "@/constants/apiResponse";
import { AccountStatus } from "@/constants/status";
import { Account, AccountInput, AccountParams } from "@/schemas/account.schema";
import http from "@/utils/http";

const prefix = "/accounts";

const accountService = {
  getAccounts: (params?: AccountParams) => {
    return http.get<ApiResponse<Account[]>>(prefix, { params });
  },

  createAccount: (data: AccountInput) => {
    return http.post<ApiResponse<Account>>(prefix, data);
  },

  changeStatus: (accountId: string, status: AccountStatus) => {
    return http.patch<ApiResponse<Account>>(`${prefix}/${accountId}/status`, { status });
  },
};

export default accountService;
