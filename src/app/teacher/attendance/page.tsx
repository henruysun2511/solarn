"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    CalendarIcon,
    ChevronDownIcon,
    FileOutputIcon,
    FilterIcon,
    SearchIcon,
    Users
} from "lucide-react";

const sessions = [
    { id: 1, name: "Buổi 1: Introduction", date: "20/04/2026", status: "Completed" },
    { id: 2, name: "Buổi 2: Writing Skills", date: "22/04/2026", status: "Ongoing" },
    { id: 3, name: "Buổi 3: Speaking Practice", date: "24/04/2026", status: "Upcoming" },
];

const attendanceData = [
    { admissionNo: "AD52365", name: "Đặng Nhật Huy", rollNo: "12", class: "IELTS Intensive", attendance: "Present", note: "", avatar: "https://i.pinimg.com/1200x/7f/86/7e/7f867e260c486b9cbef64326436b3509.jpg" },
    { admissionNo: "AD52366", name: "Trần Minh Tuấn", rollNo: "08", class: "IELTS Intensive", attendance: "Absent", note: "Có phép", avatar: "https://i.pinimg.com/736x/64/59/3a/64593aa2c30b8bbcfef774455a6f4630.jpg" },
    { admissionNo: "AD52367", name: "Lê Mỹ Linh", rollNo: "15", class: "IELTS Intensive", attendance: "Late", note: "", avatar: "https://i.pinimg.com/1200x/74/38/f8/7438f879a012f35c4d1a807d8a8da431.jpg" },
];

const attendanceOptions = [
    { label: "Hiện diện", value: "Present", color: "text-green-600", border: "peer-checked:border-green-600" },
    { label: "Đi muộn", value: "Late", color: "text-amber-500", border: "peer-checked:border-amber-500" },
    { label: "Vắng mặt", value: "Absent", color: "text-red-500", border: "peer-checked:border-red-500" },
];

