"use client";

import { cn } from "@/utils/cn";

interface LoadingProps {
  message?: string;
  fullscreen?: boolean;
  className?: string;
}

export function Loading({
  message = "Đang tải dữ liệu...",
  fullscreen = false,
  className,
}: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center font-sans",
        fullscreen
          ? "fixed inset-0 bg-[#F8FAFC]/80 backdrop-blur-md z-50 w-screen h-screen"
          : "w-full min-h-[300px] p-8",
        className
      )}
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Multiorbital Loading Ring */}
        <div className="relative size-16">
          {/* Inner orbit */}
          <div className="absolute inset-2 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
          {/* Outer orbit */}
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-l-primary/60 border-r-primary/60 animate-[spin_1.8s_ease-in-out_infinite]" />
          {/* Pulsing Core */}
          <div className="absolute inset-[18px] rounded-full bg-primary/10 animate-pulse" />
        </div>

        {/* Text and Pulse Bar */}
        <div className="text-center space-y-2">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-800 animate-pulse">
            {message}
          </p>
          <div className="w-24 h-0.5 bg-gray-100 rounded-full mx-auto overflow-hidden relative">
            <div
              className="absolute top-0 bottom-0 left-0 w-1/2 bg-primary rounded-full"
              style={{ animation: "loading-bar 1.5s infinite ease-in-out" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
