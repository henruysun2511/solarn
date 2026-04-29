"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Clock,
    Filter,
    LayoutGridIcon,
    ListIcon,
    MapPin,
    MoreVerticalIcon,
    Settings,
    User
} from "lucide-react";
import { useState } from "react";

// Dữ liệu mẫu cho thông tin lớp học
const classInfo = {
    classId: "CLS-IELTS-65-01",
    className: "IELTS Intensive Night Shift 01",
    courseName: "IELTS Intensive 6.5+",
    teacher: "Ms. Selena",
    room: "Phòng Lab A (Tầng 2)",
    startDate: "15/05/2026",
    endDate: "15/08/2026",
    currentStudents: 25,
    maxStudents: 30,
    status: "ongoing"
};

// Dữ liệu lịch học (theo tuần)
const scheduleData = [
    { day: "Thứ 2", date: "20/04", classes: [{ id: 1, session: 1, topic: "IELTS Writing Task 1: Line Graph", time: "18:30 - 20:30", room: "P.101", status: "completed" }] },
    { day: "Thứ 3", date: "21/04", classes: [] },
    { day: "Thứ 4", date: "22/04", classes: [{ id: 2, session: 2, topic: "IELTS Writing Task 2: Opinion", time: "18:30 - 20:30", room: "P.101", status: "completed" }] },
    { day: "Thứ 5", date: "23/04", classes: [] },
    { day: "Thứ 6", date: "24/04", classes: [{ id: 3, session: 3, topic: "IELTS Reading: Matching Headings", time: "18:30 - 20:30", room: "P.101", status: "upcoming" }] },
    { day: "Thứ 7", date: "25/04", classes: [{ id: 4, session: 4, topic: "IELTS Speaking Part 1", time: "08:30 - 11:30", room: "Phòng Lab", status: "upcoming" }] },
    { day: "Chủ nhật", date: "26/04", isHoliday: true, classes: [] },
];

