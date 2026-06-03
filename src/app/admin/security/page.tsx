"use client";

import { ChangePasswordForm } from "@/components/common/change-password-form";
import { AdminPageTitle } from "@/components/admin/admin-page-title";

export default function AdminSecurityPage() {
  return (
    <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
      <AdminPageTitle title="Bảo mật" subtitle="Hệ thống" />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-6 md:p-8">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
