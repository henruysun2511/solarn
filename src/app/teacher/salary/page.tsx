"use client";

import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { SalarySortBy, SortOrder } from "@/constants/sort";
import { useGetMySalaryComplaints, useCreateSalaryComplaint } from "@/queries/useRequestQuery";
import { useGetMySalaries } from "@/queries/useSalaryQuery";
import { MySalaryParams, Salary } from "@/schemas/salary.schema";
import { SalaryComplaintParams } from "@/schemas/request.schema";
import { handleError } from "@/utils/handleError";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./salary-columns";
import { getComplaintColumns } from "./salary-complaint-columns";
import { SalaryComplaintDialog } from "./salary-complaint-dialog";
import { SalaryFilter } from "./salary-filter";

type TabKey = "salary" | "complaint";

export default function TeacherSalaryPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("salary");

  // Salary tab state
  const [salaryParams, setSalaryParams] = useState<MySalaryParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: SalarySortBy.SALARY_DATE,
  });

  const { data: salaryData, isLoading: salaryLoading } = useGetMySalaries(salaryParams);

  // Complaint tab state
  const [complaintParams, setComplaintParams] = useState<SalaryComplaintParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: "createdAt",
  });

  const { data: complaintData, isLoading: complaintLoading } = useGetMySalaryComplaints(complaintParams);

  // Dialogs
  const [viewingSalary, setViewingSalary] = useState<Salary | null>(null);
  const [complaintSalary, setComplaintSalary] = useState<Salary | null>(null);

  const createComplaintMutation = useCreateSalaryComplaint();

  const salaries = salaryData?.data || [];
  const salaryMeta = salaryData?.meta;
  const salaryTotalItems = salaryMeta?.total || 0;
  const salaryTotalPages = salaryMeta?.totalPages || 0;

  const complaints = complaintData?.data || [];
  const complaintMeta = complaintData?.meta;
  const complaintTotalItems = complaintMeta?.total || 0;
  const complaintTotalPages = complaintMeta?.totalPages || 0;

  const handleComplaintSubmit = async (data: { salaryId: string; proposedAmount: number; reason: string }) => {
    try {
      await createComplaintMutation.mutateAsync(data);
      toast.success("Gửi khiếu nại thành công");
      setComplaintSalary(null);
    } catch (error) {
      handleError(error, "Không thể gửi khiếu nại");
    }
  };

  const formatCurrency = (amount: number | string) => {
    return Number(amount).toLocaleString() + "₫";
  };

  return (
    <div data-role="teacher" className="w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col gap-6 min-h-screen">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter">Lịch sử lương</h1>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">
              Giáo viên
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("salary")}
            className={`px-6 py-3 text-sm font-bold rounded-t-xl transition-colors ${
              activeTab === "salary"
                ? "bg-white text-[var(--primary)] border border-b-white border-gray-200 -mb-px"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Danh sách lương
          </button>
          <button
            onClick={() => setActiveTab("complaint")}
            className={`px-6 py-3 text-sm font-bold rounded-t-xl transition-colors ${
              activeTab === "complaint"
                ? "bg-white text-[var(--primary)] border border-b-white border-gray-200 -mb-px"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Khiếu nại lương
          </button>
        </div>

        {/* Salary Tab */}
        {activeTab === "salary" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <SalaryFilter
              onFilterChange={(filters) =>
                setSalaryParams((prev) => ({ ...prev, ...filters, page: 1 }))
              }
              onRowsPerPageChange={(val) =>
                setSalaryParams((prev) => ({ ...prev, limit: val, page: 1 }))
              }
            />

            <DataTable
              columns={getColumns({
                onView: (salary) => setViewingSalary(salary),
                onComplaint: (salary) => setComplaintSalary(salary),
              })}
              data={salaries}
              loading={salaryLoading}
            />

            <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <PaginationInfo
                page={salaryParams.page || 1}
                limit={salaryParams.limit || 10}
                totalItems={salaryTotalItems}
                currentLength={salaries.length}
                label="phiếu lương"
              />
              <DataPagination
                page={salaryParams.page!}
                totalPages={salaryTotalPages}
                onPageChange={(p) =>
                  setSalaryParams((prev) => ({ ...prev, page: p }))
                }
              />
            </div>
          </div>
        )}

        {/* Complaint Tab */}
        {activeTab === "complaint" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-0">
              <DataTable
                columns={getComplaintColumns()}
                data={complaints}
                loading={complaintLoading}
              />
            </div>

            <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <PaginationInfo
                page={complaintParams.page || 1}
                limit={complaintParams.limit || 10}
                totalItems={complaintTotalItems}
                currentLength={complaints.length}
                label="khiếu nại"
              />
              <DataPagination
                page={complaintParams.page!}
                totalPages={complaintTotalPages}
                onPageChange={(p) =>
                  setComplaintParams((prev) => ({ ...prev, page: p }))
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* View Salary Detail Dialog */}
      <Dialog open={!!viewingSalary} onOpenChange={() => setViewingSalary(null)}>
        <DialogContent
          data-role="teacher"
          className="sm:max-w-[550px] rounded-[1rem] p-0 bg-white border border-slate-100 shadow-2xl overflow-hidden"
        >
          <DialogHeader className="p-0 absolute top-4 right-4 z-50">
            <DialogClose className="rounded-full p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>

          {viewingSalary && (
            <div className="p-10 font-sans text-slate-700">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Bảng lương</h1>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  {(() => {
                    const d = new Date(viewingSalary.salaryDate);
                    return `Tháng ${d.getMonth() + 1}/${d.getFullYear()}`;
                  })()}
                </p>
              </div>

              <div className="flex justify-between items-start mb-8 text-sm gap-6">
                <div className="space-y-1.5 font-medium">
                  <p>
                    <span className="text-slate-500">Mã phiếu</span> : #{viewingSalary.salaryId}
                  </p>
                  <p>
                    <span className="text-slate-500">Số buổi dạy</span> : {viewingSalary.totalSessions} buổi
                  </p>
                </div>
                <div className="text-right space-y-1 font-medium">
                  <p className="font-bold text-slate-900 text-base mb-2">Payslip</p>
                  <p>
                    <span className="text-slate-500">Ngày thanh toán</span>:{" "}
                    {new Date(viewingSalary.salaryDate).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>

              <div className="border border-slate-100 rounded-lg overflow-hidden mb-6">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50/50">
                    <tr className="border-none">
                      <th className="font-bold text-slate-900 h-10 py-0 pl-5 text-left">Khoản mục</th>
                      <th className="font-bold text-slate-900 h-10 py-0 pr-5 text-right">Số tiền</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      { label: "Lương cơ bản + buổi dạy", value: Number(viewingSalary.totalAmount) + Number(viewingSalary.deduction) - Number(viewingSalary.bonus) },
                      { label: "Thưởng", value: Number(viewingSalary.bonus) },
                      { label: "Khấu trừ", value: -Number(viewingSalary.deduction) },
                    ].map((item, idx) => (
                      <tr key={idx} className="border-slate-100 border-b">
                        <td className="pl-5 font-medium py-3">{item.label}</td>
                        <td className={`text-right pr-5 font-medium py-3 ${item.value < 0 ? "text-red-500" : "text-slate-900"}`}>
                          {item.value >= 0 ? "" : "-"}{formatCurrency(Math.abs(item.value))}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-none bg-slate-50/50 font-bold">
                      <td className="pl-5 py-4 text-slate-900">Tổng thực nhận</td>
                      <td className="text-right pr-5 py-4 text-slate-900 text-lg">
                        {formatCurrency(viewingSalary.totalAmount)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-center space-y-2 mt-16 border-t border-dashed border-slate-100 pt-8">
                <h3 className="text-xl font-bold text-slate-900">Thanks</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Nếu cần hỗ trợ, hãy liên hệ qua bộ phận kế toán
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Salary Complaint Dialog */}
      <SalaryComplaintDialog
        open={!!complaintSalary}
        onOpenChange={(open) => {
          if (!open) setComplaintSalary(null);
        }}
        salary={complaintSalary}
        onSubmit={handleComplaintSubmit}
        isPending={createComplaintMutation.isPending}
      />
    </div>
  );
}
