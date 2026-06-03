"use client";

import { AdminPageTitle } from "@/components/admin/admin-page-title";
import { DataPagination } from "@/components/common/data-pagination";
import { DataTable } from "@/components/common/data-table";
import { PaginationInfo } from "@/components/common/pagination-info";
import { Button } from "@/components/ui/button";
import { SortOrder } from "@/constants/sort";
import { useGetAssignmentResults } from "@/queries/useAssignmentResultQuery";
import { AssignmentResultParams } from "@/schemas/assignment-result.schema";
import assignmentResultService from "@/services/assignment-result.service";
import { exportToExcel } from "@/utils/exportToExcel";
import { handleError } from "@/utils/handleError";
import { FileDownIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./assignment-result-columns";
import { AssignmentResultFilter } from "./assignment-result-filter";

export default function AdminAssignmentResultPage() {
  const [params, setParams] = useState<AssignmentResultParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: "createdAt",
  });

  const { data, isLoading } = useGetAssignmentResults(params);

  const results = data?.data || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;
  const totalPages = meta?.totalPages || 0;

  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await assignmentResultService.getAllAssignmentResultsForExport({
        search: params.search,
        classId: params.classId,
        sessionId: params.sessionId,
        studentId: params.studentId,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
      });
      const allData = res.data.data || [];

      const rows = allData.map((e: any) => ({
        "Mã HS": e.student?.studentCode || "---",
        "Học sinh": e.student?.profile?.fullName || "---",
        "Lớp": e.session?.class?.course?.courseName
          ? `${e.session.class.course.courseName} (${e.session.class.roomCode || ""})`
          : "---",
        "Ngày học": e.session?.studyDate ? new Date(e.session.studyDate).toLocaleDateString("vi-VN") : "---",
        "Ca học": e.session?.shift?.shiftName || e.session?.shiftCode || "---",
        "Điểm": e.score != null ? Number(e.score).toFixed(1) : "---",
        "Nhận xét": e.feedback || "---",
        "Nhập điểm lúc": e.gradedAt ? new Date(e.gradedAt).toLocaleString("vi-VN") : "---",
      }));

      exportToExcel(rows, [
        { key: "Mã HS", header: "Mã HS" },
        { key: "Học sinh", header: "Học sinh" },
        { key: "Lớp", header: "Lớp" },
        { key: "Ngày học", header: "Ngày học" },
        { key: "Ca học", header: "Ca học" },
        { key: "Điểm", header: "Điểm" },
        { key: "Nhận xét", header: "Nhận xét" },
        { key: "Nhập điểm lúc", header: "Nhập điểm lúc" },
      ], "danh-sach-ket-qua-bai-tap");

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
        <AdminPageTitle title="Kết quả bài tập" subtitle="Quản lý" />
        <Button
          onClick={handleExport}
          disabled={exporting || !params.sessionId}
          className="bg-primary text-white px-6 h-11 rounded-md font-semibold"
        >
          <FileDownIcon className="mr-2 size-4" />
          {exporting ? "Đang xuất..." : "Xuất Excel"}
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <AssignmentResultFilter
          params={params}
          onFilterChange={(filters) => setParams((prev) => ({ ...prev, ...filters, page: 1 }))}
        />

        {!params.sessionId ? (
          <div className="py-20 text-center font-medium text-gray-400 italic">
            Vui lòng chọn khóa học, lớp và buổi học để xem kết quả.
          </div>
        ) : (
          <>
            <div className="p-0">
              <DataTable
                columns={getColumns()}
                data={results}
                loading={isLoading}
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-t border-gray-200">
              <PaginationInfo
                page={Number(params.page) || 1}
                limit={Number(params.limit!) || 10}
                totalItems={totalItems}
                currentLength={results.length}
              />
              <DataPagination
                page={Number(params.page!)}
                totalPages={totalPages}
                onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
