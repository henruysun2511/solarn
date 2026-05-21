"use client";

import { DataPagination } from "@/components/common/data-pagination";
import { Loading } from "@/components/common/loading";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FeedbackClassSortBy, FeedbackSortBy, SortOrder } from "@/constants/sort";
import { useDebounce } from "@/hooks/useDebouce";
import { useGetFeedbacksByClass } from "@/queries/useFeedbackQuery";
import { Calendar, MessageSquare, Search, SortAsc, SortDesc } from "lucide-react";
import { useState } from "react";

export function ClassFeedbackTab({ classId }: { classId: string }) {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);
    const [sortBy, setSortBy] = useState<FeedbackSortBy>(FeedbackClassSortBy.CREATED_AT);
    const [params, setParams] = useState({
        page: 1,
        limit: 6,
    });

    const { data: feedbacksRes, isLoading } = useGetFeedbacksByClass(classId, {
        page: params.page || 1,
        limit: params.limit || 6,
        search: debouncedSearch || undefined,
        sortBy: sortBy,
        sortOrder: sortOrder
    });
    const feedbacks = feedbacksRes?.data || [];
    const meta = feedbacksRes?.meta;
    const totalItems = meta?.total || 0;
    const totalPages = meta?.totalPages || 0;

    if (isLoading) {
        return <Loading message="Đang tải danh sách đánh giá..." />;
    }

    return (
        <div data-role="admin" className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 font-sans mt-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">
                        Đánh giá lớp học
                    </h3>
                    <p className="text-gray-400 text-xs font-medium mt-0.5">
                        Phản hồi từ giáo viên và học sinh.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        <Input
                            placeholder="Tìm kiếm đánh giá..."
                            className="h-10 pl-10 rounded-xl border-gray-200 bg-white placeholder:text-gray-400 text-xs font-semibold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                        <Select
                            value={sortBy}
                            onValueChange={(val) => {
                                setSortBy(val as FeedbackSortBy);
                                setParams((prev) => ({ ...prev, page: 1 }));
                            }}
                        >
                            <SelectTrigger className="w-[150px] h-10 border-gray-200 rounded-xl bg-white shadow-sm text-xs font-semibold">
                                <SelectValue placeholder="Sắp xếp theo" />
                            </SelectTrigger>
                            <SelectContent data-role="admin" className="rounded-xl">
                                <SelectItem value={FeedbackClassSortBy.CREATED_AT} className="rounded-lg text-xs font-medium">
                                    Ngày tạo
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
                </div>
            </div>

            {feedbacks.length === 0 ? (
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-10 text-center">
                    <MessageSquare className="size-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-bold">Chưa có đánh giá nào cho lớp học này.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {feedbacks.map((feedback, idx) => (
                        <div key={feedback.feedbackId || idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="size-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                                        {/* Placeholder avatar initial */}
                                        {"S"}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">Học sinh ID: <span className="font-mono text-gray-500">{feedback.studentId.substring(0, 8)}...</span></p>
                                        <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-gray-400 font-medium">
                                            <Calendar className="size-3" />
                                            <span>{feedback.createdAt ? new Date(feedback.createdAt).toLocaleDateString("vi-VN") : "N/A"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl relative text-sm text-gray-700 leading-relaxed italic">
                                    "{feedback.content}"
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* PAGINATION FOOTER */}
            {!isLoading && feedbacks.length > 0 && (
                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <PaginationInfo
                        page={Number(params.page || 1)}
                        limit={Number(params.limit || 6)}
                        totalItems={totalItems}
                        currentLength={feedbacks.length}
                    />
                    <DataPagination
                        page={Number(params.page || 1)}
                        totalPages={totalPages}
                        onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
                    />
                </div>
            )}
        </div>
    );
}
