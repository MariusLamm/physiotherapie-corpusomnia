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
  metadataBase: new URL("https://physiotherapie-corpusomnia.ch"),
  title: {
    template: "%s | Physiotherapie Corpus Omnia",
    default: "Physiotherapie Corpus Omnia – Physiotherapie in Dietlikon (Zürich)",
  },
  description: "Professionelle Physiotherapie in Dietlikon - Evidenzbasierte Behandlung mit langjähriger Erfahrung",
  keywords: [
    "Physiotherapie", "Dietlikon", "Zürich", "Corpus Omnia",
    "Rehabilitation", "Therapie", "Orthopädie", "Neurologie",
    "Lymphologie", "Sportphysiotherapie", "Geriatrie",
    "Physiotherapie Dietlikon", "Physiotherapie Zürich",
  ],
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
