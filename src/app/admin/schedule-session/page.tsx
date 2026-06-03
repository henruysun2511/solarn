"use client";

import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { DataPagination } from "@/components/common/data-pagination";
import { Button } from "@/components/ui/button";
import { SortOrder, ScheduleSessionSortBy } from "@/constants/sort";
import {
    useGetScheduleSessions,
    useUpdateSessionStatus,
} from "@/queries/useScheduleSessionQuery";
// 1. IMPORT các hook lấy danh sách lớp học và ca học của hệ thống bạn
import { useGetClasses } from "@/queries/useClassQuery";
import { useGetShifts } from "@/queries/useShiftQuery";

import { ScheduleSession, ScheduleSessionParams } from "@/schemas/schedule-session.schema";
import scheduleSessionService from "@/services/schedule-session.service";
import { exportToExcel } from "@/utils/exportToExcel";
import { handleError } from "@/utils/handleError";
import { ListIcon, CalendarDays, PlusIcon, FileDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./schedule-session-columns";
import { ScheduleSessionFilter } from "./schedule-session-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { ScheduleSessionCalendar } from "./schedule-session-calendar-view";
import { UpdateSessionStatusDialog } from "./schedule-session-status-dialog";
import { CreateScheduleSessionDialog } from "@/app/admin/schedule-session/schedule-session-dialog";

export default function AdminScheduleSessionPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
    const [params, setParams] = useState<ScheduleSessionParams>(
        {
            page: 1,
            limit: 10,
            sortOrder: SortOrder.DESC,
            sortBy: ScheduleSessionSortBy.STUDY_DATE,
            classId: undefined,
            shiftCode: undefined,
        }
    );

    const [updatingSession, setUpdatingSession] = useState<ScheduleSession | null>(null);
    const [createOpen, setCreateOpen] = useState(false);

    // Lấy dữ liệu danh sách Schedule Sessions chính
    const { data, isLoading } = useGetScheduleSessions(params);
    const updateStatusMutation = useUpdateSessionStatus();

    // Lấy danh sách để render vào Selector của Filter
    const { data: classesResponse } = useGetClasses({ page: 1, limit: 100 });
    const { data: shiftsResponse } = useGetShifts();

    // Chuẩn hóa dữ liệu mảng an toàn truyền xuống Filter
    const classesList = classesResponse?.data || [];
    const shiftsList = shiftsResponse?.data || [];

    const sessions = data?.data || [];
    const [exporting, setExporting] = useState(false);

    const handleExport = async () => {
        setExporting(true);
        try {
            const res = await scheduleSessionService.getAllScheduleSessionsForExport({
                search: params.search,
                classId: params.classId,
                shiftCode: params.shiftCode,
                status: params.status,
                sortBy: params.sortBy,
                sortOrder: params.sortOrder,
            });
            const allData = res.data.data || [];

            const statusMap: Record<string, string> = {
                NOT_STARTED: "Chưa bắt đầu",
                IN_PROGRESS: "Đang diễn ra",
                ENDED: "Đã kết thúc",
            };

            const rows = allData.map((e: any) => ({
                "Mã lớp": e.class?.classCode || "---",
                "Ca học": e.shiftCode || "---",
                "Khung giờ": e.shift?.timeRange || "---",
                "Ngày học": e.studyDate ? new Date(e.studyDate).toLocaleDateString("vi-VN") : "---",
                "Phòng học": e.class?.room?.roomCode || "---",
                "Trạng thái": statusMap[e.status] || e.status,
            }));

            exportToExcel(rows, [
                { key: "Mã lớp", header: "Mã lớp" },
                { key: "Ca học", header: "Ca học" },
                { key: "Khung giờ", header: "Khung giờ" },
                { key: "Ngày học", header: "Ngày học" },
                { key: "Phòng học", header: "Phòng học" },
                { key: "Trạng thái", header: "Trạng thái" },
            ], "danh-sach-lich-hoc");

            toast.success("Xuất file Excel thành công");
        } catch (error) {
            handleError(error, "Xuất file thất bại");
        } finally {
            setExporting(false);
        }
    };

    const totalItems = data?.meta?.total || 0;
    const totalPages = Math.ceil(totalItems / (params.limit || 10));

    const handleFilterChange = (newFilters: Partial<ScheduleSessionParams>) => {
        setParams((prev) => ({ ...prev, ...newFilters }));
    };

    const handleEditStatusClick = (session: ScheduleSession) => {
        setUpdatingSession(session);
    };

    const handleViewDetail = (id: string) => {
        router.push(`/admin/sessions/${id}`);
    };

    const handleStatusSubmit = async (formData: { status: any }) => {
        if (!updatingSession?.sessionId) return;
        try {
            await updateStatusMutation.mutateAsync({
                id: updatingSession.sessionId,
                data: formData,
            });
            toast.success("Cập nhật trạng thái buổi học thành công!");
            setUpdatingSession(null);
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    const columns = getColumns({
        onEdit: handleEditStatusClick,
        onView: handleViewDetail,
    });

    return (
        <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
                        Quản lý
                    </p>
                    <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
                        Lịch học theo tuần
                    </h1>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 self-start md:self-auto">
                    <Button
                        size="sm"
                        variant={viewMode === "table" ? "outline" : "ghost"}
                        onClick={() => setViewMode("table")}
                        className={`rounded-xl font-bold h-9 px-4 flex items-center gap-2 ${viewMode === "table" ? "shadow-sm border border-gray-100 text-primary" : "text-gray-500"
                            }`}
                    >
                        <ListIcon className="size-4" />
                        <span>Dạng bảng</span>
                    </Button>
                    <Button
                        size="sm"
                        variant={viewMode === "calendar" ? "outline" : "ghost"}
                        onClick={() => setViewMode("calendar")}
                        className={`rounded-xl font-bold h-9 px-4 flex items-center gap-2 ${viewMode === "calendar" ? "shadow-sm border border-gray-100 text-primary" : "text-gray-500"
                            }`}
                    >
                        <CalendarDays className="size-4" />
                        <span>Lịch tuần</span>
                    </Button>
                </div>

                <Button
                    onClick={handleExport}
                    disabled={exporting}
                    className="rounded-xl bg-primary text-white font-black h-11 px-6 shadow-lg shadow-primary/10 hover:opacity-90 transition-all flex items-center gap-2"
                >
                    <FileDownIcon className="size-4" />
                    <span>{exporting ? "Đang xuất..." : "Xuất Excel"}</span>
                </Button>
                <Button
                    onClick={() => setCreateOpen(true)}
                    className="rounded-xl bg-primary text-white font-black h-11 px-6 shadow-lg shadow-primary/10 hover:opacity-90 transition-all flex items-center gap-2"
                >
                    <PlusIcon className="size-4" />
                    <span>Thêm buổi học</span>
                </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">                <ScheduleSessionFilter
                params={params}
                classes={classesList}
                shifts={shiftsList}
                onFilterChange={handleFilterChange}
                onRowsPerPageChange={(limit) => handleFilterChange({ limit, page: 1 })}
            />

                {isLoading ? (
                    <div className="p-10 space-y-4">
                        <Skeleton className="h-10 w-full rounded-xl" />
                        <Skeleton className="h-20 w-full rounded-2xl" />
                        <Skeleton className="h-20 w-full rounded-2xl" />
                    </div>
                ) : (
                    <div>
                        {viewMode === "table" && (
                            <div className="overflow-x-auto">
                                <DataTable columns={columns} data={sessions} />
                            </div>
                        )}

                        {viewMode === "calendar" && (
                            <div className="p-5">
                                <ScheduleSessionCalendar
                                    sessions={sessions}
                                    onSessionClick={handleEditStatusClick}
                                />
                            </div>
                        )}

                        {sessions.length === 0 && (
                            <div className="py-20 text-center font-medium text-gray-400 italic">
                                Không tìm thấy dữ liệu ca học nào phù hợp.
                            </div>
                        )}
                    </div>
                )}

                {!isLoading && viewMode === "table" && sessions.length > 0 && (
                    <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <PaginationInfo
                            page={params.page || 1}
                            limit={params.limit || 10}
                            totalItems={totalItems}
                            currentLength={sessions.length}
                        />
                        <DataPagination
                            page={params.page!}
                            totalPages={totalPages}
                            onPageChange={(p) => handleFilterChange({ page: p })}
                        />
                    </div>
                )}
            </div>

            <UpdateSessionStatusDialog
                session={updatingSession}
                isOpen={!!updatingSession}
                onClose={() => setUpdatingSession(null)}
                onSubmit={handleStatusSubmit}
                loading={updateStatusMutation.isPending}
            />

            <CreateScheduleSessionDialog
                isOpen={createOpen}
                onClose={() => setCreateOpen(false)}
            />
        </div>
    );
}