"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FeedbackCard } from "@/components/common/feedback-card";
import { Loading } from "@/components/common/loading";
import { UserAvatar } from "@/components/common/user-avatar";
import { useGetCourseById } from "@/queries/useCourseQuery";
import { useGetClassesByCourseId } from "@/queries/useClassQuery";
import { useGetFeedbacks, useGetFeedbacksByClass } from "@/queries/useFeedbackQuery";
import { useGetScheduleSessionsByClass } from "@/queries/useScheduleSessionQuery";
import { useCreateInvoice } from "@/queries/usePaymentQuery";
import { ScheduleSessionSortBy, SortOrder } from "@/constants/sort";
import { ClassSessionStatus } from "@/constants/type";
import { ScheduleSession } from "@/schemas/schedule-session.schema";
import { cn } from "@/utils/cn";
import {
    BookOpen,
    Calendar,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock,
    Copy,
    ExternalLink,
    Globe,
    Sparkle,
    Star,
    User,
    Users,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import { levelLabels } from "@/constants/label";
import { formatCurrency } from "@/utils/format";


interface PaymentResult {
    bin: string;
    accountNumber: string;
    accountName: string;
    amount: number;
    description: string;
    orderCode: number;
    currency: string;
    paymentLinkId: string;
    status: string;
    expiredAt: string | null;
    checkoutUrl: string;
    qrCode: string;
}

export default function CourseDetailV2Page() {
    const { id } = useParams() as { id: string };
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
    const [feedbackClassId, setFeedbackClassId] = useState<string | "all">("all");
    const [feedbackStarRating, setFeedbackStarRating] = useState<number | 0>(0);

    const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);

    const createInvoice = useCreateInvoice();

    const { data: courseRes, isLoading: courseLoading } = useGetCourseById(id);
    const course = courseRes?.data;

    const { data: classesRes } = useGetClassesByCourseId(id, { page: 1, limit: 50 });
    const classes = classesRes?.data || [];

    const isAllClasses = feedbackClassId === "all";
    const { data: feedbacksAllRes } = useGetFeedbacks(
        isAllClasses ? { page: 1, limit: 20, sortOrder: SortOrder.DESC, sortBy: "createdAt", starRating: feedbackStarRating || undefined } : undefined,
    );
    const { data: feedbacksByClassRes } = useGetFeedbacksByClass(
        feedbackClassId,
        feedbackClassId !== "all" ? { page: 1, limit: 20, sortOrder: SortOrder.DESC, sortBy: "createdAt" } : undefined,
    );
    const rawFeedbacks = isAllClasses ? (feedbacksAllRes?.data || []) : (feedbacksByClassRes?.data || []);
    const feedbacks = feedbackStarRating
        ? rawFeedbacks.filter((fb: any) => fb.starRating === feedbackStarRating)
        : rawFeedbacks;

    const { data: sessionsRes } = useGetScheduleSessionsByClass(selectedClassId || "", {
        page: 1,
        limit: 100,
        sortOrder: SortOrder.ASC,
        sortBy: ScheduleSessionSortBy.STUDY_DATE,
    });
    const sessions = sessionsRes?.data || [];

    const uniqueTeachers = useMemo(() => {
        const seen = new Set<string>();
        return (classes as any[]).filter((cls: any) => {
            if (!cls.teacher?.teacherId || seen.has(cls.teacher.teacherId)) return false;
            seen.add(cls.teacher.teacherId);
            return true;
        }).map((cls: any) => cls.teacher);
    }, [classes]);

    if (courseLoading) {
        return <Loading message="Đang tải thông tin khóa học..." />;
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-[var(--dashboard-bg)] flex items-center justify-center font-sans">
                <div className="text-center space-y-4">
                    <BookOpen className="size-12 text-gray-300 mx-auto" />
                    <p className="font-bold text-gray-500">Không tìm thấy khóa học.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--dashboard-bg)] pb-20 font-sans">
            {/* HERO BANNER */}
            <section className="relative bg-[var(--primary)] text-white py-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-20 pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 size-96 bg-[var(--secondary)] rounded-full blur-[120px] opacity-10" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12">
                        <div className="max-w-3xl space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <Sparkle className="size-4 text-[var(--secondary)]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                    {course.level ? `Trình độ ${course.level}` : "Khóa học"}
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                                {course.courseName}
                            </h1>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center">
                                        <BookOpen className="size-5 text-[var(--secondary)]" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-black leading-none">{course.totalSessions}</div>
                                        <div className="text-[10px] font-bold text-white/50 uppercase">Buổi học</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center">
                                        <Users className="size-5 text-[var(--secondary)]" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-black leading-none">{course.totalClasses || 0}</div>
                                        <div className="text-[10px] font-bold text-white/50 uppercase">Lớp mở</div>
                                    </div>
                                </div>
                                {course.level && (
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center">
                                            <Globe className="size-5 text-[var(--secondary)]" />
                                        </div>
                                        <div>
                                            <div className="text-xl font-black leading-none">{levelLabels[course.level] || course.level}</div>
                                            <div className="text-[10px] font-bold text-white/50 uppercase">Trình độ</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Floating Pricing Card */}
                        <div className="bg-white p-8 rounded-[3rem] shadow-2xl min-w-[320px] text-gray-900 relative">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Học phí</div>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-4xl font-black text-[var(--primary)]">
                                    {formatCurrency(course.tuitionFee)}
                                </span>
                            </div>
                            <Button onClick={() => document.getElementById("lich-khai-giang")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="w-full h-16 rounded-2xl bg-[var(--primary)] text-white font-black text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-blue-200">
                                Đăng ký ngay
                            </Button>
                            <p className="text-[10px] text-center mt-4 font-bold text-gray-400">Cam kết hoàn tiền nếu không đạt đầu ra</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <div className="container mx-auto px-6 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-5">

                        {/* Tổng quan khóa học */}
                        <section className="bg-white p-10 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                                    <BookOpen className="size-7 text-[var(--primary)]" />
                                </div>
                                <h2 className="text-3xl font-black tracking-tight text-gray-900">Tổng quan khóa học</h2>
                            </div>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                {course.description || "Chưa có mô tả cho khóa học này."}
                            </p>
                        </section>

                        {/* Giá trị nhận được */}
                        <section className="bg-white p-10 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                                    <Sparkle className="size-7 text-[var(--primary)]" />
                                </div>
                                <h2 className="text-3xl font-black tracking-tight text-gray-900">Giá trị nhận được</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                {[
                                    "Lộ trình học chuẩn hóa theo khung năng lực",
                                    "Tài liệu độc quyền cập nhật liên tục",
                                    "Giảng viên giàu kinh nghiệm, tận tâm",
                                    "Hệ thống LMS theo dõi tiến độ chi tiết",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="size-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-colors duration-300">
                                            <CheckCircle2 className="size-4 text-green-600 group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="font-bold text-gray-700 leading-tight">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white p-10 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                <div className="flex items-center gap-4">
                                    <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <Users className="size-7 text-[var(--primary)]" />
                                    </div>
                                    <h2 className="text-3xl font-black tracking-tight text-gray-900">Đối tượng tham gia</h2>
                                </div>

                                <p className="text-gray-400 font-bold text-sm max-w-xs italic md:text-right">
                                    Khóa học được tinh chỉnh để phù hợp với nhiều nhu cầu khác nhau.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { title: "Sinh viên", desc: "Cần TOEIC để xét tốt nghiệp.", icon: BookOpen, bg: "bg-blue-50", color: "text-blue-600" },
                                    { title: "Người đi làm", desc: "Muốn thăng tiến quốc tế.", icon: Globe, bg: "bg-purple-50", color: "text-purple-600" },
                                    { title: "Mất gốc", desc: "Bắt đầu lại từ con số 0.", icon: Star, bg: "bg-orange-50", color: "text-orange-600" }
                                ].map((item, i) => (
                                    <div key={i} className="group p-8 rounded-[2.5rem] bg-gray-50/50 border border-transparent hover:border-[var(--primary)]/20 hover:bg-white hover:shadow-xl transition-all duration-500">
                                        <div className={`size-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                                            <item.icon className="size-6" />
                                        </div>
                                        <h3 className="text-lg font-black text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-xs text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Đội ngũ giảng viên */}
                        {uniqueTeachers.length > 0 && (
                            <section className="bg-white p-10 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <Users className="size-7 text-primary" />
                                    </div>
                                    <h2 className="text-3xl font-black tracking-tight text-gray-900">Đội ngũ giảng viên</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {uniqueTeachers.map((teacher: any) => (
                                        <div key={teacher.teacherId} className="flex items-center gap-4 p-6 rounded-[2rem] bg-gray-50/50 border border-transparent hover:border-purple-200 hover:bg-white hover:shadow-lg transition-all duration-300">
                                            <UserAvatar
                                                avatarUrl={teacher.profile?.avatarUrl}
                                                fullName={teacher.profile?.fullName}
                                                className="size-16 text-base"
                                            />
                                            <div className="min-w-0">
                                                <p className="font-black text-gray-900 text-base truncate">{teacher.profile?.fullName || "Giảng viên"}</p>                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Lịch khai giảng */}
                        <section id="lich-khai-giang" className="bg-white p-10 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="size-14 rounded-2xl bg-orange-50 flex items-center justify-center">
                                    <Calendar className="size-7 text-orange-500" />
                                </div>
                                <h2 className="text-3xl font-black tracking-tight text-gray-900">Lịch khai giảng</h2>
                            </div>

                            {classes.length === 0 ? (
                                <div className="text-center py-10">
                                    <Calendar className="size-10 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500 font-bold">Chưa có lớp khai giảng cho khóa học này.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50">
                                                <th className="pb-5 text-left">Lớp học</th>
                                                <th className="pb-5 text-left">Giáo viên</th>
                                                <th className="pb-5 text-left">Lịch học</th>
                                                <th className="pb-5 text-center">Sĩ số</th>
                                                <th className="pb-5 text-center">Ngày khai giảng</th>
                                                <th className="pb-5 text-center">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {classes.map((cls: any) => (
                                                <tr key={cls.classId} className="group hover:bg-gray-50/40 transition-colors">
                                                    <td className="py-5">
                                                        <div className="font-black text-gray-900">{cls.roomCode}</div>
                                                        <div className="text-[10px] text-gray-400 font-bold uppercase">
                                                            {cls.scheduleTemplate?.templateName || "---"}
                                                        </div>
                                                    </td>
                                                    <td className="py-5">
                                                        <div className="flex items-center gap-2">
                                                            <UserAvatar
                                                                avatarUrl={cls.teacher?.profile?.avatarUrl}
                                                                fullName={cls.teacher?.profile?.fullName}
                                                                className="size-8 text-[10px]"
                                                            />
                                                            <span className="font-bold text-gray-700 text-sm">
                                                                {cls.teacher?.profile?.fullName || "Chưa cập nhật"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-5">
                                                        <div className="font-bold text-gray-700 text-sm">
                                                            {cls.scheduleTemplate?.weekdays || "---"}
                                                        </div>
                                                        <div className="text-[10px] text-gray-400 font-bold uppercase">
                                                            {cls.scheduleTemplate?.shiftCode || ""}
                                                        </div>
                                                    </td>
                                                    <td className="py-5 text-center">
                                                        <span className="font-black text-gray-900">
                                                            {cls.registeredStudents || 0}/{cls.maxStudents}
                                                        </span>
                                                        <div className="h-1.5 w-16 bg-gray-100 rounded-full mx-auto mt-1 overflow-hidden">
                                                            <div
                                                                className="h-full bg-primary rounded-full"
                                                                style={{ width: `${Math.min(100, ((cls.registeredStudents || 0) / cls.maxStudents) * 100)}%` }}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="py-5 text-center">
                                                        <span className="text-sm font-bold text-gray-600">
                                                            {cls.startDate ? new Date(cls.startDate).toLocaleDateString("vi-VN") : "---"}
                                                        </span>
                                                    </td>
                                                    <td className="py-5 text-center">
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                onClick={() => setSelectedClassId(cls.classId)}
                                                                className="rounded-xl text-[10px] font-black uppercase tracking-widest bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all h-10 px-5"
                                                            >
                                                                Xem lịch học
                                                            </Button>
                                                            <Button
                                                                onClick={() => createInvoice.mutate(
                                                                    { classId: cls.classId },
                                                                    {
                                                            onSuccess: (res) => {
                                                                            if (res?.data?.data) {
                                                                                setPaymentResult(res.data.data as PaymentResult);
                                                                                setShowPaymentDialog(true);
                                                                            }
                                                                        },
                                                                    },
                                                                )}
                                                                disabled={createInvoice.isPending}
                                                                className="rounded-xl text-[10px] font-black uppercase tracking-widest bg-primary text-white hover:bg-primary/90 transition-all h-10 px-5"
                                                            >
                                                                {createInvoice.isPending ? "Đang xử lý..." : "Đăng ký học"}
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>

                        {/* Đánh giá từ học viên */}
                        <section className="bg-white p-10 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="size-14 rounded-2xl bg-orange-50 flex items-center justify-center">
                                        <Star className="size-7 text-orange-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tight text-gray-900">Học viên đánh giá</h2>
                                        <p className="text-xs text-gray-400 font-medium mt-0.5">Phản hồi từ học viên đã tham gia khóa học</p>
                                    </div>
                                </div>

                                {classes.length > 0 && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lớp:</label>
                                            <Select value={feedbackClassId} onValueChange={(val) => setFeedbackClassId(val)}>
                                                <SelectTrigger className="h-10 w-[200px] rounded-xl border-gray-200 bg-white text-xs font-bold text-gray-700 shadow-sm">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl">
                                                    <SelectItem value="all" className="rounded-lg text-xs font-medium">Tất cả lớp</SelectItem>
                                                    {classes.map((cls: any) => (
                                                        <SelectItem key={cls.classId} value={cls.classId} className="rounded-lg text-xs font-medium">
                                                            {cls.roomCode} — {cls.scheduleTemplate?.weekdays || ""}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Đánh giá:</label>
                                            <Select value={String(feedbackStarRating)} onValueChange={(val) => setFeedbackStarRating(Number(val))}>
                                                <SelectTrigger className="h-10 w-[120px] rounded-xl border-gray-200 bg-white text-xs font-bold text-gray-700 shadow-sm">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl">
                                                    <SelectItem value="0" className="rounded-lg text-xs font-medium">Tất cả</SelectItem>
                                                    {[5, 4, 3, 2, 1].map((star) => (
                                                        <SelectItem key={star} value={String(star)} className="rounded-lg text-xs font-medium">
                                                            {star} sao
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {feedbacks.length === 0 ? (
                                <div className="text-center py-10">
                                    <Star className="size-10 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500 font-bold">Chưa có đánh giá nào.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {feedbacks.map((fb: any) => {
                                        const studentName = fb.student?.profile?.fullName || fb.studentId?.substring(0, 8) || "Học viên";
                                        const target = fb.class?.course?.courseName || "---";
                                        return (
                                            <FeedbackCard
                                                key={fb.feedbackId}
                                                studentName={studentName}
                                                avatarUrl={fb.student?.profile?.avatarUrl}
                                                gender={fb.student?.profile?.gender}
                                                target={target}
                                                content={fb.content}
                                                starRating={fb.starRating}
                                                createdAt={fb.createdAt}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    </div>

                    {/* SIDEBAR */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-xl shadow-gray-50 group">
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    alt={course.courseName}
                                />
                                {course.level && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                        <span className="bg-[var(--secondary)] text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                                            {levelLabels[course.level] || course.level}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thời lượng</div>
                                        <div className="flex items-center gap-2 font-black text-gray-900">
                                            <Clock className="size-4 text-[var(--primary)]" /> {course.totalSessions} Buổi
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Trình độ</div>
                                        <div className="flex items-center gap-2 font-black text-gray-900">
                                            <Globe className="size-4 text-[var(--primary)]" /> {course.level || "---"}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lớp học</div>
                                        <div className="flex items-center gap-2 font-black text-gray-900">
                                            <BookOpen className="size-4 text-[var(--primary)]" /> {course.totalClasses || 0}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Học phí</div>
                                        <div className="flex items-center gap-2 font-black text-[var(--primary)]">
                                            <span>{formatCurrency(course.tuitionFee)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-dashed border-gray-100">
                                    <div className="flex items-center justify-between text-sm font-bold">
                                        <span className="text-gray-400">Hình thức học:</span>
                                        <span className="text-[var(--primary)]">Offline tại trung tâm</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* First teacher from classes */}
                        {classes.length > 0 && classes[0].teacher && (
                            <div className="bg-white rounded-[3rem] border border-gray-100 p-10 shadow-xl shadow-gray-50 text-center relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-2 bg-[var(--primary)]" />
                                <div className="size-28 mb-6 mx-auto group-hover:scale-105 transition-transform duration-500">
                                    <UserAvatar
                                        avatarUrl={classes[0].teacher.profile?.avatarUrl}
                                        fullName={classes[0].teacher.profile?.fullName}
                                        className="size-28 rounded-[2rem] border-4 border-white shadow-2xl"
                                    />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 leading-none mb-2">
                                    {classes[0].teacher.profile?.fullName || "Giáo viên"}
                                </h3>
                                <p className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest mb-6 px-4 py-1 bg-blue-50 rounded-full inline-block">
                                    {classes[0].teacher.teacherCode || "Giảng viên"}
                                </p>
                                <p className="text-sm text-gray-500 font-bold italic leading-relaxed">
                                    Giảng viên giàu kinh nghiệm, tận tâm với học viên.
                                </p>
                            </div>
                        )}

                        <div className="bg-[var(--primary)] rounded-[3rem] p-10 text-white space-y-6">
                            <h4 className="text-xl font-black leading-tight">Tại sao chọn <br /> chúng tôi?</h4>
                            <div className="space-y-4">
                                {[
                                    { icon: Clock, text: "Học lại miễn phí" },
                                    { icon: Globe, text: "Tài liệu độc quyền" },
                                    { icon: Users, text: "Sĩ số tối đa 15" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center">
                                            <item.icon className="size-5 text-[var(--secondary)]" />
                                        </div>
                                        <span className="text-sm font-bold">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SESSION CALENDAR DIALOG */}
            <Dialog open={!!selectedClassId} onOpenChange={(open) => { if (!open) setSelectedClassId(null); }}>
                <DialogContent className="sm:max-w-[700px] rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans">
                    <DialogHeader className="p-8 bg-white border-b border-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="size-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                                <Calendar className="size-6 text-orange-500" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-black text-gray-900 tracking-tight">
                                    Lịch học chi tiết
                                </DialogTitle>
                                <p className="text-xs text-gray-400 font-medium mt-0.5">
                                    {selectedClassId && (
                                        <span>Lớp: {classes.find((c: any) => c.classId === selectedClassId)?.roomCode}</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="p-8 max-h-[500px] overflow-y-auto">
                        {sessions.length === 0 ? (
                            <div className="text-center py-10">
                                <Calendar className="size-10 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 font-bold">Chưa có lịch học nào.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {sessions.map((session: any, idx: number) => (
                                    <div
                                        key={session.sessionId || idx}
                                        className="flex items-center gap-5 p-5 rounded-2xl border border-gray-100 bg-gray-50/40 hover:bg-white hover:border-primary/20 hover:shadow-md transition-all"
                                    >
                                        {/* Date column */}
                                        <div className="flex flex-col items-center min-w-[60px]">
                                            <span className="text-[9px] font-black text-gray-400 uppercase">
                                                {new Date(session.studyDate).toLocaleDateString("vi-VN", { month: "short" })}
                                            </span>
                                            <span className="text-2xl font-black text-gray-900 leading-tight">
                                                {new Date(session.studyDate).getDate()}
                                            </span>
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-black text-gray-900 uppercase">
                                                    Buổi #{idx + 1}
                                                </span>
                                                <Badge className={cn(
                                                    "border-none font-black text-[9px] uppercase px-2.5 py-0.5 rounded-full",
                                                    session.status === ClassSessionStatus.ENDED
                                                        ? "bg-emerald-50 text-emerald-600"
                                                        : session.status === ClassSessionStatus.IN_PROGRESS
                                                            ? "bg-blue-50 text-blue-600"
                                                            : "bg-gray-100 text-gray-500"
                                                )}>
                                                    {session.status === ClassSessionStatus.ENDED ? "Đã học"
                                                        : session.status === ClassSessionStatus.IN_PROGRESS ? "Đang học"
                                                            : "Sắp tới"}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="size-3.5" />
                                                    {session.shift?.timeRange || session.shiftCode}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <User className="size-3.5" />
                                                    {session.class?.room?.roomCode || "---"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* PAYMENT DIALOG */}
            <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                <DialogContent className="sm:max-w-[480px] rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans">
                    <div className="bg-gradient-to-br from-[var(--primary)] to-blue-700 p-8 text-white text-center">
                        <div className="size-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="size-8" />
                        </div>
                        <h2 className="text-2xl font-black tracking-tight">Thanh toán học phí</h2>
                        <p className="text-sm text-white/70 font-medium mt-1">
                            Mã đơn: <span className="font-black text-white">#{paymentResult?.orderCode}</span>
                        </p>
                    </div>

                    <div className="p-8 space-y-6">
                        {/* QR Code */}
                        {paymentResult?.qrCode && (
                            <div className="flex justify-center">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(paymentResult.qrCode)}`}
                                    alt="QR thanh toán"
                                    className="rounded-2xl shadow-md"
                                />
                            </div>
                        )}

                        {/* Amount */}
                        <div className="text-center">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Số tiền</div>
                            <div className="text-4xl font-black text-[var(--primary)]">
                                {formatCurrency(paymentResult?.amount || 0)}
                            </div>
                        </div>

                        {/* Bank Info */}
                        <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                            <BankInfoRow
                                label="Ngân hàng"
                                value="Ngân hàng TMCP Quân Đội (MB Bank)"
                            />
                            <BankInfoRow
                                label="Số tài khoản"
                                value={paymentResult?.accountNumber || ""}
                                copyable
                            />
                            <BankInfoRow
                                label="Chủ tài khoản"
                                value={paymentResult?.accountName || ""}
                            />
                            <BankInfoRow
                                label="Nội dung"
                                value={paymentResult?.description || ""}
                                copyable
                            />
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <Button
                                onClick={() => { window.open(paymentResult?.checkoutUrl, "_blank"); }}
                                className="w-full h-14 rounded-2xl bg-[var(--primary)] text-white font-black text-base hover:scale-[1.01] transition-transform shadow-xl shadow-blue-200 gap-2"
                            >
                                <ExternalLink className="size-5" />
                                Thanh toán trực tuyến
                            </Button>
                            <p className="text-[11px] text-center font-bold text-gray-400">
                                Hoặc quét mã QR bằng ứng dụng ngân hàng để chuyển khoản
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function BankInfoRow({ label, value, copyable }: { label: string; value: string; copyable?: boolean }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [value]);
    return (
        <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider shrink-0">{label}</span>
            <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900 text-right">{value}</span>
                {copyable && (
                    <button onClick={handleCopy} className="shrink-0 text-gray-400 hover:text-[var(--primary)] transition-colors">
                        <Copy className="size-4" />
                        {copied && <span className="text-[9px] text-green-600 font-black ml-1">Đã sao chép</span>}
                    </button>
                )}
            </div>
        </div>
    );
}
