"use client";

import { Badge } from "@/components/ui/badge";
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
import {
    Calendar,
    CheckCircle2,
    Clock,
    GitPullRequest,
    History,
    MoreVertical,
    RotateCcw,
    Send,
    XCircle
} from "lucide-react";

// Dữ liệu mẫu cho lịch sử yêu cầu
const transferHistory = [
    {
        id: "TR-9901",
        oldClass: "Class 10 (A)",
        newClass: "Class 10 (B)",
        reason: "Mong muốn đổi môi trường học tập và giáo viên chủ nhiệm.",
        requestDate: "15/04/2026",
        status: "PENDING",
    },
    {
        id: "TR-8542",
        oldClass: "Class 09 (C)",
        newClass: "Class 09 (A)",
        reason: "Trùng lịch học thêm các môn năng khiếu vào buổi chiều.",
        requestDate: "10/01/2026",
        status: "APPROVED",
    },
    {
        id: "TR-7210",
        oldClass: "Class 09 (C)",
        newClass: "Class 09 (B)",
        reason: "Lớp mới có các bạn cùng nhóm nghiên cứu khoa học.",
        requestDate: "20/12/2025",
        status: "REJECTED",
    }
];

export default function StudentTransferPage() {
    return (
        <div className="space-y-8 pb-10">
            {/* HEADER TRANG */}
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

            {/* 1. FORM YÊU CẦU (Giao diện giống ảnh mẫu) */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-[var(--sidebar-border)] overflow-hidden transition-all hover:shadow-md">
                <div className="p-6 border-b border-[var(--sidebar-border)] flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-[var(--primary)] rounded-full" />
                    <h2 className="font-black text-lg">Thông tin yêu cầu</h2>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                        {/* Student ID (Readonly) */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-700 ml-1">Mã học sinh <span className="text-red-500">*</span></label>
                            <Input defaultValue="ST-2511" disabled className="h-12 rounded-xl bg-slate-50 border-slate-200 font-semibold" />
                        </div>

                        {/* Old Class (Readonly) */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-700 ml-1">Lớp hiện tại <span className="text-red-500">*</span></label>
                            <Input defaultValue="Class 10 (A)" disabled className="h-12 rounded-xl bg-slate-50 border-slate-200 font-semibold" />
                        </div>

                        {/* New Class Selection */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-700 ml-1">Lớp muốn chuyển đến <span className="text-red-500">*</span></label>
                            <Select>
                                <SelectTrigger className="select-trigger">
                                    <SelectValue placeholder="Chọn lớp mới" />
                                </SelectTrigger>
                                <SelectContent className="select-content">
                                    <SelectItem value="10b" className="select-item">Class 10 (B)</SelectItem>
                                    <SelectItem value="10c" className="select-item">Class 10 (C)</SelectItem>
                                    <SelectItem value="10d" className="select-item">Class 10 (D)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Reason Field */}
                    <div className="mt-8 space-y-2">
                        <label className="text-[13px] font-bold text-gray-700 ml-1">Lý do chuyển lớp <span className="text-red-500">*</span></label>
                        <Textarea
                            placeholder="Nhập chi tiết lý do bạn muốn chuyển lớp (Ví dụ: Trùng lịch học, khoảng cách địa lý...)"
                            className="min-h-[120px] rounded-2xl border-slate-200 focus:ring-[var(--primary)] p-4 leading-relaxed font-medium"
                        />
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <Button variant="outline" className="h-12 px-8 rounded-xl font-bold text-slate-500 border-slate-200">
                            Hủy bỏ
                        </Button>
                        <Button className="h-12 px-10 rounded-xl bg-[var(--primary)] text-white font-bold shadow-lg shadow-[var(--primary)]/20 gap-2">
                            <Send className="w-4 h-4" /> Gửi yêu cầu
                        </Button>
                    </div>
                </div>
            </div>

            {/* 2. TABLE LỊCH SỬ (Giao diện giống file mẫu) */}
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
                                {transferHistory.map((item) => (
                                    <TableRow key={item.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
                                        <TableCell className="pl-8 font-black text-[var(--primary)]">{item.id}</TableCell>
                                        <TableCell className="font-bold text-slate-600">{item.oldClass}</TableCell>
                                        <TableCell className="font-black text-gray-800">{item.newClass}</TableCell>
                                        <TableCell>
                                            <p className="text-sm text-slate-500 line-clamp-1 font-medium italic">"{item.reason}"</p>
                                        </TableCell>
                                        <TableCell className="text-sm font-bold text-slate-400">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {item.requestDate}
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
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Component phụ trợ hiển thị trạng thái bằng Badge
function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case "PENDING":
            return (
                <Badge className="bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-50 px-3 py-1 rounded-lg flex items-center gap-1.5 w-fit font-black text-[10px]">
                    <Clock className="w-3 h-3" /> CHỜ DUYỆT
                </Badge>
            );
        case "APPROVED":
            return (
                <Badge className="bg-green-50 text-green-600 border-green-100 hover:bg-green-50 px-3 py-1 rounded-lg flex items-center gap-1.5 w-fit font-black text-[10px]">
                    <CheckCircle2 className="w-3 h-3" /> ĐÃ DUYỆT
                </Badge>
            );
        case "REJECTED":
            return (
                <Badge className="bg-red-50 text-red-600 border-red-100 hover:bg-red-50 px-3 py-1 rounded-lg flex items-center gap-1.5 w-fit font-black text-[10px]">
                    <XCircle className="w-3 h-3" /> TỪ CHỐI
                </Badge>
            );
        default:
            return (
                <Badge className="bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-50 px-3 py-1 rounded-lg flex items-center gap-1.5 w-fit font-black text-[10px]">
                    <RotateCcw className="w-3 h-3" /> ĐÃ HỦY
                </Badge>
            );
    }
}