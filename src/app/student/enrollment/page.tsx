"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SortOrder } from "@/constants/sort";
import { EnrollmentStatus } from "@/constants/type";
import { useGetMyEnrollments } from "@/queries/useEnrollmentQuery";
import {
  useCreateReEnrollmentRequest,
  useGetMyReEnrollmentRequests,
} from "@/queries/useRequestQuery";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  History,
  Lock,
  RotateCcw,
  Send,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { handleError } from "@/utils/handleError";
import { STATUS_MAP } from "@/constants/label";
import { StatusBadge } from "@/components/common/badge-level";


export default function StudentEnrollmentPage() {
  const { data: enrollmentsData, isLoading: enrollLoading } = useGetMyEnrollments();
  const { data: reEnrollData } = useGetMyReEnrollmentRequests({
    limit: 50,
    page: 1,
    sortOrder: SortOrder.DESC,
    sortBy: "createdAt",
  });
  const createReEnroll = useCreateReEnrollmentRequest();

  const enrollments = enrollmentsData?.data ?? [];
  const reEnrollRequests = reEnrollData?.data ?? [];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState("");
  const [reason, setReason] = useState("");

  const openReEnrollDialog = (enrollmentId: string) => {
    setSelectedEnrollmentId(enrollmentId);
    setReason("");
    setDialogOpen(true);
  };

  const handleSubmitReEnroll = async () => {
    if (!selectedEnrollmentId) return;
    try {
      await createReEnroll.mutateAsync(
        { enrollmentId: selectedEnrollmentId, reason: reason || undefined },
        {
          onSuccess: (res: any) => {
            toast.success(res?.message || "Gửi yêu cầu tái nhập học thành công");
            setDialogOpen(false);
            setSelectedEnrollmentId("");
            setReason("");
          },
          onError: (error: any) => {
            handleError(error, "Không thể gửi yêu cầu");
          },
        }
      );
    } catch (error) {
      console.error("Submit failed", error);
    }
  };

  const formatDate = (d?: string) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("vi-VN");
  };

  const deferredEnrollments = enrollments.filter(
    (e: any) => e.status === EnrollmentStatus.DEFERRED
  );

  return (
    <div className="space-y-8 pb-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-[var(--primary)] p-6 rounded-[2.5rem] border border-[var(--sidebar-border)] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-[var(--accent)] p-3 rounded-2xl">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl text-white font-black tracking-tight">Quản lý khóa học</h2>
            <p className="text-sm text-white text-muted-foreground uppercase tracking-widest">Theo dõi trạng thái khóa học của bạn</p>
          </div>
        </div>
      </div>

      {/* ENROLLMENT CARDS */}
      {enrollLoading ? (
        <div className="text-center py-12 text-slate-400 font-medium">Đang tải...</div>
      ) : enrollments.length === 0 ? (
        <div className="text-center py-12 text-slate-400 font-medium">Chưa có khóa học nào</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {enrollments.map((enrollment: any) => {
            const statusInfo = STATUS_MAP[enrollment.status] || STATUS_MAP.NOT_STARTED;
            const isDeferred = enrollment.status === EnrollmentStatus.DEFERRED;
            const alreadyRequested = reEnrollRequests.some(
              (r: any) => r.enrollmentId === enrollment.enrollmentId
            );

            return (
              <div
                key={enrollment.enrollmentId}
                className={`bg-white rounded-[2rem] shadow-sm border border-[var(--sidebar-border)] overflow-hidden transition-all hover:shadow-md ${isDeferred ? "ring-2 ring-primary" : ""
                  }`}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1 min-w-0">
                      <h3 className="font-black text-gray-900 text-lg leading-tight truncate">
                        {enrollment.class?.course?.courseName || "---"}
                      </h3>
                      <p className="text-sm font-bold text-gray-400">
                        {enrollment.class?.roomCode || "---"}
                      </p>
                    </div>
                    <Badge
                      className={`${statusInfo.className} border-none font-black text-[10px] uppercase px-3 py-1 rounded-lg flex items-center gap-1.5 shrink-0 ml-2`}
                    >
                      {statusInfo.icon}
                      {statusInfo.label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Bắt đầu: {formatDate(enrollment.class?.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{enrollment.class?.course?.totalSessions || 0} buổi</span>
                    </div>
                  </div>

                  {isDeferred && (
                    <div className="pt-3 border-t border-slate-100">
                      {alreadyRequested ? (
                        <Badge className="bg-blue-100 text-blue-600 border-blue-100 font-black text-[10px] px-3 py-1.5 rounded-lg w-full justify-center">
                          Đã gửi yêu cầu tái nhập học
                        </Badge>
                      ) : (
                        <Button
                          onClick={() => openReEnrollDialog(enrollment.enrollmentId)}
                          disabled={createReEnroll.isPending}
                          className="w-full h-11 rounded-xl bg-primary hover:bg-primary/80 text-white font-bold shadow-lg shadow-primary/20 gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Gửi yêu cầu tái nhập học
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* RE-ENROLLMENT REQUEST HISTORY */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-2">
          <History className="w-5 h-5 text-[var(--primary)]" />
          <h2 className="font-black text-xl tracking-tight text-gray-800">
            Lịch sử yêu cầu tái nhập học
          </h2>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-[var(--sidebar-border)] overflow-hidden transition-all">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/80">
                <TableRow className="hover:bg-transparent border-b border-[var(--sidebar-border)]">
                  <TableHead className="w-24 pl-8 text-[11px] font-black uppercase tracking-widest text-slate-500">Mã đơn</TableHead>
                  <TableHead className="text-[11px] font-black uppercase tracking-widest text-slate-500">Khóa học</TableHead>
                  <TableHead className="text-[11px] font-black uppercase tracking-widest text-slate-500 w-[300px]">Lý do</TableHead>
                  <TableHead className="text-[11px] font-black uppercase tracking-widest text-slate-500">Ngày gửi</TableHead>
                  <TableHead className="text-[11px] font-black uppercase tracking-widest text-slate-500">Trạng thái</TableHead>
                  <TableHead className="text-right pr-8 text-[11px] font-black uppercase tracking-widest text-slate-500">Ghi chú</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reEnrollRequests.map((item: any) => (
                  <TableRow key={item.requestId} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
                    <TableCell className="pl-8 font-black text-[var(--primary)]">
                      {item.requestId?.slice(0, 8).toUpperCase()}
                    </TableCell>
                    <TableCell className="font-bold text-slate-600">
                      {item.fromClass?.course?.courseName || item.enrollment?.class?.course?.courseName || "---"}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-slate-500 line-clamp-1 font-medium italic">
                        &ldquo;{item.reason || "Không có lý do"}&rdquo;
                      </p>
                    </TableCell>
                    <TableCell className="text-sm font-bold text-slate-400">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(item.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} />
                    </TableCell>
                    <TableCell className="text-right pr-8 text-sm font-medium text-slate-400 max-w-[150px] truncate">
                      {item.approvalNote || "---"}
                    </TableCell>
                  </TableRow>
                ))}
                {reEnrollRequests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-400 font-medium">
                      Chưa có yêu cầu tái nhập học nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* RE-ENROLLMENT DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          data-role="student"
          className="sm:max-w-[450px] rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans"
        >
          <DialogHeader className="p-8 bg-white border-b border-gray-50">
            <div className="size-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
              <Send className="size-6 text-amber-500" />
            </div>
            <DialogTitle className="text-2xl font-black tracking-tighter text-gray-900">
              Yêu cầu tái nhập học
            </DialogTitle>
            <DialogDescription className="text-gray-400 font-medium">
              Nhập lý do để admin xét duyệt yêu cầu tái nhập học của bạn.
            </DialogDescription>
          </DialogHeader>

          <div className="p-8 space-y-6 bg-white">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-700 ml-1">
                Lý do <span className="text-gray-400 font-medium">(không bắt buộc)</span>
              </label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Nhập lý do tái nhập học..."
                className="min-h-[120px] rounded-2xl border-slate-200 focus:ring-[var(--primary)] p-4 leading-relaxed font-medium"
              />
            </div>
          </div>

          <DialogFooter className="p-8 bg-white border-t border-gray-50 flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              className="h-12 px-6 rounded-xl font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            >
              Hủy bỏ
            </Button>
            <Button
              type="button"
              disabled={createReEnroll.isPending}
              onClick={handleSubmitReEnroll}
              className="h-12 px-10 rounded-xl bg-[var(--primary)] text-white font-black shadow-lg shadow-[var(--primary)]/20 hover:opacity-90 transition-all gap-2"
            >
              {createReEnroll.isPending ? (
                "Đang gửi..."
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Gửi yêu cầu
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
