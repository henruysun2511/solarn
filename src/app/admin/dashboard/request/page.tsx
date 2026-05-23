"use client"

import { useGetRequestDashboard } from "@/queries/useDashboardQuery";
import { Clock, CheckCircle2, XCircle, FileText, ArrowUpRight, ArrowDownRight, MessageSquare } from "lucide-react";
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

const TYPE_LABELS: Record<string, string> = {
    LEAVE_REQUEST: "Nghỉ học",
    SCHEDULE_CHANGE: "Dời lịch",
    SALARY_COMPLAINT: "Khiếu nại lương",
    TRANSFER_REQUEST: "Chuyển lớp",
};

const STATUS_COLORS: Record<string, string> = {
    PENDING: "#f59e0b",
    APPROVED: "#22c55e",
    REJECTED: "#ef4444",
    CANCELLED: "#6b7280",
    RESOLVED: "#3b82f6",
};

const PIE_COLORS = ["#8b5cf6", "#f59e0b", "#3b82f6", "#ef4444"];

export default function RequestDashboard() {
    const { data: dashRes, isLoading } = useGetRequestDashboard();
    const dash = dashRes?.data;

    if (isLoading) return <Loading message="Đang tải dữ liệu yêu cầu..." />;

    const monthlyChartData = dash?.monthlyRequests?.map((item: any) => ({
        name: item.month,
        requests: item.requests,
    })) || [];

    const typeChartData = dash?.requestsByType?.map((item: any) => ({
        name: TYPE_LABELS[item.type] || item.type,
        value: item.count,
    })) || [];

    const statusChartData = dash?.requestsByStatus?.map((item: any) => ({
        name: item.status === "PENDING" ? "Chờ duyệt"
            : item.status === "APPROVED" ? "Đã duyệt"
            : item.status === "REJECTED" ? "Từ chối"
            : item.status === "CANCELLED" ? "Đã hủy"
            : item.status === "RESOLVED" ? "Hoàn tất"
            : item.status,
        count: item.count,
        fill: STATUS_COLORS[item.status] || "#94a3b8",
    })) || [];

    const recentData = dash?.recentRequests || [];

    return (
        <div className="flex flex-col gap-8">
            {/* HEADER */}
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">Yêu cầu</p>
                <h1 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">Dashboard Yêu Cầu</h1>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Tổng yêu cầu"
                    value={dash?.totalRequests?.toLocaleString() || "0"}
                    change={dash?.requestsGrowth != null ? `${dash.requestsGrowth >= 0 ? "+" : ""}${dash.requestsGrowth}%` : "0%"}
                    isUp={(dash?.requestsGrowth ?? 0) >= 0}
                    icon={<FileText className="size-5 text-indigo-500" />}
                    color="bg-indigo-50"
                />
                <StatCard
                    title="Chờ duyệt"
                    value={dash?.pendingRequests?.toLocaleString() || "0"}
                    change="Cần xử lý"
                    isUp={false}
                    icon={<Clock className="size-5 text-amber-500" />}
                    color="bg-amber-50"
                />
                <StatCard
                    title="Đã duyệt"
                    value={dash?.approvedRequests?.toLocaleString() || "0"}
                    change={`Hoàn tất: ${dash?.resolvedRequests || 0}`}
                    isUp={true}
                    icon={<CheckCircle2 className="size-5 text-emerald-500" />}
                    color="bg-emerald-50"
                />
                <StatCard
                    title="Từ chối / Đã hủy"
                    value={((dash?.rejectedRequests || 0) + (dash?.cancelledRequests || 0)).toLocaleString()}
                    change={`Từ chối: ${dash?.rejectedRequests || 0}`}
                    isUp={false}
                    icon={<XCircle className="size-5 text-red-500" />}
                    color="bg-red-50"
                />
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                <Card className="lg:col-span-4 rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-gray-50">
                        <CardTitle className="text-xl font-black tracking-tighter">Yêu cầu theo tháng</CardTitle>
                        <CardDescription className="font-medium">Số lượng yêu cầu trong 6 tháng gần nhất</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyChartData.length > 0 ? monthlyChartData : [{ name: "Chưa có dữ liệu", requests: 0 }]}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="requests" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3 rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-gray-50">
                        <CardTitle className="text-xl font-black tracking-tighter">Phân loại yêu cầu</CardTitle>
                        <CardDescription className="font-medium">Theo loại yêu cầu</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 flex items-center justify-center">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={typeChartData.length > 0 ? typeChartData : [{ name: "Chưa có dữ liệu", value: 1 }]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={110}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {typeChartData.map((_entry: any, idx: number) => (
                                            <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                                    <Legend
                                        verticalAlign="bottom"
                                        formatter={(value: string) => <span className="text-xs font-bold text-gray-600">{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* STATUS BAR CHART + RECENT REQUESTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-gray-50">
                        <CardTitle className="text-xl font-black tracking-tighter">Trạng thái yêu cầu</CardTitle>
                        <CardDescription className="font-medium">Phân bố theo trạng thái xử lý</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={statusChartData.length > 0 ? statusChartData : [{ name: "Chưa có dữ liệu", count: 0, fill: "#e5e7eb" }]} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} width={100} />
                                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none' }} />
                                    <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={24}>
                                        {statusChartData.map((_entry: any, idx: number) => (
                                            <Cell key={idx} fill={_entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                    <CardHeader className="p-8 border-b border-gray-50">
                        <CardTitle className="text-xl font-black tracking-tighter">Yêu cầu gần đây</CardTitle>
                        <CardDescription className="font-medium">10 yêu cầu mới nhất</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        {recentData.length > 0 ? (
                            <div className="space-y-3">
                                {recentData.map((req: any) => (
                                    <div key={req.requestId} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="size-9 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                                                <MessageSquare className="size-4 text-primary" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-gray-900 text-sm truncate">{TYPE_LABELS[req.type] || req.type}</p>
                                                <p className="text-[10px] font-bold text-gray-400 truncate">{req.senderName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className="text-[10px] font-bold text-gray-400">{new Date(req.createdAt).toLocaleDateString("vi-VN")}</span>
                                            <StatusBadge status={req.status} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center py-8 text-gray-400 font-bold">Chưa có yêu cầu nào</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* SUMMARY */}
            <Card className="rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
                <CardHeader className="p-8 border-b border-gray-50">
                    <CardTitle className="text-xl font-black tracking-tighter">Thống kê tổng quan yêu cầu</CardTitle>
                    <CardDescription className="font-medium">Tất cả chỉ số trong một cái nhìn</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <SummaryItem label="Chờ duyệt" value={dash?.pendingRequests?.toLocaleString() || "0"} />
                        <SummaryItem label="Đã duyệt" value={dash?.approvedRequests?.toLocaleString() || "0"} />
                        <SummaryItem label="Từ chối" value={dash?.rejectedRequests?.toLocaleString() || "0"} />
                        <SummaryItem label="Hoàn tất" value={dash?.resolvedRequests?.toLocaleString() || "0"} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function StatCard({ title, value, change, isUp, icon, color }: any) {
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

function StatusBadge({ status }: { status: string }) {
    const map: Record<string, { label: string; cls: string }> = {
        PENDING: { label: "Chờ duyệt", cls: "bg-amber-100 text-amber-700" },
        APPROVED: { label: "Đã duyệt", cls: "bg-emerald-100 text-emerald-700" },
        REJECTED: { label: "Từ chối", cls: "bg-red-100 text-red-700" },
        CANCELLED: { label: "Đã hủy", cls: "bg-gray-100 text-gray-500" },
        RESOLVED: { label: "Hoàn tất", cls: "bg-blue-100 text-blue-700" },
    };
    const s = map[status] || { label: status, cls: "bg-gray-100 text-gray-500" };
    return (
        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${s.cls}`}>{s.label}</span>
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
