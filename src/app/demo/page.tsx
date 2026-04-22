import { Card } from "@/components/ui/card";
import {
    ArrowRight,
    BookOpen,
    CalendarDays,
    ClipboardCheck,
    Home,
    LayoutDashboard,
    LogIn,
    Settings,
    UserCircle,
    Wallet
} from 'lucide-react';
import Link from "next/link";

const AppNavigator = () => {
    const routes = [
        {
            group: "Công khai",
            items: [
                { title: "Trang chủ", path: "/", icon: Home, color: "bg-blue-50 text-blue-600", desc: "Trang giới thiệu tổng quát hệ thống" },
                { title: "Danh sách khóa học", path: "/course", icon: BookOpen, color: "bg-indigo-50 text-indigo-600", desc: "Xem toàn bộ các khóa học đang mở" },
                { title: "Chi tiết khóa học", path: "/course/1", icon: BookOpen, color: "bg-violet-50 text-violet-600", desc: "Thông tin chi tiết một khóa học (ID: 1)" },
                { title: "Đăng nhập", path: "/auth/login", icon: LogIn, color: "bg-red-50 text-red-600", desc: "Giao diện xác thực người dùng" },
            ]
        },
        {
            group: "Học viên",
            items: [
                { title: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard, color: "bg-emerald-50 text-emerald-600", desc: "Quản lý học tập và thông báo" },
                { title: "Hồ sơ cá nhân", path: "/student/profile", icon: UserCircle, color: "bg-teal-50 text-teal-600", desc: "Cập nhật thông tin và chứng chỉ" },
                { title: "Lịch học", path: "/student/schedule", icon: CalendarDays, color: "bg-cyan-50 text-cyan-600", desc: "Thời khóa biểu cá nhân hàng tuần" },
            ]
        },
        {
            group: "Giảng viên",
            items: [
                { title: "Dashboard", path: "/teacher/dashboard", icon: LayoutDashboard, color: "bg-orange-50 text-orange-600", desc: "Thống kê lớp học và sinh viên" },
                { title: "Điểm danh", path: "/teacher/attendance", icon: ClipboardCheck, color: "bg-amber-50 text-amber-600", desc: "Quản lý sĩ số và vắng thi" },
                { title: "Bảng lương", path: "/teacher/salary", icon: Wallet, color: "bg-yellow-50 text-yellow-600", desc: "Chi tiết thu nhập và giờ dạy" },
            ]
        },
        {
            group: "Quản trị hệ thống",
            items: [
                { title: "Quản lý khóa học", path: "/admin/course", icon: Settings, color: "bg-slate-50 text-slate-600", desc: "CRUD khóa học, bài tập, học liệu" },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-10 md:p-20">
            <div className="max-w-7xl mx-auto space-y-16">
                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-5xl font-black tracking-tighter text-gray-900">
                        DEMO GIAO DIỆN <span className="text-[var(--primary)]">HỆ THỐNG</span>
                    </h1>
                    <p className="text-gray-400 font-bold italic">Danh sách các màn hình đã thiết kế trong hệ thống.</p>
                </div>

                {routes.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-8">
                        <h2 className="text-xl font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-4">
                            <div className="w-12 h-1 bg-gray-200 rounded-full" />
                            {group.group}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {group.items.map((route, rIdx) => (
                                <Link key={rIdx} href={route.path} className="block group">
                                    <Card className="h-full bg-white border-none rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-[var(--primary)]/10 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                                        <div className={`${route.color} size-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                            <route.icon className="size-7" />
                                        </div>

                                        <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors">
                                            {route.title}
                                        </h3>

                                        <p className="text-xs font-bold text-gray-400 leading-relaxed">
                                            {route.desc}
                                        </p>

                                        <div className="mt-6 flex items-center gap-2 text-[var(--primary)] font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                            Truy cập ngay <ArrowRight className="size-3" />
                                        </div>

                                        {/* Background Decor */}
                                        <div className="absolute -right-4 -bottom-4 size-24 bg-gray-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppNavigator;