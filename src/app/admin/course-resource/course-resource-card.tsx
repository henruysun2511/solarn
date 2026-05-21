"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CourseResource } from "@/schemas/course-resource.schema";
import { Edit2Icon, ExternalLink, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { getResourceIcon } from "./course-resource-columns";

interface CourseResourceCardProps {
    resource: CourseResource;
    onEdit: (resource: CourseResource) => void;
    onDelete: (id: string) => void;
}

export function CourseResourceCard({ resource, onEdit, onDelete }: CourseResourceCardProps) {
    const config = getResourceIcon(resource.type);

    return (
        <div className="bg-white rounded-3xl p-5 overflow-hidden border border-gray-200 shadow-sm group hover:shadow-md transition-all flex flex-col justify-between h-[180px]">
            <div>
                <div className="flex items-start justify-between gap-2">
                    <div className={`p-3 text-primary rounded-2xl border ${config.className}`}>
                        {config.icon}
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8 hover:bg-gray-100 rounded-xl">
                                <MoreVerticalIcon className="size-4 text-gray-400" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl p-1.5 shadow-xl border-gray-100">
                            <DropdownMenuItem onClick={() => onEdit(resource)} className="rounded-xl cursor-pointer">
                                <Edit2Icon className="mr-2 size-4 text-gray-400" />
                                Sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => resource.resourceId && onDelete(resource.resourceId)}
                                className="rounded-xl cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                                <Trash2Icon className="mr-2 size-4" />
                                Xóa
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="mt-4 space-y-1">
                    <h3 className="font-black text-gray-800 text-sm leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                        {resource.title}
                    </h3>
                    <p className="text-[11px] font-medium text-gray-400 truncate">
                        Khóa học: {resource.course?.courseName || "---"}
                    </p>
                </div>
            </div>

            <div className="pt-3 border-t border-dashed border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 bg-gray-50 px-2.5 py-0.5 rounded-lg border">
                    {resource.type}
                </span>
                <Button
                    size="sm"
                    variant="ghost"
                    asChild
                    className="rounded-xl text-primary font-bold hover:bg-primary/5 h-8 text-xs gap-1"
                >
                    <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                        Xem tài liệu
                        <ExternalLink className="size-3" />
                    </a>
                </Button>
            </div>
        </div>
    );
}