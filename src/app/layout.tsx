import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Great_Vibes, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Untukmu, Sayang ❤ | Selamat Ulang Tahun",
  description:
    "Sebuah hadiah kecil yang kubuat dengan cinta. Selamat ulang tahun, cintaku.",
  keywords: ["ulang tahun", "romantis", "kejutan", "cinta", "birthday"],
  icons: {
    icon: "/heart-favicon.svg",
  },
  openGraph: {
    title: "Selamat Ulang Tahun, Sayang ❤",
    description: "Sebuah kejutan spesial yang kubuat khusus untukmu.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a0a12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
