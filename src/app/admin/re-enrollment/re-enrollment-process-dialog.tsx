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
import { Textarea } from "@/components/ui/textarea";
import { useGetClassesByCourseId } from "@/queries/useClassQuery";
import { ProcessReEnrollmentRequestInput, Request } from "@/schemas/request.schema";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ReEnrollmentProcessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProcessReEnrollmentRequestInput) => void;
  loading?: boolean;
  defaultIsSuccess?: boolean;
  selectedRequest?: Request | null;
}

export function ReEnrollmentProcessDialog({
  open,
  onOpenChange,
  onSubmit,
  loading,
  defaultIsSuccess = true,
  selectedRequest,
}: ReEnrollmentProcessDialogProps) {
  const [isSuccess, setIsSuccess] = useState(defaultIsSuccess);
  const [toClassId, setToClassId] = useState("");
  const [approvalNote, setApprovalNote] = useState("");

  const courseId =
    selectedRequest?.enrollment?.class?.course?.courseId ||
    selectedRequest?.fromClass?.course?.courseId ||
    "";

  const { data: classesData } = useGetClassesByCourseId(courseId, {
    limit: 100,
    page: 1,
  });
  const classes = classesData?.data ?? [];

  useEffect(() => {
    if (open) {
      setIsSuccess(defaultIsSuccess);
      setToClassId("");
      setApprovalNote("");
    }
  }, [open, defaultIsSuccess]);

  const handleSubmit = () => {
    onSubmit({
      isSuccess,
      ...(isSuccess && toClassId ? { toClassId } : {}),
      ...(approvalNote ? { approvalNote } : {}),
    });
  };

  const isValid = isSuccess ? !!toClassId : true;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-role="admin"
        className="sm:max-w-[500px] rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans"
      >
        <DialogHeader className="p-8 bg-white border-b border-gray-50">
          <div
            className="size-12 rounded-2xl flex items-center justify-center mb-4"
            style={{ backgroundColor: isSuccess ? "var(--primary)" : "#fef2f2" }}
          >
            {isSuccess ? (
              <CheckCircleIcon className="size-6 text-white" />
            ) : (
              <XCircleIcon className="size-6 text-red-500" />
            )}
          </div>
          <DialogTitle className="text-2xl font-black tracking-tighter text-gray-900">
            Xử lý yêu cầu tái nhập học
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-medium">
            {isSuccess
              ? "Chọn lớp học mới cho học viên khi duyệt yêu cầu."
              : "Xác nhận từ chối yêu cầu tái nhập học của học viên."}
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 space-y-6 bg-white">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
              Hành động
            </label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={isSuccess ? "default" : "outline"}
                onClick={() => setIsSuccess(true)}
                style={
                  isSuccess
                    ? { backgroundColor: "var(--primary)", color: "white" }
                    : {}
                }
                className={`flex-1 h-12 rounded-xl font-bold ${!isSuccess ? "border-gray-200 text-gray-500" : "shadow-lg"
                  }`}
              >
                <CheckCircleIcon className="size-4 mr-2" />
                Duyệt
              </Button>
              <Button
                type="button"
                variant={!isSuccess ? "default" : "outline"}
                onClick={() => setIsSuccess(false)}
                className={`flex-1 h-12 rounded-xl font-bold ${!isSuccess
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-200"
                  : "border-gray-200 text-gray-500"
                  }`}
              >
                <XCircleIcon className="size-4 mr-2" />
                Từ chối
              </Button>
            </div>
          </div>

          {isSuccess && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Lớp học mới <span className="text-red-500">*</span>
              </label>
              <Select value={toClassId} onValueChange={setToClassId}>
                <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white w-full">
                  <SelectValue placeholder="Chọn lớp học..." />
                </SelectTrigger>
                <SelectContent data-role="admin" className="!w-full">
                  {classes.map((cls: any) => (
                    <SelectItem className="!w-full" key={cls.classId} value={cls.classId}>
                      {cls.roomCode} - {cls.course?.courseName} {cls.classId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
              Ghi chú
            </label>
            <Textarea
              placeholder="Nhập ghi chú (không bắt buộc)..."
              value={approvalNote}
              onChange={(e) => setApprovalNote(e.target.value)}
              className="min-h-[100px] rounded-xl border-gray-200 bg-white resize-none"
            />
          </div>
        </div>

        <DialogFooter className="p-8 bg-white border-t border-gray-50 flex gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="h-12 px-6 rounded-xl font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
          >
            Hủy bỏ
          </Button>
          <Button
            type="button"
            disabled={loading || !isValid}
            onClick={handleSubmit}
            style={
              isSuccess
                ? { backgroundColor: "var(--primary)", color: "white" }
                : {}
            }
            className={`h-12 px-10 rounded-xl font-black shadow-lg transition-all ${!isSuccess ? "bg-red-500 hover:bg-red-600 text-white shadow-red-200" : ""
              }`}
          >
            {loading
              ? "Đang xử lý..."
              : isSuccess
                ? "Duyệt yêu cầu"
                : "Từ chối yêu cầu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
