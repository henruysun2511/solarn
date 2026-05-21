"use client";

import { StarIcon } from "lucide-react";

interface FeedbackCardProps {
  studentName: string;
  avatarUrl?: string | null;
  className: string;
  courseName: string;
  content: string;
  starRating: number;
  createdAt: string;
}

export function FeedbackCard({
  studentName,
  avatarUrl,
  className,
  courseName,
  content,
  starRating,
  createdAt,
}: FeedbackCardProps) {
  const initials = studentName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center font-black text-sm">
            {avatarUrl ? (
              <img src={avatarUrl} alt={studentName} className="size-10 rounded-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-sm truncate">{studentName}</p>
            <p className="text-[11px] text-gray-400 font-medium truncate">{courseName}</p>
          </div>
        </div>

        <div className="flex items-center gap-0.5 mb-3">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon
              key={i}
              className={`size-4 ${i < starRating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`}
            />
          ))}
        </div>

        <div className="bg-gray-50 p-4 rounded-2xl relative text-sm text-gray-700 leading-relaxed italic">
          &ldquo;{content}&rdquo;
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 text-[11px] text-gray-400 font-medium">
        <span>{new Date(createdAt).toLocaleDateString("vi-VN")}</span>
        <span className="text-gray-200">•</span>
        <span className="truncate">{className}</span>
      </div>
    </div>
  );
}
