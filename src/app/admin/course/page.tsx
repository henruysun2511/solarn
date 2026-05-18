"use client";

import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { CourseListSkeleton } from "@/components/common/skeleton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CourseSortBy, SortOrder } from "@/constants/sort";
import {
    useCreateCourse,
    useDeleteCourse,
    useGetCourses,
    useUpdateCourse,
} from "@/queries/useCourseQuery";
import { Course, CourseInput, CourseParams } from "@/schemas/course.schema";
import { handleError } from "@/utils/handleError";
import {
    LayoutGridIcon,
    ListIcon,
    PlusIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CourseCard } from "./course-card";
import { getColumns } from "./course-columns";
import { CourseDialog } from "./course-dialog";
import { CourseFilter } from "./course-filter";

export default function AdminCoursePage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<"table" | "grid">("table");
    const [params, setParams] = useState<CourseParams>({
        page: 1,
        limit: 10,
        sortOrder: SortOrder.DESC,
        sortBy: CourseSortBy.COURSE_NAME,
    });

    const { data, isLoading } = useGetCourses(params);
    const createMutation = useCreateCourse();
    const updateMutation = useUpdateCourse();
    const deleteMutation = useDeleteCourse();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleAdd = () => {
        setEditingCourse(null);
        setDialogOpen(true);
    };

    const handleEdit = (course: Course) => {
        setEditingCourse(course);
        setDialogOpen(true);
    };

    const handleDeleteTrigger = (id: string) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteMutation.mutateAsync(deleteId, {
                onSuccess: (response: any) => {
                    toast.success(response?.message || "Xóa khóa học thành công");
                    setConfirmOpen(false);
                    setDeleteId(null);
                },
                onError: (error: any) => {
                    handleError(error, "Không thể xóa khóa học");
                }
            });
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    const handleSubmit = async (formData: CourseInput) => {
        try {
            if (editingCourse?.courseId) {
                await updateMutation.mutateAsync({ id: editingCourse.courseId, data: formData }, {
                    onSuccess: (response: any) => {
                        toast.success(response?.message || "Cập nhật khóa học thành công");
                        setDialogOpen(false);
                    },
                    onError: (error: any) => {
                        handleError(error, "Cập nhật khóa học thất bại");
                    }
                });
            } else {
                await createMutation.mutateAsync(formData, {
                    onSuccess: (response: any) => {
                        toast.success(response?.message || "Thêm khóa học thành công");
                        setDialogOpen(false);
                    },
                    onError: (error: any) => {
                        handleError(error, "Thêm khóa học thất bại");
                    }
                });
            }
        } catch (error) {
            console.error("Submit failed", error);
        }
    };

    const handleViewDetail = (id: string) => {
        router.push(`/admin/course/${id}`);
    };

    const courses = data?.data || [];
    const meta = data?.meta;
    const totalItems = meta?.total || 0;
    const totalPages = meta?.totalPages || 0;

    return (
        <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
                        Quản lý
                    </p>
                    <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
                        Danh sách khóa học
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

                    <Button
                        onClick={handleAdd}
                        className="bg-primary text-white px-6 h-11 rounded-md font-semibold"
                    >
                        <PlusIcon className="mr-2 size-4" />
                        Thêm khóa học
                    </Button>
                </div>
            </div>

            {/* Filter & Content Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <CourseFilter
                    onSearch={(val) => setParams((prev) => ({ ...prev, search: val, page: 1 }))}
                    onFilterChange={(filters) => setParams((prev) => ({ ...prev, ...filters, page: 1 }))}
                    onRowsPerPageChange={(val) => setParams((prev) => ({ ...prev, limit: val, page: 1 }))}
                />

                {viewMode === "table" ? (
                    <DataTable
                        columns={getColumns({
                            onEdit: handleEdit,
                            onDelete: handleDeleteTrigger,
                            onView: handleViewDetail,
                        })}
                        data={courses}
                        loading={isLoading}
                    />
                ) : (
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-gray-50/50">
                        {isLoading ? (
                            <CourseListSkeleton />
                        ) : (
                            courses.map((course) => (
                                <CourseCard
                                    key={course.courseId}
                                    course={course}
                                    onEdit={handleEdit}
                                    onDelete={handleDeleteTrigger}
                                    onView={handleViewDetail}
                                />
                            ))
                        )}
                    </div>
                )}

                {/* Pagination Section */}
                <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <PaginationInfo
                        page={params.page || 1}
                        limit={params.limit || 10}
                        totalItems={totalItems}
                        currentLength={courses.length}
                    />
                    <DataPagination
                        page={params.page!}
                        totalPages={totalPages}
                        onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
                    />
                </div>
            </div>

            <CourseDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={handleSubmit}
                initialData={editingCourse}
                loading={createMutation.isPending || updateMutation.isPending}
            />

            <ConfirmDialog
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                onConfirm={handleConfirmDelete}
                loading={deleteMutation.isPending}
                title="Xác nhận xóa khóa học"
                description="Bạn có chắc chắn muốn xóa khóa học này? Hành động này không thể hoàn tác nếu khóa học chưa có dữ liệu ràng buộc."
            />
        </div>
    );
}