"use client";

import { ChangePasswordForm } from "@/components/common/change-password-form";

export default function StudentSecurityPage() {
  return (
    <div className="space-y-8 pb-10">
      <h3 className="text-2xl font-black text-[var(--foreground)] tracking-tight flex items-center gap-3 px-2">
        <div className="w-2 h-8 bg-[var(--primary)] rounded-full" />
        Bảo mật
      </h3>

      <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-[var(--sidebar-border)]">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
