"use client";

import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import {
  PhoneOff,
  Monitor,
  RefreshCw,
  Brain,
  Globe,
  Mic,
  Bot,
  GraduationCap,
  Check,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { FloatingShapes } from "@/components/decorations/FloatingShapes";
import { ParticleField } from "@/components/decorations/ParticleField";

const problems = [
  {
    title: "Customers Can't Reach You",
    description:
      "Missed inquiries are missed revenue. Modern Voice AI ensures 24/7 engagement.",
    icon: PhoneOff,
    accent: "#c86d1d",
    surface:
      "linear-gradient(180deg, rgba(200, 109, 29, 0.12) 0%, rgba(255, 255, 255, 0.92) 100%)",
    shadow: "0 24px 48px rgba(200, 109, 29, 0.12)",
  },
  {
    title: "Website Looks Like 2015",
    description:
      "First impressions happen in milliseconds. Elevate your aesthetic to match your value.",
    icon: Monitor,
    accent: "#2563eb",
    surface:
      "linear-gradient(180deg, rgba(37, 99, 235, 0.12) 0%, rgba(255, 255, 255, 0.92) 100%)",
    shadow: "0 24px 48px rgba(37, 99, 235, 0.12)",
  },
  {
    title: "Stuck Doing Same Tasks",
    description:
      "Manual labor for repetitive digital tasks is a relic of the past. Automate the routine.",
    icon: RefreshCw,
    accent: "#0f8a5f",
    surface:
      "linear-gradient(180deg, rgba(15, 138, 95, 0.12) 0%, rgba(255, 255, 255, 0.92) 100%)",
    shadow: "0 24px 48px rgba(15, 138, 95, 0.12)",
  },
  {
    title: "Not Sure Where AI Fits",
    description:
      "Complexity causes paralysis. We provide the roadmap to meaningful AI integration.",
    icon: Brain,
    accent: "#4f8cff",
    surface:
      "linear-gradient(180deg, rgba(79, 140, 255, 0.12) 0%, rgba(255, 255, 255, 0.92) 100%)",
    shadow: "0 24px 48px rgba(79, 140, 255, 0.12)",
  },
];

export function HomepageContent() {
  return (
    <>
      <HeroSection />

      <section className="section-warm relative overflow-hidden px-4 py-16 md:px-8 md:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c86d1d]/30 to-transparent" />
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex rounded-full bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#8a531f] shadow-[0_12px_28px_rgba(200,109,29,0.08)]">
                Friction points
              </div>
              <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.04em] text-on-surface md:text-6xl">
                Money on the Table
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-on-surface-variant md:text-lg">
                Don&apos;t let legacy processes drain your revenue. Identify the
                leaks in your digital strategy.
              </p>
            </div>

            <div className="showcase-card rounded-[1.5rem] px-5 py-4 md:max-w-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-on-surface-variant/70">
                Where plain sites underperform
              </p>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                The opportunity isn&apos;t only better copy. It&apos;s stronger
                presentation, faster systems, and clearer user pathways.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              const spans = [
                "xl:col-span-5",
                "xl:col-span-3",
                "xl:col-span-3",
                "xl:col-span-5",
              ];

              return (
                <AnimatedSection
                  key={problem.title}
                  direction="up"
                  delay={index * 0.08}
                  className={spans[index]}
                >
                  <div
                    className="showcase-card h-full rounded-[2rem] p-7 md:p-8"
                    style={{
                      background: problem.surface,
                      boxShadow: problem.shadow,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-[1.35rem]"
                        style={{ backgroundColor: `${problem.accent}18` }}
                      >
                        <Icon
                          className="h-6 w-6"
                          style={{ color: problem.accent }}
                        />
                      </div>
                      <span className="font-heading text-6xl font-black tracking-[-0.06em] text-black/6">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="mt-12">
                      <h3 className="max-w-xs text-2xl font-bold tracking-[-0.03em] text-on-surface">
                        {problem.title}
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-on-surface-variant md:text-base">
                        {problem.description}
                      </p>
                    </div>

                    <div className="mt-10 h-px w-full bg-black/6" />
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-cool relative overflow-hidden px-4 py-16 md:px-8 md:py-24">
        <FloatingShapes count={6} className="opacity-20 pointer-events-none" />
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#2563eb] shadow-[0_12px_28px_rgba(37,99,235,0.08)]">
                Capability showcase
              </div>
              <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.04em] text-on-surface md:text-6xl">
                Strategic Solutions
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-on-surface-variant md:text-lg">
                We don&apos;t just implement tools; we design entire cognitive
                workflows for the digital-first era.
              </p>
            </div>

            <div className="showcase-card flex items-center gap-3 rounded-full px-5 py-3">
              <Sparkles className="h-4 w-4 text-[#0f8a5f]" />
              <span className="text-sm font-semibold text-on-surface">
                Presentation built for possibility, not pressure
              </span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 xl:grid-cols-12">
            <AnimatedSection
              direction="up"
              className="xl:col-span-7"
            >
              <Link
                href="/services/website-design"
                className="showcase-card group block overflow-hidden rounded-[2.3rem] p-8 md:p-10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(37, 99, 235, 0.12) 0%, rgba(255, 255, 255, 0.94) 100%)",
                }}
              >
                <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-[#2563eb] shadow-[0_18px_38px_rgba(37,99,235,0.24)]">
                      <Globe className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mt-7 text-3xl font-bold tracking-[-0.03em] text-on-surface md:text-4xl">
                      Website Design
                    </h3>
                    <p className="mt-4 max-w-lg text-base leading-relaxed text-on-surface-variant">
                      Beyond aesthetics. We build intelligent, conversion-focused
                      interfaces that adapt to user behavior in real-time.
                    </p>
                    <ul className="mt-8 space-y-3">
                      <li className="flex items-center gap-3 text-sm font-medium text-on-surface">
                        <Check className="h-4 w-4 text-[#0f8a5f]" />
                        High-Performance UX
                      </li>
                      <li className="flex items-center gap-3 text-sm font-medium text-on-surface">
                        <Check className="h-4 w-4 text-[#0f8a5f]" />
                        AI-Driven Content Personalization
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-[1.9rem] border border-white/70 bg-white/80 p-4 shadow-[0_20px_40px_rgba(37,99,235,0.08)]">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffbe3d]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2ecc71]" />
                    </div>
                    <div className="mt-4 rounded-[1.5rem] bg-slate-950 px-4 py-5 text-white">
                      <div className="flex items-center justify-between">
                        <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                          Interface preview
                        </p>
                        <ArrowRight className="h-4 w-4 text-white/55" />
                      </div>
                      <div className="mt-6 space-y-3">
                        <div className="h-3 w-24 rounded-full bg-white/20" />
                        <div className="h-20 rounded-[1.2rem] bg-gradient-to-br from-sky-400/30 to-white/8" />
                        <div className="grid grid-cols-2 gap-3">
                          <div className="h-10 rounded-2xl bg-white/10" />
                          <div className="h-10 rounded-2xl bg-white/10" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.08} className="xl:col-span-5">
              <Link
                href="/services/voice-ai"
                className="showcase-card block h-full rounded-[2.3rem] p-8 md:p-10"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(200, 109, 29, 0.14) 0%, rgba(255, 247, 238, 0.94) 100%)",
                }}
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-[#c86d1d] shadow-[0_18px_38px_rgba(200,109,29,0.22)]">
                      <Mic className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mt-7 text-3xl font-bold tracking-[-0.03em] text-on-surface">
                      Voice AI
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-on-surface-variant md:text-base">
                      Human-like conversational agents for high-volume customer
                      service and scheduling.
                    </p>
                  </div>

                  <div className="mt-10 rounded-[1.6rem] bg-white/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a531f]">
                      24/7 Availability
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-[#c86d1d]/20">
                        <div className="h-2 w-4/5 rounded-full bg-[#c86d1d]" />
                      </div>
                      <span className="text-xs font-semibold text-[#8a531f]">
                        Always on
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.16} className="xl:col-span-5">
              <Link
                href="/services/ai-automation"
                className="showcase-card-dark block h-full rounded-[2.3rem] p-8 md:p-10 text-white"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-emerald-400/20">
                      <Bot className="h-7 w-7 text-emerald-200" />
                    </div>
                    <h3 className="mt-7 text-3xl font-bold tracking-[-0.03em]">
                      AI Automation
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-white/72 md:text-base">
                      Bridging disparate workflows into a seamless, autonomous
                      operational engine.
                    </p>
                  </div>

                  <div className="mt-10 grid grid-cols-3 gap-3">
                    <div className="rounded-[1.2rem] bg-white/8 px-3 py-4 text-center">
                      <p className="text-xl font-black">01</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/45">
                        Trigger
                      </p>
                    </div>
                    <div className="rounded-[1.2rem] bg-white/8 px-3 py-4 text-center">
                      <p className="text-xl font-black">02</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/45">
                        Route
                      </p>
                    </div>
                    <div className="rounded-[1.2rem] bg-white/8 px-3 py-4 text-center">
                      <p className="text-xl font-black">03</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/45">
                        Resolve
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.24} className="xl:col-span-7">
              <Link
                href="/services/ai-training"
                className="relative block overflow-hidden rounded-[2.3rem] p-8 md:p-10 text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #10204a 0%, #1f56d8 58%, #72b4ff 100%)",
                  boxShadow: "0 24px 60px rgba(22, 56, 160, 0.22)",
                }}
              >
                <ParticleField
                  count={10}
                  color="#ffffff"
                  className="pointer-events-none opacity-30"
                />
                <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_0.72fr] md:items-end">
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-white/18">
                      <GraduationCap className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mt-7 text-3xl font-bold tracking-[-0.03em] md:text-4xl">
                      AI Training
                    </h3>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/78 md:text-base">
                      Empower your team with the skills to prompt, manage, and
                      iterate alongside advanced AI systems.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-[1.5rem] bg-white/14 p-5 backdrop-blur-sm">
                      <span className="block text-3xl font-black">15+</span>
                      <span className="mt-1 block text-[11px] uppercase tracking-[0.22em] text-white/60">
                        Modules
                      </span>
                    </div>
                    <div className="rounded-[1.5rem] bg-white/14 p-5 backdrop-blur-sm">
                      <span className="block text-3xl font-black">500+</span>
                      <span className="mt-1 block text-[11px] uppercase tracking-[0.22em] text-white/60">
                        Trained
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
