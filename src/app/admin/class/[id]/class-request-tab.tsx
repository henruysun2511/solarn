"use client";

import { DataPagination } from "@/components/common/data-pagination";
import { Loading } from "@/components/common/loading";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Badge } from "@/components/ui/badge";
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
import { RequestClassSortBy, SortOrder } from "@/constants/sort";
import { RequestStatus, RequestType } from "@/constants/type";
import { useDebounce } from "@/hooks/useDebouce";
import { useGetRequestsByClass } from "@/queries/useRequestQuery";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { useState } from "react";

export function ClassRequestTab({ classId }: { classId: string }) {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);
    const [sortBy, setSortBy] = useState<RequestClassSortBy>(RequestClassSortBy.CREATED_AT);
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
    });

    const { data: requestsRes, isLoading } = useGetRequestsByClass(classId, {
        page: params.page || 1,
        limit: params.limit || 10,
        search: debouncedSearch || undefined,
        sortBy: sortBy,
        sortOrder: sortOrder
    });
    const requests = requestsRes?.data || [];
    const meta = requestsRes?.meta;
    const totalItems = meta?.total || 0;
    const totalPages = meta?.totalPages || 0;

    if (isLoading) {
        return <Loading message="Đang tải danh sách yêu cầu..." />;
    }

    const getStatusBadge = (status: RequestStatus) => {
        switch (status) {
            case RequestStatus.APPROVED:
                return <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] uppercase">Đã duyệt</Badge>;
            case RequestStatus.REJECTED:
                return <Badge className="bg-red-50 text-red-600 border-none font-bold text-[10px] uppercase">Từ chối</Badge>;
            default:
                return <Badge className="bg-yellow-50 text-yellow-600 border-none font-bold text-[10px] uppercase">Chờ xử lý</Badge>;
        }
    };

    const getTypeLabel = (type: RequestType) => {
        switch (type) {
            case RequestType.SALARY_COMPLAINT: return "Khiếu nại lương";
            case RequestType.TRANSFER_REQUEST: return "Chuyển lớp";
            case RequestType.LEAVE_REQUEST: return "Bảo lưu";
            case RequestType.SCHEDULE_CHANGE: return "Đổi lịch học";
            default: return type;
        }
    };

    return (
        <div data-role="admin" className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 font-sans mt-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">
                        Danh sách yêu cầu
                    </h3>
                    <p className="text-gray-400 text-xs font-medium mt-0.5">
                        Quản lý các yêu cầu từ học sinh trong lớp.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        <Input
                            placeholder="Tìm kiếm yêu cầu..."
                            className="h-10 pl-10 rounded-xl border-gray-200 bg-white placeholder:text-gray-400 text-xs font-semibold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                        <Select
                            value={sortBy}
                            onValueChange={(val) => {
                                setSortBy(val as RequestClassSortBy);
                                setParams((prev) => ({ ...prev, page: 1 }));
                            }}
                        >
                            <SelectTrigger className="w-[150px] h-10 border-gray-200 rounded-xl bg-white shadow-sm text-xs font-semibold">
                                <SelectValue placeholder="Sắp xếp theo" />
                            </SelectTrigger>
                            <SelectContent data-role="admin" className="rounded-xl">
                                <SelectItem value={RequestClassSortBy.CREATED_AT} className="rounded-lg text-xs font-medium">
                                    Ngày tạo
                                </SelectItem>
                                <SelectItem value={RequestClassSortBy.STATUS} className="rounded-lg text-xs font-medium">
                                    Trạng thái
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

            {requests.length === 0 && !isLoading ? (
                <div className="py-12 text-center text-xs font-black text-gray-400 uppercase tracking-widest">
                    Chưa có yêu cầu nào.
                </div>
            ) : (
            <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm animate-in fade-in duration-200">
                <Table>
                    <TableHeader className="bg-[#f1f2f4]">
                        <TableRow className="border-none">
                            <TableHead className="pl-8 text-[11px] font-black uppercase text-gray-400 tracking-widest">Loại yêu cầu</TableHead>
                            <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Người gửi (ID)</TableHead>
                            <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Lý do</TableHead>
                            <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Ngày tạo</TableHead>
                            <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Trạng thái</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-gray-500">Chưa có yêu cầu nào</TableCell>
                            </TableRow>
                        )}
                        {requests.map((request) => (
                            <TableRow key={request.requestId} className="hover:bg-gray-50/50 border-b border-gray-50 transition-colors">
                                <TableCell className="pl-8 font-bold text-gray-800">
                                    {getTypeLabel(request.type)}
                                </TableCell>
                                <TableCell className="text-sm font-bold text-gray-500">
                                    <span className="bg-gray-100 px-2 py-1 rounded-md text-[10px] font-mono">{request.senderAccountId.substring(0, 8)}...</span>
                                </TableCell>
                                <TableCell className="text-sm font-medium text-gray-700 max-w-xs truncate">
                                    {request.reason}
                                </TableCell>
                                <TableCell className="text-sm font-medium text-gray-500">
                                    {request.createdAt ? new Date(request.createdAt).toLocaleDateString("vi-VN") : "N/A"}
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(request.status)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            )}

            {/* PAGINATION FOOTER */}
            {!isLoading && requests.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <PaginationInfo
                        page={Number(params.page || 1)}
                        limit={Number(params.limit || 10)}
                        totalItems={totalItems}
                        currentLength={requests.length}
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
