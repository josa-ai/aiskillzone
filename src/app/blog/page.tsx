import Image from "next/image";
import Link from "next/link";
import { GradientDots } from "@/components/ui/gradient-dots";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTABanner } from "@/components/CTABanner";
import { SectionHeading } from "@/components/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description:
    "AI tips, tutorials, and insights for small businesses. Learn how to use AI to grow your business.",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const blogPosts = getAllPosts();

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-brand-midnight-plum">
        <Image
          src="/images/heroes/blog.jpg"
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
                { label: "Blog" },
              ]}
            />
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            AI insights for your business.
          </h1>
        </div>
      </section>

      {/* ── Blog Posts Grid ── */}
      <section className="relative bg-white py-10 md:py-14">
        <GradientDots duration={40} dotSize={3} spacing={16} />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <SectionHeading
            title="Latest posts."
            centered
          />

          <div className="mt-14 grid gap-8">
            {blogPosts.length === 0 && (
              <p className="text-center text-brand-deep-navy/60">
                No posts yet. Check back soon!
              </p>
            )}
            {blogPosts.map((post) => (
              <Card
                key={post.slug}
                className="flex min-h-[280px] flex-col border-0 bg-brand-frosted-blue/40 ring-1 ring-brand-soft-lavender/60 transition-shadow hover:shadow-lg hover:shadow-brand-soft-lavender/30"
              >
                <CardContent className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <time
                      dateTime={post.date}
                      className="text-base text-brand-deep-navy/50"
                    >
                      {formatDate(post.date)}
                    </time>
                    <Badge variant="secondary" className="w-fit">
                      {post.category}
                    </Badge>
                    <span className="text-base text-brand-deep-navy/40">
                      {post.readingTime} min read
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-brand-deep-navy sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="text-base leading-relaxed text-brand-deep-navy/70">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-2 inline-block text-base font-semibold text-brand-royal-purple underline decoration-brand-royal-purple/30 underline-offset-4 transition-colors hover:text-brand-mauve-purple hover:decoration-brand-mauve-purple/50"
                  >
                    Read more &rarr;
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-12 text-center text-base text-brand-deep-navy/60">
            More posts coming soon. Subscribe to get notified.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        title="Need help implementing AI in your business?"
        description="We'll walk you through what's possible and what makes sense for your situation."
        ctaText="Book a free discovery call"
        ctaLink="https://link.josa.ai/widget/bookings/tech-audit-calendar"
        variant="secondary"
      />
    </>
  );
}
