"use client";

import { InfoItem } from "@/components/common/info-item";
import { UserAvatar } from "@/components/common/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGetMyStudentProfile } from "@/queries/useStudentQuery";
import { useGetStudentDashboard } from "@/queries/useDashboardQuery";
import { useGetMyStudentProgress } from "@/queries/useCourseQuery";
import { formatCurrency, formatDate } from "@/utils/format";
import { genderLabel } from "@/constants/label";
import {
    BookOpen,
    Calendar,
    CalendarDays,
    CheckCircle2,
    Clock,
    Crown,
    Edit3,
    GraduationCap,
    Loader2,
    LogOut,
    Mail,
    Phone,
    TrendingUp,
    User,
    Users,
} from "lucide-react";
import { useState } from "react";
import { ProfileDialog } from "./profile-dialog";
import {
    Bar,
    BarChart,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

export default function StudentOverviewPage() {
    const { data: profileData, isLoading: profileLoading } = useGetMyStudentProfile();
    const { data: dashData, isLoading: dashLoading } = useGetStudentDashboard();
    const { data: progressData } = useGetMyStudentProgress();
    const [dialogOpen, setDialogOpen] = useState(false);

    const student = profileData?.data;
    const dashboard = dashData?.data;
    const progressList = Array.isArray(progressData) ? progressData : [];

    if (profileLoading || dashLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="size-8 animate-spin text-[var(--primary)]" />
            </div>
        );
    }

    const profile = student?.profile;
    const fullName = profile?.fullName || "Chưa cập nhật";
    const parts = fullName.trim().split(/\s+/);
    const lastName = parts.pop() || "";
    const firstName = parts.join(" ");

    const scoreChartData = dashboard ? [
        { name: "Đi học", total: dashboard.totalAttended, color: "var(--primary)" },
        { name: "Vắng", total: dashboard.totalAbsent, color: "#ef4444" },
    ] : [];

    return (
        <div className="space-y-8">
            {/* WELCOME BANNER */}
            <div className="space-y-8 pb-4">
                <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-[var(--sidebar-border)] relative overflow-hidden group">
                    <div className="flex flex-col xl:flex-row items-center xl:items-start gap-10 relative z-10">
                        <div className="flex flex-col items-center gap-6">
                            <div className="relative group/avatar">
                                <div className="size-44 md:size-52 !rounded-full bg-[var(--accent)] border-4 border-[var(--primary)]/10 overflow-hidden shadow-2xl transition-transform group-hover/avatar:scale-105 duration-500">
                                    <UserAvatar
                                        avatarUrl={profile?.avatarUrl}
                                        fullName={fullName}
                                        gender={profile?.gender}
                                        className="size-44 md:size-52 w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 space-y-8 w-full">
                            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 text-center md:text-left">
                                <div className="space-y-2">
                                    <h1 className="text-4xl md:text-5xl font-black text-[var(--foreground)] tracking-tighter">
                                        {firstName} <span className="text-[var(--primary)]">{lastName}</span>
                                    </h1>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                        <Badge className="bg-[var(--accent)] text-[var(--primary)] border-none font-black rounded-full px-4 py-1">
                                            Mã HS: {student?.studentCode}
                                        </Badge>
                                        {(dashboard?.pendingLeaveRequests ?? 0) > 0 && (
                                            <Badge className="bg-amber-100 text-amber-700 border-none font-black rounded-full px-4 py-1">
                                                <LogOut className="size-3 mr-1" />
                                                {dashboard.pendingLeaveRequests} đơn nghỉ
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <Button
                                    onClick={() => setDialogOpen(true)}
                                    className="w-[100px] rounded-2xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 font-black h-12 shadow-lg shadow-[var(--primary)]/20"
                                >
                                    <Edit3 className="size-4 mr-2" /> Sửa
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <InfoItem icon={User} label="Giới tính" value={profile?.gender ? genderLabel[profile.gender] : "Chưa cập nhật"} />
                                <InfoItem icon={CalendarDays} label="Ngày sinh" value={profile?.dob ? formatDate(profile.dob) : "Chưa cập nhật"} />
                                <InfoItem icon={Phone} label="Điện thoại" value={profile?.phone || "Chưa cập nhật"} />
                                <InfoItem icon={Mail} label="Email" value={profile?.email || "Chưa cập nhật"} />
                                <InfoItem icon={BookOpen} label="Lớp đang học" value={`${dashboard?.totalClasses ?? 0} lớp`} />
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[var(--accent)] rounded-full blur-3xl opacity-40 -z-0" />
                </div>
            </div>

            {/* COURSE PROGRESS LIST */}
            {progressList.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-2">
                        <div className="w-1.5 h-6 bg-[var(--primary)] rounded-full" />
                        <h2 className="font-black text-lg tracking-tight">Tiến độ học tập</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {progressList.map((item: any) => (
                            <Card key={item.classId} className="rounded-[2rem] border-[var(--sidebar-border)] shadow-sm hover:shadow-md transition-all bg-white overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h4 className="font-black text-base text-slate-800">{item.courseName}</h4>
                                            <p className="text-xs font-bold text-slate-400 mt-0.5">{item.roomCode}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-[var(--primary)]">{item.progressPercent}%</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">tiến độ</p>
                                        </div>
                                    </div>
                                    <Progress value={item.progressPercent} className="h-2 bg-slate-100" />
                                    <div className="flex items-center justify-between mt-4 text-xs font-bold text-slate-500">
                                        <span className="flex items-center gap-1"><CheckCircle2 className="size-3.5 text-green-500" /> {item.attendedSessions} có mặt</span>
                                        <span className="flex items-center gap-1"><Clock className="size-3.5 text-orange-400" /> {item.unmarkedSessions} chưa điểm danh</span>
                                        <span className="flex items-center gap-1"><Calendar className="size-3.5 text-slate-400" /> {item.endedSessions}/{item.totalSessions} buổi</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* KEY METRICS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: "Lớp đang học", value: dashboard?.totalClasses ?? 0, color: "text-[var(--primary)]", bg: "bg-[var(--accent)]", icon: BookOpen, desc: "đã đăng ký" },
                    { label: "Chuyên cần", value: `${dashboard?.attendanceRate ?? 0}%`, color: "text-green-600", bg: "bg-green-50", icon: CheckCircle2, desc: "tỷ lệ có mặt" },
                    { label: "Điểm TB", value: dashboard?.averageScore ?? 0, color: "text-[var(--primary)]", bg: "bg-[var(--accent)]", icon: TrendingUp, desc: "trung bình" },
                    { label: "Học phí", value: dashboard?.unpaidInvoices ? `${dashboard.unpaidInvoices} chưa đóng` : "Đã đóng đủ", color: "text-[var(--primary)]", bg: "bg-[var(--accent)]", icon: Users, desc: `${dashboard?.paidInvoices ?? 0}/${dashboard?.totalInvoices ?? 0} hóa đơn` },
                ].map((stat, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-[var(--sidebar-border)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group bg-white border-b-4 border-b-transparent hover:border-b-[var(--primary)]">
                        <CardContent className="p-7">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <p className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.value}</p>
                                </div>
                                <p className="text-[11px] text-slate-400 font-medium mt-1">{stat.desc}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="rounded-[2.5rem] border-[var(--sidebar-border)] shadow-sm overflow-hidden bg-white">
                    <CardHeader className="p-8 pb-0">
                        <CardTitle className="text-xl font-black tracking-tight">Chuyên cần</CardTitle>
                        <CardDescription className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">
                            Số buổi có mặt / vắng
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={scoreChartData}>
                                <XAxis
                                    dataKey="name"
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    fontFamily="inherit"
                                    fontWeight={700}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'var(--accent)', radius: 10 }}
                                    contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="total" radius={[10, 10, 10, 10]} barSize={80}>
                                    {scoreChartData.map((entry: any, index: number) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="rounded-[2.5rem] border-[var(--sidebar-border)] shadow-sm overflow-hidden bg-white">
                    <CardHeader className="p-8 pb-0">
                        <CardTitle className="text-xl font-black tracking-tight text-[var(--primary)]">Tỷ lệ chuyên cần</CardTitle>
                        <CardDescription className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">
                            Tổng quan
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 h-[300px] flex flex-col items-center justify-center">
                        <div className="relative">
                            <div
                                className="size-44 rounded-full flex items-center justify-center"
                                style={{
                                    background: `conic-gradient(var(--primary) ${dashboard?.attendanceRate ?? 0}%, #f1f5f9 ${dashboard?.attendanceRate ?? 0}%)`,
                                }}
                            >
                                <div className="size-32 rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
                                    <span className="text-4xl font-black text-[var(--primary)]">{dashboard?.attendanceRate ?? 0}%</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Có mặt</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs font-bold text-slate-400 mt-6">
                            Dựa trên tất cả buổi học
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* UPCOMING SESSIONS */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-2xl font-black text-[var(--foreground)] tracking-tight flex items-center gap-3">
                            <div className="w-2 h-8 bg-[var(--primary)] rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)]" />
                            Lịch học sắp tới
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {dashboard?.upcomingSessions && dashboard.upcomingSessions.length > 0 ? (
                            dashboard.upcomingSessions.map((session: any) => (
                                <div key={session.sessionId} className="bg-white rounded-[2.5rem] border border-[var(--sidebar-border)] p-6 hover:border-[var(--primary)]/30 transition-all group shadow-sm">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="bg-[var(--primary)] text-[var(--primary-foreground)] w-16 h-16 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-[var(--primary)]/30">
                                                <Calendar className="w-5 h-5 mb-1" />
                                                <p className="text-[9px] font-black uppercase">{session.shiftName}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-black text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">{session.class.courseName}</h4>
                                                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted-foreground mt-1">
                                                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[var(--primary)]" /> {new Date(session.studyDate).toLocaleDateString("vi-VN")}</span>
                                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {session.timeRange}</span>
                                                    <span className="bg-[var(--accent)] text-[var(--primary)] px-3 py-1 rounded-full text-[10px]">{session.class.roomCode}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-[2.5rem] border border-[var(--sidebar-border)] p-10 text-center">
                                <Calendar className="size-10 text-slate-300 mx-auto mb-3" />
                                <p className="font-bold text-slate-400">Không có lịch học sắp tới</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* SIDEBAR */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-black text-[var(--foreground)] tracking-tight px-2 flex items-center gap-2">
                        <GraduationCap className="size-5 text-[var(--primary)]" /> Học tập
                    </h3>
                    <div className="bg-white rounded-[2.5rem] border border-[var(--sidebar-border)] p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between p-4 hover:bg-[var(--accent)] rounded-2xl transition-all border border-transparent hover:border-[var(--primary)]/10">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-[var(--accent)] text-[var(--primary)] flex items-center justify-center font-black">
                                    <TrendingUp className="size-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-700">Điểm trung bình</p>
                                    <p className="text-[10px] font-bold text-slate-400">{dashboard?.averageScore ?? 0}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 hover:bg-[var(--accent)] rounded-2xl transition-all border border-transparent hover:border-[var(--primary)]/10">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-black">
                                    <CheckCircle2 className="size-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-700">Học phí</p>
                                    <p className="text-[10px] font-bold text-slate-400">{dashboard?.paidInvoices ?? 0}/{dashboard?.totalInvoices ?? 0} đã đóng</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PENDING LEAVE REQUESTS */}
                    {(dashboard?.pendingLeaveRequests ?? 0) > 0 && (
                        <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-[2.5rem] p-6 text-white shadow-xl shadow-[var(--primary)]/30 relative overflow-hidden group">
                            <div className="relative z-10">
                                <LogOut className="w-10 h-10 mb-4 opacity-80" />
                                <h4 className="text-xl font-black mb-1">Yêu cầu nghỉ học</h4>
                                <p className="text-xs font-bold opacity-80 mb-6 uppercase tracking-widest">Chờ duyệt</p>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-4xl font-black tracking-tighter">{dashboard.pendingLeaveRequests}</p>
                                        <p className="text-[10px] font-bold uppercase opacity-80">đơn đang chờ</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                        </div>
                    )}
                </div>
            </div>

            <ProfileDialog open={dialogOpen} onOpenChange={setDialogOpen} student={student} />
        </div>
    );
}
