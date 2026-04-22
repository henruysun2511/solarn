"use client"

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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
    AlertCircleIcon,
    EyeIcon,
    SearchIcon,
    X
} from "lucide-react";
import { useState } from "react";

// Dữ liệu mẫu theo Class Salary
const salaryData = [
    {
        salaryId: "SAL-5695", // Khớp với mẫu ảnh
        month: 1, // Tháng 1
        year: 2025,
        paymentDate: "15 Jan 2025",
        employeeName: "Jon Dan",
        phone: "+112515474",
        paymentType: "Bank",
        schoolName: "Star Learners",
        schoolAddress: "Smithbroand, Unit 4, Holler Tower, San Diego",

        // Chi tiết lương theo mẫu mới
        baseSalary: 2000,
        overtimePay: 1000,
        bonuses: 2000,
        deduction: 0,
        status: "PAID"
    },
    {
        salaryId: "SAL-5695", // Khớp với mẫu ảnh
        month: 2, // Tháng 1
        year: 2025,
        paymentDate: "15 Jan 2025",
        employeeName: "Jon Dan",
        phone: "+112515474",
        paymentType: "Bank",
        schoolName: "Star Learners",
        schoolAddress: "Smithbroand, Unit 4, Holler Tower, San Diego",
        baseSalary: 2000,
        overtimePay: 1000,
        bonuses: 2000,
        deduction: 0,
        status: "PAID"
    },
];

