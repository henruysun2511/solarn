import { AccountInput, AccountParams } from "@/schemas/account.schema";
import accountService from "@/services/account.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AccountStatus } from "@/constants/status";

export const ACCOUNT_QUERY_KEY = ["accounts"];

export const useGetAccounts = (params?: AccountParams) => {
  return useQuery({
    queryKey: [...ACCOUNT_QUERY_KEY, params],
    queryFn: () => accountService.getAccounts(params).then((res) => res.data),
  });
};

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AccountInput) => accountService.createAccount(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ACCOUNT_QUERY_KEY }),
  });
};

export const useChangeAccountStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: AccountStatus }) =>
      accountService.changeStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ACCOUNT_QUERY_KEY }),
  });
};
