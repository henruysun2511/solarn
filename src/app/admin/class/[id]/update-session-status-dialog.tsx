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
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClassSessionStatus } from "@/constants/type";
import { ScheduleSession } from "@/schemas/schedule-session.schema";
import { useUpdateSessionStatus } from "@/queries/useScheduleSessionQuery";
import { useState } from "react";
import { toast } from "sonner";

interface UpdateSessionStatusDialogProps {
    session: ScheduleSession;
    isOpen: boolean;
    onClose: () => void;
}

export function UpdateSessionStatusDialog({ session, isOpen, onClose }: UpdateSessionStatusDialogProps) {
    const [status, setStatus] = useState<ClassSessionStatus>(session.status);
    const updateMutation = useUpdateSessionStatus();

    const handleUpdate = () => {
        if (!session.sessionId) return;

        updateMutation.mutate(
            { id: session.sessionId, data: { status } },
            {
                onSuccess: () => {
                    toast.success("Cập nhật trạng thái thành công");
                    onClose();
                },
                onError: (error: any) => {
                    toast.error(error?.response?.data?.message || "Có lỗi xảy ra khi cập nhật");
                }
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent data-role="admin" className="sm:max-w-[425px] rounded-[2rem] p-8 bg-white border border-gray-100 shadow-sm font-sans">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black text-gray-900 tracking-tight">
                        Cập nhật trạng thái buổi học
                    </DialogTitle>
                    <DialogDescription className="text-xs font-medium text-gray-400 mt-1">
                        Buổi học ngày {new Date(session.studyDate).toLocaleDateString("vi-VN")} - Ca {session.shiftCode}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="status" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                            Trạng thái buổi học
                        </Label>
                        <Select value={status} onValueChange={(val) => setStatus(val as ClassSessionStatus)}>
                            <SelectTrigger className="rounded-xl h-12 bg-gray-50/80 border-gray-100 font-bold text-gray-800 focus:ring-primary/20">
                                <SelectValue placeholder="Chọn trạng thái" />
                            </SelectTrigger>
                            <SelectContent data-role="admin" className="rounded-xl font-bold border-gray-100">
                                <SelectItem value={ClassSessionStatus.NOT_STARTED} className="focus:bg-primary focus:text-white">
                                    Sắp diễn ra
                                </SelectItem>
                                <SelectItem value={ClassSessionStatus.IN_PROGRESS} className="focus:bg-primary focus:text-white">
                                    Đang diễn ra
                                </SelectItem>
                                <SelectItem value={ClassSessionStatus.ENDED} className="focus:bg-primary focus:text-white">
                                    Đã hoàn thành
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter className="pt-4 bg-white border-t border-gray-50 flex gap-3">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onClose}
                        className="h-11 px-5 rounded-xl font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
                        disabled={updateMutation.isPending}
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        type="button"
                        onClick={handleUpdate}
                        className="h-11 px-8 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/10 hover:opacity-90 transition-all"
                        disabled={updateMutation.isPending}
                    >
                        {updateMutation.isPending ? "Đang xử lý..." : "Lưu thay đổi"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}