"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { Bell, Search, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "../common/logo";
import { UserAvatar } from "./user-avatar";
import { useAuthStore } from "@/stores/useAuthStore";
import { RoleType } from "@/constants/type";
import { useGetMyStudentProfile } from "@/queries/useStudentQuery";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, accessToken } = useAuthStore();

    const navLinks = [
        { name: "Khóa học", href: "/course-2" },
        { name: "Giảng viên", href: "/teacher" },
        { name: "Đánh giá", href: "/feedback" },
        { name: "Blog", href: "/blog" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/70 backdrop-blur-xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)]">
            <div className="container mx-auto h-22 px-4 md:px-8 flex items-center justify-between">

                {/* LEFT: Logo & Search */}
                <div className="flex items-center gap-10">
                    <Link href={"/"}>
                        <Logo
                            icon={<Sun size={20} fill="currentColor" />}
                            brandText="SOLAN"
                            highlightText="RN"
                            iconBgColor="var(--primary)"
                        />
                    </Link>


                    {/* <div className="hidden lg:flex relative group w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
                        <input
                            placeholder="Tìm bài học, tài liệu..."
                            className="w-full bg-slate-100/80 border-2 border-transparent rounded-[1.5rem] py-2.5 pl-11 pr-4 text-sm font-bold transition-all outline-none focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                        />
                    </div> */}
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
                    {accessToken && user ? (
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="relative size-12 rounded-2xl hover:bg-[var(--accent)] hover:text-[var(--primary)] transition-all group">
                                <Bell className="w-5.5 h-5.5 text-slate-700 group-hover:scale-110 transition-transform" />
                                <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm" />
                            </Button>
                            <div onClick={() => {
                                const role = user.roleName?.toLowerCase();
                                if (role === RoleType.STUDENT) router.push("/student/dashboard");
                                else if (role === RoleType.TEACHER) router.push("/teacher/dashboard");
                                else if (role === RoleType.ADMIN) router.push("/admin/dashboard/overview");
                            }} className="flex items-center gap-4 pl-6 border-l border-slate-100 group cursor-pointer">
                                <div className="text-right hidden sm:block">
                                    <p className="text-[14px] font-[1000] text-slate-800 leading-tight group-hover:text-[var(--primary)] transition-colors">{user.username}</p>
                                    <p className="text-[11px] text-[var(--primary)] font-black uppercase tracking-tighter mt-1 bg-[var(--accent)] px-2 py-0.5 rounded-md inline-block">{user.roleName}</p>
                                </div>
                                <div className="relative group">
                                    <div className="size-12 rounded-[1.2rem] bg-gradient-to-br from-[var(--primary)] to-blue-400 p-[3px] shadow-lg shadow-blue-200 transition-transform group-hover:rotate-6">
                                        <UserAvatar username={user.username} className="size-full rounded-[1rem]" />
                                    </div>
                                    <span className="absolute -top-1 -right-1 size-4 bg-green-500 border-4 border-white rounded-full animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Button onClick={() => router.push("/auth/login")} variant="ghost" className="font-bold text-muted-foreground rounded-xl hover:text-foreground">Đăng nhập</Button>
                            <Button onClick={() => router.push("/auth/register")} className="rounded-2xl px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 font-bold transition-all">
                                Tư vấn ngay
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}