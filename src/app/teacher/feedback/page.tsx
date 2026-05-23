"use client";

import { DataPagination } from "@/components/common/data-pagination";
import { PaginationInfo } from "@/components/common/pagination-info";
import { SortOrder } from "@/constants/sort";
import { useGetMyFeedbacks } from "@/queries/useFeedbackQuery";
import { MyFeedbackParams } from "@/schemas/feedback.schema";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { FeedbackCard } from "@/components/common/feedback-card";
import { FeedbackFilter } from "./feedback-filter";

export default function TeacherFeedbackPage() {
  const [params, setParams] = useState<MyFeedbackParams>({
    page: 1,
    limit: 12,
    sortOrder: SortOrder.DESC,
    sortBy: "createdAt",
  });

  const { data, isLoading } = useGetMyFeedbacks(params);

  const feedbacks = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  const handleSearch = (value: string) => {
    setParams((prev) => ({ ...prev, search: value || undefined, page: 1 }));
  };

  const handleFilterChange = (filters: Partial<MyFeedbackParams>) => {
    setParams((prev) => ({ ...prev, ...filters }));
  };

  const extractStudentName = (fb: any): string => {
    return fb.student?.profile?.fullName || fb.studentId?.substring(0, 8) || "Học sinh";
  };

  const extractCourseName = (fb: any): string => {
    return fb.class?.course?.courseName || "---";
  };

  const extractClassName = (fb: any): string => {
    return fb.class?.roomCode ? `Lớp ${fb.class.roomCode}` : "---";
  };

  return (
    <div data-role="teacher" className="w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col gap-6 min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter">Đánh giá của học viên</h1>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">Giáo viên</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <FeedbackFilter
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onRowsPerPageChange={(limit) => setParams((prev) => ({ ...prev, limit, page: 1 }))}
          />

          {isLoading ? (
            <div className="p-10 text-center">
              <div className="size-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="p-10 text-center">
              <MessageSquare className="size-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-bold">Chưa có đánh giá nào.</p>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {feedbacks.map((fb: any) => (
                  <FeedbackCard
                    key={fb.feedbackId}
                    studentName={extractStudentName(fb)}
                    avatarUrl={fb.student?.profile?.avatarUrl}
                    gender={fb.student?.profile?.gender}
                    target={extractCourseName(fb)}
                    content={fb.content}
                    starRating={fb.starRating}
                    createdAt={fb.createdAt}
                  />
                ))}
              </div>
            </div>
          )}

          {!isLoading && feedbacks.length > 0 && (
            <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <PaginationInfo
                page={Number(params.page || 1)}
                limit={Number(params.limit || 12)}
                totalItems={totalItems}
                currentLength={feedbacks.length}
                label="đánh giá"
              />
              <DataPagination
                page={Number(params.page) || 1}
                totalPages={totalPages}
                onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
