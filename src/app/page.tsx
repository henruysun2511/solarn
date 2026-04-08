"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowRight, Award, BookOpenText,
  GraduationCap, LayoutDashboard,
  Moon,
  Search,
  Sun,
  Users, Zap
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Sử dụng biến màu từ globals.css thay vì text-color cứng
const categories = [
  { name: "Lập trình Web", icon: Zap, color: "text-secondary" },
  { name: "Thiết kế Đồ họa", icon: Award, color: "text-primary" },
  { name: "Marketing Online", icon: Users, color: "text-secondary" },
  { name: "Kỹ năng Mềm", icon: BookOpenText, color: "text-primary" },
];

export default function HomePage() {
  const [isLunar, setIsLunar] = useState(false);

  // Đồng bộ class dark với trạng thái
  useEffect(() => {
    if (isLunar) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isLunar]);

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-500">
      {/* 1. HEADER & NAVIGATION */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <nav className="container flex items-center justify-between h-20 px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary/20 rounded-lg group-hover:rotate-12 transition-transform">
              <Sun className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-foreground">
              {isLunar ? "LUNAR" : "SOLAR"}<span className="text-secondary">N</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {["Khóa học", "Lộ trình", "Giảng viên"].map((item) => (
              <Link key={item} href="#" className="hover:text-primary transition-colors">
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* SWITCH BUTTON */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsLunar(!isLunar)}
              className="rounded-full w-10 h-10 border-border bg-background"
            >
              {isLunar ? (
                <Moon className="w-5 h-5 text-primary" />
              ) : (
                <Sun className="w-5 h-5 text-primary" />
              )}
            </Button>
            
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost">Đăng nhập</Button>
            </Link>
            <Button className="shadow-lg shadow-primary/20 rounded-full px-6">
              Bắt đầu học
            </Button>
          </div>
        </nav>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-32">
        {/* Trang trí nền */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 blur-[120px]">
           <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary rounded-full" />
           <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary rounded-full" />
        </div>

        <div className="container px-4 md:px-8 text-center max-w-5xl mx-auto flex flex-col items-center">
          <Badge className="mb-8 px-6 py-2 bg-secondary/10 text-secondary border-secondary/20 rounded-full animate-bounce">
            ✨ {isLunar ? "Tĩnh lặng để bứt phá" : "Năng lượng để dẫn đầu"}
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground mb-8 leading-[0.9]">
            {isLunar ? "Học Tập Dưới" : "Khai Sáng Cùng"} <br />
            <span className={isLunar ? "text-primary" : "text-secondary"}>
                {isLunar ? "Ánh Trăng" : "Mặt Trời"}
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
            Học tập không giới hạn với nền tảng <b>Solarn</b>. Kết hợp sự rực rỡ của năng lượng mặt trời 
            và chiều sâu của bầu trời đêm.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
            <Button size="lg" className="h-16 px-10 text-lg rounded-full shadow-2xl hover:scale-105 transition-transform">
              Khám phá khóa học <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 text-lg rounded-full border-secondary/30 text-secondary">
              Xem bản demo
            </Button>
          </div>
        </div>
      </section>

      {/* 3. FEATURE HIGHLIGHTS */}
      <section className="py-32 bg-muted/20">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: LayoutDashboard, title: "Lộ trình bài bản", desc: "Được cá nhân hóa theo phong cách học tập của từng người." },
              { icon: GraduationCap, title: "Giảng viên chuyên gia", desc: "Học hỏi từ những người dẫn đầu trong ngành công nghiệp." },
              { icon: Award, title: "Chứng chỉ quốc tế", desc: "Ghi nhận nỗ lực của bạn bằng những chứng chỉ có giá trị toàn cầu." },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-none bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all rounded-3xl p-4">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-lg leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. COURSE CATEGORIES */}
      <section className="py-32">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
            <div className="max-w-xl">
               <h2 className="text-4xl font-black mb-4">Danh mục <span className="text-secondary">Nổi bật</span></h2>
               <p className="text-muted-foreground text-lg">Hàng trăm khóa học đang chờ đón bạn khám phá ngay hôm nay.</p>
            </div>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Bạn muốn học gì hôm nay?" className="h-14 pl-12 rounded-full border-secondary/20 focus:ring-secondary" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <Link key={index} href="#" className="group">
                  <div className="flex flex-col items-center text-center gap-6 p-10 border border-border bg-card rounded-[2.5rem] group-hover:bg-secondary group-hover:scale-105 transition-all duration-300 shadow-sm group-hover:shadow-secondary/20">
                    <div className={`w-20 h-20 rounded-full bg-muted flex items-center justify-center ${cat.color} group-hover:bg-white group-hover:text-secondary transition-colors`}>
                      <Icon className="w-10 h-10" />
                    </div>
                    <span className="text-xl font-bold group-hover:text-white transition-colors">
                      {cat.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="container px-4 md:px-8 mx-auto mb-20">
         <div className="bg-secondary rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Sẵn sàng để tỏa sáng?</h2>
            <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
                Tham gia cộng đồng <b>Solarn</b> ngay hôm nay để nhận ưu đãi và lộ trình học miễn phí.
            </p>
            <Button size="lg" className="bg-white text-secondary hover:bg-white/90 text-xl px-12 h-16 rounded-full shadow-2xl">
                Đăng ký ngay
            </Button>
         </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-20 border-t bg-muted/10">
        <div className="container px-4 md:px-8 mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black tracking-tighter">
              SOLAR<span className="text-secondary">N</span>
          </div>
          <div className="text-muted-foreground text-sm">
            © 2026 Solarn Learning Platform. All rights reserved.
          </div>
          <div className="flex gap-6">
             {["Privacy", "Terms", "Contact"].map(i => <Link key={i} href="#" className="hover:text-primary">{i}</Link>)}
          </div>
        </div>
      </footer>
    </div>
  );
}