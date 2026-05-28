import QueryProvider from "@/components/providers/query-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

async function fetchSettings() {
  try {
    const res = await fetch(`${apiUrl}/settings`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || json;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const setting = await fetchSettings();
  const siteName = setting?.siteName || "SOLARN";
  const title = setting?.metaTitle || siteName;
  const description = setting?.metaDescription || "Hệ thống đào tạo trực tuyến SOLARN";
  const logoUrl = setting?.logoUrl || null;

  return {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    ...(logoUrl && {
      openGraph: {
        title,
        description,
        type: "website",
        images: [{ url: logoUrl, width: 1200, height: 630, alt: siteName }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [logoUrl],
      },
    }),
    icons: logoUrl ? { icon: logoUrl, apple: logoUrl } : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <AuthProvider>
            <TooltipProvider>
              {children}
              <Toaster position="top-right" richColors />
            </TooltipProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
