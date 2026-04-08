"use client"

import * as React from "react"

import { NavMain } from "@/components/admin/nav-main"
import { NavUser } from "@/components/admin/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { AudioLinesIcon, GalleryVerticalEndIcon, GraduationCapIcon, LayoutDashboardIcon, Sun, TerminalIcon, UsersIcon } from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: (
        <GalleryVerticalEndIcon
        />
      ),
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: (
        <AudioLinesIcon
        />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <TerminalIcon
        />
      ),
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: <LayoutDashboardIcon className="size-4" />,
    },
    {
      title: "Students",
      url: "#",
      icon: <GraduationCapIcon className="size-4" />,
      isActive: true,
      items: [
        { title: "Add New Student", url: "#" },
        { title: "Student List", url: "#" },
        { title: "Suspend Student", url: "#" },
        { title: "Student Categories", url: "#" },
        { title: "Edit Student", url: "#" },
        { title: "Student Details", url: "#" },
      ],
    },
    {
      title: "Students",
      url: "#",
      icon: <GraduationCapIcon className="size-4" />,
      isActive: true,
      items: [
        { title: "Add New Student", url: "#" },
        { title: "Student List", url: "#" },
        { title: "Suspend Student", url: "#" },
        { title: "Student Categories", url: "#" },
        { title: "Edit Student", url: "#" },
        { title: "Student Details", url: "#" },
      ],
    },
    {
      title: "Students",
      url: "#",
      icon: <GraduationCapIcon className="size-4" />,
      isActive: true,
      items: [
        { title: "Add New Student", url: "#" },
        { title: "Student List", url: "#" },
        { title: "Suspend Student", url: "#" },
        { title: "Student Categories", url: "#" },
        { title: "Edit Student", url: "#" },
        { title: "Student Details", url: "#" },
      ],
    },
    {
      title: "Students",
      url: "#",
      icon: <GraduationCapIcon className="size-4" />,
      isActive: true,
      items: [
        { title: "Add New Student", url: "#" },
        { title: "Student List", url: "#" },
        { title: "Suspend Student", url: "#" },
        { title: "Student Categories", url: "#" },
        { title: "Edit Student", url: "#" },
        { title: "Student Details", url: "#" },
      ],
    },
    {
      title: "Teachers",
      url: "#",
      icon: <UsersIcon className="size-4" />,
    }
  ],
}

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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="p-4">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
