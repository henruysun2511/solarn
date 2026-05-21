"use client";

import { ScheduleSession } from "@/schemas/schedule-session.schema";
import { Clock } from "lucide-react";
import { Button } from "../ui/button";
import { ClassSessionStatus } from "@/constants/type";
import { useRouter } from "next/navigation";

interface ScheduleItemProps {
    data: ScheduleSession;
    sessionIndex: number;
    onClick: () => void;
}

export function ScheduleItem({ data, sessionIndex, onClick }: ScheduleItemProps) {
    const router = useRouter();

    const handleViewDetail = (e: React.MouseEvent) => {
        // Ngăn chặn sự kiện click lan ra ngoài làm kích hoạt Dialog Update status
        e.stopPropagation();
        router.push(`/admin/sessions/${data.sessionId}`);
    };

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group hover:border-primary/30 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
            <div>
                <div className={`px-4 py-2 text-[10px] font-black text-center border-b uppercase tracking-widest ${data.status === ClassSessionStatus.ENDED
                    ? 'bg-emerald-50/60 text-emerald-600 border-emerald-100/50'
                    : data.status === ClassSessionStatus.IN_PROGRESS
                        ? 'bg-blue-50/60 text-blue-600 border-blue-100/50'
                        : 'bg-gray-50 text-gray-500 border-gray-100'
                    }`}>
                    Buổi #{sessionIndex}
                </div>
                <div className="p-5 space-y-3">
                    <div className="font-bold text-gray-800 text-sm leading-snug line-clamp-2 min-h-[36px]">
                        Ca học: {data.shiftCode}
                    </div>

                    <div className="font-bold text-gray-800 text-sm leading-snug line-clamp-2 min-h-[36px]">
                        Phòng: {data.class?.room?.roomCode}
                    </div>

                    <div className="font-bold text-gray-800 text-sm leading-snug line-clamp-2 min-h-[36px]">
                        Thời lượng học: {data.shift?.timeRange}
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
                            <Clock className="size-3.5 text-primary" />
                            <span>{new Date(data.studyDate).toLocaleDateString("vi-VN")}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 pb-5">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={handleViewDetail}
                    className="w-full h-9 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 hover:bg-primary hover:text-white transition-all p-0"
                >
                    Chi tiết →
                </Button>
            </div>
        </div>
    );
}