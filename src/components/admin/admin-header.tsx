"use client"

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLogout } from "@/queries/useAuthQuery";
import { NotificationDropdown } from "@/components/common/notification-dropdown";
import { UserAvatar } from "@/components/common/user-avatar";
import { useAuthStore } from "@/stores/useAuthStore";
import { LogOut, Settings, User } from "lucide-react";

export default function AdminHeader() {
    const logoutMutation = useLogout();
    const { user } = useAuthStore();
    return (
        <header className="bg-white sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-background/80 backdrop-blur-md shadow-sm">
            {/* LEFT SIDE */}
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1 hover:bg-secondary hover:text-secondary-foreground transition-colors" />
                <Separator
                    orientation="vertical"
                    className="mr-2 h-4 bg-border"
                />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3 px-4">

                {/* NÚT THÔNG BÁO */}
                <NotificationDropdown />

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* USER PROFILE DROPDOWN */}

                <Button variant="ghost" className="relative h-10 flex items-center gap-3 pl-1 pr-2 rounded-full hover:bg-slate-100">
                    <div className="size-8 rounded-full border border-slate-200 overflow-hidden">
                        <UserAvatar
                            fullName={user?.username}
                            className="size-full"
                        />
                    </div>
                    <div className="hidden lg:flex flex-col items-start text-left leading-none">
                        <span className="text-sm font-bold text-slate-700">{user?.username || "Admin"}</span>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">{user?.roleName || "Admin"}</span>
                    </div>
                </Button>
            </div>
        </header>
    );
}