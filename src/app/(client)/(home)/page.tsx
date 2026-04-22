"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award, BookOpen, CheckCircle2,
  ChevronRight,
  Globe,
  Library, MessagesSquare,
  Quote,
  Star,
  Users
} from "lucide-react";

// Dữ liệu mẫu - Sử dụng biến màu từ hệ thống
const courses = [
  {
    name: "IELTS Intensive",
    level: "Band 6.5 - 7.5+",
    sessions: "32 buổi",
    price: "Premium",
    icon: Award,
    color: "bg-primary/10 text-primary",
    image: "https://i.pinimg.com/1200x/12/a5/ba/12a5ba210eda3bc30cb930f0fbe37226.jpg",
    teacherName: "Mr. Darko",
    teacherAvatar: "https://i.pinimg.com/1200x/12/a5/ba/12a5ba210eda3bc30cb930f0fbe37226.jpg"
  },
  {
    name: "Communication Plus",
    level: "Mọi trình độ",
    sessions: "24 buổi",
    price: "Popular",
    icon: MessagesSquare,
    color: "bg-secondary/10 text-secondary",
    image: "https://i.pinimg.com/1200x/89/0c/c2/890cc25d844b9181e734b0b8a1954540.jpg",
    teacherName: "Ms. Selena",
    teacherAvatar: "https://i.pinimg.com/1200x/89/0c/c2/890cc25d844b9181e734b0b8a1954540.jpg"
  },
  {
    name: "Pre-IELTS Foundation",
    level: "Band 0 - 4.5",
    sessions: "40 buổi",
    price: "Hot",
    icon: BookOpen,
    color: "bg-primary/10 text-primary",
    image: "https://i.pinimg.com/1200x/1d/1c/86/1d1c867861498321a988765e3268fbcf.jpg",
    teacherName: "Ms. Lan Anh",
    teacherAvatar: "https://i.pinimg.com/1200x/1d/1c/86/1d1c867861498321a988765e3268fbcf.jpg"
  },
  {
    name: "Academic Writing",
    level: "Band 5.5+",
    sessions: "12 buổi",
    price: "Special",
    icon: Library,
    color: "bg-accent text-accent-foreground",
    image: "https://i.pinimg.com/1200x/a9/cc/af/a9ccaf53afe5d50c87c0ba1d6a36d34f.jpg",
    teacherName: "Mr. James",
    teacherAvatar: "https://i.pinimg.com/1200x/a9/cc/af/a9ccaf53afe5d50c87c0ba1d6a36d34f.jpg"
  },
];

const teachers = [
  { name: "Ms. Thúy Hoài", role: "Founder & Head of IELTS", achievement: "9.0 IELTS Overall", img: "TH" },
  { name: "Mr. James Nguyen", role: "Senior Mentor", achievement: "8.5 IELTS - Speaking Expert", img: "JN" },
  { name: "Ms. Sarah Lan", role: "Communication Lead", achievement: "10+ năm kinh nghiệm", img: "SL" },
];

const reviews = [
  { user: "Hoàng Anh", content: "Lộ trình học cực kỳ rõ ràng, hệ thống LMS giúp mình theo dõi tiến độ mỗi ngày.", score: 5, target: "Đạt 7.5 IELTS" },
  { user: "Minh Thư", content: "Các Mentor rất tận tâm, sửa bài Writing cực kỹ. Mình đã tăng 1.5 band chỉ sau 3 tháng.", score: 5, target: "Đạt 7.0 IELTS" },
  { user: "Quốc Bảo", content: "Môi trường học hiện đại, tài liệu độc quyền rất sát với đề thi thật.", score: 5, target: "Đạt 6.5 IELTS" },
];



