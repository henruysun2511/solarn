import { cn } from "@/lib/utils";
import React from "react";

interface LogoProps {
    icon: any;
    brandText?: string;
    highlightText?: string;
    className?: string;
    iconBgColor?: string; // Thêm prop này
}

export const Logo = ({
    icon: Icon,
    brandText = "SOLAR",
    highlightText = "N",
    className,
    iconBgColor = "var(--primary)" // Nhận vào có thể là HEX hoặc biến CSS
}: LogoProps) => {

    // Kiểm tra nếu là Tailwind class (ví dụ: bg-blue-500)
    const isTailwindClass = iconBgColor.startsWith('bg-');

    // Tạo màu chữ tương ứng nếu dùng mã màu HEX/CSS Variable
    // Nếu iconBgColor là "var(--primary)" thì màu chữ sẽ là "text-[var(--primary)]"
    const textColorStyle = !isTailwindClass ? { color: iconBgColor } : {};

    return (
        <div className={cn("flex items-center gap-3", className)}>
            {/* Icon Box */}
            <div
                className={cn(
                    "flex size-9 items-center justify-center rounded-lg text-white shadow-lg transition-all duration-300",
                    isTailwindClass ? iconBgColor : ""
                )}
                style={{ backgroundColor: !isTailwindClass ? iconBgColor : undefined }}
            >
                {React.isValidElement(Icon) ? Icon : (typeof Icon === 'function' && <Icon className="size-6" />)}
            </div>

            {/* Text */}
            <span className="text-2xl font-bold tracking-tighter text-foreground group-data-[collapsible=icon]:hidden transition-colors duration-300">
                {brandText}
                <span
                    className={cn(!isTailwindClass ? "" : "text-secondary")}
                    style={textColorStyle}
                >
                    {highlightText}
                </span>
            </span>
        </div>
    );
};