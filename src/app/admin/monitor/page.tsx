"use client"

import React, { useState } from "react";
import { 
  UsersIcon, 
  UserMinusIcon, 
  BookOpenIcon, 
  MapPinIcon, 
  UserIcon,
  LayoutGridIcon,
  CoffeeIcon // Icon đại diện cho phòng trống
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const roomData = [
  {
    roomId: "R-101",
    roomName: "Phòng 101",
    branch: "Chi nhánh Quận 1",
    teacher: "Nguyễn Văn An",
    subject: "IELTS Intensive",
    totalStudents: 15,
    absentStudents: 2,
    status: "In Progress"
  },
  {
    roomId: "R-102",
    roomName: "Phòng 102",
    branch: "Chi nhánh Quận 1",
    teacher: "", // Trống giáo viên
    subject: "", // Trống môn học
    totalStudents: 0,
    absentStudents: 0,
    status: "Available"
  },
  {
    roomId: "103",
    roomName: "Phòng 103",
    branch: "Chi nhánh Bình Thạnh",
    teacher: "Trần Minh Tâm",
    subject: "TOEIC Target 750",
    totalStudents: 25,
    absentStudents: 5,
    status: "In Progress"
  },
  {
    roomId: "201",
    roomName: "Phòng 201",
    branch: "Chi nhánh Quận 1",
    teacher: "", 
    subject: "", 
    totalStudents: 0,
    absentStudents: 0,
    status: "Available"
  },
  {
    roomId: "R-201",
    roomName: "Phòng 202",
    branch: "Chi nhánh Bình Thạnh",
    teacher: "Trần Minh Tâm",
    subject: "TOEIC Target 750",
    totalStudents: 25,
    absentStudents: 5,
    status: "In Progress"
  },
  {
    roomId: "R-201",
    roomName: "Phòng 203",
    branch: "Chi nhánh Bình Thạnh",
    teacher: "Trần Minh Tâm",
    subject: "TOEIC Target 750",
    totalStudents: 25,
    absentStudents: 5,
    status: "In Progress"
  }
];

export default function AdminRoomMonitor() {
  const [selectedBranch, setSelectedBranch] = useState("all");

  const filteredRooms = selectedBranch === "all" 
    ? roomData 
    : roomData.filter(room => room.branch === selectedBranch);

  return (
    <div className="flex flex-col gap-6 w-full mb-10">
      
      {/* FILTER HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center">
            <LayoutGridIcon className="size-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tighter text-gray-900">Giám sát phòng học</h2>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Realtime Status</p>
          </div>
        </div>

        <Select onValueChange={setSelectedBranch} defaultValue="all">
          <SelectTrigger className="w-[200px] h-10 rounded-xl border-gray-200 bg-white font-bold">
            <SelectValue placeholder="Tất cả chi nhánh" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-gray-100">
            <SelectItem value="all">Tất cả chi nhánh</SelectItem>
            <SelectItem value="Chi nhánh Quận 1">Chi nhánh Quận 1</SelectItem>
            <SelectItem value="Chi nhánh Bình Thạnh">Chi nhánh Bình Thạnh</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ROOM GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRooms.map((room) => {
          const isEmpty = !room.teacher || !room.subject;

          return (
            <div 
              key={room.roomId} 
              className={`bg-white rounded-[2rem] p-6 border transition-all relative overflow-hidden group ${
                isEmpty ? "border-gray-100 opacity-80" : "border-gray-100 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Status Tag */}
              <div className="absolute top-6 right-6 flex items-center gap-2">
                {isEmpty ? (
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter italic">Trống</span>
                ) : (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">Live</span>
                  </>
                )}
              </div>

              <h3 className={`text-lg font-black mb-1 ${isEmpty ? "text-gray-400" : "text-gray-900 group-hover:text-primary"}`}>
                {room.roomName}
              </h3>
              <div className="flex items-center gap-1.5 text-gray-400 mb-5">
                <MapPinIcon className="size-3" />
                <span className="text-[10px] font-bold uppercase tracking-tight">{room.branch}</span>
              </div>

              {isEmpty ? (
                /* HIỂN THỊ KHI PHÒNG TRỐNG */
                <div className="flex flex-col items-center justify-center py-10 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                   <CoffeeIcon className="size-8 text-gray-200 mb-2" />
                   <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Hiện không có lớp</span>
                </div>
              ) : (
                /* HIỂN THỊ KHI ĐANG CÓ LỚP */
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/50 border border-gray-50">
                    <BookOpenIcon className="size-4 text-primary" />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-400 uppercase leading-none mb-1">Môn giảng dạy</span>
                      <span className="text-xs font-bold text-gray-800 leading-none">{room.subject}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 px-3">
                    <UserIcon className="size-4 text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-400 uppercase leading-none mb-1">Giáo viên</span>
                      <span className="text-xs font-bold text-gray-700 leading-none">{room.teacher}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-dashed border-gray-100 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <UsersIcon className="size-4 text-blue-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-gray-800 leading-none">{room.totalStudents}</span>
                        <span className="text-[8px] font-bold text-gray-400 uppercase">Đang học</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-red-50 flex items-center justify-center">
                        <UserMinusIcon className="size-4 text-red-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-red-600 leading-none">{room.absentStudents}</span>
                        <span className="text-[8px] font-bold text-gray-400 uppercase">Vắng mặt</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}