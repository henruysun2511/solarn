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
import { LogoutButton } from "../auth/logout-button"

export const navMain = [
  {
    title: "Tổng quan",
    url: "#",
    icon: <LayoutDashboardIcon className="size-4" />,
    isActive: true,
    items: [
      { title: "Giám sát phòng học", url: "/admin/dashboard/monitor" },
      { title: "Báo cáo tổng quan", url: "/admin/dashboard/overview" },
      { title: "Báo cáo tài chính", url: "/admin/dashboard/finance" },
      { title: "Báo cáo đào tạo", url: "/admin/dashboard/training" },
      { title: "Báo cáo yêu cầu", url: "/admin/dashboard/request" },
    ],
  },
  {
    title: "Tài khoản",
    url: "#",
    icon: <ShieldCheckIcon className="size-4" />,
    isActive: false,
    items: [
      { title: "Tài khoản", url: "/admin/account" },
      { title: "Vai trò", url: "/admin/role" },
    ],
  },
  {
    title: "Học viên",
    url: "#",
    icon: <UsersIcon className="size-4" />,
    isActive: false,
    items: [
      { title: "Học viên", url: "/admin/student" },
      { title: "Xét duyệt bảo lưu", url: "/admin/leave" },
      { title: "Xét duyệt tái nhập học", url: "/admin/re-enrollment" },
      { title: "Xét duyệt chuyển lớp", url: "/admin/transfer" },
    ],
  },
  {
    title: "Giáo viên",
    url: "#",
    icon: <UserCheckIcon className="size-4" />,
    isActive: false,
    items: [
      { title: "Giáo viên", url: "/admin/teacher" },
      { title: "Xét duyệt dời lịch", url: "/admin/schedule-change" },
      { title: "Xử lý vi phạm", url: "/admin/violation" },
    ],
  },
  {
    title: "Đào tạo",
    url: "#",
    icon: <BookOpenIcon className="size-4" />,
    isActive: false,
    items: [
      { title: "Đăng ký khóa học", url: "/admin/enrollment" },
      { title: "Khóa học", url: "/admin/course" },
      { title: "Tài nguyên khóa học", url: "/admin/course-resource" },
      { title: "Lịch học", url: "/admin/schedule-session" },
      { title: "Mẫu lịch học", url: "/admin/schedule-template" },
      { title: "Ca học", url: "/admin/study-shift" },
      { title: "Phòng học", url: "/admin/room" },
      { title: "Chi nhánh", url: "/admin/branch" },
      { title: "Báo cáo đánh giá", url: "/admin/feedback" },
    ],
  },
  {
    title: "Điểm danh học viên",
    url: "/admin/attendance",
    icon: <CalendarCheckIcon className="size-4" />,
    isActive: false
  },
  {
    title: "Kết quả học viên",
    url: "/admin/assignment-result",
    icon: <ClipboardCheckIcon className="size-4" />,
    isActive: false
  },
  {
    title: "Tài chính",
    url: "#",
    icon: <CircleDollarSignIcon className="size-4" />, // Icon tiền tệ
    isActive: false,
    items: [
      { title: "Thu phí học viên", url: "/admin/invoice" },
      { title: "Trả lương giáo viên", url: "/admin/salary" },
      { title: "Khiếu nại lương", url: "/admin/salary-complaint" },
    ],
  },
  {
    title: "Cài đặt website",
    url: "/admin/setting",
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
        {/* <Button
          variant="ghost"
          className="w-full h-12 justify-start px-4 rounded-2xl font-black text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all group overflow-hidden relative"
        >
          <div className="relative z-10 flex items-center">
            <LogOut className="mr-3 size-5 transition-transform group-hover:-translate-x-1" />
            <span className="uppercase tracking-widest text-[11px]">Đăng xuất</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button> */}
        <LogoutButton className="w-full h-12 justify-start px-4 rounded-2xl font-black text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all group overflow-hidden relative" />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
