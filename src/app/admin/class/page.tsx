"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
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
    DoorOpenIcon,
    FileOutputIcon,
    FilterIcon,
    LayoutGridIcon,
    ListIcon,
    MoreVerticalIcon,
    PlusIcon,
    SearchIcon,
    UserIcon
} from "lucide-react";
import { useState } from "react";

// Mock Data dựa trên yêu cầu của bạn
const classData = [
    {
        classId: "CLS-001",
        className: "IELTS Intensive Night Shift",
        course: { courseId: "ENG-IELTS-01", courseName: "IELTS Intensive 6.5+" },
        room: { roomId: "R-101", roomName: "Phòng Lab A" },
        startDate: "2026-05-15",
        teacher: { teacherId: "T-01", teacherName: "Ms. Selena" },
        currentStudent: 25,
        maxStudent: 30,
        status: "upcoming"
    },
    {
        classId: "CLS-002",
        className: "TOEIC Target Weekend",
        course: { courseId: "ENG-TOEIC-02", courseName: "TOEIC Target 750+" },
        room: { roomId: "R-202", roomName: "Phòng Hybrid" },
        startDate: "2026-04-10",
        teacher: { teacherId: "T-02", teacherName: "Mr. Nhật Huy" },
        currentStudent: 30,
        maxStudent: 30,
        status: "ongoing"
    },
    {
        classId: "CLS-003",
        className: "Business English Master",
        course: { courseId: "ENG-COMM-03", courseName: "Business English" },
        room: { roomId: "R-105", roomName: "Phòng VIP" },
        startDate: "2026-01-20",
        teacher: { teacherId: "T-05", teacherName: "Ms. Jennie" },
        currentStudent: 15,
        maxStudent: 20,
        status: "finished"
    }
];

