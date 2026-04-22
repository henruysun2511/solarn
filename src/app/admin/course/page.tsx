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
    ClockIcon,
    FileOutputIcon,
    FilterIcon,
    LayersIcon,
    LayoutGridIcon,
    ListIcon,
    MoreVerticalIcon,
    SearchIcon,
    UsersIcon
} from "lucide-react";
import { useState } from "react";
import { CourseCreateDialog } from "./course-create-dialog";

const courseData = [
    {
        courseId: "ENG-IELTS-01",
        courseName: "IELTS Intensive 6.5+",
        level: "Advanced",
        tuitionFee: "8,500,000",
        totalSessions: 48,
        prerequisiteCourseId: "ENG-B2",
        classes: 3,
        img: "https://i.pinimg.com/736x/b6/95/53/b6955380e4940dd6e221cae7b8359dd6.jpg"
    },
    {
        courseId: "ENG-TOEIC-02",
        courseName: "TOEIC Target 750+",
        level: "Intermediate",
        tuitionFee: "4,200,000",
        totalSessions: 24,
        prerequisiteCourseId: "ENG-B1",
        classes: 5,
        img: "https://i.pinimg.com/736x/1e/16/48/1e1648a93ef7e20d4f1f89e120c0226e.jpg"
    },
    {
        courseId: "ENG-COMM-03",
        courseName: "Business English Communication",
        level: "Intermediate",
        tuitionFee: "5,800,000",
        totalSessions: 30,
        prerequisiteCourseId: "None",
        classes: 6,
        img: "https://i.pinimg.com/1200x/df/fb/5c/dffb5cde4038f7c0cdb2012b90fcecc8.jpg"
    },
    {
        courseId: "ENG-KIDS-04",
        courseName: "English for Kids (Starters)",
        level: "Beginner",
        tuitionFee: "3,500,000",
        totalSessions: 20,
        prerequisiteCourseId: "None",
        classes: 8,
        img: "https://i.pinimg.com/1200x/89/0c/c2/890cc25d844b9181e734b0b8a1954540.jpg"
    },
    {
        courseId: "ENG-GRAM-05",
        courseName: "Advanced Grammar Masterclass",
        level: "Advanced",
        tuitionFee: "3,200,000",
        totalSessions: 16,
        prerequisiteCourseId: "ENG-B1",
        classes: 2,
        img: "https://i.pinimg.com/1200x/a9/cc/af/a9ccaf53afe5d50c87c0ba1d6a36d34f.jpg"
    },
    {
        courseId: "ENG-IELTS-FOUND",
        courseName: "IELTS Foundation 5.0",
        level: "Beginner",
        tuitionFee: "6,500,000",
        totalSessions: 40,
        prerequisiteCourseId: "None",
        classes: 4,
        img: "https://i.pinimg.com/736x/12/a5/ba/12a5ba210eda3bc30cb930f0fbe37226.jpg"
    },
    {
        courseId: "ENG-VOCAB-07",
        courseName: "Academic Vocabulary Builder",
        level: "Intermediate",
        tuitionFee: "2,800,000",
        totalSessions: 12,
        prerequisiteCourseId: "None",
        classes: 10,
        img: "https://i.pinimg.com/1200x/53/67/18/536718458928e324cba7112e8dbd92dd.jpg"
    },
    {
        courseId: "ENG-PRONUN-08",
        courseName: "Standard American Accent",
        level: "Beginner",
        tuitionFee: "4,500,000",
        totalSessions: 24,
        prerequisiteCourseId: "None",
        classes: 3,
        img: "https://i.pinimg.com/1200x/1d/1c/86/1d1c867861498321a988765e3268fbcf.jpg"
    }
];

