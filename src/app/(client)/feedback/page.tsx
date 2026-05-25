"use client";

import { FeedbackCard } from "@/components/common/feedback-card";
import { Button } from "@/components/ui/button";
import { useGetFeaturedFeedbacks } from "@/queries/useFeedbackQuery";
import {
    BadgeCheck,
    ChevronRight,
    MessageSquareQuote,
    Quote,
    Star,
    Users
} from "lucide-react";

const testimonials = [
    {
        quote: "Hệ thống LMS thông minh giúp tôi theo dõi từng kỹ năng mỗi ngày. Sau 3 tháng, kỹ năng Listening của tôi đã cải thiện rõ rệt.",
        author: "Nguyễn Minh Anh",
        role: "Học viên IELTS Intensive",
        image: "https://i.pinimg.com/1200x/75/48/d8/7548d8bc381f16d63836e6a0ba7aecbe.jpg",
    },
    {
        quote: "Phương pháp giảng dạy ở đây rất khác biệt. Tôi không chỉ học tiếng Anh mà còn học cách tư duy bằng tiếng Anh.",
        author: "Trần Hoàng Long",
        role: "Học viên Communication Plus",
        image: "https://i.pinimg.com/1200x/89/0c/c2/890cc25d844b9181e734b0b8a1954540.jpg",
    },
    {
        quote: "Đội ngũ Mentor sửa bài Writing cực kỳ chi tiết. Tôi đã tăng từ 5.5 lên 7.0 Writing chỉ sau 2 tháng.",
        author: "Lê Thị Phương",
        role: "Học viên IELTS Intensive",
        image: "https://i.pinimg.com/1200x/1d/1c/86/1d1c867861498321a988765e3268fbcf.jpg",
    },
    {
        quote: "Môi trường học tập chuyên nghiệp, cơ sở vật chất hiện đại. Tôi cảm thấy mỗi buổi học đều rất hiệu quả.",
        author: "Phạm Quốc Bảo",
        role: "Học viên Pre-IELTS Foundation",
        image: "https://i.pinimg.com/1200x/a9/cc/af/a9ccaf53afe5d50c87c0ba1d6a36d34f.jpg",
    },
];

