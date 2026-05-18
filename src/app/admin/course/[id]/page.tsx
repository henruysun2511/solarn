"use client";

import { BadgeLevel } from "@/components/common/badge-level";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/cn";
import {
    Activity,
    ArrowLeft,
    ArrowUpRight,
    BookMarked,
    BookOpen,
    Briefcase,
    Clock,
    Pencil,
    Plus,
    ShieldCheck,
    Star,
    TrendingUp,
    Users,
    Wallet
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminCourseDetailPage() {
    const router = useRouter();

    // Dữ liệu Mock khóa học chuẩn hóa từ Database của Earth Center
    const course = {
        courseId: "COURSE-12345678",
        courseName: "Lập trình Next.js 14 & Hệ sinh thái React",
        level: "Intermediate",
        totalSessions: 24,
        tuitionFee: 4500000,
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
        description: "Khóa học chuyên sâu về Next.js 14 dành cho các nhà phát triển muốn làm chủ App Router và Server Components. Nội dung bao gồm Server Components, Streaming, Intercepting Routes và tối ưu hóa hiệu năng ứng dụng."
    };

    // Dữ liệu giảng viên kết nối trực tiếp logic tính lương
    const teachers = [
        { id: "GV-01", name: "Nguyễn Văn A", role: "Next.js Expert", baseRate: 12000000, status: "Active" },
        { id: "GV-02", name: "Trần Thị B", role: "UI/UX Lead Mentor", baseRate: 10000000, status: "Active" }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 sm:p-10 font-sans text-gray-900">

            {/* TOP NAVIGATION CONTROL BAR */}
            <div className="flex items-center justify-between gap-4 mb-8">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-all group"
                >
                    <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Quản lý khóa học</span>
                </button>

                <Button className="rounded-xl font-black bg-gray-900 hover:bg-black text-white text-xs h-10 px-5 shadow-sm transition-all">
                    <Pencil className="size-3.5 mr-2" /> Chỉnh sửa cấu hình
                </Button>
            </div>

            {/* 1. HERO SECTION (Split Layout: Trái thông tin - Phải hình ảnh) */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-6 sm:p-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                    {/* Cột trái: Thông tin chi tiết khóa học */}
                    <div className="lg:col-span-7 space-y-5">
                        <div className="flex items-center gap-3">
                            <BadgeLevel level={course.level} className="px-4 py-1 rounded-full bg-[var(--primary)] text-white border-none text-xs font-black uppercase" />
                            <span className="text-[11px] font-mono font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-xl border border-gray-100">
                                ID: {course.courseId}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter leading-tight">
                            {course.courseName}
                        </h1>

                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-medium max-w-3xl">
                            {course.description}
                        </p>

                        <div className="flex flex-wrap gap-6 pt-2">
                            <div className="flex items-center gap-2.5">
                                <div className="size-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center"><Wallet className="size-4" /></div>
                                <div>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Học phí trọn gói</p>
                                    <p className="text-base font-black text-gray-900">{course.tuitionFee.toLocaleString('vi-VN')}₫</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="size-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><Clock className="size-4" /></div>
                                <div>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Thời lượng khóa học</p>
                                    <p className="text-base font-black text-gray-900">{course.totalSessions} tiết học</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cột phải: Hình ảnh đại diện khóa học */}
                    <div className="lg:col-span-5 w-full">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/50 group border-4 border-gray-50 bg-gray-50">
                            <img
                                src={course.image}
                                alt={course.courseName}
                                className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-103"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <div className="flex items-center gap-1.5 text-white font-black text-[10px] uppercase tracking-widest bg-black/40 backdrop-blur-md w-max px-3 py-1.5 rounded-full border border-white/10">
                                    <Star className="size-3 fill-yellow-400 text-yellow-400" />
                                    4.8 (120 đánh giá)
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* 2. CHỬ SỐ VẬN HÀNH NHANH (Metrics Operational Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                    { label: "Trạng thái vận hành", val: "Đang tuyển sinh", icon: Activity, bg: "bg-emerald-50 text-emerald-600", desc: "Tăng trưởng ổn định" },
                    { label: "Tổng số phân lớp", val: "5 lớp học", icon: Users, bg: "bg-blue-50 text-blue-600", desc: "3 lớp tối, 2 lớp cuối tuần" },
                    { label: "Khối lượng chương trình", val: "24 tiết học", icon: BookMarked, bg: "bg-purple-50 text-purple-600", desc: "Tương đương 48 giờ học" },
                    { label: "Doanh thu ước tính", val: "135.000.000₫", icon: TrendingUp, bg: "bg-orange-50 text-orange-600", desc: "Tính trên sĩ số hiện tại" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4 group hover:shadow-md transition-all">
                        <div className={cn("size-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105", stat.bg)}>
                            <stat.icon className="size-5" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-xl font-black text-gray-900 tracking-tight mt-0.5">{stat.val}</p>
                            <p className="text-[10px] text-gray-400 font-medium mt-0.5">{stat.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. TABS DATA SECTION (Trải rộng Full-width 100% màn hình) */}
            <div className="space-y-6">
                <Tabs defaultValue="classes" className="space-y-6">

                    {/* Thanh chọn Tab phẳng tinh gọn */}
                    <TabsList className="bg-transparent h-auto p-0 gap-8 border-b border-gray-200 w-full justify-start rounded-none">
                        {[
                            { value: "classes", label: "Lớp học phụ trách" },
                            { value: "teachers", label: "Đội ngũ giảng viên" },
                            { value: "resources", label: "Kho tài liệu" },
                        ].map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="bg-transparent border-b-2 border-transparent rounded-none px-0 pb-3 h-auto font-black text-xs uppercase tracking-[0.2em] text-gray-400 data-[state=active]:border-[var(--primary)] data-[state=active]:text-[var(--primary)] data-[state=active]:bg-transparent transition-all outline-none"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* TAB CONTENT: DANH SÁCH LỚP HỌC */}
                    <TabsContent value="classes" className="mt-0 outline-none">
                        <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Lớp học đang chạy</h3>
                                    <p className="text-gray-400 text-xs font-medium mt-0.5">Danh sách phân lớp nhỏ đang học giáo trình này.</p>
                                </div>
                                <Button className="rounded-xl font-black bg-gray-900 hover:bg-black h-10 px-5 text-white text-xs transition-all">
                                    <Plus className="size-4 mr-1.5" /> Khai giảng lớp mới
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="group p-5 rounded-2xl border-2 border-gray-50 hover:border-[var(--primary)]/20 hover:bg-blue-50/10 transition-all cursor-pointer bg-white shadow-sm flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="font-mono text-xs font-black text-[var(--primary)] bg-blue-50/50 px-2.5 py-1 rounded-lg border border-blue-100/50">
                                                    K0{i}
                                                </div>
                                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-wider border border-emerald-100">Đang mở</span>
                                            </div>
                                            <h4 className="font-black text-gray-900 tracking-tight group-hover:text-[var(--primary)] transition-colors">NEXTJS-PRO-K0{i}</h4>
                                            <p className="text-gray-400 text-xs font-bold mb-4">Thứ 2, 4, 6 • 19:30 - 21:30</p>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                                            <div className="flex items-center gap-2">
                                                <div className="flex -space-x-1.5">
                                                    {[1, 2, 3].map(s => <div key={s} className="size-5.5 rounded-full border-2 border-white bg-gray-200" />)}
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-400">12 học viên</span>
                                            </div>
                                            <ArrowUpRight className="size-4 text-gray-300 group-hover:text-[var(--primary)] transition-all" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    {/* TAB CONTENT: ĐỘI NGŨ GIẢNG VIÊN */}
                    <TabsContent value="teachers" className="mt-0 outline-none">
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-50">
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">Giảng viên đứng lớp</h3>
                                <p className="text-gray-400 text-xs font-medium mt-0.5">Nhân sự phụ trách chuyên môn được cấu hình lương dựa trên số tiết dạy thực tế.</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400 pl-6">Giảng viên</th>
                                            <th className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Chuyên môn nghiệp vụ</th>
                                            <th className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Lương cứng định biên</th>
                                            <th className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400 pl-6">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {teachers.map((t) => (
                                            <tr key={t.id} className="hover:bg-gray-50/20 transition-colors">
                                                <td className="p-4 pl-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-8.5 rounded-lg bg-blue-50 text-[var(--primary)] flex items-center justify-center font-black text-[11px]">
                                                            {t.name.split(" ").pop()?.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-xs text-gray-900">{t.name}</div>
                                                            <div className="text-[10px] font-mono text-gray-400 font-bold">{t.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-xs font-bold text-gray-600">
                                                    <div className="flex items-center gap-1"><Briefcase className="size-3 text-gray-400" /> {t.role}</div>
                                                </td>
                                                <td className="p-4 text-xs font-black text-gray-900">
                                                    {t.baseRate.toLocaleString('vi-VN')}₫
                                                </td>
                                                <td className="p-4 pl-6">
                                                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-tight inline-flex items-center gap-1">
                                                        <ShieldCheck className="size-3" /> Hoạt động
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabsContent>

                    {/* TAB CONTENT: KHO TÀI LIỆU */}
                    <TabsContent value="resources" className="mt-0 outline-none">
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 text-center py-12">
                            <BookOpen className="size-8 text-gray-300 mx-auto mb-3" />
                            <h4 className="font-black text-base text-gray-900 tracking-tight">Kho tài nguyên môn học</h4>
                            <p className="text-gray-400 text-xs font-medium mt-0.5 max-w-sm mx-auto">Tải lên bài tập, đề cương thiết kế hoặc slide bài giảng hệ thống.</p>
                            <Button variant="outline" className="mt-4 rounded-xl border-gray-200 font-bold text-xs h-9 px-4 bg-white hover:bg-gray-50">
                                Tải tệp tin (.zip, .pdf)
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

        </div>
    );
}