export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--dashboard-bg)] font-sans antialiased text-foreground">

      {/* 2. HERO SECTION */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden bg-[var(--primary)] text-white py-20">
        {/* Họa tiết trang trí phía sau (Abstract background) */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-20 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 size-96 bg-[var(--secondary)] rounded-full blur-[120px] opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* LEFT CONTENT */}
            <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">TRUNG TÂM TIẾNG ANH SEG - SOLARN</span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-6">
                Chinh phục <br />
                <span className="text-[var(--secondary)]">Tiếng Anh</span> <br />
                Theo cách của bạn
              </h1>

              <p className="text-lg text-white/70 font-medium max-w-lg mx-auto lg:mx-0">
                Hệ thống hơn 100+ khóa học chuẩn quốc tế, giúp bạn làm chủ ngôn ngữ và mở cánh cửa cơ hội toàn cầu với lộ trình cá nhân hóa.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
                <Button className="h-16 px-10 rounded-2xl bg-[var(--secondary)] text-white font-black text-lg hover:scale-105 transition-transform shadow-2xl shadow-yellow-500/20">
                  Bắt đầu lộ trình ngay
                </Button>
                <Button variant="ghost" className="h-16 px-8 rounded-2xl border border-white/20 text-white font-bold hover:bg-white/10">
                  Xem video giới thiệu
                </Button>
              </div>

              {/* Social Proof nhanh */}
              <div className="flex items-center gap-4 pt-8 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pinimg.com/1200x/10/48/2e/10482e76d338e28e303260164105cbdd.jpg`}
                      className="size-10 rounded-full border-2 border-[var(--primary)] shadow-sm"
                      alt="Student"
                    />
                  ))}
                </div>
                <p className="text-xs font-bold text-white/60">
                  <span className="text-white font-black">+10,000</span> học viên đã tin tưởng
                </p>
              </div>
            </div>

            {/* RIGHT ILLUSTRATION (Visual Side) */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative z-10 w-full aspect-square max-w-[500px] mx-auto">
                {/* Ảnh chính lồng trong khung bo góc lớn */}
                <div className="w-full h-full rounded-[3rem] overflow-hidden border-[12px] border-white/10 shadow-2xl rotate-3">
                  <img
                    src="https://i.pinimg.com/1200x/75/48/d8/7548d8bc381f16d63836e6a0ba7aecbe.jpg"
                    className="w-full h-full object-cover scale-110"
                    alt="Student learning"
                  />
                </div>

                {/* Floating Card 1: Thống kê */}
                <div className="absolute -top-6 -left-10 bg-white p-5 rounded-[2rem] shadow-2xl animate-bounce duration-[3000ms] flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                    <Globe className="size-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase">Chứng chỉ</div>
                    <div className="text-xl font-black text-gray-900 leading-none">IELTS 8.5</div>
                  </div>
                </div>

                {/* Floating Card 2: Giáo viên */}
                <div className="absolute -bottom-10 -right-6 bg-white p-4 rounded-[2rem] shadow-2xl flex items-center gap-4">
                  <div className="size-14 rounded-2xl overflow-hidden shadow-inner">
                    <img src="https://i.pinimg.com/1200x/75/48/d8/7548d8bc381f16d63836e6a0ba7aecbe.jpg" alt="Teacher" />
                  </div>
                  <div className="pr-4">
                    <div className="text-[10px] font-black text-[var(--primary)] uppercase">Giảng viên chuyên gia</div>
                    <div className="text-sm font-black text-gray-900">Mr. Nhat Huy</div>
                  </div>
                </div>

                {/* Họa tiết trang trí phụ */}
                <div className="absolute top-1/2 -right-12 size-24 bg-[var(--secondary)] rounded-3xl -rotate-12 opacity-20 blur-xl" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED COURSES */}
      <section className="py-32 container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-foreground">
            Khóa học <span className="text-[var(--primary)]">Tiêu biểu</span>
          </h2>
          <p className="text-muted-foreground font-bold italic">
            Lựa chọn lộ trình phù hợp nhất để bứt phá điểm số của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, idx) => (
            <Card key={idx} className="group border-gray-100 hover:border-[var(--primary)]/30 transition-all duration-500 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 bg-white flex flex-col">

              {/* 1. ẢNH KHÓA HỌC TRÊN CÙNG */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"}
                  alt={course.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Badge giá lơ lửng trên ảnh */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
                  <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest">
                    {course.price}
                  </span>
                </div>
              </div>

              {/* 2. NỘI DUNG THÔNG TIN */}
              <CardHeader className="p-8 pb-0">
                <p className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.2em] mb-2">
                  {course.level}
                </p>
                <CardTitle className="text-2xl font-black mb-4 text-foreground leading-tight group-hover:text-[var(--primary)] transition-colors">
                  {course.name}
                </CardTitle>

                <div className="flex items-center justify-between py-4 border-y border-dashed border-gray-100 mb-2 text-muted-foreground">
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[var(--primary)]" /> {course.sessions} Học viên
                  </span>
                  <span className="text-[10px] font-black text-[var(--secondary)] bg-[var(--secondary)]/10 px-2 py-1 rounded-md uppercase">
                    Full Access
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-8 pt-4 flex flex-col flex-1 justify-between">
                {/* 3. THÔNG TIN GIÁO VIÊN */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="size-10 rounded-full border-2 border-white shadow-md overflow-hidden flex-shrink-0">
                    <img
                      src={course.teacherAvatar || `https://i.pravatar.cc/150?u=${idx}`}
                      alt={course.teacherName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-gray-400 uppercase leading-none mb-1">Giảng viên</span>
                    <span className="text-sm font-bold text-gray-700 leading-none">{course.teacherName || "Ms. Selena"}</span>
                  </div>
                </div>

                {/* 4. NÚT ĐĂNG KÝ */}
                <Button className="w-full rounded-2xl bg-blue-50 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 font-black py-7 border-none text-md shadow-none hover:shadow-md">
                  Đăng ký ngay
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. ALTERNATING MARKETING SECTIONS */}
      <section className="space-y-32 mb-32">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1 font-black text-[10px] uppercase tracking-widest">Hệ thống thông minh</Badge>
            <h3 className="text-5xl font-black leading-tight tracking-tighter text-foreground">Theo dõi tiến độ <br /> <span className="text-primary">Real-time Dashboard</span></h3>
            <p className="text-lg text-muted-foreground font-semibold leading-relaxed italic">
              Không còn mơ hồ về trình độ của bản thân. Hệ thống tự động phân tích các kỹ năng Listening, Reading, Writing, Speaking qua từng bài tập và hiển thị biểu đồ tăng trưởng chính xác.
            </p>
            <ul className="space-y-4">
              {["Báo cáo chi tiết từng kỹ năng", "Lịch nhắc học cá nhân hóa", "Kho bài tập thích ứng AI"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-black text-sm text-foreground">
                  <div className="bg-primary/10 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-primary" /></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-primary rounded-[4rem] aspect-[4/3] relative overflow-hidden shadow-2xl shadow-primary/20 group">
            <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-all" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-background/20 backdrop-blur-md rounded-3xl border border-white/30 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 bg-secondary rounded-[4rem] aspect-[4/3] relative overflow-hidden shadow-2xl shadow-secondary/20">
            <div className="absolute inset-0 bg-foreground/5" />
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <Badge className="bg-primary/10 text-primary border-none px-4 py-1 font-black text-[10px] uppercase tracking-widest">Cơ sở vật chất</Badge>
            <h3 className="text-5xl font-black leading-tight tracking-tighter text-foreground">Không gian học <br /> <span className="text-secondary">Chuẩn 5 Sao</span></h3>
            <p className="text-lg text-muted-foreground font-semibold leading-relaxed italic">
              Chúng tôi tin rằng một môi trường sáng tạo và hiện đại sẽ kích thích niềm đam mê học tập. Các phòng học tại SEG được thiết kế mở, tối ưu ánh sáng và trang bị công nghệ tương tác mới nhất.
            </p>
            <Button variant="outline" className="h-14 px-8 rounded-2xl border-border font-black text-muted-foreground hover:bg-accent hover:text-foreground">
              Tham quan cơ sở <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* 5. TEACHER TEAM */}
      <section className="py-32 bg-foreground text-background rounded-[4rem] mx-6">
        <div className="container mx-auto px-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase">Đội ngũ <span className="text-primary italic">Dẫn dắt</span></h2>
            <p className="text-muted font-bold opacity-80">Những chuyên gia hàng đầu với tâm huyết thay đổi tư duy học ngoại ngữ.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teachers.map((t, i) => (
              <div key={i} className="group text-center">
                <div className="w-48 h-48 mx-auto rounded-full bg-muted/10 border-4 border-muted/20 group-hover:border-primary transition-all duration-500 mb-8 flex items-center justify-center overflow-hidden">
                  <span className="text-4xl font-black text-muted group-hover:text-primary transition-colors">{t.img}</span>
                </div>
                <h4 className="text-2xl font-black mb-2 text-background">{t.name}</h4>
                <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4">{t.role}</p>
                <p className="text-muted text-sm font-semibold italic opacity-80">"{t.achievement}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STUDENT REVIEWS */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex items-center justify-between mb-20">
          <h2 className="text-4xl font-black tracking-tight text-foreground uppercase">Học viên <span className="text-primary">Nói gì?</span></h2>
          <div className="flex gap-2">
            <div className="bg-accent p-3 rounded-full"><Star className="w-5 h-5 text-secondary fill-current" /></div>
            <span className="text-2xl font-black text-foreground">4.9/5</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-card border border-border p-10 rounded-[3rem] shadow-sm hover:shadow-xl transition-all relative">
              <Quote className="w-12 h-12 text-primary/10 absolute top-8 left-8" />
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(rev.score)].map((_, i) => <Star key={i} className="w-4 h-4 text-secondary fill-current" />)}
                </div>
                <p className="text-lg font-bold text-foreground italic mb-8 leading-relaxed">"{rev.content}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary">{rev.user[0]}</div>
                  <div>
                    <p className="font-black text-foreground uppercase text-sm">{rev.user}</p>
                    <p className="text-[10px] font-black text-secondary uppercase tracking-widest">{rev.target}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA & FOOTER */}
      <section className="container mx-auto px-6 mb-32">
        <div className="bg-primary rounded-[4rem] p-16 md:p-24 text-center text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/40">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-tight">Sẵn sàng bứt phá?</h2>
            <p className="text-primary-foreground/80 text-xl mb-12 max-w-2xl mx-auto font-bold italic">Tham gia cộng đồng 10,000+ học viên thành công tại SEG ngay hôm nay.</p>
            <Button size="lg" className="bg-background text-primary hover:bg-accent text-xl font-black px-12 h-20 rounded-2xl shadow-xl transition-all hover:scale-105 border-none">
              Đăng ký tư vấn miễn phí
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}