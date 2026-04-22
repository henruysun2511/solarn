"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Bell,
    Calendar,
    CheckSquare,
    Clock,
    LayoutDashboard,
    Users
} from "lucide-react";

export default function StudentDashboardPage() {
    return (
        <>
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-[var(--sidebar-border)] relative overflow-hidden group">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                    <div className="space-y-4 text-center md:text-left">
                        <Badge className="bg-[var(--accent)] text-[var(--primary)] border-none font-black rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.15em]">
                            Học kỳ mới
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-black text-[var(--foreground)] tracking-tighter">Chào buổi sáng, <span className="text-[var(--primary)] underline decoration-[var(--secondary)] underline-offset-8">Nhat Huy!</span></h2>
                        <p className="text-muted-foreground font-semibold text-lg max-w-md leading-relaxed">
                            Đã đến lúc bắt đầu hành trình chinh phục Tiếng Anh hôm nay.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        <div className="bg-[var(--dashboard-bg)] p-6 rounded-[2rem] border border-[var(--sidebar-border)] text-center min-w-[130px]">
                            <p className="text-3xl font-black text-[var(--primary)] tracking-tighter">03</p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Lớp đang học</p>
                        </div>
                        <div className="bg-[var(--dashboard-bg)] p-6 rounded-[2rem] border border-[var(--sidebar-border)] text-center min-w-[130px]">
                            <p className="text-3xl font-black text-[var(--secondary)] tracking-tighter">98%</p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Hoàn thành</p>
                        </div>
                    </div>
                </div>
                {/* Decorative circle */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--accent)] rounded-full blur-3xl opacity-50" />
            </div>

            {/* Quick Stats Grid using --primary and --secondary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: "Bài tập nộp", value: "12/15", color: "text-[var(--primary)]", bg: "bg-[var(--accent)]", icon: CheckSquare },
                    { label: "Điểm trung bình", value: "8.2", color: "text-[var(--secondary)]", bg: "bg-amber-50", icon: LayoutDashboard },
                    { label: "Buổi học", value: "24", color: "text-[var(--primary)]", bg: "bg-[var(--accent)]", icon: Calendar },
                    { label: "Thông báo", value: "02", color: "text-red-500", bg: "bg-red-50", icon: Bell },
                ].map((stat, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-[var(--sidebar-border)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden bg-white">
                        <CardContent className="p-7 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                                <p className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.value}</p>
                            </div>
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Detail Panels */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Schedule Card */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-2xl font-black text-[var(--foreground)] tracking-tight flex items-center gap-3">
                            <div className="w-2 h-8 bg-[var(--primary)] rounded-full" />
                            Lịch học kế tiếp
                        </h3>
                        <Button variant="link" className="text-[var(--primary)] font-bold hover:no-underline">Toàn bộ lịch</Button>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-[var(--sidebar-border)] p-8 shadow-sm hover:border-[var(--primary)]/30 transition-all group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <div className="bg-[var(--primary)] text-[var(--primary-foreground)] w-20 h-20 rounded-3xl flex flex-col items-center justify-center shadow-lg shadow-[var(--primary)]/20">
                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Thứ 4</p>
                                    <p className="text-3xl font-black tracking-tighter">22</p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">IELTS Writing Task 2 - Advanced</h4>
                                    <div className="flex flex-wrap items-center gap-5 text-sm font-bold text-muted-foreground">
                                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[var(--primary)]" /> 19:00 - 21:00</span>
                                        <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[var(--primary)]" /> Ms. Thúy Hoài</span>
                                        <span className="bg-[var(--accent)] text-[var(--primary)] px-3 py-1 rounded-full text-[10px]">Phòng A.101</span>
                                    </div>
                                </div>
                            </div>
                            <Button className="rounded-2xl bg-[var(--primary)] hover:opacity-90 text-[var(--primary-foreground)] font-black px-10 h-14 shadow-lg shadow-[var(--primary)]/10 text-md">
                                Tham gia lớp
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Task Sidebar using --secondary accent */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-black text-[var(--foreground)] tracking-tight px-2">Nhắc nhở</h3>
                    <div className="bg-white rounded-[2.5rem] border border-[var(--sidebar-border)] p-6 shadow-sm space-y-4">
                        {[
                            { title: "Nộp bài IELTS Reading", due: "2h còn lại", urgent: true },
                            { title: "Luyện nghe Section 1", due: "Ngày mai", urgent: false },
                            { title: "Review Vocab tuần 4", due: "Thứ 6", urgent: false },
                        ].map((task, i) => (
                            <div key={i} className="flex items-center justify-between p-4 hover:bg-[var(--accent)] rounded-2xl transition-all cursor-pointer border border-transparent hover:border-[var(--primary)]/10 group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-3 h-3 rounded-full ${task.urgent ? "bg-red-500 animate-pulse" : "bg-[var(--secondary)]"}`} />
                                    <span className="text-sm font-black text-slate-700 group-hover:text-[var(--primary)] transition-colors">{task.title}</span>
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-tighter ${task.urgent ? "text-red-500" : "text-muted-foreground"}`}>
                                    {task.due}
                                </span>
                            </div>
                        ))}
                        <Button variant="outline" className="w-full mt-4 rounded-2xl border-dashed border-2 border-[var(--sidebar-border)] hover:border-[var(--primary)] hover:text-[var(--primary)] text-muted-foreground font-black h-12">
                            + Thêm nhiệm vụ
                        </Button>
                    </div>
                </div>

            </div>
        </>

    );
}