import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SkipNav } from "@/components/SkipNav";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Solutions for Central Florida Small Businesses | JOSA.AI",
    template: "%s | JOSA.AI",
  },
  description:
    "Custom AI, websites, and automation for small businesses in Polk County and Tampa Bay. We build AI into your business. Book a free discovery call today.",
  metadataBase: new URL("https://josa.ai"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://josa.ai",
    siteName: "JOSA.AI",
    title: "AI Solutions for Central Florida Small Businesses | JOSA.AI",
    description:
      "Custom AI, websites, and automation for small businesses in Polk County and Tampa Bay. We build AI into your business.",
    images: [
      {
        url: "/images/logo-complete.png",
        width: 1200,
        height: 630,
        alt: "JOSA.AI - AI Solutions for Small Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Solutions for Central Florida Small Businesses | JOSA.AI",
    description:
      "Custom AI, websites, and automation for small businesses in Polk County and Tampa Bay.",
    images: ["/images/logo-complete.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "JOSA.AI",
  url: "https://josa.ai",
  logo: "https://josa.ai/images/logo-complete.png",
  description:
    "Custom AI, websites, and automation for small businesses in Polk County and Tampa Bay.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lakeland",
    addressRegion: "FL",
    addressCountry: "US",
  },
  email: "info@josa.ai",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SkipNav />
        <JsonLd data={organizationJsonLd} />
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
