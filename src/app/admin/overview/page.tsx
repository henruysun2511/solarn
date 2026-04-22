"use client"

import React from "react";
import { 
  UsersIcon, 
  BookOpenIcon, 
  GraduationCapIcon, 
  DollarSignIcon,
  TrendingUpIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  MoreHorizontalIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

// Dữ liệu mẫu cho biểu đồ doanh thu
const revenueData = [
  { name: "Thứ 2", total: 4500000 },
  { name: "Thứ 3", total: 5200000 },
  { name: "Thứ 4", total: 3800000 },
  { name: "Thứ 5", total: 6100000 },
  { name: "Thứ 6", total: 5900000 },
  { name: "Thứ 7", total: 8500000 },
  { name: "CN", total: 7200000 },
];

// Dữ liệu mẫu cho biểu đồ học viên mới
const studentGrowthData = [
  { month: "Jan", students: 400 },
  { month: "Feb", students: 600 },
  { month: "Mar", students: 550 },
  { month: "Apr", students: 900 },
  { month: "May", students: 1100 },
  { month: "Jun", students: 950 },
];

export default function AdminDashboard() {
  return (
    <div data-role="admin" className="flex flex-col gap-8 min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
            Overview
          </p>
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">
            Dashboard
          </h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-gray-200 font-bold h-11">
            Download Report
          </Button>
          <Button className="bg-primary text-white px-6 h-11 rounded-xl font-bold shadow-lg shadow-primary/20">
            Manage System
          </Button>
        </div>
      </div>

      {/* STAT CARDS - Thông số tổng quát */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Tổng Học Viên" 
          value="1,284" 
          change="+12.5%" 
          isUp={true} 
          icon={<UsersIcon className="size-5 text-blue-500" />} 
          color="bg-blue-50"
        />
        <StatCard 
          title="Giáo Viên" 
          value="45" 
          change="+2" 
          isUp={true} 
          icon={<GraduationCapIcon className="size-5 text-purple-500" />} 
          color="bg-purple-50"
        />
        <StatCard 
          title="Khóa Học" 
          value="12" 
          change="0%" 
          isUp={true} 
          icon={<BookOpenIcon className="size-5 text-orange-500" />} 
          color="bg-orange-50"
        />
        <StatCard 
          title="Doanh Thu" 
          value="125.4M" 
          change="-4.2%" 
          isUp={false} 
          icon={<DollarSignIcon className="size-5 text-emerald-500" />} 
          color="bg-emerald-50"
        />
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        
        {/* Biểu đồ doanh thu - Chiếm 4/7 */}
        <Card className="lg:col-span-4 rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between p-8 border-b border-gray-50">
            <div>
              <CardTitle className="text-xl font-black tracking-tighter">Doanh thu tuần này</CardTitle>
              <CardDescription className="font-medium">Thống kê theo đơn vị VND</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full"><MoreHorizontalIcon className="size-5" /></Button>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                    tickFormatter={(value) => `${value/1000000}M`}
                  />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="total" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Biểu đồ tăng trưởng học viên - Chiếm 3/7 */}
        <Card className="lg:col-span-3 rounded-[2rem] border-gray-100 shadow-sm bg-white overflow-hidden">
          <CardHeader className="p-8 border-b border-gray-50">
            <CardTitle className="text-xl font-black tracking-tighter">Tăng trưởng học viên</CardTitle>
            <CardDescription className="font-medium">6 tháng gần nhất</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studentGrowthData}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
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
    </div>
  );
}

// Component Thẻ thông số
function StatCard({ title, value, change, isUp, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`size-12 ${color} rounded-2xl flex items-center justify-center`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black ${isUp ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
          {isUp ? <ArrowUpRightIcon className="size-3" /> : <ArrowDownRightIcon className="size-3" />}
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