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
    default: "Cloudwalker IT | Azure cloud engineering",
    template: "%s | Cloudwalker IT",
  },
  description:
    "Azure architecture, migration and operations, with AWS work delivered alongside 010 Consulting. We also build and run KrakenKey and Atomatize.",
  keywords: [
    "Azure consulting",
    "Azure cloud engineering",
    "platform engineering",
    "managed Terraform",
    "AKS",
    "cloud migration",
    "FinOps",
    "KrakenKey",
    "Atomatize",
  ],
  authors: [{ name: "Cloudwalker IT" }],
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cloudwalker.it",
    siteName: "Cloudwalker IT",
    title: "Cloudwalker IT | Azure cloud engineering",
    description:
      "We design, build and run Azure environments, with AWS work delivered alongside 010 Consulting.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cloudwalker IT, Azure cloud engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloudwalker IT | Azure cloud engineering",
    description:
      "Azure engineering for teams that don't have a platform team. AWS through 010 Consulting.",
    images: ["/og-image.png"],
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
    "Azure cloud engineering firm. AWS engagements delivered with 010 Consulting. Maker of KrakenKey and Atomatize.",
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
        {process.env.NEXT_PUBLIC_CF_BEACON_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({
              token: process.env.NEXT_PUBLIC_CF_BEACON_TOKEN,
            })}
          />
        )}
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
