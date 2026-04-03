"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

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
          <div className="aspect-square rounded-[2rem] overflow-hidden relative bg-[#0a0820]">
            <HeroBrainPlayer />
          </div>
        </div>
      </div>
    </header>
  );
}
