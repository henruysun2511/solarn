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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2Icon, TrashIcon, UploadIcon, UserPlusIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import * as XLSX from "xlsx";

interface ScoreEntry {
  studentCode: string;
  score: string;
  feedback: string;
}

interface AssignmentResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { sessionId: string; studentId: string; score: number; feedback?: string }[]) => void;
  isPending?: boolean;
  sessionId: string;
  sessionLabel?: string;
  students: { studentId: string; studentCode: string; fullName: string }[];
}

export function AssignmentResultDialog({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  sessionId,
  sessionLabel,
  students,
}: AssignmentResultDialogProps) {
  const [entries, setEntries] = useState<ScoreEntry[]>([]);
  const [manualCode, setManualCode] = useState("");
  const [manualScore, setManualScore] = useState("");
  const [manualFeedback, setManualFeedback] = useState("");

  const studentMap = useMemo(() => {
    const map = new Map<string, { studentId: string; fullName: string }>();
    students.forEach((s) => map.set(s.studentCode, { studentId: s.studentId, fullName: s.fullName }));
    return map;
  }, [students]);

  const resolveEntries = useMemo(() => {
    return entries
      .map((e) => {
        const student = studentMap.get(e.studentCode);
        const scoreNum = parseFloat(e.score);
        if (!student || isNaN(scoreNum) || scoreNum < 0 || scoreNum > 10) return null;
        return {
          sessionId,
          studentId: student.studentId,
          score: scoreNum,
          feedback: e.feedback || undefined,
        };
      })
      .filter(Boolean) as { sessionId: string; studentId: string; score: number; feedback?: string }[];
  }, [entries, studentMap, sessionId]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json: Record<string, string>[] = XLSX.utils.sheet_to_json(sheet);

        const parsed: ScoreEntry[] = json.map((row) => {
          const keys = Object.keys(row);
          const codeKey = keys.find((k) => /mã.*hs|student.*code|mã.*hv/i.test(k)) || keys[0];
          const scoreKey = keys.find((k) => /điểm|score|điêm/i.test(k)) || keys[1] || keys[0];
          const feedbackKey = keys.find((k) => /nhận.*xét|feedback|note/i.test(k));

          return {
            studentCode: String(row[codeKey] || "").trim(),
            score: String(row[scoreKey] || "").trim(),
            feedback: feedbackKey ? String(row[feedbackKey] || "").trim() : "",
          };
        }).filter((r) => r.studentCode && r.score);

        setEntries((prev) => {
          const existing = new Set(prev.map((r) => r.studentCode));
          const newEntries = parsed.filter((r) => !existing.has(r.studentCode));
          return [...prev, ...newEntries];
        });
      } catch (err) {
        console.error("Parse Excel error:", err);
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  }, []);

  const addManualEntry = () => {
    if (!manualCode || !manualScore) return;
    const student = studentMap.get(manualCode);
    if (!student) return;

    setEntries((prev) => {
      if (prev.some((e) => e.studentCode === manualCode)) return prev;
      return [...prev, { studentCode: manualCode, score: manualScore, feedback: manualFeedback }];
    });
    setManualCode("");
    setManualScore("");
    setManualFeedback("");
  };

  const removeEntry = (idx: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateEntry = (idx: number, field: keyof ScoreEntry, value: string) => {
    setEntries((prev) => prev.map((e, i) => (i === idx ? { ...e, [field]: value } : e)));
  };

  const handleSubmit = () => {
    if (resolveEntries.length === 0) return;
    onSubmit(resolveEntries);
  };

  const handleClose = () => {
    setEntries([]);
    setManualCode("");
    setManualScore("");
    setManualFeedback("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
      <DialogContent data-role="teacher" className="!max-w-4xl p-0 overflow-hidden rounded-[2rem] border-none shadow-2xl bg-white">
        <DialogHeader className="p-8 pb-4 bg-white border-b border-gray-50">
          <div className="size-12 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mb-4">
            <UploadIcon className="size-6 text-[var(--primary)]" />
          </div>
          <DialogTitle className="text-2xl font-black text-gray-800 tracking-tight">
            Nhập điểm bài tập
          </DialogTitle>
          <DialogDescription className="text-sm font-medium text-gray-400 mt-1">
            {sessionLabel || `Buổi học: ${sessionId.slice(0, 8)}...`}
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Upload Excel */}
          <div className="space-y-3">
            <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
              Tải lên file Excel
            </Label>
            <div className="border-2 border-dashed border-gray-200 hover:border-[var(--primary)]/50 rounded-2xl bg-gray-50/50 p-6 transition-all flex flex-col items-center justify-center gap-2 relative group">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <UploadIcon className="size-8 text-gray-300 group-hover:text-[var(--primary)]/50 transition-colors" />
              <p className="text-sm font-bold text-gray-500">Nhấn để chọn file Excel (.xlsx)</p>
              <p className="text-[10px] text-gray-400">Cột: Mã học sinh, Điểm, Nhận xét (không bắt buộc)</p>
            </div>
          </div>

          {/* Preview / Manual entries table */}
          {entries.length > 0 && (
            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Danh sách điểm ({entries.length})
              </Label>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50">
                      <TableHead className="text-[10px] font-black text-gray-400 uppercase">Mã HS</TableHead>
                      <TableHead className="text-[10px] font-black text-gray-400 uppercase">Họ tên</TableHead>
                      <TableHead className="text-[10px] font-black text-gray-400 uppercase">Điểm</TableHead>
                      <TableHead className="text-[10px] font-black text-gray-400 uppercase">Nhận xét</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entries.map((entry, idx) => {
                      const student = studentMap.get(entry.studentCode);
                      const isValid = student && !isNaN(parseFloat(entry.score)) && parseFloat(entry.score) >= 0 && parseFloat(entry.score) <= 10;
                      return (
                        <TableRow key={idx} className={!isValid ? "bg-red-50/50" : ""}>
                          <TableCell>
                            <Input
                              value={entry.studentCode}
                              onChange={(e) => updateEntry(idx, "studentCode", e.target.value)}
                              className="h-9 rounded-lg border-gray-200 text-sm font-semibold w-[140px]"
                            />
                          </TableCell>
                          <TableCell className="font-medium text-gray-600 text-sm">
                            {student?.fullName || <span className="text-red-400">Không tìm thấy</span>}
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.score}
                              onChange={(e) => updateEntry(idx, "score", e.target.value)}
                              className="h-9 rounded-lg border-gray-200 text-sm font-bold w-[90px]"
                              type="number"
                              min={0}
                              max={10}
                              step={0.1}
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={entry.feedback}
                              onChange={(e) => updateEntry(idx, "feedback", e.target.value)}
                              className="h-9 rounded-lg border-gray-200 text-sm w-[200px]"
                              placeholder="Nhận xét..."
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeEntry(idx)}
                              className="size-8 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50"
                            >
                              <TrashIcon className="size-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Manual add */}
          <div className="border-t border-gray-100 pt-6 space-y-3">
            <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
              Thêm thủ công
            </Label>
            <div className="flex flex-wrap items-end gap-3">
              <div className="space-y-1">
                <Label className="text-[10px] font-bold text-gray-400 ml-1">Chọn học sinh</Label>
                <Select value={manualCode} onValueChange={setManualCode}>
                  <SelectTrigger className="w-[200px] h-10 border-gray-300 bg-white shadow-sm">
                    <SelectValue placeholder="Chọn học sinh" />
                  </SelectTrigger>
                  <SelectContent>
                    {students
                      .filter((s) => !entries.some((e) => e.studentCode === s.studentCode))
                      .map((s) => (
                        <SelectItem key={s.studentId} value={s.studentCode}>
                          {s.studentCode} - {s.fullName}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] font-bold text-gray-400 ml-1">Điểm</Label>
                <Input
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  placeholder="0-10"
                  value={manualScore}
                  onChange={(e) => setManualScore(e.target.value)}
                  className="h-10 rounded-xl border-gray-300 bg-white w-[90px]"
                />
              </div>
              <div className="space-y-1 flex-1">
                <Label className="text-[10px] font-bold text-gray-400 ml-1">Nhận xét</Label>
                <Input
                  placeholder="Nhận xét (không bắt buộc)..."
                  value={manualFeedback}
                  onChange={(e) => setManualFeedback(e.target.value)}
                  className="h-10 rounded-xl border-gray-300 bg-white"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={addManualEntry}
                disabled={!manualCode || !manualScore}
                className="h-10 px-4 rounded-xl border-gray-300 font-bold text-xs gap-1.5"
              >
                <UserPlusIcon className="size-4" />
                Thêm
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="p-8 bg-white border-t border-gray-50 flex gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            className="h-12 px-6 rounded-xl font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            disabled={resolveEntries.length === 0 || isPending}
            onClick={handleSubmit}
            className="h-12 px-10 rounded-xl bg-[var(--primary)] text-white font-black shadow-lg shadow-[var(--primary)]/20 hover:opacity-90 transition-all"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2Icon className="size-4 animate-spin" />
                <span>Đang lưu {resolveEntries.length} điểm...</span>
              </div>
            ) : (
              `Lưu ${resolveEntries.length} điểm`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
