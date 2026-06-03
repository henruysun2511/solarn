"use client";

import { DataPagination } from "@/components/common/data-pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogSortBy, SortOrder } from "@/constants/sort";
import { useGetBlogs } from "@/queries/useBlogQuery";
import { Blog, BlogParams } from "@/schemas/blog.schema";
import { formatDate } from "@/utils/format";
import { CalendarIcon, ChevronRight, Clock, SearchIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BlogListPage() {
  const [params, setParams] = useState<BlogParams>({
    page: 1, limit: 9, sortOrder: SortOrder.DESC, sortBy: BlogSortBy.CREATED_AT,
    isPublished: true,
  });
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading } = useGetBlogs({ ...params, isPublished: true });
  const blogs: Blog[] = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setParams((prev) => ({ ...prev, search: searchValue || undefined, page: 1 }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--dashboard-bg)] font-sans antialiased text-foreground">
      {/* HERO */}
      <section className="relative min-h-[400px] flex items-center overflow-hidden bg-[var(--primary)] text-white py-16">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-20 pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 size-96 bg-[var(--secondary)] rounded-full blur-[150px] opacity-15" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
            <Clock className="size-4 text-[var(--secondary)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Blog</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tighter mb-4">
            Tin tức & <span className="text-[var(--secondary)]">Bài viết</span>
          </h1>
          <p className="text-lg text-white/70 font-medium max-w-xl mx-auto">
            Kiến thức, mẹo học tập và những câu chuyện cảm hứng từ SOLARN.
          </p>
        </div>
      </section>

      {/* SEARCH */}
      <section className="py-10 container mx-auto px-6">
        <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <Input
            placeholder="Tìm kiếm bài viết..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="h-14 pl-12 pr-6 rounded-2xl border-gray-200 bg-white shadow-sm text-base font-medium"
          />
        </form>
      </section>

      {/* BLOG CARDS */}
      <section className="pb-32 container mx-auto px-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-52 bg-gray-100" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-100 rounded w-1/3" />
                  <div className="h-6 bg-gray-100 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <Clock className="size-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 font-bold text-lg">Chưa có bài viết nào.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogs.map((blog) => (
                <Link
                  key={blog.blogId}
                  href={`/blog/${blog.slug}`}
                  className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-[var(--primary)]/30 transition-all duration-500 flex flex-col"
                >
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={blog.thumbnail || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800"}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-bold mb-3">
                      {blog.author && (
                        <span className="flex items-center gap-1">
                          <UserIcon className="size-3" /> {blog.author}
                        </span>
                      )}
                      {blog.publishedAt && (
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="size-3" /> {formatDate(blog.publishedAt)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    {blog.excerpt && (
                      <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-3 flex-1">
                        {blog.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-1 text-[var(--primary)] font-black text-xs uppercase tracking-wider">
                      Đọc tiếp <ChevronRight className="size-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center">
                <DataPagination
                  page={params.page || 1}
                  totalPages={totalPages}
                  onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
                />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
