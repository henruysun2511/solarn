"use client";

import { TeacherAnalytics } from "@/components/teacher/teacher-dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    BookOpen,
    Calendar,
    CheckCircle2,
    Clock,
    FileText,
    GraduationCap,
    MoreHorizontal,
    TrendingUp,
    Users
} from "lucide-react";

export default function TeacherDashboardPage() {
    return (
        <div className="space-y-8">
            {/* WELCOME BANNER - Teacher Style */}
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-[var(--sidebar-border)] relative overflow-hidden group">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                    <div className="space-y-4 text-center md:text-left">
                        <Badge className="bg-red-50 text-red-600 border-none font-black rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.15em]">
                            Học kỳ II • 2025-2026
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-black text-[var(--foreground)] tracking-tighter">
                            Chào cô, <span className="text-red-600 underline decoration-amber-400 underline-offset-8">Thúy Hoài</span>
                        </h2>
                        <p className="text-muted-foreground font-semibold text-lg max-w-md leading-relaxed">
                            Hôm nay cô có <span className="text-[var(--foreground)]">3 tiết giảng</span> và <span className="text-[var(--foreground)]">12 bài tập</span> đang chờ chấm điểm.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        <div className="bg-slate-50 p-6 rounded-[2rem] border border-[var(--sidebar-border)] text-center min-w-[140px] group-hover:bg-white transition-colors">
                            <p className="text-3xl font-black text-red-600 tracking-tighter">124</p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Học sinh quản lý</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-[2rem] border border-[var(--sidebar-border)] text-center min-w-[140px] group-hover:bg-white transition-colors">
                            <p className="text-3xl font-black text-amber-500 tracking-tighter">4.8/5</p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Đánh giá giảng dạy</p>
                        </div>
                    </div>
                </div>
                {/* Decorative background element */}
                <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-50 rounded-full blur-3xl opacity-60 transition-transform group-hover:scale-110" />
            </div>

            {/* KEY METRICS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: "Chuyên cần", value: "94%", color: "text-red-600", bg: "bg-red-50", icon: CheckCircle2, desc: "+2% so với tuần trước" },
                    { label: "Bài tập cần chấm", value: "12", color: "text-amber-600", bg: "bg-amber-50", icon: FileText, desc: "Hạn chót tối nay" },
                    { label: "Lớp hoạt động", value: "08", color: "text-red-600", bg: "bg-red-50", icon: BookOpen, desc: "4 lớp IELTS, 4 lớp Toeic" },
                    { label: "Giờ giảng dạy", value: "128h", color: "text-slate-700", bg: "bg-slate-100", icon: Clock, desc: "Tháng này" },
                ].map((stat, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-[var(--sidebar-border)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group bg-white border-b-4 border-b-transparent hover:border-b-red-500">
                        <CardContent className="p-7">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <MoreHorizontal className="w-4 h-4 text-slate-400" />
                                </Button>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <p className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.value}</p>
                                    <span className="text-[10px] font-bold text-green-500 flex items-center">
                                        <TrendingUp className="w-3 h-3 mr-0.5" /> {stat.desc.split(' ')[0]}
                                    </span>
                                </div>
                                <p className="text-[11px] text-slate-400 font-medium mt-1">{stat.desc}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>


            <TeacherAnalytics />

            {/* MAIN CONTENT AREA */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* UPCOMING CLASSES */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-2xl font-black text-[var(--foreground)] tracking-tight flex items-center gap-3">
                            <div className="w-2 h-8 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.3)]" />
                            Lịch giảng dạy hôm nay
                        </h3>
                        <Button variant="outline" className="rounded-xl border-slate-200 font-bold hover:bg-red-50 hover:text-red-600 transition-colors">
                            Xem lịch tuần
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { time: "08:00 - 10:00", class: "IELTS Intensive - 10A", room: "Phòng B.204", students: 24, status: "Sắp diễn ra" },
                            { time: "13:30 - 15:30", class: "Toeic Master - 12C", room: "Phòng A.102", students: 18, status: "Chờ duyệt" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-[2.5rem] border border-[var(--sidebar-border)] p-6 hover:border-red-200 transition-all group shadow-sm">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className="bg-red-600 text-white w-16 h-16 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-red-200">
                                            <Clock className="w-5 h-5 mb-1" />
                                            <p className="text-[9px] font-black uppercase">Ca sáng</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-[var(--foreground)] group-hover:text-red-600 transition-colors">{item.class}</h4>
                                            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted-foreground mt-1">
                                                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-red-500" /> {item.time}</span>
                                                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-red-500" /> {item.students} học viên</span>
                                                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px]">{item.room}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Button variant="ghost" className="rounded-xl font-bold text-slate-500">Tài liệu</Button>
                                        <Button className="rounded-xl bg-red-600 hover:bg-red-700 text-white font-black px-6 shadow-md shadow-red-100">
                                            Vào lớp
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* STUDENT PERFORMANCE / RECENT SUBMISSIONS */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-black text-[var(--foreground)] tracking-tight px-2">Học sinh mới nộp bài</h3>
                    <div className="bg-white rounded-[2.5rem] border border-[var(--sidebar-border)] p-6 shadow-sm space-y-2">
                        {[
                            { name: "Lê Minh Tuấn", task: "IELTS Writing Task 1", time: "10 phút trước", avatar: "LT" },
                            { name: "Trần Thị Hoa", task: "Reading Unit 4", time: "45 phút trước", avatar: "TH" },
                            { name: "Nguyễn Anh Dũng", task: "Grammar Quiz", time: "2 giờ trước", avatar: "AD" },
                            { name: "Phạm Mỹ Linh", task: "Speaking Record", time: "3 giờ trước", avatar: "ML" },
                        ].map((student, i) => (
                            <div key={i} className="flex items-center justify-between p-4 hover:bg-red-50 rounded-2xl transition-all cursor-pointer group border border-transparent hover:border-red-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                        {student.avatar}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-700 group-hover:text-red-600 transition-colors">{student.name}</p>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">{student.task}</p>
                                    </div>
                                </div>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                                    {student.time}
                                </span>
                            </div>
                        ))}
                        <Button className="w-full mt-6 rounded-2xl bg-slate-900 hover:bg-red-600 text-white font-black h-12 shadow-lg transition-all">
                            Chấm điểm ngay
                        </Button>
                    </div>

                    {/* Class Overview Card */}
                    <div className="bg-gradient-to-br from-red-600 to-red-500 rounded-[2.5rem] p-6 text-white shadow-xl shadow-red-200 relative overflow-hidden group">
                        <div className="relative z-10">
                            <GraduationCap className="w-10 h-10 mb-4 opacity-80" />
                            <h4 className="text-xl font-black mb-1">Báo cáo lớp học</h4>
                            <p className="text-xs font-bold opacity-80 mb-6 uppercase tracking-widest">Tuần 14 (Hiện tại)</p>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-3xl font-black tracking-tighter">88%</p>
                                    <p className="text-[10px] font-bold uppercase opacity-80">Hoàn thành mục tiêu</p>
                                </div>
                                <Button className="bg-white/20 hover:bg-white/30 border-none rounded-xl font-black text-xs px-4">
                                    Chi tiết
                                </Button>
                            </div>
                        </div>
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                    </div>
                </div>
            </div>
        </div>
    );
}