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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    ChevronDownIcon,
    CreditCardIcon,
    FileOutputIcon,
    FilterIcon,
    LayoutGridIcon,
    ListIcon,
    MailIcon,
    MoreVerticalIcon,
    PhoneIcon,
    SearchIcon
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const teacherData = [
    {
        teacherId: "TEA52365",
        name: "Nguyễn Văn An",
        gender: "Male",
        mobile: "0905.555.0104",
        email: "an.nguyen@edupro.com",
        bankAccount: "190345678910",
        bankName: "Techcombank",
        salaryRate: "150,000",
        status: "Active",
        warningCount: 0,
        avatar: "https://i.pinimg.com/1200x/75/48/d8/7548d8bc381f16d63836e6a0ba7aecbe.jpg"
    },
    {
        teacherId: "TEA52366",
        name: "Lê Thị Hoài",
        gender: "Female",
        mobile: "0905.555.0105",
        email: "hoai.le@edupro.com",
        bankAccount: "007100123456",
        bankName: "Vietcombank",
        salaryRate: "180,000",
        status: "Inactive",
        warningCount: 2,
        avatar: "https://i.pinimg.com/1200x/10/48/2e/10482e76d338e28e303260164105cbdd.jpg"
    },
    {
        teacherId: "TEA52367",
        name: "Trần Minh Tâm",
        gender: "Male",
        mobile: "0912.333.444",
        email: "tam.tran@edupro.com",
        bankAccount: "10287654321",
        bankName: "MB Bank",
        salaryRate: "200,000",
        status: "Active",
        warningCount: 0,
        avatar: "https://i.pinimg.com/1200x/64/59/3a/64593aa2c30b8bbcfef774455a6f4630.jpg"
    },
    {
        teacherId: "TEA52368",
        name: "Phạm Thanh Thảo",
        gender: "Female",
        mobile: "0988.777.666",
        email: "thao.pham@edupro.com",
        bankAccount: "5678901234",
        bankName: "TPBank",
        salaryRate: "165,000",
        status: "Active",
        warningCount: 1,
        avatar: "https://i.pinimg.com/736x/5b/e7/71/5be7718aef5d4c1f898a12794bb23d3b.jpg"
    },
    {
        teacherId: "TEA52370",
        name: "Vũ Phương Linh",
        gender: "Female",
        mobile: "0966.444.555",
        email: "linh.vu@edupro.com",
        bankAccount: "9988776655",
        bankName: "VPBank",
        salaryRate: "155,000",
        status: "Active",
        warningCount: 0,
        avatar: "https://i.pinimg.com/1200x/4d/cf/94/4dcf94817fba100a8c3b6b48f3c6d41b.jpg"
    },
    {
        teacherId: "TEA52371",
        name: "Đỗ Mạnh Hùng",
        gender: "Male",
        mobile: "0933.888.999",
        email: "hung.do@edupro.com",
        bankAccount: "4455667788",
        bankName: "BIDV",
        salaryRate: "190,000",
        status: "Inactive",
        warningCount: 3,
        avatar: "https://i.pinimg.com/1200x/6f/2d/9e/6f2d9e6e1e8458645f053176972ceaca.jpg"
    },
    {
        teacherId: "TEA52372",
        name: "Ngô Kim Chi",
        gender: "Female",
        mobile: "0944.222.333",
        email: "chi.ngo@edupro.com",
        bankAccount: "6677889900",
        bankName: "VIB",
        salaryRate: "175,000",
        status: "Active",
        warningCount: 0,
        avatar: "https://i.pinimg.com/1200x/b8/01/72/b80172aa511d8ac917e1115c7f83d8dc.jpg"
    },
    {
        teacherId: "TEA52373",
        name: "Bùi Anh Tuấn",
        gender: "Male",
        mobile: "0909.123.789",
        email: "tuan.bui@edupro.com",
        bankAccount: "3322110044",
        bankName: "Sacombank",
        salaryRate: "210,000",
        status: "Active",
        warningCount: 0,
        avatar: "https://i.pinimg.com/736x/12/87/04/1287049f6970ae94903c28df1bbb6e0a.jpg"
    },
    {
        teacherId: "TEA52374",
        name: "Đặng Thu Hà",
        gender: "Female",
        mobile: "0888.666.555",
        email: "ha.dang@edupro.com",
        bankAccount: "7788991122",
        bankName: "Agribank",
        salaryRate: "140,000",
        status: "Active",
        warningCount: 0,
        avatar: "https://i.pinimg.com/1200x/7a/3d/73/7a3d730b13bcde56222047eb3cfde40d.jpg"
    }
];

