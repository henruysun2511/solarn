import { BlogSortBy, SortOrder } from "@/constants/sort";
import { z } from "zod";

export const blogSchema = z.object({
  blogId: z.string().uuid().optional(),
  title: z.string().min(1, "Tiêu đề là bắt buộc").max(255),
  slug: z.string().min(1, "Slug là bắt buộc").max(255),
  thumbnail: z.string().optional().nullable(),
  content: z.string().min(1, "Nội dung là bắt buộc"),
  excerpt: z.string().optional().nullable(),
  author: z.string().max(100).optional().nullable(),
  isPublished: z.boolean(),
  publishedAt: z.string().datetime().optional().nullable(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Blog = z.infer<typeof blogSchema>;

export const blogParamsSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  search: z.string().optional(),
  isPublished: z.boolean().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.enum([BlogSortBy.TITLE, BlogSortBy.PUBLISHED_AT, BlogSortBy.CREATED_AT]).optional().default(BlogSortBy.CREATED_AT),
});

export type BlogParams = z.input<typeof blogParamsSchema>;

export const blogInputSchema = blogSchema.omit({
  blogId: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
});

export type BlogInput = z.infer<typeof blogInputSchema>;
