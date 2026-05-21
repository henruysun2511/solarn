"use client";

import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { useCreateRole, useGetRoles } from "@/queries/useRoleQuery";
import { RoleInput } from "@/schemas/role.schema";
import { handleError } from "@/utils/handleError";
import { ShieldPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { columns } from "./role-column";
import { RoleDialog } from "./role-dialog";

export default function RoleAdminPage() {
  const { data: rolesRes, isLoading } = useGetRoles();
  const createMutation = useCreateRole();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAdd = () => {
    setDialogOpen(true);
  };

  const handleSubmit = async (formData: RoleInput) => {
    try {
      await createMutation.mutateAsync(formData, {
        onSuccess: (response: any) => {
          toast.success(response?.message || "Tạo vai trò thành công");
          setDialogOpen(false);
        },
        onError: (error: any) => {
          handleError(error, "Tạo vai trò thất bại");
        },
      });
    } catch (error) {
      console.error("Submit failed", error);
    }
  };

  const roles = rolesRes?.data || [];

  return (
    <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <AdminPageTitle
          title="Quản trị vai trò"
          subtitle="Hệ thống"
        />

        <Button
          onClick={handleAdd}
          className="bg-primary text-white px-6 h-11 rounded-md font-semibold"
        >
          <ShieldPlus className="mr-2 size-4" />
          Thêm vai trò
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-0">
          <DataTable
            columns={columns}
            data={roles}
            loading={isLoading}
          />
        </div>
      </div>

      <RoleDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        loading={createMutation.isPending}
      />
    </div>
  );
}
