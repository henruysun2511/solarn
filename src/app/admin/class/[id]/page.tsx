"use client";

import { BadgeLevel } from "@/components/common/badge-level";
import { Loading } from "@/components/common/loading";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetClassById } from "@/queries/useClassQuery";
import { cn } from "@/utils/cn";
import {
    Activity,
    ArrowLeft,
    BookMarked,
    Clock,
    TrendingUp,
    Users,
    Wallet,
    MapPin,
    Calendar as CalendarIcon,
    Settings,
    User
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ClassScheduleTab } from "./class-schedule-tab";
import { ClassStudentTab } from "./class-student-tab";
import { ClassRequestTab } from "./class-request-tab";
import { ClassFeedbackTab } from "./class-feedback-tab";
import { UserAvatar } from "@/components/common/user-avatar";


export default function AdminClassDetailPage() {
    const router = useRouter();
    const { id } = useParams() as { id: string };

    const { data: classRes, isLoading } = useGetClassById(id);
    const classData = classRes?.data;

    if (isLoading) {
        return <Loading message="Đang tải chi tiết lớp học..." />;
    }

    if (!classData) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] p-6 sm:p-10 flex items-center justify-center font-sans">
                <div className="text-center space-y-4">
                    <p className="text-sm font-bold text-gray-500">Không tìm thấy thông tin lớp học.</p>
                    <Button onClick={() => router.back()} className="rounded-xl font-bold bg-gray-900 text-white text-xs h-10 px-5">
                        Quay lại
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div data-role="admin" className="space-y-8 pb-10 min-h-screen">
            {/* TOP NAVIGATION CONTROL BAR */}
            <div className="flex items-center justify-between gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-all group"
                >
                    <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Quản lý lớp học</span>
                </button>
            </div>

            {/* 1. TOP SECTION: THÔNG TIN LỚP HỌC */}
            <section className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 size-64 bg-primary opacity-[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{classData.classId}</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-gray-900 leading-tight">
                            Lớp học
                        </h1>
                        <p className="text-sm font-bold text-gray-400 italic">Khóa học: {classData.course.courseName}</p>
                        <p className="text-sm font-bold text-gray-400 italic">Lịch học: Thứ {classData.scheduleTemplate?.weekdays}</p>
                    </div>

                    {/* <div className="flex gap-3">
                        <Button variant="outline" className="rounded-2xl font-bold h-12 border-gray-200">
                            <Settings className="size-4 mr-2" /> Cấu hình lớp
                        </Button>
                        <Button className="rounded-2xl bg-primary text-white font-black h-12 px-6">
                            Điểm danh nhanh
                        </Button>
                    </div> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 pt-8 border-t border-dashed border-gray-100">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Giảng viên</p>
                        <div className="flex items-center gap-3">
                            <UserAvatar
                                avatarUrl={classData.teacher?.profile?.avatarUrl}
                                fullName={classData.teacher?.profile?.fullName || "Chưa cập nhật"}
                            />
                            <span className="font-bold text-gray-700">{classData.teacher?.profile?.fullName || "Chưa cập nhật"}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phòng học</p>
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 text-orange-500">
                                <MapPin className="size-5" />
                            </div>
                            <span className="font-bold text-gray-700">{classData.roomCode}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Khởi tạo / Bắt đầu</p>
                        <div className="flex items-center gap-3 font-bold text-gray-700">
                            <CalendarIcon className="size-5 text-gray-400" />
                            <span>{new Date(classData.startDate).toLocaleDateString("vi-VN")}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sĩ số lớp</p>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-black">
                                <span>{classData.registeredStudents || 0}/{classData.maxStudents} Học viên</span>
                                <span className="text-emerald-500">
                                    {Math.round(((classData.registeredStudents || 0) / classData.maxStudents) * 100)}%
                                </span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${Math.round(((classData.registeredStudents || 0) / classData.maxStudents) * 100)}%` }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {[
                    { label: "Tổng số học viên", val: `${classData.registeredStudents || 0} học viên`, icon: Users, bg: "bg-blue-50 text-blue-600" },
                    { label: "Số buổi đã dạy", val: `${classData.endedSessions || 0} buổi học`, icon: BookMarked, bg: "bg-purple-50 text-purple-600" },
                    { label: "Tỉ lệ vắng mặt", val: `${(classData.averageAttendanceRate || 0)} %`, icon: TrendingUp, bg: "bg-orange-50 text-orange-600" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4 group hover:shadow-md transition-all">
                        <div className={cn("size-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105", stat.bg)}>
                            <stat.icon className="size-5" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-xl font-black text-gray-900 tracking-tight mt-0.5">{stat.val}</p>                        </div>
                    </div>
                ))}
            </div>


            {/* 3. TABS DATA SECTION */}
            <div className="space-y-6">
                <Tabs defaultValue="schedule" className="space-y-6">
                    <TabsList className="bg-transparent h-auto p-0 gap-8 border-b border-gray-200 w-full justify-start rounded-none">
                        {[
                            { value: "schedule", label: "Lịch học" },
                            { value: "students", label: "Danh sách học sinh" },
                            { value: "requests", label: "Danh sách yêu cầu" },
                            { value: "feedbacks", label: "Đánh giá" },
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

                    <TabsContent value="schedule" className="mt-0 outline-none">
                        <ClassScheduleTab classId={classData.classId!} />
                    </TabsContent>

                    <TabsContent value="students" className="mt-0 outline-none">
                        <ClassStudentTab classId={classData.classId!} />
                    </TabsContent>

                    <TabsContent value="requests" className="mt-0 outline-none">
                        <ClassRequestTab classId={classData.classId!} />
                    </TabsContent>

                    <TabsContent value="feedbacks" className="mt-0 outline-none">
                        <ClassFeedbackTab classId={classData.classId!} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}