"use client"

import { useGetTrainingDashboard } from "@/queries/useDashboardQuery";
import { BookOpen, Users, GraduationCap, BarChart3, ArrowUpRight, ArrowDownRight, Target } from "lucide-react";
import { Loading } from "@/components/common/loading";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
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
    Area,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from "recharts";

export default function TrainingDashboard() {
    const { data: dashRes, isLoading } = useGetTrainingDashboard();
    const dash = dashRes?.data;

    if (isLoading) return <Loading message="Đang tải dữ liệu đào tạo..." />;

    const enrollmentChartData = dash?.monthlyEnrollments?.map((item: any) => ({
        month: item.month,
        enrollments: item.enrollments,
    })) || [];

    const scoreData = dash?.scoreDistribution ? [
        { subject: "Xuất sắc", value: dash.scoreDistribution.excellent, fullMark: 100 },
        { subject: "Giỏi", value: dash.scoreDistribution.good, fullMark: 100 },
        { subject: "Trung bình", value: dash.scoreDistribution.average, fullMark: 100 },
        { subject: "Yếu", value: dash.scoreDistribution.weak, fullMark: 100 },
        { subject: "Kém", value: dash.scoreDistribution.poor, fullMark: 100 },
    ] : [];

    return (
        <div className="flex flex-col gap-8">
            {/* HEADER */}
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">Đào tạo</p>
                <h1 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">Dashboard Đào Tạo</h1>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <TrainingStatCard
                    title="Khóa Học"
                    value={dash?.totalCourses?.toLocaleString() || "0"}
                    change={dash?.courseGrowth != null ? `+${dash.courseGrowth}%` : "0%"}
                    isUp={true}
                    icon={<BookOpen className="size-5 text-blue-500" />}
                    color="bg-blue-50"
                />
                <TrainingStatCard
                    title="Lớp Học"
                    value={dash?.totalClasses?.toLocaleString() || "0"}
                    change={dash?.classGrowth != null ? `+${dash.classGrowth}%` : "0%"}
                    isUp={true}
                    icon={<GraduationCap className="size-5 text-purple-500" />}
                    color="bg-purple-50"
                />
                <TrainingStatCard
                    title="Học Viên"
                    value={dash?.totalStudents?.toLocaleString() || "0"}
                    change={dash?.studentGrowth != null ? `+${dash.studentGrowth}%` : "0%"}
                    isUp={(dash?.studentGrowth ?? 0) >= 0}
                    icon={<Users className="size-5 text-orange-500" />}
                    color="bg-orange-50"
                />
                <TrainingStatCard
                    title="Tỉ lệ điểm danh"
                    value={dash?.attendanceRate != null ? `${dash.attendanceRate}%` : "0%"}
                    change={`Điểm TB: ${dash?.averageScore ?? 0}`}
                    isUp={true}
                    icon={<Target className="size-5 text-emerald-500" />}
                    color="bg-emerald-50"
                />
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                <Card className="lg:col-span-4 rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-gray-50">
                        <CardTitle className="text-xl font-black tracking-tighter">Lượng ghi danh theo tháng</CardTitle>
                        <CardDescription className="font-medium">Số học viên đăng ký mới</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={enrollmentChartData.length > 0 ? enrollmentChartData : [{ month: "Chưa có dữ liệu", enrollments: 0 }]}>
                                    <defs>
                                        <linearGradient id="colorEnrollments" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none' }} />
                                    <Area type="monotone" dataKey="enrollments" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorEnrollments)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3 rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-gray-50">
                        <CardTitle className="text-xl font-black tracking-tighter">Phân bố điểm số</CardTitle>
                        <CardDescription className="font-medium">Thống kê kết quả học tập</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 flex items-center justify-center">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart data={scoreData.length > 0 ? scoreData : [{ subject: "Chưa có dữ liệu", value: 1, fullMark: 100 }]} cx="50%" cy="50%" outerRadius="75%">
                                    <PolarGrid stroke="#e5e7eb" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} tickCount={5} />
                                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                                    <Radar name="Điểm số" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} strokeWidth={3} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* TOP COURSES + SCORE BAR */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-gray-50">
                        <CardTitle className="text-xl font-black tracking-tighter">Khóa học hàng đầu</CardTitle>
                        <CardDescription className="font-medium">Theo số lượng học viên</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        {(dash?.topCourses?.length ?? 0) > 0 ? (
                            <div className="space-y-4">
                                {dash.topCourses.map((course: any, idx: number) => {
                                    const maxStudents = Math.max(...dash.topCourses.map((c: any) => c.totalStudents), 1);
                                    const pct = (course.totalStudents / maxStudents) * 100;
                                    return (
                                        <div key={course.courseId || idx} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-lg bg-purple-50 flex items-center justify-center font-black text-xs text-purple-600">
                                                        {idx + 1}
                                                    </div>
                                                    <p className="font-bold text-gray-700">{course.courseName}</p>
                                                </div>
                                                <p className="font-black text-gray-900">{course.totalStudents} học viên</p>
                                            </div>
                                            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-300 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center py-8 text-gray-400 font-bold">Chưa có dữ liệu</p>
                        )}
                    </CardContent>
                </Card>

                <Card className="rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-gray-50">
                        <CardTitle className="text-xl font-black tracking-tighter">Phân bố điểm số</CardTitle>
                        <CardDescription className="font-medium">Chi tiết từng mức điểm</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        {scoreData.length > 0 ? (
                            <div className="space-y-4">
                                {scoreData.map((item: any, idx: number) => {
                                    const barColors = ["#22c55e", "#3b82f6", "#f59e0b", "#f97316", "#ef4444"];
                                    return (
                                        <div key={idx} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <p className="font-bold text-gray-600 text-sm">{item.subject}</p>
                                                <p className="font-black text-gray-900">{item.value}%</p>
                                            </div>
                                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${item.value}%`, backgroundColor: barColors[idx] }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center py-8 text-gray-400 font-bold">Chưa có dữ liệu</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* TỔNG KẾT */}
            <Card className="rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                <CardHeader className="p-8 border-b border-gray-50">
                    <CardTitle className="text-xl font-black tracking-tighter">Thống kê tổng quan đào tạo</CardTitle>
                    <CardDescription className="font-medium">Tất cả chỉ số trong một cái nhìn</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <SummaryItem label="Tổng buổi học" value={dash?.totalSessions?.toLocaleString() || "0"} />
                        <SummaryItem label="Tỉ lệ điểm danh" value={dash?.attendanceRate != null ? `${dash.attendanceRate}%` : "0%"} />
                        <SummaryItem label="Điểm trung bình" value={dash?.averageScore?.toFixed(1) || "0"} />
                        <SummaryItem label="Độ phủ khóa học" value={`${dash?.totalCourses || 0} khóa`} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function TrainingStatCard({ title, value, change, isUp, icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`size-12 ${color} rounded-2xl flex items-center justify-center`}>{icon}</div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black ${isUp ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50"}`}>
                    {isUp ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                    {change}
                </div>
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{title}</p>
                <h3 className="text-3xl font-black text-gray-800 tracking-tighter">{value}</h3>
            </div>
        </div>
    );
}

function SummaryItem({ label, value }: any) {
    return (
        <div className="text-center p-6 rounded-[2rem] bg-gray-50">
            <p className="text-3xl font-black text-gray-900 tracking-tighter">{value}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">{label}</p>
        </div>
    );
}