export default function TeacherSalaryPage() {
    const [selectedSalary, setSelectedSalary] = useState<any>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isComplaintOpen, setIsComplaintOpen] = useState(false);

    // Định dạng tiền tệ theo USD (giống mẫu ảnh)
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
    };

    // Tính toánGross và Total
    const calculateGross = (s: any) => s.baseSalary + s.overtimePay + s.bonuses;
    const calculateTotal = (s: any) => calculateGross(s) - s.deduction;

    return (
        <div className="flex flex-col gap-6 min-h-screen">
            {/* HEADER (Giữ nguyên) */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter">Lịch sử nhận lương</h1>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">
                        Hệ thống EduPro • Giáo viên
                    </p>
                </div>
            </div>

            {/* BẢNG DANH SÁCH LƯƠNG (Tối ưu nhẹ phần hành động) */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                {/* TOOLBAR (Giữ nguyên) */}
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="relative w-[300px]">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                        <Input
                            placeholder="Tìm kiếm phiếu lương..."
                            className="pl-9 h-11 rounded-xl border-gray-100 bg-white focus-visible:ring-primary"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-none bg-gray-50/50 hover:bg-gray-50/50">
                                <TableHead className="pl-8 text-[11px] font-black text-slate-400 uppercase tracking-wider py-4">Kỳ lương</TableHead>
                                <TableHead className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Mã phiếu</TableHead>
                                <TableHead className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Tổng nhận</TableHead>
                                <TableHead className="text-[11px] font-black text-slate-400 uppercase tracking-wider text-center">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {salaryData.map((item) => (
                                <TableRow key={item.salaryId} className="hover:bg-slate-50 border-slate-50">
                                    <TableCell className="pl-8 font-bold text-slate-700 py-4">
                                        {`Tháng ${item.month}/${item.year}`}
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-500 text-xs">#{item.salaryId}</TableCell>
                                    <TableCell className="text-primary font-black text-lg">
                                        {formatCurrency(calculateTotal(item))}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center gap-3">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-9 rounded-xl border-slate-200 font-bold text-xs gap-2 hover:bg-[var(--accent)] hover:text-primary transition-colors"
                                                onClick={() => { setSelectedSalary(item); setIsDetailOpen(true); }}
                                            >
                                                <EyeIcon className="size-3.5" /> Xem phiếu
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-9 rounded-xl text-amber-600 hover:text-amber-700 hover:bg-amber-50 font-bold text-xs gap-2"
                                                onClick={() => { setSelectedSalary(item); setIsComplaintOpen(true); }}
                                            >
                                                <AlertCircleIcon className="size-3.5" /> Khiếu nại
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* ========================================= */}
            {/* DIALOG 1: CHI TIẾT LƯƠNG - THEO MẪU ẢNH */}
            {/* ========================================= */}
            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent data-role="teacher" className="sm:max-w-[550px] rounded-[1rem] p-0 bg-white border border-slate-100 shadow-2xl overflow-hidden">

                    {/* Header ẩn, dùng X tự chế để khớp mẫu sạch */}
                    <DialogHeader className="p-0 absolute top-4 right-4 z-50">
                        <DialogClose className="rounded-full p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
                            <X className="size-4" />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                    </DialogHeader>

                    {selectedSalary && (
                        <div className="p-10 font-sans text-slate-700">

                            {/* 1. Phần tiêu đề Trường (Top Center) */}
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-slate-900">Bảng lương</h1>
                                <p className="text-sm text-slate-500 font-medium mt-1">Tháng 3/2026</p>
                            </div>

                            {/* 2. Phần thông tin chung (Left & Right) */}
                            <div className="flex justify-between items-start mb-8 text-sm gap-6">
                                {/* Left Info */}
                                <div className="space-y-1.5 font-medium">
                                    <p><span className="text-slate-500">Mã lương</span> : #{selectedSalary.salaryId}</p>
                                    <p><span className="text-slate-500">Giáo viên</span> : Ms.Thúy Hoài</p>
                                    <p><span className="text-slate-500">Số điện thoại</span> : {selectedSalary.phone}</p>
                                </div>
                                {/* Right Info (Payslip) */}
                                <div className="text-right space-y-1 font-medium">
                                    <p className="font-bold text-slate-900 text-base mb-2">Payslip</p>
                                    <p><span className="text-slate-500">Tháng</span>: {`Tháng 3/2026`}</p>
                                    <p><span className="text-slate-500">Ngày thanh toán</span>: {selectedSalary.paymentDate}</p>
                                </div>
                            </div>

                            <div className="space-y-3 py-4 border-t border-b border-dashed border-slate-100 my-4">
                                <div className="flex justify-between items-center text-sm">
                                    <div className="text-slate-500 font-medium">Số buổi dạy:</div>
                                    <div className="font-bold text-slate-800">24 buổi</div>
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <div className="text-slate-500 font-medium">Số giờ dạy:</div>
                                    <div className="font-bold text-slate-800">48 giờ</div>
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <div className="text-slate-500 font-medium">Buổi vắng có phép:</div>
                                    <div className="font-bold text-amber-600">01</div>
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <div className="text-slate-500 font-medium">Buổi vắng không phép:</div>
                                    <div className="font-bold text-red-500">00</div>
                                </div>
                            </div>

                            {/* 3. BẢNG CHI TIẾT LƯƠNG (Hòa tan vào nền trắng) */}
                            <div className="border border-slate-100 rounded-lg overflow-hidden mb-6">
                                <Table>
                                    <TableHeader className="bg-slate-50/50">
                                        <TableRow className="border-none">
                                            <TableHead className="font-bold text-slate-900 h-10 py-0 pl-5">Name</TableHead>
                                            <TableHead className="font-bold text-slate-900 h-10 py-0 text-right pr-5">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="text-sm">
                                        <TableRow className="border-slate-100">
                                            <TableCell className="pl-5 font-medium py-3">Lương cơ bản</TableCell>
                                            <TableCell className="text-right pr-5 font-medium py-3 text-slate-900">
                                                {formatCurrency(selectedSalary.baseSalary)}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="border-slate-100">
                                            <TableCell className="pl-5 font-medium py-3">Lương dạy thêm</TableCell>
                                            <TableCell className="text-right pr-5 font-medium py-3 text-slate-900">
                                                {formatCurrency(selectedSalary.overtimePay)}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="border-slate-100">
                                            <TableCell className="pl-5 font-medium py-3">Thưởng thêm</TableCell>
                                            <TableCell className="text-right pr-5 font-medium py-3 text-slate-900">
                                                {formatCurrency(selectedSalary.bonuses)}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="border-slate-100">
                                            <TableCell className="pl-5 font-medium py-3">Phạt</TableCell>
                                            <TableCell className="text-right pr-5 font-medium py-3 text-slate-900">
                                                {formatCurrency(calculateGross(selectedSalary))}
                                            </TableCell>
                                        </TableRow>
                                        {/* Row TOTAL đậm và nền xám nhẹ cuối cùng */}
                                        <TableRow className="border-none bg-slate-50/50 font-bold">
                                            <TableCell className="pl-5 py-4 text-slate-900">Tổng</TableCell>
                                            <TableCell className="text-right pr-5 py-4 text-slate-900 text-lg">
                                                {formatCurrency(calculateTotal(selectedSalary))}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>

                            {/* 4. Thông tin thanh toán (Bank) */}
                            <p className="text-sm font-medium text-slate-800 mb-10">
                                <span className="text-slate-500">Phương thức thanh toán</span> : {selectedSalary.paymentType}
                            </p>

                            {/* 5. Footer "Thanks" */}
                            <div className="text-center space-y-2 mt-16 border-t border-dashed border-slate-100 pt-8">
                                <h3 className="text-xl font-bold text-slate-900">Thanks</h3>
                                <p className="text-xs text-slate-500 font-medium">
                                    Nếu cần hỗ trợ, hãy liên hệ HR tại số <span className="text-slate-900">-362832880</span>
                                </p>
                            </div>

                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* DIALOG 2: KHIẾU NẠI LƯƠNG (Nền trắng, nút màu Hổ phách/Vàng) */}
            <Dialog open={isComplaintOpen} onOpenChange={setIsComplaintOpen}>
                {/* Thêm data-role="teacher" vào DialogContent hoặc bọc ngoài để CSS Variable có hiệu lực */}
                <DialogContent
                    data-role="teacher"
                    className="sm:max-w-[480px] rounded-[1.5rem] p-8 bg-white border border-slate-100 overflow-hidden"
                >
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-gray-800 flex items-center gap-3">
                            {/* Sử dụng opacity của primary thay vì màu amber cứng */}
                            <div className="p-2.5 bg-[var(--primary)]/10 rounded-xl text-[var(--primary)]">
                                <AlertCircleIcon className="size-6" />
                            </div>
                            Gửi khiếu nại lương
                        </DialogTitle>
                    </DialogHeader>

                    <div className="py-6 space-y-5">
                        <div className="space-y-2 px-1">
                            <label className="text-[11px] font-black text-slate-400 uppercase ml-2 tracking-widest">
                                Mô tả vấn đề cần khiếu nại
                            </label>
                            <Textarea
                                placeholder="Vui lòng cho biết chi tiết vấn đề..."
                                className="min-h-[150px] rounded-2xl border-slate-200 focus-visible:ring-[var(--primary)] font-medium p-4"
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-3 sm:gap-0 bg-white pt-2">
                        <Button
                            variant="ghost"
                            className="flex-1 h-12 rounded-xl font-bold text-slate-500"
                            onClick={() => setIsComplaintOpen(false)}
                        >
                            Hủy
                        </Button>
                        {/* Nút bấm chính sử dụng bg-primary và shadow theo màu primary */}
                        <Button className="flex-1 h-12 rounded-xl font-black bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20 hover:opacity-90 transition-all">
                            Gửi yêu cầu
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}