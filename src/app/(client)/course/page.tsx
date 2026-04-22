"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    BookOpen,
    ChevronRight,
    Clock,
    Search,
    Sparkles,
    Star
} from "lucide-react";

// Dữ liệu mẫu khóa học
const courses = [
    {
        id: 1,
        title: "Tiếng Anh Giao Tiếp Thực Chiến",
        category: "Giao tiếp",
        price: 1200000,
        rating: 4.9,
        lessons: 24,
        duration: "3 tháng",
        image: "https://i.pinimg.com/736x/b6/95/53/b6955380e4940dd6e221cae7b8359dd6.jpg",
        teacher: { name: "Ms. Selena", avatar: "https://i.pinimg.com/736x/b6/95/53/b6955380e4940dd6e221cae7b8359dd6.jpg" }
    },
    {
        id: 2,
        title: "IELTS Breakthrough 7.5+",
        category: "IELTS",
        price: 3500000,
        rating: 5.0,
        lessons: 48,
        duration: "6 tháng",
        image: "https://i.pinimg.com/736x/1e/16/48/1e1648a93ef7e20d4f1f89e120c0226e.jpg",
        teacher: { name: "Mr. Darko", avatar: "https://i.pinimg.com/736x/1e/16/48/1e1648a93ef7e20d4f1f89e120c0226e.jpg" }
    },
    {
        id: 3,
        title: "Tiếng Anh Cho Người Mất Gốc",
        category: "Cơ bản",
        price: 850000,
        rating: 4.8,
        lessons: 30,
        duration: "2 tháng",
        image: "https://i.pinimg.com/1200x/88/55/e3/8855e3fee0f6631b1582f0c4013f2517.jpg",
        teacher: { name: "Ms. Lan Anh", avatar: "https://i.pinimg.com/1200x/88/55/e3/8855e3fee0f6631b1582f0c4013f2517.jpg" }
    },
    {
        id: 4,
        title: "Business English Masterclass",
        category: "Business",
        price: 2800000,
        rating: 4.7,
        lessons: 36,
        duration: "4 tháng",
        image: "https://i.pinimg.com/1200x/12/87/04/1287049f6970ae94903c28df1bbb6e0a.jpg",
        teacher: { name: "Mr. James", avatar: "https://i.pinimg.com/1200x/12/87/04/1287049f6970ae94903c28df1bbb6e0a.jpg" }
    },
    {
        id: 5,
        title: "Luyện phát âm chuẩn Mỹ",
        category: "Giao tiếp",
        price: 990000,
        rating: 4.9,
        lessons: 15,
        duration: "1.5 tháng",
        image: "https://i.pinimg.com/1200x/80/91/1b/80911b292076190dde4ebb4c0f09b3fd.jpg",
        teacher: { name: "Ms. Rose", avatar: "https://i.pinimg.com/1200x/80/91/1b/80911b292076190dde4ebb4c0f09b3fd.jpg" }
    },
    {
        id: 6,
        title: "TOEIC Target 800+ cấp tốc",
        category: "TOEIC",
        price: 2200000,
        rating: 4.6,
        lessons: 40,
        duration: "3 tháng",
        image: "https://i.pinimg.com/1200x/df/fb/5c/dffb5cde4038f7c0cdb2012b90fcecc8.jpg",
        teacher: { name: "Mr. Hoang", avatar: "https://i.pinimg.com/1200x/df/fb/5c/dffb5cde4038f7c0cdb2012b90fcecc8.jpg" }
    }
];

