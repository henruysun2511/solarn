"use client";

import { Loading } from "@/components/common/loading";
import { UserAvatar } from "@/components/common/user-avatar";
import { useGetClassesByCourseId } from "@/queries/useClassQuery";

interface CourseTeacherTabProps {
  courseId: string;
}

export function CourseTeacherTab({ courseId }: CourseTeacherTabProps) {
  const { data: classesRes, isLoading } = useGetClassesByCourseId(courseId);
  const classes = classesRes?.data || [];

  // Extract unique teachers from the classes of this course
  const uniqueTeachersMap = new Map<string, any>();
  classes.forEach((cls: any) => {
    if (cls.teacher && cls.teacher.teacherId) {
      uniqueTeachersMap.set(cls.teacher.teacherId, {
        teacherId: cls.teacher.teacherId,
        teacherCode: cls.teacher.teacherCode,
        fullName: cls.teacher.profile?.fullName || "Giảng viên",
        avatarUrl: cls.teacher.profile?.avatarUrl,
        gender: cls.teacher.profile?.gender,
      });
    }
  });

  const teachers = Array.from(uniqueTeachersMap.values());

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden font-sans">
      <div className="p-6 border-b border-gray-50">
        <h3 className="text-xl font-black text-gray-900 tracking-tight">
          Đội ngũ giảng viên đứng lớp
        </h3>
        <p className="text-gray-400 text-xs font-medium mt-0.5">
          Nhân sự phụ trách giảng dạy thực tế cho các lớp thuộc chuyên ngành khóa học này.
        </p>
      </div>

      {isLoading ? (
        <Loading message="Đang tải thông tin giảng viên..." className="bg-white rounded-3xl" />
      ) : teachers.length === 0 ? (
        <div className="py-16 text-center text-xs font-black text-gray-400 uppercase tracking-widest bg-white">
          Không có giảng viên nào đứng lớp ở khóa này.
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-white">
          {teachers.map((teacher) => (
            <div
              key={teacher.teacherId}
              className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group flex flex-col justify-between items-stretch"
            >
              {/* Top Section */}
              <div className="flex items-start gap-4">
                <UserAvatar
                  avatarUrl={teacher.avatarUrl}
                  gender={teacher.gender}
                  fullName={teacher.fullName}
                  className="size-14 rounded-2xl border-2 border-gray-50 shadow-sm"
                />
                <div className="space-y-1">
                  <h3 className="font-black text-gray-800 text-base leading-tight">
                    {teacher.fullName}
                  </h3>
                  <p className="text-[10px] font-mono font-bold text-primary uppercase">
                    Code: {teacher.teacherCode}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
