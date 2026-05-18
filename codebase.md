Cấu trúc Base Frontend Module (Next.js + React Query + Zod)
Tổng quan
Một module quản lý chuẩn (ví dụ: Courses) ở phía Frontend bao gồm các thành phần cốt lõi sau:

Service: Chịu trách nhiệm thực hiện các cuộc gọi API sử dụng Axios instance.

Schema (Zod): Định nghĩa kiểu dữ liệu (Types) và thực hiện xác thực (Validation) cho Form dữ liệu đầu vào hoặc Query Parameters trên URL.

Query Hooks (React Query/TanStack Query): Đóng gói các Logic xử lý bất đồng bộ thành các custom hooks như useGet..., useCreate..., useUpdate..., useDelete....

Components:

Filter: Bộ lọc tìm kiếm, sắp xếp, thay đổi số hàng hiển thị trên một trang (rows per page).

Dialog: Biểu mẫu (Form) Thêm/Sửa dữ liệu tích hợp react-hook-form và zodResolver.

Columns: Định nghĩa cấu trúc các cột hiển thị cho bảng dữ liệu DataTable (shadcn/ui).

Card (Tùy chọn): Hiển thị danh sách dữ liệu dưới dạng lưới (Grid View).

Page: Thành phần trang chính kết hợp tất cả các thành phần trên, chịu trách nhiệm quản lý State Params, xử lý Mutation và kích hoạt phân trang.

Cấu trúc thư mục (Ví dụ với module courses)
Plaintext
src/
├── app/admin/courses/
│   ├── page.tsx
│   ├── course-card.tsx (Tùy chọn cho Grid View)
│   ├── course-columns.tsx
│   ├── course-dialog.tsx
│   └── course-filter.tsx
├── services/
│   └── course.service.ts
├── schemas/
│   └── course.schema.ts
├── queries/
│   └── useCourseQuery.ts
├── constants/
│   ├── sort.ts (SortOrder, SortBy enum)
│   └── type.ts (CourseLevel, ...)
└── utils/
    ├── http.ts (Axios instance)
    └── handleError.ts
1. Service
Sử dụng Axios instance http (đã được cấu hình sẵn Interceptor để tự động gắn Token và cấu hình baseURL). Mỗi tệp service sẽ export ra một đối tượng chứa đầy đủ các phương thức tương tác API.

course.service.ts
TypeScript
import { ApiResponse } from "@/constants/apiResponse";
import { Course, CourseInput, CourseParams } from "@/schemas/course.schema";
import http from "@/utils/http";

const prefix = "/courses";

const courseService = {
  getCourses: (params?: CourseParams) => {
    return http.get<ApiResponse<Course[]>>(prefix, { params });
  },
  createCourse: (data: CourseInput) => {
    return http.post<ApiResponse<Course>>(prefix, data);
  },
  updateCourse: (id: string, data: CourseInput) => {
    return http.put<ApiResponse<Course>>(`${prefix}/${id}`, data);
  },
  deleteCourse: (id: string) => {
    return http.delete<ApiResponse<any>>(`${prefix}/${id}`);
  },
};

export default courseService;
[!NOTE]
Khung dữ liệu ApiResponse<T> mặc định thường có cấu trúc: { data: T, message: string, meta?: any }.

2. Schema (Zod)
Thành phần này chịu trách nhiệm định nghĩa 3 nhóm dữ liệu chính:

Course (Kiểu dữ liệu trả về từ API): Sử dụng z.object và trích xuất kiểu bằng z.infer.

CourseParams (Tham số truy vấn API): Định nghĩa các trường page, limit, search, sortBy, sortOrder,...

CourseInput (Dữ liệu đầu vào của Form): Thường tương ứng với các Schema Create/Update DTO ở phía Backend.

course.schema.ts
TypeScript
import { SortOrder } from "@/constants/sort";
import { CourseLevel } from "@/constants/type";
import z from "zod";

export const courseSchema = z.object({
  courseId: z.string().uuid().optional(),
  courseName: z.string().min(1, "Tên khóa học là bắt buộc").max(255),
  tuitionFee: z.string().regex(/^\d+(\.\d{1,2})?$/, "Học phí phải là số"),
  level: z.nativeEnum(CourseLevel).optional().nullable(),
  totalSessions: z.number().int().min(1),
  image: z.string().url().optional().nullable(),
  description: z.string().optional().nullable(),
  totalClasses: z.number().optional(),
});
export type Course = z.infer<typeof courseSchema>;

export const courseParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  level: z.string().optional(),
  sortOrder: z.enum([SortOrder.DESC, SortOrder.ASC]).optional().default(SortOrder.DESC),
  sortBy: z.string().optional().default("courseName"),
});
export type CourseParams = z.infer<typeof courseParamsSchema>;

