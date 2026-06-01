"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClassSessionStatus } from "@/constants/type";
import { CalendarIcon, SearchIcon, Users, XIcon } from "lucide-react";
import { useState } from "react";

interface AttendanceFilterProps {
  onSearch: (value: string) => void;
  onFilterChange: (filters: Record<string, any>) => void;
  classOptions: { classId: string; displayName: string }[];
  selectedClassId: string;
  sessions: any[];
  selectedSessionId: string;
  selectedSession: any;
}

export function AttendanceFilter({
  onSearch,
  onFilterChange,
  classOptions,
  selectedClassId,
  sessions,
  selectedSessionId,
  selectedSession,
}: AttendanceFilterProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const clearSearch = () => {
    setSearchValue("");
    onSearch("");
  };

  const isEnded = selectedSession?.status === ClassSessionStatus.ENDED;
  const isInProgress = selectedSession?.status === ClassSessionStatus.IN_PROGRESS;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Filter bar */}
      <div className="p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative w-[220px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input
              placeholder="Tìm học viên..."
              className="pl-9 h-10 border-gray-300 bg-white pr-9"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XIcon className="size-4" />
              </button>
            )}
          </form>

          {/* Class Select */}
          <Select
            value={selectedClassId}
            onValueChange={(val) => {
              onFilterChange({ classId: val, sessionId: "" });
            }}
          >
            <SelectTrigger className="w-[240px] h-10 border-gray-300 bg-white shadow-sm">
              <SelectValue placeholder="Chọn lớp học" />
            </SelectTrigger>
            <SelectContent data-role="teacher">
              {classOptions.map((c) => (
                <SelectItem key={c.classId} value={c.classId}>
                  {c.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          {selectedSession && (
            <>
              <Users className="size-4" />
              <span className="font-medium">
                Đã chọn: {new Date(selectedSession.studyDate).toLocaleDateString("vi-VN")}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Session cards */}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {sessions.length === 0 ? (
            <div className="flex items-center justify-center w-full py-12 text-slate-400 font-bold">
              {selectedClassId ? "Không có buổi học nào" : "Vui lòng chọn lớp học"}
            </div>
          ) : (
            sessions.map((session: any) => {
              const isActive = session.sessionId === selectedSessionId;
              const sessionStatus = session.status;
              return (
                <div
                  key={session.sessionId}
                  onClick={() => onFilterChange({ sessionId: session.sessionId })}
                  className={`min-w-[280px] rounded-2xl border-2 cursor-pointer transition-all shrink-0 hover:shadow-md p-4 flex flex-col gap-3 ${isActive
                    ? "border-red-500 bg-red-50/30"
                    : "border-transparent bg-white shadow-sm"
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div
                      className={`p-2 rounded-lg ${isActive ? "bg-red-600 text-white" : "bg-gray-100 text-gray-500"
                        }`}
                    >
                      <CalendarIcon className="size-4" />
                    </div>
                    <Badge
                      className={`border-none rounded-full px-3 font-black text-[9px] uppercase ${sessionStatus === ClassSessionStatus.ENDED
                        ? "bg-green-100 text-green-600"
                        : sessionStatus === ClassSessionStatus.IN_PROGRESS
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-400"
                        }`}
                    >
                      {sessionStatus === ClassSessionStatus.ENDED
                        ? "Hoàn thành"
                        : sessionStatus === ClassSessionStatus.IN_PROGRESS
                          ? "Đang học"
                          : "Sắp tới"}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-[var(--foreground)] leading-tight text-sm">
                    {session.shift?.shiftName || session.shiftCode}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                    <span>{new Date(session.studyDate).toLocaleDateString("vi-VN")}</span>
                    {session.shift?.timeRange && (
                      <>
                        <span>·</span>
                        <span>{session.shift.timeRange}</span>
                      </>
                    )}
                  </div>
                  {session.class?.room?.roomCode && (
                    <p className="text-[10px] font-semibold text-gray-400 uppercase">
                      {session.class.room.roomCode}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
