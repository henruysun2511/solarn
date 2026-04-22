"use client";

import { Button } from "@/components/ui/button";
import {
    Bell,
    BookOpen,
    Calendar,
    CheckSquare,
    ClipboardEdit,
    CreditCard,
    GitPullRequest,
    GraduationCap,
    LayoutDashboard,
    UserCircle // Thêm icon cho trang cá nhân nếu cần
    ,








    Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
    {
        icon: LayoutDashboard,
        label: "Tổng quan",
        href: "/student/dashboard"
    },
    {
        icon: UserCircle,
        label: "Hồ sơ",
        href: "/student/profile"
    },
    {
        icon: Users,
        label: "Khóa học & Lớp học",
        href: "/student/course"
    },
    {
        icon: Calendar,
        label: "Lịch học",
        href: "/student/schedule"
    },
    {
        icon: CheckSquare,
        label: "Điểm danh",
        href: "/student/attendance"
    },
    {
        icon: GraduationCap,
        label: "Kết quả học tập",
        href: "/student/result"
    },
    {
        icon: BookOpen,
        label: "Tài liệu",
        href: "/student/document"
    },
    {
        icon: CreditCard,
        label: "Học phí",
        href: "/student/fee"
    },
    {
        icon: GitPullRequest,
        label: "Yêu cầu chuyển lớp",
        href: "/student/transfer"
    },
    {
        icon: ClipboardEdit,
        label: "Yêu cầu bảo lưu",
        href: "/student/leave"
    },
    {
        icon: Bell,
        label: "Thông báo",
        href: "/student/notification"
    },
];

export function StudentSidebar() {
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