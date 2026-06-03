"use client";

import { Button } from "@/components/ui/button";
import { useGetBlogBySlug, useGetBlogs } from "@/queries/useBlogQuery";
import { SortOrder } from "@/constants/sort";
import { Blog } from "@/schemas/blog.schema";
import { formatDate } from "@/utils/format";
import {
  ArrowLeft, BookOpen, CalendarIcon, ChevronUp, Clock,
  Share2, UserIcon, Check, Bookmark
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function extractToc(html: string): { level: number; text: string; id: string }[] {
  const headings: { level: number; text: string; id: string }[] = [];
  const regex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]*>/g, "");
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    headings.push({ level: Number(match[1]), text, id });
  }
  return headings;
}

function addIdsToHtml(html: string): string {
  return html.replace(/<h([23])[^>]*>(.*?)<\/h\1>/gi, (_, level, content) => {
    const text = content.replace(/<[^>]*>/g, "");
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return `<h${level} id="${id}">${content}</h${level}>`;
  });
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group bg-white rounded-[2rem] border border-slate-100 p-3 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
    >
      <div className="h-44 overflow-hidden relative rounded-[1.4rem]">
        <img
          src={blog.thumbnail || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800"}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-bold mb-2">
          {blog.author && (
            <span className="flex items-center gap-1"><UserIcon className="size-3" /> {blog.author}</span>
          )}
          {blog.publishedAt && (
            <span className="flex items-center gap-1"><CalendarIcon className="size-3" /> {formatDate(blog.publishedAt)}</span>
          )}
        </div>
        <h3 className="text-sm font-black text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {blog.title}
        </h3>
      </div>
    </Link>
  );
}

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: blog, isLoading, error } = useGetBlogBySlug(id);
  const [showBackTop, setShowBackTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState("");
  const [copied, setCopied] = useState(false);

  const blogData = blog?.data;

  const { data: relatedData } = useGetBlogs({ limit: 4, sortOrder: SortOrder.DESC, isPublished: true });

  const relatedBlogs: Blog[] = useMemo(
    () => (relatedData?.data || []).filter((b: Blog) => b.slug !== id).slice(0, 3),
    [relatedData?.data, id],
  );

  const readingTime = useMemo(
    () => (blogData?.content ? estimateReadingTime(blogData.content) : 0),
    [blogData?.content],
  );

  const toc = useMemo(
    () => (blogData?.content ? extractToc(blogData.content) : []),
    [blogData?.content],
  );

  const processedContent = useMemo(
    () => (blogData?.content ? addIdsToHtml(blogData.content) : ""),
    [blogData?.content],
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 600);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!toc.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" },
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({ title: blogData?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [blogData?.title]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center">
        <div className="w-full max-w-4xl px-4 space-y-8 animate-pulse py-12">
          <div className="h-[400px] bg-slate-200 rounded-[2.5rem]" />
          <div className="space-y-4 pt-6">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !blogData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4 p-4 text-center">
        <div className="size-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-300 mb-2">
          <Clock className="size-8" />
        </div>
        <p className="text-slate-800 font-black text-xl">Bài viết không tồn tại hoặc đã gỡ xuống</p>
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-black hover:opacity-80 transition-opacity">
          <ArrowLeft className="size-4" /> Quay lại chuyên mục Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/60 font-sans antialiased text-slate-800">

      {/* PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-100 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-primary transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── HERO SECTION CHUẨN ĐỒNG BỘ ── */}
      <section className="relative min-h-[520px] flex items-end overflow-hidden pb-16 pt-24">
        <div className="absolute inset-0">
          {blogData.thumbnail && (
            <img
              src={blogData.thumbnail}
              alt=""
              className="w-full h-full object-cover scale-105"
            />
          )}
          {/* Lớp phủ mờ bảo vệ chữ khỏi bị lóa mắt */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/40" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white font-bold text-xs uppercase tracking-wider mb-8 transition-all bg-white/10 border border-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md shadow-sm"
          >
            <ArrowLeft className="size-3.5" /> Quay lại danh mục
          </Link>

          <div className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold text-white/90">
              {blogData.author && (
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                  <UserIcon className="size-3.5 text-sky-300" /> {blogData.author}
                </span>
              )}
              {blogData.publishedAt && (
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                  <CalendarIcon className="size-3.5 text-slate-300" /> {formatDate(blogData.publishedAt)}
                </span>
              )}
              <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                <BookOpen className="size-3.5 text-emerald-300" /> {readingTime} phút đọc
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              {blogData.title}
            </h1>

            {blogData.excerpt && (
              <p className="text-base md:text-lg text-white/70 font-medium max-w-3xl leading-relaxed pt-2">
                {blogData.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── THÂN BÀI VIẾT + MỤC LỤC STICKY ── */}
      <section className="py-12 pb-32 container mx-auto px-2 sm:px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 relative items-start">

          {/* MỤC LỤC SIDEBAR (STICKY TOC) */}
          {toc.length > 0 && (
            <aside className="hidden lg:block lg:col-span-3 sticky top-28 self-start">
              <div className="space-y-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 text-slate-400 pb-2 border-b border-slate-100/60">
                  <Bookmark className="size-4 text-primary" />
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Nội dung chính
                  </p>
                </div>

                <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1 text-sm font-semibold scrollbar-thin">
                  {toc.map((item) => {
                    const isSelected = activeHeading === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block transition-all duration-300 py-2 px-3 leading-relaxed rounded-xl ${item.level === 3
                          ? "pl-6 text-[13px] opacity-90"
                          : "text-sm"
                          } ${isSelected
                            ? "bg-primary/5 text-primary font-bold shadow-sm"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                          }`}
                      >
                        {item.text}
                      </a>
                    );
                  })}
                </div>
              </div>
            </aside>
          )}

          {/* KHỐI NỘI DUNG CHÍNH (TYPOGRAPHY PROSE) */}
          <div className={`flex-1 min-w-0 ${toc.length > 0 ? "lg:col-span-9" : "lg:col-span-12"}`}>
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-6 md:p-12 lg:p-14">
              <article
                className="prose prose-slate prose-base md:prose-lg max-w-none
            prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight
            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900 prose-strong:font-black
            prose-img:rounded-3xl prose-img:shadow-md prose-img:mx-auto prose-img:my-8 prose-img:border prose-img:border-slate-100
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-slate-50/70 prose-blockquote:rounded-r-2xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-slate-700 prose-blockquote:font-medium prose-blockquote:my-6
            prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-bold prose-code:text-primary prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-slate-950 prose-pre:rounded-2xl prose-pre:shadow-xl prose-pre:p-5 prose-pre:my-6
            prose-h2:text-2xl md:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:scroll-mt-24 prose-h2:border-b prose-h2:border-slate-50 prose-h2:pb-2
            prose-h3:text-xl md:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:scroll-mt-24
            prose-ul:space-y-2 prose-ol:space-y-2 prose-li:text-slate-600 prose-li:marker:text-primary
            prose-hr:border-slate-100 prose-hr:my-10"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </div>

            {/* THỂ TÁC GIẢ BÀI VIẾT */}
            <div className="mt-8 bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 transition-all duration-300 hover:border-slate-200/60">
              <div className="size-16 rounded-full bg-gradient-to-br from-sky-400 via-primary to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-md shrink-0">
                {blogData.author?.charAt(0) || "S"}
              </div>
              <div className="text-center sm:text-left space-y-1">
                <p className="font-black text-slate-900 text-base">{blogData.author || "Ban biên tập SOLARN"}</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Chuyên gia học thuật</p>
                <p className="text-sm text-slate-500 font-medium leading-relaxed pt-1">
                  Đội ngũ phát triển nội dung và nghiên cứu phương pháp giảng dạy tiếng Anh thực chiến tại SOLARN. Mang đến các kiến thức chuyên sâu về công nghệ, IELTS, TOEIC và lộ trình phát triển bản thân bài bản.
                </p>
              </div>
            </div>

            {/* BÀI VIẾT TƯƠNG TỰ */}
            {relatedBlogs.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center gap-2 mb-8">
                  <div className="h-6 w-1 bg-primary rounded-full" />
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                    Bài viết bạn nên đọc tiếp
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedBlogs.map((b) => (
                    <BlogCard key={b.blogId} blog={b} />
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
        {showBackTop && (
          <Button
            size="icon"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="size-12 rounded-full shadow-xl bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80 hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronUp className="size-5" />
          </Button>
        )}
        <Button
          size="icon"
          onClick={handleShare}
          className="size-12 rounded-full shadow-xl bg-slate-900 text-white hover:bg-slate-800 border border-slate-800 hover:scale-105 active:scale-95 transition-all relative group"
        >
          {copied ? (
            <Check className="size-4 text-emerald-400" />
          ) : (
            <>
              <Share2 className="size-4 group-hover:rotate-12 transition-transform" />
              <span className="absolute right-14 bg-slate-950 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                Chia sẻ link
              </span>
            </>
          )}
        </Button>
      </div>

    </div>
  );
}