export default function CoursePage() {
    return (
        <div data-role="student" className="min-h-screen bg-[var(--dashboard-bg)] pb-20 font-sans">

            <section className="relative min-h-[450px] flex items-center overflow-hidden bg-[var(--primary)] text-white py-16">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-20 pointer-events-none" />
                <div className="absolute -top-24 -right-24 size-96 bg-[var(--secondary)] rounded-full blur-[120px] opacity-10" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">

                        {/* LEFT CONTENT: Focus vào tiêu đề và thống kê nhanh */}
                        <div className="w-full lg:w-3/5 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <Sparkles className="size-4 text-[var(--secondary)]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Khám phá tri thức</span>
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
                                Danh sách <span className="text-[var(--secondary)]">Khóa học</span> <br />
                                Chuyên sâu
                            </h1>

                            <p className="text-base text-white/70 font-medium max-w-xl mx-auto lg:mx-0">
                                Từ mất gốc đến chuyên gia, chúng tôi có mọi lộ trình bạn cần.
                                Sử dụng bộ lọc thông minh bên dưới để tìm khóa học phù hợp với trình độ của bạn ngay hôm nay.
                            </p>

                            <div className="flex flex-wrap items-center gap-8 pt-4 justify-center lg:justify-start">
                                <div>
                                    <div className="text-3xl font-black text-[var(--secondary)]">100+</div>
                                    <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Khóa học</div>
                                </div>
                                <div className="w-px h-10 bg-white/10 hidden sm:block" />
                                <div>
                                    <div className="text-3xl font-black text-white">24/7</div>
                                    <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Hỗ trợ 1:1</div>
                                </div>
                                <div className="w-px h-10 bg-white/10 hidden sm:block" />
                                <div>
                                    <div className="text-3xl font-black text-white">Cam kết</div>
                                    <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Đầu ra bằng văn bản</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-2/5 relative">
                            <div className="relative z-10 w-full max-w-[380px] mx-auto">
                                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border-8 border-white/10 shadow-2xl -rotate-2">
                                    <img
                                        src="https://i.pinimg.com/1200x/12/87/04/1287049f6970ae94903c28df1bbb6e0a.jpg"
                                        className="w-full h-full object-cover"
                                        alt="Students"
                                    />
                                </div>

                                <div className="absolute top-10 -right-6 bg-[var(--secondary)] text-[var(--primary)] px-6 py-3 rounded-2xl shadow-xl rotate-6 flex items-center gap-2">
                                    <Star className="size-4 fill-current" />
                                    <span className="font-black text-sm">4.9/5 Rating</span>
                                </div>

                                <div className="absolute bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl -rotate-6 flex items-center gap-3">
                                    <div className="size-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <BookOpen className="size-5 text-[var(--primary)]" />
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-black text-gray-400 uppercase leading-none">Phân loại</div>
                                        <div className="text-xs font-black text-gray-900 uppercase tracking-tight">Đa dạng trình độ</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 mt-10 relative z-20">
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 mb-12">
                    <div className="flex flex-col lg:flex-row gap-8">

                        <div className="lg:w-1/4 space-y-8">

                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-300" />
                                <Input
                                    placeholder="Tìm khóa học..."
                                    className="h-12 pl-12 rounded-xl border-none bg-gray-50 focus-visible:ring-[var(--primary)]"
                                />
                            </div>


                            <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider">Thể loại</h4>
                                {["Giao tiếp", "IELTS", "TOEIC", "Tiếng Anh Cơ Bản", "Business English"].map((cat) => (
                                    <div key={cat} className="flex items-center space-x-3">
                                        <Checkbox id={cat} className="rounded-md border-gray-200 data-[state=checked]:bg-[var(--primary)]" />
                                        <label htmlFor={cat} className="text-sm font-bold text-gray-500 cursor-pointer">{cat}</label>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider mb-4">Sắp xếp theo giá</h4>
                                <Select>
                                    <SelectTrigger className="h-12 rounded-xl border-none bg-gray-50 font-bold">
                                        <SelectValue placeholder="Chọn thứ tự" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-gray-100">
                                        <SelectItem value="low">Giá từ thấp đến cao</SelectItem>
                                        <SelectItem value="high">Giá từ cao đến thấp</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="lg:w-3/4">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black tracking-tighter">Tất cả khóa học</h2>
                                <span className="text-xs font-bold text-gray-400">Hiển thị {courses.length} kết quả</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {courses.map((course) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <section className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black tracking-tighter text-gray-900">Tiếng Anh Cơ Bản</h2>
                            <p className="text-gray-400 font-medium">Khởi đầu vững chắc cho hành trình mới</p>
                        </div>
                        <Button variant="ghost" className="rounded-xl font-black text-[var(--primary)] gap-2">
                            Xem tất cả <ChevronRight className="size-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {courses.concat(courses).slice(0, 4).map((course, idx) => (
                            <CourseCard key={idx} course={course} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

// Component Card Khóa học
function CourseCard({ course }: { course: any }) {
    return (
        <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            {/* Ảnh trên cùng */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                    <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest">{course.category}</span>
                </div>
            </div>

            {/* Thông tin khóa học */}
            <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                    <Star className="size-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-[11px] font-black">{course.rating}</span>
                </div>
                <h3 className="text-lg font-black leading-tight text-gray-900 mb-4 group-hover:text-[var(--primary)] transition-colors">
                    {course.title}
                </h3>

                <div className="flex items-center justify-between text-gray-400 mb-6">
                    <div className="flex items-center gap-1.5">
                        <BookOpen className="size-3" />
                        <span className="text-[10px] font-bold uppercase">{course.lessons} bài học</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="size-3" />
                        <span className="text-[10px] font-bold uppercase">{course.duration}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-dashed border-gray-100">
                    <div className="flex items-center gap-2">
                        <img src={course.teacher.avatar} alt={course.teacher.name} className="size-8 rounded-full border-2 border-white shadow-sm" />
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-gray-400 uppercase leading-none mb-1">Giảng viên</span>
                            <span className="text-xs font-bold text-gray-700 leading-none">{course.teacher.name}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-lg font-black text-[var(--primary)]">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}