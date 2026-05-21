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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScheduleSession } from "@/schemas/schedule-session.schema";
import { useGetShifts } from "@/queries/useShiftQuery";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface RequestDialogProps {
  session: ScheduleSession | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    sessionId: string;
    proposedShiftCode: string;
    proposedStudyDate: string;
    reason: string;
  }) => void;
  loading?: boolean;
}

export function ScheduleChangeRequestDialog({
  session,
  isOpen,
  onClose,
  onSubmit,
  loading,
}: RequestDialogProps) {
  const [proposedShiftCode, setProposedShiftCode] = useState("");
  const [proposedStudyDate, setProposedStudyDate] = useState("");
  const [reason, setReason] = useState("");

  const { data: shiftsResponse } = useGetShifts();
  const shiftsList = shiftsResponse?.data || [];

  useEffect(() => {
    if (session) {
      setProposedShiftCode("");
      setProposedStudyDate("");
      setReason("");
    }
  }, [session]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.sessionId) return;
    onSubmit({
      sessionId: session.sessionId,
      proposedShiftCode,
      proposedStudyDate,
      reason,
    });
  };

  if (!session) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent data-role="teacher" className="!max-w-xl bg-white rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-8 bg-gray-50/80 border-b border-gray-100">
          <DialogTitle className="text-xl font-black text-gray-800 tracking-tight flex items-center gap-2">
            Yêu cầu dời lịch học
          </DialogTitle>
          <DialogDescription className="text-sm font-medium text-gray-400 mt-1">
            Gửi yêu cầu thay đổi lịch học lên quản trị viên xét duyệt.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Thông tin buổi học hiện tại */}
          <div className="bg-amber-50/80 border border-amber-100 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-amber-700">
              <AlertCircle className="size-4" />
              <span className="text-xs font-black uppercase tracking-wider">Buổi học hiện tại</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-gray-400 uppercase">Mã lớp</span>
              <span className="text-sm font-black text-gray-800 bg-white px-3 py-1 rounded-xl shadow-sm border border-amber-100">
                {session.class?.classCode || session.classId}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 font-bold">
              <Clock className="size-4 text-slate-400" />
              <span>Ca {session.shiftCode} ({session.shift?.timeRange})</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 font-bold">
              <Calendar className="size-4 text-slate-400" />
              <span>Ngày: {new Date(session.studyDate).toLocaleDateString("vi-VN")}</span>
            </div>
          </div>

          {/* Ca học đề xuất */}
          <div className="space-y-2.5">
            <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
              Ca học đề xuất
            </Label>
            <Select value={proposedShiftCode} onValueChange={setProposedShiftCode}>
              <SelectTrigger className="w-full h-14 rounded-2xl border-gray-200 bg-white font-bold text-gray-700 px-5">
                <SelectValue placeholder="Chọn ca học mới..." />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {shiftsList.map((shift: any) => (
                  <SelectItem key={shift.shiftCode} value={shift.shiftCode} className="rounded-xl font-medium">
                    Ca {shift.shiftCode} ({shift.timeRange})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ngày học đề xuất */}
          <div className="space-y-2.5">
            <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
              Ngày học đề xuất
            </Label>
            <Input
              type="date"
              value={proposedStudyDate}
              onChange={(e) => setProposedStudyDate(e.target.value)}
              className="h-14 rounded-2xl border-gray-200 bg-white font-bold text-gray-700 px-5"
            />
          </div>

          {/* Lý do */}
          <div className="space-y-2.5">
            <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
              Lý do
            </Label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập lý do dời lịch..."
              className="w-full h-24 rounded-2xl border border-gray-200 bg-white font-medium text-sm text-gray-700 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              required
            />
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
              disabled={loading || !proposedShiftCode || !proposedStudyDate || !reason}
              className="h-12 flex-1 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:opacity-95"
            >
              {loading ? "Đang xử lý..." : "Gửi yêu cầu"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
