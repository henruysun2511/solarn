import { RoleInput } from "@/schemas/role.schema";
import roleService from "@/services/role.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ROLE_QUERY_KEY = ["roles"];

export const useGetRoles = () => {
  return useQuery({
    queryKey: ROLE_QUERY_KEY,
    queryFn: () => roleService.getRoles().then((res) => res.data),
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RoleInput) => roleService.createRole(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEY }),
  });
};
