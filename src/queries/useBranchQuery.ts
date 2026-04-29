import { BranchInput, BranchParams } from "@/schemas/branch.schema";
import branchService from "@/services/branch.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const BRANCH_QUERY_KEY = ["branches"];

export const useGetBranches = (params?: BranchParams) => {
  return useQuery({
    queryKey: [...BRANCH_QUERY_KEY, params],
    queryFn: () => branchService.getBranches(params).then((res) => res.data),
  });
};

export const useCreateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BranchInput) => branchService.createBranch(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BRANCH_QUERY_KEY }),
  });
};

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BranchInput> }) =>
      branchService.updateBranch(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BRANCH_QUERY_KEY }),
  });
};

export const useDeleteBranch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => branchService.deleteBranch(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BRANCH_QUERY_KEY }),
  });
};
