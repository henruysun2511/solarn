"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CourseSortBy, SortOrder } from "@/constants/sort";
import { ResourceType } from "@/constants/type";
import { CourseResourceParams } from "@/schemas/course-resource.schema";
import { SearchIcon, SortAsc, SortDesc, XIcon } from "lucide-react";
import { useState } from "react";

interface CourseResourceFilterProps {
    onSearch: (value: string) => void;
    onFilterChange: (filters: Partial<CourseResourceParams>) => void;
    onRowsPerPageChange: (value: number) => void;
    params: CourseResourceParams;
}

export function CourseResourceFilter({
    onSearch,
    onFilterChange,
    onRowsPerPageChange,
    params,
}: CourseResourceFilterProps) {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchValue);
    };

    const clearSearch = () => {
        setSearchValue("");
        onSearch("");
    };

    return (
        <div className="p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
                {/* Tìm kiếm */}
                <form onSubmit={handleSearch} className="relative w-[280px]">
                    <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                        placeholder="Tìm kiếm tài nguyên..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="pl-10 pr-10 h-10 rounded-2xl border-gray-200 bg-gray-50/50 focus-visible:ring-primary/10 font-medium text-sm"
                    />
                    {searchValue && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <XIcon className="size-4" />
                        </button>
                    )}
                </form>

                {/* Lọc định dạng tài nguyên */}
                <Select
                    value={params.type || "ALL"}
                    onValueChange={(val) =>
                        onFilterChange({ type: val === "ALL" ? undefined : (val as ResourceType), page: 1 })
                    }
                >
                    <SelectTrigger data-role="admin" className="w-[180px] h-10 rounded-2xl border-gray-200 bg-white font-medium text-sm">
                        <SelectValue placeholder="Định dạng" />
                    </SelectTrigger>
                    <SelectContent data-role="admin" className="rounded-2xl">
                        <SelectItem value="ALL" className="rounded-xl">Tất cả loại</SelectItem>
                        <SelectItem value={ResourceType.DOCUMENT} className="rounded-xl">Tài liệu (PDF/Word)</SelectItem>
                        <SelectItem value={ResourceType.VIDEO} className="rounded-xl">Video bài giảng</SelectItem>
                        <SelectItem value={ResourceType.AUDIO} className="rounded-xl">File Âm thanh</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-4 ml-auto lg:ml-0">
                {/* Sắp xếp thứ tự */}
                <Select
                    value={params.sortOrder}
                    onValueChange={(val) => onFilterChange({ sortOrder: val as SortOrder })}
                >
                    <SelectTrigger data-role="admin" className="w-[150px] h-10 rounded-2xl border-gray-200 bg-white font-medium text-sm">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent data-role="admin" className="rounded-2xl">
                        <SelectItem value={SortOrder.DESC} className="rounded-xl">
                            <div className="flex items-center gap-2">
                                <SortDesc className="size-4 text-gray-400" />
                                <span>Mới nhất trước</span>
                            </div>
                        </SelectItem>
                        <SelectItem value={SortOrder.ASC} className="rounded-xl">
                            <div className="flex items-center gap-2">
                                <SortAsc className="size-4 text-gray-400" />
                                <span>Cũ nhất trước</span>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>

                {/* Số dòng hiển thị */}
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <span>Hiển thị:</span>
                    <Select
                        value={String(params.limit || 10)}
                        onValueChange={(val) => onRowsPerPageChange(Number(val))}
                    >
                        <SelectTrigger data-role="admin" className="w-[80px] h-10 rounded-2xl border-gray-200 bg-white font-bold">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent data-role="admin" className="rounded-2xl">
                            <SelectItem value="10" className="rounded-xl">10</SelectItem>
                            <SelectItem value="25" className="rounded-xl">25</SelectItem>
                            <SelectItem value="50" className="rounded-xl">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}