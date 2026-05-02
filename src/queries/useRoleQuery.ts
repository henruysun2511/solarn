import roleService from "@/services/role.service";
import { useQuery } from "@tanstack/react-query";

export const ROLE_QUERY_KEY = ["roles"];

export const useGetRoles = () => {
  return useQuery({
    queryKey: ROLE_QUERY_KEY,
    queryFn: () => roleService.getRoles().then((res) => res.data),
  });
};
