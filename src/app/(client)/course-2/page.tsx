"use client";

import { CourseCard } from "@/components/common/course-card";
import { DataPagination } from "@/components/common/data-pagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getLevelLabel, levelColors, levelLabels } from "@/constants/label";
import { CourseSortBy, SortOrder } from "@/constants/sort";
import { CourseLevel } from "@/constants/type";
import { useGetCourses } from "@/queries/useCourseQuery";
import { Course, CourseParams } from "@/schemas/course.schema";
import { cn } from "@/utils/cn";
import {
    BookOpen,
    ChevronRight,
    Clock,
    Link,
    Search,
    Sparkles,
    Star,
} from "lucide-react";
import { useState } from "react";


export default function CoursePageV2() {
    const [params, setParams] = useState<CourseParams>({
        page: 1,
        limit: 12,
        sortOrder: SortOrder.DESC,
        sortBy: CourseSortBy.COURSE_NAME,
    });
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState("");

    const queryParams: CourseParams = {
        ...params,
        search: searchValue || undefined,
        level: selectedLevels.length === 1 ? selectedLevels[0] : undefined,
    };

    const { data, isLoading } = useGetCourses(queryParams);
    const courses: Course[] = data?.data || [];
    const meta = data?.meta;
    const totalItems = meta?.total || 0;
    const totalPages = meta?.totalPages || 0;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const val = (form.elements.namedItem("search") as HTMLInputElement).value;
        setSearchValue(val);
        setParams((prev) => ({ ...prev, page: 1 }));
    };

    const toggleLevel = (level: string) => {
        setSelectedLevels((prev) =>
            prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
        );
        setParams((prev) => ({ ...prev, page: 1 }));
    };

    const levels = Object.values(CourseLevel);

    return (
        <div data-role="student" className="min-h-screen bg-[var(--dashboard-bg)] pb-20 font-sans">

            {/* HERO BANNER */}
            <section className="relative min-h-[450px] flex items-center overflow-hidden bg-[var(--primary)] text-white py-16">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-20 pointer-events-none" />
                <div className="absolute -top-24 -right-24 size-96 bg-[var(--secondary)] rounded-full blur-[120px] opacity-10" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="w-full lg:w-3/5 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <Sparkles className="size-4 text-[var(--secondary)]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Khám phá tri thức</span>
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
                                Khóa học <span className="text-[var(--secondary)]">Theo trình độ</span> <br />
                                Phù hợp với bạn
                            </h1>

                            <p className="text-base text-white/70 font-medium max-w-xl mx-auto lg:mx-0">
                                Từ mất gốc đến chuyên gia — mỗi trình độ đều có lộ trình riêng. Dễ dàng tìm kiếm và so sánh khóa học phù hợp với năng lực hiện tại của bạn.
                            </p>

                            <div className="flex flex-wrap items-center gap-8 pt-4 justify-center lg:justify-start">
                                <div>
                                    <div className="text-3xl font-black text-[var(--secondary)]">{totalItems}+</div>
                                    <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Khóa học</div>
                                </div>
                                <div className="w-px h-10 bg-white/10 hidden sm:block" />
                                <div>
                                    <div className="text-3xl font-black text-white">{levels.length}</div>
                                    <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Trình độ</div>
                                </div>
                                <div className="w-px h-10 bg-white/10 hidden sm:block" />
                                <div>
                                    <div className="text-3xl font-black text-white">Cam kết</div>
                                    <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Đầu ra bằng văn bản</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-2/5 relative">
                            <div className="relative z-10 w-full max-w-[380px] mx-auto">
                                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border-8 border-white/10 shadow-2xl -rotate-2">
                                    <img
                                        src="https://i.pinimg.com/1200x/12/87/04/1287049f6970ae94903c28df1bbb6e0a.jpg"
                                        className="w-full h-full object-cover"
                                        alt="Students"
                                    />
                                </div>

                                <div className="absolute top-10 -right-6 bg-[var(--secondary)] text-[var(--primary)] px-6 py-3 rounded-2xl shadow-xl rotate-6 flex items-center gap-2">
                                    <Star className="size-4 fill-current" />
                                    <span className="font-black text-sm">4.9/5 Rating</span>
                                </div>

                                <div className="absolute bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl -rotate-6 flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <BookOpen className="size-5 text-[var(--primary)]" />
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-black text-gray-400 uppercase leading-none">Phân loại</div>
                                        <div className="text-xs font-black text-gray-900 uppercase tracking-tight">Đa dạng trình độ</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT: Filter + Grid */}
            <div className="container mx-auto px-6 mt-10 relative z-20">
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 mb-16">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* FILTER SIDEBAR — LEFT */}
                        <div className="lg:w-1/4 space-y-8">
                            <form onSubmit={handleSearch}>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-300" />
                                    <Input
                                        name="search"
                                        placeholder="Tìm khóa học..."
                                        className="h-12 pl-12 rounded-xl border-none bg-gray-50 focus-visible:ring-[var(--primary)]"
                                    />
                                </div>
                            </form>

                            <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider">Trình độ</h4>
                                {levels.map((level) => (
                                    <div key={level} className="flex items-center space-x-3">
                                        <Checkbox
                                            id={`level-${level}`}
                                            checked={selectedLevels.includes(level)}
                                            onCheckedChange={() => toggleLevel(level)}
                                            className="rounded-md border-gray-200 data-[state=checked]:bg-[var(--primary)]"
                                        />
                                        <label
                                            htmlFor={`level-${level}`}
                                            className="text-sm font-bold text-gray-500 cursor-pointer flex items-center gap-2"
                                        >
                                            {level}
                                            <span className="text-[10px] font-medium text-gray-400">— {levelLabels[level]}</span>
                                        </label>
                                    </div>
                                ))}
                                {selectedLevels.length > 0 && (
                                    <button
                                        onClick={() => { setSelectedLevels([]); setParams((prev) => ({ ...prev, page: 1 })); }}
                                        className="text-xs font-bold text-primary hover:underline"
                                    >
                                        Xóa bộ lọc
                                    </button>
                                )}
                            </div>

                            <div>
                                <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider mb-4">Sắp xếp theo</h4>
                                <Select
                                    value={params.sortBy}
                                    onValueChange={(val) => setParams((prev) => ({ ...prev, sortBy: val as CourseSortBy, page: 1 }))}
                                >
                                    <SelectTrigger className="h-12 rounded-xl border-none bg-gray-50 font-bold">
                                        <SelectValue placeholder="Chọn thứ tự" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-gray-100">
                                        <SelectItem value={CourseSortBy.COURSE_NAME}>Tên khóa học</SelectItem>
                                        <SelectItem value={CourseSortBy.TUITION_FEE}>Học phí</SelectItem>
                                        <SelectItem value={CourseSortBy.LEVEL}>Trình độ</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider mb-4">Thứ tự</h4>
                                <Select
                                    value={params.sortOrder}
                                    onValueChange={(val) => setParams((prev) => ({ ...prev, sortOrder: val as SortOrder, page: 1 }))}
                                >
                                    <SelectTrigger className="h-12 rounded-xl border-none bg-gray-50 font-bold">
                                        <SelectValue placeholder="Chọn thứ tự" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-gray-100">
                                        <SelectItem value={SortOrder.ASC}>Tăng dần</SelectItem>
                                        <SelectItem value={SortOrder.DESC}>Giảm dần</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* COURSE GRID — RIGHT */}
                        <div className="lg:w-3/4">
                            {isLoading ? (
                                <div className="flex justify-center py-20">
                                    <div className="size-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                </div>
                            ) : courses.length === 0 ? (
                                <div className="text-center py-20">
                                    <BookOpen className="size-12 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 font-bold text-lg">Không tìm thấy khóa học.</p>
                                    <p className="text-gray-400 text-sm mt-2">Thử thay đổi bộ lọc tìm kiếm.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h2 className="text-2xl font-black tracking-tighter text-gray-900">
                                                Tất cả khóa học
                                            </h2>
                                            <p className="text-xs text-gray-400 font-medium mt-1">
                                                Hiển thị {courses.length} / {totalItems} khóa học
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {courses.map((course) => (
                                            <CourseCard key={course.courseId} course={course} />
                                        ))}
                                    </div>

                                    {/* PAGINATION */}
                                    <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <p className="text-sm font-semibold text-gray-500">
                                            Hiển thị {courses.length} / {totalItems} khóa học
                                        </p>
                                        <DataPagination
                                            page={Number(params.page) || 1}
                                            totalPages={totalPages}
                                            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── CÁC PHẦN DƯỚI: hiển thị theo list 4 cột ngang (Thoát ra khỏi White Card giống file mẫu) ── */}
                {!isLoading && courses.length > 0 && (
                    <div className="space-y-16">
                        {levels.map((level) => {
                            const levelCourses = courses.filter((c) => c.level === level);
                            if (levelCourses.length === 0) return null;

                            return (
                                <section key={level} className="space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h2 className="text-3xl font-black tracking-tighter text-gray-900">
                                                    Trình độ {level}
                                                </h2>
                                                <span className={cn(
                                                    "text-[10px] font-black px-3 py-1 rounded-full border shadow-sm",
                                                    levelColors[level] || "bg-gray-50 text-gray-600 border-gray-200"
                                                )}>
                                                    {getLevelLabel(level)}
                                                </span>
                                            </div>
                                            <p className="text-gray-400 font-medium mt-1">
                                                Khám phá {levelCourses.length} lộ trình học phù hợp nhất
                                            </p>
                                        </div>
                                        {/* <Button variant="ghost" className="rounded-xl font-black text-[var(--primary)] gap-2 hover:bg-white">
                                            Xem tất cả <ChevronRight className="size-4" />
                                        </Button> */}
                                    </div>

                                    {/* Responsive 4 cột: 1 ở Mobile, 2 ở Tablet, 4 ở Desktop */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {levelCourses.slice(0, 4).map((course) => (
                                            <CourseCard key={course.courseId} course={course} />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

