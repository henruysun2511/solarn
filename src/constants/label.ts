import { GenderType } from "./type";

export const genderLabel: Record<string, string> = {
    [GenderType.MALE]: "Nam",
    [GenderType.FEMALE]: "Nữ",
    [GenderType.UNKNOWN]: "Khác",
};

export const levelLabels: Record<string, string> = {
    A1: "Cơ Bản",
    A2: "Sơ Cấp",
    B1: "Trung Cấp",
    B2: "Trung Cao Cấp",
    C1: "Nâng Cao",
    C2: "Thành Thạo",
};

export const levelColors: Record<string, string> = {
    A1: "from-emerald-50 to-teal-100 border-emerald-200 text-emerald-700",
    A2: "from-sky-50 to-blue-100 border-sky-200 text-sky-700",
    B1: "from-amber-50 to-orange-100 border-amber-200 text-amber-700",
    B2: "from-rose-50 to-red-100 border-rose-200 text-rose-700",
    C1: "from-purple-50 to-violet-100 border-purple-200 text-purple-700",
    C2: "from-fuchsia-50 to-pink-100 border-fuchsia-200 text-fuchsia-700",
};

export function getLevelLabel(level: string | null | undefined) {
    if (!level) return "Chưa phân loại";
    return levelLabels[level] || level;
}