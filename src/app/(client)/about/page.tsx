"use client";

import { Button } from "@/components/ui/button";
import {
  Award,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Heart,
  Lightbulb,
  Quote,
  Star,
  Target,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const stats = [
  { value: "10,000+", label: "Học viên", icon: Users },
  { value: "100+", label: "Khóa học", icon: BookOpen },
  { value: "50+", label: "Giảng viên", icon: GraduationCap },
  { value: "4.9/5", label: "Đánh giá", icon: Star },
];

const values = [
  {
    icon: Lightbulb,
    title: "Sáng tạo",
    desc: "Phương pháp giảng dạy hiện đại, kết hợp công nghệ và tư duy phản biện.",
  },
  {
    icon: Heart,
    title: "Tận tâm",
    desc: "Mỗi học viên là một cá thể riêng biệt, được đồng hành và thấu hiểu.",
  },
  {
    icon: Target,
    title: "Cam kết",
    desc: "Đặt mục tiêu đầu ra làm thước đo duy nhất cho chất lượng đào tạo.",
  },
  {
    icon: Award,
    title: "Xuất sắc",
    desc: "Không ngừng nâng cao tiêu chuẩn để mang đến trải nghiệm tốt nhất.",
  },
];

const milestones = [
  { year: "2018", title: "Thành lập", desc: "SOLARN được thành lập với sứ mệnh đổi mới giáo dục tiếng Anh tại Việt Nam." },
  { year: "2020", title: "Chuyển đổi số", desc: "Ra mắt nền tảng học tập trực tuyến LMS, giúp học viên học mọi lúc mọi nơi." },
  { year: "2022", title: "Mở rộng", desc: "Đạt mốc 5,000 học viên và mở rộng hệ thống cơ sở trên toàn thành phố." },
  { year: "2024", title: "Dẫn đầu", desc: "Top 3 trung tâm tiếng Anh được yêu thích nhất, với hơn 10,000 học viên." },
];

const team = [
  { name: "Ms. Thúy Hoài", role: "Founder & Head of IELTS", achievement: "9.0 IELTS Overall", img: "https://i.pinimg.com/1200x/6a/47/75/6a47752306a5d521c155c3970534fc32.jpg" },
  { name: "Mr. James Nguyen", role: "Senior Mentor", achievement: "8.5 IELTS - Speaking Expert", img: "https://i.pinimg.com/1200x/64/2d/9d/642d9da4098198039e6442d7b1d76ccd.jpg" },
  { name: "Ms. Sarah Lan", role: "Communication Lead", achievement: "10+ năm kinh nghiệm", img: "https://i.pinimg.com/1200x/06/83/cf/0683cff6f77c94db738c0809226a6b73.jpg" },
];

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--dashboard-bg)] font-sans antialiased text-foreground">

      {/* HERO */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden bg-[var(--primary)] text-white py-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-20 pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 size-96 bg-[var(--secondary)] rounded-full blur-[150px] opacity-15" />
        <div className="absolute top-1/4 right-10 size-48 bg-white/5 rounded-full blur-[80px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-3/5 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <Heart className="size-4 text-[var(--secondary)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Về SOLARN</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
                Câu chuyện của <br />
                <span className="text-[var(--secondary)]">chúng tôi</span>
              </h1>

              <p className="text-lg text-white/70 font-medium max-w-xl mx-auto lg:mx-0">
                Từ một lớp học nhỏ với 5 học viên, SOLARN đã vươn mình trở thành
                trung tâm tiếng Anh hàng đầu với hơn 10,000 học viên — nơi mỗi cá nhân
                đều tìm thấy con đường chinh phục ngôn ngữ riêng của mình.
              </p>

              <div className="flex flex-wrap items-center gap-8 pt-4 justify-center lg:justify-start">
                {stats.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <s.icon className="size-6 text-[var(--secondary)]" />
                    </div>
                    <div>
                      <div className="text-2xl font-black leading-none">{s.value}</div>
                      <div className="text-[10px] font-bold text-white/50 uppercase">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-2/5 relative">
              <div className="relative z-10 w-full aspect-square max-w-[400px] mx-auto">
                <div className="w-full h-full rounded-[3rem] overflow-hidden border-[12px] border-white/10 shadow-2xl -rotate-3">
                  <img
                    src="https://i.pinimg.com/736x/29/7c/89/297c89f70021382355f57c85b6a658fb.jpg"
                    className="w-full h-full object-cover scale-110"
                    alt="SOLARN learning space"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white border border-gray-100 p-12 rounded-[3rem] shadow-sm hover:shadow-xl transition-all">
            <div className="size-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-8">
              <Target className="size-8 text-[var(--primary)]" />
            </div>
            <h3 className="text-3xl font-black mb-4">Sứ mệnh</h3>
            <p className="text-muted-foreground font-semibold leading-relaxed text-lg">
              Mang đến nền giáo dục tiếng Anh chất lượng cao, dễ tiếp cận cho mọi người
              Việt Nam, thông qua phương pháp giảng dạy hiện đại kết hợp công nghệ và
              đội ngũ giảng viên xuất sắc.
            </p>
          </div>

          <div className="bg-white border border-gray-100 p-12 rounded-[3rem] shadow-sm hover:shadow-xl transition-all">
            <div className="size-16 rounded-2xl bg-[var(--secondary)]/10 flex items-center justify-center mb-8">
              <Lightbulb className="size-8 text-[var(--secondary)]" />
            </div>
            <h3 className="text-3xl font-black mb-4">Tầm nhìn</h3>
            <p className="text-muted-foreground font-semibold leading-relaxed text-lg">
              Trở thành hệ thống giáo dục tiếng Anh hàng đầu Việt Nam, nơi mỗi học viên
              đều được trang bị đầy đủ kỹ năng ngôn ngữ để hội nhập toàn cầu.
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-foreground">
              Giá trị <span className="text-[var(--primary)]">cốt lõi</span>
            </h2>
            <p className="text-muted-foreground font-bold italic">
              Những nguyên tắc định hướng mọi hoạt động và quyết định của chúng tôi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="group text-center p-10 rounded-[2.5rem] border border-gray-100 bg-[var(--dashboard-bg)] hover:border-[var(--primary)]/30 hover:shadow-xl transition-all">
                <div className="size-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                  <v.icon className="size-8 text-[var(--primary)] group-hover:text-white transition-all" />
                </div>
                <h4 className="text-xl font-black mb-3">{v.title}</h4>
                <p className="text-sm text-muted-foreground font-semibold leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MILESTONES TIMELINE */}
      <section className="py-32 container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-foreground">
            Hành trình <span className="text-[var(--primary)]">phát triển</span>
          </h2>
          <p className="text-muted-foreground font-bold italic">
            Từ những ngày đầu thành lập đến vị thế dẫn đầu ngày nay.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-12 md:space-y-20">
            {milestones.map((m, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "text-right pr-16" : "text-left pl-16"}`}>
                  <div className="inline-block bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all max-w-lg">
                    <div className="text-4xl font-black text-[var(--primary)] mb-2">{m.year}</div>
                    <h4 className="text-xl font-black mb-2">{m.title}</h4>
                    <p className="text-muted-foreground font-semibold text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>

                <div className="relative z-10 flex-shrink-0 ml-8 md:ml-0">
                  <div className="size-14 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center font-black text-sm shadow-lg shadow-[var(--primary)]/20">
                    {m.year.slice(2)}
                  </div>
                </div>

                <div className="md:hidden flex-1">
                  <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
                    <div className="text-4xl font-black text-[var(--primary)] mb-2">{m.year}</div>
                    <h4 className="text-xl font-black mb-2">{m.title}</h4>
                    <p className="text-muted-foreground font-semibold text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>

                <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "pl-16" : "pr-16"}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-32 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase">
              Đội ngũ <span className="text-[var(--primary)] italic">Dẫn dắt</span>
            </h2>
            <p className="font-bold opacity-80">
              Những chuyên gia hàng đầu với tâm huyết thay đổi tư duy học ngoại ngữ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((t, i) => (
              <div key={i} className="group text-center">
                <img
                  className="w-48 h-48 mx-auto rounded-full border-4 border-muted/20 group-hover:border-[var(--primary)] transition-all duration-500 mb-8 object-cover"
                  src={t.img}
                  alt={t.name}
                />
                <h4 className="text-2xl font-black mb-2">{t.name}</h4>
                <p className="text-[var(--primary)] font-bold text-xs uppercase tracking-[0.2em] mb-4">{t.role}</p>
                <p className="text-muted-foreground text-sm font-semibold italic opacity-80">"{t.achievement}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-32 container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-foreground">
            Tại sao chọn <span className="text-[var(--primary)]">SOLARN</span>?
          </h2>
          <p className="text-muted-foreground font-bold italic">
            Những lý do khiến hàng ngàn học viên tin tưởng và lựa chọn chúng tôi.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: GraduationCap,
              title: "Giảng viên xuất sắc",
              desc: "Đội ngũ giảng viên giàu kinh nghiệm, đạt chứng chỉ quốc tế IELTS 8.0+, TOEFL iBT 110+.",
            },
            {
              icon: BookOpen,
              title: "Lộ trình cá nhân hóa",
              desc: "Chương trình học được thiết kế riêng theo trình độ và mục tiêu của từng học viên.",
            },
            {
              icon: Star,
              title: "Công nghệ hiện đại",
              desc: "Hệ thống LMS thông minh giúp theo dõi tiến độ và phân tích điểm mạnh, điểm yếu.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
              <div className="size-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--primary)] group-hover:text-white transition-all">
                <item.icon className="size-7 text-[var(--primary)] group-hover:text-white transition-all" />
              </div>
              <h4 className="text-xl font-black mb-3">{item.title}</h4>
              <p className="text-muted-foreground font-semibold text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-32 container mx-auto px-6">
        <div className="bg-[var(--primary)] rounded-[4rem] p-16 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-[var(--primary)]/30">
          <div className="absolute -top-20 -right-20 size-64 bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 size-64 bg-[var(--secondary)]/20 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <Quote className="size-12 text-white/20 mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-black italic leading-relaxed mb-8">
              "SOLARN không chỉ dạy tiếng Anh — chúng tôi xây dựng sự tự tin và mở ra
              cánh cửa cơ hội toàn cầu cho mỗi học viên."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="size-14 rounded-full overflow-hidden border-2 border-white/30">
                <img src="https://i.pinimg.com/1200x/6a/47/75/6a47752306a5d521c155c3970534fc32.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="font-black">Ms. Thúy Hoài</p>
                <p className="text-sm text-white/60 font-bold">Founder & Head of IELTS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 mb-32">
        <div className="bg-gradient-to-br from-[var(--primary)] to-[#1a237e] rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-20 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-tight">
              Bắt đầu hành trình
            </h2>
            <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-bold italic">
              Tham gia cùng hơn 10,000 học viên đã thành công tại SOLARN.
            </p>
            <Button
              onClick={() => router.push("/auth/register")}
              className="bg-white text-[var(--primary)] hover:bg-accent text-xl font-black px-12 h-20 rounded-2xl shadow-xl transition-all hover:scale-105 border-none"
            >
              Đăng ký tư vấn miễn phí
              <ChevronRight className="ml-2 size-6" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
