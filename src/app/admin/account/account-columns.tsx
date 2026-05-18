"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AccountStatus } from "@/constants/status";
import { GenderType } from "@/constants/type";
import { Account } from "@/schemas/account.schema";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

interface ColumnProps {
  onChangeStatus: (id: string, status: AccountStatus) => void;
}

export const getColumns = ({ onChangeStatus }: ColumnProps): ColumnDef<Account>[] => [
  {
    accessorKey: "username",
    header: "Tài khoản",
    cell: ({ row }) => {
      const profile = row.original.profile;
      const avatarUrl = profile?.avatarUrl;
      const gender = profile?.gender;

      let defaultAvatar = "https://i.pinimg.com/1200x/44/be/0b/44be0b0016c6eaa7edfc2a2e2c4a5e33.jpg"; // Default MALE
      if (gender === GenderType.FEMALE) {
        defaultAvatar = "https://i.pinimg.com/1200x/60/33/23/603323075ee7f7c1b7c4a1f600ea4b2d.jpg";
      }

      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border border-gray-100 shadow-sm">
            <AvatarImage src={avatarUrl || defaultAvatar} alt={profile?.fullName} className="object-cover" />
            <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
              {profile?.fullName?.substring(0, 2).toUpperCase() || row.original.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-primary leading-none mb-1">{row.original.username}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "profile.fullName",
    header: "Họ tên",
    cell: ({ row }) => (
      <div className="font-semibold text-gray-800">{row.original.profile?.fullName || "---"}</div>
    ),
  },
  {
    accessorKey: "profile.email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-gray-500 text-sm">{row.original.profile?.email || "---"}</div>
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
