"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Briefcase,
    CalendarDays,
    Edit3,
    Mail,
    MapPin,
    Phone,
    School,
    Stethoscope,
    User
} from "lucide-react";

export default function StudentProfilePage() {
    return (
        <div className="space-y-8 pb-10">
            {/* 1. TOP HEADER CARD - Thông tin chính */}
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-[var(--sidebar-border)] relative overflow-hidden group">
                <div className="flex flex-col xl:flex-row items-center xl:items-start gap-10 relative z-10">
                    {/* Avatar & Action */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative group/avatar">
                            <div className="size-44 md:size-52 rounded-[3.5rem] bg-[var(--accent)] border-4 border-[var(--primary)]/10 overflow-hidden shadow-2xl transition-transform group-hover/avatar:scale-105 duration-500">
                                <img
                                    src="https://i.pinimg.com/1200x/93/9f/e2/939fe2f38c9806ad7b80fde47c59c83d.jpg"
                                    alt="Student"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white size-8 rounded-full shadow-lg" title="Active" /> */}
                        </div>

                        <div className="flex gap-3 w-full">
                            {/* <Button variant="outline" className="flex-1 rounded-2xl border-red-100 text-red-500 hover:bg-red-50 font-black h-12 shadow-sm">
                                <ShieldAlert className="size-4 mr-2" /> Khóa
                            </Button> */}

                        </div>
                    </div>

                    {/* Personal Info Grid */}
                    <div className="flex-1 space-y-8 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 text-center md:text-left">
                            <div className="space-y-2">
                                <h1 className="text-4xl md:text-5xl font-black text-[var(--foreground)] tracking-tighter">
                                    Nhat <span className="text-[var(--primary)]">Huy</span>
                                </h1>
                                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                    <Badge className="bg-[var(--accent)] text-[var(--primary)] border-none font-black rounded-full px-4 py-1">
                                        ID: AD1256589
                                    </Badge>
                                    <Badge className="bg-amber-100 text-amber-700 border-none font-black rounded-full px-4 py-1">
                                        Lớp K26CNTTB
                                    </Badge>
                                </div>
                            </div>
                            <Button className="w-[100px] rounded-2xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 font-black h-12 shadow-lg shadow-[var(--primary)]/20">
                                <Edit3 className="size-4 mr-2" /> Sửa
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <InfoItem icon={User} label="Giới tính" value="Nam" />
                            <InfoItem icon={CalendarDays} label="Ngày sinh" value="25/11/2005" />
                            <InfoItem icon={Briefcase} label="Danh mục" value="Học sinh mới" />
                            <InfoItem icon={Phone} label="Điện thoại" value="+84 987 654 321" />
                            <InfoItem icon={Mail} label="Email" value="huysun2511@gmail.com" />
                            <InfoItem icon={MapPin} label="Khu vực" value="Văn Miếu, Hà Nội" />
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[var(--accent)] rounded-full blur-3xl opacity-40 -z-0" />
            </div>

            {/* 2. MIDDLE SECTION - Parent & Academic Info */}
            <div className="space-y-6">
                <h3 className="text-2xl font-black text-[var(--foreground)] tracking-tight flex items-center gap-3 px-2">
                    <div className="w-2 h-8 bg-[var(--primary)] rounded-full" />
                    Thông tin gia đình & Học tập
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ParentCard name="Đặng Tuấn" role="Bố học sinh" phone="+84 912 000 111" email="fox.father@mail.com" image="3" />
                    <ParentCard name="Mi Thị Đào" role="Mẹ học sinh" phone="+84 912 000 222" email="simmons.mother@mail.com" image="5" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailListCard
                        title="Thông tin trường cũ"
                        icon={School}
                        items={[
                            { label: "Trường cũ", value: "THCS Nguyễn Du" },
                            { label: "Điểm trung bình", value: "8.5" },
                            { label: "Năm tốt nghiệp", value: "2023" },
                        ]}
                    />
                    <DetailListCard
                        title="Thông tin y tế"
                        icon={Stethoscope}
                        items={[
                            { label: "Nhóm máu", value: "O+" },
                            { label: "Chiều cao", value: "1m75" },
                            { label: "Cân nặng", value: "65kg" },
                        ]}
                    />
                </div>
            </div>

            {/* 3. BOTTOM SECTION - Tài chính (Full Width) */}
            <div className="space-y-6 pt-4">
                <h3 className="text-2xl font-black text-[var(--foreground)] tracking-tight px-2 flex items-center gap-3">
                    <div className="w-2 h-8 bg-[var(--primary)] rounded-full" />
                    Tài chính & Thanh toán
                </h3>
                <Card className="rounded-[2.5rem] border-[var(--sidebar-border)] bg-white shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <CardContent className="p-10 flex-1 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 w-full">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Ngân hàng</p>
                                    <p className="text-xl font-black text-[var(--foreground)]">Vietcombank (VCB)</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Chi nhánh</p>
                                    <p className="text-xl font-black text-[var(--foreground)]">Hàm Nghi, Quận 1</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Số tài khoản</p>
                                    <p className="text-2xl font-black text-[var(--primary)] tracking-tighter">0071 0008 12345</p>
                                </div>
                            </div>
                            <Button className="w-full md:w-auto px-10 bg-[var(--accent)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded-2xl font-black h-14 transition-all shadow-lg shadow-[var(--primary)]/5 shrink-0">
                                Xem lịch sử đóng phí
                            </Button>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </div>
    );
}

/* --- REUSABLE SUB-COMPONENTS --- */

function InfoItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
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

function ParentCard({ name, role, phone, email, image }: any) {
    return (
        <div className="bg-white rounded-[2.5rem] border border-[var(--sidebar-border)] p-6 shadow-sm hover:border-[var(--primary)]/30 transition-all flex items-center gap-5">
            <img
                src={`https://i.pinimg.com/1200x/85/6a/e3/856ae3bbacfdd33bd398ec0c25e61b73.jpg`}
                className="size-16 rounded-2xl bg-[var(--accent)]"
                alt={name}
            />
            <div className="space-y-1">
                <h5 className="font-black text-[var(--foreground)] leading-tight">{name}</h5>
                <p className="text-[10px] font-black text-[var(--primary)] uppercase tracking-wider">{role}</p>
                <div className="flex flex-col gap-0.5 pt-1">
                    <span className="text-xs text-muted-foreground font-bold flex items-center gap-1">
                        <Phone className="size-3" /> {phone}
                    </span>
                    <span className="text-xs text-muted-foreground font-bold flex items-center gap-1">
                        <Mail className="size-3" /> {email}
                    </span>
                </div>
            </div>
        </div>
    );
}

function DetailListCard({ title, icon: Icon, items }: any) {
    return (
        <Card className="rounded-[2.5rem] border-[var(--sidebar-border)] bg-white shadow-sm">
            <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                    <Icon className="size-5 text-[var(--secondary)]" />
                    <h4 className="font-black text-lg tracking-tight">{title}</h4>
                </div>
                <div className="space-y-4">
                    {items.map((item: any, i: number) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                            <span className="font-bold text-muted-foreground">{item.label}</span>
                            <span className="font-black text-[var(--foreground)]">{item.value}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}