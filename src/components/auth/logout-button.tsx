"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/queries/useAuthQuery";
import { handleError } from "@/utils/handleError";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export function LogoutButton({ className }: { className?: string }) {
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync(undefined, {
      onSuccess: (response) => {
        toast.success(response?.data?.message || "Đăng xuất thành công!");
      },
    });
  };

  return (
    <Button
      variant="ghost"
      className={className}
      disabled={logoutMutation.isPending}
      onClick={handleLogout}
    >
      <div className="relative z-10 flex items-center">
        <LogOut className="mr-3 size-5 transition-transform group-hover:-translate-x-1" />
        <span className="uppercase tracking-widest text-[11px]">Đăng xuất</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Button>

  );
}
