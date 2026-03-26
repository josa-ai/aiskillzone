import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { CTABanner } from "@/components/CTABanner";
import { SectionHeading } from "@/components/SectionHeading";
import { primaryServices, secondaryServices } from "@/lib/services-data";

export const metadata = {
  title: "AI Services for Small Businesses",
  description:
    "Website design, voice AI, automation, training, and more. Custom AI solutions tailored to Central Florida businesses.",
};

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-midnight-plum">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(141,75,187,0.45),transparent)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_100%,rgba(59,130,246,0.2),transparent)]"
        />
        <div
          aria-hidden="true"
          className="hero-with-image absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(rgba(66, 28, 82, 0.85), rgba(66, 28, 82, 0.9)), url('/images/heroes/services-hero.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center md:py-32 lg:py-40">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            All the services you need to move your business forward.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            We specialize in custom solutions that actually work for your
            business. No cookie-cutter templates, no overselling features you
            won&rsquo;t use. Just real tools that solve real problems.
          </p>
        </div>
      </section>

      {/* ── Primary Services ── */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-0 bg-texture-dots opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <SectionHeading title="Our core services." centered />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {primaryServices.map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.shortTitle}
                description={service.description}
                icon={service.icon}
                link={`/services/${service.slug}`}
                variant="primary"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Secondary Services ── */}
      <section className="relative bg-brand-frosted-blue/30 py-20 md:py-28">
        <div className="absolute inset-0 bg-texture-grid opacity-20" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <SectionHeading title="We also offer:" centered />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryServices.map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.shortTitle}
                description={service.description}
                icon={service.icon}
                link={`/services/${service.slug}`}
                variant="secondary"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <CTABanner
        title="Not sure what you need?"
        description="Let's talk about your business and figure out the right solution together."
        ctaText="Book a free discovery call"
        ctaLink="/contact"
        variant="primary"
      />
    </>
  );
}