export default function FeedbackPage() {
    const { data: featuredFeedbacks, isLoading } = useGetFeaturedFeedbacks();

    return (
        <div className="flex flex-col min-h-screen bg-[var(--dashboard-bg)] font-sans antialiased text-foreground">

            {/* HERO BANNER */}
            <section className="relative min-h-[500px] flex items-center overflow-hidden bg-gradient-to-br from-[var(--primary)] via-[var(--primary)] to-[#1a237e] text-white py-20">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-20 pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 size-96 bg-[var(--secondary)] rounded-full blur-[150px] opacity-15" />
                <div className="absolute top-1/2 right-10 size-48 bg-white/5 rounded-full blur-[80px]" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-3/5 space-y-8 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <MessageSquareQuote className="size-4 text-[var(--secondary)]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Phản hồi từ học viên</span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
                                Học viên nói gì về <br />
                                <span className="text-[var(--secondary)]">SOLARN</span>?
                            </h1>

                            <p className="text-lg text-white/70 font-medium max-w-xl mx-auto lg:mx-0">
                                Hơn 10,000+ học viên đã tin tưởng và đạt được mục tiêu tại SOLARN.
                                Những chia sẻ dưới đây là minh chứng rõ ràng nhất cho chất lượng đào tạo của chúng tôi.
                            </p>

                            <div className="flex flex-wrap items-center gap-8 pt-4 justify-center lg:justify-start">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                        <Users className="size-6 text-[var(--secondary)]" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black leading-none">10,000+</div>
                                        <div className="text-[10px] font-bold text-white/50 uppercase">Học viên</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                        <Star className="size-6 text-[var(--secondary)] fill-[var(--secondary)]" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black leading-none">4.9/5.0</div>
                                        <div className="text-[10px] font-bold text-white/50 uppercase">Đánh giá</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                        <BadgeCheck className="size-6 text-[var(--secondary)]" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black leading-none">95%</div>
                                        <div className="text-[10px] font-bold text-white/50 uppercase">Hài lòng</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-2/5 relative">
                            <div className="relative z-10 w-full aspect-square max-w-[400px] mx-auto">
                                <div className="w-full h-full rounded-[3rem] overflow-hidden border-[12px] border-white/10 shadow-2xl -rotate-3">
                                    <img
                                        src="https://i.pinimg.com/1200x/62/c4/c9/62c4c900fa30b311edac4a92a638a9be.jpg"
                                        className="w-full h-full object-cover scale-110"
                                        alt="Happy students"
                                    />
                                </div>
                                <div className="absolute -bottom-8 -left-8 bg-white p-5 rounded-[2rem] shadow-2xl flex items-center gap-4">
                                    <div className="size-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                                        <Quote className="size-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-gray-400 uppercase">Phản hồi</div>
                                        <div className="text-lg font-black text-gray-900 leading-none">1,200+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIAL MARKETING SECTIONS */}
            <section className="py-32 space-y-32">
                {testimonials.map((t, i) => (
                    <div
                        key={i}
                        className={`container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
                    >
                        <div className={`space-y-8 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                            <div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full border border-secondary/20">
                                <Quote className="size-3 text-secondary" />
                                <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">
                                    Câu chuyện thành công
                                </span>
                            </div>
                            <div className="relative">
                                <Quote className="size-12 text-primary/10 absolute -top-4 -left-4" />
                                <p className="text-2xl md:text-3xl font-bold text-foreground italic leading-relaxed relative z-10 pl-8">
                                    &ldquo;{t.quote}&rdquo;
                                </p>
                            </div>
                            <div className="flex items-center gap-4 pt-4">
                                <div className="size-14 rounded-full overflow-hidden border-2 border-primary/20">
                                    <img src={t.image} alt={t.author} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-black text-foreground text-lg">{t.author}</p>
                                    <p className="text-sm font-semibold text-secondary">{t.role}</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {Array.from({ length: 5 }, (_, s) => (
                                    <Star key={s} className="size-5 text-amber-400 fill-amber-400" />
                                ))}
                            </div>
                        </div>
                        <div className={`${i % 2 === 1 ? "lg:order-1" : ""} ${i % 2 === 0 ? "bg-gradient-to-br from-primary/5 to-secondary/5" : "bg-gradient-to-br from-secondary/5 to-primary/5"} rounded-[4rem] aspect-[4/3] relative overflow-hidden shadow-xl`}>
                            <img
                                src={t.image}
                                alt={t.author}
                                className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                        <BadgeCheck className="size-4 text-secondary" />
                                        Học viên đã hoàn thành khóa học
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* FEATURED FEEDBACKS GRID */}
            <section className="pb-32 container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-foreground">
                        Đánh giá <span className="text-primary">Nổi bật</span>
                    </h2>
                    <p className="text-muted-foreground font-bold italic">
                        Những phản hồi chân thực từ học viên đã và đang học tập tại SOLARN.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="size-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                ) : featuredFeedbacks && featuredFeedbacks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(featuredFeedbacks as any[]).map((fb: any) => {
                            const studentName = fb.student?.profile?.fullName || fb.studentId?.substring(0, 8) || "Học viên";
                            const target = fb.class?.course?.courseName || "---";
                            return (
                                <FeedbackCard
                                    key={fb.feedbackId}
                                    studentName={studentName}
                                    avatarUrl={fb.student?.profile?.avatarUrl}
                                    gender={fb.student?.profile?.gender}
                                    target={target}
                                    content={fb.content}
                                    starRating={fb.starRating}
                                    createdAt={fb.createdAt}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <MessageSquareQuote className="size-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-bold text-lg">Chưa có đánh giá nổi bật nào.</p>
                        <p className="text-gray-400 text-sm mt-2">Các đánh giá sẽ được hiển thị tại đây sau khi được quản trị viên phê duyệt.</p>
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="container mx-auto px-6 mb-32">
                <div className="bg-primary rounded-[4rem] p-16 md:p-20 text-center text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/40">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-20 pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-tight">
                            Bạn đã sẵn sàng?
                        </h2>
                        <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto font-bold italic">
                            Hãy tham gia cùng hơn 10,000 học viên đang chinh phục tiếng Anh mỗi ngày.
                        </p>
                        <Button className="bg-background text-primary hover:bg-accent text-lg font-black px-10 h-16 rounded-2xl shadow-xl transition-all hover:scale-105 border-none">
                            Đăng ký tư vấn ngay <ChevronRight className="ml-2 size-5" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
