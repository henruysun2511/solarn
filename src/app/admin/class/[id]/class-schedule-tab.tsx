"use client";

import { DataPagination } from "@/components/common/data-pagination";
import { Loading } from "@/components/common/loading";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { ScheduleSessionSortBy, SortOrder } from "@/constants/sort";
import { ClassSessionStatus } from "@/constants/type";
import { useGetScheduleSessionsByClass } from "@/queries/useScheduleSessionQuery";
import { ScheduleSession } from "@/schemas/schedule-session.schema";
import {
    ChevronLeft,
    ChevronRight,
    LayoutGridIcon,
    ListIcon,
    SortAsc,
    SortDesc,
    EyeIcon
} from "lucide-react";
import { useState, useMemo } from "react";
import { UpdateSessionStatusDialog } from "./update-session-status-dialog";
import { ScheduleItem } from "@/components/common/schedule-item";
import { useRouter } from "next/navigation";

export function ClassScheduleTab({ classId }: { classId: string }) {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
    const [selectedSession, setSelectedSession] = useState<ScheduleSession | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);
    const [sortBy, setSortBy] = useState<ScheduleSessionSortBy>(ScheduleSessionSortBy.STUDY_DATE);
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
    });

    const [currentDate, setCurrentDate] = useState(() => new Date());
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const { data: scheduleRes, isLoading } = useGetScheduleSessionsByClass(classId, {
        page: viewMode === "calendar" ? 1 : (params.page || 1),
        limit: viewMode === "calendar" ? 100 : (params.limit || 10),
        sortBy: sortBy,
        sortOrder: sortOrder
    });

    const sessions = scheduleRes?.data || [];
    const meta = scheduleRes?.meta;
    const totalItems = meta?.total || 0;
    const totalPages = meta?.totalPages || 0;

    const calendarDays = useMemo(() => {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const daysArray: (Date | null)[] = [];

        let firstDayOfWeek = firstDayOfMonth.getDay();
        let blankSpaces = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

        for (let i = 0; i < blankSpaces; i++) {
            daysArray.push(null);
        }

        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            daysArray.push(new Date(currentYear, currentMonth, day));
        }

        return daysArray;
    }, [currentMonth, currentYear]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    if (isLoading) {
        return <Loading message="Đang tải lịch trình..." />;
    }

    return (
        <div data-role="admin" className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 font-sans mt-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">
                        Chi tiết lộ trình học
                    </h3>
                    <p className="text-gray-400 text-xs font-medium mt-0.5">
                        Quản lý lịch học, ca học và theo dõi trạng thái các buổi học của lớp.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 p-1 rounded-xl w-max">
                        <button
                            type="button"
                            onClick={() => setViewMode("table")}
                            className={`p-1.5 rounded-lg transition-all ${viewMode === "table" ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                            title="Xem dạng bảng"
                        >
                            <ListIcon className="size-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode("calendar")}
                            className={`p-1.5 rounded-lg transition-all ${viewMode === "calendar" ? "bg-white text-primary shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                            title="Xem dạng lịch lưới"
                        >
                            <LayoutGridIcon className="size-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                        <Select
                            value={sortBy}
                            disabled={viewMode === "calendar"}
                            onValueChange={(val) => {
                                setSortBy(val as ScheduleSessionSortBy);
                                setParams((prev) => ({ ...prev, page: 1 }));
                            }}
                        >
                            <SelectTrigger className="w-[150px] h-10 border-gray-200 rounded-xl bg-white shadow-sm text-xs font-bold text-gray-700">
                                <SelectValue placeholder="Sắp xếp theo" />
                            </SelectTrigger>
                            <SelectContent data-role="admin" className="rounded-xl">
                                <SelectItem value={ScheduleSessionSortBy.STUDY_DATE} className="rounded-lg text-xs font-bold text-gray-700">
                                    Ngày học
                                </SelectItem>
                                <SelectItem value={ScheduleSessionSortBy.STATUS} className="rounded-lg text-xs font-bold text-gray-700">
                                    Trạng thái
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                        <Select
                            value={sortOrder}
                            disabled={viewMode === "calendar"}
                            onValueChange={(val) => {
                                setSortOrder(val as SortOrder);
                                setParams((prev) => ({ ...prev, page: 1 }));
                            }}
                        >
                            <SelectTrigger className="w-[140px] h-10 border-gray-200 rounded-xl bg-white shadow-sm text-xs font-bold text-gray-700">
                                <SelectValue placeholder="Thứ tự" />
                            </SelectTrigger>
                            <SelectContent data-role="admin" className="rounded-xl">
                                <SelectItem value={SortOrder.DESC} className="rounded-lg text-xs font-bold text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <SortDesc className="size-4 text-gray-400" />
                                        <span>Giảm dần</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value={SortOrder.ASC} className="rounded-lg text-xs font-bold text-gray-700">
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

            {/* HIỂN THỊ DẠNG BẢNG */}
            {viewMode === "table" ? (
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50/70 border-b border-gray-100">
                            <TableRow className="border-none">
                                <TableHead className="pl-8 text-[11px] font-black uppercase text-gray-400 tracking-widest h-12">Buổi</TableHead>
                                <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest h-12">Ngày học</TableHead>
                                <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest h-12">Ca học</TableHead>
                                <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest h-12">Thời gian</TableHead>
                                <TableHead className="text-[11px] font-black uppercase text-gray-400 tracking-widest h-12">Trạng thái</TableHead>
                                <TableHead className="text-right pr-8 text-[11px] font-black uppercase text-gray-400 tracking-widest h-12">Thao tác</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sessions.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12 font-medium text-gray-400 italic">Chưa có lịch học nào</TableCell>
                                </TableRow>
                            )}
                            {sessions.map((item, idx) => (
                                <TableRow key={item.sessionId || idx} className="hover:bg-gray-50/40 border-b border-gray-50/60 transition-colors h-16">
                                    <TableCell className="pl-8 font-black text-primary">#{((params.page - 1) * params.limit) + idx + 1}</TableCell>
                                    <TableCell className="font-bold text-gray-700">
                                        {new Date(item.studyDate).toLocaleDateString("vi-VN")}
                                    </TableCell>
                                    <TableCell className="font-bold text-gray-800">{item.shiftCode}</TableCell>
                                    <TableCell className="font-bold text-gray-800">{item.shift?.timeRange}</TableCell>
                                    <TableCell>
                                        <Badge className={`border-none font-black text-[9px] uppercase px-3 py-1 rounded-full ${item.status === ClassSessionStatus.ENDED ? 'bg-emerald-50 text-emerald-600' :
                                            item.status === ClassSessionStatus.IN_PROGRESS ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {item.status === ClassSessionStatus.ENDED ? 'Đã giảng dạy' :
                                                item.status === ClassSessionStatus.IN_PROGRESS ? 'Đang diễn ra' : 'Sắp tới'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                className="rounded-xl text-xs font-bold border-gray-200 text-gray-600 hover:bg-gray-50 px-3 h-9"
                                                onClick={() => setSelectedSession(item)}
                                            >
                                                Sửa trạng thái
                                            </Button>
                                            <Button
                                                type="button"
                                                size="sm"
                                                className="rounded-xl text-xs font-black bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all px-3 h-9 flex items-center gap-1"
                                                onClick={() => router.push(`/admin/sessions/${item.sessionId}`)}
                                            >
                                                <EyeIcon className="size-3.5" />
                                                Chi tiết
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                /* HIỂN THỊ DẠNG LỊCH ĐỘNG TOÀN DIỆN */
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={handlePrevMonth} className="rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600">
                                <ChevronLeft className="size-5" />
                            </Button>
                            <div className="min-w-[120px] text-center">
                                <p className="text-sm font-black text-gray-900 uppercase tracking-wide">
                                    Tháng {currentMonth + 1} / {currentYear}
                                </p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={handleNextMonth} className="rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600">
                                <ChevronRight className="size-5" />
                            </Button>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCurrentDate(new Date())}
                            className="rounded-xl border-gray-200 font-bold text-xs"
                        >
                            Hôm nay
                        </Button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="grid grid-cols-7 gap-4 mb-1 text-center hidden md:grid">
                            {["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"].map((dayName, idx) => (
                                <div key={idx} className="text-[11px] font-black uppercase text-gray-400 tracking-widest py-2">
                                    {dayName}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {calendarDays.map((dateItem, idx) => {
                                if (!dateItem) {
                                    return (
                                        <div key={`empty-${idx}`} className="hidden lg:block opacity-0 pointer-events-none" />
                                    );
                                }

                                const dayNumber = dateItem.getDate();
                                const isToday = new Date().toDateString() === dateItem.toDateString();

                                const matchedSessions = sessions.filter((session) => {
                                    const sessionDate = new Date(session.studyDate);
                                    return (
                                        sessionDate.getDate() === dayNumber &&
                                        sessionDate.getMonth() === currentMonth &&
                                        sessionDate.getFullYear() === currentYear
                                    );
                                });

                                return (
                                    <div key={dateItem.toISOString()} className="flex flex-col gap-2 group">
                                        <div className={`p-3 rounded-[1.5rem] text-center border transition-all shadow-sm ${isToday
                                            ? "bg-primary text-white border-primary"
                                            : "bg-white border-gray-100 group-hover:border-gray-300"
                                            }`}>
                                            <p className={`text-[9px] font-black uppercase tracking-[0.15em] ${isToday ? "text-white/80" : "text-gray-400"}`}>
                                                Ngày
                                            </p>
                                            <p className="text-lg font-black tracking-tighter leading-tight">
                                                {dayNumber}
                                            </p>
                                        </div>

                                        <div className={`flex flex-col gap-2 min-h-[140px] rounded-[1.5rem] p-2 border border-dashed transition-colors ${matchedSessions.length > 0
                                            ? "bg-gray-50/60 border-gray-200"
                                            : "bg-gray-50/20 border-gray-100"
                                            }`}>
                                            {matchedSessions.length === 0 ? (
                                                <div className="flex items-center justify-center flex-1 text-[10px] font-medium text-gray-300 select-none italic">
                                                    Trống
                                                </div>
                                            ) : (
                                                matchedSessions.map((session, sIdx) => (
                                                    <ScheduleItem
                                                        key={session.sessionId || sIdx}
                                                        data={session}
                                                        sessionIndex={sIdx + 1}
                                                        onClick={() => setSelectedSession(session)}
                                                    />
                                                ))
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* PHÂN TRANG CHO DẠNG BẢNG */}
            {!isLoading && viewMode === "table" && sessions.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <PaginationInfo
                        page={Number(params.page || 1)}
                        limit={Number(params.limit || 10)}
                        totalItems={totalItems}
                        currentLength={sessions.length}
                    />
                    <DataPagination
                        page={Number(params.page || 1)}
                        totalPages={totalPages}
                        onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
                    />
                </div>
            )}

            {selectedSession && (
                <UpdateSessionStatusDialog
                    session={selectedSession}
                    isOpen={!!selectedSession}
                    onClose={() => setSelectedSession(null)}
                />
            )}
        </div>
    );
}