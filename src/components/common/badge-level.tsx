"use client";

import { CourseLevel } from "@/constants/type";

export function BadgeLevel({ level, className }: { level: string | CourseLevel; className?: string }) {
  const styles: Record<string, string> = {
    A1: "bg-green-100 text-green-600",
    A2: "bg-emerald-100 text-emerald-600",
    B1: "bg-blue-100 text-blue-600",
    B2: "bg-sky-100 text-sky-600",
    C1: "bg-purple-100 text-purple-600",
    C2: "bg-pink-100 text-pink-600",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
        styles[level] || "bg-gray-100 text-gray-500"
      } ${className || ""}`}
    >
      {level}
    </span>
  );
}
