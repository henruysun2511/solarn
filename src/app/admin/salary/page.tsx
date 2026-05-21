"use client";

import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";
import { SalarySortBy, SortOrder } from "@/constants/sort";
import {
  useGetSalaries,
  usePreviewSalary,
  useSaveSalary,
} from "@/queries/useSalaryQuery";
import { CalculateSalaryInput, Salary, SalaryParams } from "@/schemas/salary.schema";
import { handleError } from "@/utils/handleError";
import { CalculatorIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./salary-columns";
import { SalaryDialog } from "./salary-dialog";
import { SalaryFilter } from "./salary-filter";

export default function AdminSalaryPage() {
  const [params, setParams] = useState<SalaryParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: SalarySortBy.SALARY_DATE,
  });

  const { data, isLoading } = useGetSalaries(params);
  const previewMutation = usePreviewSalary();
  const saveMutation = useSaveSalary();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewingSalary, setViewingSalary] = useState<Salary | null>(null);
  const [previewData, setPreviewData] = useState<any[] | null>(null);
  const [savedResult, setSavedResult] = useState<{ salaryDate: string; year: number; month: number; createdCount: number } | null>(null);

  const handleAdd = () => {
    setPreviewData(null);
    setSavedResult(null);
    setDialogOpen(true);
  };

  const handleView = (salary: Salary) => {
    setViewingSalary(salary);
  };

  const handlePreview = async (data: CalculateSalaryInput) => {
    try {
      setSavedResult(null);
      const res = await previewMutation.mutateAsync(data);
      setPreviewData(res.data?.data ?? res.data ?? []);
    } catch (error) {
      handleError(error, "Không thể tính lương");
    }
  };

  const handleSave = async (data: CalculateSalaryInput) => {
    try {
      const res = await saveMutation.mutateAsync(data, {
        onSuccess: (response: any) => {
          toast.success(response?.message || "Lưu bảng lương thành công");
          setSavedResult(response?.data ?? { salaryDate: "", year: data.year, month: data.month, createdCount: 0 });
        },
        onError: (error: any) => {
          handleError(error, "Không thể lưu bảng lương");
        },
      });
    } catch (error) {
      console.error("Save failed", error);
    }
  };

  const salaries = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  return (
    <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
            Quản lý
          </p>
          <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
            Bảng lương giảng viên
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={handleAdd}
            className="bg-primary text-white px-6 h-11 rounded-md font-semibold"
          >
            <CalculatorIcon className="mr-2 size-4" />
            Tính lương
          </Button>
        </div>
      </div>

      {/* Filter & Content Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <SalaryFilter
          onSearch={(val) => setParams((prev) => ({ ...prev, search: val, page: 1 }))}
          onFilterChange={(filters) => setParams((prev) => ({ ...prev, ...filters, page: 1 }))}
          onRowsPerPageChange={(val) => setParams((prev) => ({ ...prev, limit: val, page: 1 }))}
        />

        <DataTable
          columns={getColumns({
            onView: handleView,
          })}
          data={salaries}
          loading={isLoading}
        />

        {/* Pagination Section */}
        <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <PaginationInfo
            page={params.page || 1}
            limit={params.limit || 10}
            totalItems={totalItems}
            currentLength={salaries.length}
            label="phiếu lương"
          />
          <DataPagination
            page={params.page!}
            totalPages={totalPages}
            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
          />
        </div>
      </div>

      <SalaryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onPreview={handlePreview}
        onSave={handleSave}
        previewData={previewData}
        isPreviewing={previewMutation.isPending}
        isSaving={saveMutation.isPending}
        savedResult={savedResult}
      />

      {viewingSalary && (
        <ConfirmDialog
          open={!!viewingSalary}
          onOpenChange={() => setViewingSalary(null)}
          onConfirm={() => setViewingSalary(null)}
          title="Chi tiết phiếu lương"
          description={`Giảng viên: ${viewingSalary.teacher?.profile?.fullName || "N/A"} | Kỳ lương: ${new Date(viewingSalary.salaryDate).toLocaleDateString("vi-VN")} | Thực nhận: ${Number(viewingSalary.totalAmount).toLocaleString()}₫`}
          buttonText="Đóng"
        />
      )}
    </div>
  );
}
