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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ClassSessionStatus } from "@/constants/type";
import { ScheduleSession, updateSessionStatusSchema } from "@/schemas/schedule-session.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type UpdateStatusInput = z.infer<typeof updateSessionStatusSchema>;

interface UpdateDialogProps {
    session: ScheduleSession | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: UpdateStatusInput) => void;
    loading?: boolean;
}

export function UpdateSessionStatusDialog({ session, isOpen, onClose, onSubmit, loading }: UpdateDialogProps) {
    const { setValue, handleSubmit, watch, reset } = useForm<UpdateStatusInput>({
        resolver: zodResolver(updateSessionStatusSchema),
    });

    useEffect(() => {
        if (session) {
            reset({
                status: session.status,
            });
        }
    }, [session, reset]);

    const onFormSubmit = (data: UpdateStatusInput) => {
        onSubmit(data);
    };

    if (!session) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md bg-white rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
                <DialogHeader className="p-8 bg-gray-50/80 border-b border-gray-100">
                    <DialogTitle className="text-xl font-black text-gray-800 tracking-tight flex items-center gap-2">
                        Cập nhật trạng thái buổi học
                    </DialogTitle>
                    <DialogDescription className="text-sm font-medium text-gray-400 mt-1">
                        Thay đổi tiến độ thực tế của buổi học hệ thống.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onFormSubmit)} className="p-8 space-y-6">
                    {/* Box thông tin tóm tắt buổi học */}
                    <div className="bg-primary/5 border border-primary/10 p-5 rounded-2xl space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-black text-gray-400 uppercase">Mã lớp học</span>
                            <span className="text-sm font-black text-primary bg-white px-3 py-1 rounded-xl shadow-sm border border-primary/5">
                                {session.class?.classCode}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 font-bold">
                            <Clock className="size-4 text-slate-400" />
                            <span>Ca {session.shiftCode} ({session.shift?.timeRange})</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 font-bold">
                            <Calendar className="size-4 text-slate-400" />
                            <span>Ngày học: {new Date(session.studyDate).toLocaleDateString("vi-VN")}</span>
                        </div>
                    </div>

                    {/* Lựa chọn trạng thái mới */}
                    <div className="space-y-2.5">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                            Trạng thái tiến độ
                        </label>
                        <Select
                            value={watch("status")}
                            onValueChange={(val) => setValue("status", val as ClassSessionStatus)}
                        >
                            <SelectTrigger className="w-full h-14 rounded-2xl border-gray-200 bg-white font-bold text-gray-700 focus:ring-primary/10 px-5">
                                <SelectValue placeholder="Chọn trạng thái..." />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl">
                                <SelectItem value={ClassSessionStatus.NOT_STARTED} className="rounded-xl font-medium">Chưa bắt đầu</SelectItem>
                                <SelectItem value={ClassSessionStatus.IN_PROGRESS} className="rounded-xl font-medium text-amber-600">Đang diễn ra</SelectItem>
                                <SelectItem value={ClassSessionStatus.ENDED} className="rounded-xl font-medium text-emerald-600">Đã kết thúc</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter className="pt-4 flex gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="h-12 px-6 rounded-xl font-bold text-gray-400 hover:bg-gray-50"
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-12 flex-1 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:opacity-95"
                        >
                            {loading ? "Đang xử lý..." : "Xác nhận thay đổi"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}