"use client";

import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";
import { INVOICE_STATUS_LABELS } from "@/constants/label";
import { SortOrder } from "@/constants/sort";
import { useGetInvoices } from "@/queries/usePaymentQuery";
import { InvoiceParams } from "@/schemas/payment.schema";
import paymentService from "@/services/payment.service";
import { exportToExcel } from "@/utils/exportToExcel";
import { handleError } from "@/utils/handleError";
import { FileDownIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./invoice-columns";
import { InvoiceFilter } from "./invoice-filter";

export default function AdminInvoicePage() {
  const [params, setParams] = useState<InvoiceParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: "createdAt",
  });

  const { data, isLoading } = useGetInvoices(params);

  const invoices = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await paymentService.getAllInvoicesForExport({
        search: params.search,
        classId: params.classId,
        status: params.status,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
      });
      const allData = res.data.data || [];

      const rows = allData.map((e: any) => ({
        "Mã HD": e.invoiceId?.slice(0, 8).toUpperCase() || "---",
        "Học sinh": e.student?.profile?.fullName || "---",
        "Mã HS": e.student?.studentCode || "---",
        "Khóa học": e.class?.course?.courseName || "---",
        "Số tiền": e.amount != null ? Number(e.amount).toLocaleString() + "₫" : "---",
        "Mã giao dịch": e.transactionId || "---",
        "Ngày tạo": e.createdAt ? new Date(e.createdAt).toLocaleDateString("vi-VN") : "---",
        "Trạng thái": INVOICE_STATUS_LABELS[e.status] || e.status,
      }));

      exportToExcel(rows, [
        { key: "Mã HD", header: "Mã HD" },
        { key: "Học sinh", header: "Học sinh" },
        { key: "Mã HS", header: "Mã HS" },
        { key: "Khóa học", header: "Khóa học" },
        { key: "Số tiền", header: "Số tiền" },
        { key: "Mã giao dịch", header: "Mã giao dịch" },
        { key: "Ngày tạo", header: "Ngày tạo" },
        { key: "Trạng thái", header: "Trạng thái" },
      ], "danh-sach-hoa-don");

      toast.success("Xuất file Excel thành công");
    } catch (error) {
      handleError(error, "Xuất file thất bại");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <AdminPageTitle title="Hóa đơn" subtitle="Quản lý" />
        <Button
          onClick={handleExport}
          disabled={exporting}
          className="bg-primary text-white px-6 h-11 rounded-md font-semibold"
        >
          <FileDownIcon className="mr-2 size-4" />
          {exporting ? "Đang xuất..." : "Xuất Excel"}
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <InvoiceFilter
          onSearch={(val) => setParams((prev) => ({ ...prev, search: val, page: 1 }))}
          onFilterChange={(filters) => setParams((prev) => ({ ...prev, ...filters, page: 1 }))}
          onRowsPerPageChange={(val) => setParams((prev) => ({ ...prev, limit: val, page: 1 }))}
        />

        <div className="p-0">
          <DataTable
            columns={getColumns()}
            data={invoices}
            loading={isLoading}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-t border-gray-200">
          <PaginationInfo
            page={Number(params.page) || 1}
            limit={Number(params.limit!) || 10}
            totalItems={totalItems}
            currentLength={invoices.length}
          />
          <DataPagination
            page={Number(params.page!)}
            totalPages={totalPages}
            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
          />
        </div>
      </div>
    </div>
  );
}
