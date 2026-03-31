import type { Metadata } from "next";
import Script from "next/script";
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
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PKKDGH38');`}
        </Script>
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PKKDGH38"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
