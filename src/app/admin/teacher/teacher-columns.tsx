"use client";

import { UserAvatar } from "@/components/common/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Teacher } from "@/schemas/teacher.schema";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";

interface ColumnProps {
    onEdit?: (teacher: Teacher) => void;
    onDelete?: (id: string) => void;
}

export const getColumns = ({ onEdit, onDelete }: ColumnProps = {}): ColumnDef<Teacher>[] => [
    {
        accessorKey: "teacherCode",
        header: "Mã giáo viên",
        cell: ({ row }) => (
            <span className="font-semibold text-primary">{row.original.teacherCode}</span>
        ),
    },
    {
        accessorKey: "profile.fullName",
        header: "Tên giáo viên",
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <UserAvatar
                    avatarUrl={row.original.profile?.avatarUrl}
                    gender={row.original.profile?.gender}
                    fullName={row.original.profile?.fullName}
                />
                <div className="font-semibold text-gray-800">{row.original.profile?.fullName || "---"}</div>

            </div>
        ),
    },
    {
        accessorKey: "profile.email",
        header: "Email",
        cell: ({ row }) => <span className="text-gray-500 line-clamp-1">{row.original.profile?.email || "---"}</span>,
    },
    {
        accessorKey: "profile.phone",
        header: "Số điện thoại",
        cell: ({ row }) => <span className="text-gray-500">{row.original.profile?.phone || "---"}</span>,
    },
    {
        accessorKey: "salaryRate",
        header: "Hạch định lương",
        cell: ({ row }) => <span className="text-gray-700 font-medium">{row.original.salaryRate?.toLocaleString()}</span>,
    },
    {
        accessorKey: "teacherSpecialties",
        header: "Chuyên môn giảng dạy",
        cell: ({ row }) => {
            const specialties = row.original.teacherSpecialties || [];
            const courseNames = specialties.map(s => s.course?.courseName).filter(Boolean);

            if (courseNames.length === 0) {
                return <span className="text-gray-400">Không có</span>;
            }

            return (
                <div className="flex flex-wrap gap-2">
                    {courseNames.slice(0, 2).map((name, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                            {name}
                        </Badge>
                    ))}
                    {courseNames.length > 2 && (
                        <Badge variant="outline">+{courseNames.length - 2}</Badge>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "warningCount",
        header: "Số lần cảnh báo",
        cell: ({ row }) => (
            <Badge
                variant="outline"
                className={
                    row.original.warningCount === 0
                        ? "bg-green-100 text-green-700 border-green-200"
                        : row.original.warningCount === 1
                            ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                            : "bg-red-100 text-red-700 border-red-200"
                }
            >
                {row.original.warningCount}
            </Badge>
        ),
    },
    {
        id: "actions",
        header: () => <div className="text-right pr-6">Thao tác</div>,
        cell: ({ row }) => (
            <div className="text-right pr-6">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-9">
                            <MoreVerticalIcon className="size-5 text-gray-500" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(row.original)}>
                                <PencilIcon className="mr-2 size-4" />
                                Sửa
                            </DropdownMenuItem>
                        )}
                        {onDelete && (
                            <DropdownMenuItem onClick={() => row.original.teacherId && onDelete(row.original.teacherId)} className="text-red-600">
                                <TrashIcon className="mr-2 size-4" />
                                Xóa
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
];
