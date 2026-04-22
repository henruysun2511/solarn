"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Globe,
  LockIcon,
  MailIcon
} from "lucide-react";

export default function AuthLoginPage() {
  return (
    // Sử dụng data-role="student" để lấy màu Royal Blue
    <div data-role="student" className="min-h-screen flex font-sans bg-white">

      {/* PHẦN BÊN TRÁI: CHIẾM 60% MÀN HÌNH */}
      <div className="hidden lg:flex lg:w-[60%] bg-[var(--primary)] relative flex-col items-center justify-center p-12 text-white overflow-hidden">
        {/* Họa tiết trang trí */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-orange-400 rounded-full opacity-60 animate-bounce" />
        <div className="absolute bottom-20 right-10 w-6 h-6 bg-pink-400 rounded-full opacity-60 rotate-45" />
        <div className="absolute top-1/4 right-20 w-3 h-8 bg-green-400 rounded-full opacity-40 -rotate-12" />

        <div className="relative z-10 flex flex-col items-center text-center">

          {/* Minh họa */}
          <div className="relative mb-12">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-[3rem] border border-white/20 shadow-2xl scale-125">
              <div className="size-20 bg-[var(--secondary)] rounded-3xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                <Globe className="size-10 text-white" />
              </div>
              <div className="h-2 w-32 bg-white/40 rounded-full mx-auto mb-2" />
              <div className="h-2 w-20 bg-white/20 rounded-full mx-auto" />
            </div>

            {/* Thẻ phụ */}
            <div className="absolute -bottom-8 -right-16 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-pulse">
              <div className="size-10 bg-secondary rounded-xl flex items-center justify-center">
                SEG
              </div>
              <div className="text-left">
                <div className="h-2 w-16 bg-gray-200 rounded-full mb-1.5" />
                <div className="h-2 w-10 bg-gray-100 rounded-full" />
              </div>
            </div>
          </div>

          {/* STORY */}
          <h2 className="text-4xl font-black tracking-tighter mb-6 leading-tight">
            Khởi đầu từ <br /> <span className="text-white">Earth Center</span>
          </h2>

          <p className="text-white/80 text-base max-w-md font-medium leading-relaxed">
            Mỗi hành trình chinh phục tiếng Anh đều bắt đầu từ Trái Đất.
            Tại Earth Center, bạn không chỉ là một học viên — bạn là một
            <span className="font-bold text-white"> phi hành gia </span>
            sẵn sàng khám phá những thiên hà tri thức mới.
            <br /><br />
            Những
            <span className="font-bold text-white"> tàu du hành (MentorShips) </span>
            sẽ dẫn dắt bạn qua từng quỹ đạo học tập, giúp bạn tăng tốc, bứt phá và
            chạm tới mục tiêu của riêng mình.
          </p>

          {/* DOTS */}
          <div className="flex gap-2 mt-10">
            <div className="size-2 bg-white/30 rounded-full" />
            <div className="size-2 bg-white/30 rounded-full" />
            <div className="w-6 h-2 bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* PHẦN BÊN PHẢI: FORM ĐĂNG NHẬP (40%) */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 sm:p-16">
        <div className="w-full max-w-[380px] flex flex-col items-center">

          {/* Logo Trung tâm */}
          <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 shadow-sm">
            <Globe className="size-8 text-[var(--primary)]" />
          </div>

          <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter mb-2">
            Chào bạn quay lại!
          </h1>
          <p className="text-gray-400 text-sm font-medium mb-10 text-center">
            Vui lòng nhập thông tin chi tiết của bạn để tiếp tục học tập.
          </p>

          <form className="w-full space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Email */}
            <div className="relative group">
              <MailIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-300 group-focus-within:text-[var(--primary)] transition-colors" />
              <Input
                id="email"
                type="email"
                placeholder="Email của bạn"
                className="h-13 pr-12 rounded-xl border-none bg-gray-50 focus-visible:ring-2 focus-visible:ring-[var(--primary)/20] font-medium placeholder:text-gray-300"
              />
            </div>

            {/* Mật khẩu */}
            <div className="relative group">
              <LockIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-300 group-focus-within:text-[var(--primary)] transition-colors" />
              <Input
                id="password"
                type="password"
                placeholder="Mật khẩu"
                className="h-13 pr-12 rounded-xl border-none bg-gray-50 focus-visible:ring-2 focus-visible:ring-[var(--primary)/20] font-medium placeholder:text-gray-300"
              />
            </div>

            {/* Ghi nhớ & Quên mật khẩu */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="rounded border-gray-200 data-[state=checked]:bg-[var(--primary)]" />
                <label htmlFor="remember" className="text-[11px] font-bold text-gray-400 cursor-pointer select-none">
                  Ghi nhớ tôi
                </label>
              </div>
              <a href="#" className="text-[11px] font-black text-[var(--primary)] hover:underline tracking-tight">
                Quên mật khẩu?
              </a>
            </div>

            {/* Nút Đăng nhập */}
            <Button className="w-full h-13 rounded-xl bg-[var(--primary)] text-white font-black text-sm shadow-xl shadow-blue-100 hover:opacity-90 active:scale-[0.98] transition-all">
              Đăng nhập
            </Button>

            {/* Ngăn cách */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-gray-300">
                <span className="bg-white px-4">Hoặc</span>
              </div>
            </div>

            {/* Đăng nhập Google */}
            <Button
              variant="outline"
              className="w-full h-13 rounded-xl bg-white border-gray-100 font-bold text-xs gap-3 hover:bg-gray-50 transition-all shadow-sm"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="size-4"
              />
              Tiếp tục với Google
            </Button>
          </form>

          {/* Đăng ký */}
          <p className="mt-12 text-xs font-bold text-gray-400">
            Bạn chưa có tài khoản?{" "}
            <a href="#" className="text-[var(--primary)] hover:underline font-black">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}