"use client";

import { Input } from "@/components/ui/input";
import { AttendanceStatus } from "@/constants/type";
import { AttendanceRecord } from "@/schemas/attendance.schema";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

interface ColumnProps {
  attendanceValues: Record<string, AttendanceStatus>;
  onAttendanceChange: (recordId: string, status: AttendanceStatus) => void;
  onNoteChange: (recordId: string, note: string) => void;
  isEnded: boolean;
}

function NoteCell({ record, isEnded, onNoteChange }: { record: AttendanceRecord; isEnded: boolean; onNoteChange: (recordId: string, note: string) => void }) {
  const [value, setValue] = useState(record.note || "");
  const recordId = record.attendanceId || record.studentId;
  return (
    <div className="pl-10">
      <Input
        placeholder="Write note..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onNoteChange(recordId, e.target.value);
        }}
        className="h-9 border-gray-200 focus-visible:ring-primary w-[180px] text-black"
        disabled={isEnded}
      />
    </div>
  );
}

const attendanceOptions = [
  { label: "Hiện diện", value: AttendanceStatus.PRESENT, color: "text-green-600", border: "peer-checked:border-green-600" },
  { label: "Đi muộn", value: AttendanceStatus.LATE, color: "text-amber-500", border: "peer-checked:border-amber-500" },
  { label: "Vắng mặt", value: AttendanceStatus.ABSENT, color: "text-red-500", border: "peer-checked:border-red-500" },
];

export const getColumns = ({
  attendanceValues,
  onAttendanceChange,
  onNoteChange,
  isEnded,
}: ColumnProps): ColumnDef<AttendanceRecord>[] => [
  {
    id: "index",
    header: () => <span className="text-sm font-bold text-gray-700">S.L</span>,
    cell: ({ row }) => (
      <span className="text-gray-500 font-medium">
        {String(row.index + 1).padStart(2, "0")}
      </span>
    ),
  },
  {
    accessorKey: "student.studentCode",
    header: () => <span className="text-sm font-bold text-gray-700">Admission No</span>,
    cell: ({ row }) => (
      <span className="text-primary font-semibold">{row.original.student.studentCode}</span>
    ),
  },
  {
    id: "name",
    header: () => <span className="text-sm font-bold text-gray-700">Name</span>,
    cell: ({ row }) => {
      const profile = row.original.student?.profile;
      const fullName = profile?.fullName || "Unknown";
      return (
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center text-xs font-bold text-gray-500">
            {fullName.split(" ").pop()?.charAt(0) || "?"}
          </div>
          <div>
            <div className="font-semibold text-gray-800 leading-tight">{fullName}</div>
          </div>
        </div>
      );
    },
  },
  {
    id: "attendance",
    header: () => <span className="text-sm font-bold text-gray-700 text-center">Attendance</span>,
    cell: ({ row }) => {
      const record = row.original;
      const recordId = record.attendanceId || record.studentId;
      const currentStatus = attendanceValues[recordId] || record.status;
      return (
        <div className="flex items-center justify-center gap-4">
          {attendanceOptions.map((option) => {
            const isSelected = currentStatus === option.value;
            return (
              <label
                key={option.value}
                className={`flex items-center gap-2 cursor-pointer ${isEnded ? "pointer-events-none opacity-60" : "group"}`}
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name={`attendance-${recordId}`}
                    checked={isSelected}
                    onChange={() => !isEnded && onAttendanceChange(recordId, option.value)}
                    className="peer sr-only"
                    disabled={isEnded}
                  />
                  <div
                    className={`size-4 rounded-full border-2 transition-all ${
                      isSelected ? option.border + " peer-checked:border-[5px]" : "border-gray-300"
                    }`}
                  />
                </div>
                <span
                  className={`text-[13px] font-bold uppercase tracking-tight transition-colors ${
                    isSelected
                      ? option.value === AttendanceStatus.PRESENT
                        ? "text-green-600"
                        : option.value === AttendanceStatus.LATE
                          ? "text-amber-500"
                          : "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {option.label}
                </span>
              </label>
            );
          })}
        </div>
      );
    },
  },
  {
    id: "note",
    header: () => <span className="text-sm font-bold text-gray-700 pl-10">Note</span>,
    cell: ({ row }) => (
      <NoteCell record={row.original} isEnded={isEnded} onNoteChange={onNoteChange} />
    ),
  },
];
