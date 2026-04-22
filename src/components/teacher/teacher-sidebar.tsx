"use client";

import { Button } from "@/components/ui/button";
import {
    Bell,
    BookOpen,
    Calendar,
    CheckSquare,
    CreditCard,
    FileWarning,
    GraduationCap,
    LayoutDashboard,
    Star,
    UserCircle,
    Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
    {
        icon: LayoutDashboard,
        label: "Tổng quan",
        href: "/teacher/dashboard"
    },
    {
        icon: UserCircle,
        label: "Hồ sơ",
        href: "/teacher/profile"
    },
    {
        icon: Users,
        label: "Khóa học & Lớp học",
        href: "/teacher/course"
    },
    {
        icon: Users,
        label: "Học viên",
        href: "/teacher/student"
    },
    {
        icon: Calendar,
        label: "Lịch dạy",
        href: "/teacher/schedule"
    },
    {
        icon: CheckSquare,
        label: "Điểm danh học viên",
        href: "/teacher/attendance"
    },
    {
        icon: GraduationCap,
        label: "Nhập điểm",
        href: "/teacher/result"
    },
    {
        icon: BookOpen,
        label: "Upload tài liệu",
        href: "/teacher/document"
    },
    {
        icon: CreditCard,
        label: "Bảng lương",
        href: "/teacher/salary"
    },
    {
        icon: FileWarning,
        label: "Vi phạm",
        href: "/teacher/violation"
    },
    {
        icon: Star,
        label: "Đánh giá từ học viên",
        href: "/teacher/feedback"
    },
    {
        icon: Bell,
        label: "Thông báo",
        href: "/teacher/notification"
    },
];

export function TeacherSidebar() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col gap-2">
            {sidebarItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                    <Link key={item.href} href={item.href} passHref legacyBehavior>
                        <Button
                            variant="ghost"
                            className={`cursor-pointer w-full justify-start h-14 rounded-2xl gap-4 font-bold text-base transition-all ${isActive
                                ? "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)] shadow-md"
                                : "text-muted-foreground hover:bg-[var(--accent)] hover:text-[var(--primary)]"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Button>
                    </Link>
                );
            })}
        </nav>
    );
}