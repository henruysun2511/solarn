"use client";

import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useVerifyEmail } from "@/queries/useAuthQuery";
import { VerifyOtpInput, verifyOtpSchema } from "@/schemas/auth.schema";
import { handleError } from "@/utils/handleError";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Globe, ShieldCheckIcon, Timer } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AuthVerifyEmailPage() {
    const router = useRouter();
    const verifyMutation = useVerifyEmail();
    const [email, setEmail] = useState<string>("");

    // Lấy email từ localStorage để hiển thị và gửi API
    useEffect(() => {
        const storedEmail = localStorage.getItem("verify_email");
        if (!storedEmail) {
            // Nếu không có email, quay lại trang đăng ký
            router.push("/auth/register");
            return;
        }
        setEmail(storedEmail);
    }, [router]);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<VerifyOtpInput>({
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: {
            email: "",
            otp: "",
        },
    });

    // Đồng bộ email vào form ngay khi lấy được từ localStorage
    useEffect(() => {
        if (email) {
            setValue("email", email);
        }
    }, [email, setValue]);

    const onSubmit = async (data: VerifyOtpInput) => {
        try {
            // Sử dụng mutateAsync để xử lý logic đồng bộ
            await verifyMutation.mutateAsync(data, {
                onSuccess: (response: any) => {
                    toast.success(response?.message || "Xác thực thành công!");
                    localStorage.removeItem("verify_email");
                    router.push("/auth/login");
                },
                onError: (error) => {
                    handleError(error, "Xác thực thất bại");
                },
            });
        } catch (error) {
            console.error("Verify failed", error);
        }
    };

    return (
        <div data-role="student" className="min-h-screen flex font-sans bg-white">
            {/* LEFT SIDE: Nội dung thương hiệu */}
            <div className="hidden lg:flex lg:w-[60%] bg-[var(--primary)] relative flex-col items-center justify-center p-12 text-white overflow-hidden">
                <div className="absolute top-10 left-10 w-4 h-4 bg-orange-400 rounded-full opacity-60 animate-bounce" />
                <div className="absolute bottom-20 right-10 w-6 h-6 bg-pink-400 rounded-full opacity-60 rotate-45" />

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-[3rem] border border-white/20 shadow-2xl scale-125 mb-12">
                        <div className="size-20 bg-[var(--secondary)] rounded-3xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                            <Globe className="size-10 text-white" />
                        </div>
                        <div className="h-2 w-32 bg-white/40 rounded-full mx-auto mb-2" />
                    </div>

                    <h2 className="text-4xl font-black tracking-tighter mb-6 leading-tight">
                        Khởi đầu từ <br /> <span className="text-white">Earth Center</span>
                    </h2>
                    <p className="text-white/80 text-base max-w-md font-medium leading-relaxed">
                        Mã OTP đã được gửi đến email của bạn. Vui lòng nhập mã để hoàn tất quá trình đăng ký.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE: Form nhập mã OTP */}
            <div className="w-full lg:w-[40%] flex items-center justify-center p-8 sm:p-16 bg-gray-50/30">
                <div className="w-full max-w-[420px] flex flex-col items-center">
                    {/* Icon Header */}
                    <div className="size-16 rounded-[1.5rem] bg-white shadow-xl shadow-blue-100 flex items-center justify-center mb-8 border border-gray-50">
                        <ShieldCheckIcon className="size-9 text-[var(--primary)]" />
                    </div>

                    <h1 className="text-3xl font-black text-gray-900 tracking-tighter mb-3 text-center">
                        Xác thực tài khoản
                    </h1>
                    <p className="text-gray-500 text-sm font-medium mb-10 text-center leading-relaxed">
                        Chúng tôi đã gửi mã bảo mật đến <br />
                        <span className="text-[var(--primary)] font-bold">{email || "đang tải..."}</span>
                    </p>

                    <form className="w-full space-y-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 flex justify-center items-center gap-2">
                                <Timer className="size-3" /> Nhập mã OTP gồm 6 chữ số
                            </Label>

                            <div className="flex justify-center">
                                <Controller
                                    control={control}
                                    name="otp"
                                    render={({ field }) => (
                                        <InputOTP
                                            maxLength={6}
                                            value={field.value}
                                            onChange={field.onChange}
                                        >
                                            <InputOTPGroup className="gap-2">
                                                <InputOTPSlot
                                                    index={0}
                                                    className="size-12 sm:size-14 rounded-xl border-2 border-gray-200 bg-white text-xl font-black"
                                                />
                                                <InputOTPSlot
                                                    index={1}
                                                    className="size-12 sm:size-14 rounded-xl border-2 border-gray-200 bg-white text-xl font-black"
                                                />
                                                <InputOTPSlot
                                                    index={2}
                                                    className="size-12 sm:size-14 rounded-xl border-2 border-gray-200 bg-white text-xl font-black"
                                                />
                                                <InputOTPSlot
                                                    index={3}
                                                    className="size-12 sm:size-14 rounded-xl border-2 border-gray-200 bg-white text-xl font-black"
                                                />
                                                <InputOTPSlot
                                                    index={4}
                                                    className="size-12 sm:size-14 rounded-xl border-2 border-gray-200 bg-white text-xl font-black"
                                                />
                                                <InputOTPSlot
                                                    index={5}
                                                    className="size-12 sm:size-14 rounded-xl border-2 border-gray-200 bg-white text-xl font-black"
                                                />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    )}
                                />
                            </div>

                            {errors.otp && (
                                <p className="text-[11px] text-red-500 font-bold text-center">
                                    {errors.otp.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={verifyMutation.isPending}
                            className="w-full h-14 rounded-2xl bg-[var(--primary)] text-white font-black text-base shadow-xl shadow-blue-200/50 hover:shadow-blue-300/50 hover:translate-y-[-2px] active:scale-[0.98] transition-all disabled:opacity-70"
                        >
                            {verifyMutation.isPending ? "Đang xác thực..." : "Hoàn tất đăng ký"}
                        </Button>
                    </form>

                    {/* Footer Actions */}
                    <div className="mt-12 flex flex-col items-center gap-6 w-full">
                        <div className="h-px w-full bg-gray-200/60 relative">
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fcfcfc] px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                Trợ giúp
                            </span>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <p className="text-xs font-bold text-gray-500">
                                Không nhận được mã?{" "}
                                <button
                                    type="button"
                                    className="text-[var(--primary)] hover:text-blue-700 font-black"
                                >
                                    Gửi lại mã
                                </button>
                            </p>
                            <button
                                type="button"
                                onClick={() => router.push("/auth/register")}
                                className="flex items-center gap-2 text-[11px] font-black text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-tight"
                            >
                                <ArrowLeft className="size-3" /> Quay lại thay đổi email
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}