"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GenderType } from "@/constants/type";
import { useSignUp } from "@/queries/useAuthQuery";
import { RegisterInput, registerSchema } from "@/schemas/auth.schema";
import { handleError } from "@/utils/handleError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, LockIcon, MailIcon, PhoneIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AuthRegisterPage() {
    const router = useRouter();
    const signUpMutation = useSignUp();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema) as any,
        defaultValues: {
            gender: GenderType.UNKNOWN
        }
    });

    const gender = watch("gender");

    const onSubmit = async (data: RegisterInput) => {
        try {
            await signUpMutation.mutateAsync(data, {
                onSuccess: (response: any) => {
                    toast.success(response?.message || "Đăng ký thành công! Vui lòng kiểm tra email.");
                    localStorage.setItem("verify_email", data.email);
                    router.push("/auth/verify-email");
                },
                onError: (error) => {
                    handleError(error, "Đăng ký thất bại");
                }
            });
        } catch (error) {
            console.error("SignUp failed", error);
        }
    };

    return (
        <div data-role="student" className="min-h-screen flex font-sans bg-white">
            {/* LEFT SIDE: 60% SCREEN */}
            <div className="hidden lg:flex lg:w-[60%] bg-[var(--primary)] relative flex-col items-center justify-center p-12 text-white overflow-hidden">
                <div className="absolute top-10 left-10 w-4 h-4 bg-orange-400 rounded-full opacity-60 animate-bounce" />
                <div className="absolute bottom-20 right-10 w-6 h-6 bg-pink-400 rounded-full opacity-60 rotate-45" />
                <div className="absolute top-1/4 right-20 w-3 h-8 bg-green-400 rounded-full opacity-40 -rotate-12" />

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="relative mb-12">
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-[3rem] border border-white/20 shadow-2xl scale-125">
                            <div className="size-20 bg-[var(--secondary)] rounded-3xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                                <Globe className="size-10 text-white" />
                            </div>
                            <div className="h-2 w-32 bg-white/40 rounded-full mx-auto mb-2" />
                            <div className="h-2 w-20 bg-white/20 rounded-full mx-auto" />
                        </div>

                        <div className="absolute -bottom-8 -right-16 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-pulse">
                            <div className="size-10 bg-secondary rounded-xl flex items-center justify-center">
                                SEG
                            </div>
                            <div className="text-left text-gray-900">
                                <div className="h-2 w-16 bg-gray-200 rounded-full mb-1.5" />
                                <div className="h-2 w-10 bg-gray-100 rounded-full" />
                            </div>
                        </div>
                    </div>

                    <h2 className="text-4xl font-black tracking-tighter mb-6 leading-tight">
                        Khởi đầu từ <br /> <span className="text-white">Earth Center</span>
                    </h2>

                    <p className="text-white/80 text-base max-w-md font-medium leading-relaxed">
                        Trở thành một phi hành gia và bắt đầu hành trình khám phá tri thức của bạn ngay hôm nay.
                    </p>

                    <div className="flex gap-2 mt-10">
                        <div className="size-2 bg-white/30 rounded-full" />
                        <div className="size-2 bg-white/30 rounded-full" />
                        <div className="w-6 h-2 bg-white rounded-full" />
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: REGISTER FORM (40%) */}
            <div className="w-full lg:w-[40%] flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
                <div className="w-full max-w-[480px] flex flex-col items-center py-10">
                    <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 shadow-sm">
                        <Globe className="size-8 text-[var(--primary)]" />
                    </div>

                    <h1 className="text-3xl font-black text-[var(--foreground)] tracking-tighter mb-2 text-center">
                        Tạo tài khoản mới
                    </h1>
                    <p className="text-gray-400 text-sm font-medium mb-8 text-center">
                        Điền các thông tin dưới đây để đăng ký tài khoản sinh viên.
                    </p>

                    <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Họ và tên</Label>
                                <div className="relative group">
                                    <UserIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-300 group-focus-within:text-[var(--primary)] transition-colors" />
                                    <Input
                                        placeholder="Nguyễn Văn A"
                                        className="h-12 pr-12 rounded-xl border-none bg-gray-50 focus-visible:ring-2 focus-visible:ring-[var(--primary)/20] font-medium"
                                        {...register("fullName")}
                                    />
                                </div>
                                {errors.fullName && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.fullName.message}</p>}
                            </div>

                            {/* Gender */}
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Giới tính</Label>
                                <Select value={gender} onValueChange={(val) => setValue("gender", val as any)}>
                                    <SelectTrigger className="h-12 rounded-xl border-none bg-gray-50 focus:ring-2 focus:ring-[var(--primary)/20] font-medium">
                                        <SelectValue placeholder="Chọn giới tính" />
                                    </SelectTrigger>
                                    <SelectContent data-role="student">
                                        <SelectItem value={GenderType.MALE}>Nam</SelectItem>
                                        <SelectItem value={GenderType.FEMALE}>Nữ</SelectItem>
                                        <SelectItem value={GenderType.UNKNOWN}>Khác</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Username */}
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Username</Label>
                            <div className="relative group">
                                <UserIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-300 group-focus-within:text-[var(--primary)] transition-colors" />
                                <Input
                                    placeholder="username_cua_ban"
                                    className="h-12 pr-12 rounded-xl border-none bg-gray-50 focus-visible:ring-2 focus-visible:ring-[var(--primary)/20] font-medium"
                                    {...register("username")}
                                />
                            </div>
                            {errors.username && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.username.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Email */}
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email</Label>
                                <div className="relative group">
                                    <MailIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-300 group-focus-within:text-[var(--primary)] transition-colors" />
                                    <Input
                                        type="email"
                                        placeholder="email@example.com"
                                        className="h-12 pr-12 rounded-xl border-none bg-gray-50 focus-visible:ring-2 focus-visible:ring-[var(--primary)/20] font-medium"
                                        {...register("email")}
                                    />
                                </div>
                                {errors.email && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email.message}</p>}
                            </div>

                            {/* Phone */}
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Số điện thoại</Label>
                                <div className="relative group">
                                    <PhoneIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-300 group-focus-within:text-[var(--primary)] transition-colors" />
                                    <Input
                                        placeholder="0987654321"
                                        className="h-12 pr-12 rounded-xl border-none bg-gray-50 focus-visible:ring-2 focus-visible:ring-[var(--primary)/20] font-medium"
                                        {...register("phone")}
                                    />
                                </div>
                                {errors.phone && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.phone.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Password */}
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Mật khẩu</Label>
                                <div className="relative group">
                                    <LockIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-300 group-focus-within:text-[var(--primary)] transition-colors" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="h-12 pr-12 rounded-xl border-none bg-gray-50 focus-visible:ring-2 focus-visible:ring-[var(--primary)/20] font-medium"
                                        {...register("password")}
                                    />
                                </div>
                                {errors.password && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.password.message}</p>}
                            </div>

                            {/* Password Confirm */}
                            <div className="space-y-1.5">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Xác nhận mật khẩu</Label>
                                <div className="relative group">
                                    <LockIcon className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-300 group-focus-within:text-[var(--primary)] transition-colors" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="h-12 pr-12 rounded-xl border-none bg-gray-50 focus-visible:ring-2 focus-visible:ring-[var(--primary)/20] font-medium"
                                        {...register("passwordConfirm")}
                                    />
                                </div>
                                {errors.passwordConfirm && <p className="text-[10px] text-red-500 font-bold ml-1">{errors.passwordConfirm.message}</p>}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={signUpMutation.isPending}
                            className="w-full h-13 mt-4 rounded-xl bg-[var(--primary)] text-white font-black text-sm shadow-xl shadow-blue-100 hover:opacity-90 active:scale-[0.98] transition-all"
                        >
                            {signUpMutation.isPending ? "Đang xử lý..." : "Đăng ký tài khoản"}
                        </Button>
                    </form>

                    <p className="mt-8 text-xs font-bold text-gray-400">
                        Bạn đã có tài khoản?{" "}
                        <Link href="/auth/login" className="text-[var(--primary)] hover:underline font-black">
                            Đăng nhập ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
