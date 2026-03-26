import { Breadcrumb } from "@/components/Breadcrumb";
import { CTABanner } from "@/components/CTABanner";
import { SectionHeading } from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Portfolio",
  description:
    "See our work — websites, AI implementations, and automation projects for Central Florida businesses.",
};

const portfolioItems = [
  {
    title: "Local Plumbing Co Website Redesign",
    description:
      "Complete website overhaul with modern design, mobile optimization, and SEO-focused content that increased organic traffic by 85%.",
    category: "Website",
    gradient: "from-brand-royal-purple to-brand-midnight-plum",
  },
  {
    title: "Real Estate Voice AI Agent",
    description:
      "24/7 voice AI agent that handles property inquiries, schedules showings, and qualifies leads — capturing after-hours calls that were previously lost.",
    category: "Voice AI",
    gradient: "from-brand-tech-blue to-brand-deep-navy",
  },
  {
    title: "E-Commerce Automation Suite",
    description:
      "End-to-end automation for order processing, inventory alerts, and customer follow-ups — saving the team 15+ hours per week.",
    category: "Automation",
    gradient: "from-brand-mauve-purple to-brand-royal-purple",
  },
  {
    title: "HVAC Company Lead Capture System",
    description:
      "AI-powered chatbot and form automation that tripled qualified leads and reduced response time from hours to seconds.",
    category: "Voice AI",
    gradient: "from-brand-deep-navy to-brand-tech-blue",
  },
  {
    title: "Boutique Shopify Store Buildout",
    description:
      "Custom Shopify store with product photography guidance, SEO optimization, and automated email marketing workflows.",
    category: "E-Commerce",
    gradient: "from-brand-cool-azure to-brand-tech-blue",
  },
  {
    title: "Insurance Agency Workflow Automation",
    description:
      "Automated client onboarding, policy renewal reminders, and document processing — cutting admin time in half.",
    category: "Automation",
    gradient: "from-brand-midnight-plum to-brand-mauve-purple",
  },
];

export default function PortfolioPage() {
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
                { label: "Portfolio" },
              ]}
            />
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Our work speaks for itself.
          </h1>
        </div>
      </section>

      {/* ── Portfolio Grid ── */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-0 bg-texture-dots opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <SectionHeading
            title="Recent projects."
            subtitle="A selection of work we've done for small businesses across Central Florida."
            centered
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item) => (
              <Card
                key={item.title}
                className="flex min-h-[400px] flex-col overflow-hidden border-0 ring-1 ring-brand-soft-lavender/60 transition-shadow hover:shadow-lg hover:shadow-brand-soft-lavender/30"
              >
                {/* Placeholder gradient image area */}
                <div
                  className={`h-48 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
                >
                  <span className="text-base font-medium text-white/50">
                    Project Preview
                  </span>
                </div>
                <CardContent className="flex flex-1 flex-col gap-3 p-6">
                  <Badge
                    variant="secondary"
                    className="w-fit"
                  >
                    {item.category}
                  </Badge>
                  <h3 className="text-lg font-bold text-brand-deep-navy">
                    {item.title}
                  </h3>
                  <p className="flex-1 text-base leading-relaxed text-brand-deep-navy/70">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-12 text-center text-base text-brand-deep-navy/60">
            More case studies coming soon.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        title="Like what you see?"
        description="Let's build something great for your business."
        ctaText="Start a project"
        ctaLink="/contact"
        variant="primary"
      />
    </>
  );
}
