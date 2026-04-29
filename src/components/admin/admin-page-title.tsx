
export const AdminPageTitle = ({
    title = "Tiêu đề trang",
    subtitle = "Quản lý",
    className = ""
}) => {
    return (
        <div className={`${className}`}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 ml-0.5">
                {subtitle}
            </p>
            <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter leading-none">
                {title}
            </h1>
        </div>
    );
};