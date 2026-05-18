"use client";

import { BadgeLevel } from "@/components/common/badge-level";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/cn";
import {
    ArrowLeft,
    Calendar,
    Clock,
    GraduationCap,
    Pencil,
    Plus,
    Star,
    Users,
    Wallet
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminCourseDetailPage() {
    const router = useRouter();

    const course = {
        courseId: "COURSE-12345678",
        courseName: "Lập trình Next.js 14 & Hệ sinh thái React",
        level: "Intermediate",
        totalSessions: 24,
        tuitionFee: 4500000,
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
        totalClasses: 5,
        description: "Khóa học chuyên sâu về Next.js 14 dành cho các nhà phát triển muốn làm chủ App Router và Server Components. Nội dung bao gồm Server Components, Streaming, Intercepting Routes và tối ưu hóa hiệu năng ứng dụng."
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
            {/* 1. HEADER & HERO SECTION (Split Layout) */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    {/* Nút quay lại */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-400 hover:text-[var(--primary)] transition-all mb-8 group"
                    >
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Danh sách khóa học</span>
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Cột trái: Thông tin chính */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="flex items-center gap-3">
                                <BadgeLevel level={course.level} className="px-4 py-1 rounded-full bg-[var(--primary)] text-white border-none" />
                                <span className="text-[11px] font-mono font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-md">
                                    ID: {course.courseId}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-tight">
                                {course.courseName}
                            </h1>

                            <p className="text-gray-500 text-lg leading-relaxed max-w-2xl font-medium">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap gap-3 pt-4">
                                <Button className="bg-[var(--primary)] text-white hover:opacity-90 rounded-2xl font-black px-8 h-12 shadow-lg shadow-blue-200">
                                    <Pencil className="mr-2 size-4" /> Chỉnh sửa khóa học
                                </Button>
                                <Button variant="outline" className="rounded-2xl font-black border-2 border-gray-200 h-12 px-8 hover:bg-gray-50">
                                    Gửi thông báo
                                </Button>
                            </div>
                        </div>

                        {/* Cột phải: Hình ảnh & Thẻ tóm tắt */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group">
                                <img
                                    src={course.image}
                                    alt={course.courseName}
                                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-2 text-white font-black text-sm uppercase tracking-widest bg-white/20 backdrop-blur-md w-max px-4 py-2 rounded-full border border-white/30">
                                        <Star className="size-4 fill-yellow-400 text-yellow-400" />
                                        4.8 (120 đánh giá)
                                    </div>
                                </div>
                            </div>

                            {/* Thẻ trôi (Floating badge) */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 hidden md:block animate-bounce-slow">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                                        <Wallet className="size-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Học phí trọn gói</p>
                                        <p className="text-xl font-black text-gray-900">{course.tuitionFee.toLocaleString()}₫</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. CHỈ SỐ NHANH (Quick Stats) */}
            <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: Clock, label: "Thời lượng", value: `${course.totalSessions} buổi`, color: "text-blue-600", bg: "bg-blue-50" },
                        { icon: Users, label: "Đang mở", value: `${course.totalClasses} lớp học`, color: "text-emerald-600", bg: "bg-emerald-50" },
                        { icon: Calendar, label: "Khai giảng", value: "Hàng tháng", color: "text-purple-600", bg: "bg-purple-50" },
                        { icon: GraduationCap, label: "Chứng chỉ", value: "Cấp bởi Earth", color: "text-orange-600", bg: "bg-orange-50" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className={cn("size-12 rounded-2xl flex items-center justify-center shrink-0", item.bg, item.color)}>
                                <item.icon className="size-6" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">{item.label}</p>
                                <p className="text-base font-black text-gray-900">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. TABS DỮ LIỆU CHI TIẾT */}
            <div className="max-w-7xl mx-auto px-6 mt-12">
                <Tabs defaultValue="classes" className="space-y-8">
                    <TabsList className="bg-transparent h-auto p-0 gap-8 border-b border-gray-200 w-full justify-start rounded-none">
                        {[
                            { value: "classes", label: "Danh sách lớp" },
                            { value: "teachers", label: "Giáo viên" },
                            { value: "resources", label: "Tài liệu" },
                            { value: "reviews", label: "Đánh giá" },
                        ].map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="bg-transparent border-b-2 border-transparent rounded-none px-0 pb-4 h-auto font-black text-xs uppercase tracking-[0.2em] text-gray-400 data-[state=active]:border-[var(--primary)] data-[state=active]:text-[var(--primary)] data-[state=active]:bg-transparent transition-all"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="classes" className="mt-0 outline-none">
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black text-gray-900 tracking-tighter">Lớp học đang diễn ra</h3>
                                <Button className="rounded-xl font-black bg-gray-900 hover:bg-black h-10 px-6">
                                    <Plus className="size-4 mr-2" /> Tạo lớp mới
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Ví dụ một Card lớp học */}
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="group p-6 rounded-[2rem] border-2 border-gray-50 hover:border-[var(--primary)]/20 hover:bg-blue-50/30 transition-all cursor-pointer">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center font-black text-[var(--primary)]">
                                                0{i}
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[9px] font-black uppercase tracking-tighter">Đang mở</span>
                                        </div>
                                        <h4 className="font-black text-gray-900 text-lg mb-1 group-hover:text-[var(--primary)] transition-colors">NEXTJS-PRO-K0{i}</h4>
                                        <p className="text-gray-400 text-xs font-bold mb-4">Thứ 2, 4, 6 • 19:30 - 21:30</p>
                                        <div className="flex items-center gap-2">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map(s => <div key={s} className="size-6 rounded-full border-2 border-white bg-gray-200" />)}
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400">+12 học viên</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    {/* Các TabsContent khác tương tự... */}
                </Tabs>
            </div>
        </div>
    );
}