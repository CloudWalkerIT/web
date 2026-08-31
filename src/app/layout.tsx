import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToHash from "@/components/ScrollToHash";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cloudwalker.it"),
  title: {
    default: "Cloudwalker IT — Intelligent Cloud & IT Solutions",
    template: "%s | Cloudwalker IT",
  },
  description:
    "Cloudwalker IT delivers intelligent cloud infrastructure, insights, and digital transformation solutions for modern enterprises.",
  keywords: [
    "cloud infrastructure",
    "IT consulting",
    "AI solutions",
    "digital transformation",
    "Atomatize",
    "insights",
    "managed IT services",
  ],
  authors: [{ name: "Cloudwalker IT" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cloudwalker.it",
    siteName: "Cloudwalker IT",
    title: "Cloudwalker IT — Intelligent Cloud & IT Solutions",
    description:
      "Intelligent cloud infrastructure, insights, and digital transformation for modern enterprises.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloudwalker IT — Intelligent Cloud & IT Solutions",
    description:
      "Intelligent cloud infrastructure, insights, and digital transformation.",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cloudwalker IT",
  url: "https://cloudwalker.it",
  description:
    "Intelligent cloud infrastructure, insights, and digital transformation solutions.",
  logo: "https://cloudwalker.it/logo.svg",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@cloudwalker.it",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-cloud-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-dark-900">
          Skip to content
        </a>
        <ScrollToHash />
        <Header />
        <main id="main-content" className="flex-1 pt-[73px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
