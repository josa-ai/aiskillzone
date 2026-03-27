"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/AnimatedSection";
import { LogoBar } from "@/components/LogoBar";
import { ServiceCard } from "@/components/ServiceCard";
import { CTABanner } from "@/components/CTABanner";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { HeroSection } from "@/components/HeroSection";
import { FloatingShapes, GlowingOrb, GeometricAccents } from "@/components/decorations";
import { ProblemIcon } from "@/components/decorations";
import { motion } from "framer-motion";
import { primaryServices, secondaryServices } from "@/lib/services-data";

const problems = [
  {
    title: "Customers can't reach you",
    description:
      "That call that came in while you were in a meeting? They called a competitor instead. Missed calls mean missed opportunities. It's that simple.",
    icon: "phone" as const,
  },
  {
    title: "You're stuck doing the same tasks over and over",
    description:
      "Email responses, scheduling, data entry, follow-ups. Hours disappear into work that a smart system could handle in seconds.",
    icon: "repeat" as const,
  },
  {
    title: "Your website looks like it's from 2015",
    description:
      "Your customers are making decisions before they ever call you. An outdated site sends the wrong message.",
    icon: "computer" as const,
  },
  {
    title: "You're not sure where AI fits into your business",
    description:
      "You know AI is important. You're just not sure what it actually does for your business, or if it's worth the cost.",
    icon: "thinking" as const,
  },
];

const testimonials = [
  {
    quote:
      "JOSA.AI set up a voice AI system that answers our calls after hours. We went from missing 30% of our leads to capturing almost all of them. It paid for itself in the first month.",
    name: "Maria Gonzalez",
    title: "Owner",
    company: "Sunshine State Cleaning Co.",
    rating: 5 as const,
  },
  {
    quote:
      "They rebuilt our website and added automations that handle our appointment scheduling and follow-ups. My team saves at least 10 hours a week now. I wish we had done this sooner.",
    name: "David Chen",
    title: "General Manager",
    company: "Lakeland Auto Pros",
    rating: 5 as const,
  },
  {
    quote:
      "The AI training workshop was a game-changer for our office. Our staff actually understands how to use these tools now instead of being afraid of them. Highly recommend.",
    name: "Sarah Mitchell",
    title: "Operations Director",
    company: "Polk County Insurance Group",
    rating: 5 as const,
  },
];

