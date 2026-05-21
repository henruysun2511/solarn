"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Salary } from "@/schemas/salary.schema";
import { AlertCircleIcon, X } from "lucide-react";
import { useState } from "react";

interface SalaryComplaintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  salary: Salary | null;
  onSubmit: (data: { salaryId: string; proposedAmount: number; reason: string }) => void;
  isPending?: boolean;
}

export function SalaryComplaintDialog({
  open,
  onOpenChange,
  salary,
  onSubmit,
  isPending,
}: SalaryComplaintDialogProps) {
  const [reason, setReason] = useState("");
  const [proposedAmount, setProposedAmount] = useState("");

  const handleSubmit = () => {
    if (!salary) return;
    onSubmit({
      salaryId: salary.salaryId || "",
      proposedAmount: Number(proposedAmount),
      reason,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-role="teacher"
        className="sm:max-w-[480px] rounded-[1.5rem] p-8 bg-white border border-slate-100 overflow-hidden"
      >
        <DialogHeader className="p-0 absolute top-4 right-4 z-50">
          <DialogClose className="rounded-full p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <DialogTitle className="text-2xl font-black text-gray-800 flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-[var(--primary)]/10 rounded-xl text-[var(--primary)]">
            <AlertCircleIcon className="size-6" />
          </div>
          Gửi khiếu nại lương
        </DialogTitle>

        {salary && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm">
            <p className="font-semibold text-amber-800">
              Kỳ lương:{" "}
              {(() => {
                const d = new Date(salary.salaryDate);
                return `Tháng ${d.getMonth() + 1}/${d.getFullYear()}`;
              })()}
            </p>
            <p className="text-amber-700 mt-1">
              Số tiền hiện tại: <span className="font-bold">{Number(salary.totalAmount).toLocaleString()}₫</span>
            </p>
          </div>
        )}

        <div className="py-4 space-y-5">
          <div className="space-y-2 px-1">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-2 tracking-widest">
              Số tiền đề xuất
            </label>
            <Input
              type="number"
              min={0}
              placeholder="Nhập số tiền bạn cho là đúng..."
              className="rounded-2xl border-slate-200 focus-visible:ring-[var(--primary)] font-medium p-4 h-12"
              value={proposedAmount}
              onChange={(e) => setProposedAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2 px-1">
            <label className="text-[11px] font-black text-slate-400 uppercase ml-2 tracking-widest">
              Mô tả vấn đề cần khiếu nại
            </label>
            <Textarea
              placeholder="Vui lòng cho biết chi tiết vấn đề..."
              className="min-h-[150px] rounded-2xl border-slate-200 focus-visible:ring-[var(--primary)] font-medium p-4"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="gap-3 sm:gap-0 bg-white pt-2">
          <Button
            variant="ghost"
            className="flex-1 h-12 rounded-xl font-bold text-slate-500"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button
            className="flex-1 h-12 rounded-xl font-black bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20 hover:opacity-90 transition-all"
            disabled={!reason || !proposedAmount || isPending}
            onClick={handleSubmit}
          >
            {isPending ? "Đang gửi..." : "Gửi yêu cầu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
