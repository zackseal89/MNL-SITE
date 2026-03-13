import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import { ThemeProvider } from "./components/ThemeProvider";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | MN Legal - Top Legal Tech Firm Kenya",
    default: "MN Legal - Data Privacy & Corporate Law Experts Nairobi",
  },
  description: "MN Legal (MN Advocates LLP) is Kenya's premier Legal Tech and Data Privacy law firm. We specialize in AI Law, Corporate Commercial, and Dispute Resolution in Nairobi.",
  keywords: ["Legal Tech Kenya", "Data Privacy Lawyers Nairobi", "AI Law Kenya", "Corporate Lawyers Nairobi", "MN Advocates LLP", "Tech Lawyers Kenya"],
  authors: [{ name: "MN Legal" }],
  creator: "MN Legal",
  publisher: "MN Advocates LLP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mnlegal.net"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MN Legal - Leading Legal Tech & Data Privacy Firm Kenya",
    description: "Expert legal counsel in Data Protection, AI Governance, and Corporate Commercial Law. Based in Nairobi, serving East Africa.",
    url: "https://mnlegal.net",
    siteName: "MN Legal",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MN Legal - MN Advocates LLP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MN Legal - Top Legal Tech Firm Kenya",
    description: "Premier Data Privacy and AI Law experts in Nairobi. Precision. Counsel. Resolve.",
    creator: "@mnlegaladvocate",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
