import { ApiResponse } from "@/constants/apiResponse";
import { Blog, BlogInput, BlogParams } from "@/schemas/blog.schema";
import http from "@/utils/http";

const prefix = "/blogs";

const blogService = {
  getBlogs: (params?: BlogParams) => {
    return http.get<ApiResponse<Blog[]>>(prefix, { params });
  },
  getBlogById: (id: string) => {
    return http.get<ApiResponse<Blog>>(`${prefix}/${id}`);
  },
  getBlogBySlug: (slug: string) => {
    return http.get<ApiResponse<Blog>>(`${prefix}/slug/${slug}`);
  },
  createBlog: (data: BlogInput) => {
    return http.post<ApiResponse<Blog>>(prefix, data);
  },
  updateBlog: (id: string, data: Partial<BlogInput>) => {
    return http.put<ApiResponse<Blog>>(`${prefix}/${id}`, data);
  },
  deleteBlog: (id: string) => {
    return http.delete<ApiResponse<null>>(`${prefix}/${id}`);
  },
};

export default blogService;
