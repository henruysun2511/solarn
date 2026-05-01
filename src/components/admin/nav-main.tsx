"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { cn } from "@/utils/cn"
import { ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
    isActive?: boolean
    items?: {
      title: string
      url: string
      isActive?: boolean
    }[]
  }[]
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarMenu className="gap-1 text-white">
        {items.map((item) => {
          const hasSubItems = item.items && item.items.length > 0

          return (
            <SidebarMenuItem key={item.title} className="w-full">
              {hasSubItems ? (
                <Collapsible asChild defaultOpen={item.isActive} className="group/collapsible">
                  <div className="flex flex-col">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className="
                          h-11 px-4 gap-3 transition-all duration-300 hover:bg-sidebar-accent hover:text-secondary
                          group-data-[state=open]/collapsible:bg-secondary 
                          group-data-[state=open]/collapsible:text-secondary-foreground 
                          group-data-[state=open]/collapsible:shadow-md 
                          group-data-[collapsible=icon]:px-0
                          group-data-[collapsible=icon]:justify-center
                        "
                      >
                        <div className="flex size-5 items-center justify-center shrink-0 group-data-[collapsible=icon]:mx-auto">
                          {item.icon}
                        </div>
                        <span className="font-semibold text-[15px] truncate group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                        <ChevronRightIcon className="ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub className="relative ml-8 border-l-2 border-sidebar-border/50 pl-2 mt-1 space-y-1 group-data-[collapsible=icon]:hidden">
                        {item.items?.map((subItem: any) => {
                          // Kiểm tra trạng thái active tại đây
                          const isSubActive = pathname === subItem.url;

                          return (
                            <SidebarMenuSubItem key={subItem.title} className="relative group/sub">
                              {/* Dấu chấm: Chuyển màu dựa trên biến isSubActive */}
                              <div className={cn(
                                "submenu-dot absolute -left-[13px] top-1/2 -translate-y-1/2 size-1.5 rounded-full transition-all",
                                isSubActive
                                  ? "bg-secondary scale-125 shadow-[0_0_8px_rgba(var(--secondary),0.5)]"
                                  : "bg-white/20 group-hover/sub:bg-white/50"
                              )} />

                              <SidebarMenuSubButton asChild isActive={isSubActive}>
                                <Link
                                  href={subItem.url}
                                  className={cn(
                                    "h-9 text-[14px] font-medium transition-colors flex items-center",
                                    isSubActive
                                      ? "text-secondary font-bold"
                                      : "text-white/70 hover:text-secondary"
                                  )}
                                >
                                  {subItem.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="h-11 px-4 gap-3 hover:bg-sidebar-accent hover:text-secondary transition-all font-semibold text-[15px] group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center"
                >
                  <Link href={item.url} className="flex items-center w-full group-data-[collapsible=icon]:justify-center">
                    <div className="flex size-5 items-center justify-center shrink-0 group-data-[collapsible=icon]:mx-auto">
                      {item.icon}
                    </div>
                    <span className="truncate group-data-[collapsible=icon]:hidden">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}