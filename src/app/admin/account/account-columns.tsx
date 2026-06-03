"use client";

import { UserAvatar } from "@/components/common/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { AccountStatus } from "@/constants/status";
import { Account } from "@/schemas/account.schema";
import { Role } from "@/schemas/role.schema";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

interface ColumnProps {
  onChangeStatus: (id: string, status: AccountStatus) => void;
  onChangeRole: (accountId: string, newRoleId: string, oldRoleName: string, newRoleName: string) => void;
  roles: Role[];
}

export const getColumns = ({ onChangeStatus, onChangeRole, roles }: ColumnProps): ColumnDef<Account>[] => [
  {
    accessorKey: "username",
    header: "Tài khoản",
    cell: ({ row }) => {
      const profile = row.original.profile;
      const avatarUrl = profile?.avatarUrl;
      const gender = profile?.gender;
      const fullName = profile?.fullName;

      return (
        <div className="flex items-center gap-3">
          <UserAvatar
            avatarUrl={avatarUrl}
            gender={gender}
            fullName={fullName}
          />
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
    cell: ({ row }) => {
      const currentRoleId = row.original.roleId;
      return (
        <Select
          value={currentRoleId}
          onValueChange={(newRoleId) => {
            if (newRoleId === currentRoleId) return;
            const newRole = roles.find((r) => r.roleId === newRoleId);
            onChangeRole(
              row.original.accountId!,
              newRoleId,
              row.original.role?.roleName || "",
              newRole?.roleName || ""
            );
          }}
        >
          <SelectTrigger className="h-8 w-36 border-gray-200 bg-white text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent data-role="admin">
            {roles.map((role) => (
              <SelectItem key={role.roleId} value={role.roleId} className="text-xs">
                {role.roleName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
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
