import TeacherHeader from "@/components/teacher/teacher-header";
import { TeacherSidebar } from "@/components/teacher/teacher-sidebar";
import { Button } from "@/components/ui/button";
import {
    LogOut
} from "lucide-react";

export default function TeacherLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div data-role="teacher" className="min-h-screen bg-[var(--dashboard-bg)] flex flex-col font-sans text-[var(--foreground)]">
                {/* 1. TOP NAVIGATION BAR */}
                <TeacherHeader />

                <div className="container mx-auto px-4 md:px-8 py-10">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">

                        {/* 2. SIDEBAR - FOREST GREEN THEME */}
                        <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-[var(--sidebar-border)] p-4">
                                <TeacherSidebar />
                            </div>


                            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 font-black h-14 rounded-2xl px-6">
                                <LogOut className="mr-3 w-5 h-5" /> Đăng xuất
                            </Button>
                        </aside>

                        {/* 3. MAIN CONTENT */}
                        <main className="flex-1 space-y-8 w-full">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}
