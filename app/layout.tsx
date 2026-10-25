import type { Metadata } from "next";
import "./globals.css";
import { AuthHashDetector } from "@/components/admin/AuthHashDetector";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "KAPDE — Luxury Tailored Menswear & Contemporary Silhouettes",
    template: "%s — KAPDE",
  },
  description:
    "KAPDE — Curated luxury menswear. Tailored baggy pleated trousers, wide raw selvedge denim, heavyweight tees, and architectural silhouettes.",
  keywords: [
    "KAPDE",
    "luxury menswear",
    "baggy pleated trousers",
    "wide leg selvedge denim",
    "Aimé Leon Dore aesthetic",
    "heavyweight cotton tee",
    "architectural menswear",
    "curated fashion",
    "Indian luxury menswear",
  ],
  authors: [{ name: "KAPDE" }],
  creator: "KAPDE",
  icons: {
    icon: "/Kapde-logo-no-bg.svg",
    shortcut: "/Kapde-logo-no-bg.svg",
    apple: "/Kapde-logo-no-bg.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "KAPDE",
    title: "KAPDE — Luxury Tailored Menswear",
    description:
      "Curated luxury menswear. Tailored baggy pleated trousers, wide selvedge denim, heavyweight tees, and architectural silhouettes.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "KAPDE Luxury Menswear",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black min-h-screen selection:bg-black selection:text-white">
        <AuthHashDetector />
        {children}
      </body>
    </html>
  );
}
