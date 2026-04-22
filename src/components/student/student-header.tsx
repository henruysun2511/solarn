"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bell, Search, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../common/logo";

export default function StudentHeader() {
    const pathname = usePathname();

    const navLinks = [
        { name: "Khóa học", href: "/student/courses" },
        { name: "Giảng viên", href: "/student/teachers" },
        { name: "Đánh giá", href: "/student/reviews" },
        { name: "Blog", href: "/student/blog" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/70 backdrop-blur-xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)]">
            <div className="container mx-auto h-22 px-4 md:px-8 flex items-center justify-between">

                {/* LEFT: Logo & Search */}
                <div className="flex items-center gap-10">
                    <Logo
                        icon={<Star size={20} fill="currentColor" />}
                        brandText="Star"
                        highlightText="Learners"
                        iconBgColor="var(--primary)"
                    />

                    <div className="hidden lg:flex relative group w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
                        <input
                            placeholder="Tìm bài học, tài liệu..."
                            className="w-full bg-slate-100/80 border-2 border-transparent rounded-[1.5rem] py-2.5 pl-11 pr-4 text-sm font-bold transition-all outline-none focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                        />
                    </div>
                </div>

                {/* CENTER: Navigation Menu */}
                <nav className="hidden xl:flex items-center gap-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative px-5 py-2 text-[15px] font-[1000] tracking-tight transition-all duration-300",
                                    isActive
                                        ? "text-[var(--primary)] after:content-[''] after:absolute after:-bottom-[27px] after:left-0 after:w-full after:h-[3px] after:bg-[var(--primary)] after:rounded-t-full after:shadow-[0_-2px_10px_var(--primary)]"
                                        : "text-slate-500 hover:text-[var(--primary)] hover:bg-[var(--accent)] rounded-xl"
                                )}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* RIGHT: Actions & Profile */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <Button variant="ghost" size="icon" className="relative size-12 rounded-2xl hover:bg-[var(--accent)] hover:text-[var(--primary)] transition-all group">
                        <Bell className="w-5.5 h-5.5 text-slate-700 group-hover:scale-110 transition-transform" />
                        <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm" />
                    </Button>

                    {/* Profile Section */}
                    <div className="flex items-center gap-4 pl-6 border-l border-slate-100 group cursor-pointer">
                        <div className="text-right hidden sm:block">
                            <p className="text-[14px] font-[1000] text-slate-800 leading-tight group-hover:text-[var(--primary)] transition-colors">Nhat Huy</p>
                            <p className="text-[11px] text-[var(--primary)] font-black uppercase tracking-tighter mt-1 bg-[var(--accent)] px-2 py-0.5 rounded-md inline-block">
                                Học viên
                            </p>
                        </div>

                        <div className="relative group">
                            {/* Avatar với viền Gradient nhịp nhàng */}
                            <div className="size-12 rounded-[1.2rem] bg-gradient-to-br from-[var(--primary)] to-blue-400 p-[3px] shadow-lg shadow-blue-200 transition-transform group-hover:rotate-6">
                                <img className="size-full rounded-[1rem]  flex items-center justify-center" src="https://i.pinimg.com/1200x/93/9f/e2/939fe2f38c9806ad7b80fde47c59c83d.jpg" alt="" />
                            </div>
                            <span className="absolute -top-1 -right-1 size-4 bg-green-500 border-4 border-white rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}