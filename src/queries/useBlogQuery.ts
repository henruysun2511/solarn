import { BlogInput, BlogParams } from "@/schemas/blog.schema";
import blogService from "@/services/blog.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const BLOG_QUERY_KEY = ["blogs"];

export const useGetBlogs = (params?: BlogParams) => {
  return useQuery({
    queryKey: [...BLOG_QUERY_KEY, params],
    queryFn: () => blogService.getBlogs(params).then((res) => res.data),
  });
};

export const useGetBlogById = (id: string) => {
  return useQuery({
    queryKey: [...BLOG_QUERY_KEY, id],
    queryFn: () => blogService.getBlogById(id).then((res) => res.data),
    enabled: !!id,
  });
};

export const useGetBlogBySlug = (slug: string) => {
  return useQuery({
    queryKey: [...BLOG_QUERY_KEY, "slug", slug],
    queryFn: () => blogService.getBlogBySlug(slug).then((res) => res.data),
    enabled: !!slug,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BlogInput) => blogService.createBlog(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEY }),
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BlogInput> }) =>
      blogService.updateBlog(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEY }),
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blogService.deleteBlog(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEY }),
  });
};
