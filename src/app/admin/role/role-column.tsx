"use client";

import { Badge } from "@/components/ui/badge";
import { RoleType } from "@/constants/type";
import { Role } from "@/schemas/role.schema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Role>[] = [
  // {
  //   accessorKey: "roleId",
  //   header: "Mã vai trò (ID)",
  //   cell: ({ row }) => (
  //     <span className="font-mono text-xs text-gray-400 font-medium">
  //       {row.original.roleId}
  //     </span>
  //   ),
  // },
  {
    accessorKey: "roleName",
    header: "Tên vai trò",
    cell: ({ row }) => {
      const name = row.original.roleName;
      let badgeStyle = "bg-gray-150 text-gray-700 border-gray-200 hover:bg-gray-150";
      if (name === RoleType.ADMIN) {
        badgeStyle = "bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-50";
      } else if (name === RoleType.TEACHER) {
        badgeStyle = "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-50";
      } else if (name === RoleType.STUDENT) {
        badgeStyle = "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50";
      }
      return (
        <Badge variant="outline" className={`font-black uppercase tracking-widest text-[10px] px-3 py-1 rounded-lg ${badgeStyle}`}>
          {name}
        </Badge>
      );
    },
  },
];