export default function AdminCoursePage() {
    const [viewMode, setViewMode] = useState<"table" | "grid">("table");

    return (
        <>
            <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
                            Management
                        </p>
                        <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
                            Course List
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
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
                            Add Course
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
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

                    {viewMode === "table" ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-[#f1f2f4]">
                                    <TableRow className="border-none">
                                        <TableHead className="pl-6 w-12"><Checkbox /></TableHead>
                                        <TableHead className="text-sm font-semibold text-black">ID</TableHead>
                                        <TableHead className="text-sm font-semibold text-black">Course Name</TableHead>
                                        <TableHead className="text-sm font-semibold text-gray-600">Level</TableHead>
                                        <TableHead className="text-sm font-semibold text-gray-600">Sessions</TableHead>
                                        <TableHead className="text-sm font-semibold text-gray-600">Tuition</TableHead>
                                        <TableHead className="text-sm font-semibold text-gray-600">Prerequisite</TableHead>
                                        <TableHead className="text-sm font-semibold text-gray-600 text-center">Classes</TableHead>
                                        <TableHead className="text-right pr-6 text-sm font-semibold text-gray-600">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {courseData.map((course) => (
                                        <TableRow key={course.courseId} className="hover:bg-gray-50 border border-gray-200">
                                            <TableCell className="pl-6"><Checkbox /></TableCell>
                                            <TableCell className="text-primary font-semibold">{course.courseId}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3 py-1">
                                                    <div className="size-10 rounded-lg overflow-hidden bg-gray-100">
                                                        <img src={course.img} alt={course.courseName} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="font-semibold text-gray-800">{course.courseName}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <BadgeLevel level={course.level} />
                                            </TableCell>
                                            <TableCell className="text-gray-500">{course.totalSessions} sessions</TableCell>
                                            <TableCell className="font-bold text-gray-800">{course.tuitionFee}đ</TableCell>
                                            <TableCell className="text-gray-400 text-xs italic">{course.prerequisiteCourseId}</TableCell>
                                            <TableCell className="text-center font-bold text-slate-700">{course.classes}</TableCell>
                                            <TableCell className="text-right pr-6">
                                                <Button variant="ghost" size="icon" className="size-9"><MoreVerticalIcon className="size-5 text-gray-500" /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-gray-50/50">
                            {courseData.map((course) => (
                                <div key={course.courseId} className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm group hover:shadow-md transition-all">
                                    <div className="h-40 relative">
                                        <img src={course.img} alt={course.courseName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-3 left-3">
                                            <BadgeLevel level={course.level} />
                                        </div>
                                        <div className="absolute top-3 right-3">
                                            <Button size="icon" className="size-8 rounded-full bg-white/90 text-gray-800 hover:bg-white shadow-sm">
                                                <MoreVerticalIcon className="size-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{course.courseId}</p>
                                        <h3 className="font-bold text-gray-800 line-clamp-1 mb-4">{course.courseName}</h3>

                                        <div className="grid grid-cols-2 gap-y-3 mb-5">
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <ClockIcon className="size-3.5 text-slate-400" />
                                                <span className="text-xs font-medium">{course.totalSessions} tiết</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <UsersIcon className="size-3.5 text-slate-400" />
                                                <span className="text-xs font-medium">{course.classes} lớp</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500 col-span-2">
                                                <LayersIcon className="size-3.5 text-slate-400" />
                                                <span className="text-xs font-medium truncate">Y/c: {course.prerequisiteCourseId}</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-dashed border-gray-100 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-gray-400 uppercase">Tuition Fee</span>
                                                <span className="text-lg font-black text-gray-800">{course.tuitionFee}đ</span>
                                            </div>
                                            <Button size="sm" variant="ghost" className="rounded-xl text-primary font-bold hover:bg-primary/5">
                                                Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <p className="text-sm text-gray-500">
                            Showing 1 to {courseData.length} of {courseData.length} entries
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
            <CourseCreateDialog />
        </>

    );
}

function BadgeLevel({ level }: { level: string }) {
    const styles: Record<string, string> = {
        Beginner: "bg-green-100 text-green-600",
        Intermediate: "bg-blue-100 text-blue-600",
        Advanced: "bg-purple-100 text-purple-600",
    };
    return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${styles[level] || "bg-gray-100"}`}>
            {level}
        </span>
    );
}