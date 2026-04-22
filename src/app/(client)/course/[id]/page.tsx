"use client"

import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, CheckCircle2, Clock, Globe, Sparkle, Star, Users } from "lucide-react";

export default function CourseDetailPage() {
    return (
        <div className="min-h-screen bg-dashboard pb-20 font-sans">
            <section className="relative bg-[var(--primary)] text-white py-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-20 pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 size-96 bg-[var(--secondary)] rounded-full blur-[120px] opacity-10" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12">
                        <div className="max-w-3xl space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--secondary)]">Khóa học tiêu biểu</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                                Toeic <span className="text-[var(--secondary)]">Listening</span> <br /> & Reading
                            </h1>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center">
                                        <Users className="size-5 text-[var(--secondary)]" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-black leading-none">1,200+</div>
                                        <div className="text-[10px] font-bold text-white/50 uppercase">Học viên</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center">
                                        <Star className="size-5 text-[var(--secondary)] fill-[var(--secondary)]" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-black leading-none">4.9/5.0</div>
                                        <div className="text-[10px] font-bold text-white/50 uppercase">Đánh giá</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Pricing Card */}
                        <div className="bg-white p-8 rounded-[3rem] shadow-2xl min-w-[320px] text-gray-900 relative">
                            <div className="absolute -top-4 -right-4 bg-[var(--secondary)] text-[var(--primary)] px-4 py-1 rounded-xl font-black text-xs rotate-12 shadow-lg">
                                HOT DEAL -20%
                            </div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Học phí ưu đãi</div>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-4xl font-black text-[var(--primary)]">5.990k</span>
                                <span className="text-sm font-bold text-gray-300 line-through">7.500k</span>
                            </div>
                            <Button className="w-full h-16 rounded-2xl bg-[var(--primary)] text-white font-black text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-blue-200">
                                Đăng ký ngay
                            </Button>
                            <p className="text-[10px] text-center mt-4 font-bold text-gray-400">Cam kết hoàn tiền nếu không đạt đầu ra</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    <div className="lg:col-span-2 space-y-5">
                        <section className="bg-white p-10 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                                    <BookOpen className="size-7 text-[var(--primary)]" />
                                </div>
                                <h2 className="text-3xl font-black tracking-tight text-gray-900">Tổng quan khóa học</h2>
                            </div>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                Khóa học được thiết kế chuẩn hóa theo định dạng đề thi mới nhất, tập trung vào việc xây dựng nền tảng ngữ pháp, từ vựng và đặc biệt là kỹ năng xử lý bẫy trong phần thi Nghe và Đọc. Chúng tôi giúp bạn không chỉ đạt điểm số mong muốn mà còn thực sự làm chủ tiếng Anh trong môi trường công việc.
                            </p>
                        </section>

                        <section className="bg-white p-10 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                                    <Sparkle className="size-7 text-[var(--primary)]" />
                                </div>
                                <h2 className="text-3xl font-black tracking-tight text-gray-900">Giá trị nhận được</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                {[
                                    "Làm chủ 3000+ từ vựng TOEIC thông dụng",
                                    "Nắm vững 12 chủ điểm ngữ pháp cốt lõi",
                                    "Chiến thuật nghe hiểu vượt qua mọi bẫy",
                                    "Quản lý thời gian Reading hiệu quả"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="size-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-colors duration-300">
                                            <CheckCircle2 className="size-4 text-green-600 group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="font-bold text-gray-700 leading-tight">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white p-10 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                <div className="flex items-center gap-4">
                                    <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                        <Users className="size-7 text-[var(--primary)]" />
                                    </div>
                                    <h2 className="text-3xl font-black tracking-tight text-gray-900">Đối tượng tham gia</h2>
                                </div>

                                <p className="text-gray-400 font-bold text-sm max-w-xs italic md:text-right">
                                    Khóa học được tinh chỉnh để phù hợp với nhiều nhu cầu khác nhau.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { title: "Sinh viên", desc: "Cần TOEIC để xét tốt nghiệp.", icon: BookOpen, bg: "bg-blue-50", color: "text-blue-600" },
                                    { title: "Người đi làm", desc: "Muốn thăng tiến quốc tế.", icon: Globe, bg: "bg-purple-50", color: "text-purple-600" },
                                    { title: "Mất gốc", desc: "Bắt đầu lại từ con số 0.", icon: Star, bg: "bg-orange-50", color: "text-orange-600" }
                                ].map((item, i) => (
                                    <div key={i} className="group p-8 rounded-[2.5rem] bg-gray-50/50 border border-transparent hover:border-[var(--primary)]/20 hover:bg-white hover:shadow-xl transition-all duration-500">
                                        <div className={`size-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                                            <item.icon className="size-6" />
                                        </div>
                                        <h3 className="text-lg font-black text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-xs text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white p-10 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="size-14 rounded-2xl bg-orange-50 flex items-center justify-center">
                                    <Calendar className="size-7 text-orange-500" />
                                </div>
                                <h2 className="text-3xl font-black tracking-tight text-gray-900">Lịch khai giảng</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50">
                                            <th className="pb-5 text-left">Lớp học</th>
                                            <th className="pb-5 text-left">Thời gian</th>
                                            <th className="pb-5 text-center">Tình trạng</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {[
                                            { id: "Lớp 101", days: "Tối Thứ 2-4-6", time: "18:30 — 20:30", status: "Còn chỗ", color: "green" },
                                            { id: "Lớp 102", days: "Sáng Thứ 7-CN", time: "08:30 — 11:30", status: "Hết chỗ", color: "red" }
                                        ].map((row, i) => (
                                            <tr key={i} className="group">
                                                <td className="py-6">
                                                    <div className="font-black text-gray-900">{row.id}</div>
                                                    <div className="text-xs text-[var(--primary)] font-bold uppercase">{row.days}</div>
                                                </td>
                                                <td className="py-6 font-bold text-gray-500 text-sm">{row.time}</td>
                                                <td className="py-6 text-center">
                                                    <span className={`px-4 py-1.5 rounded-xl ${row.color === 'green' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'} text-[10px] uppercase font-black`}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className="bg-white p-10 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                                <div className="text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="size-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                        <span className="ml-3 font-black text-2xl text-gray-900">4.9</span>
                                    </div>
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="size-14 rounded-2xl bg-orange-50 flex items-center justify-center">
                                            <Star className="size-7 text-orange-500" />
                                        </div>
                                        <h2 className="text-3xl font-black tracking-tight text-gray-900">Học viên đánh giá</h2>
                                    </div>
                                </div>
                                <Button variant="outline" className="rounded-2xl border-2 border-gray-100 font-black h-14 px-8 hover:bg-gray-50 transition-all">
                                    Viết đánh giá
                                </Button>
                            </div>

                            <div className="space-y-6">
                                {[
                                    {
                                        name: "Nguyễn Hoàng Nam",
                                        date: "12/04/2026",
                                        content: "Giáo trình rất sát với đề thi thật. Mình đã tăng 200 điểm sau khóa học 2 tháng tại đây. Rất cảm ơn thầy Huy!",
                                        avatar: "https://i.pinimg.com/1200x/01/10/f7/0110f7b1bc55d2bf2132fb6ddf5a7408.jpg",
                                        tag: "Toeic 850+"
                                    },
                                    {
                                        name: "Trần Thị Thu Thảo",
                                        date: "05/04/2026",
                                        content: "Phương pháp dạy Listening cực kỳ hiệu quả, giúp mình không còn sợ các bẫy trong Part 1 và 2 nữa.",
                                        avatar: "https://i.pinimg.com/736x/a1/6b/50/a16b50f8eac91b0c953f6eb54f73aeec.jpg",
                                        tag: "Học viên xuất sắc"
                                    }
                                ].map((review, i) => (
                                    <div key={i} className="p-8 rounded-[2.5rem] bg-gray-50/50 border border-gray-50 flex flex-col md:flex-row gap-8 items-start hover:bg-white hover:border-[var(--primary)]/10 hover:shadow-xl transition-all duration-500">
                                        <div className="flex-shrink-0 flex md:flex-col items-center gap-4 text-center">
                                            <img src={review.avatar} className="size-16 rounded-2xl object-cover border-4 border-white shadow-md" alt="Avatar" />
                                            <div className="text-left md:text-center">
                                                <h4 className="font-black text-gray-900 leading-none mb-2">{review.name}</h4>
                                                <span className="text-[9px] font-black text-[var(--primary)] px-3 py-1 bg-white rounded-full border border-blue-50 uppercase tracking-tighter">{review.tag}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-1">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <Star key={s} className="size-3 fill-yellow-400 text-yellow-400" />
                                                    ))}
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-300 uppercase">{review.date}</span>
                                            </div>
                                            <p className="text-gray-600 font-medium leading-relaxed italic text-lg leading-relaxed">
                                                "{review.content}"
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>


                        </section>
                    </div>

                    {/* RIGHT COLUMN: Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-xl shadow-gray-50 group">
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src="https://i.pinimg.com/1200x/75/48/d8/7548d8bc381f16d63836e6a0ba7aecbe.jpg"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    alt="Course Thumbnail"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                    <span className="bg-[var(--secondary)] text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                                        Best Seller
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thời lượng</div>
                                        <div className="flex items-center gap-2 font-black text-gray-900">
                                            <Clock className="size-4 text-[var(--primary)]" /> 24 Giờ
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bài học</div>
                                        <div className="flex items-center gap-2 font-black text-gray-900">
                                            <BookOpen className="size-4 text-[var(--primary)]" /> 12 Buổi
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Trình độ</div>
                                        <div className="flex items-center gap-2 font-black text-gray-900">
                                            <Globe className="size-4 text-[var(--primary)]" /> 350 - 650+
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Chứng chỉ</div>
                                        <div className="flex items-center gap-2 font-black text-gray-900">
                                            <CheckCircle2 className="size-4 text-[var(--primary)]" /> Có
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-dashed border-gray-100">
                                    <div className="flex items-center justify-between text-sm font-bold">
                                        <span className="text-gray-400">Hình thức học:</span>
                                        <span className="text-[var(--primary)]">Offline tại trung tâm</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Instructor Card (Giữ nguyên) */}
                        <div className="bg-white rounded-[3rem] border border-gray-100 p-10 shadow-xl shadow-gray-50 text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-2 bg-[var(--primary)]" />
                            <div className="size-28 rounded-[2rem] overflow-hidden mb-6 mx-auto border-4 border-white shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                <img src="https://i.pinimg.com/1200x/75/48/d8/7548d8bc381f16d63836e6a0ba7aecbe.jpg" className="w-full h-full object-cover" alt="Teacher" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 leading-none mb-2">Mr. Nhật Huy</h3>
                            <p className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest mb-6 px-4 py-1 bg-blue-50 rounded-full inline-block">Toeic Expert (990)</p>
                            <p className="text-sm text-gray-500 font-bold italic leading-relaxed">
                                "Không chỉ là dạy mẹo, tôi giúp bạn thực sự thấu hiểu ngôn ngữ để bứt phá mọi giới hạn."
                            </p>
                        </div>

                        {/* Quick Benefits Card (Giữ nguyên) */}
                        <div className="bg-[var(--primary)] rounded-[3rem] p-10 text-white space-y-6">
                            <h4 className="text-xl font-black leading-tight">Tại sao chọn <br /> chúng tôi?</h4>
                            <div className="space-y-4">
                                {[
                                    { icon: Clock, text: "Học lại miễn phí" },
                                    { icon: Globe, text: "Tài liệu độc quyền" },
                                    { icon: Users, text: "Sĩ số tối đa 15" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center">
                                            <item.icon className="size-5 text-[var(--secondary)]" />
                                        </div>
                                        <span className="text-sm font-bold">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}