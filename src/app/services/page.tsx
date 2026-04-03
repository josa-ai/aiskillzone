"use client";

import Link from "next/link";
import { primaryServices, secondaryServices } from "@/lib/services-data";
import { AnimatedSection } from "@/components/AnimatedSection";
import { getServiceTheme } from "@/lib/service-themes";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ServicesPage() {
  return (
    <>
      <section className="px-4 pb-12 pt-24 md:px-8 md:pb-16 md:pt-28">
        <div className="hero-stage site-grid overflow-hidden rounded-[2rem] border border-white/10 px-6 py-10 shadow-[0_30px_100px_rgba(8,13,30,0.2)] md:rounded-[2.8rem] md:px-10 md:py-12">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative z-10 text-white">
              <div className="hero-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-white/72">
                <span className="h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_16px_rgba(125,211,252,0.7)]" />
                Our Expertise
              </div>
              <h1 className="mt-6 text-5xl font-extrabold tracking-[-0.05em] sm:text-6xl md:text-7xl">
                Strategic{" "}
                <span className="bg-gradient-to-r from-sky-200 via-white to-emerald-200 bg-clip-text text-transparent">
                  Solutions
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72">
                We don&apos;t just implement tools. We design intelligent
                interfaces, service systems, and AI workflows that other teams
                can confidently present as a polished possibility set.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {primaryServices.map((service, index) => {
                const theme = getServiceTheme(service.slug);

                return (
                  <div
                    key={service.slug}
                    className={`glass-panel rounded-[1.7rem] p-5 text-white ${
                      index === 0 ? "sm:translate-y-6" : ""
                    }`}
                    style={{
                      background: theme.panelBackground,
                      borderColor: theme.outline,
                    }}
                  >
                    <div className="text-2xl">{service.icon}</div>
                    <h2 className="mt-8 text-xl font-bold tracking-[-0.03em]">
                      {service.shortTitle}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-white/72">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-cool relative overflow-hidden px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#2563eb] shadow-[0_10px_24px_rgba(37,99,235,0.08)]">
                Core Services
              </div>
              <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.04em] text-on-surface md:text-5xl">
                Signature capability tracks
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-on-surface-variant">
                Our primary offerings. Each one is presented as a polished
                service lane with its own visual identity.
              </p>
            </div>

            <div className="showcase-card flex items-center gap-3 rounded-full px-5 py-3">
              <Sparkles className="h-4 w-4 text-[#0f8a5f]" />
              <span className="text-sm font-semibold text-on-surface">
                Presented as a portfolio of possibilities
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            {primaryServices.map((service, index) => {
              const theme = getServiceTheme(service.slug);
              const spanClass =
                index === 0 || index === 3 ? "xl:col-span-7" : "xl:col-span-5";

              return (
                <AnimatedSection
                  key={service.slug}
                  direction="up"
                  delay={index * 0.08}
                  className={spanClass}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="showcase-card group block h-full rounded-[2.3rem] p-8 md:p-10"
                    style={{ background: theme.surfaceBackground }}
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] text-2xl shadow-[0_18px_38px_rgba(15,23,42,0.08)]"
                          style={{
                            backgroundColor: theme.accentSoft,
                            boxShadow: `0 18px 38px ${theme.accentSoft}`,
                          }}
                        >
                          {service.icon}
                        </div>
                        <h3 className="mt-7 text-3xl font-bold tracking-[-0.03em] text-on-surface">
                          {service.title}
                        </h3>
                        <p className="mt-4 max-w-lg text-sm leading-relaxed text-on-surface-variant md:text-base">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-10 flex items-center justify-between rounded-[1.5rem] border border-white/70 bg-white/65 px-4 py-4 backdrop-blur-sm">
                        <span
                          className="text-xs font-semibold uppercase tracking-[0.24em]"
                          style={{ color: theme.accent }}
                        >
                          Explore service details
                        </span>
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          style={{ color: theme.accent }}
                        />
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <div className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/72">
              Additional Services
            </div>
            <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.04em] text-on-surface md:text-5xl">
              Complementary specialties
            </h2>
            <p className="mt-3 text-base leading-relaxed text-on-surface-variant">
              Specialized capabilities that round out the core offer and expand
              the set of polished service possibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {secondaryServices.map((service, index) => {
              const theme = getServiceTheme(service.slug);

              return (
                <AnimatedSection
                  key={service.slug}
                  direction="up"
                  delay={index * 0.05}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="showcase-card group block rounded-[2rem] p-7"
                    style={{ background: theme.surfaceAltBackground }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] text-xl"
                        style={{ backgroundColor: theme.accentSoft }}
                      >
                        {service.icon}
                      </div>
                      <span
                        className="h-2.5 w-14 rounded-full"
                        style={{ backgroundColor: theme.accentStrong }}
                      />
                    </div>

                    <h3 className="mt-8 text-2xl font-bold tracking-[-0.03em] text-on-surface">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-on-surface-variant md:text-base">
                      {service.description}
                    </p>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
