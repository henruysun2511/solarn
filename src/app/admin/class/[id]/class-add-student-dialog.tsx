"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddStudentToClass } from "@/queries/useClassQuery";
import { useGetStudents } from "@/queries/useStudentQuery"; // Nhận params: { search, page, limit }
import { useState } from "react";
import { toast } from "sonner";
import { handleError } from "@/utils/handleError";
import { Check, Search, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebouce";
import { cn } from "@/utils/cn";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddStudentDialogProps {
    classId: string;
    isOpen: boolean;
    onClose: () => void;
}

export function AddStudentDialog({ classId, isOpen, onClose }: AddStudentDialogProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

    const addMutation = useAddStudentToClass();

    const debouncedSearch = useDebounce(searchTerm, 500);

    const { data: studentsData, isLoading } = useGetStudents(
        {
            search: debouncedSearch,
            page: 1,
            limit: 20,
        },
        { enabled: isOpen }
    );

    const handleClose = () => {
        setSearchTerm("");
        setSelectedStudentId(null);
        onClose();
    };

    const handleAdd = () => {
        if (!selectedStudentId) {
            toast.error("Vui lòng chọn một học sinh trong danh sách");
            return;
        }

        addMutation.mutate(
            { classId, data: { studentId: selectedStudentId } },
            {
                onSuccess: () => {
                    toast.success("Thêm học sinh vào lớp thành công");
                    handleClose();
                },
                onError: (error: any) => {
                    handleError(error || "Có lỗi xảy ra khi thêm học sinh");
                }
            }
        );
    };

    const studentsList = studentsData?.data || [];

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent data-role="admin" className="sm:max-w-[450px] rounded-[2rem] p-8 flex flex-col max-h-[85vh] bg-white border border-gray-100 shadow-sm font-sans">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black text-gray-900 tracking-tight">
                        Thêm học sinh vào lớp
                    </DialogTitle>
                    <DialogDescription className="text-xs font-medium text-gray-400 mt-1">
                        Tìm kiếm học sinh theo tên hệ thống để xếp vào lớp học này.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-4 flex-1 overflow-hidden">
                    {/* Ô tìm kiếm tên học sinh */}
                    <div className="flex flex-col gap-2 relative">
                        <Label htmlFor="search" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                            Tìm kiếm học sinh
                        </Label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                id="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Nhập tên học sinh cần tìm..."
                                className="rounded-xl h-11 bg-gray-50/80 border-gray-100 pl-11 pr-4 text-sm font-medium placeholder:text-gray-400 focus-visible:ring-primary/20"
                            />
                        </div>
                    </div>

                    {/* Vùng hiển thị kết quả */}
                    <div className="flex flex-col gap-2 flex-1 overflow-hidden">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                            Kết quả tìm kiếm ({studentsList.length})
                        </span>

                        <ScrollArea className="flex-1 border border-gray-100 rounded-2xl bg-gray-50/30 p-2 min-h-[200px]">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-12 gap-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                    <span>Đang tìm kiếm học sinh...</span>
                                </div>
                            ) : studentsList.length === 0 ? (
                                <div className="text-center py-12 text-xs text-gray-400 font-bold uppercase tracking-wide">
                                    {debouncedSearch ? "Không tìm thấy học sinh phù hợp" : "Nhập từ khóa để tìm học sinh"}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-1.5">
                                    {studentsList.map((student: any) => {
                                        const isSelected = selectedStudentId === student.studentId;
                                        return (
                                            <button
                                                key={student.studentId}
                                                type="button"
                                                onClick={() => setSelectedStudentId(student.studentId)}
                                                className={cn(
                                                    "w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-all",
                                                    isSelected
                                                        ? "bg-primary text-white shadow-md shadow-primary/10"
                                                        : "bg-white border border-gray-100 text-gray-800 hover:bg-gray-50"
                                                )}
                                            >
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm">
                                                        {student.profile?.fullName || "Chưa có tên"}
                                                    </span>
                                                    <span className={cn(
                                                        "text-[10px] font-bold uppercase tracking-wider mt-0.5",
                                                        isSelected ? "text-white/80" : "text-gray-400"
                                                    )}>
                                                        Mã: {student.studentCode}
                                                    </span>
                                                </div>
                                                {isSelected && <Check className="h-4 w-4 text-white stroke-[3px] animate-in fade-in zoom-in-75 duration-150" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </ScrollArea>
                    </div>
                </div>

                <DialogFooter className="pt-4 bg-white border-t border-gray-50 flex gap-3">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleClose}
                        className="h-11 px-5 rounded-xl font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
                        disabled={addMutation.isPending}
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        type="button"
                        onClick={handleAdd}
                        className="h-11 px-8 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/10 hover:opacity-90 transition-all"
                        disabled={addMutation.isPending || !selectedStudentId}
                    >
                        {addMutation.isPending ? "Đang xử lý..." : "Thêm học sinh"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}