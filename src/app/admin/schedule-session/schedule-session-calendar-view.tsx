"use client";

import { ScheduleSession } from "@/schemas/schedule-session.schema";
import { ScheduleItem } from "@/components/common/schedule-item";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { useState, useMemo } from "react";

interface CalendarProps {
    sessions: ScheduleSession[];
    onSessionClick: (session: ScheduleSession) => void;
}

export function ScheduleSessionCalendar({ sessions, onSessionClick }: CalendarProps) {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    // Tính toán các ngày trong tuần hiện tại (Từ Thứ 2 đến Chủ Nhật)
    const weekDays = useMemo(() => {
        const startOfWeek = new Date(currentDate);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Chỉnh mốc về thứ 2
        startOfWeek.setDate(diff);

        const days = [];
        for (let i = 0; i < 7; i++) {
            const nextDay = new Date(startOfWeek);
            nextDay.setDate(startOfWeek.getDate() + i);
            days.push(nextDay);
        }
        return days;
    }, [currentDate]);

    // Nhóm các session thuộc tuần hiện tại theo chuỗi ngày YYYY-MM-DD
    const sessionsByDay = useMemo(() => {
        const groups: { [key: string]: ScheduleSession[] } = {};
        sessions.forEach((session) => {
            const dateStr = new Date(session.studyDate).toISOString().split("T")[0];
            if (!groups[dateStr]) groups[dateStr] = [];
            groups[dateStr].push(session);
        });
        return groups;
    }, [sessions]);

    const handlePrevWeek = () => {
        const next = new Date(currentDate);
        next.setDate(currentDate.getDate() - 7);
        setCurrentDate(next);
    };

    const handleNextWeek = () => {
        const next = new Date(currentDate);
        next.setDate(currentDate.getDate() + 7);
        setCurrentDate(next);
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const formatWeekRange = () => {
        const firstDay = weekDays[0].toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
        const lastDay = weekDays[6].toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
        return `Tuần: ${firstDay} - ${lastDay}`;
    };

    const getDayName = (index: number) => {
        if (index === 6) return "Chủ Nhật";
        return `Thứ ${index + 2}`;
    };

    return (
        <div className="p-6 bg-gray-50/50 rounded-3xl space-y-6">
            {/* Thanh điều hướng Tuần */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                        <CalendarDays className="size-5" />
                    </div>
                    <span className="font-black text-gray-800 tracking-wide text-lg">
                        {formatWeekRange()}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleToday} className="rounded-xl font-bold border-gray-200">
                        Hôm nay
                    </Button>
                    <Button size="icon" variant="ghost" onClick={handlePrevWeek} className="size-9 rounded-xl border border-gray-100 hover:bg-gray-50">
                        <ChevronLeft className="size-5" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={handleNextWeek} className="size-9 rounded-xl border border-gray-100 hover:bg-gray-50">
                        <ChevronRight className="size-5" />
                    </Button>
                </div>
            </div>

            {/* Grid lịch tuần chi tiết */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {weekDays.map((day, idx) => {
                    const dateStr = day.toISOString().split("T")[0];
                    const daySessions = sessionsByDay[dateStr] || [];
                    const isToday = new Date().toISOString().split("T")[0] === dateStr;

                    return (
                        <div
                            key={idx}
                            className={`bg-white rounded-3xl border min-h-[320px] flex flex-col transition-all overflow-hidden ${isToday ? "border-primary ring-2 ring-primary/5 shadow-md" : "border-gray-200 shadow-sm"
                                }`}
                        >
                            {/* Tiêu đề ngày trong tuần */}
                            <div className={`p-3 text-center border-b font-bold flex flex-col items-center justify-center ${isToday ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 border-gray-100"
                                }`}>
                                <span className="text-[11px] uppercase tracking-wider opacity-80">{getDayName(idx)}</span>
                                <span className="text-lg font-black mt-0.5">{day.getDate()}</span>
                            </div>

                            {/* Danh sách các buổi học của ngày */}
                            <div className="p-3 flex-1 space-y-3 overflow-y-auto max-h-[400px]">
                                {daySessions.length === 0 ? (
                                    <div className="h-full flex items-center justify-center text-center p-4">
                                        <span className="text-[11px] font-medium text-gray-400 italic">Không có lịch học</span>
                                    </div>
                                ) : (
                                    daySessions.map((session, sIdx) => (
                                        <div key={session.sessionId || sIdx} className="scale-95 hover:scale-100 transition-transform">
                                            <ScheduleItem
                                                data={session}
                                                sessionIndex={sIdx + 1}
                                                onClick={() => onSessionClick(session)}
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}