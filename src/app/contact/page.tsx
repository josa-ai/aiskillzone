import { Suspense } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Contact Us",
  description:
    "Book a free discovery call or send us a message. JOSA.AI serves small businesses in Lakeland, Tampa Bay, and Central Florida.",
};

const contactInfo = [
  {
    label: "Email",
    value: "info@josa.ai",
    href: "mailto:info@josa.ai",
    icon: "\u{1F4E7}",
  },
  {
    label: "Location",
    value: "Lakeland, FL",
    href: null,
    icon: "\u{1F4CD}",
  },
  {
    label: "Hours",
    value: "Mon\u2013Fri, 9am\u20136pm EST",
    href: null,
    icon: "\u{1F552}",
  },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "JOSA.AI",
  description:
    "AI implementation partner for small businesses in Central Florida. Custom websites, voice AI, automation, and AI training.",
  url: "https://josa.ai",
  email: "info@josa.ai",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lakeland",
    addressRegion: "FL",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 28.0395,
      longitude: -81.9498,
    },
    geoRadius: "80000",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-brand-midnight-plum">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(168,130,238,0.6),transparent)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 130, 238, 0.3) 0%, transparent 40%)`,
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Contact" },
              ]}
            />
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Let&rsquo;s talk about your business.
          </h1>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section id="book" className="relative bg-white py-20 md:py-28">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(141, 75, 187, 0.35) 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px'
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-brand-deep-navy">
                Send us a message
              </h2>
              <p className="mt-2 text-base text-brand-deep-navy/70">
                Tell us about your business and what you&rsquo;re looking for.
                We&rsquo;ll get back to you with next steps.
              </p>
              <div className="mt-8">
                <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-brand-frosted-blue/60" />}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>

            {/* Right: Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-brand-deep-navy">
                Get in touch
              </h2>
              <p className="mt-2 text-base text-brand-deep-navy/70">
                Prefer to reach out directly? Here&rsquo;s how.
              </p>

              <Card className="mt-8 flex min-h-[300px] flex-col border-0 bg-brand-frosted-blue/40 ring-1 ring-brand-soft-lavender/60">
                <CardContent className="flex flex-1 flex-col space-y-6 p-6">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <span
                        className="mt-0.5 text-2xl"
                        role="img"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      <div>
                        <p className="text-base font-medium text-brand-deep-navy/60">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-base font-semibold text-brand-tech-blue transition-colors hover:text-brand-deep-navy"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-base font-semibold text-brand-deep-navy">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-brand-soft-lavender/60 pt-6">
                    <p className="text-base leading-relaxed text-brand-deep-navy/70">
                      We typically respond within one business day.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
