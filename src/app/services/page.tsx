import Link from "next/link";
import type { Metadata } from "next";
import { primaryServices, secondaryServices } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website design, voice AI, automation, training, and more. Custom AI solutions for modern businesses.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-8 overflow-hidden bg-mesh-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#004bca] animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-on-surface-variant">
              Our Expertise
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold font-heading tracking-tight leading-[1.1] text-on-surface mb-6">
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
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold font-heading mb-4">
            Core Services
          </h2>
          <p className="text-on-surface-variant mb-12 max-w-xl">
            Our primary offerings — the services that drive the most impact for
            our clients.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {primaryServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-surface-container-lowest p-10 rounded-[2.5rem] border border-outline-variant/10 hover:shadow-xl hover:-translate-y-1 transition-all group block"
              >
                <span className="text-3xl mb-6 block">{service.icon}</span>
                <h3 className="text-2xl font-bold font-heading mb-4 group-hover:text-[#004bca] transition-colors">
                  {service.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold font-heading mb-4">
            Additional Services
          </h2>
          <p className="text-on-surface-variant mb-12 max-w-xl">
            Specialized capabilities to complement your core AI strategy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondaryServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 hover:shadow-[0_20px_40px_rgba(25,28,30,0.06)] hover:-translate-y-1 transition-all group block"
              >
                <span className="text-2xl mb-4 block">{service.icon}</span>
                <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-[#004bca] transition-colors">
                  {service.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
