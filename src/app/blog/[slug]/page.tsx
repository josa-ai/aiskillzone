import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/blog";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { CTABanner } from "@/components/CTABanner";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderMarkdownContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: { type: string; content: string }[] = [];
  let currentParagraph: string[] = [];

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      elements.push({ type: "p", content: currentParagraph.join(" ") });
      currentParagraph = [];
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "") {
      flushParagraph();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      elements.push({ type: "h3", content: trimmed.slice(4) });
    } else if (trimmed.startsWith("## ")) {
      flushParagraph();
      elements.push({ type: "h2", content: trimmed.slice(3) });
    } else {
      currentParagraph.push(trimmed);
    }
  }
  flushParagraph();

  return elements;
}

/**
 * Process inline markdown (bold and links) from trusted local MDX content.
 * Note: Content is sourced exclusively from local MDX files in the content/blog
 * directory, not from user input, so inline HTML rendering is safe.
 */
function processInlineMarkdown(text: string): string {
  let processed = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  processed = processed.replace(
    /\[(.+?)\]\((.+?)\)/g,
    '<a href="$2" class="text-brand-royal-purple underline hover:text-brand-mauve-purple">$1</a>'
  );
  return processed;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const contentElements = renderMarkdownContent(post.content);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-midnight-plum">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(141,75,187,0.45),transparent)]"
        />
        <div className="relative mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/70">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingTime} min read</span>
            <Badge variant="secondary" className="w-fit">
              {post.category}
            </Badge>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <article className="prose prose-lg max-w-none prose-headings:text-brand-deep-navy prose-p:text-brand-deep-navy/80 prose-strong:text-brand-deep-navy prose-a:text-brand-royal-purple">
            {contentElements.map((el, i) => {
              const html = processInlineMarkdown(el.content);
              if (el.type === "h2") {
                return (
                  <h2
                    key={i}
                    className="mt-10 mb-4 text-2xl font-bold text-brand-deep-navy"
                  >
                    {el.content}
                  </h2>
                );
              }
              if (el.type === "h3") {
                return (
                  <h3
                    key={i}
                    className="mt-8 mb-3 text-xl font-semibold text-brand-deep-navy"
                  >
                    {el.content}
                  </h3>
                );
              }
              // For paragraphs, we need to render inline markdown (bold, links)
              // Content is from trusted local MDX files only, not user input
              return (
                <p
                  key={i}
                  className="mb-4 leading-relaxed text-brand-deep-navy/80"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              );
            })}
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 border-t border-brand-soft-lavender/50 pt-12">
              <h2 className="mb-6 text-2xl font-bold text-brand-deep-navy">
                Related Posts
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group rounded-xl border border-brand-soft-lavender/50 bg-brand-frosted-blue/40 p-6 transition-all hover:shadow-md hover:border-primary/20"
                  >
                    <Badge variant="secondary" className="mb-3 w-fit">
                      {related.category}
                    </Badge>
                    <h3 className="font-bold text-brand-deep-navy group-hover:text-brand-royal-purple transition-colors">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-sm text-brand-deep-navy/60 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Need help implementing AI in your business?"
        description="We'll walk you through what's possible and what makes sense for your situation."
        ctaText="Book a free discovery call"
        ctaLink="/contact"
        variant="secondary"
      />
    </>
  );
}
