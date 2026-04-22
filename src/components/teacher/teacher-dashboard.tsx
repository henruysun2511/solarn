"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Đảm bảo bạn đã npx shadcn@latest add progress
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { Badge } from "../ui/badge";

// Dữ liệu giả lập cho Biểu đồ điểm số
const gradeData = [
    { name: "Giỏi", total: 45 },
    { name: "Khá", total: 52 },
    { name: "Trung bình", total: 18 },
    { name: "Yếu", total: 5 },
];

// Dữ liệu giả lập cho Chuyên cần
const attendanceData = [
    { day: "Thứ 2", rate: 95 },
    { day: "Thứ 3", rate: 88 },
    { day: "Thứ 4", rate: 92 },
    { day: "Thứ 5", rate: 97 },
    { day: "Thứ 6", rate: 94 },
    { day: "Thứ 7", rate: 90 },
];

export function TeacherAnalytics() {
    return (
        <div className="space-y-8 mt-10">
            {/* ROW 1: CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Biểu đồ phân bổ điểm số */}
                <Card className="rounded-[2.5rem] border-[var(--sidebar-border)] shadow-sm overflow-hidden bg-white">
                    <CardHeader className="p-8 pb-0">
                        <CardTitle className="text-xl font-black tracking-tight">Phân bổ điểm số</CardTitle>
                        <CardDescription className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">
                            Tổng hợp từ 8 lớp đang giảng dạy
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={gradeData}>
                                <XAxis
                                    dataKey="name"
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    fontFamily="inherit"
                                    fontWeight={700}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Tooltip
                                    cursor={{ fill: 'var(--accent)', radius: 10 }}
                                    contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar
                                    dataKey="total"
                                    fill="var(--primary)"
                                    radius={[10, 10, 10, 10]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Biểu đồ chuyên cần */}
                <Card className="rounded-[2.5rem] border-[var(--sidebar-border)] shadow-sm overflow-hidden bg-white">
                    <CardHeader className="p-8 pb-0">
                        <CardTitle className="text-xl font-black tracking-tight text-red-600">Tỷ lệ chuyên cần</CardTitle>
                        <CardDescription className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">
                            Biến động trong 7 ngày gần nhất
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={attendanceData}>
                                <defs>
                                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="red" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="red" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="day" hide />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="rate"
                                    stroke="red"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorRate)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* ROW 2: LEADERBOARD & PROGRESS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Bảng xếp hạng học sinh xuất sắc */}
                <Card className="lg:col-span-1 rounded-[2.5rem] border-[var(--sidebar-border)] shadow-sm bg-white">
                    <CardHeader className="p-8">
                        <CardTitle className="text-xl font-black tracking-tight flex items-center gap-2">
                            ⭐ Top Học Viên
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0 space-y-6">
                        {[
                            { name: "Nhật Huy", score: "9.8", avatar: "H" },
                            { name: "Minh Tuấn", score: "9.5", avatar: "T" },
                            { name: "Mỹ Linh", score: "9.2", avatar: "L" },
                        ].map((student, i) => (
                            <div key={i} className="flex items-center justify-between group cursor-default">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-xl bg-[var(--accent)] flex items-center justify-center font-black text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                                        {student.avatar}
                                    </div>
                                    <p className="font-bold text-slate-700">{student.name}</p>
                                </div>
                                <Badge variant="outline" className="rounded-full border-amber-200 text-amber-600 font-black">
                                    {student.score}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Tiến độ hoàn thành chương trình của các lớp */}
                <Card className="lg:col-span-2 rounded-[2.5rem] border-[var(--sidebar-border)] shadow-sm bg-white">
                    <CardHeader className="p-8">
                        <CardTitle className="text-xl font-black tracking-tight">Tiến độ giáo trình</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0 space-y-8">
                        {[
                            { label: "IELTS Intensive (A1)", progress: 75, color: "bg-red-600" },
                            { label: "Toeic Master (B2)", progress: 40, color: "bg-amber-500" },
                            { label: "English Communication", progress: 90, color: "bg-green-500" },
                        ].map((course, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between text-sm font-black italic">
                                    <span className="text-slate-600 tracking-tight">{course.label}</span>
                                    <span className="text-[var(--primary)]">{course.progress}%</span>
                                </div>
                                <Progress value={course.progress} className="h-3 rounded-full bg-slate-100" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}