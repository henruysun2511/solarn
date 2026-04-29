"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, FileQuestionIcon, HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans">
            <div className="max-w-[500px] w-full text-center space-y-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150" />
                    <div className="relative size-24 rounded-[2.5rem] bg-white border border-gray-100 shadow-2xl flex items-center justify-center mx-auto mb-12">
                        <FileQuestionIcon className="size-12 text-primary stroke-[1.5px]" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-[120px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/60 select-none">
                        404
                    </h1>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                        Không tìm thấy trang
                    </h2>
                    <p className="text-gray-500 font-medium leading-relaxed max-w-[400px] mx-auto">
                        Có vẻ như đường dẫn này đã bị hỏng hoặc không tồn tại. Đừng lo lắng, hãy thử quay lại trang trước đó.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                        className="h-14 px-8 rounded-2xl border-gray-100 bg-white font-bold text-gray-500 hover:bg-gray-50 hover:text-primary transition-all w-full sm:w-auto gap-2"
                    >
                        <ArrowLeftIcon className="size-4" />
                        Quay lại
                    </Button>

                    <Button
                        onClick={() => router.push("/")}
                        className="h-14 px-10 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/20 hover:opacity-90 transition-all w-full sm:w-auto gap-2"
                    >
                        <HomeIcon className="size-4" />
                        Về trang chủ
                    </Button>
                </div>

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 pt-12">
                    Hệ thống quản lý SOLARN &copy; 2026
                </p>
            </div>
        </div>
    );
}