"use client";

import { Quote, StarIcon } from "lucide-react";
import { UserAvatar } from "./user-avatar";

interface FeedbackCardProps {
  studentName: string;
  avatarUrl?: string | null;
  gender?: string | null;
  target: string;
  content: string;
  starRating: number;
  createdAt?: string;
}

export function FeedbackCard({
  studentName,
  avatarUrl,
  gender,
  target,
  content,
  starRating,
  createdAt,
}: FeedbackCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div>
        <Quote className="size-8 text-primary/20 mb-4" />

        <div className="flex items-center gap-0.5 mb-3">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon
              key={i}
              className={`size-4 ${i < starRating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`}
            />
          ))}
        </div>

        <div className="bg-gray-50 p-4 rounded-2xl relative text-sm text-gray-700 leading-relaxed italic mb-4">
          &ldquo;{content}&rdquo;
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <UserAvatar avatarUrl={avatarUrl} fullName={studentName} gender={gender} className="size-10" />
        <div className="min-w-0">
          <p className="font-bold text-gray-900 text-sm truncate">{studentName}</p>
          <p className="text-[11px] text-secondary font-semibold truncate">{target}</p>
          {createdAt && (
            <p className="text-[10px] text-gray-400 font-medium mt-0.5">
              {new Date(createdAt).toLocaleDateString("vi-VN")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
