import { getLevelLabel } from "@/constants/label";
import { Course } from "@/schemas/course.schema";
import { BookOpen, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export function CourseCard({ course }: { course: Course }) {
    const router = useRouter();

    return (
        <div className="bg-white cursor-pointer rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between h-full"
            onClick={() => router.push(`/course-2/${course.courseId}`)}>
            <div>
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"}
                        alt={course.courseName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {course.level && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-gray-100">
                            <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest">
                                {course.level}
                            </span>
                        </div>
                    )}
                </div>

                <div className="p-6">
                    <h3 className="text-lg font-black leading-tight text-gray-900 mb-4 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                        {course.courseName}
                    </h3>

                    {course.description && (
                        <p className="text-xs text-gray-500 font-medium leading-relaxed mb-4 line-clamp-2">
                            {course.description}
                        </p>
                    )}

                    <div className="flex items-center justify-between text-gray-400 mb-6">
                        <div className="flex items-center gap-1.5">
                            <BookOpen className="size-3" />
                            <span className="text-[10px] font-bold uppercase">{course.totalSessions} buổi</span>
                        </div>
                        {course.level && (
                            <div className="flex items-center gap-1.5">
                                <Clock className="size-3" />
                                <span className="text-[10px] font-bold uppercase">{getLevelLabel(course.level)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-6 pb-6">
                <div className="flex items-center justify-between pt-5 border-t border-dashed border-gray-100">
                    {course.totalClasses !== undefined && (
                        <div className="flex items-center gap-2">
                            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <BookOpen className="size-3.5 text-primary" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-gray-400 uppercase leading-none mb-1">Lớp học</span>
                                <span className="text-xs font-bold text-gray-700 leading-none">{course.totalClasses} lớp</span>
                            </div>
                        </div>
                    )}
                    <div className="text-right ml-auto">
                        <span className="text-lg font-black text-[var(--primary)]">
                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(course.tuitionFee)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}