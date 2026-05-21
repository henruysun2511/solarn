"use client";

import { DataPagination } from "@/components/common/data-pagination";
import { Loading } from "@/components/common/loading";
import { PaginationInfo } from "@/components/common/pagination-info";
import { UserAvatar } from "@/components/common/user-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SortOrder, StudentSortBy } from "@/constants/sort";
import { useDebounce } from "@/hooks/useDebouce";
import { useGetStudentsByClass } from "@/queries/useStudentQuery";
import { Search, SortAsc, SortDesc, UserPlus } from "lucide-react";
import { useState } from "react";
import { AddStudentDialog } from "./class-add-student-dialog";

export function ClassStudentTab({ classId }: { classId: string }) {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);
    const [sortBy, setSortBy] = useState<StudentSortBy>(StudentSortBy.NAME);
    const [params, setParams] = useState({
        page: 1,
        limit: 8,
    });

    const { data: studentsRes, isLoading } = useGetStudentsByClass(classId, {
        page: params.page || 1,
        limit: params.limit || 8,
        search: debouncedSearch || undefined,
        sortBy: sortBy,
        sortOrder: sortOrder
    });
    const students = studentsRes?.data || [];
    const meta = studentsRes?.meta;
    const totalItems = meta?.total || 0;
    const totalPages = meta?.totalPages || 0;

    if (isLoading) {
        return <Loading message="Đang tải danh sách học sinh..." />;
    }

    return (
        <div data-role="admin" className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 font-sans mt-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">
                        Danh sách học sinh
                    </h3>
                    <p className="text-gray-400 text-xs font-medium mt-0.5">
                        Quản lý học sinh đăng ký và tham gia lớp học.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        <Input
                            placeholder="Tìm kiếm học sinh..."
                            className="h-10 pl-10 rounded-xl border-gray-200 bg-white placeholder:text-gray-400 text-xs font-semibold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                        <Select
                            value={sortBy}
                            onValueChange={(val) => {
                                setSortBy(val as StudentSortBy);
                                setParams((prev) => ({ ...prev, page: 1 }));
                            }}
                        >
                            <SelectTrigger className="w-[150px] h-10 border-gray-200 rounded-xl bg-white shadow-sm text-xs font-semibold">
                                <SelectValue placeholder="Sắp xếp theo" />
                            </SelectTrigger>
                            <SelectContent data-role="admin" className="rounded-xl">
                                <SelectItem value={StudentSortBy.NAME} className="rounded-lg text-xs font-medium">
                                    Họ & Tên
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                        <Select
                            value={sortOrder}
                            onValueChange={(val) => {
                                setSortOrder(val as SortOrder);
                                setParams((prev) => ({ ...prev, page: 1 }));
                            }}
                        >
                            <SelectTrigger className="w-[140px] h-10 border-gray-200 rounded-xl bg-white shadow-sm text-xs font-semibold">
                                <SelectValue placeholder="Sắp xếp" />
                            </SelectTrigger>
                            <SelectContent data-role="admin" className="rounded-xl">
                                <SelectItem value={SortOrder.DESC} className="rounded-lg text-xs font-medium">
                                    <div className="flex items-center gap-2">
                                        <SortDesc className="size-4 text-gray-400" />
                                        <span>Giảm dần</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value={SortOrder.ASC} className="rounded-lg text-xs font-medium">
                                    <div className="flex items-center gap-2">
                                        <SortAsc className="size-4 text-gray-400" />
                                        <span>Tăng dần</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        className="rounded-xl font-black bg-primary h-10 px-5 text-white text-xs transition-all flex items-center gap-1.5"
                        onClick={() => setIsAddDialogOpen(true)}
                    >
                        <UserPlus className="size-4" /> Thêm học sinh
                    </Button>
                </div>
            </div>

            <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm animate-in fade-in duration-200">
                <Table>
                    <TableHeader className="bg-[#f1f2f4]">
                        <TableRow className="border-none">
                            <TableHead className="pl-8 text-[11px] font-black uppercase text-gray-400 tracking-widest">STT</TableHead>
                            <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Họ & Tên</TableHead>
                            <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Mã HS (ID)</TableHead>
                            <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10 text-gray-500">Không tìm thấy học sinh nào</TableCell>
                            </TableRow>
                        )}
                        {students.map((student, idx) => (
                            <TableRow key={student.studentId} className="hover:bg-gray-50/50 border-b border-gray-50 transition-colors">
                                <TableCell className="pl-8 font-black text-primary">{idx + 1}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <UserAvatar
                                            avatarUrl={student.profile?.avatarUrl}
                                            gender={student.profile?.gender}
                                            fullName={student.profile?.fullName}
                                        />
                                        <span className="font-bold text-gray-800">{student.profile?.fullName || "Chưa cập nhật"}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm font-bold text-gray-500">
                                    <span className="bg-gray-100 px-2 py-1 rounded-md text-[10px] font-mono">{student.studentCode}</span>
                                </TableCell>
                                <TableCell className="text-sm font-medium text-gray-500">
                                    {student.profile?.email || "Không có email"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* PAGINATION FOOTER */}
            {!isLoading && students.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <PaginationInfo
                        page={Number(params.page || 1)}
                        limit={Number(params.limit || 8)}
                        totalItems={totalItems}
                        currentLength={students.length}
                    />
                    <DataPagination
                        page={Number(params.page || 1)}
                        totalPages={totalPages}
                        onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
                    />
                </div>
            )}

            <AddStudentDialog
                classId={classId}
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
            />
        </div>
    );
}