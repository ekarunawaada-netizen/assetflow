import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-headline",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "AssetFlow — Marketplace Kerajinan Digital",
    template: "%s | AssetFlow",
  },
  description:
    "Temukan, kumpulkan, dan jual aset digital luar biasa di marketplace premium yang dibuat untuk alat kreatif profesional.",
  keywords: ["aset digital", "marketplace", "kit UI", "model 3D", "templat figma"],
  openGraph: {
    title: "AssetFlow — Marketplace Kerajinan Digital",
    description: "Aset digital premium untuk kreator profesional.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${inter.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-on-background font-body">
        {children}
      </body>
    </html>
  );
}
