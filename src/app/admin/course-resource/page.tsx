"use client";

import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { CourseListSkeleton } from "@/components/common/skeleton";
import { Button } from "@/components/ui/button";
import { SortOrder } from "@/constants/sort";
import {
    useCreateCourseResource,
    useDeleteCourseResource,
    useGetCourseResources,
    useUpdateCourseResource,
} from "@/queries/useCourseResourceQuery";
import { useGetCourses } from "@/queries/useCourseQuery";
import { CourseResource, CourseResourceInput, CourseResourceParams } from "@/schemas/course-resource.schema";
import { handleError } from "@/utils/handleError";
import { LayoutGridIcon, ListIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CourseResourceCard } from "./course-resource-card";
import { getColumns } from "./course-resource-columns";
import { CourseResourceDialog } from "./course-resource-dialog";
import { CourseResourceFilter } from "./course-resource-filter";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AdminCourseResourcePage() {
    const [viewMode, setViewMode] = useState<"table" | "grid">("table");
    const [params, setParams] = useState<CourseResourceParams>({
        page: 1,
        limit: 10,
        sortOrder: SortOrder.DESC,
    });

    const [dialogOpen, setDialogOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [editingResource, setEditingResource] = useState<CourseResource | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data, isLoading } = useGetCourseResources(params);
    const createMutation = useCreateCourseResource();
    const updateMutation = useUpdateCourseResource();
    const deleteMutation = useDeleteCourseResource();

    const { data: coursesData } = useGetCourses({ page: 1, limit: 100 });
    const coursesList = coursesData?.data || [];

    const resources = data?.data || [];
    const meta = data?.meta;
    const totalItems = meta?.total || 0;
    const totalPages = meta?.totalPages || 0;

    const handleSearch = (value: string) => {
        setParams((prev) => ({ ...prev, search: value || undefined, page: 1 }));
    };

    const handleFilterChange = (newFilters: Partial<CourseResourceParams>) => {
        setParams((prev) => ({ ...prev, ...newFilters }));
    };

    const handleCreateTrigger = () => {
        setEditingResource(null);
        setDialogOpen(true);
    };

    const handleEditTrigger = (resource: CourseResource) => {
        setEditingResource(resource);
        setDialogOpen(true);
    };

    const handleDeleteTrigger = (id: string) => {
        setDeletingId(id);
        setConfirmOpen(true);
    };

    const handleSubmit = async (formData: CourseResourceInput) => {
        try {
            if (editingResource?.resourceId) {
                // await updateMutation.mutateAsync({
                //     resourceId: editingResource.resourceId,
                //     ...formData,
                // });
                toast.success("Cập nhật tài nguyên học tập thành công!");
            } else {
                await createMutation.mutateAsync(formData);
                toast.success("Thêm mới tài nguyên học tập thành công!");
            }
            setDialogOpen(false);
        } catch (error) {
            handleError(error);
        }
    };

    const handleConfirmDelete = async () => {
        if (!deletingId) return;
        try {
            await deleteMutation.mutateAsync(deletingId);
            toast.success("Xóa tài nguyên học tập thành công!");
            setConfirmOpen(false);
            setDeletingId(null);
        } catch (error) {
            handleError(error);
        }
    };

    const columns = getColumns({
        onEdit: handleEditTrigger,
        onDelete: handleDeleteTrigger,
    });

    return (
        <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
            {/* Khối HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
                        Quản lý
                    </p>
                    <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
                        Danh sách tài nguyên học tập
                    </h1>
                </div>

                <div className="flex items-center gap-3 self-start md:self-auto">
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
                        onClick={handleCreateTrigger}
                        className="h-11 px-5 rounded-2xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:opacity-95 text-sm gap-2"
                    >
                        <PlusIcon className="size-4" />
                        Thêm tài nguyên
                    </Button>
                </div>
            </div>

            {/* Khối DANH SÁCH */}
            <div className="bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden shadow-sm">
                <CourseResourceFilter
                    params={params}
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    onRowsPerPageChange={(limit) => handleFilterChange({ limit, page: 1 })}
                />

                {isLoading ? (
                    <div className="p-5">
                        <CourseListSkeleton />
                    </div>
                ) : (
                    <div>
                        {viewMode === "table" ? (
                            <DataTable columns={columns} data={resources} />
                        ) : (
                            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-gray-50/40">
                                {resources.map((res) => (
                                    <CourseResourceCard
                                        key={res.resourceId}
                                        resource={res}
                                        onEdit={handleEditTrigger}
                                        onDelete={handleDeleteTrigger}
                                    />
                                ))}
                            </div>
                        )}

                        {resources.length === 0 && (
                            <div className="py-20 text-center font-medium text-gray-400 italic">
                                Không tìm thấy dữ liệu tài nguyên nào phù hợp hệ thống.
                            </div>
                        )}
                    </div>
                )}

                {/* Khối PHÂN TRANG */}
                {!isLoading && resources.length > 0 && (
                    <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <PaginationInfo
                            page={Number(params.page || 1)}
                            limit={Number(params.limit) || 10}
                            totalItems={totalItems}
                            currentLength={resources.length}
                        />
                        <DataPagination
                            page={Number(params.page) || 1}
                            totalPages={totalPages}
                            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
                        />
                    </div>
                )}
            </div>

            {/* Modal Dialog Form */}
            <CourseResourceDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSubmit={handleSubmit}
                initialData={editingResource}
                courses={coursesList}
                loading={createMutation.isPending || updateMutation.isPending}
            />

            {/* Modal Confirm Xóa */}
            <ConfirmDialog
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                onConfirm={handleConfirmDelete}
                loading={deleteMutation.isPending}
                title="Xác nhận xóa tài nguyên học tập"
                description="Bạn có chắc chắn muốn xóa tài liệu này khỏi hệ thống? Hành động này không thể hoàn tác."
            />
        </div>
    );
}