// Sử dụng cho form dữ liệu (Hỗ trợ ép kiểu bằng coerce với number, string)
export const courseInputSchema = z.object({
  courseName: z.string().min(1).max(255),
  tuitionFee: z.string().regex(/^\d+$/),
  level: z.string().optional().nullable(),
  totalSessions: z.coerce.number().int().min(1),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});
export type CourseInput = z.input<typeof courseInputSchema>;
3. Query Hooks (React Query)
Xây dựng các custom hooks quản lý bất đồng bộ cho từng module riêng biệt. Query Key bắt buộc phải bao gồm cả đối tượng params để cơ chế tự động kích hoạt lại truy vấn (Refetch) và Cache hoạt động chính xác khi bộ lọc thay đổi.

useCourseQuery.ts
TypeScript
import { CourseInput, CourseParams } from "@/schemas/course.schema";
import courseService from "@/services/course.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const COURSE_QUERY_KEY = ["courses"];

export const useGetCourses = (params?: CourseParams) => {
  return useQuery({
    queryKey: [...COURSE_QUERY_KEY, params],
    queryFn: () => courseService.getCourses(params).then((res) => res.data),
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CourseInput) => courseService.createCourse(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: COURSE_QUERY_KEY }),
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CourseInput }) =>
      courseService.updateCourse(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: COURSE_QUERY_KEY }),
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => courseService.deleteCourse(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: COURSE_QUERY_KEY }),
  });
};
4. Components
4.1 Filter Component
Thành phần này nhận vào các Props sự kiện để cập nhật State lên Page tổng. Nên sử dụng một biến State cục bộ (useState) để tối ưu hóa hiệu năng khi người dùng gõ từ khóa tìm kiếm (search input).

course-filter.tsx
TypeScript
import { useState } from "react";
import { CourseParams } from "@/schemas/course.schema";

interface CourseFilterProps {
  onSearch: (value: string) => void;
  onFilterChange: (filters: Partial<CourseParams>) => void;
  onRowsPerPageChange: (value: number) => void;
}

export function CourseFilter({ onSearch, onFilterChange, onRowsPerPageChange }: CourseFilterProps) {
  const [searchValue, setSearchValue] = useState("");
  // Render giao diện: Input Search, Select Filter Level, SortBy, SortOrder, Rows Per Page...
  return null; 
}
4.2 Dialog Component (Form)
Quản lý Form Thêm mới / Cập nhật bằng giải pháp react-hook-form kết hợp zodResolver.

Props: open, onOpenChange, onSubmit, loading, initialData.

Sử dụng hook useForm với cấu hình resolver: zodResolver(courseInputSchema).

Sử dụng hook useEffect để thực hiện reset() lại Form mỗi khi trạng thái đóng/mở (open) hoặc dữ liệu ban đầu (initialData) biến động.

Tích hợp Logic xử lý tải lên hình ảnh (nếu có) và xử lý hiển thị ảnh xem trước (Preview Image).

4.3 Columns for DataTable (shadcn/ui)
Xuất ra một hàm khởi tạo getColumns nhận vào các hàm Callback (onEdit, onDelete, onView) và trả về một mảng định nghĩa cấu trúc cột dạng ColumnDef<Course>[].

course-columns.tsx
TypeScript
import { ColumnDef } from "@tanstack/react-table";
import { Course } from "@/schemas/course.schema";

