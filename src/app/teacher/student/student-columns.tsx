"use client";

import { UserAvatar } from "@/components/common/user-avatar";
import { Student } from "@/schemas/student.schema";
import { ColumnDef } from "@tanstack/react-table";

export const getColumns = (): ColumnDef<Student>[] => [
  {
    accessorKey: "studentCode",
    header: "Mã học sinh",
    cell: ({ row }) => (
      <span className="font-semibold text-primary">{row.original.studentCode}</span>
    ),
  },
  {
    accessorKey: "profile.fullName",
    header: "Tên học sinh",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <UserAvatar
          avatarUrl={row.original.profile?.avatarUrl}
          gender={row.original.profile?.gender}
          fullName={row.original.profile?.fullName}
        />
        <div className="font-semibold text-gray-800">{row.original.profile?.fullName || "---"}</div>
      </div>
    ),
  },
  {
    accessorKey: "profile.email",
    header: "Email",
    cell: ({ row }) => <span className="text-gray-500 line-clamp-1">{row.original.profile?.email || "---"}</span>,
  },
  {
    accessorKey: "profile.phone",
    header: "Số điện thoại",
    cell: ({ row }) => <span className="text-gray-500">{row.original.profile?.phone || "---"}</span>,
  },
  {
    accessorKey: "profile.gender",
    header: "Giới tính",
    cell: ({ row }) => {
      const gender = row.original.profile?.gender;
      const genderLabel = gender === "MALE" ? "Nam" : gender === "FEMALE" ? "Nữ" : "---";
      return <span className="text-gray-700">{genderLabel}</span>;
    },
  },
];