export default function ClassManagement() {
    const [viewMode, setViewMode] = useState<"table" | "grid">("table");

    return (
        <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
            {/* 1. Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">
                        Academic Operations
                    </p>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">
                        Class Management
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                        <Label htmlFor="class-view" className="cursor-pointer">
                            {viewMode === "table" ? <ListIcon className="size-4 text-gray-500" /> : <LayoutGridIcon className="size-4 text-gray-500" />}
                        </Label>
                        <Switch
                            id="class-view"
                            checked={viewMode === "grid"}
                            onCheckedChange={(checked) => setViewMode(checked ? "grid" : "table")}
                        />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter w-20">
                            {viewMode === "grid" ? "Grid View" : "Table View"}
                        </span>
                    </div>

                    <Button className="bg-primary text-white px-6 h-11 rounded-md font-semibold">
                        <PlusIcon className="size-4 mr-2" /> New Class
                    </Button>
                </div>
            </div>

            {/* 2. Content Container */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden">
                {/* Filters Bar */}
                <div className="p-6 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <Button className="h-10 border-gray-300 text-white bg-primary">
                            <FileOutputIcon className="size-4 mr-2" />
                            Export
                            <ChevronDownIcon className="size-4 ml-1" />
                        </Button>

                        <div className="relative w-[260px]">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <Input placeholder="Search courses..." className="pl-9 h-10 border-gray-300 bg-white" />
                        </div>

                        <Button className="bg-white h-10 border-gray-300 text-gray-700 hover:bg-gray-50">
                            <FilterIcon className="size-4 mr-2" />
                            Filter
                            <ChevronDownIcon className="size-4 ml-1" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-400">Sort by:</span>
                        <Select defaultValue="newest">
                            <SelectTrigger className="w-[140px] h-11 rounded-xl border-gray-200">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                <SelectItem value="capacity">Capacity</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* 3. Rendering View Mode */}
                {viewMode === "table" ? (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-gray-50/80">
                                <TableRow className="border-none">
                                    <TableHead className="pl-8 w-12"><Checkbox /></TableHead>
                                    <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Class Info</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Teacher</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Schedule</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Enrolled</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Status</TableHead>
                                    <TableHead className="text-right pr-8 text-[11px] font-black uppercase text-gray-400 tracking-widest">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {classData.map((item) => (
                                    <TableRow key={item.classId} className="hover:bg-gray-50/50 border-b border-gray-100 transition-colors">
                                        <TableCell className="pl-8"><Checkbox /></TableCell>
                                        <TableCell>
                                            <div className="py-2">
                                                <p className="text-[10px] font-black text-primary uppercase mb-0.5">{item.classId}</p>
                                                <p className="font-bold text-gray-900">{item.className}</p>
                                                <p className="text-xs text-gray-400 font-medium">Course: {item.course.courseName}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                                                    <UserIcon className="size-4 text-blue-600" />
                                                </div>
                                                <span className="font-bold text-gray-700 text-sm">{item.teacher.teacherName}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-700">{item.startDate}</span>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">{item.room.roomName}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className="font-black text-gray-800">{item.currentStudent}/{item.maxStudent}</span>
                                                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${item.currentStudent >= item.maxStudent ? 'bg-red-500' : 'bg-emerald-500'}`}
                                                        style={{ width: `${(item.currentStudent / item.maxStudent) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell><StatusBadge status={item.status} /></TableCell>
                                        <TableCell className="text-right pr-8">
                                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white hover:shadow-sm"><MoreVerticalIcon className="size-5 text-gray-400" /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 bg-gray-50/30">
                        {classData.map((item) => (
                            <div key={item.classId} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-500 text-primary">
                                            <DoorOpenIcon className="size-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-primary tracking-widest">{item.classId}</p>
                                            <h3 className="font-black text-gray-900 text-lg leading-tight line-clamp-1">{item.className}</h3>
                                        </div>
                                    </div>
                                    <StatusBadge status={item.status} />
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                                        <CalendarIcon className="size-4 text-orange-500" />
                                        <span>Start: {item.startDate}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                                        <UserIcon className="size-4 text-blue-500" />
                                        <span>{item.teacher.teacherName}</span>
                                    </div>

                                    <div className="pt-4 border-t border-dashed border-gray-100">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-[10px] font-black text-gray-400 uppercase">Capacity</span>
                                            <span className="text-sm font-black text-gray-800">{item.currentStudent}/{item.maxStudent}</span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-1000 ${item.currentStudent >= item.maxStudent ? 'bg-red-500' : 'bg-emerald-500'}`}
                                                style={{ width: `${(item.currentStudent / item.maxStudent) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="size-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                                                <img src={`https://i.pravatar.cc/100?u=${item.classId}${i}`} alt="student" />
                                            </div>
                                        ))}
                                        <div className="size-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-400 shadow-sm">
                                            +{item.currentStudent - 3}
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-blue-50">
                                        Management →
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer Pagination */}
                <div className="p-6 border-t border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <p className="text-sm font-bold text-gray-400 italic">
                        Showing 1 to {classData.length} of {classData.length} classes
                    </p>
                    <Pagination className="w-auto">
                        <PaginationContent className="gap-2">
                            <PaginationItem><PaginationPrevious className="rounded-xl border-gray-200" href="#" /></PaginationItem>
                            <PaginationItem><PaginationLink isActive href="#" className="rounded-xl bg-gray-900 text-white border-none">1</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationNext className="rounded-xl border-gray-200" href="#" /></PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}

// Sub-component Badge Trạng thái
function StatusBadge({ status }: { status: string }) {
    const configs: Record<string, { label: string, style: string }> = {
        upcoming: { label: "Upcoming", style: "bg-blue-50 text-blue-600 border-blue-100" },
        ongoing: { label: "Ongoing", style: "bg-emerald-50 text-emerald-600 border-emerald-100" },
        finished: { label: "Finished", style: "bg-gray-100 text-gray-500 border-gray-200" }
    };

    const config = configs[status] || configs.upcoming;

    return (
        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${config.style}`}>
            {config.label}
        </span>
    );
}