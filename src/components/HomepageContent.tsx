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
} from "lucide-react";

const problems = [
  {
    title: "Customers Can't Reach You",
    description:
      "Missed inquiries are missed revenue. Modern Voice AI ensures 24/7 engagement.",
    icon: PhoneOff,
    color: "bg-[#994700]/10",
    iconColor: "text-[#994700]",
  },
  {
    title: "Website Looks Like 2015",
    description:
      "First impressions happen in milliseconds. Elevate your aesthetic to match your value.",
    icon: Monitor,
    color: "bg-[#004bca]/10",
    iconColor: "text-[#004bca]",
  },
  {
    title: "Stuck Doing Same Tasks",
    description:
      "Manual labor for repetitive digital tasks is a relic of the past. Automate the routine.",
    icon: RefreshCw,
    color: "bg-[#00642d]/10",
    iconColor: "text-[#00642d]",
  },
  {
    title: "Not Sure Where AI Fits",
    description:
      "Complexity causes paralysis. We provide the roadmap to meaningful AI integration.",
    icon: Brain,
    color: "bg-[#0061ff]/10",
    iconColor: "text-[#0061ff]",
  },
];

export function HomepageContent() {
  return (
    <>
      <HeroSection />

      {/* Money on the Table */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
              Money on the Table
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Don&apos;t let legacy processes drain your revenue. Identify the
              leaks in your digital strategy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem) => {
              const Icon = problem.icon;
              return (
                <div
                  key={problem.title}
                  className="bg-surface-container-lowest p-8 rounded-3xl group hover:shadow-[0_20px_40px_rgba(25,28,30,0.06)] transition-all duration-500 hover:-translate-y-2"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${problem.color} flex items-center justify-center mb-6`}
                  >
                    <Icon className={`w-6 h-6 ${problem.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-3 leading-tight">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Solutions Bento */}
      <section className="py-24 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
                Strategic Solutions
              </h2>
              <p className="text-on-surface-variant max-w-xl">
                We don&apos;t just implement tools; we design entire cognitive
                workflows for the digital-first era.
              </p>
            </div>
            <div className="bg-surface-container px-6 py-3 rounded-full flex items-center gap-4 border border-outline-variant/10">
              <span className="text-sm font-bold">Latest in AI</span>
              <Sparkles className="w-5 h-5 text-[#00642d] animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Website Design — large */}
            <Link
              href="/services/website-design"
              className="md:col-span-2 relative bg-surface-container-low rounded-[2.5rem] p-10 overflow-hidden group block"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#004bca] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#004bca]/20">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold font-heading mb-4">
                  Website Design
                </h3>
                <p className="text-on-surface-variant max-w-md mb-8">
                  Beyond aesthetics. We build intelligent, conversion-focused
                  interfaces that adapt to user behavior in real-time.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <Check className="w-5 h-5 text-[#00642d]" />
                    High-Performance UX
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <Check className="w-5 h-5 text-[#00642d]" />
                    AI-Driven Content Personalization
                  </li>
                </ul>
              </div>
            </Link>

            {/* Voice AI */}
            <Link
              href="/services/voice-ai"
              className="bg-surface-container-lowest p-10 rounded-[2.5rem] border border-outline-variant/10 hover:shadow-xl transition-all block"
            >
              <div className="w-14 h-14 bg-[#994700] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#994700]/20">
                <Mic className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4">
                Voice AI
              </h3>
              <p className="text-on-surface-variant text-sm mb-6">
                Human-like conversational agents for high-volume customer
                service and scheduling.
              </p>
              <div className="pt-6 border-t border-outline-variant/10">
                <span className="text-xs font-bold tracking-widest text-[#994700] uppercase">
                  24/7 Availability
                </span>
              </div>
            </Link>

            {/* AI Automation */}
            <Link
              href="/services/ai-automation"
              className="bg-surface-container-lowest p-10 rounded-[2.5rem] border border-outline-variant/10 hover:shadow-xl transition-all block"
            >
              <div className="w-14 h-14 bg-[#00642d] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#00642d]/20">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4">
                AI Automation
              </h3>
              <p className="text-on-surface-variant text-sm mb-6">
                Bridging disparate workflows into a seamless, autonomous
                operational engine.
              </p>
              <div className="pt-6 border-t border-outline-variant/10">
                <span className="text-xs font-bold tracking-widest text-[#00642d] uppercase">
                  Zero Latency Ops
                </span>
              </div>
            </Link>

            {/* AI Training — large gradient */}
            <Link
              href="/services/ai-training"
              className="md:col-span-2 bg-gradient-to-br from-[#004bca] to-[#0061ff] p-10 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-10 block"
            >
              <div className="flex-1">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold font-heading mb-4 text-white">
                  AI Training
                </h3>
                <p className="text-white/80 max-w-md mb-8">
                  Empower your team with the skills to prompt, manage, and
                  iterate alongside advanced AI systems.
                </p>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="aspect-square bg-white/10 rounded-2xl backdrop-blur-sm p-4 flex flex-col justify-center items-center text-center">
                  <span className="text-2xl font-black block">15+</span>
                  <span className="text-[10px] uppercase font-bold opacity-70">
                    Modules
                  </span>
                </div>
                <div className="aspect-square bg-white/10 rounded-2xl backdrop-blur-sm p-4 flex flex-col justify-center items-center text-center">
                  <span className="text-2xl font-black block">500+</span>
                  <span className="text-[10px] uppercase font-bold opacity-70">
                    Trained
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
