"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useCreateFeedback, useGetMyStudentFeedbacks } from "@/queries/useFeedbackQuery";
import { useGetMyEnrolledClasses } from "@/queries/useClassQuery";
import {
    Calendar,
    History,
    MessageSquareQuote,
    Send,
    Star,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { FeedbackInput } from "@/schemas/feedback.schema";

function StarRating({ value, onChange, readonly }: { value: number; onChange?: (v: number) => void; readonly?: boolean }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={readonly}
                    onClick={() => onChange?.(star)}
                    className={cn(
                        "transition-all",
                        readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
                    )}
                >
                    <Star
                        className={cn(
                            "w-6 h-6",
                            star <= value
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-slate-200 text-slate-200"
                        )}
                    />
                </button>
            ))}
        </div>
    );
}

export default function StudentFeedbackPage() {
    const { data: enrolledClasses } = useGetMyEnrolledClasses({ limit: 50 });
    const { data: feedbackRes } = useGetMyStudentFeedbacks({ limit: 50, page: 1, sortOrder: "desc" as any, sortBy: "createdAt" });
    const createFeedback = useCreateFeedback();

    const enrolled = enrolledClasses?.data ?? [];
    const historyItems = feedbackRes?.data ?? [];

    const [classId, setClassId] = useState("");
    const [starRating, setStarRating] = useState(0);
    const [content, setContent] = useState("");

    useEffect(() => {
        if (!classId && enrolled.length > 0) {
            setClassId(enrolled[0].classId);
        }
    }, [enrolled, classId]);

    const selectedClass = enrolled.find((c: any) => c.classId === classId);

    const handleSubmit = () => {
        if (!classId || !starRating || !content) return;
        const teacherId = selectedClass?.teacherId;
        if (!teacherId) return;
        const input: FeedbackInput = { classId, teacherId, content, starRating };
        createFeedback.mutate(input, {
            onSuccess: () => {
                setStarRating(0);
                setContent("");
            },
        });
    };

    const formatDate = (d?: string) => {
        if (!d) return "";
        return new Date(d).toLocaleDateString("vi-VN");
    };

    const getClassLabel = (c: any) =>
        `${c.course?.courseName ?? ""} (${c.roomCode})`;

    return (
        <div data-role="student" className="space-y-8 pb-10">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-[var(--primary)] p-6 rounded-[2.5rem] border border-[var(--sidebar-border)] shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="bg-[var(--accent)] p-3 rounded-2xl">
                        <MessageSquareQuote className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl text-white font-black tracking-tight">Đánh giá khóa học</h2>
                        <p className="text-sm text-white text-muted-foreground uppercase tracking-widest">Chia sẻ trải nghiệm học tập của bạn</p>
                    </div>
                </div>
            </div>

            {/* 1. FORM FEEDBACK */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-[var(--sidebar-border)] overflow-hidden transition-all hover:shadow-md">
                <div className="p-6 border-b border-[var(--sidebar-border)] flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-[var(--primary)] rounded-full" />
                    <h2 className="font-black text-lg">Gửi đánh giá</h2>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Class Selection */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-700 ml-1">Lớp học <span className="text-red-500">*</span></label>
                            <Select value={classId} onValueChange={setClassId}>
                                <SelectTrigger className="select-trigger">
                                    <SelectValue placeholder="Chọn lớp học" />
                                </SelectTrigger>
                                <SelectContent className="select-content">
                                    {enrolled.map((c: any) => (
                                        <SelectItem key={c.classId} value={c.classId} className="select-item">
                                            {getClassLabel(c)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Teacher (readonly) */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-700 ml-1">Giáo viên</label>
                            <div className="h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center px-4 font-semibold text-slate-600">
                                {selectedClass?.teacher?.profile?.fullName ?? "Chưa chọn lớp"}
                            </div>
                        </div>
                    </div>

                    {/* Star Rating */}
                    <div className="mt-8 space-y-2">
                        <label className="text-[13px] font-bold text-gray-700 ml-1">Đánh giá <span className="text-red-500">*</span></label>
                        <StarRating value={starRating} onChange={setStarRating} />
                    </div>

                    {/* Content */}
                    <div className="mt-8 space-y-2">
                        <label className="text-[13px] font-bold text-gray-700 ml-1">Nhận xét <span className="text-red-500">*</span></label>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Chia sẻ cảm nhận của bạn về khóa học, giáo viên..."
                            className="min-h-[120px] rounded-2xl border-slate-200 focus:ring-[var(--primary)] p-4 leading-relaxed font-medium"
                        />
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <Button
                            variant="outline"
                            className="h-12 px-8 rounded-xl font-bold text-slate-500 border-slate-200"
                            onClick={() => { setStarRating(0); setContent(""); }}
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            className="h-12 px-10 rounded-xl bg-[var(--primary)] text-white font-bold shadow-lg shadow-[var(--primary)]/20 gap-2"
                            onClick={handleSubmit}
                            disabled={createFeedback.isPending || !classId || !starRating || !content}
                        >
                            <Send className="w-4 h-4" /> Gửi đánh giá
                        </Button>
                    </div>
                </div>
            </div>

            {/* 2. TABLE LỊCH SỬ */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 px-2">
                    <History className="w-5 h-5 text-[var(--primary)]" />
                    <h2 className="font-black text-xl tracking-tight text-gray-800">Lịch sử đánh giá</h2>
                </div>

                <div className="bg-white rounded-[2rem] shadow-sm border border-[var(--sidebar-border)] overflow-hidden transition-all">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/80">
                                <TableRow className="hover:bg-transparent border-b border-[var(--sidebar-border)]">
                                    <TableHead className="w-24 pl-8 text-[11px] font-black uppercase tracking-widest text-slate-500">Mã ĐG</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase tracking-widest text-slate-500">Lớp học</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase tracking-widest text-slate-500">Giáo viên</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase tracking-widest text-slate-500">Nhận xét</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase tracking-widest text-slate-500">Đánh giá</TableHead>
                                    <TableHead className="text-right pr-8 text-[11px] font-black uppercase tracking-widest text-slate-500">Ngày gửi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {historyItems.map((item: any) => (
                                    <TableRow key={item.feedbackId} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
                                        <TableCell className="pl-8 font-black text-[var(--primary)]">{item.feedbackId?.slice(0, 8).toUpperCase()}</TableCell>
                                        <TableCell className="font-bold text-slate-600">{item.class ? getClassLabel(item.class) : ""}</TableCell>
                                        <TableCell className="font-bold text-slate-600">{item.teacher?.profile?.fullName ?? ""}</TableCell>
                                        <TableCell>
                                            <p className="text-sm text-slate-500 line-clamp-1 font-medium italic">&ldquo;{item.content}&rdquo;</p>
                                        </TableCell>
                                        <TableCell>
                                            <StarRating value={item.starRating} readonly />
                                        </TableCell>
                                        <TableCell className="text-right pr-8 text-sm font-bold text-slate-400">
                                            <div className="flex items-center justify-end gap-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatDate(item.createdAt)}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {historyItems.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-slate-400 font-medium">
                                            Chưa có đánh giá nào
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}
