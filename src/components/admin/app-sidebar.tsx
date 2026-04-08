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
import { BookOpenIcon, CalendarCheckIcon, CircleDollarSignIcon, ClipboardCheckIcon, LayoutDashboardIcon, SettingsIcon, ShieldCheckIcon, Sun, UserCheckIcon, UsersIcon } from "lucide-react"

// This is sample data.
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
    icon: <ShieldCheckIcon className="size-4" />, // Icon bảo mật/phân quyền
    isActive: true,
    items: [
      { title: "Tài khoản", url: "#" },
      { title: "Vai trò", url: "#" },
      { title: "Phân quyền", url: "#" },
    ],
  },
  {
    title: "Học viên",
    url: "#",
    icon: <UsersIcon className="size-4" />, // Icon nhóm người
    isActive: true,
    items: [
      { title: "Học viên", url: "#" },
      { title: "Xét duyệt bảo lưu", url: "#" },
      { title: "Xét duyệt chuyển lớp", url: "#" },
    ],
  },
  {
    title: "Giáo viên",
    url: "#",
    icon: <UserCheckIcon className="size-4" />, // Icon người có tích chọn
    isActive: true,
    items: [
      { title: "Giáo viên", url: "#" },
      { title: "Xét duyệt dời lịch", url: "#" },
      { title: "Xử lý vi phạm", url: "#" },
    ],
  },
  {
    title: "Đào tạo",
    url: "#",
    icon: <BookOpenIcon className="size-4" />, // Icon sách mở
    isActive: true,
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
    icon: <CalendarCheckIcon className="size-4" />, // Icon lịch điểm danh
    isActive: true,
    items: [
      { title: "Điểm danh học viên", url: "#" },
      { title: "Điểm danh giáo viên", url: "#" },
      { title: "Báo cáo điểm danh", url: "#" },
    ],
  },
  {
    title: "Kết quả học viên",
    url: "#",
    icon: <ClipboardCheckIcon className="size-4" />, // Icon bảng điểm/kết quả
    isActive: true
  },
  {
    title: "Tài chính",
    url: "#",
    icon: <CircleDollarSignIcon className="size-4" />, // Icon tiền tệ
    isActive: true,
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
    isActive: true,
  }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="border-r-0 shadow-xl" {...props}>
      <SidebarHeader className="h-16 flex items-center justify-start px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary-foreground shadow-lg">
            <Sun className="size-6" />
          </div>
          <span className="text-2xl font-bold tracking-tighter  text-foreground group-data-[collapsible=icon]:hidden">
            SOLAR<span className="text-secondary">N</span>
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter className="p-4">
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
