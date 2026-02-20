import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Physiotherapie Corpus Omnia",
  description: "Professionelle Physiotherapie in Dietlikon - Evidenzbasierte Behandlung mit langjähriger Erfahrung",
  keywords: ["Physiotherapie", "Dietlikon", "Corpus Omnia", "Rehabilitation", "Therapie"],
};

type Props = {
  children: React.ReactNode;
  params?: Promise<{ locale?: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Props) {
  const locale = params ? (await params).locale : "de";
  return (
    <html lang={locale || "de"} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
