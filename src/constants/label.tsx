import { CheckCircle2, Clock, RotateCcw, XCircle } from "lucide-react";
import React from "react";
import { GenderType, RequestStatus, AttendanceStatus, EnrollmentStatus, InvoiceStatus } from "./type";

export const genderLabel: Record<string, string> = {
  [GenderType.MALE]: "Nam",
  [GenderType.FEMALE]: "Nữ",
  [GenderType.UNKNOWN]: "Khác",
};

export const levelLabels: Record<string, string> = {
  A1: "Cơ Bản",
  A2: "Sơ Cấp",
  B1: "Trung Cấp",
  B2: "Trung Cao Cấp",
  C1: "Nâng Cao",
  C2: "Thành Thạo",
};

export const levelColors: Record<string, string> = {
  A1: "from-emerald-50 to-teal-100 border-emerald-200 text-emerald-700",
  A2: "from-sky-50 to-blue-100 border-sky-200 text-sky-700",
  B1: "from-amber-50 to-orange-100 border-amber-200 text-amber-700",
  B2: "from-rose-50 to-red-100 border-rose-200 text-rose-700",
  C1: "from-purple-50 to-violet-100 border-purple-200 text-purple-700",
  C2: "from-fuchsia-50 to-pink-100 border-fuchsia-200 text-fuchsia-700",
};

export function getLevelLabel(level: string | null | undefined) {
  if (!level) return "Chưa phân loại";
  return levelLabels[level] || level;
}

// ---- Enrollment Status (with icons, for admin columns) ----
export const ENROLLMENT_STATUS_CONFIG: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  [EnrollmentStatus.NOT_STARTED]: { label: "Chưa bắt đầu", icon: <Clock className="w-4 h-4" />,        className: "bg-orange-50 text-orange-600 border-orange-100" },
  [EnrollmentStatus.IN_PROGRESS]: { label: "Đang học",     icon: <CheckCircle2 className="w-4 h-4" />, className: "bg-blue-50 text-blue-600 border-blue-100" },
  [EnrollmentStatus.COMPLETED]:   { label: "Hoàn thành",   icon: <CheckCircle2 className="w-4 h-4" />, className: "bg-green-50 text-green-600 border-green-100" },
  [EnrollmentStatus.DROPPED]:     { label: "Đã hủy",       icon: <XCircle className="w-4 h-4" />,       className: "bg-red-50 text-red-600 border-red-100" },
  [EnrollmentStatus.DEFERRED]:    { label: "Bảo lưu",      icon: <RotateCcw className="w-4 h-4" />,    className: "bg-purple-50 text-purple-600 border-purple-100" },
};

// ---- Request Status (with icons, for admin columns) ----
export const REQUEST_STATUS_CONFIG: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  [RequestStatus.PENDING]:   { label: "Chờ duyệt", icon: <Clock className="w-4 h-4" />,        className: "bg-orange-50 text-orange-600 border-orange-100" },
  [RequestStatus.APPROVED]:  { label: "Đã duyệt",  icon: <CheckCircle2 className="w-4 h-4" />,  className: "bg-green-50 text-green-600 border-green-100" },
  [RequestStatus.REJECTED]:  { label: "Từ chối",   icon: <XCircle className="w-4 h-4" />,        className: "bg-red-50 text-red-600 border-red-100" },
  [RequestStatus.CANCELLED]: { label: "Đã hủy",    icon: <RotateCcw className="w-4 h-4" />,     className: "bg-gray-50 text-gray-500 border-gray-100" },
};

// ---- Request Status (split labels/colors for simple badges) ----
export const REQUEST_STATUS_LABELS: Record<string, string> = {
  [RequestStatus.PENDING]: "Chờ duyệt",
  [RequestStatus.APPROVED]: "Đã duyệt",
  [RequestStatus.REJECTED]: "Từ chối",
  [RequestStatus.CANCELLED]: "Đã hủy",
};

export const REQUEST_STATUS_COLORS: Record<string, string> = {
  [RequestStatus.PENDING]: "bg-amber-100 text-amber-700",
  [RequestStatus.APPROVED]: "bg-emerald-100 text-emerald-700",
  [RequestStatus.REJECTED]: "bg-red-100 text-red-700",
  [RequestStatus.CANCELLED]: "bg-gray-100 text-gray-500",
};

