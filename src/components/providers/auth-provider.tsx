"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { Loader2 } from "lucide-react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      setReady(true);
      return;
    }
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setReady(true);
    });
    return unsub;
  }, []);

  if (!ready) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-50 gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-[var(--primary)]" />
        <p className="text-sm font-bold text-slate-500 tracking-wide animate-pulse">
          Đang đồng bộ trạng thái đăng nhập...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}