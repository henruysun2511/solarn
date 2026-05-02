"use client";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AccountStatus } from "@/constants/status";
import { Account } from "@/schemas/account.schema";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

interface ColumnProps {
  onChangeStatus: (id: string, status: AccountStatus) => void;
}

export const getColumns = ({ onChangeStatus }: ColumnProps): ColumnDef<Account>[] => [
  {
    accessorKey: "username",
    header: "Tên đăng nhập",
    cell: ({ row }) => (
      <span className="font-semibold text-primary">{row.original.username}</span>
    ),
  },
  {
    accessorKey: "profile.fullName",
    header: "Họ tên",
    cell: ({ row }) => (
      <div className="font-semibold text-gray-800">{row.original.profile?.fullName || "---"}</div>
    ),
  },
  {
    accessorKey: "role.roleName",
    header: "Quyền",
    cell: ({ row }) => (
      <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 uppercase text-[10px]">
        {row.original.role?.roleName}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const isActive = row.original.status === AccountStatus.ACTIVE;
      return (
        <div className="flex items-center gap-2">
          <Switch
            checked={isActive}
            onCheckedChange={(checked) => {
              const newStatus = checked ? AccountStatus.ACTIVE : AccountStatus.INACTIVE;
              row.original.accountId && onChangeStatus(row.original.accountId, newStatus);
            }}
          />
          <Badge className={isActive ? "bg-green-100 text-green-600 hover:bg-green-100" : "bg-red-100 text-red-600 hover:bg-red-100"}>
            {isActive ? "Hoạt động" : "Khóa"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => (
      <span className="text-gray-500">
        {row.original.createdAt ? format(new Date(row.original.createdAt), "dd/MM/yyyy HH:mm") : "---"}
      </span>
    ),
  },
];
