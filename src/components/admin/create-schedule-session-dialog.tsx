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
import { useGetClasses } from "@/queries/useClassQuery";
import { useGetShifts } from "@/queries/useShiftQuery";
import { useCreateScheduleSession } from "@/queries/useScheduleSessionQuery";
import { CreateScheduleSessionInput } from "@/schemas/schedule-session.schema";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    classId?: string;
}

export function CreateScheduleSessionDialog({ isOpen, onClose, classId }: Props) {
    const [selectedClassId, setSelectedClassId] = useState(classId || "");
    const [shiftCode, setShiftCode] = useState("");
    const [studyDate, setStudyDate] = useState("");
    const createMutation = useCreateScheduleSession();

    const { data: classesRes } = useGetClasses({ page: 1, limit: 200 });
    const { data: shiftsRes } = useGetShifts();

    const classes = classesRes?.data || [];
    const shifts = shiftsRes?.data || [];

    const handleSubmit = () => {
        const targetClassId = classId || selectedClassId;
        if (!targetClassId) {
            toast.error("Vui lòng chọn lớp học");
            return;
        }
        if (!shiftCode) {
            toast.error("Vui lòng chọn ca học");
            return;
        }
        if (!studyDate) {
            toast.error("Vui lòng chọn ngày học");
            return;
        }

        const data: CreateScheduleSessionInput = { shiftCode, studyDate };

        createMutation.mutate(
            { classId: targetClassId, data },
            {
                onSuccess: () => {
                    toast.success("Thêm buổi học thành công");
                    setShiftCode("");
                    setStudyDate("");
                    onClose();
                },
                onError: (error: any) => {
                    toast.error(error?.response?.data?.message || "Có lỗi xảy ra khi thêm buổi học");
                }
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent data-role="admin" className="sm:max-w-[425px] rounded-[2rem] p-8 bg-white border border-gray-100 shadow-sm font-sans">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black text-gray-900 tracking-tight">
                        Thêm buổi học mới
                    </DialogTitle>
                    <DialogDescription className="text-xs font-medium text-gray-400 mt-1">
                        Chọn lớp học, ca học và ngày để tạo buổi học mới
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-5 py-4">
                    {!classId && (
                        <div className="flex flex-col gap-2">
                            <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                                Lớp học
                            </Label>
                            <Select value={selectedClassId} onValueChange={setSelectedClassId}>
                                <SelectTrigger className="rounded-xl h-12 bg-gray-50/80 border-gray-100 font-bold text-gray-800 focus:ring-primary/20">
                                    <SelectValue placeholder="Chọn lớp học" />
                                </SelectTrigger>
                                <SelectContent data-role="admin" className="rounded-xl font-bold border-gray-100 max-h-60">
                                    {classes.map((cls: any) => (
                                        <SelectItem key={cls.classId} value={cls.classId} className="focus:bg-primary focus:text-white">
                                            {cls.classCode || cls.classId} - {cls.course?.courseName || ""}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                            Ca học
                        </Label>
                        <Select value={shiftCode} onValueChange={setShiftCode}>
                            <SelectTrigger className="rounded-xl h-12 bg-gray-50/80 border-gray-100 font-bold text-gray-800 focus:ring-primary/20">
                                <SelectValue placeholder="Chọn ca học" />
                            </SelectTrigger>
                            <SelectContent data-role="admin" className="rounded-xl font-bold border-gray-100">
                                {shifts.map((shift: any) => (
                                    <SelectItem key={shift.shiftCode} value={shift.shiftCode} className="focus:bg-primary focus:text-white">
                                        {shift.shiftName} ({shift.timeRange})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                            Ngày học
                        </Label>
                        <input
                            type="date"
                            value={studyDate}
                            onChange={(e) => setStudyDate(e.target.value)}
                            className="rounded-xl h-12 px-4 bg-gray-50/80 border border-gray-100 font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
                        />
                    </div>
                </div>

                <DialogFooter className="pt-4 bg-white border-t border-gray-50 flex gap-3">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onClose}
                        className="h-11 px-5 rounded-xl font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
                        disabled={createMutation.isPending}
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        className="h-11 px-8 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/10 hover:opacity-90 transition-all"
                        disabled={createMutation.isPending}
                    >
                        {createMutation.isPending ? "Đang xử lý..." : "Thêm buổi học"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
