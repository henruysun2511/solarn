"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import authService from "@/services/auth.service";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setAuth, logout, accessToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      // Lấy token từ cookie hoặc từ zustand store để kiểm tra trạng thái
      const tokenInCookie = Cookies.get("accessToken");

      if (!tokenInCookie && !accessToken) {
        // Không có trạng thái đăng nhập nào trước đó, bỏ qua việc refresh
        setIsLoading(false);
        return;
      }

      try {
        // Thực hiện gọi API refresh token lên Server
        const response = await authService.refreshToken();

        // Bóc tách dữ liệu mới từ cấu trúc ApiResponse của bạn
        const { accessToken: newAccessToken, roleName, username } = response.data.data;
        const user = { roleName, username, accessToken: newAccessToken };

        // Cập nhật lại toàn bộ thông tin vào Zustand & Cookie
        setAuth(user, newAccessToken);
      } catch (error) {
        console.error("Auto Refresh Token Failed:", error);
        // Nếu refresh lỗi (token hết hạn hẳn hoặc fake token), thực hiện logout để xóa sạch trạng thái sạch sẽ
        logout();
      } finally {
        // Kết thúc quá trình kiểm tra trạng thái ban đầu
        setIsLoading(false);
      }
    };

    bootstrapAuth();
  }, [setAuth, logout, accessToken]);

  // Trong lúc đang load kiểm tra token, hiển thị màn hình chờ (Splash Screen) 
  // để tránh việc giao diện nhảy từ "Chưa đăng nhập" sang "Đã đăng nhập"
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-50 gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-[var(--primary)]" />
        <p className="text-sm font-bold text-slate-500 tracking-wide animate-pulse">
          Đang đồng bộ trạng thái đăng nhập...
          {/*  */}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}