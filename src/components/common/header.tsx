"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../common/logo";

export default function Header() {
    const pathname = usePathname();

    const navLinks = [
        { name: "Khóa học", href: "course" },
        { name: "Giảng viên", href: "teacher" },
        { name: "Đánh giá", href: "review" },
        { name: "Blog", href: "blog" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/70 backdrop-blur-xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)]">
            <div className="container mx-auto h-22 px-4 md:px-8 flex items-center justify-between">

                {/* LEFT: Logo & Search */}
                <div className="flex items-center gap-10">
                    <Logo
                        icon={<Sun size={20} fill="currentColor" />}
                        brandText="SOLAN"
                        highlightText="RN"
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


                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="font-bold text-muted-foreground rounded-xl hover:text-foreground">Đăng nhập</Button>
                        <Button className="rounded-2xl px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 font-bold transition-all">
                            Tư vấn ngay
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}