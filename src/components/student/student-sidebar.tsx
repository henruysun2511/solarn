"use client";

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
    MessageSquareQuote,
    UserCircle,
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
    // {
    //     icon: UserCircle,
    //     label: "Hồ sơ",
    //     href: "/student/profile"
    // },
    {
        icon: Calendar,
        label: "Lịch học",
        href: "/student/schedule-session"
    },
    {
        icon: CheckSquare,
        label: "Điểm danh",
        href: "/student/attendance"
    },
    {
        icon: GraduationCap,
        label: "Kết quả học tập",
        href: "/student/assignment-result"
    },
    {
        icon: BookOpen,
        label: "Tài liệu",
        href: "/student/course-resource"
    },
    {
        icon: CreditCard,
        label: "Lịch sử thanh toán",
        href: "/student/invoice"
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
        icon: MessageSquareQuote,
        label: "Đánh giá",
        href: "/student/feedback"
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
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-4 w-full h-14 rounded-2xl px-4 font-bold text-base transition-all cursor-pointer ${isActive
                            ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md"
                            : "text-muted-foreground hover:bg-[var(--accent)] hover:text-[var(--primary)]"
                            }`}
                    >
                        <item.icon className="w-5 h-5 shrink-0" />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}