export default function TeacherAttendancePage() {
    return (
        <div className="flex flex-col gap-8 min-h-screen pb-10">
            {/* HEADER SECTION */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter">Điểm danh lớp học</h1>
                    <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest mt-1">
                        Quản lý chuyên cần • Học kỳ II
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-12 px-6 font-bold hover:bg-slate-50">
                        <FileOutputIcon className="size-4 mr-2 text-slate-500" />
                        Xuất báo cáo
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700 text-white px-8 h-12 rounded-2xl font-black shadow-lg shadow-red-100">
                        Lưu điểm danh
                    </Button>
                </div>
            </div>

            {/* TOP PANEL: SESSION SELECTOR */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-1 rounded-[2.5rem] border-[var(--sidebar-border)] bg-white p-6 shadow-sm">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-2">Chọn lớp học</label>
                        <Select defaultValue="ielts-10a">
                            <SelectTrigger className="w-full h-14 rounded-2xl border-slate-100 bg-slate-50/50 font-bold text-md focus:ring-red-500">
                                <SelectValue placeholder="Chọn lớp" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl font-bold">
                                <SelectItem value="ielts-10a">IELTS Intensive - 10A</SelectItem>
                                <SelectItem value="toeic-12c">Toeic Master - 12C</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="pt-4 px-2">
                            <div className="flex items-center gap-3 text-red-600">
                                <Users className="size-5" />
                                <span className="font-black text-lg">24 Học viên</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="lg:col-span-3 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {sessions.map((session) => (
                        <Card
                            key={session.id}
                            className={`min-w-[280px] rounded-[2.5rem] border-2 cursor-pointer transition-all shrink-0 hover:shadow-md ${session.status === "Ongoing"
                                ? "border-red-500 bg-red-50/30"
                                : "border-transparent bg-white shadow-sm"
                                }`}
                        >
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2.5 rounded-xl ${session.status === "Ongoing" ? "bg-red-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                                        <CalendarIcon className="size-5" />
                                    </div>
                                    <Badge className={`${session.status === "Completed" ? "bg-green-100 text-green-600" :
                                        session.status === "Ongoing" ? "bg-red-600 text-white animate-pulse" : "bg-slate-100 text-slate-400"
                                        } border-none rounded-full px-3 font-black text-[9px] uppercase`}>
                                        {session.status}
                                    </Badge>
                                </div>
                                <h4 className="font-black text-[var(--foreground)] leading-tight mb-1">{session.name}</h4>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{session.date}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* MAIN TABLE SECTION */}
            <div className="bg-white rounded-[3rem] shadow-sm border border-[var(--sidebar-border)] overflow-hidden">
                {/* TOOLBAR */}
                <div className="p-8 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="relative w-full lg:w-[400px]">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                        <Input
                            placeholder="Tìm học sinh theo tên hoặc mã số..."
                            className="pl-11 h-14 rounded-2xl border-slate-100 bg-slate-50/50 font-bold focus-visible:ring-red-500"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="rounded-xl border-slate-100 h-12 font-bold gap-2">
                            <FilterIcon className="size-4" />
                            Bộ lọc
                            <ChevronDownIcon className="size-4 opacity-50" />
                        </Button>
                        <div className="h-8 w-[1px] bg-slate-100 hidden lg:block" />
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                            Hiển thị:
                            <Select defaultValue="10">
                                <SelectTrigger className="w-[80px] h-10 rounded-xl border-slate-100 font-black text-red-600">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="font-bold">
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                {/* TABLE SECTION */}
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-[#f8f9fa]">
                            <TableRow className="border-none">
                                <TableHead className="pl-6 w-12"><Checkbox /></TableHead>
                                <TableHead className="text-sm font-bold text-gray-700">S.L</TableHead>
                                <TableHead className="text-sm font-bold text-gray-700">Admission No</TableHead>
                                <TableHead className="text-sm font-bold text-gray-700">Name</TableHead>
                                <TableHead className="text-sm font-bold text-gray-700">Class</TableHead>
                                <TableHead className="text-sm font-bold text-gray-700 text-center">Attendance</TableHead>
                                <TableHead className="text-sm font-bold text-gray-700 pl-10">Note</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {attendanceData.map((student, index) => (
                                <TableRow key={student.admissionNo} className="hover:bg-gray-50 transition-colors border-gray-100">
                                    <TableCell className="pl-6"><Checkbox /></TableCell>
                                    <TableCell className="text-gray-500 font-medium">
                                        {String(index + 1).padStart(2, "0")}
                                    </TableCell>
                                    <TableCell className="text-primary font-semibold">{student.admissionNo}</TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="size-9 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                                                <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-800 leading-tight">{student.name}</div>
                                                <div className="text-[12px] text-gray-400">Roll No: {student.rollNo}</div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-gray-600">{student.class}</TableCell>

                                    {/* PHẦN ĐIỂM DANH DẠNG RADIO GIỐNG MẪU */}
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-4">
                                            {attendanceOptions.map((option) => (
                                                <label
                                                    key={option.value}
                                                    className="flex items-center gap-2 cursor-pointer group"
                                                >
                                                    <div className="relative flex items-center justify-center">
                                                        <input
                                                            type="radio"
                                                            name={`attendance-${student.admissionNo}`}
                                                            defaultChecked={student.attendance === option.value}
                                                            className="peer sr-only"
                                                        />
                                                        {/* Vòng tròn radio tùy chỉnh */}
                                                        <div className={`size-4 rounded-full border-2 border-gray-300 transition-all ${option.border} peer-checked:border-[5px]`} />
                                                    </div>
                                                    <span className={`text-[13px] font-bold text-gray-400 peer-checked:${option.color} transition-colors uppercase tracking-tight`}>
                                                        {option.label}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </TableCell>

                                    <TableCell className="pl-10">
                                        <Input
                                            placeholder="Write note..."
                                            defaultValue={student.note}
                                            className="h-9 border-gray-200 focus-visible:ring-primary w-[180px] text-sm rounded-lg"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* FOOTER */}
                <div className="p-8 border-t border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-50/30">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Đang hiển thị {attendanceData.length} trên tổng số 24 học viên
                    </p>

                    <Pagination className="w-auto">
                        <PaginationContent className="gap-3">
                            <PaginationItem>
                                <PaginationPrevious href="#" className="rounded-xl border-none hover:bg-white shadow-sm" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink isActive href="#" className="size-10 rounded-xl bg-red-600 text-white font-black hover:bg-red-700 border-none shadow-md shadow-red-100">
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" className="rounded-xl border-none hover:bg-white shadow-sm" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}