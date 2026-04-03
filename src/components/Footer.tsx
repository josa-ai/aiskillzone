"use client";

import Link from "next/link";
import Image from "next/image";
import { primaryServices } from "@/lib/services-data";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer-shell relative overflow-hidden pt-16 md:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="showcase-card-dark rounded-[2rem] px-6 py-8 md:px-10 md:py-12">
          <div className="grid gap-10 md:grid-cols-[1.35fr_1fr_0.8fr_0.8fr]">
            <div>
              <div className="inline-flex rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/65">
                White-label execution layer
              </div>
              <Link href="/" className="mt-5 inline-block">
                <Image
                  src="/images/logo-aiskillzone.png"
                  alt="AISkillZone"
                  width={400}
                  height={80}
                  className="h-10 w-auto"
                />
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
                Curating the future of enterprise intelligence through modern
                websites, AI systems, workflow design, and polished digital
                implementation.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                Services
              </h4>
              <ul className="mt-5 space-y-3">
                {primaryServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-white/72 transition-all hover:text-white"
                    >
                      <span>{service.icon}</span>
                      <span>{service.shortTitle}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                Company
              </h4>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 text-sm text-white/72 transition-all hover:text-white"
                  >
                    Portfolio
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm text-white/72 transition-all hover:text-white"
                  >
                    Services
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/55">
                Follow
              </h4>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm text-white/72 transition-all hover:text-white"
                  >
                    LinkedIn
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm text-white/72 transition-all hover:text-white"
                  >
                    Twitter
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
            <p>&copy; 2026 AISkillZone. All rights reserved.</p>
            <p>Built to showcase modern AI-enabled service possibilities.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
