"use client"

import { useGetFinanceDashboard } from "@/queries/useDashboardQuery";
import { Banknote, TrendingUp, TrendingDown, Clock, XCircle, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const COLORS = ["var(--primary)", "#10b981", "#f59e0b", "#ef4444"];

export default function FinanceDashboard() {
    const { data: dashRes, isLoading } = useGetFinanceDashboard();
    const dash = dashRes?.data;

    if (isLoading) return <Loading message="Đang tải dữ liệu tài chính..." />;

    const revenueChartData = dash?.monthlyRevenue?.map((item: any) => ({
        name: item.month,
        revenue: item.revenue,
    })) || [];

    const pieData = [
        { name: "Đã thanh toán", value: dash?.totalPaid || 0 },
        { name: "Chờ thanh toán", value: dash?.totalPending || 0 },
        { name: "Đã hủy", value: dash?.totalCancelled || 0 },
    ];

    return (
        <div className="flex flex-col gap-8">
            {/* HEADER */}
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">Tài chính</p>
                <h1 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">Dashboard Tài Chính</h1>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FinanceStatCard
                    title="Tổng Doanh Thu"
                    value={dash?.totalRevenue ? `${(dash.totalRevenue / 1000000).toFixed(1)}M` : "0"}
                    change={dash?.revenueGrowth != null ? `${dash.revenueGrowth >= 0 ? "+" : ""}${dash.revenueGrowth}%` : "0%"}
                    isUp={(dash?.revenueGrowth ?? 0) >= 0}
                    icon={<Banknote className="size-5 text-emerald-500" />}
                    color="bg-emerald-50"
                />
                <FinanceStatCard
                    title="Đã Thanh Toán"
                    value={dash?.totalPaid ? `${(dash.totalPaid / 1000000).toFixed(1)}M` : "0"}
                    change={dash?.paidGrowth != null ? `${dash.paidGrowth >= 0 ? "+" : ""}${dash.paidGrowth}%` : "0%"}
                    isUp={(dash?.paidGrowth ?? 0) >= 0}
                    icon={<TrendingUp className="size-5 text-green-500" />}
                    color="bg-green-50"
                />
                <FinanceStatCard
                    title="Chờ Thanh Toán"
                    value={dash?.totalPending ? `${(dash.totalPending / 1000000).toFixed(1)}M` : "0"}
                    change={dash?.pendingGrowth != null ? `${dash.pendingGrowth >= 0 ? "+" : ""}${dash.pendingGrowth}%` : "0%"}
                    isUp={false}
                    icon={<Clock className="size-5 text-amber-500" />}
                    color="bg-amber-50"
                />
                <FinanceStatCard
                    title="Đã Hủy"
                    value={dash?.totalCancelled ? `${(dash.totalCancelled / 1000000).toFixed(1)}M` : "0"}
                    change="---"
                    isUp={false}
                    icon={<XCircle className="size-5 text-red-500" />}
                    color="bg-red-50"
                />
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                <Card className="lg:col-span-4 rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-gray-50">
                        <CardTitle className="text-xl font-black tracking-tighter">Doanh thu theo tháng</CardTitle>
                        <CardDescription className="font-medium">Biểu đồ cột doanh thu</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueChartData.length > 0 ? revenueChartData : [{ name: "Chưa có dữ liệu", revenue: 0 }]}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} tickFormatter={(v) => `${v / 1000000}M`} />
                                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="revenue" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3 rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-gray-50">
                        <CardTitle className="text-xl font-black tracking-tighter">Phân bổ doanh thu</CardTitle>
                        <CardDescription className="font-medium">Trạng thái thanh toán</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 flex items-center justify-center">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData.filter((d) => d.value > 0).length > 0 ? pieData.filter((d) => d.value > 0) : [{ name: "Chưa có dữ liệu", value: 1 }]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={120}
                                        paddingAngle={4}
                                        dataKey="value"
                                    >
                                        {pieData.filter((d) => d.value > 0).length > 0
                                            ? pieData.filter((d) => d.value > 0).map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)
                                            : <Cell fill="#e5e7eb" />
                                        }
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                                    <Legend
                                        wrapperStyle={{ fontSize: '12px', fontWeight: 600 }}
                                        formatter={(value) => <span className="text-gray-600">{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* REVENUE BY COURSE + RECENT TRANSACTIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-gray-50">
                        <CardTitle className="text-xl font-black tracking-tighter">Doanh thu theo khóa học</CardTitle>
                        <CardDescription className="font-medium">Top khóa học có doanh thu cao nhất</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        {(dash?.revenueByCourse?.length ?? 0) > 0 ? (
                            <div className="space-y-4">
                                {dash.revenueByCourse.map((course: any, idx: number) => {
                                    const pct = dash.totalRevenue ? ((course.totalRevenue / dash.totalRevenue) * 100).toFixed(1) : "0";
                                    return (
                                        <div key={course.courseId || idx} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <p className="font-bold text-gray-700 text-sm">{course.courseName}</p>
                                                <p className="font-black text-primary text-sm">{course.totalRevenue ? `${(course.totalRevenue / 1000000).toFixed(1)}M` : "---"}</p>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
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
                        <CardTitle className="text-xl font-black tracking-tighter">Giao dịch gần đây</CardTitle>
                        <CardDescription className="font-medium">Các giao dịch mới nhất</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        {(dash?.recentTransactions?.length ?? 0) > 0 ? (
                            <div className="space-y-3">
                                {dash.recentTransactions.map((tx: any, idx: number) => (
                                    <div key={tx.transactionId || idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-black text-xs text-primary">
                                                {tx.studentName?.charAt(0) || "?"}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 text-sm">{tx.studentName}</p>
                                                <p className="text-xs font-bold text-gray-400">{tx.courseName}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-gray-900">{Number(tx.amount) ? `${(Number(tx.amount) / 1000000).toFixed(1)}M` : tx.amount}</p>
                                            <Badge className={`border-none font-black rounded-full px-2 text-[10px] ${tx.status === "PAID" ? "bg-emerald-100 text-emerald-700" : tx.status === "PENDING" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                                                {tx.status === "PAID" ? "Đã thanh toán" : tx.status === "PENDING" ? "Chờ thanh toán" : "Đã hủy"}
                                            </Badge>
                                        </div>
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

function FinanceStatCard({ title, value, change, isUp, icon, color }: any) {
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
