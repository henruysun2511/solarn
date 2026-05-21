"use client";

import { Input } from "@/components/ui/input";
import { AttendanceStatus } from "@/constants/type";
import { AttendanceRecord } from "@/schemas/attendance.schema";
import { ColumnDef } from "@tanstack/react-table";
import { CheckIcon, ClockIcon, XIcon } from "lucide-react";

interface ColumnProps {
  attendanceValues: Record<string, AttendanceStatus>;
  noteValues: Record<string, string>;
  onAttendanceChange: (recordId: string, status: AttendanceStatus) => void;
  onNoteChange: (recordId: string, note: string) => void;
}

const statusOptions: { value: AttendanceStatus; label: string; icon: typeof CheckIcon; color: string; activeColor: string }[] = [
  { value: AttendanceStatus.PRESENT, label: "Present", icon: CheckIcon, color: "border-gray-300", activeColor: "border-green-500 bg-green-500" },
  { value: AttendanceStatus.LATE, label: "Late", icon: ClockIcon, color: "border-gray-300", activeColor: "border-amber-500 bg-amber-500" },
  { value: AttendanceStatus.ABSENT, label: "Absent", icon: XIcon, color: "border-gray-300", activeColor: "border-red-500 bg-red-500" },
];

export const getColumns = ({
  attendanceValues,
  noteValues,
  onAttendanceChange,
  onNoteChange,
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
          {statusOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = currentStatus === option.value;
            return (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name={`attendance-${recordId}`}
                    checked={isSelected}
                    onChange={() => onAttendanceChange(recordId, option.value)}
                    className="peer sr-only"
                  />
                  <div
                    className={`size-4 rounded-full border-2 transition-all ${
                      isSelected ? option.activeColor : option.color
                    }`}
                  />
                </div>
                <span
                  className={`text-sm font-medium transition-colors ${
                    isSelected ? option.color.replace("border-", "text-") : "text-gray-500"
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
    cell: ({ row }) => {
      const record = row.original;
      const recordId = record.attendanceId || record.studentId;
      return (
        <div className="pl-10">
          <Input
            placeholder="Write note..."
            value={noteValues[recordId] || record.note || ""}
            onChange={(e) => onNoteChange(recordId, e.target.value)}
            className="h-9 border-gray-200 focus-visible:ring-primary w-[180px]"
          />
        </div>
      );
    },
  },
];
