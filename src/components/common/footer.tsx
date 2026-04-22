"use client"

import {
    Mail,
    MapPin,
    Phone,
    SparklesIcon,
    Sun
} from "lucide-react";

export default function Footer() {
    return (
        <footer data-role="student" className="bg-white font-sans">
            <div className="w-full">

                {/* <div className="relative -mb-16 z-30">
                    <div className="bg-[var(--primary)] rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-900/20 flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 pointer-events-none" />

                        <div className="relative z-10 text-center lg:text-left">
                            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-2">
                                Sẵn sàng chinh phục Tiếng Anh?
                            </h3>
                            <p className="text-white/70 font-medium">
                                Đăng ký nhận lộ trình học và ưu đãi mới nhất từ Earth Center.
                            </p>
                        </div>

                        <div className="relative z-10 w-full lg:w-auto flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1 sm:w-80">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                                <Input
                                    placeholder="Email của bạn..."
                                    className="h-14 pl-12 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/40 focus-visible:ring-[var(--secondary)]"
                                />
                            </div>
                            <Button className="h-14 px-8 rounded-2xl bg-[var(--secondary)] text-[var(--primary)] font-black text-sm hover:scale-105 transition-transform shadow-xl">
                                Đăng ký ngay <ArrowRight className="ml-2 size-4" />
                            </Button>
                        </div>
                    </div>
                </div> */}

                {/* 2. MAIN FOOTER CONTENT */}
                <div className="bg-gray-50  pt-15 pb-12 px-8 md:px-16 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                        {/* Cột 1: Brand Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="size-12 rounded-2xl bg-[var(--primary)] flex items-center justify-center shadow-lg">
                                    <Sun className="size-6 text-white" />
                                </div>
                                <span className="text-2xl font-black tracking-tighter text-[var(--primary)] uppercase">
                                    SOLARN
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                Trung tâm Tiếng Anh SEG - Nơi kiến tạo thế hệ công dân toàn cầu với lộ trình học tập cá nhân hóa và công nghệ hiện đại.
                            </p>
                            <div className="flex gap-3">
                                {[
                                    {
                                        name: "Facebook",
                                        url: "https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg",
                                        href: "#"
                                    },
                                    {
                                        name: "Youtube",
                                        url: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
                                        href: "#"
                                    },
                                    {
                                        name: "Instagram",
                                        url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg",
                                        href: "#"
                                    }
                                ].map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        className="size-11 rounded-2xl bg-white border border-gray-100 flex items-center justify-center hover:border-[var(--primary)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                                    >
                                        <img
                                            src={social.url}
                                            alt={social.name}
                                            className="size-6 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Cột 2: Quick Links */}
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--primary)] mb-6 flex items-center gap-2">
                                <SparklesIcon className="size-3 text-[var(--secondary)]" /> Khám phá
                            </h4>
                            <ul className="space-y-4">
                                {["Khóa học IELTS", "Giao tiếp thực chiến", "Tiếng Anh trẻ em", "Luyện thi TOEIC", "Business English"].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)] transition-colors flex items-center gap-2 group">
                                            <div className="size-1 bg-gray-300 rounded-full group-hover:bg-[var(--primary)] group-hover:w-3 transition-all" />
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Cột 3: Support */}
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--primary)] mb-6">Hỗ trợ học viên</h4>
                            <ul className="space-y-4">
                                {["Hướng dẫn đăng ký", "Chính sách hoàn phí", "Lịch khai giảng", "Câu hỏi thường gặp", "Liên hệ hợp tác"].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm font-bold text-gray-500 hover:text-[var(--primary)] transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Cột 4: Contact */}
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--primary)] mb-6">Liên hệ</h4>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="size-10 rounded-xl bg-white flex-shrink-0 flex items-center justify-center border border-gray-100 shadow-sm">
                                        <MapPin className="size-4 text-[var(--secondary)]" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-500 leading-tight">
                                        Số 123 Đường Cầu Giấy, Quận Cầu Giấy, Hà Nội
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="size-10 rounded-xl bg-white flex-shrink-0 flex items-center justify-center border border-gray-100 shadow-sm">
                                        <Phone className="size-4 text-[var(--secondary)]" />
                                    </div>
                                    <p className="text-sm font-bold text-gray-900">0123.456.789</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="size-10 rounded-xl bg-white flex-shrink-0 flex items-center justify-center border border-gray-100 shadow-sm">
                                        <Mail className="size-4 text-[var(--secondary)]" />
                                    </div>
                                    <p className="text-sm font-bold text-gray-900">support@earthcenter.edu.vn</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. COPYRIGHT BAR */}
                    <div className="mt-20 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                            © 2026 SOLARN. Designed by Nhat Huy.
                        </p>
                        <div className="flex gap-8">
                            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[var(--primary)]">Privacy Policy</a>
                            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[var(--primary)]">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}