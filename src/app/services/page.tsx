"use client";

import Link from "next/link";
import { primaryServices, secondaryServices } from "@/lib/services-data";
import { GeometricAccents } from "@/components/decorations/GeometricAccents";
import { FloatingShapes } from "@/components/decorations/FloatingShapes";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GradientDots } from "@/components/ui/gradient-dots";

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-20 px-4 md:px-8 overflow-hidden bg-mesh-gradient grain-overlay">
        <GeometricAccents variant="lines" position="top-right" className="opacity-20" />
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#004bca] animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-on-surface-variant">
              Our Expertise
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-heading tracking-tight leading-[1.1] text-on-surface mb-6">
            Strategic{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004bca] to-[#0061ff]">
              Solutions
            </span>
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl">
            We don&apos;t just implement tools — we design entire cognitive
            workflows for the digital-first era. Explore our full range of AI
            services.
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="relative py-14 md:py-24 px-4 md:px-8 bg-surface-container-low overflow-hidden">
        <GradientDots duration={50} dotSize={2} spacing={24} />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-extrabold font-heading mb-4">
            Core Services
          </h2>
          <p className="text-on-surface-variant mb-12 max-w-xl">
            Our primary offerings — the services that drive the most impact for
            our clients.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {primaryServices.map((service, index) => (
              <AnimatedSection key={service.slug} direction="up" delay={index * 0.1}>
                <Link
                  href={`/services/${service.slug}`}
                  className="card-elevated card-elevated-hover gradient-border bg-surface-container-lowest p-10 rounded-[2.5rem] border border-outline-variant/10 transition-all group block"
                >
                  <span className="text-3xl mb-6 block">{service.icon}</span>
                  <h3 className="text-2xl font-bold font-heading mb-4 group-hover:text-[#004bca] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {service.description}
                  </p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="relative overflow-hidden py-14 md:py-24 px-4 md:px-8">
        <FloatingShapes count={4} className="opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-extrabold font-heading mb-4">
            Additional Services
          </h2>
          <p className="text-on-surface-variant mb-12 max-w-xl">
            Specialized capabilities to complement your core AI strategy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondaryServices.map((service, index) => (
              <AnimatedSection key={service.slug} direction="up" delay={index * 0.1}>
                <Link
                  href={`/services/${service.slug}`}
                  className="card-elevated card-elevated-hover bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 transition-all group block"
                >
                  <span className="text-2xl mb-4 block">{service.icon}</span>
                  <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-[#004bca] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {service.description}
                  </p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
