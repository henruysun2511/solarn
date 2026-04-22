"use client"

import * as React from "react"

import { NavMain } from "@/components/admin/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { AtomIcon, BookOpenIcon, CalendarCheckIcon, CircleDollarSignIcon, ClipboardCheckIcon, LayoutDashboardIcon, LogOut, SettingsIcon, ShieldCheckIcon, UserCheckIcon, UsersIcon } from "lucide-react"
import { Logo } from "../common/logo"
import { Button } from "../ui/button"

export const navMain = [
  {
    title: "Tổng quan",
    url: "#",
    icon: <LayoutDashboardIcon className="size-4" />,
    isActive: true,
    items: [
      { title: "Báo cáo tổng quan", url: "#" },
      { title: "Báo cáo tư vấn", url: "#" },
      { title: "Báo cáo tài chính", url: "#" },
      { title: "Báo cáo đào tạo", url: "#" },
    ],
  },
  {
    title: "Tài khoản",
    url: "#",
    icon: <ShieldCheckIcon className="size-4" />,
    isActive: false,
    items: [
      { title: "Tài khoản", url: "#" },
      { title: "Vai trò", url: "#" },
      { title: "Phân quyền", url: "#" },
    ],
  },
  {
    title: "Học viên",
    url: "#",
    icon: <UsersIcon className="size-4" />,
    isActive: false,
    items: [
      { title: "Học viên", url: "#" },
      { title: "Xét duyệt bảo lưu", url: "#" },
      { title: "Xét duyệt chuyển lớp", url: "#" },
    ],
  },
  {
    title: "Giáo viên",
    url: "#",
    icon: <UserCheckIcon className="size-4" />,
    isActive: false,
    items: [
      { title: "Giáo viên", url: "#" },
      { title: "Xét duyệt dời lịch", url: "#" },
      { title: "Xử lý vi phạm", url: "#" },
    ],
  },
  {
    title: "Đào tạo",
    url: "#",
    icon: <BookOpenIcon className="size-4" />,
    isActive: false,
    items: [
      { title: "Đăng ký khóa học", url: "#" },
      { title: "Khóa học", url: "#" },
      { title: "Tài nguyên khóa học", url: "#" },
      { title: "Loại khóa học", url: "#" },
      { title: "Lịch học", url: "#" },
      { title: "Ca học", url: "#" },
      { title: "Phòng học", url: "#" },
      { title: "Báo cáo đánh giá", url: "#" },
    ],
  },
  {
    title: "Điểm danh",
    url: "#",
    icon: <CalendarCheckIcon className="size-4" />,
    isActive: false,
    items: [
      { title: "Điểm danh học viên", url: "#" },
      { title: "Điểm danh giáo viên", url: "#" },
      { title: "Báo cáo điểm danh", url: "#" },
    ],
  },
  {
    title: "Kết quả học viên",
    url: "#",
    icon: <ClipboardCheckIcon className="size-4" />,
    isActive: false
  },
  {
    title: "Tài chính",
    url: "#",
    icon: <CircleDollarSignIcon className="size-4" />, // Icon tiền tệ
    isActive: false,
    items: [
      { title: "Học phí", url: "#" },
      { title: "Thu phí học viên", url: "#" },
      { title: "Trả lương giáo viên", url: "#" },
      { title: "Khiếu nại lương", url: "#" },
    ],
  },
  {
    title: "Cài đặt website",
    url: "#",
    icon: <SettingsIcon className="size-4" />, // Icon bánh răng cài đặt
    isActive: false,
  }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar data-role="admin" collapsible="icon" className="border-r-0 shadow-xl" {...props}>
      <SidebarHeader className="h-16 flex items-center justify-start px-6">
        <Logo icon={<AtomIcon />} brandText="Astromi" highlightText="Nor" iconBgColor="var(--secondary)" />
      </SidebarHeader>
      <SidebarContent className="px-2">
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter className="p-4 pt-0">
        <Button
          variant="ghost"
          className="w-full h-12 justify-start px-4 rounded-2xl font-black text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all group overflow-hidden relative"
        >
          <div className="relative z-10 flex items-center">
            <LogOut className="mr-3 size-5 transition-transform group-hover:-translate-x-1" />
            <span className="uppercase tracking-widest text-[11px]">Đăng xuất</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
