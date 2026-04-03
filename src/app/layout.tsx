import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { SkipNav } from "@/components/SkipNav";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AI Solutions for Modern Businesses | AISkillZone",
    template: "%s | AISkillZone",
  },
  description:
    "Custom AI solutions, websites, voice AI, automation, and training for businesses. We build AI into your operations.",
  metadataBase: new URL("https://aiskillzone.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aiskillzone.com",
    siteName: "AISkillZone",
    title: "AI Solutions for Modern Businesses | AISkillZone",
    description:
      "Custom AI solutions, websites, voice AI, automation, and training for businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Solutions for Modern Businesses | AISkillZone",
    description:
      "Custom AI solutions, websites, voice AI, automation, and training for businesses.",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface font-sans text-on-surface">
        <SkipNav />
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