interface ColumnProps {
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export const getColumns = ({ onEdit, onDelete, onView }: ColumnProps): ColumnDef<Course>[] => [
  { accessorKey: "courseName", header: "Khóa học" },
  { accessorKey: "level", header: "Trình độ" },
  // Cột chức năng (Action Column) chứa DropdownMenu (Sửa, Xóa, Xem chi tiết)
];
4.4 Card Component (Grid View) - Tùy chọn
Nếu module có yêu cầu bổ sung giao diện hiển thị dạng lưới, xây dựng component CourseCard để nhận đối tượng course cùng các hàm callback tương ứng. Nếu không yêu cầu, có thể bỏ qua thành phần này.

5. Page Component
Tập trung quản lý toàn bộ các trạng thái (State Params), điều khiển chế độ hiển thị (viewMode), kích hoạt các Custom Hooks dữ liệu, đồng thời điều phối các tác vụ Submit Form hoặc Xóa bản ghi.

app/admin/courses/page.tsx
TypeScript
"use client";

import { useState } from "react";
import { useGetCourses, useCreateCourse, useUpdateCourse, useDeleteCourse } from "@/queries/useCourseQuery";
import { Course, CourseParams, CourseInput } from "@/schemas/course.schema";
import { SortOrder } from "@/constants/sort";
import { getColumns } from "./course-columns";
// ... Import các component dùng chung khác (DataTable, CourseDialog, ConfirmDialog)

export default function AdminCoursePage() {
  const [params, setParams] = useState<CourseParams>({
    page: 1,
    limit: 10,
    sortOrder: SortOrder.DESC,
    sortBy: "courseName",
  });
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // React Query Hooks
  const { data, isLoading } = useGetCourses(params);
  const createMutation = useCreateCourse();
  const updateMutation = useUpdateCourse();
  const deleteMutation = useDeleteCourse();

  const courses = data?.data || [];
  const meta = data?.meta;

  const handleSubmit = async (formData: CourseInput) => {
    // Xử lý gọi createMutation hoặc updateMutation dựa trên trạng thái editingCourse
  };
  
  const handleConfirmDelete = async () => {
    // Xử lý gọi deleteMutation khi deleteId tồn tại
  };

  return (
    <div className="space-y-4">
      {/* Khối Header: Tiêu đề + Nút chuyển chế độ ViewMode + Nút Thêm mới */}
      {/* Khối Bộ lọc: CourseFilter */}
      
      {viewMode === "table" ? (
        <DataTable columns={getColumns({ onEdit: (c) => {}, onDelete: (id) => {}, onView: (id) => {} })} data={courses} loading={isLoading} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map(course => (
            <div key={course.courseId}>Course Card Component</div>
          ))}
        </div>
      )}
      
      {/* Khối Phân trang: Pagination Component */}
      {/* Khối Dialog Form & Dialog Xác nhận xóa */}
    </div>
  );
}
Các lưu ý quan trọng khi khởi tạo một module mới
[!IMPORTANT]
Đây là cấu trúc thiết kế mẫu chuẩn hóa. Tùy thuộc vào yêu cầu nghiệp vụ thực tế của từng màn hình chức năng, bạn có thể linh hoạt loại bỏ hoặc bổ sung các thành phần.

Không có Grid View: Lược bỏ biến viewMode, bỏ qua tệp component CourseCard và cấu trúc rẽ nhánh hiển thị UI trên Page, chỉ giữ lại bảng dữ liệu duy nhất (DataTable).

Không có tác vụ tải ảnh: Lược bỏ toàn bộ logic liên quan đến trường dữ liệu ảnh, tệp tin và các thư viện hỗ trợ preview/upload ảnh trong Dialog Form.

Tùy biến bộ lọc: Thay đổi các bộ lọc đầu vào linh hoạt dựa trên đặc thù dữ liệu (ví dụ: bộ lọc trạng thái status, khoảng ngày date range, danh mục category,...).

Logic nghiệp vụ đặc biệt: Bổ sung thêm các bước xử lý dữ liệu trung gian, các điều kiện ràng buộc trước khi thực hiện hành động xóa hoặc kích hoạt Mutation.

Form phức tạp: Trường hợp Form chứa quá nhiều thông tin, tiến hành chia nhỏ Form thành các bước (Multi-step form) hoặc tổ chức cấu trúc mảng động (Dynamic Field Arrays).

Không sử dụng DataTable: Đối với các màn hình quản lý danh sách ở mức siêu tối giản, không yêu cầu các tính năng nâng cao (Sắp xếp/Lọc), có thể hiển thị bằng danh sách thẻ hoặc cấu trúc bảng HTML cơ bản.

Không có phân trang: Nếu API mặc định trả về toàn bộ danh sách dữ liệu trong một lượt truy vấn, tiến hành loại bỏ Component phân trang khỏi giao diện.

Checklist các bước triển khai một module mới (Frontend)
[ ] Bước 1: Khởi tạo tệp cấu trúc Schema (Zod) – định nghĩa rõ ràng cấu trúc dữ liệu Input, Params, và Response.

[ ] Bước 2: Khởi tạo tệp Service thực hiện khai báo các hàm gọi API tương ứng.

[ ] Bước 3: Tạo lập tệp chứa custom Query Hooks (Sử dụng React Query để bọc các hàm Service).

[ ] Bước 4: Triển khai thiết kế các thành phần giao diện (Components):

[ ] Thành phần bộ lọc Filter (Nếu giao diện yêu cầu bộ lọc).

[ ] Thành phần hộp thoại Dialog Form (Dành cho chức năng Thêm/Sửa).

[ ] Thành phần cấu trúc cột Columns (Nếu sử dụng hiển thị dạng bảng dữ liệu DataTable).

[ ] Thành phần hiển thị khối Card (Nếu giao diện yêu cầu hiển thị dạng lưới Grid View).

[ ] Bước 5: Xây dựng trang quản lý chính page.tsx (app/admin/[module-name]/page.tsx) nhằm đồng bộ hóa State Params và điều hướng các Mutations.

[ ] Bước 6: Cập nhật Menu điều hướng của trang Quản trị (Sidebar/Navbar Admin) để nhúng liên kết dẫn tới Route mới tạo.

[ ] Bước 7: Rà soát, đảm bảo toàn bộ các hằng số hệ thống (sortOrder, sortBy enum, type enum) đã được khai báo tập trung trong thư mục constants/.