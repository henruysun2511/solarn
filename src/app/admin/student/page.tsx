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
    ChevronDownIcon,
    FileOutputIcon,
    FilterIcon,
    MoreVerticalIcon,
    SearchIcon
} from "lucide-react";
import Link from "next/link";



const studentData = [
    {
        admissionNo: "AD52365",
        name: "Đặng Nhật Huy",
        rollNo: "12",
        class: "Class 1 (A)",
        dob: "05 May 2012",
        gender: "Male",
        mobile: "209.555.0104",
        category: "General",
        status: "Active",
        avatar: "https://i.pinimg.com/1200x/75/48/d8/7548d8bc381f16d63836e6a0ba7aecbe.jpg"
    },
    {
        admissionNo: "AD52366",
        name: "Đặng Quang Tú",
        rollNo: "1",
        class: "Class 2 (B)",
        dob: "05 May 2012",
        gender: "Female",
        mobile: "209.555.0104",
        category: "Special",
        status: "Inactive",
        avatar: "https://i.pinimg.com/1200x/10/48/2e/10482e76d338e28e303260164105cbdd.jpg"
    },
    {
        admissionNo: "AD52366",
        name: "Nguyễn Thị Hoài",
        rollNo: "1",
        class: "Class 2 (B)",
        dob: "05 May 2012",
        gender: "Female",
        mobile: "209.555.0104",
        category: "Special",
        status: "Inactive",
        avatar: "https://i.pinimg.com/1200x/10/48/2e/10482e76d338e28e303260164105cbdd.jpg"
    },
    {
        admissionNo: "AD52366",
        name: "Nguyễn Thị Hoài",
        rollNo: "1",
        class: "Class 2 (B)",
        dob: "05 May 2012",
        gender: "Female",
        mobile: "209.555.0104",
        category: "Special",
        status: "Inactive",
        avatar: "https://i.pinimg.com/1200x/10/48/2e/10482e76d338e28e303260164105cbdd.jpg"
    }
];

export default function AdminStudentPage() {
    return (
        <div data-role="admin" className="flex flex-col gap-6 min-h-screen">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
                        Management
                    </p>
                    <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
                        Student List
                    </h1>
                </div>

                <Button className="bg-primary text-white px-6 h-11 rounded-md font-semibold">
                    Add Student
                </Button>
            </div>

            {/* CARD */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                {/* TOOLBAR */}
                <div className="p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div className="flex flex-wrap items-center gap-3">

                        {/* EXPORT */}
                        <Button className="h-10 border-gray-300 text-gray-700 text-white">
                            <FileOutputIcon className="size-4 mr-2" />
                            Export
                            <ChevronDownIcon className="size-4 ml-1" />
                        </Button>

                        {/* SEARCH */}
                        <div className="relative w-[260px]">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <Input
                                placeholder="Search..."
                                className="pl-9 h-10 border-gray-300 bg-white"
                            />
                        </div>

                        {/* FILTER */}
                        <Button className="bg-white h-10 border-gray-300 text-gray-700">
                            <FilterIcon className="size-4 mr-2" />
                            Filter
                            <ChevronDownIcon className="size-4 ml-1" />
                        </Button>
                    </div>

                    {/* ROWS */}
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
                        <TableHeader className="bg-[#f1f2f4]">
                            <TableRow className="border-none">
                                <TableHead className="pl-6 w-12">
                                    <Checkbox />
                                </TableHead>
                                <TableHead className="text-sm font-semibold text-black">S.L</TableHead>
                                <TableHead className="text-sm font-semibold text-black">Admission No</TableHead>
                                <TableHead className="text-sm font-semibold text-black">Name</TableHead>
                                <TableHead className="text-sm font-semibold text-black">Class</TableHead>
                                <TableHead className="text-sm font-semibold text-black">Date of Birth</TableHead>
                                <TableHead className="text-sm font-semibold text-black">Gender</TableHead>
                                <TableHead className="text-sm font-semibold text-gray-600">Mobile Number</TableHead>
                                <TableHead className="text-sm font-semibold text-gray-600">Category</TableHead>
                                <TableHead className="text-sm font-semibold text-gray-600">Status</TableHead>
                                <TableHead className="text-right pr-6 text-sm font-semibold text-gray-600">Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {studentData.map((student, index) => (
                                <TableRow key={student.admissionNo} className="hover:bg-gray-50 border border-gray-200">

                                    <TableCell className="pl-6">
                                        <Checkbox />
                                    </TableCell>

                                    <TableCell className="text-gray-500 font-medium">
                                        {String(index + 1).padStart(2, "0")}
                                    </TableCell>

                                    <TableCell>
                                        <Link href="#" className="text-primary font-semibold hover:underline">
                                            {student.admissionNo}
                                        </Link>
                                    </TableCell>

                                    {/* NAME */}
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full overflow-hidden bg-gray-100">
                                                <img
                                                    src={student.avatar}
                                                    alt={student.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-800">
                                                    {student.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Roll No: {student.rollNo}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-gray-500">{student.class}</TableCell>
                                    <TableCell className="text-gray-500">{student.dob}</TableCell>
                                    <TableCell className="text-gray-500">{student.gender}</TableCell>
                                    <TableCell className="text-gray-500">{student.mobile}</TableCell>
                                    <TableCell className="text-gray-500">{student.category}</TableCell>

                                    {/* STATUS */}
                                    <TableCell>
                                        <span
                                            className={`px-3 py-1 rounded-md text-sm font-medium ${student.status === "Active"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-500"
                                                }`}
                                        >
                                            {student.status}
                                        </span>
                                    </TableCell>

                                    {/* ACTION */}
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

                {/* FOOTER */}
                <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        Showing 1 to {studentData.length} of {studentData.length} entries
                    </p>

                    <Pagination className="w-auto">
                        <PaginationContent className="flex justify-between gap-8">

                            <PaginationItem>
                                <PaginationPrevious className="h-9 w-9" href="#" />
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationLink
                                    isActive
                                    href="#"
                                    className="h-9 w-9 bg-primary text-white ml-3"
                                >
                                    1
                                </PaginationLink>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationNext className="h-9 w-9" href="#" />
                            </PaginationItem>

                        </PaginationContent>
                    </Pagination>
                </div>

            </div>
        </div>
    );
}