"use client";

const logos = [
  {
    name: "Claude",
    svg: (
      <svg viewBox="0 0 100 24" className="h-6 w-auto" aria-label="Claude">
        <text
          x="50"
          y="17"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize="16"
          fontWeight="600"
          fill="currentColor"
        >
          Claude
        </text>
      </svg>
    ),
  },
  {
    name: "OpenAI",
    svg: (
      <svg viewBox="0 0 100 24" className="h-6 w-auto" aria-label="OpenAI">
        <text
          x="50"
          y="17"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize="16"
          fontWeight="600"
          fill="currentColor"
        >
          OpenAI
        </text>
      </svg>
    ),
  },
  {
    name: "Gemini",
    svg: (
      <svg viewBox="0 0 100 24" className="h-6 w-auto" aria-label="Gemini">
        <text
          x="50"
          y="17"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize="16"
          fontWeight="600"
          fill="currentColor"
        >
          Gemini
        </text>
      </svg>
    ),
  },
  {
    name: "Minimax",
    svg: (
      <svg viewBox="0 0 110 24" className="h-6 w-auto" aria-label="Minimax">
        <text
          x="55"
          y="17"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize="16"
          fontWeight="600"
          fill="currentColor"
        >
          Minimax
        </text>
      </svg>
    ),
  },
  {
    name: "Next.js",
    svg: (
      <svg viewBox="0 0 110 24" className="h-6 w-auto" aria-label="Next.js">
        <text
          x="55"
          y="17"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize="16"
          fontWeight="600"
          fill="currentColor"
        >
          ▲ Next.js
        </text>
      </svg>
    ),
  },
  {
    name: "Vercel",
    svg: (
      <svg viewBox="0 0 100 24" className="h-6 w-auto" aria-label="Vercel">
        <text
          x="50"
          y="17"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize="16"
          fontWeight="600"
          fill="currentColor"
        >
          ▲ Vercel
        </text>
      </svg>
    ),
  },
  {
    name: "Supabase",
    svg: (
      <svg viewBox="0 0 120 24" className="h-6 w-auto" aria-label="Supabase">
        <text
          x="60"
          y="17"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize="16"
          fontWeight="600"
          fill="currentColor"
        >
          Supabase
        </text>
      </svg>
    ),
  },
];

function Separator() {
  return (
    <span className="mx-6 text-brand-soft-lavender/60 select-none" aria-hidden="true">
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
              <div
                className="flex-shrink-0 text-brand-deep-navy transition-all duration-300 grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
              >
                {logo.svg}
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
