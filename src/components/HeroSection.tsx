"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";

const HeroRemotionClient = dynamic(
  () =>
    import("@/components/HeroRemotionClient").then(
      (mod) => mod.HeroRemotionClient
    ),
  {
    ssr: false,
    loading: () => (
      <>
        {/* Static gradient fallback while Remotion loads */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 gradient-mesh-dark"
        />
        <div className="pointer-events-none absolute inset-0 grain-overlay" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-brand-royal-purple/20 blur-3xl"
          style={{ animation: "float 8s ease-in-out infinite" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/3 h-56 w-56 rounded-full bg-brand-tech-blue/25 blur-3xl"
          style={{ animation: "float 10s ease-in-out infinite 2s" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1/4 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-brand-mauve-purple/20 blur-3xl"
          style={{ animation: "float 12s ease-in-out infinite 4s" }}
        />
      </>
    ),
  }
);

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-midnight-plum">
      {/* Remotion animation background (client-only) */}
      <HeroRemotionClient />

      {/* Grain texture overlay (always visible) */}
      <div className="pointer-events-none absolute inset-0 grain-overlay z-[1]" />

      {/* Hero text content, positioned above the animation */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-16 text-center md:pt-32 md:pb-20 lg:pt-40 lg:pb-24">
        <AnimatedSection direction="none" duration={0.8}>
          <h1 className="text-5xl font-bold tracking-tight leading-[1.1] text-white sm:text-6xl lg:text-7xl">
            We don&rsquo;t just talk about{" "}
            <span className="bg-gradient-to-r from-brand-mauve-purple to-brand-tech-blue bg-clip-text text-transparent">
              AI
            </span>
            .
            <br className="hidden sm:block" />
            We build it into your business.
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2} duration={0.7}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            Custom websites, voice AI, smart automation, and AI
            training&mdash;designed for small businesses across Central Florida.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.4} duration={0.6}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="https://link.josa.ai/widget/bookings/tech-audit-calendar"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-royal-purple/30 transition-all hover:bg-brand-mauve-purple hover:shadow-xl hover:shadow-brand-mauve-purple/30 hover:-translate-y-0.5"
            >
              Book a free discovery call
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-all hover:border-white/50 hover:bg-white/10"
            >
              View our services
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.6} duration={0.5}>
          <p className="mt-12 text-sm text-white/60">
            Serving small businesses in Lakeland, Winter Haven, Bartow, and
            throughout Central Florida.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
