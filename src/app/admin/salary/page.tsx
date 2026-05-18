"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import {
    AlertCircle,
    ArrowUpRight,
    CalendarDays,
    CheckCircle2,
    DollarSign,
    Download,
    Eye,
    Filter,
    RefreshCw,
    Search,
    TrendingUp,
    Users
} from "lucide-react";

export default function AdminSalaryPage() {
    // Mock data tĩnh cho danh sách lương
    const payrolls = [
        { id: "GV-01", name: "Nguyễn Văn A", role: "Next.js Expert", base: 12000000, sessions: 28, bonus: 2500000, deduct: 0, status: "Paid", updatedBy: "Admin Minh" },
        { id: "GV-02", name: "Trần Thị B", role: "UI/UX Lead Mentor", base: 10000000, sessions: 22, bonus: 1200000, deduct: 200000, status: "Pending", updatedBy: "Hệ thống tự động" },
        { id: "GV-03", name: "Phạm Minh C", role: "DevOps Engineer", base: 15000000, sessions: 16, bonus: 0, deduct: 500000, status: "Pending", updatedBy: "Admin Minh" },
        { id: "GV-04", name: "Lê Hoàng D", role: "React Native Developer", base: 11000000, sessions: 30, bonus: 3000000, deduct: 0, status: "Paid", updatedBy: "Hệ thống tự động" },
        { id: "GV-05", name: "Hoàng Chi E", role: "Business Analyst", base: 9500000, sessions: 20, bonus: 500000, deduct: 100000, status: "Paid", updatedBy: "Admin Linh" },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 sm:p-10 font-sans text-gray-900">

            {/* 1. TOP HEADER ACTION */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                <div>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--primary)] mb-2">
                        <CalendarDays className="size-3.5" /> Chu kỳ tính lương: Tháng 05/2026
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-gray-900">
                        Bảng lương giảng viên
                    </h1>
                    <p className="text-gray-400 text-sm font-medium mt-1">
                        Theo dõi khối lượng tiết dạy, tính toán các khoản phụ cấp, khấu trừ và phê duyệt giải ngân chi trả.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="rounded-2xl border-2 border-gray-200 font-black h-12 px-6 bg-white hover:bg-gray-50 text-gray-700">
                        <RefreshCw className="mr-2 size-4 text-gray-400" /> Đồng bộ lịch dạy
                    </Button>
                    <Button className="bg-gray-900 text-white rounded-2xl font-black h-12 px-6 hover:bg-black transition-all shadow-xl shadow-gray-900/10">
                        <Download className="mr-2 size-4" /> Xuất file báo cáo (.xlsx)
                    </Button>
                </div>
            </div>

            {/* 2. STATS CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                    { label: "Tổng quỹ lương dự kiến", val: "164.900.000₫", icon: DollarSign, bg: "bg-blue-50 text-blue-600", desc: "Tăng 4.2% so với tháng trước" },
                    { label: "Giảng viên nhận lương", val: "24 nhân sự", icon: Users, bg: "bg-purple-50 text-purple-600", desc: "2 giảng viên thử việc" },
                    { label: "Đã phê duyệt chi", val: "3/5 phiếu", icon: CheckCircle2, bg: "bg-emerald-50 text-emerald-600", desc: "Đã gửi thông báo email" },
                    { label: "Yêu cầu chờ xử lý", val: "2 phiếu lương", icon: AlertCircle, bg: "bg-orange-50 text-orange-600", desc: "Cần kiểm tra lại số tiết" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn("size-12 rounded-2xl flex items-center justify-center shrink-0", stat.bg)}>
                                <stat.icon className="size-6" />
                            </div>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300">
                                <ArrowUpRight className="size-4" />
                            </span>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-black text-gray-900 tracking-tight mt-1">{stat.val}</p>
                            <div className="flex items-center gap-1 text-[11px] font-medium text-gray-400 mt-2">
                                {i === 0 && <TrendingUp className="size-3 text-emerald-500" />}
                                {stat.desc}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. FILTER BAR & DATATABLE CONTAINER */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">

                {/* 3.1 Control Filter Bar */}
                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between bg-white">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm giảng viên theo tên hoặc ID..."
                            className="w-full pl-11 pr-4 h-12 bg-gray-50 rounded-2xl text-sm font-medium border-2 border-transparent focus:border-[var(--primary)]/20 focus:bg-white outline-none transition-all"
                        />
                    </div>

                    <div className="flex gap-3 w-full md:w-auto justify-end">
                        <Button variant="outline" className="rounded-2xl border-gray-200 font-bold h-12 px-5 text-gray-600 bg-white hover:bg-gray-50">
                            <Filter className="mr-2 size-4 text-gray-400" /> Tất cả phòng ban
                        </Button>
                        <Button variant="outline" className="rounded-2xl border-gray-200 font-bold h-12 px-5 text-gray-600 bg-white hover:bg-gray-50">
                            Trạng thái: Tất cả
                        </Button>
                    </div>
                </div>

                {/* 3.2 Responsive Table Sheet */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50/70 border-b border-gray-100">
                                <th className="p-5 text-[10px] font-black uppercase tracking-wider text-gray-400 pl-8">Giảng viên</th>
                                <th className="p-5 text-[10px] font-black uppercase tracking-wider text-gray-400">Mức lương gốc</th>
                                <th className="p-5 text-[10px] font-black uppercase tracking-wider text-gray-400">Số giờ dạy</th>
                                <th className="p-5 text-[10px] font-black uppercase tracking-wider text-gray-400">Khen thưởng / Khác</th>
                                <th className="p-5 text-[10px] font-black uppercase tracking-wider text-gray-400">Khấu trừ lương</th>
                                <th className="p-5 text-[10px] font-black uppercase tracking-wider text-gray-400">Thực nhận</th>
                                <th className="p-5 text-[10px] font-black uppercase tracking-wider text-gray-400">Trạng thái</th>
                                <th className="p-5 text-[10px] font-black uppercase tracking-wider text-gray-400 text-center pr-8">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {payrolls.map((p) => {
                                const totalEarn = p.base + p.bonus - p.deduct;
                                return (
                                    <tr key={p.id} className="hover:bg-gray-50/30 transition-colors group">
                                        {/* Avatar & Tên giảng viên */}
                                        <td className="p-5 pl-8">
                                            <div className="flex items-center gap-4">
                                                <div className="size-11 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center font-black text-sm shadow-md shadow-blue-600/10">
                                                    {p.name.split(" ").pop()?.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-black text-gray-900 tracking-tight group-hover:text-[var(--primary)] transition-colors">{p.name}</div>
                                                    <div className="text-xs text-gray-400 font-bold tracking-tight">{p.role} • <span className="font-mono text-[11px] text-gray-300">{p.id}</span></div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Lương cơ bản */}
                                        <td className="p-5 font-bold text-gray-700">
                                            {p.base.toLocaleString()}₫
                                        </td>

                                        {/* Số tiết */}
                                        <td className="p-5">
                                            <span className="font-black text-gray-900">{p.sessions}</span>
                                            <span className="text-xs font-medium text-gray-400 ml-1">tiết đứng lớp</span>
                                        </td>

                                        {/* Thưởng */}
                                        <td className="p-5">
                                            {p.bonus > 0 ? (
                                                <span className="font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs">
                                                    +{p.bonus.toLocaleString()}₫
                                                </span>
                                            ) : (
                                                <span className="text-gray-300 font-medium">—</span>
                                            )}
                                        </td>

                                        {/* Khấu trừ */}
                                        <td className="p-5">
                                            {p.deduct > 0 ? (
                                                <span className="font-black text-red-500 bg-red-50 px-3 py-1 rounded-full text-xs">
                                                    -{p.deduct.toLocaleString()}₫
                                                </span>
                                            ) : (
                                                <span className="text-gray-300 font-medium">—</span>
                                            )}
                                        </td>

                                        {/* Tổng thực nhận */}
                                        <td className="p-5">
                                            <div className="font-black text-gray-900 text-base tracking-tight">
                                                {totalEarn.toLocaleString()}₫
                                            </div>
                                            <span className="text-[9px] font-medium text-gray-400 block mt-0.5">Xét duyệt bởi: {p.updatedBy}</span>
                                        </td>

                                        {/* Trạng thái duyệt */}
                                        <td className="p-5">
                                            <span className={cn(
                                                "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1",
                                                p.status === "Paid"
                                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200/50"
                                                    : "bg-orange-50 text-orange-600 border border-orange-200/50"
                                            )}>
                                                <span className={cn("size-1.5 rounded-full block", p.status === "Paid" ? "bg-emerald-500" : "bg-orange-500")} />
                                                {p.status === "Paid" ? "Đã chi trả" : "Chờ phê duyệt"}
                                            </span>
                                        </td>

                                        {/* Nút hành động */}
                                        <td className="p-5 text-center pr-8">
                                            <div className="flex items-center justify-center gap-2">
                                                <Button variant="ghost" size="sm" className="rounded-xl font-black text-xs text-[var(--primary)] hover:bg-blue-50/80 h-9 px-4">
                                                    <Eye className="size-4 mr-1.5" /> Chi tiết phiếu
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* 3.3 Simple Footer Pagination */}
                <div className="p-5 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between px-8">
                    <p className="text-xs font-bold text-gray-400">Hiển thị 5 trên tổng số 24 giảng viên hệ thống</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled className="rounded-xl font-bold bg-white text-gray-400 border-gray-200 h-9">Trước</Button>
                        <Button variant="outline" size="sm" className="rounded-xl font-bold bg-white text-gray-700 border-gray-200 h-9 hover:bg-gray-50">Sau</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}