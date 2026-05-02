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
import { AlertTriangleIcon } from "lucide-react";

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    buttonText?: string;
    loading?: boolean;
}

export function ConfirmDialog({
    open,
    onOpenChange,
    onConfirm,
    title = "Xác nhận xóa",
    description = "Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa mục này?",
    buttonText = "Xác nhận xóa",
    loading,
}: ConfirmDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent data-role="admin" className="sm:max-w-[450px] rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans">
                <DialogHeader className="p-8 bg-white">
                    <div className="size-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                        <AlertTriangleIcon className="size-6 text-red-500" />
                    </div>
                    <DialogTitle className="text-xl font-black tracking-tighter text-gray-900">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-gray-400 font-medium">
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="p-8 bg-gray-50/50 border-t border-gray-50 flex gap-3">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="h-12 px-6 rounded-xl font-bold text-gray-400 hover:bg-gray-100 transition-colors"
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={loading}
                        className="h-12 px-8 rounded-xl bg-red-500 text-white font-black shadow-lg shadow-red-200 hover:bg-red-600 transition-all"
                    >
                        {loading ? "Đang thực hiện" : buttonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}