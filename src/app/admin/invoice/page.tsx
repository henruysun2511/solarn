"use client";

import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { SortOrder } from "@/constants/sort";
import { useGetInvoices } from "@/queries/usePaymentQuery";
import { InvoiceParams } from "@/schemas/payment.schema";
import { useState } from "react";
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

  return (
    <div data-role="admin" className="flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <AdminPageTitle title="Hóa đơn" subtitle="Quản lý" />
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
