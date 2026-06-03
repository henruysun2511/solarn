"use client";

import { ChangePasswordForm } from "@/components/common/change-password-form";

export default function TeacherSecurityPage() {
  return (
    <div data-role="teacher" className="w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col gap-6 min-h-screen">
        <div>
          <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter">Bảo mật</h1>
          <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">
            Giáo viên
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-6 md:p-8">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
