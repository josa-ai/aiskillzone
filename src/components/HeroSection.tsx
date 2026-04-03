"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { FloatingShapes } from "@/components/decorations/FloatingShapes";
import { GeometricAccents } from "@/components/decorations/GeometricAccents";
import { primaryServices } from "@/lib/services-data";

const HeroBrainPlayer = dynamic(
  () => import("@/components/HeroBrainPlayer").then((m) => m.HeroBrainPlayer),
  { ssr: false }
);

export function HeroSection() {
  const featuredServices = primaryServices.slice(0, 4);

  return (
    <header className="relative px-4 pb-14 pt-24 md:px-8 md:pb-20 md:pt-28">
      <div className="hero-stage site-grid overflow-hidden rounded-[2rem] border border-white/10 px-6 py-10 shadow-[0_30px_100px_rgba(8,13,30,0.2)] md:rounded-[2.8rem] md:px-10 md:py-14">
        <FloatingShapes count={5} className="opacity-25 pointer-events-none" />
        <GeometricAccents
          variant="lines"
          position="top-left"
          className="opacity-25"
        />

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative z-10">
            <div className="hero-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-white/72">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.8)]" />
              The Future Is Curated
            </div>

            <h1 className="mt-6 max-w-3xl font-heading text-5xl font-extrabold leading-[0.96] tracking-[-0.05em] text-white sm:text-6xl md:text-7xl">
              Architecting{" "}
              <span className="bg-gradient-to-r from-sky-200 via-white to-amber-200 bg-clip-text text-transparent">
                Intelligence
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/72 md:text-lg">
              Boutique AI consulting that bridges the gap between complex neural
              networks and high-impact business operations. We build your digital
              future, curated with precision.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {featuredServices.map((service) => (
                <span
                  key={service.slug}
                  className="hero-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/78"
                >
                  <span>{service.icon}</span>
                  <span>{service.shortTitle}</span>
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3 md:gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-[0_16px_36px_rgba(255,255,255,0.18)] transition-transform hover:-translate-y-0.5 md:px-8 md:py-4 md:text-base"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/portfolio"
                className="hero-chip inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/18 md:px-8 md:py-4 md:text-base"
              >
                View Portfolio
              </Link>
            </div>
          </div>

          <div className="relative z-10">
            <div className="hero-display aspect-[1.04/1] rounded-[2rem] p-4 md:p-5">
              <div className="absolute left-5 top-5 z-20 hero-chip rounded-2xl px-4 py-3 text-white">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/58">
                  Showcase layer
                </p>
                <p className="mt-1 text-sm font-semibold">Portfolio-ready presentation</p>
              </div>

              <div className="absolute right-5 top-5 z-20 hero-chip inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/72">
                <Sparkles className="h-3.5 w-3.5 text-sky-200" />
                White-label ready
              </div>

              <div className="absolute inset-5 overflow-hidden rounded-[1.75rem]">
                <HeroBrainPlayer />
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-20 grid gap-3 md:grid-cols-[1.3fr_0.7fr]">
                <div className="hero-chip rounded-[1.4rem] px-4 py-3 text-white">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/55">
                    Capabilities
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {featuredServices.slice(0, 3).map((service) => (
                      <span
                        key={service.slug}
                        className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/84"
                      >
                        {service.shortTitle}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hero-chip rounded-[1.4rem] px-4 py-3 text-white">
                  <p className="text-2xl font-black">4</p>
                  <p className="text-sm text-white/72">Core service tracks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
