"use client"

import { useAuthStore } from "@/stores/useAuthStore";
import { useGetAdminDashboard } from "@/queries/useDashboardQuery";
import { Shield, Users, GraduationCap, BookOpen, DollarSign, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/common/loading";
import { UserAvatar } from "@/components/common/user-avatar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from "recharts";

export default function AdminDashboard() {
    const { user } = useAuthStore();
    const { data: dashRes, isLoading: dashLoading } = useGetAdminDashboard();

    const dash = dashRes?.data;

    const fullName = user?.username || "Admin";

    const revenueChartData = dash?.monthlyRevenue?.map((item: any) => ({
        name: item.month,
        total: item.revenue,
    })) || [];

    const enrollmentChartData = dash?.monthlyRevenue?.map((item: any) => ({
        month: item.month,
        students: item.enrollments,
    })) || [];

    if (dashLoading) {
        return <Loading message="Đang tải dữ liệu..." />;
    }

    return (
        <div data-role="admin" className="flex flex-col gap-8 min-h-screen">
            {/* ADMIN PROFILE */}
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="flex flex-col xl:flex-row items-center xl:items-start gap-8 relative z-10">
                    <div className="relative">
                        <div className="size-36 md:size-44 rounded-full bg-[var(--accent)] border-4 border-[var(--primary)]/10 overflow-hidden shadow-2xl">
                            <UserAvatar
                                fullName={fullName}
                                className="size-36 md:size-44 w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex-1 space-y-6 w-full text-center xl:text-left">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                            <div className="space-y-2">
                                <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
                                    {fullName}
                                </h1>
                                <div className="flex flex-wrap justify-center xl:justify-start gap-3">
                                    <Badge className="bg-[var(--accent)] text-[var(--primary)] border-none font-black rounded-full px-4 py-1">
                                        Quản trị viên
                                    </Badge>
                                    <Badge className="bg-purple-100 text-purple-700 border-none font-black rounded-full px-4 py-1">
                                        <Shield className="size-3 mr-1" />
                                        ADMIN
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <InfoItem icon={Shield} label="Tên đăng nhập" value={user?.username || "---"} />
                            <InfoItem icon={Shield} label="Vai trò" value={user?.roleName || "---"} />
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[var(--accent)] rounded-full blur-3xl opacity-40" />
            </div>

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">Overview</p>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">Dashboard</h1>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl border-gray-200 font-bold h-11">Download Report</Button>
                    <Button className="bg-primary text-white px-6 h-11 rounded-xl font-bold shadow-lg shadow-primary/20">Manage System</Button>
                </div>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Tổng Học Viên"
                    value={dash?.totalStudents?.toLocaleString() || "0"}
                    change={dash?.studentGrowth != null ? `${dash.studentGrowth >= 0 ? "+" : ""}${dash.studentGrowth}%` : "0%"}
                    isUp={(dash?.studentGrowth ?? 0) >= 0}
                    icon={<Users className="size-5 text-blue-500" />}
                    color="bg-blue-50"
                />
                <StatCard
                    title="Giáo Viên"
                    value={dash?.totalTeachers?.toLocaleString() || "0"}
                    change={dash?.newStudentsThisMonth != null ? `+${dash.newStudentsThisMonth} mới` : "0"}
                    isUp={true}
                    icon={<GraduationCap className="size-5 text-purple-500" />}
                    color="bg-purple-50"
                />
                <StatCard
                    title="Khóa Học"
                    value={dash?.totalCourses?.toLocaleString() || "0"}
                    change={`${dash?.activeClasses || 0} lớp đang mở`}
                    isUp={true}
                    icon={<BookOpen className="size-5 text-orange-500" />}
                    color="bg-orange-50"
                />
                <StatCard
                    title="Doanh Thu"
                    value={dash?.totalRevenue ? `${(dash.totalRevenue / 1000000).toFixed(1)}M` : "0"}
                    change={dash?.revenueGrowth != null ? `${dash.revenueGrowth >= 0 ? "+" : ""}${dash.revenueGrowth}%` : "0%"}
                    isUp={(dash?.revenueGrowth ?? 0) >= 0}
                    icon={<DollarSign className="size-5 text-emerald-500" />}
                    color="bg-emerald-50"
                />
            </div>

            {/* CHARTS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                <Card className="lg:col-span-4 rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between p-8 border-b border-gray-50">
                        <div>
                            <CardTitle className="text-xl font-black tracking-tighter">Doanh thu theo tháng</CardTitle>
                            <CardDescription className="font-medium">Thống kê theo đơn vị VND</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueChartData.length > 0 ? revenueChartData : [{ name: "Chưa có dữ liệu", total: 0 }]}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                        tickFormatter={(value) => `${value / 1000000}M`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="total" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3 rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-gray-50">
                        <CardTitle className="text-xl font-black tracking-tighter">Lượng ghi danh</CardTitle>
                        <CardDescription className="font-medium">Số học viên đăng ký theo tháng</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={enrollmentChartData.length > 0 ? enrollmentChartData : [{ month: "Chưa có dữ liệu", students: 0 }]}>
                                    <defs>
                                        <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="students"
                                        stroke="var(--primary)"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorStudents)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* TOP COURSES + RECENT ENROLLMENTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-gray-50">
                        <CardTitle className="text-xl font-black tracking-tighter">Khóa học hàng đầu</CardTitle>
                        <CardDescription className="font-medium">Theo số lượng học viên</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        {(dash?.topCourses?.length ?? 0) > 0 ? (
                            <div className="space-y-4">
                                {dash.topCourses.map((course: any, idx: number) => (
                                    <div key={course.courseId || idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-sm text-primary">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900">{course.courseName}</p>
                                                <p className="text-xs font-bold text-gray-400">{course.totalStudents} học viên</p>
                                            </div>
                                        </div>
                                        <p className="font-black text-primary">{course.totalRevenue ? `${(course.totalRevenue / 1000000).toFixed(1)}M` : "---"}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center py-8 text-gray-400 font-bold">Chưa có dữ liệu</p>
                        )}
                    </CardContent>
                </Card>

                <Card className="rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-gray-50">
                        <CardTitle className="text-xl font-black tracking-tighter">Ghi danh gần đây</CardTitle>
                        <CardDescription className="font-medium">Danh sách học viên mới</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        {(dash?.recentEnrollments?.length ?? 0) > 0 ? (
                            <div className="space-y-4">
                                {dash.recentEnrollments.map((enr: any, idx: number) => (
                                    <div key={enr.enrollmentId || idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary text-xs">
                                                {enr.studentName?.charAt(0) || "?"}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 text-sm">{enr.studentName}</p>
                                                <p className="text-xs font-bold text-gray-400">{enr.courseName}</p>
                                            </div>
                                        </div>
                                        <Badge className={`border-none font-black rounded-full px-3 ${enr.status === "PAID" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                                            {enr.status === "PAID" ? "Đã thanh toán" : "Chờ thanh toán"}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center py-8 text-gray-400 font-bold">Chưa có dữ liệu</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatCard({ title, value, change, isUp, icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`size-12 ${color} rounded-2xl flex items-center justify-center`}>{icon}</div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black ${isUp ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50"}`}>
                    {isUp ? "+" : ""}{change}
                </div>
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{title}</p>
                <h3 className="text-3xl font-black text-gray-800 tracking-tighter">{value}</h3>
            </div>
        </div>
    );
}

function InfoItem({ icon: Icon, label, value }: any) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/50">
            <div className="size-9 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                <Icon className="size-4 text-[var(--primary)]" />
            </div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="font-bold text-gray-700 text-sm">{value}</p>
            </div>
        </div>
    );
}