// ---- Attendance Status (with icons) ----
export const ATTENDANCE_STATUS_CONFIG: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  [AttendanceStatus.PRESENT]: { label: "Có mặt",  icon: <CheckCircle2 className="w-4 h-4" />, className: "bg-green-50 text-green-600" },
  [AttendanceStatus.LATE]:    { label: "Đi muộn", icon: <Clock className="w-4 h-4" />,        className: "bg-amber-50 text-amber-600" },
  [AttendanceStatus.ABSENT]:  { label: "Vắng",    icon: <XCircle className="w-4 h-4" />,       className: "bg-red-50 text-red-600" },
};

// ---- Attendance Status (split labels/colors for simple badges) ----
export const ATTENDANCE_STATUS_LABELS: Record<string, string> = {
  [AttendanceStatus.PRESENT]: "Có mặt",
  [AttendanceStatus.LATE]: "Đi muộn",
  [AttendanceStatus.ABSENT]: "Vắng",
};

export const ATTENDANCE_STATUS_COLORS: Record<string, string> = {
  [AttendanceStatus.PRESENT]: "bg-emerald-100 text-emerald-700",
  [AttendanceStatus.ABSENT]: "bg-red-100 text-red-700",
  [AttendanceStatus.LATE]: "bg-amber-100 text-amber-700",
};

// ---- Invoice Status ----
export const INVOICE_STATUS_LABELS: Record<string, string> = {
  [InvoiceStatus.PENDING]: "Chờ thanh toán",
  [InvoiceStatus.PAID]: "Đã thanh toán",
  [InvoiceStatus.CANCELLED]: "Đã hủy",
};

export const INVOICE_STATUS_COLORS: Record<string, string> = {
  [InvoiceStatus.PENDING]: "bg-amber-100 text-amber-700",
  [InvoiceStatus.PAID]: "bg-emerald-100 text-emerald-700",
  [InvoiceStatus.CANCELLED]: "bg-red-100 text-red-700",
};

// ---- Request Type Labels ----
export const requestTypeLabels: Record<string, string> = {
  LEAVE_REQUEST: "Nghỉ học",
  SCHEDULE_CHANGE: "Dời lịch",
  SALARY_COMPLAINT: "Khiếu nại lương",
  TRANSFER_REQUEST: "Chuyển lớp",
  RE_ENROLLMENT_REQUEST: "Tái nhập học",
};

export const requestTypeColors: Record<string, string> = {
  LEAVE_REQUEST: "bg-purple-100 text-purple-700",
  SCHEDULE_CHANGE: "bg-blue-100 text-blue-700",
  SALARY_COMPLAINT: "bg-orange-100 text-orange-700",
  TRANSFER_REQUEST: "bg-cyan-100 text-cyan-700",
  RE_ENROLLMENT_REQUEST: "bg-pink-100 text-pink-700",
};

// ---- Class Status Config ----
export const CLASS_STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  upcoming: { label: "Upcoming", className: "bg-blue-50 text-blue-600 border-blue-100" },
  ongoing: { label: "Ongoing", className: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  finished: { label: "Finished", className: "bg-gray-100 text-gray-500 border-gray-200" },
};

// ---- Helper: get class label string ----
export function getClassLabel(c: { roomCode: string; course?: { courseName?: string } } | null | undefined) {
  if (!c) return "---";
  return `${c.course?.courseName ?? ""} (${c.roomCode})`;
}

// Short labels for enrollment status (table/compact display)
export const ENROLLMENT_STATUS_SHORT_LABELS: Record<string, string> = {
  [EnrollmentStatus.NOT_STARTED]: "Chưa BĐ",
  [EnrollmentStatus.IN_PROGRESS]: "Đang học",
  [EnrollmentStatus.COMPLETED]: "HT",
  [EnrollmentStatus.DROPPED]: "Đã hủy",
  [EnrollmentStatus.DEFERRED]: "BL",
};

// ---- Deprecated aliases ----
/** @deprecated Use ENROLLMENT_STATUS_CONFIG */
export const STATUS_MAP = ENROLLMENT_STATUS_CONFIG;
