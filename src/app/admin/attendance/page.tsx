"use client"

import { Button } from "@/components/ui/button";
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
    SearchIcon
} from "lucide-react";

// Dữ liệu mẫu cho điểm danh
const attendanceData = [
    {
        admissionNo: "AD52365",
        name: "Marvin McKinney",
        rollNo: "12",
        class: "Class 1 (A)",
        attendance: "Absent",
        note: "",
        avatar: "https://i.pravatar.cc/150?u=marvin"
    },
    {
        admissionNo: "AD52366",
        name: "Cody Fisher",
        rollNo: "8",
        class: "Class 2 (B)",
        attendance: "Present",
        note: "",
        avatar: "https://i.pravatar.cc/150?u=cody"
    },
    {
        admissionNo: "AD52367",
        name: "Jenny Wilson",
        rollNo: "9",
        class: "Class 3 (C)",
        attendance: "Late",
        note: "",
        avatar: "https://i.pravatar.cc/150?u=jenny"
    },
    {
        admissionNo: "AD52368",
        name: "Guy Hawkins",
        rollNo: "5",
        class: "Class 2 (A)",
        attendance: "Absent",
        note: "Sick leave",
        avatar: "https://i.pravatar.cc/150?u=guy"
    },
    {
        admissionNo: "AD52369",
        name: "Esther Howard",
        rollNo: "15",
        class: "Class 3 (B)",
        attendance: "Present",
        note: "",
        avatar: "https://i.pravatar.cc/150?u=esther"
    }
];

const attendanceOptions = [
    { label: "Present", value: "Present", color: "text-green-600", border: "peer-checked:border-green-600" },
    { label: "Late", value: "Late", color: "text-amber-500", border: "peer-checked:border-amber-500" },
    { label: "Absent", value: "Absent", color: "text-red-500", border: "peer-checked:border-red-500" },
    { label: "Halfday", value: "Halfday", color: "text-blue-500", border: "peer-checked:border-blue-500" },
    { label: "Holiday", value: "Holiday", color: "text-gray-500", border: "peer-checked:border-gray-500" },
];

export default function AdminAttendancePage() {
    return (
        <div className="flex flex-col gap-6 min-h-screen">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-[26px] font-bold text-gray-800">Attendance</h1>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        Dashboard / <span className="text-primary font-medium">Attendance</span>
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white border-gray-300 h-11 px-4">
                        <CalendarIcon className="size-4 mr-2" />
                        Select Date
                    </Button>
                    <Button className="bg-primary text-white px-6 h-11 rounded-md font-semibold">
                        Save Attendance
                    </Button>
                </div>
            </div>

            {/* MAIN CARD */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                {/* TOOLBAR */}
                <div className="p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <Button variant="outline" className="h-10 border-gray-300 text-gray-700">
                            <FileOutputIcon className="size-4 mr-2" />
                            Export
                            <ChevronDownIcon className="size-4 ml-1" />
                        </Button>

                        <div className="relative w-[260px]">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <Input
                                placeholder="Search by name or ID..."
                                className="pl-9 h-10 border-gray-300 bg-white"
                            />
                        </div>

                        <Button variant="outline" className="h-10 border-gray-300 text-gray-700">
                            <FilterIcon className="size-4 mr-2" />
                            Filter
                            <ChevronDownIcon className="size-4 ml-1" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        Rows per page:
                        <Select defaultValue="10">
                            <SelectTrigger className="w-[70px] h-10 border-gray-300">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* TABLE */}
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
                                <TableRow key={student.admissionNo} className="hover:bg-gray-50 transition-colors">
                                    <TableCell className="pl-6"><Checkbox /></TableCell>
                                    <TableCell className="text-gray-500 font-medium">
                                        {String(index + 1).padStart(2, "0")}
                                    </TableCell>
                                    <TableCell className="text-primary font-semibold">{student.admissionNo}</TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="size-9 rounded-full overflow-hidden bg-gray-100 shrink-0">
                                                <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-800 leading-tight">{student.name}</div>
                                                <div className="text-[12px] text-gray-400">Roll No: {student.rollNo}</div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-gray-600">{student.class}</TableCell>

                                    {/* ATTENDANCE SELECTION */}
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
                                                        <div className={`size-4 rounded-full border-2 border-gray-300 transition-all ${option.border} peer-checked:border-[5px]`} />
                                                    </div>
                                                    <span className={`text-sm font-medium text-gray-500 peer-checked:${option.color} transition-colors`}>
                                                        {option.label}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </TableCell>

                                    {/* NOTE INPUT */}
                                    <TableCell className="pl-10">
                                        <Input
                                            placeholder="Write note..."
                                            defaultValue={student.note}
                                            className="h-9 border-gray-200 focus-visible:ring-primary w-[180px]"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* FOOTER */}
                <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <p className="text-sm text-gray-500 font-medium">
                        Showing 1 to {attendanceData.length} of {attendanceData.length} entries
                    </p>

                    <Pagination className="w-auto">
                        <PaginationContent className="gap-2">
                            <PaginationItem>
                                <PaginationPrevious href="#" className="border-gray-200 hover:bg-gray-100" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink isActive href="#" className="bg-primary text-white hover:bg-primary/90 border-none">
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" className="border-gray-200 hover:bg-gray-100" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}