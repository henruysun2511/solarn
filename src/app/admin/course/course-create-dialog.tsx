"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
import { BookOpenIcon, PlusIcon } from "lucide-react";

export function CourseCreateDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-primary text-white px-6 h-11 rounded-md font-semibold gap-2 shadow-sm">
                    <PlusIcon className="size-4" />
                    Add Course
                </Button>
            </DialogTrigger>

            {/* Đổi nền Dialog thành trắng tinh và border mảnh */}
            <DialogContent data-role="admin" className="sm:max-w-[600px] rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans">

                {/* Header trắng tinh */}
                <DialogHeader className="p-8 bg-white border-b border-gray-50">
                    <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
                        <BookOpenIcon className="size-6 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl font-black tracking-tighter text-gray-900">
                        Tạo khóa học mới
                    </DialogTitle>
                    <DialogDescription className="text-gray-400 font-medium">
                        Cung cấp thông tin chi tiết để thiết lập lộ trình học mới.
                    </DialogDescription>
                </DialogHeader>

                <div className="p-8 grid grid-cols-2 gap-6 bg-white">
                    {/* Tên khóa học */}
                    <div className="col-span-2 space-y-2">
                        <Label htmlFor="courseName" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                            Tên khóa học
                        </Label>
                        <Input
                            id="courseName"
                            placeholder="Vd: IELTS Intensive 6.5+"
                            className="h-12 rounded-xl border-gray-200 bg-white focus-visible:ring-primary/10"
                        />
                    </div>

                    {/* Mã khóa học */}
                    <div className="space-y-2">
                        <Label htmlFor="courseId" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                            Mã khóa học
                        </Label>
                        <Input
                            id="courseId"
                            placeholder="ENG-IELTS-01"
                            className="h-12 rounded-xl border-gray-200 bg-white"
                        />
                    </div>

                    {/* Cấp độ */}
                    <div className="space-y-2">
                        <Label htmlFor="level" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                            Cấp độ
                        </Label>
                        <Select>
                            <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white">
                                <SelectValue placeholder="Chọn cấp độ" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-gray-100 bg-white">
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Học phí */}
                    <div className="space-y-2">
                        <Label htmlFor="fee" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                            Học phí (VND)
                        </Label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">đ</span>
                            <Input
                                id="fee"
                                type="number"
                                placeholder="5,000,000"
                                className="h-12 pl-9 rounded-xl border-gray-200 bg-white"
                            />
                        </div>
                    </div>

                    {/* Số tiết */}
                    <div className="space-y-2">
                        <Label htmlFor="sessions" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                            Số tiết học
                        </Label>
                        <Input
                            id="sessions"
                            type="number"
                            placeholder="24"
                            className="h-12 rounded-xl border-gray-200 bg-white"
                        />
                    </div>
                </div>

                {/* Footer trắng tinh, chỉ ngăn cách bởi đường kẻ siêu mảnh */}
                <DialogFooter className="p-8 bg-white border-t border-gray-50 flex gap-3">
                    <Button variant="ghost" className="h-12 px-6 rounded-xl font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                        Hủy bỏ
                    </Button>
                    <Button className="h-12 px-10 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                        Lưu khóa học
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}