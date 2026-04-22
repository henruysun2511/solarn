import AdminHeader from "@/components/admin/admin-header";
import { AppSidebar } from "@/components/admin/app-sidebar";
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="bg-black text-foreground selection:bg-primary/20">
      <AppSidebar />
      <SidebarInset className="bg-white">
        {/* <header className="bg-white sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-background/80 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 hover:bg-secondary hover:text-secondary-foreground transition-colors" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto bg-border"
            />

          </div>
        </header> */}
        <AdminHeader />
        <main className="flex-1 w-full p-4 md:p-6 lg:p-8 bg-[#f5f6f8]">
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
