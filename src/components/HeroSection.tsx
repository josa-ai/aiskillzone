"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const HeroBrainPlayer = dynamic(
  () => import("@/components/HeroBrainPlayer").then((m) => m.HeroBrainPlayer),
  { ssr: false }
);

export function HeroSection() {
  return (
    <header className="relative pt-32 pb-20 px-8 overflow-hidden bg-mesh-gradient">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div className="z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00642d] shadow-[0_0_8px_rgba(0,100,45,0.4)]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-on-surface-variant">
              The Future is Curated
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold font-heading leading-[1.1] tracking-tight text-on-surface mb-8">
            Architecting{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004bca] to-[#0061ff]">
              Intelligence
            </span>
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed max-w-lg mb-10">
            Boutique AI consulting that bridges the gap between complex neural
            networks and high-impact business operations. We build your digital
            future, curated with precision.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/services"
              className="px-8 py-4 bg-gradient-to-r from-[#004bca] to-[#0061ff] text-white rounded-full font-bold text-base shadow-xl shadow-[#004bca]/20 hover:translate-y-[-2px] transition-transform inline-block"
            >
              Explore Our Services
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 bg-[#e0e3e5] text-[#191c1e] rounded-full font-bold text-base hover:bg-[#e6e8ea] transition-colors inline-block"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        {/* Right column — Remotion Animated Brain */}
        <div className="relative">
          <div className="aspect-square rounded-[2rem] overflow-hidden relative bg-[#080c24]">
            <HeroBrainPlayer />

            {/* Glassmorphic overlay */}
            <div className="absolute bottom-8 left-8 p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl max-w-xs border border-white/20 z-10">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-[#004bca]" />
                <span className="text-sm font-bold font-heading">
                  AI Efficiency Index
                </span>
              </div>
              <div className="h-2 w-full bg-[#eceef0] rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-[#004bca] rounded-full" />
              </div>
              <span className="text-[10px] uppercase font-bold mt-2 block text-on-surface-variant">
                +85% Productivity Optimization
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
