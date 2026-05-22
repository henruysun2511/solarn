"use client";

import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Skeleton } from "@/components/ui/skeleton";
import { SortOrder } from "@/constants/sort";
import { useGetMyInvoices } from "@/queries/usePaymentQuery";
import { useGetMyEnrolledClasses } from "@/queries/useClassQuery";
import { MyInvoiceParams } from "@/schemas/payment.schema";
import { Receipt } from "lucide-react";
import { useMemo, useState } from "react";
import { getColumns } from "./invoice-columns";
import { InvoiceFilter } from "./invoice-filter";

export default function StudentInvoicePage() {
  const [params, setParams] = useState<MyInvoiceParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: "createdAt",
  });

  const { data: myClassesData } = useGetMyEnrolledClasses({ page: 1, limit: 100 });
  const classOptions = useMemo(() => (myClassesData?.data || []).map((c: any) => ({
    classId: c.classId,
    displayName: c.course?.courseName
      ? `${c.course.courseName} (${c.roomCode})`
      : c.classId?.substring(0, 8),
  })), [myClassesData]);

  const { data, isLoading } = useGetMyInvoices(params);

  const invoices = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  const handleFilterChange = (newFilters: Partial<MyInvoiceParams>) => {
    setParams((prev) => ({ ...prev, ...newFilters }));
  };

  const columns = getColumns();

  return (
    <div data-role="student" className="w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col gap-6 min-h-screen">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
            Tài chính
          </p>
          <div className="flex items-center gap-3">
            <div className="bg-[var(--accent)] p-2.5 rounded-2xl">
              <Receipt className="size-5 text-[var(--primary)]" />
            </div>
            <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
              Hóa đơn
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <InvoiceFilter
            params={params}
            classOptions={classOptions}
            onFilterChange={handleFilterChange}
            onRowsPerPageChange={(limit) => handleFilterChange({ limit, page: 1 })}
          />

          {isLoading ? (
            <div className="p-10 space-y-4">
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-2xl" />
              <Skeleton className="h-20 w-full rounded-2xl" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <DataTable columns={columns} data={invoices} />
            </div>
          )}

          {!isLoading && invoices.length === 0 && (
            <div className="py-20 text-center font-medium text-gray-400 italic">
              Không có hóa đơn nào.
            </div>
          )}

          {!isLoading && invoices.length > 0 && (
            <div className="p-5 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <PaginationInfo
                page={params.page || 1}
                limit={params.limit || 10}
                totalItems={totalItems}
                currentLength={invoices.length}
                label="hóa đơn"
              />
              <DataPagination
                page={params.page!}
                totalPages={totalPages}
                onPageChange={(p) => handleFilterChange({ page: p })}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
