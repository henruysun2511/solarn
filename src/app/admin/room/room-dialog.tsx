"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Room, RoomInput, roomInputSchema } from "@/schemas/room.schema";
import { useGetBranches } from "@/queries/useBranchQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { DoorOpenIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface RoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: RoomInput) => void;
  initialData?: Room | null;
  loading?: boolean;
}

export function RoomDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  loading,
}: RoomDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RoomInput>({
    resolver: zodResolver(roomInputSchema),
  });

  const branchId = watch("branchId");
  const { data: branchesData } = useGetBranches({ limit: 100 });
  const branches = branchesData?.data || [];

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          roomCode: initialData.roomCode,
          capacity: initialData.capacity,
          branchId: initialData.branchId || undefined,
        });
      } else {
        reset({
          roomCode: "",
          capacity: 0,
          branchId: undefined,
        });
      }
    }
  }, [initialData, reset, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-role="admin"
        className="sm:max-w-[500px] rounded-[2rem] bg-white border border-gray-100 shadow-2xl p-0 overflow-hidden font-sans"
      >
        <DialogHeader className="p-8 bg-white border-b border-gray-50">
          <div className="size-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4">
            <DoorOpenIcon className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tighter text-gray-900">
            {initialData ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-medium">
            {initialData
              ? "Cập nhật lại thông tin mã phòng và sức chứa."
              : "Thiết lập thông tin cơ bản cho phòng học mới."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 space-y-6 bg-white">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Mã phòng
              </Label>
              <Input
                placeholder="VD: A101"
                className="h-12 rounded-xl border-gray-200 bg-white focus-visible:ring-primary/10"
                {...register("roomCode")}
              />
              {errors.roomCode && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.roomCode.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Sức chứa (Học sinh)
              </Label>
              <Input
                type="number"
                placeholder="VD: 30"
                className="h-12 rounded-xl border-gray-200 bg-white"
                {...register("capacity")}
              />
              {errors.capacity && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.capacity.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Chi nhánh
              </Label>
              <Select
                value={branchId || ""}
                onValueChange={(val) => setValue("branchId", val)}
              >
                <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white shadow-none">
                  <SelectValue placeholder="Chọn chi nhánh" />
                </SelectTrigger>
                <SelectContent data-role="admin">
                  {branches.map((branch) => (
                    <SelectItem key={branch.branchId} value={branch.branchId!}>
                      {branch.branchName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.branchId && (
                <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-wider">
                  {errors.branchId.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="p-8 bg-white border-t border-gray-50 flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="h-12 px-6 rounded-xl font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-10 rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
            >
              {loading ? "Đang xử lý..." : initialData ? "Cập nhật phòng" : "Lưu phòng"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
