"use client";

import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";
import { ENROLLMENT_STATUS_CONFIG } from "@/constants/label";
import { SortOrder } from "@/constants/sort";
import { useGetEnrollments } from "@/queries/useEnrollmentQuery";
import { EnrollmentParams } from "@/schemas/enrollment.schema";
import enrollmentService from "@/services/enrollment.service";
import { exportToExcel } from "@/utils/exportToExcel";
import { handleError } from "@/utils/handleError";
import { FileDownIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./enrollment-columns";
import { EnrollmentFilter } from "./enrollment-filter";

export default function AdminEnrollmentPage() {
  const [params, setParams] = useState<EnrollmentParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: "createdAt",
  });
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>(undefined);

  const effectiveParams = {
    ...params,
    classId: selectedClassId || undefined,
  };

  const { data, isLoading } = useGetEnrollments(effectiveParams);

  const enrollments = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await enrollmentService.getAllEnrollmentsForExport({
        search: params.search,
        classId: selectedClassId || params.classId,
        status: params.status,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
      });
      const allData = res.data.data || [];

      const rows = allData.map((e: any) => ({
        "Mã HS": e.student?.studentCode || "---",
        "Học sinh": e.student?.profile?.fullName || "---",
        Email: e.student?.profile?.email || "---",
        Lớp: e.class?.classCode || "---",
        "Khóa học": e.class?.course?.courseName || "---",
        Phòng: e.class?.roomCode || "---",
        "Ngày ĐK": e.createdAt ? new Date(e.createdAt).toLocaleDateString("vi-VN") : "---",
        "Trạng thái": ENROLLMENT_STATUS_CONFIG[e.status]?.label || e.status,
      }));

      exportToExcel(rows, [
        { key: "Mã HS", header: "Mã HS" },
        { key: "Học sinh", header: "Học sinh" },
        { key: "Email", header: "Email" },
        { key: "Lớp", header: "Lớp" },
        { key: "Khóa học", header: "Khóa học" },
        { key: "Phòng", header: "Phòng" },
        { key: "Ngày ĐK", header: "Ngày ĐK" },
        { key: "Trạng thái", header: "Trạng thái" },
      ], "danh-sach-dang-ky-khoa-hoc");

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
        <AdminPageTitle title="Đăng ký khóa học" subtitle="Quản lý" />
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
        <EnrollmentFilter
          onSearch={(val) => setParams((prev) => ({ ...prev, search: val, page: 1 }))}
          onFilterChange={(filters) => setParams((prev) => ({ ...prev, ...filters, page: 1 }))}
          onRowsPerPageChange={(val) => setParams((prev) => ({ ...prev, limit: val, page: 1 }))}
          selectedClassId={selectedClassId}
          onClassChange={(classId) => {
            setSelectedClassId(classId);
            setParams((prev) => ({ ...prev, page: 1 }));
          }}
        />

        <div className="p-0">
          <DataTable columns={getColumns()} data={enrollments} loading={isLoading} />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-t border-gray-200">
          <PaginationInfo
            page={Number(params.page) || 1}
            limit={Number(params.limit) || 10}
            totalItems={totalItems}
            currentLength={enrollments.length}
          />
          <DataPagination
            page={Number(params.page)!}
            totalPages={totalPages}
            onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
          />
        </div>
      </div>
    </div>
  );
}
