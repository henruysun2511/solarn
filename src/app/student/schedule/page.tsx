"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Filter,
    User
} from "lucide-react";

// Dữ liệu mẫu cho lịch học
const scheduleData = [
    {
        day: "Thứ 2",
        date: "20/04",
        classes: [
            { id: 1, class: "12A1", course: "IELTS Writing", time: "08:00 - 09:30", room: "P.101", type: "primary" },
            { id: 2, class: "12A2", course: "Mathematics", time: "09:50 - 11:20", room: "P.202", type: "secondary" },
            { id: 3, class: "11B1", course: "Physics", time: "13:30 - 15:00", room: "P.105", type: "primary" },
            { id: 4, class: "10C1", course: "Chemistry", time: "15:10 - 16:40", room: "P.303", type: "success" },
        ]
    },
    {
        day: "Thứ 3",
        date: "21/04",
        classes: [
            { id: 5, class: "12A1", course: "IELTS Speaking", time: "08:00 - 09:30", room: "Phòng Lab", type: "success" },
            { id: 6, class: "11B2", course: "Biology", time: "09:50 - 11:20", room: "P.204", type: "secondary" },
            { id: 7, class: "10A3", course: "English", time: "13:30 - 15:00", room: "P.102", type: "primary" },
        ]
    },
    {
        day: "Thứ 4",
        date: "22/04",
        classes: [
            { id: 8, class: "12A3", course: "Mathematics", time: "08:00 - 09:30", room: "P.201", type: "primary" },
            { id: 9, class: "11C1", course: "History", time: "09:50 - 11:20", room: "P.008", type: "secondary" },
            { id: 10, class: "10B1", course: "Geography", time: "13:30 - 15:00", room: "P.110", type: "success" },
            { id: 11, class: "12A1", course: "Physics", time: "15:10 - 16:40", room: "P.105", type: "primary" },
        ]
    },
    {
        day: "Thứ 5",
        date: "23/04",
        classes: [
            { id: 12, class: "12A1", course: "Chemistry", time: "08:00 - 09:30", room: "P.303", type: "primary" },
            { id: 13, class: "11B3", course: "English", time: "09:50 - 11:20", room: "P.101", type: "secondary" },
            { id: 14, class: "10C2", course: "Civic Education", time: "13:30 - 15:00", room: "P.009", type: "success" },
        ]
    },
    {
        day: "Thứ 6",
        date: "24/04",
        classes: [
            { id: 15, class: "12A2", course: "Mathematics", time: "08:00 - 09:30", room: "P.202", type: "primary" },
            { id: 16, class: "11A1", course: "Physics", time: "09:50 - 11:20", room: "P.105", type: "secondary" },
            { id: 17, class: "10B2", course: "English", time: "13:30 - 15:00", room: "P.102", type: "success" },
            { id: 18, class: "12A1", course: "IELTS Writing", time: "15:10 - 16:40", room: "P.101", type: "primary" },
        ]
    },
    {
        day: "Thứ 7",
        date: "25/04",
        classes: [
            { id: 19, class: "12A1", course: "IELTS Mock Test", time: "08:00 - 11:00", room: "Phòng Lab", type: "success" },
            { id: 20, class: "11B1", course: "Extra Math", time: "13:30 - 15:00", room: "P.202", type: "secondary" },
        ]
    },
    {
        day: "Chủ nhật",
        date: "26/04",
        isHoliday: true,
        classes: []
    },
];

export default function StudentSchedulePage() {
    return (
        <div className="space-y-8 pb-10">
            {/* Header điều hướng */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-[2.5rem] border border-[var(--sidebar-border)] shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="bg-[var(--accent)] p-3 rounded-2xl">
                        <CalendarIcon className="w-6 h-6 text-[var(--primary)]" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Thời khóa biểu</h2>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Tháng 04, 2026</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-[var(--dashboard-bg)] rounded-2xl p-1 border border-[var(--sidebar-border)]">
                        <Button variant="ghost" size="icon" className="rounded-xl"><ChevronLeft className="w-5 h-5" /></Button>
                        <span className="px-4 font-black text-sm">Tuần này</span>
                        <Button variant="ghost" size="icon" className="rounded-xl"><ChevronRight className="w-5 h-5" /></Button>
                    </div>
                    <Button variant="outline" className="rounded-2xl border-2 font-bold gap-2">
                        <Filter className="w-4 h-4" /> Lọc
                    </Button>
                </div>
            </div>

            {/* Grid Lịch học */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                {scheduleData.map((dayData, idx) => (
                    <div key={idx} className="flex flex-col gap-4">
                        {/* Cột Ngày */}
                        <div className={`p-4 rounded-3xl text-center border-2 transition-all ${dayData.date === "21/04" // Giả sử hôm nay là 21/04
                            ? "bg-[var(--primary)] border-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20"
                            : "bg-white border-transparent"
                            }`}>
                            <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${dayData.date === "21/04" ? "text-white/70" : "text-muted-foreground"}`}>
                                {dayData.day}
                            </p>
                            <p className="text-xl font-black tracking-tighter">{dayData.date}</p>
                        </div>

                        {/* Danh sách lớp học trong ngày */}
                        <div className="flex flex-col gap-4 min-h-[500px] rounded-[2rem] bg-slate-50/50 p-2 border border-dashed border-slate-200">
                            {dayData.isHoliday ? (
                                <div className="h-full flex items-center justify-center py-10">
                                    <Badge className="bg-red-100 text-red-500 border-none font-black px-4 py-2 rounded-full rotate-[-15deg]">NGHỈ LỄ</Badge>
                                </div>
                            ) : dayData.classes.length > 0 ? (
                                dayData.classes.map((item) => (
                                    <ScheduleItem key={item.id} data={item} />
                                ))
                            ) : (
                                <div className="py-10 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trống</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

import { BookOpen, Clock, MapPin } from "lucide-react";

function getTypeByTime(time: string) {
    const startHour = parseInt(time.split(":")[0]);

    if (startHour < 9) return "early";
    if (startHour < 12) return "morning";
    if (startHour < 15) return "afternoon";
    return "evening";
}

function ScheduleItem({ data }: { data: any }) {
    const type = getTypeByTime(data.time);

    const headerColors: any = {

        early: "bg-blue-100 text-blue-600 border-blue-300",
        morning: "bg-green-100 text-green-600 border-green-300",
        afternoon: "bg-red-100 text-red-600 border-red-300",
        evening: "bg-orange-100 text-orange-600 border-orange-300",
    };

    return (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden h-full flex flex-col">            {/* Header */}
            <div className={`px-4 py-2 text-sm font-semibold text-center border-b ${headerColors[type]}`}>                Class: {data.class}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3 text-sm text-slate-600 flex-1">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <span>Khóa : {data.course}</span>
                </div>

                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>Phòng : {data.room}</span>
                </div>

                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Ms.Hoài</span>
                </div>

                <div className="flex items-center gap-2 mt-auto">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{data.time}</span>
                </div>
            </div>
        </div>
    );
}