export function HomepageContent() {
  return (
    <>
      {/* ── Hero Section ── */}
      <HeroSection />

      {/* ── Logo Bar ── */}
      <LogoBar />

      {/* ── Problem Section ── */}
      <section className="relative overflow-hidden py-12 md:py-16 gradient-mesh-purple">
        {/* Section decorations */}
        <FloatingShapes count={8} className="opacity-30" />
        <GlowingOrb
          className="-left-20 top-1/4"
          color="#8D4BBB"
          size={300}
        />
        <GlowingOrb
          className="-right-20 bottom-1/4"
          color="#3B82F6"
          size={250}
        />
        <GeometricAccents variant="hexagons" position="corners" />

        {/* Animated dot pattern */}
        <div className="absolute inset-0 dot-pattern opacity-50" />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <SectionHeading
              title="You're leaving money on the table."
              centered
              gradient
            />
          </AnimatedSection>

          <div className="mt-14 flex flex-col gap-4 lg:flex-row">
            {/* Left: Photo panel */}
            <AnimatedSection delay={0} className="lg:w-2/5 flex-shrink-0">
              <div className="relative h-72 overflow-hidden rounded-2xl shadow-xl shadow-brand-royal-purple/15 lg:h-full lg:min-h-[640px]">
                <Image
                  src="/images/frustrated-owner.jpg"
                  alt="Frustrated business owner overwhelmed by work"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-midnight-plum/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-lg font-bold leading-snug text-white">Sound familiar?</p>
                  <p className="mt-1 text-sm text-white/80">Most small business owners feel this way. There&apos;s a better way.</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Right: 2×2 bento cards */}
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Card 1 */}
            <AnimatedSection
              delay={0.1}
              className=""
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <Card className="group relative flex h-full min-h-[280px] flex-col overflow-hidden border-2 border-transparent bg-white p-6 shadow-xl shadow-brand-royal-purple/10 transition-all duration-300 hover:border-brand-royal-purple/30 hover:shadow-2xl hover:shadow-brand-mauve-purple/20 lg:min-h-[320px]">
                  {/* Gradient accent bar */}
                  <motion.div
                    className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-brand-royal-purple via-brand-mauve-purple to-brand-tech-blue"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0 }}
                  />

                  {/* Decorative background glow */}
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-royal-purple/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

                  <CardContent className="relative flex flex-1 flex-col gap-4 p-0 pl-4">
                    {/* Icon with glow */}
                    <div className="relative inline-flex">
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-royal-purple/10 to-brand-tech-blue/10 transition-transform duration-300 group-hover:scale-110">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-royal-purple to-brand-tech-blue opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                        <ProblemIcon
                          type={problems[0].icon}
                          className="h-8 w-8 text-brand-royal-purple"
                        />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col">
                      <h3 className="text-xl font-bold text-brand-deep-navy transition-colors duration-300 group-hover:text-brand-royal-purple lg:text-2xl">
                        {problems[0].title}
                      </h3>
                      <p className="mt-2 flex-1 text-base leading-relaxed text-brand-deep-navy/70 lg:text-lg">
                        {problems[0].description}
                      </p>
                    </div>
                  </CardContent>

                  {/* Bottom accent */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-brand-royal-purple to-brand-tech-blue"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            </AnimatedSection>

            {/* Card 2 */}
            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <Card className="group relative flex h-full min-h-[280px] flex-col overflow-hidden border-2 border-transparent bg-white p-6 shadow-xl shadow-brand-royal-purple/10 transition-all duration-300 hover:border-brand-royal-purple/30 hover:shadow-2xl hover:shadow-brand-mauve-purple/20 lg:min-h-[320px]">
                  <motion.div
                    className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-brand-royal-purple via-brand-mauve-purple to-brand-tech-blue"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  />
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-royal-purple/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                  <CardContent className="relative flex flex-1 flex-col gap-4 p-0 pl-4">
                    <div className="relative inline-flex">
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-royal-purple/10 to-brand-tech-blue/10 transition-transform duration-300 group-hover:scale-110">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-royal-purple to-brand-tech-blue opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                        <ProblemIcon
                          type={problems[1].icon}
                          className="h-8 w-8 text-brand-royal-purple"
                        />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h3 className="text-lg font-bold text-brand-deep-navy transition-colors duration-300 group-hover:text-brand-royal-purple">
                        {problems[1].title}
                      </h3>
                      <p className="mt-2 flex-1 text-base leading-relaxed text-brand-deep-navy/70">
                        {problems[1].description}
                      </p>
                    </div>
                  </CardContent>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-brand-royal-purple to-brand-tech-blue"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            </AnimatedSection>

            {/* Card 3 */}
            <AnimatedSection delay={0.3}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <Card className="group relative flex h-full min-h-[280px] flex-col overflow-hidden border-2 border-transparent bg-white p-6 shadow-xl shadow-brand-royal-purple/10 transition-all duration-300 hover:border-brand-royal-purple/30 hover:shadow-2xl hover:shadow-brand-mauve-purple/20">
                  <motion.div
                    className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-brand-royal-purple via-brand-mauve-purple to-brand-tech-blue"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-royal-purple/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                  <CardContent className="relative flex flex-1 flex-col gap-4 p-0 pl-4">
                    <div className="relative inline-flex">
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-royal-purple/10 to-brand-tech-blue/10 transition-transform duration-300 group-hover:scale-110">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-royal-purple to-brand-tech-blue opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                        <ProblemIcon
                          type={problems[2].icon}
                          className="h-8 w-8 text-brand-royal-purple"
                        />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h3 className="text-lg font-bold text-brand-deep-navy transition-colors duration-300 group-hover:text-brand-royal-purple">
                        {problems[2].title}
                      </h3>
                      <p className="mt-2 flex-1 text-base leading-relaxed text-brand-deep-navy/70">
                        {problems[2].description}
                      </p>
                    </div>
                  </CardContent>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-brand-royal-purple to-brand-tech-blue"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            </AnimatedSection>

            {/* Card 4 */}
            <AnimatedSection delay={0.4}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <Card className="group relative flex h-full min-h-[280px] flex-col overflow-hidden border-2 border-transparent bg-white p-6 shadow-xl shadow-brand-royal-purple/10 transition-all duration-300 hover:border-brand-royal-purple/30 hover:shadow-2xl hover:shadow-brand-mauve-purple/20">
                  <motion.div
                    className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-brand-royal-purple via-brand-mauve-purple to-brand-tech-blue"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  />
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-royal-purple/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                  <CardContent className="relative flex flex-1 flex-col gap-4 p-0 pl-4">
                    <div className="relative inline-flex">
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-royal-purple/10 to-brand-tech-blue/10 transition-transform duration-300 group-hover:scale-110">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-royal-purple to-brand-tech-blue opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                        <ProblemIcon
                          type={problems[3].icon}
                          className="h-8 w-8 text-brand-royal-purple"
                        />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h3 className="text-lg font-bold text-brand-deep-navy transition-colors duration-300 group-hover:text-brand-royal-purple">
                        {problems[3].title}
                      </h3>
                      <p className="mt-2 flex-1 text-base leading-relaxed text-brand-deep-navy/70">
                        {problems[3].description}
                      </p>
                    </div>
                  </CardContent>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-brand-royal-purple to-brand-tech-blue"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            </AnimatedSection>
            </div>{/* end cards grid */}
          </div>{/* end flex row */}
        </div>
      </section>

      {/* ── Services Overview ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-frosted-blue/20 to-white py-12 md:py-16">
        {/* Section decorations */}
        <div className="absolute inset-0">
          <FloatingShapes count={4} className="opacity-20" />
        </div>

        {/* Wave decoration at top */}
        <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
          <svg
            className="absolute -top-1 w-full"
            viewBox="0 0 1440 60"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <SectionHeading title="Here's what we do." centered />
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.15}>
            <div className="mt-14 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="mt-12 text-center">
              <p className="text-base leading-relaxed text-brand-deep-navy/70 italic">
                We also offer:{" "}
                <span className="font-medium text-brand-deep-navy/70">
                  {secondaryServices.map((s) => s.title).join(", ")}
                </span>
                .
              </p>
              <Link
                href="/services"
                className="group mt-4 inline-flex items-center gap-2 text-base font-semibold text-brand-royal-purple transition-all hover:text-brand-mauve-purple"
              >
                See the full list of services
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </motion.svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* Wave decoration at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden rotate-180">
          <svg
            className="absolute -top-1 w-full"
            viewBox="0 0 1440 60"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── Social Proof / Testimonials ── */}
      <section className="relative overflow-hidden py-12 md:py-16">
        {/* Section decorations */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-soft-lavender/30 via-white to-brand-soft-lavender/30" />
        <GlowingOrb className="-left-40 top-0" color="#A882EE" size={400} />
        <GeometricAccents variant="dots" position="top-left" />
        <GeometricAccents variant="circles" position="bottom-right" />

        {/* Decorative quote marks */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-8 text-[10rem] font-serif leading-none text-brand-soft-lavender/30 select-none md:left-12 md:text-[14rem]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          &ldquo;
        </motion.div>
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-8 right-4 text-[10rem] font-serif leading-none text-brand-soft-lavender/30 select-none rotate-180 md:right-12 md:text-[14rem]"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          &ldquo;
        </motion.div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <SectionHeading title="What our clients say." centered />
          </AnimatedSection>

          <AnimatedSection delay={0.15} direction="up">
            <div className="mt-14">
              <TestimonialCarousel testimonials={testimonials} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <CTABanner
        title="Ready to see what AI can do for your business?"
        description="You don't have to figure this out alone. We'll walk you through what's possible, what makes sense for your situation, and what the next steps look like."
        ctaText="Book a free discovery call"
        ctaLink="/contact"
        variant="primary"
      />
      <div className="bg-brand-midnight-plum px-6 pb-12 text-center">
        <p className="text-sm text-brand-cool-azure/70">
          30 minutes. No pressure. Just a conversation about your business and
          where AI can actually help.
        </p>
      </div>
    </>
  );
}