export default function AdminTeacherPage() {
    // Chế độ hiển thị: 'table' hoặc 'grid'
    const [viewMode, setViewMode] = useState<"table" | "grid">("table");

    return (
        <div data-role="admin" className="flex flex-col gap-6 min-h-screen">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
                        Management
                    </p>
                    <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
                        Teacher List
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    {/* SWITCH CHẾ ĐỘ HIỂN THỊ */}
                    <div className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                        <Label htmlFor="view-mode" className="cursor-pointer">
                            {viewMode === "table" ? <ListIcon className="size-4 text-gray-500" /> : <LayoutGridIcon className="size-4 text-gray-500" />}
                        </Label>
                        <Switch
                            id="view-mode"
                            checked={viewMode === "grid"}
                            onCheckedChange={(checked) => setViewMode(checked ? "grid" : "table")}
                        />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                            {viewMode === "grid" ? "Card View" : "Table View"}
                        </span>
                    </div>

                    <Button className="bg-primary text-white px-6 h-11 rounded-md font-semibold">
                        Add Teacher
                    </Button>
                </div>
            </div>

            {/* CARD CONTAINER */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                {/* TOOLBAR */}
                <div className="p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <Button className="h-10 border-gray-300 text-gray-700 text-white bg-primary">
                            <FileOutputIcon className="size-4 mr-2" />
                            Export
                            <ChevronDownIcon className="size-4 ml-1" />
                        </Button>

                        <div className="relative w-[260px]">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <Input
                                placeholder="Search..."
                                className="pl-9 h-10 border-gray-300 bg-white"
                            />
                        </div>

                        <Button className="bg-white h-10 border-gray-300 text-gray-700 hover:bg-gray-50">
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

                {/* HIỂN THỊ NỘI DUNG DỰA TRÊN VIEW MODE */}
                {viewMode === "table" ? (
                    /* 1. TABLE VIEW */
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-[#f1f2f4]">
                                <TableRow className="border-none">
                                    <TableHead className="pl-6 w-12">
                                        <Checkbox />
                                    </TableHead>
                                    <TableHead className="text-sm font-semibold text-black">S.L</TableHead>
                                    <TableHead className="text-sm font-semibold text-black">ID</TableHead>
                                    <TableHead className="text-sm font-semibold text-black">Name</TableHead>
                                    <TableHead className="text-sm font-semibold text-black">Gender</TableHead>
                                    <TableHead className="text-sm font-semibold text-gray-600">Contact</TableHead>
                                    <TableHead className="text-sm font-semibold text-gray-600">Bank Details</TableHead>
                                    <TableHead className="text-sm font-semibold text-gray-600 text-center">Warnings</TableHead>
                                    <TableHead className="text-sm font-semibold text-gray-600">Salary Rate</TableHead>
                                    <TableHead className="text-sm font-semibold text-gray-600">Status</TableHead>
                                    <TableHead className="text-right pr-6 text-sm font-semibold text-gray-600">Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {teacherData.map((teacher, index) => (
                                    <TableRow key={teacher.teacherId} className="hover:bg-gray-50 border border-gray-200">

                                        <TableCell className="pl-6">
                                            <Checkbox />
                                        </TableCell>

                                        <TableCell className="text-gray-500 font-medium">
                                            {String(index + 1).padStart(2, "0")}
                                        </TableCell>

                                        <TableCell>
                                            <Link href="#" className="text-primary font-semibold hover:underline">
                                                {teacher.teacherId}
                                            </Link>
                                        </TableCell>

                                        {/* NAME & AVATAR - Khớp page.tsx */}
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-full overflow-hidden bg-gray-100">
                                                    <img
                                                        src={teacher.avatar}
                                                        alt={teacher.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="font-semibold text-gray-800">
                                                    {teacher.name}
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-gray-500">{teacher.gender}</TableCell>

                                        <TableCell>
                                            <div className="text-gray-800 font-medium">{teacher.mobile}</div>
                                            <div className="text-xs text-gray-400">{teacher.email}</div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="text-gray-800 text-xs font-semibold">{teacher.bankAccount}</div>
                                            <div className="text-[10px] text-gray-400 uppercase">{teacher.bankName}</div>
                                        </TableCell>

                                        <TableCell className="text-center">
                                            <span className={`font-bold ${teacher.warningCount > 0 ? 'text-red-500' : 'text-gray-300'}`}>
                                                {teacher.warningCount}
                                            </span>
                                        </TableCell>

                                        <TableCell className="text-gray-800 font-semibold">{teacher.salaryRate}đ</TableCell>

                                        {/* STATUS - Khớp page.tsx */}
                                        <TableCell>
                                            <span
                                                className={`px-3 py-1 rounded-md text-sm font-medium ${teacher.status === "Active"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-500"
                                                    }`}
                                            >
                                                {teacher.status}
                                            </span>
                                        </TableCell>

                                        {/* ACTION - Khớp page.tsx */}
                                        <TableCell className="text-right pr-6">
                                            <Button variant="ghost" size="icon" className="size-9">
                                                <MoreVerticalIcon className="size-5 text-gray-500" />
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    /* 2. CARD VIEW (Giao diện dạng Thẻ) */
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 bg-gray-50/50">
                        {teacherData.map((teacher) => (
                            <div key={teacher.teacherId} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group">
                                <div className="absolute top-4 right-4">
                                    <Button variant="ghost" size="icon" className="rounded-full"><MoreVerticalIcon className="size-4" /></Button>
                                </div>

                                <div className="flex items-start gap-4 mb-6">
                                    <div className="size-16 rounded-2xl overflow-hidden border-2 border-primary/10">
                                        <img src={teacher.avatar} alt={teacher.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-gray-800 text-lg leading-tight">{teacher.name}</h3>
                                        <p className="text-xs font-bold text-primary uppercase mt-1">{teacher.teacherId}</p>
                                        <div className={`mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase ${teacher.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                                            {teacher.status}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-dashed border-gray-100">
                                    <div className="flex items-center gap-3 text-gray-500">
                                        <MailIcon className="size-3.5" />
                                        <span className="text-xs font-medium truncate">{teacher.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500">
                                        <PhoneIcon className="size-3.5" />
                                        <span className="text-xs font-medium">{teacher.mobile}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500">
                                        <CreditCardIcon className="size-3.5" />
                                        <span className="text-xs font-bold text-gray-700">{teacher.bankAccount}</span>
                                        <span className="text-[10px] bg-gray-100 px-1.5 rounded">{teacher.bankName}</span>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center justify-between bg-slate-50 p-3 rounded-2xl">
                                    <span className="text-[10px] font-black text-gray-400 uppercase">Salary Rate</span>
                                    <span className="font-black text-gray-800">{teacher.salaryRate}đ</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* FOOTER */}
                <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        Showing 1 to {teacherData.length} of {teacherData.length} entries
                    </p>
                    <Pagination className="w-auto">
                        <PaginationContent className="flex justify-between gap-8">
                            <PaginationItem><PaginationPrevious className="h-9 w-9" href="#" /></PaginationItem>
                            <PaginationItem><PaginationLink isActive href="#" className="h-9 w-9 bg-primary text-white ml-3">1</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationNext className="h-9 w-9" href="#" /></PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}