"use client";

import { BadgeLevel } from "@/components/common/badge-level";
import { Loading } from "@/components/common/loading";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetCourseById } from "@/queries/useCourseQuery";
import { cn } from "@/utils/cn";
import {
    Activity,
    ArrowLeft,
    BookMarked,
    Clock,
    TrendingUp,
    Users,
    Wallet
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CourseClassTab } from "./course-class-tab";
import { CourseProgressTab } from "./course-progress-tab";
import { CourseResourceTab } from "./course-resource-tab";
import { CourseTeacherTab } from "./course-teacher-tab";

export default function AdminCourseDetailPage() {
    const router = useRouter();
    const { id } = useParams() as { id: string };

    const { data: courseRes, isLoading } = useGetCourseById(id);
    const course = courseRes?.data;

    if (isLoading) {
        return <Loading message="Đang tải chi tiết khóa học..." />;
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] p-6 sm:p-10 flex items-center justify-center font-sans">
                <div className="text-center space-y-4">
                    <p className="text-sm font-bold text-gray-500">Không tìm thấy thông tin khóa học.</p>
                    <Button onClick={() => router.back()} className="rounded-xl font-bold bg-gray-900 text-white text-xs h-10 px-5">
                        Quay lại
                    </Button>
                </div>
            </div>
        );
    }

    const courseImage = course.image || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop";

    return (
        <div data-role="admin" className="min-h-screen px-6 font-sans text-gray-900">

            {/* TOP NAVIGATION CONTROL BAR */}
            <div className="flex items-center justify-between gap-4 mb-8">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-all group"
                >
                    <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Quản lý khóa học</span>
                </button>
            </div>

            {/* 1. HERO SECTION (Split Layout: Trái thông tin - Phải hình ảnh) */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-6 sm:p-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                    <div className="lg:col-span-7 space-y-5">
                        <div className="flex items-center gap-3">
                            <BadgeLevel level={course.level || "A0"} className="px-4 py-1 rounded-full  border-none text-xs font-black uppercase" />
                            <span className="text-[11px] font-mono font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-xl border border-gray-100">
                                ID: {course.courseId}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter leading-tight">
                            {course.courseName}
                        </h1>

                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-medium max-w-3xl">
                            {course.description || "Chưa có mô tả chi tiết cho khóa học này."}
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
                                src={courseImage}
                                alt={course.courseName}
                                className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-103"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>
                    </div>

                </div>
            </div>

            {/* 2. CHỬ SỐ VẬN HÀNH NHANH (Metrics Operational Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                    { label: "Trạng thái vận hành", val: "Đang tuyển sinh", icon: Activity, bg: "bg-emerald-50 text-emerald-600", desc: "Tăng trưởng ổn định" },
                    { label: "Tổng số phân lớp", val: `${course.totalClasses || 0} lớp học`, icon: Users, bg: "bg-blue-50 text-blue-600", desc: "Đang hoạt động" },
                    { label: "Khối lượng chương trình", val: `${course.totalSessions} tiết học`, icon: BookMarked, bg: "bg-purple-50 text-purple-600", desc: `Tương đương ${course.totalSessions * 2} giờ học` },
                    { label: "Doanh thu ước tính", val: `${(course.estimatedRevenue || 0).toLocaleString('vi-VN')}₫`, icon: TrendingUp, bg: "bg-orange-50 text-orange-600", desc: "Tính trên sĩ số hiện tại" },
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
                            { value: "progress", label: "Tiến độ học viên" },
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
                        <CourseClassTab courseId={course.courseId!} />
                    </TabsContent>

                    {/* TAB CONTENT: ĐỘI NGŨ GIẢNG VIÊN */}
                    <TabsContent value="teachers" className="mt-0 outline-none">
                        <CourseTeacherTab courseId={course.courseId!} />
                    </TabsContent>

                    {/* TAB CONTENT: KHO TÀI LIỆU */}
                    <TabsContent value="resources" className="mt-0 outline-none">
                        <CourseResourceTab courseId={course.courseId!} />
                    </TabsContent>

                    {/* TAB CONTENT: TIẾN ĐỘ HỌC VIÊN */}
                    <TabsContent value="progress" className="mt-0 outline-none">
                        <CourseProgressTab courseId={course.courseId!} />
                    </TabsContent>
                </Tabs>
            </div>

        </div>
    );
}