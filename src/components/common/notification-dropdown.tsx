"use client";

import { useGetMyNotifications } from "@/queries/useNotificationQuery";
import { Bell, FileText, CalendarClock, DollarSign, Info } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  REQUEST: <FileText className="size-4 text-amber-500" />,
  SCHEDULE: <CalendarClock className="size-4 text-blue-500" />,
  PAYMENT: <DollarSign className="size-4 text-emerald-500" />,
  SYSTEM: <Info className="size-4 text-purple-500" />,
};

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { data: res } = useGetMyNotifications();
  const notifications = (res as any)?.data || res || [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative size-12 rounded-2xl hover:bg-[var(--accent)] hover:text-[var(--primary)] transition-all group flex items-center justify-center"
      >
        <Bell className="size-5.5 text-slate-700 group-hover:scale-110 transition-transform" />
        {notifications.length > 0 && (
          <span className="absolute top-3 right-3 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[9px] font-black rounded-full border-2 border-white shadow-sm px-1">
            {notifications.length > 9 ? "9+" : notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[380px] bg-white rounded-[1.5rem] shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="px-5 py-4 border-b border-gray-50">
            <p className="text-sm font-black text-gray-900">Thông báo</p>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <Bell className="size-8 text-gray-200 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-400">Chưa có thông báo nào</p>
              </div>
            ) : (
              notifications.map((n: any, idx: number) => (
                <div
                  key={n.notificationId || idx}
                  className="px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="size-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
                      {TYPE_ICONS[n.type] || <Info className="size-4 text-gray-400" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900 truncate">{n.title}</p>
                      <p className="text-xs font-medium text-gray-400 line-clamp-2 mt-0.5">{n.content}</p>
                      <p className="text-[10px] font-bold text-gray-300 mt-1">
                        {new Date(n.createdAt).toLocaleDateString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