export default function AdminClassScheduleDetail() {
    const [viewMode, setViewMode] = useState<"table" | "calendar">("calendar");

    return (
        <div data-role="admin" className="space-y-8 pb-10 min-h-screen">
            {/* 1. TOP SECTION: THÔNG TIN LỚP HỌC (BENTO STYLE) */}
            <section className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 size-64 bg-primary opacity-[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{classInfo.classId}</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-gray-900 leading-tight">
                            {classInfo.className}
                        </h1>
                        <p className="text-sm font-bold text-gray-400 italic">Khóa học: {classInfo.courseName}</p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-2xl font-bold h-12 border-gray-200">
                            <Settings className="size-4 mr-2" /> Cấu hình lớp
                        </Button>
                        <Button className="rounded-2xl bg-primary text-white font-black h-12 px-6">
                            Điểm danh nhanh
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 pt-8 border-t border-dashed border-gray-100">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Giảng viên</p>
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                                <User className="size-5 text-primary" />
                            </div>
                            <span className="font-bold text-gray-700">{classInfo.teacher}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phòng học</p>
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 text-orange-500">
                                <MapPin className="size-5" />
                            </div>
                            <span className="font-bold text-gray-700">{classInfo.room}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thời gian</p>
                        <div className="flex items-center gap-3 font-bold text-gray-700">
                            <CalendarIcon className="size-5 text-gray-400" />
                            <span>{classInfo.startDate} - {classInfo.endDate}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sĩ số lớp</p>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-black">
                                <span>{classInfo.currentStudents}/{classInfo.maxStudents} Học viên</span>
                                <span className="text-emerald-500">83%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: '83%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. BOTTOM SECTION: QUẢN LÝ LỊCH HỌC */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                            <Clock className="size-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-black tracking-tight text-gray-900">Chi tiết lộ trình học</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                            <Label htmlFor="schedule-view" className="cursor-pointer">
                                {viewMode === "table" ? <ListIcon className="size-4 text-gray-500" /> : <LayoutGridIcon className="size-4 text-gray-500" />}
                            </Label>
                            <Switch
                                id="schedule-view"
                                checked={viewMode === "calendar"}
                                onCheckedChange={(checked) => setViewMode(checked ? "calendar" : "table")}
                            />
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter w-24 text-center">
                                {viewMode === "calendar" ? "Lịch tuần" : "Dạng bảng"}
                            </span>
                        </div>
                        <Button className="bg-gray-900 text-white rounded-xl font-bold h-11">
                            Thêm buổi học
                        </Button>
                    </div>
                </div>

                {/* HIỂN THỊ DẠNG BẢNG */}
                {viewMode === "table" ? (
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                        <Table>
                            <TableHeader className="bg-[#f1f2f4]">
                                <TableRow className="border-none">
                                    <TableHead className="pl-8 text-[11px] font-black uppercase text-gray-400 tracking-widest">Buổi</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Ngày học</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Nội dung bài học</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Phòng</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Trạng thái</TableHead>
                                    <TableHead className="text-right pr-8 text-[11px] font-black uppercase text-gray-400 tracking-widest">Thao tác</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scheduleData.flatMap(d => d.classes).map((item, idx) => (
                                    <TableRow key={idx} className="hover:bg-gray-50/50 border-b border-gray-50 transition-colors">
                                        <TableCell className="pl-8 font-black text-primary">#{item.session}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-700">20/04/2026</span>
                                                <span className="text-[10px] text-gray-400 uppercase font-bold">{item.time}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-bold text-gray-800">{item.topic}</TableCell>
                                        <TableCell className="text-sm font-bold text-gray-500">{item.room}</TableCell>
                                        <TableCell>
                                            <Badge className={`border-none font-black text-[9px] uppercase px-3 py-1 rounded-full ${item.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                                                }`}>
                                                {item.status === 'completed' ? 'Đã dạy' : 'Sắp tới'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-8">
                                            <Button variant="ghost" size="icon" className="rounded-xl"><MoreVerticalIcon className="size-5 text-gray-400" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    /* HIỂN THỊ DẠNG LỊCH (ĐỒNG BỘ THEO MẪU BẠN GỬI) */
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="icon" className="rounded-xl bg-gray-50"><ChevronLeft className="size-5" /></Button>
                                <div className="text-center">
                                    <p className="text-sm font-black text-gray-900 leading-none">Tháng 04, 2026</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Tuần 16</p>
                                </div>
                                <Button variant="ghost" size="icon" className="rounded-xl bg-gray-50"><ChevronRight className="size-5" /></Button>
                            </div>
                            <Button variant="outline" className="rounded-xl border-gray-200 font-bold gap-2">
                                <Filter className="size-4" /> Lọc theo phòng
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {scheduleData.map((dayData, idx) => (
                                <div key={idx} className="flex flex-col gap-3">
                                    {/* Cột Ngày */}
                                    <div className={`p-4 rounded-[2rem] text-center border-2 transition-all ${dayData.date === "21/04"
                                        ? "bg-primary border-primary text-white shadow-xl shadow-primary/20"
                                        : "bg-white border-transparent shadow-sm"
                                        }`}>
                                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${dayData.date === "21/04" ? "text-white/70" : "text-gray-400"}`}>
                                            {dayData.day}
                                        </p>
                                        <p className="text-xl font-black tracking-tighter">{dayData.date}</p>
                                    </div>

                                    {/* Danh sách lớp */}
                                    <div className="flex flex-col gap-3 min-h-[400px] rounded-[2rem] bg-gray-50/50 p-2 border border-dashed border-gray-200">
                                        {dayData.isHoliday ? (
                                            <div className="h-full flex items-center justify-center py-10">
                                                <Badge className="bg-red-50 text-red-500 border-none font-black px-4 py-2 rounded-full rotate-[-10deg]">NGHỈ LỄ</Badge>
                                            </div>
                                        ) : dayData.classes.length > 0 ? (
                                            dayData.classes.map((item) => (
                                                <AdminScheduleItem key={item.id} data={item} />
                                            ))
                                        ) : (
                                            <div className="py-10 text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest">Trống</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Sub-component cho từng item lịch học trong Calendar
function AdminScheduleItem({ data }: { data: any }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:border-primary/30 transition-all">
            <div className={`px-3 py-1.5 text-[10px] font-black text-center border-b uppercase tracking-tight ${data.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                }`}>
                Buổi #{data.session}
            </div>
            <div className="p-4 space-y-3">
                <div className="font-bold text-gray-800 text-xs leading-snug line-clamp-2 min-h-[32px]">
                    {data.topic}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                        <Clock className="size-3 text-primary" />
                        <span>{data.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                        <MapPin className="size-3 text-orange-400" />
                        <span>{data.room}</span>
                    </div>
                </div>

                <Button variant="ghost" className="w-full h-8 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-gray-50 p-0">
                    Chi tiết →
                </Button>
            </div>
        </div>
    );
}