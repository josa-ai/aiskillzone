import { Breadcrumb } from "@/components/Breadcrumb";
import { CTABanner } from "@/components/CTABanner";
import { SectionHeading } from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "About JOSA.AI",
  description:
    "Meet Ernesto and learn about JOSA.AI — your Central Florida AI implementation partner.",
};

const values = [
  {
    title: "No BS Approach",
    description:
      "We skip the jargon and hype. You get honest recommendations about what will actually work for your business — and what won't.",
    icon: "\u{1F3AF}",
  },
  {
    title: "Results-Focused",
    description:
      "Every project is measured by the impact it has on your business. More leads, more time, more revenue. That's what matters.",
    icon: "\u{1F4C8}",
  },
  {
    title: "Small Business First",
    description:
      "We build solutions sized for small businesses — not watered-down enterprise tools. Practical, affordable, and effective.",
    icon: "\u{1F3EA}",
  },
  {
    title: "Local & Accessible",
    description:
      "Based in Lakeland, FL and serving Central Florida. We're a phone call away, not a faceless corporation across the country.",
    icon: "\u{1F91D}",
  },
];

export default function AboutPage() {
  return (
    <>
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
                { label: "About" },
              ]}
            />
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Meet the team behind JOSA.AI.
          </h1>
        </div>
      </section>

      {/* ── About Content ── */}
      <section className="relative bg-white py-20 md:py-28">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(141, 75, 187, 0.23) 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px'
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <SectionHeading title="Built by someone who gets it." centered />

          <div className="mt-10 space-y-6 text-lg leading-relaxed text-brand-deep-navy/80">
            <p>
              JOSA.AI is run by <strong className="text-brand-deep-navy">Ernesto</strong>, based
              in Lakeland, FL. With over 20 years of experience in e-commerce,
              technology consulting, and digital strategy, Ernesto has seen
              firsthand how the right technology can transform a business — and
              how the wrong approach can waste time and money.
            </p>
            <p>
              After years of helping businesses navigate digital transformation,
              the mission became clear:{" "}
              <strong className="text-brand-deep-navy">
                make AI accessible and practical for small businesses that
                don&rsquo;t have enterprise budgets.
              </strong>
            </p>
            <p>
              That means no overengineered solutions. No six-figure consulting
              fees. Just smart, targeted AI implementations that solve real
              problems — from voice AI that answers your calls to automations
              that save your team hours every week.
            </p>
            <p>
              Bilingual in English and Spanish, Ernesto works directly with
              business owners across Central Florida to identify where AI fits,
              build the solution, and make sure it actually works in the real
              world.
            </p>
          </div>
        </div>
      </section>

      {/* ── Values Section ── */}
      <section className="relative bg-brand-frosted-blue/30 py-20 md:py-28">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'linear-gradient(rgba(141, 75, 187, 0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(141, 75, 187, 0.13) 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title="What we stand for." centered />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card
                key={value.title}
                className="flex min-h-[240px] flex-col border-0 bg-white p-6 ring-1 ring-brand-soft-lavender/60 transition-shadow hover:shadow-lg hover:shadow-brand-soft-lavender/30"
              >
                <CardContent className="flex flex-1 flex-col gap-3 p-0">
                  <span
                    className="text-3xl"
                    role="img"
                    aria-hidden="true"
                  >
                    {value.icon}
                  </span>
                  <h3 className="text-lg font-bold text-brand-deep-navy">
                    {value.title}
                  </h3>
                  <p className="flex-1 text-base leading-relaxed text-brand-deep-navy/70">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        title="Want to work together?"
        description="Book a free discovery call and let's talk about how AI can help your business."
        ctaText="Book a free discovery call"
        ctaLink="/contact"
        variant="primary"
      />
    </>
  );
}
