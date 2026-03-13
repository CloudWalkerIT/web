import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cloudwalker.it"),
  title: {
    default: "Cloudwalker IT — Intelligent Cloud & IT Solutions",
    template: "%s | Cloudwalker IT",
  },
  description:
    "Cloudwalker IT delivers intelligent cloud infrastructure, AI-driven market insights, and digital transformation solutions for modern enterprises.",
  keywords: [
    "cloud infrastructure",
    "IT consulting",
    "AI solutions",
    "digital transformation",
    "Atomatize",
    "market insights",
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
      "Intelligent cloud infrastructure, AI-driven market insights, and digital transformation for modern enterprises.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloudwalker IT — Intelligent Cloud & IT Solutions",
    description:
      "Intelligent cloud infrastructure, AI-driven insights, and digital transformation.",
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
    "Intelligent cloud infrastructure, AI-driven market insights, and digital transformation solutions.",
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-cloud-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1 pt-[73px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
