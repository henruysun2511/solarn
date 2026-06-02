"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useCreateTransferRequest, useGetMyTransferRequests } from "@/queries/useRequestQuery";
import { useGetClasses, useGetMyEnrolledClasses } from "@/queries/useClassQuery";
import {
    Calendar,
    GitPullRequest,
    History,
    MoreVertical,
    Send,
} from "lucide-react";
import { TransferRequestInput, transferRequestSchema } from "@/schemas/request.schema";
import { StatusBadge } from "@/components/common/badge-level";
import { getClassLabel } from "@/constants/label";

export default function StudentTransferPage() {
    const { data: enrolledClasses } = useGetMyEnrolledClasses({ limit: 50 });
    const { data: allClasses } = useGetClasses({ limit: 200 });
    const { data: transferRequests } = useGetMyTransferRequests({ limit: 50 });
    const createTransfer = useCreateTransferRequest();

    const enrolled = enrolledClasses?.data ?? [];
    const [fromClassId, setFromClassId] = useState("");
    const [toClassId, setToClassId] = useState("");
    const [reason, setReason] = useState("");

    useEffect(() => {
        if (!fromClassId && enrolled.length > 0) {
            setFromClassId(enrolled[0].classId);
        }
    }, [enrolled, fromClassId]);

    const classes = allClasses?.data ?? [];
    const availableClasses = classes.filter((c) => c.classId !== fromClassId);
    const selectedFromClass = enrolled.find((c) => c.classId === fromClassId);

    const handleSubmit = () => {
        if (!fromClassId) return;
        const input: TransferRequestInput = {
            fromClassId,
            toClassId,
            reason,
        };
        const parsed = transferRequestSchema.safeParse(input);
        if (!parsed.success) return;
        createTransfer.mutate(parsed.data, {
            onSuccess: () => {
                setToClassId("");
                setReason("");
            },
        });
    };

    const formatDate = (d?: string) => {
        if (!d) return "";
        return new Date(d).toLocaleDateString("vi-VN");
    };

    const historyItems = transferRequests?.data ?? [];

    return (
        <div className="space-y-8 pb-10">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-[var(--primary)] p-6 rounded-[2.5rem] border border-[var(--sidebar-border)] shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="bg-[var(--accent)] p-3 rounded-2xl">
                        <GitPullRequest className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl text-white font-black tracking-tight">Yêu cầu chuyển lớp</h2>
                        <p className="text-sm text-white text-muted-foreground uppercase tracking-widest">Vui lòng đợi admin xét duyệt 2, 3 ngày</p>
                    </div>
                </div>
            </div>

            {/* 1. FORM YÊU CẦU */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-[var(--sidebar-border)] overflow-hidden transition-all hover:shadow-md">
                <div className="p-6 border-b border-[var(--sidebar-border)] flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-[var(--primary)] rounded-full" />
                    <h2 className="font-black text-lg">Thông tin yêu cầu</h2>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        {/* Student Code (Readonly) */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-700 ml-1">Mã học sinh <span className="text-red-500">*</span></label>
                            <Input
                                value="HS-SV"
                                disabled
                                className="h-12 rounded-xl bg-slate-50 border-slate-200 font-semibold"
                            />
                        </div>

                        {/* Current Class */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-700 ml-1">Lớp hiện tại <span className="text-red-500">*</span></label>
                            <Select value={fromClassId} onValueChange={setFromClassId}>
                                <SelectTrigger className="select-trigger">
                                    <SelectValue placeholder="Chọn lớp hiện tại" />
                                </SelectTrigger>
                                <SelectContent className="select-content">
                                    {enrolled.map((c) => (
                                        <SelectItem key={c.classId} value={c.classId} className="select-item">
                                            {getClassLabel(c)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* New Class Selection */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-700 ml-1">Lớp muốn chuyển đến <span className="text-red-500">*</span></label>
                            <Select value={toClassId} onValueChange={setToClassId}>
                                <SelectTrigger className="select-trigger">
                                    <SelectValue placeholder="Chọn lớp mới" />
                                </SelectTrigger>
                                <SelectContent className="select-content">
                                    {availableClasses.map((c) => (
                                        <SelectItem key={c.classId} value={c.classId} className="select-item">
                                            {getClassLabel(c)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Reason Field */}
                    <div className="mt-8 space-y-2">
                        <label className="text-[13px] font-bold text-gray-700 ml-1">Lý do chuyển lớp <span className="text-red-500">*</span></label>
                        <Textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Nhập chi tiết lý do bạn muốn chuyển lớp (Ví dụ: Trùng lịch học, khoảng cách địa lý...)"
                            className="min-h-[120px] rounded-2xl border-slate-200 focus:ring-[var(--primary)] p-4 leading-relaxed font-medium"
                        />
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <Button
                            variant="outline"
                            className="h-12 px-8 rounded-xl font-bold text-slate-500 border-slate-200"
                            onClick={() => { setToClassId(""); setReason(""); }}
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            className="h-12 px-10 rounded-xl bg-[var(--primary)] text-white font-bold shadow-lg shadow-[var(--primary)]/20 gap-2"
                            onClick={handleSubmit}
                            disabled={createTransfer.isPending || !toClassId || !reason}
                        >
                            <Send className="w-4 h-4" /> Gửi yêu cầu
                        </Button>
                    </div>
                </div>
            </div>

            {/* 2. TABLE LỊCH SỬ */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 px-2">
                    <History className="w-5 h-5 text-[var(--primary)]" />
                    <h2 className="font-black text-xl tracking-tight text-gray-800">Lịch sử chuyển lớp</h2>
                </div>

                <div className="bg-white rounded-[2rem] shadow-sm border border-[var(--sidebar-border)] overflow-hidden transition-all">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/80">
                                <TableRow className="hover:bg-transparent border-b border-[var(--sidebar-border)]">
                                    <TableHead className="w-24 pl-8 text-[11px] font-black uppercase tracking-widest text-slate-500">Mã đơn</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase tracking-widest text-slate-500">Lớp cũ</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase tracking-widest text-slate-500">Lớp mới</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase tracking-widest text-slate-500 w-[350px]">Lý do</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase tracking-widest text-slate-500">Ngày gửi</TableHead>
                                    <TableHead className="text-[11px] font-black uppercase tracking-widest text-slate-500">Trạng thái</TableHead>
                                    <TableHead className="text-right pr-8 text-[11px] font-black uppercase tracking-widest text-slate-500">Thao tác</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {historyItems.map((item: any) => (
                                    <TableRow key={item.requestId} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
                                        <TableCell className="pl-8 font-black text-[var(--primary)]">{item.requestId?.slice(0, 8).toUpperCase()}</TableCell>
                                        <TableCell className="font-bold text-slate-600">{item.fromClass ? getClassLabel(item.fromClass) : ""}</TableCell>
                                        <TableCell className="font-black text-gray-800">{item.toClass ? getClassLabel(item.toClass) : ""}</TableCell>
                                        <TableCell>
                                            <p className="text-sm text-slate-500 line-clamp-1 font-medium italic">&ldquo;{item.reason}&rdquo;</p>
                                        </TableCell>
                                        <TableCell className="text-sm font-bold text-slate-400">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatDate(item.createdAt)}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={item.status} />
                                        </TableCell>
                                        <TableCell className="text-right pr-8">
                                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-[var(--accent)] text-slate-400">
                                                <MoreVertical className="w-5 h-5" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {historyItems.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-slate-400 font-medium">
                                            Chưa có yêu cầu chuyển lớp nào
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
