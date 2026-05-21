export function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
    return (
        <div className="flex items-center gap-4 group/item">
            <div className="size-10 rounded-xl bg-[var(--dashboard-bg)] flex items-center justify-center text-[var(--primary)] group-hover/item:bg-[var(--primary)] group-hover/item:text-white transition-colors">
                <Icon className="size-5" />
            </div>
            <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">{label}</p>
                <p className="text-sm font-black text-[var(--foreground)]">{value}</p>
            </div>
        </div>
    );
}