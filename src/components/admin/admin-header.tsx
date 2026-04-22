"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, LogOut, Search, Settings, User } from "lucide-react";

export default function AdminHeader() {
    return (
        <header className="bg-white sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-background/80 backdrop-blur-md shadow-sm">
            {/* LEFT SIDE */}
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1 hover:bg-secondary hover:text-secondary-foreground transition-colors" />
                <Separator
                    orientation="vertical"
                    className="mr-2 h-4 bg-border"
                />

                {/* THANH TÌM KIẾM NHANH */}
                <div className="relative hidden md:flex items-center">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Search anything..."
                        className="pl-9 h-9 w-[200px] lg:w-[300px] bg-slate-50/50 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20"
                    />
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3 px-4">

                {/* NÚT THÔNG BÁO */}
                <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-slate-100">
                    <Bell className="size-5 text-slate-600" />
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white" />
                </Button>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* USER PROFILE DROPDOWN */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 flex items-center gap-3 pl-1 pr-2 rounded-full hover:bg-slate-100">
                            <Avatar className="size-8 border border-slate-200">
                                <AvatarImage src="https://i.pinimg.com/1200x/3f/ea/79/3fea79470b4f04c4dc85663380182dd9.jpg" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                            <div className="hidden lg:flex flex-col items-start text-left leading-none">
                                <span className="text-sm font-bold text-slate-700">Admin User</span>
                                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">Super Admin</span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 rounded-2xl p-2 mt-2" align="end">
                        <DropdownMenuLabel className="font-black text-xs uppercase text-slate-400 px-3 py-2">Tài khoản của tôi</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="rounded-xl cursor-pointer py-2.5">
                                <User className="mr-2 size-4" /> Profille
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl cursor-pointer py-2.5">
                                <Settings className="mr-2 size-4" /> Cài đặt
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="rounded-xl cursor-pointer py-2.5 text-red-600 focus:bg-red-50 focus:text-red-600">
                            <LogOut className="mr-2 size-4" /> Đăng xuất
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}