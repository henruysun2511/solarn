"use client";

import { DataPagination } from "@/components/common/data-pagination";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/common/user-avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { GenderType } from "@/constants/type";
import { SortOrder, TeacherSortBy } from "@/constants/sort";
import { useGetTeachers } from "@/queries/useTeacherQuery";
import { TeacherParams } from "@/schemas/teacher.schema";
import {
    BookOpen,
    GraduationCap,
    Mail,
    Phone,
    School,
    Search,
    SortAsc,
    SortDesc,
    Users,
    Venus,
    Mars,
} from "lucide-react";
import { useState } from "react";

export default function TeacherListPage() {
    const [params, setParams] = useState<TeacherParams>({
        page: 1,
        limit: 12,
        sortOrder: SortOrder.ASC,
        sortBy: TeacherSortBy.NAME,
    });

    const { data, isLoading } = useGetTeachers(params);
    const teachers = data?.data || [];
    const meta = data?.meta;
    const totalItems = meta?.total || 0;
    const totalPages = meta?.totalPages || 0;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const searchVal = (form.elements.namedItem("search") as HTMLInputElement).value;
        setParams((prev) => ({ ...prev, search: searchVal || undefined, page: 1 }));
    };

    return (
        <div className="flex flex-col min-h-screen bg-[var(--dashboard-bg)] font-sans antialiased text-foreground">
            {/* HERO BANNER */}
            <section className="relative min-h-[450px] flex items-center overflow-hidden bg-[var(--primary)] text-white py-20">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-20 pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 size-96 bg-[var(--secondary)] rounded-full blur-[120px] opacity-20" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-3/5 space-y-8 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <GraduationCap className="size-4 text-[var(--secondary)]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Đội ngũ giảng viên</span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
                                Gặp gỡ <span className="text-[var(--secondary)]">Giáo viên</span> <br />
                                của chúng tôi
                            </h1>

                            <p className="text-lg text-white/70 font-medium max-w-xl mx-auto lg:mx-0">
                                Đội ngũ giáo viên giàu kinh nghiệm, tận tâm và luôn đồng hành cùng bạn trên con đường chinh phục tiếng Anh.
                            </p>

                            <div className="flex flex-wrap items-center gap-8 pt-4 justify-center lg:justify-start">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                        <Users className="size-6 text-[var(--secondary)]" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black leading-none">{totalItems}</div>
                                        <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Giáo viên</div>
                                    </div>
                                </div>
                                <div className="w-px h-10 bg-white/10 hidden sm:block" />
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                        <School className="size-6 text-[var(--secondary)]" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black leading-none">{meta?.totalPages || 0}</div>
                                        <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Chuyên môn</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-2/5 relative">
                            <div className="relative z-10 w-full aspect-square max-w-[400px] mx-auto">
                                <div className="w-full h-full rounded-[3rem] overflow-hidden border-[12px] border-white/10 shadow-2xl rotate-3">
                                    <img
                                        src="https://i.pinimg.com/1200x/64/59/3a/64593aa2c30b8bbcfef774455a6f4630.jpg"
                                        className="w-full h-full object-cover scale-110"
                                        alt="Teachers"
                                    />
                                </div>
                                <div className="absolute -bottom-8 -left-8 bg-white p-5 rounded-[2rem] shadow-2xl flex items-center gap-4">
                                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <GraduationCap className="size-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-gray-400 uppercase">Chất lượng</div>
                                        <div className="text-lg font-black text-gray-900 leading-none">Chuyên gia</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEARCH & FILTER */}
            <section className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <Input
                                name="search"
                                placeholder="Tìm kiếm giáo viên..."
                                className="h-11 pl-10 rounded-xl border-gray-200 bg-gray-50 placeholder:text-gray-400 text-sm font-semibold"
                            />
                        </form>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                <Select
                                    value={params.sortBy}
                                    onValueChange={(val) => setParams((prev) => ({ ...prev, sortBy: val as TeacherSortBy, page: 1 }))}
                                >
                                    <SelectTrigger className="w-[150px] h-11 border-gray-200 rounded-xl bg-gray-50 text-sm font-semibold">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value={TeacherSortBy.NAME} className="rounded-lg text-xs font-medium">Tên</SelectItem>
                                        <SelectItem value={TeacherSortBy.CODE} className="rounded-lg text-xs font-medium">Mã</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                <Select
                                    value={params.sortOrder}
                                    onValueChange={(val) => setParams((prev) => ({ ...prev, sortOrder: val as SortOrder, page: 1 }))}
                                >
                                    <SelectTrigger className="w-[130px] h-11 border-gray-200 rounded-xl bg-gray-50 text-sm font-semibold">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value={SortOrder.ASC} className="rounded-lg text-xs font-medium">
                                            <div className="flex items-center gap-2">
                                                <SortAsc className="size-4 text-gray-400" />
                                                <span>A-Z</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value={SortOrder.DESC} className="rounded-lg text-xs font-medium">
                                            <div className="flex items-center gap-2">
                                                <SortDesc className="size-4 text-gray-400" />
                                                <span>Z-A</span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TEACHER GRID */}
            <section className="py-16 flex-1 container mx-auto px-6">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="size-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                ) : teachers.length === 0 ? (
                    <div className="text-center py-20">
                        <GraduationCap className="size-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-bold text-lg">Không tìm thấy giáo viên.</p>
                        <p className="text-gray-400 text-sm mt-2">Thử thay đổi bộ lọc tìm kiếm.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {teachers.map((teacher: any) => {
                            const specialties = teacher.teacherSpecialties || [];
                            const gender = teacher.profile?.gender;
                            return (
                                <div
                                    key={teacher.teacherId}
                                    className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                                >
                                    {/* Avatar Section */}
                                    <div className="relative h-40 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
                                        <div className="transition-transform group-hover:scale-105">
                                            <UserAvatar
                                                avatarUrl={teacher.profile?.avatarUrl}
                                                gender={gender}
                                                fullName={teacher.profile?.fullName}
                                                className="size-24 border-4 border-white shadow-lg"
                                            />
                                        </div>
                                        {gender && (
                                            <div className={`absolute top-4 right-4 size-8 rounded-full flex items-center justify-center shadow-sm border-2 border-white ${gender === GenderType.MALE ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"}`}>
                                                {gender === GenderType.MALE ? <Mars className="size-4" /> : <Venus className="size-4" />}
                                            </div>
                                        )}
                                    </div>

                                    {/* Info Section */}
                                    <div className="p-5 pt-4">
                                        <h3 className="text-lg font-black text-gray-900 text-center mb-0.5">
                                            {teacher.profile?.fullName || "Chưa cập nhật"}
                                        </h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mb-4">
                                            {teacher.teacherCode}
                                        </p>

                                        {/* Specialties */}
                                        {specialties.length > 0 && (
                                            <div className="mb-4">
                                                <div className="flex items-center gap-1.5 mb-2">
                                                    <BookOpen className="size-3.5 text-primary" />
                                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                                        Chuyên môn ({specialties.length})
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {specialties.slice(0, 3).map((s: any) => (
                                                        <span
                                                            key={s.specialtyId}
                                                            className="text-[11px] font-semibold bg-primary/5 text-primary px-2.5 py-1 rounded-lg border border-primary/10"
                                                        >
                                                            {s.course?.courseName || "---"}
                                                        </span>
                                                    ))}
                                                    {specialties.length > 3 && (
                                                        <span className="text-[11px] font-semibold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-lg">
                                                            +{specialties.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Contact Info */}
                                        <div className="space-y-2 pt-3 border-t border-gray-100">
                                            {teacher.profile?.email && (
                                                <div className="flex items-center gap-2.5 text-xs text-gray-500">
                                                    <Mail className="size-3.5 text-gray-400 shrink-0" />
                                                    <span className="truncate font-medium">{teacher.profile.email}</span>
                                                </div>
                                            )}
                                            {teacher.profile?.phone && (
                                                <div className="flex items-center gap-2.5 text-xs text-gray-500">
                                                    <Phone className="size-3.5 text-gray-400 shrink-0" />
                                                    <span className="font-medium">{teacher.profile.phone}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* PAGINATION */}
                {!isLoading && teachers.length > 0 && (
                    <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-200">
                        <p className="text-sm font-semibold text-gray-500">
                            Hiển thị {teachers.length} / {totalItems} giáo viên
                        </p>
                        <DataPagination
                            page={Number(params.page) || 1}
                            totalPages={totalPages}
                            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
                        />
                    </div>
                )}
            </section>
        </div>
    );
}
