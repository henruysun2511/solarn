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
import { CalculateSalaryInput } from "@/schemas/salary.schema";
import { CalendarDays, DollarSign, EyeIcon, Loader2Icon, SaveIcon } from "lucide-react";
import React, { useState } from "react";

interface SalaryPreviewItem {
  teacherId: string;
  teacherCode: string;
  fullName: string | null;
  salaryRate: string;
  month: number;
  year: number;
  salaryDate: string;
  totalSessions: number;
  sessionEarnings: string;
  totalAmount: string;
}

interface SalaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPreview: (data: CalculateSalaryInput) => void;
  onSave: (data: CalculateSalaryInput) => void;
  previewData: SalaryPreviewItem[] | null;
  isPreviewing: boolean;
  isSaving: boolean;
  savedResult: { salaryDate: string; year: number; month: number; createdCount: number } | null;
}

export function SalaryDialog({
  open,
  onOpenChange,
  onPreview,
  onSave,
  previewData,
  isPreviewing,
  isSaving,
  savedResult,
}: SalaryDialogProps) {
  const currentYear = new Date().getFullYear();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(currentYear);

  const handlePreview = () => {
    onPreview({ month, year });
  };

  const handleSave = () => {
    onSave({ month, year });
  };

  const getResultMessage = () => {
    if (!savedResult) return "";
    return `Đã tạo ${savedResult.createdCount} phiếu lương cho tháng ${savedResult.month}/${savedResult.year}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-role="admin"
        className="sm:max-w-[900px] rounded-[2.5rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans"
      >
        <DialogHeader className="p-10 bg-white border-b border-gray-50">
          <div className="size-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
            <DollarSign className="size-7 text-primary" />
          </div>
          <DialogTitle className="text-3xl font-black tracking-tighter text-gray-900">
            Tính lương giảng viên
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-medium text-lg">
            Chọn kỳ lương và xem trước trước khi lưu vào hệ thống.
          </DialogDescription>
        </DialogHeader>

        <div className="p-10 space-y-8 bg-white max-h-[65vh] overflow-y-auto custom-scrollbar">
          {/* Month/Year Selection */}
          <div className="flex items-end gap-6">
            <div className="space-y-3">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Tháng
              </Label>
              <Input
                type="number"
                min={1}
                max={12}
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="h-14 w-28 rounded-2xl border-gray-200 bg-white text-lg font-bold text-center"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Năm
              </Label>
              <Input
                type="number"
                min={2000}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="h-14 w-32 rounded-2xl border-gray-200 bg-white text-lg font-bold text-center"
              />
            </div>
            <Button
              onClick={handlePreview}
              disabled={isPreviewing}
              className="h-14 px-8 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/20"
            >
              {isPreviewing ? (
                <Loader2Icon className="mr-2 size-5 animate-spin" />
              ) : (
                <EyeIcon className="mr-2 size-5" />
              )}
              {isPreviewing ? "Đang tính..." : "Xem trước"}
            </Button>
          </div>

          {/* Preview Results */}
          {previewData && previewData.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                <CalendarDays className="size-4" />
                Kết quả tính lương tháng {month}/{year}
              </div>

              <div className="border border-gray-200 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400 pl-6">Giảng viên</th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Mã số</th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Lương cơ bản</th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Số buổi</th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400">Thu nhập buổi</th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-wider text-gray-400 text-right pr-6">Tổng cộng</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {previewData.map((item) => (
                        <tr key={item.teacherId} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 pl-6">
                            <span className="font-bold text-gray-800">{item.fullName || "N/A"}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-mono text-sm text-gray-500">{item.teacherCode}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-gray-600">
                              {Number(item.salaryRate).toLocaleString()}₫
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-gray-900">{item.totalSessions}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-gray-600">
                              +{Number(item.sessionEarnings).toLocaleString()}₫
                            </span>
                          </td>
                          <td className="p-4 text-right pr-6">
                            <span className="font-black text-primary">
                              {Number(item.totalAmount).toLocaleString()}₫
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {previewData && previewData.length === 0 && (
            <div className="text-center py-12 text-gray-400 font-medium">
              Không có dữ liệu lương cho tháng {month}/{year}
            </div>
          )}

          {savedResult && (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-center text-sm">
              {getResultMessage()}
            </div>
          )}
        </div>

        <DialogFooter className="p-10 bg-white border-t border-gray-50 flex gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="h-14 px-8 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
          >
            Đóng
          </Button>
          {previewData && previewData.length > 0 && !savedResult && (
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="h-14 px-12 rounded-2xl bg-emerald-600 text-white font-black text-lg shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
            >
              {isSaving ? (
                <Loader2Icon className="mr-2 size-5 animate-spin" />
              ) : (
                <SaveIcon className="mr-2 size-5" />
              )}
              {isSaving ? "Đang lưu..." : "Lưu bảng lương"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
