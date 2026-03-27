"use client";

import Image from "next/image";

const logos = [
  { name: "Claude",   file: "/images/logos/anthropic.svg",    w: 24, h: 24 },
  { name: "OpenAI",   file: "/images/logos/openai.svg",       w: 24, h: 24 },
  { name: "Gemini",   file: "/images/logos/googlegemini.svg", w: 24, h: 24 },
  { name: "Minimax",  file: "/images/logos/minimax.svg",      w: 24, h: 24 },
  { name: "Next.js",  file: "/images/logos/nextdotjs.svg",    w: 24, h: 24 },
  { name: "Vercel",   file: "/images/logos/vercel.svg",       w: 24, h: 24 },
  { name: "Supabase", file: "/images/logos/supabase.svg",     w: 24, h: 24 },
];

function Separator() {
  return (
    <span className="mx-8 text-brand-soft-lavender/60 select-none" aria-hidden="true">
      &bull;
    </span>
  );
}

export function LogoBar() {
  return (
    <section className="w-full py-10">
      <p className="mb-6 text-center text-sm font-medium tracking-wide text-brand-deep-navy/60 uppercase">
        Powered by industry-leading AI &amp; technology
      </p>
      <div
        className="group relative overflow-hidden"
        aria-label="Technology partners"
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

        <div
          className="flex w-max items-center group-hover:[animation-play-state:paused]"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div key={`${logo.name}-${i}`} className="flex items-center">
              <div className="flex shrink-0 items-center gap-2.5 grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100">
                <Image
                  src={logo.file}
                  alt={logo.name}
                  width={logo.w}
                  height={logo.h}
                  className="h-6 w-auto"
                  unoptimized
                />
                <span className="text-sm font-semibold text-brand-deep-navy">
                  {logo.name}
                </span>
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
