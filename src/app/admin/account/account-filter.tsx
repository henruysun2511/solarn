"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AccountSortBy, SortOrder } from "@/constants/sort";
import { useGetRoles } from "@/queries/useRoleQuery";
import { AccountParams } from "@/schemas/account.schema";
import { ArrowUpDown, FilterIcon, SearchIcon, SortAsc, SortDesc, XIcon } from "lucide-react";
import { useState } from "react";

interface AccountFilterProps {
  onSearch: (value: string) => void;
  onFilterChange: (filters: Partial<AccountParams>) => void;
  onRowsPerPageChange: (value: number) => void;
}

export function AccountFilter({
  onSearch,
  onFilterChange,
  onRowsPerPageChange,
}: AccountFilterProps) {
  const [searchValue, setSearchValue] = useState("");
  const { data: rolesData } = useGetRoles();
  const roles = rolesData?.data || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const clearSearch = () => {
    setSearchValue("");
    onSearch("");
  };

  return (
    <div className="p-5 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Tìm kiếm */}
        <form onSubmit={handleSearch} className="relative w-[280px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Tên đăng nhập..."
            className="pl-9 h-10 border-gray-300 bg-white pr-9"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <XIcon className="size-4" />
            </button>
          )}
        </form>

        <Select
          onValueChange={(val) =>
            onFilterChange({
              roleId: val === "all" ? undefined : val
            })
          }
        >
          <SelectTrigger className="w-[180px] h-10 border-gray-300 bg-white shadow-sm">
            <FilterIcon className="size-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Quyền hạn" />
          </SelectTrigger>
          <SelectContent data-role="admin">
            <SelectItem value="all">Tất cả quyền</SelectItem>
            {roles?.map((role) => (
              <SelectItem key={role.roleId} value={role.roleId}>
                {role.roleName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          defaultValue={AccountSortBy.CREATED_AT}
          onValueChange={(val) => onFilterChange({ sortBy: val as any })}
        >
          <SelectTrigger className="w-[160px] h-10 border-gray-300 bg-white shadow-sm">
            <ArrowUpDown className="size-4 mr-2 text-gray-400" />
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent data-role="admin">
            <SelectItem value={AccountSortBy.CREATED_AT}>Ngày tạo</SelectItem>
            <SelectItem value={AccountSortBy.USERNAME}>Tên đăng nhập</SelectItem>
            <SelectItem value={AccountSortBy.STATUS}>Trạng thái</SelectItem>
          </SelectContent>
        </Select>

        <Select
          defaultValue={SortOrder.DESC}
          onValueChange={(val) => onFilterChange({ sortOrder: val as SortOrder.ASC | SortOrder.DESC })}
        >
          <SelectTrigger className="w-[150px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent data-role="admin">
            <SelectItem value={SortOrder.DESC}>
              <div className="flex items-center gap-2">
                <SortDesc className="size-4 text-gray-400" />
                <span>Giảm dần</span>
              </div>
            </SelectItem>
            <SelectItem value={SortOrder.ASC}>
              <div className="flex items-center gap-2">
                <SortAsc className="size-4 text-gray-400" />
                <span>Tăng dần</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Hiển thị:</span>
        <Select
          defaultValue="10"
          onValueChange={(val) => onRowsPerPageChange(Number(val))}
        >
          <SelectTrigger className="w-[80px] h-10 border-gray-300 bg-white shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent data-role="admin">
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
