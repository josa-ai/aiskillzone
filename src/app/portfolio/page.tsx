import Image from "next/image";
import { GradientDots } from "@/components/ui/gradient-dots";
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
    title: "U.S. Citizenship Test Prep App",
    description:
      "Bilingual flashcard app covering all 128 USCIS civics questions with swipe mechanics, progress tracking, and EN/ES support.",
    category: "Web App",
    image: "/images/portfolio/citizenship.jpg",
    url: "https://citizenshipexam.app",
  },
  {
    title: "Synced Soccer — Website & Player Management",
    description:
      "Youth soccer academy site with multilingual support, program registration, standings tracker, volunteer portal, and calendar.",
    category: "Website + App",
    image: "/images/portfolio/syncedsoccer.jpg",
    url: "https://syncedsoccer.com",
  },
  {
    title: "Melanie Lowery Showings — Real Estate Website",
    description:
      "Interactive real estate website with embedded MLS listings, lead magnets, market reports, and live Florida real estate statistics.",
    category: "Website",
    image: "/images/portfolio/melanie.jpg",
    url: "https://www.melanieloweryshowings.com/",
  },
  {
    title: "JOSA.AI Blueprint — AI Training Platform",
    description:
      "Our own platform for live AI workshops and hands-on courses helping small business owners build practical AI skills.",
    category: "Web App",
    image: "/images/portfolio/blueprint.jpg",
    url: "https://blueprint.josa.ai",
  },
  {
    title: "Dos Bocas — Restaurant Website",
    description:
      "Bilingual restaurant website with full menu, online ordering, photo gallery, and contact for an authentic Puerto Rican restaurant.",
    category: "Website",
    image: "/images/portfolio/dosbocas.jpg",
    url: "https://dosbocas.vercel.app",
  },
  {
    title: "Final Exam Challenge — Interactive Game MVP",
    description:
      "Gamified quiz app with animated avatar characters, leaderboards, and live scoring — an edtech MVP currently seeking investment.",
    category: "Web App",
    image: "/images/portfolio/quiz.jpg",
    url: "https://quiz-avatar-leaderboard.vercel.app",
  },
  {
    title: "CRAFT Prompt Builder — AI Prompt Studio",
    description:
      "Interactive tool that guides students through the CRAFT framework to build structured, effective AI prompts — with live preview and scoring.",
    category: "Web App",
    image: "/images/portfolio/craft.jpg",
    url: "https://craft-app-six.vercel.app",
  },
  {
    title: "Deva Simmons for Congress",
    description:
      "Full campaign website for a U.S. Congressional candidate with multilingual support, event management, volunteer sign-up system, issues platform, and donation integration.",
    category: "Website + App",
    image: "/images/portfolio/devasimmons.jpg",
    url: "https://devasimmons.com",
  },
  {
    title: "Prime Pulse Logistics — Medical Courier Website",
    description:
      "Professional medical courier company website with service listings, capability statement, driver career portal, and quote request system for Tampa Bay healthcare clients.",
    category: "Website",
    image: "/images/portfolio/ppl813.jpg",
    url: "https://www.ppl813.com",
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-brand-midnight-plum">
        <Image
          src="/images/heroes/portfolio.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-40"
          priority
        />
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
        <div className="relative mx-auto max-w-5xl px-6 py-8 md:py-10">
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
      <section className="relative bg-white py-10 md:py-14">
        <GradientDots duration={40} dotSize={3} spacing={16} />
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
                className="group flex min-h-[400px] flex-col overflow-hidden border-0 ring-1 ring-brand-soft-lavender/60 transition-shadow hover:shadow-lg hover:shadow-brand-soft-lavender/30"
              >
                {/* Screenshot preview */}
                <div className="relative h-48 overflow-hidden bg-brand-soft-lavender/20">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <CardContent className="flex flex-1 flex-col gap-3 p-6">
                  <Badge variant="secondary" className="w-fit">
                    {item.category}
                  </Badge>
                  <h3 className="text-lg font-bold text-brand-deep-navy">
                    {item.title}
                  </h3>
                  <p className="flex-1 text-base leading-relaxed text-brand-deep-navy/70">
                    {item.description}
                  </p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-royal-purple transition-colors hover:text-brand-mauve-purple"
                  >
                    View Live
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
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
