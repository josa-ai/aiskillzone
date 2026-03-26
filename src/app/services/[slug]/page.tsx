import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/lib/services-data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTABanner } from "@/components/CTABanner";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { JsonLd } from "@/components/JsonLd";

/* ────────────────────────────────────────────────────────────────────────────
   Service detail data
   ──────────────────────────────────────────────────────────────────────────── */

interface ServiceDetail {
  tagline: string;
  problem: string;
  agitation: string;
  solution: string;
  includes: string[];
  faqs: { question: string; answer: string }[];
  cta: { title: string; description: string; ctaText: string };
  relatedSlugs: string[];
}

const serviceDetails: Record<string, ServiceDetail> = {
  "website-design": {
    tagline: "Your website should work as hard as you do.",
    problem:
      "Most small business websites are built from templates that all look the same, haven't been updated in years, aren't designed to convert visitors into customers, and aren't showing up in search results. If your website isn't actively bringing in leads, it's costing you money.",
    agitation:
      "Every day your website underperforms, potential customers are finding your competitors instead. They're making decisions based on what they see online — and if your site looks outdated, loads slowly, or doesn't answer their questions, they're gone in seconds. That's revenue walking out the door before you even get a chance to make a pitch.",
    solution:
      "We build custom websites from the ground up — no templates, no bloat. Every site comes with SEO, AEO (AI Engine Optimization), and ADA compliance built in as standard, never as an upcharge. Your site will be mobile-optimized, integrated with your CRM, and designed to convert visitors into customers. Starting at $400 with a 2–4 week timeline.",
    includes: [
      "Custom design and development — no templates",
      "SEO and AEO built into every page",
      "ADA compliance included at no extra cost",
      "Mobile-first responsive design",
      "CRM integration and lead capture forms",
      "Analytics and performance tracking setup",
    ],
    faqs: [
      {
        question: "Do you use templates?",
        answer:
          "No. Every website we build is custom-designed for your business, your brand, and your customers. Templates are cheap for a reason — they look generic and limit what you can do. We build from scratch so your site actually stands out.",
      },
      {
        question: "Can I make changes to the site after it launches?",
        answer:
          "Absolutely. We build sites that are easy to update, and we offer ongoing support if you want us to handle changes for you. You're never locked into a contract — we just make it easy to keep your site current.",
      },
      {
        question: "Is SEO included or does it cost extra?",
        answer:
          "SEO is built into every site we create — it's never an add-on or upcharge. We handle technical SEO, on-page optimization, and make sure your site is structured so search engines (and AI engines) can find and recommend you.",
      },
      {
        question: "Will my site work on mobile?",
        answer:
          "That's table stakes. Every site we build is mobile-first, meaning we design for phones and tablets before we even think about desktop. Over 60% of web traffic is mobile — your site needs to look and perform flawlessly on every screen size.",
      },
    ],
    cta: {
      title: "Ready for a website that actually works?",
      description:
        "Let's talk about what your business needs and build something that brings in customers.",
      ctaText: "Book a free discovery call",
    },
    relatedSlugs: ["voice-ai", "brand-strategy", "ai-automation"],
  },

  "voice-ai": {
    tagline: "Never miss a customer call again.",
    problem:
      "When a customer calls and nobody answers, 85% of them won't leave a voicemail — they'll just call the next business on the list. If you're a small team, you can't be on the phone 24/7. But your customers don't care about your schedule. They want answers now.",
    agitation:
      "Think about how many calls you've missed this month. After hours. During lunch. While you were with another customer. Each one of those was a potential sale, a new client, a booking. And most of them went straight to a competitor who picked up. The math is simple: missed calls equal lost revenue.",
    solution:
      "Our Voice AI answers your phone 24/7 with a natural-sounding voice that represents your brand. It handles frequently asked questions, qualifies leads, books appointments directly on your calendar, and can even take orders. When a call needs a human touch, it seamlessly transfers to you or your team. Your customers get instant answers. You get qualified leads.",
    includes: [
      "24/7 AI-powered call answering",
      "Custom voice and personality matching your brand",
      "FAQ handling and information delivery",
      "Lead qualification and scoring",
      "Appointment booking with calendar integration",
      "Seamless transfer to live team members when needed",
    ],
    faqs: [
      {
        question: "Will it sound like a robot?",
        answer:
          "Not at all. Modern voice AI sounds remarkably natural. We customize the voice, tone, and personality to match your brand. Most callers won't realize they're talking to an AI — they'll just appreciate getting help immediately.",
      },
      {
        question: "What happens if the AI can't handle a question?",
        answer:
          "It transfers the call directly to you or a team member. The AI knows its limits and is designed to escalate gracefully. You also get a full transcript so you know exactly what was discussed before the transfer.",
      },
      {
        question: "Will customers be annoyed by talking to an AI?",
        answer:
          "Customers are annoyed by voicemail, hold music, and not getting answers. Our AI gives them instant, helpful responses. The alternative — missing the call entirely — is far worse than an AI that actually helps.",
      },
      {
        question: "Does it integrate with my calendar and CRM?",
        answer:
          "Yes. We integrate with Google Calendar, Outlook, and most popular CRM systems. The AI can book appointments, update contact records, and push lead information directly into your existing workflow.",
      },
    ],
    cta: {
      title: "Stop losing leads to voicemail.",
      description:
        "Let's set up a Voice AI that answers your calls, books appointments, and captures every opportunity.",
      ctaText: "Book a free discovery call",
    },
    relatedSlugs: ["ai-automation", "website-design", "business-tools"],
  },

  "ai-automation": {
    tagline: "Stop doing the same thing over and over.",
    problem:
      "You're spending hours every week on email responses, follow-ups, data entry, scheduling, and a dozen other repetitive tasks that don't require your expertise — just your time. It's the kind of work that keeps you busy but doesn't move your business forward.",
    agitation:
      "Every hour you spend on busywork is an hour you're not spending on growth, strategy, or your customers. And it adds up fast — 10 hours a week is 500 hours a year. That's over 12 full work weeks lost to tasks a smart system could handle in seconds. Meanwhile, your competitors are automating and moving faster.",
    solution:
      "We build custom automations tailored to your specific business processes. Not generic templates — actual workflows designed around how your business operates. Whether it's automating email responses, marketing sequences, order processing, or tasks unique to your industry, we'll identify what's eating your time and build systems that handle it.",
    includes: [
      "Custom workflow design and implementation",
      "Email automation and response sequences",
      "Marketing workflow automation",
      "Order processing and fulfillment triggers",
      "Data entry and CRM update automation",
      "Industry-specific process automation",
    ],
    faqs: [
      {
        question: "What can be automated?",
        answer:
          "Almost anything repetitive. Email responses, lead follow-ups, appointment reminders, invoice generation, data entry, social media posting, report generation, order confirmations — if you do it the same way every time, we can probably automate it.",
      },
      {
        question: "How long does it take to set up?",
        answer:
          "Most automation projects take 1–2 weeks from discovery to launch. Simple automations can be live in days. We start by mapping your current workflows, then build, test, and refine until everything runs smoothly.",
      },
      {
        question: "Will it break things or send wrong messages?",
        answer:
          "No. We test extensively before anything goes live. Every automation includes safeguards, error handling, and monitoring. We run through every scenario and edge case, and you approve everything before it starts running.",
      },
      {
        question: "Do I need special software?",
        answer:
          "We work with whatever tools you're already using — Gmail, Outlook, Shopify, QuickBooks, Google Sheets, CRMs, and hundreds more. If your tools can connect, we can automate the workflow between them.",
      },
    ],
    cta: {
      title: "Reclaim your time.",
      description:
        "Let's identify what's eating your hours and build automations that handle it for you.",
      ctaText: "Book a free discovery call",
    },
    relatedSlugs: ["voice-ai", "business-tools", "website-design"],
  },

  "ai-training": {
    tagline: "Your team can use AI. We'll show them how.",
    problem:
      "Your team knows AI is important. They've heard about ChatGPT, they've seen the headlines, and they might have even tried it once or twice. But without proper training, they're either not using it at all or using it poorly — missing the real opportunities to save time and improve their work.",
    agitation:
      "The gap between businesses that adopt AI effectively and those that don't is growing every day. Your competitors are already using AI to write faster, analyze data, handle customer service, and streamline operations. Every week your team spends struggling with or ignoring these tools is a week they're falling further behind.",
    solution:
      "We run hands-on workshops that teach your team how to actually use AI in their daily work. Not theory, not hype — practical skills they can use immediately. We cover tools like ChatGPT, prompt engineering, and AI-powered workflows specific to your industry. Taught by someone who builds AI solutions every day, not someone who read a book about it.",
    includes: [
      "Hands-on workshops tailored to your team's roles",
      "ChatGPT and prompt engineering training",
      "Industry-specific AI use cases and workflows",
      "Practical exercises with real business scenarios",
      "Reference materials and prompt libraries",
      "Follow-up support and Q&A sessions",
    ],
    faqs: [
      {
        question: "Does my team need a technical background?",
        answer:
          "Not at all. Our workshops are designed for everyday business users — not engineers. If your team can use email and a web browser, they can learn to use AI tools effectively. We meet people where they are.",
      },
      {
        question: "Can training be done remotely?",
        answer:
          "Yes. We offer both in-person workshops (Central Florida) and remote sessions via Zoom. Remote sessions work great for distributed teams and are just as interactive as in-person training.",
      },
      {
        question: "How long are the workshops?",
        answer:
          "Workshops range from half-day (3–4 hours) to full-day (6–7 hours) depending on your needs. We also offer multi-session programs for teams that want deeper training over several weeks.",
      },
      {
        question: "Can you customize the content for our industry?",
        answer:
          "Absolutely. Every workshop is tailored to your team's roles and industry. We research your specific workflows and create exercises using real scenarios your team faces daily. Generic AI training is a waste of time — ours is built for you.",
      },
    ],
    cta: {
      title: "Get your team up to speed on AI.",
      description:
        "Book a workshop that teaches practical AI skills your team can use starting tomorrow.",
      ctaText: "Book a free discovery call",
    },
    relatedSlugs: ["ai-automation", "voice-ai", "business-tools"],
  },

  "ecommerce-consulting": {
    tagline: "Ready to sell online? We've been doing this for 20+ years.",
    problem:
      "Getting started with e-commerce is overwhelming. Which platform should you use? How do you list products? What about fulfillment, pricing strategy, and marketplace fees? And if you're already selling online, you know there's always more to optimize — but figuring out what to focus on is its own challenge.",
    agitation:
      "The e-commerce landscape is more competitive than ever. Amazon, Shopify, TikTok Shop, Walmart.com — each platform has its own rules, algorithms, and best practices. Getting it wrong means wasted ad spend, poor visibility, and products that sit unsold. Getting it right means consistent revenue from customers who find you organically.",
    solution:
      "With 20+ years of e-commerce experience, we help product brands get set up, optimized, and scaling on the right platforms. Whether you're launching your first Shopify store or expanding to TikTok Shop and Amazon, we handle the strategy, onboarding, listing optimization, and ongoing performance tuning.",
    includes: [
      "Platform selection and strategy consulting",
      "Marketplace onboarding (Shopify, Amazon, Walmart, TikTok Shop)",
      "Product listing optimization and SEO",
      "Pricing and competitive analysis",
      "Advertising strategy and campaign setup",
      "Ongoing performance monitoring and optimization",
    ],
    faqs: [
      {
        question: "Which platform should I sell on?",
        answer:
          "It depends on your products, target audience, and business goals. We'll analyze your situation and recommend the right mix — it might be Shopify for your own store, Amazon for reach, or TikTok Shop for a younger demographic. Often the answer is a multi-channel strategy.",
      },
      {
        question: "I'm already selling online. Can you help me improve?",
        answer:
          "Absolutely. We audit your existing setup — listings, pricing, advertising, fulfillment — and identify specific areas for improvement. Most businesses we work with see measurable gains within the first month of optimization.",
      },
      {
        question: "How long does it take to get set up?",
        answer:
          "Typical marketplace onboarding takes 2–4 weeks depending on the platform and the number of products. We handle the heavy lifting — account setup, listing creation, photography guidance, and launch strategy — so you can focus on your products.",
      },
      {
        question: "Do you handle advertising too?",
        answer:
          "Yes. We set up and manage advertising campaigns on Amazon, Shopify, and other platforms. We focus on ROI — not just impressions — so every dollar you spend on ads is working toward actual sales.",
      },
    ],
    cta: {
      title: "Ready to sell smarter?",
      description:
        "Let's build an e-commerce strategy that puts your products in front of the right customers.",
      ctaText: "Book a free discovery call",
    },
    relatedSlugs: ["website-design", "brand-strategy", "digital-products"],
  },

  "brand-strategy": {
    tagline:
      "People should know who you are and what makes you different.",
    problem:
      "You know your business is good — but when it comes to explaining what makes you different, the message gets lost. Your website says one thing, your social media says another, and your elevator pitch changes every time. Without a clear brand voice and strategy, you're blending into the noise instead of standing out.",
    agitation:
      "In a market full of options, unclear branding means you're invisible. Customers choose businesses they understand and trust. If your messaging is inconsistent or generic, you're giving them no reason to pick you over the next option. Every touchpoint that doesn't reinforce who you are is a missed opportunity to build recognition and loyalty.",
    solution:
      "We develop your brand voice, messaging framework, and campaign strategy so everything you put out into the world sounds like you — and connects with your audience. This is usually bundled into website or marketing projects, but it's also available as a focused standalone engagement for businesses that need to get their story straight.",
    includes: [
      "Brand voice and tone development",
      "Messaging framework and key differentiators",
      "Target audience definition and personas",
      "Campaign strategy and content direction",
      "Competitive positioning analysis",
      "Brand guidelines document",
    ],
    faqs: [
      {
        question: "Can I get brand strategy as a standalone service?",
        answer:
          "Yes. While we often bundle brand strategy into website or marketing projects, it works great as a focused engagement on its own. It's especially valuable if you're rebranding, launching a new product, or entering a new market.",
      },
      {
        question: "Is this usually part of a website project?",
        answer:
          "Often, yes. A strong website needs a strong brand foundation. Many clients add brand strategy to their website project to make sure the design, copy, and messaging all work together. But it's not required — you can do either one independently.",
      },
      {
        question: "How long does the process take?",
        answer:
          "A focused brand strategy engagement typically takes 2–3 weeks. It involves discovery sessions with your team, competitor research, audience analysis, and the development of your brand framework and guidelines.",
      },
      {
        question: "What do I actually get at the end?",
        answer:
          "You get a complete brand strategy document including your brand voice, messaging framework, audience personas, competitive positioning, and campaign direction. It's a practical playbook your team can use for every piece of content and communication going forward.",
      },
    ],
    cta: {
      title: "Let's define your brand.",
      description:
        "Get clear on who you are, what makes you different, and how to communicate it.",
      ctaText: "Book a free discovery call",
    },
    relatedSlugs: ["website-design", "digital-products", "ecommerce-consulting"],
  },

  "digital-products": {
    tagline: "Turn your expertise into an asset that works 24/7.",
    problem:
      "You have expertise that people want — but right now, the only way to share it is one-on-one. You don't have any digital assets capturing leads, building your email list, or establishing your authority while you sleep. Your knowledge is locked in your head instead of working for your business.",
    agitation:
      "Every day without a lead magnet or digital product is a day you're leaving potential customers on the table. Your competitors are offering free guides, templates, and resources that capture email addresses and start relationships automatically. Meanwhile, visitors hit your site, don't see anything worth exchanging their email for, and leave without a trace.",
    solution:
      "We create polished digital products that capture leads and showcase your expertise. PDF guides, downloadable templates, email courses, checklists, and other resources designed to provide real value to your audience while building your email list and nurturing potential customers automatically.",
    includes: [
      "Strategy and topic selection for maximum impact",
      "Content development and copywriting assistance",
      "Professional design and formatting",
      "Landing page creation for lead capture",
      "Email automation for delivery and follow-up",
      "Analytics and conversion tracking",
    ],
    faqs: [
      {
        question: "What kind of digital products can you create?",
        answer:
          "Guides, templates, checklists, email courses, worksheets, resource libraries — whatever makes sense for your audience and expertise. We'll help you figure out what your potential customers actually want and would exchange their email address for.",
      },
      {
        question: "Do I have to write all the content myself?",
        answer:
          "No. We help with content development, structuring, and copywriting. You bring the expertise and we handle turning it into something polished and professional. Most clients provide rough ideas and we shape them into finished products.",
      },
      {
        question: "Can digital products generate revenue?",
        answer:
          "Absolutely. While many digital products are used as free lead magnets, we also create paid products — courses, premium templates, resource packs — that generate direct revenue. The best approach depends on your business model and goals.",
      },
      {
        question: "How do people actually get the product?",
        answer:
          "We set up the complete delivery system — landing page, email opt-in, automated delivery, and follow-up sequences. Visitors enter their email, instantly receive the product, and enter a nurture sequence that turns them into customers over time.",
      },
    ],
    cta: {
      title: "Start capturing leads while you sleep.",
      description:
        "Let's create digital products that showcase your expertise and build your customer pipeline.",
      ctaText: "Book a free discovery call",
    },
    relatedSlugs: ["brand-strategy", "website-design", "ai-automation"],
  },

  "custom-apps": {
    tagline: "When off-the-shelf tools don't cut it.",
    problem:
      "You've tried the standard software options and none of them quite fit. Maybe you need a specific workflow that no existing tool supports, or you're duct-taping three different apps together to do what one custom tool could handle. Off-the-shelf software wasn't built for your specific business — and it shows.",
    agitation:
      "Every workaround costs you time and introduces room for error. Your team is spending extra minutes on every task because the tools don't match the workflow. Data lives in multiple places, nothing talks to each other cleanly, and you've accepted friction as normal. But it doesn't have to be this way.",
    solution:
      "We build small, focused web applications designed around your specific workflow. Clean, modern, and built to do exactly what you need — nothing more, nothing less. Whether it's an internal tool, a customer-facing portal, or a specialized calculator, we build it right and make it easy to use.",
    includes: [
      "Discovery and requirements analysis",
      "UI/UX design tailored to your workflow",
      "Clean, modern web application development",
      "User authentication and role management",
      "Integration with existing tools and databases",
      "Testing, deployment, and documentation",
    ],
    faqs: [
      {
        question: "How complex of an app can you build?",
        answer:
          "We specialize in simple to moderate complexity web applications — internal tools, dashboards, customer portals, booking systems, specialized calculators. If your project requires a large engineering team, we'll tell you upfront and can help you find the right partner.",
      },
      {
        question: "What's the typical timeline?",
        answer:
          "Most custom app projects take 4–8 weeks from kickoff to launch. Simpler tools can be done faster, and more complex projects may take longer. We'll give you a clear timeline during the discovery phase.",
      },
      {
        question: "Do you offer ongoing maintenance?",
        answer:
          "Yes. We offer optional ongoing support and maintenance plans. Whether you need bug fixes, feature additions, or regular updates, we're available to keep your application running smoothly after launch.",
      },
      {
        question: "What technologies do you use?",
        answer:
          "We build with modern web technologies — React, Next.js, TypeScript, and cloud infrastructure. This means your app will be fast, secure, and scalable. We choose the right tools for each project rather than forcing everything into one framework.",
      },
    ],
    cta: {
      title: "Need a tool that doesn't exist yet?",
      description:
        "Let's design and build a custom application that fits your workflow perfectly.",
      ctaText: "Book a free discovery call",
    },
    relatedSlugs: ["ai-automation", "business-tools", "website-design"],
  },

  "business-tools": {
    tagline: "One platform. One login. Less friction.",
    problem:
      "You're juggling five different apps to run your business — one for email, one for CRM, one for scheduling, one for reviews, and another for your online community. Each one has its own login, its own billing, and its own learning curve. Nothing integrates cleanly and you're spending more time managing tools than actually using them.",
    agitation:
      "Tool sprawl is a silent productivity killer. Every time you switch between platforms, you lose focus and time. Customer data lives in three different places. Your team can't find information quickly. And you're paying for five separate subscriptions when one integrated platform could do it all. The friction adds up to hours lost every week.",
    solution:
      "We set up and configure an integrated business platform that consolidates your CRM, community and course hosting, reputation management, and communication tools into one system. One login, one dashboard, one source of truth for your customer relationships. We handle the setup, migration, and training so your team can hit the ground running.",
    includes: [
      "CRM setup and configuration for your business",
      "Community and course hosting platform",
      "Reputation management and review automation",
      "Email and SMS marketing integration",
      "Pipeline and workflow automation",
      "Data migration from existing tools",
    ],
    faqs: [
      {
        question: "Which tools and platforms do you work with?",
        answer:
          "We primarily work within the GoHighLevel ecosystem, which consolidates CRM, email marketing, SMS, reputation management, course hosting, and community features into one platform. It's powerful, affordable, and built for small businesses.",
      },
      {
        question: "Can you migrate my data from my current tools?",
        answer:
          "Yes, we handle the full migration — contacts, email lists, customer data, pipeline stages, and communication history. We make sure nothing gets lost in the transition and verify everything before we switch you over.",
      },
      {
        question: "Is training included?",
        answer:
          "Absolutely. Every business tools setup includes hands-on training for you and your team. We don't just configure the platform and walk away — we make sure everyone knows how to use it effectively. Follow-up support is included too.",
      },
      {
        question: "How long does the setup take?",
        answer:
          "Typical setup and migration takes 2–4 weeks depending on the complexity of your current tool stack and the amount of data being migrated. We work in phases so you can start using core features while we finish the full configuration.",
      },
    ],
    cta: {
      title: "Simplify your tech stack.",
      description:
        "Let's consolidate your tools into one integrated platform that actually works together.",
      ctaText: "Book a free discovery call",
    },
    relatedSlugs: ["ai-automation", "voice-ai", "website-design"],
  },
};

/* ────────────────────────────────────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────────────────────────────────── */

function getServiceData(slug: string) {
  const service = services.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];
  if (!service || !detail) return null;
  return { ...service, ...detail };
}

/* ────────────────────────────────────────────────────────────────────────────
   Static params + metadata
   ──────────────────────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getServiceData(slug);
  if (!data) return {};

  return {
    title: `${data.title} | JOSA.AI`,
    description: data.description,
  };
}

/* ────────────────────────────────────────────────────────────────────────────
   Page component
   ──────────────────────────────────────────────────────────────────────────── */

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getServiceData(slug);
  if (!data) notFound();

  const relatedServices = data.relatedSlugs
    .map((rs) => services.find((s) => s.slug === rs))
    .filter(Boolean);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.description,
    provider: {
      "@type": "Organization",
      name: "JOSA.AI",
      url: "https://josa.ai",
    },
    areaServed: {
      "@type": "Place",
      name: "Central Florida",
    },
  };

  return (
    <>
      <JsonLd data={serviceSchema} />

      {/* ── Breadcrumb ── */}
      <div className="bg-brand-midnight-plum px-6 pt-6">
        <div className="mx-auto max-w-5xl">
          <div className="[&_a]:text-brand-cool-azure [&_span]:text-white/60 [&_span[aria-hidden]]:text-white/40">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: data.shortTitle },
              ]}
            />
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
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

        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28 lg:py-32">
          <p className="text-lg font-medium text-brand-cool-azure">
            {data.icon} {data.shortTitle}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {data.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            {data.description}
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-brand-royal-purple px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-mauve-purple"
          >
            Book a free discovery call
          </Link>
        </div>
      </section>

      {/* ── Problem (PAS — Problem) ── */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-0 bg-texture-dots opacity-20" />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <SectionHeading title="The problem." centered={false} />
          <p className="mt-6 text-lg leading-relaxed text-brand-deep-navy/80">
            {data.problem}
          </p>
        </div>
      </section>

      {/* ── Agitation (PAS — Agitation) ── */}
      <section className="relative bg-brand-frosted-blue/30 py-20 md:py-28">
        <div className="absolute inset-0 bg-texture-grid opacity-20" />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <SectionHeading title="What's it costing you?" centered={false} />
          <p className="mt-6 text-lg leading-relaxed text-brand-deep-navy/80">
            {data.agitation}
          </p>
        </div>
      </section>

      {/* ── Solution (PAS — Solution) ── */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="absolute inset-0 bg-texture-dots opacity-10" />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <SectionHeading title="How we solve it." centered={false} />
          <p className="mt-6 text-lg leading-relaxed text-brand-deep-navy/80">
            {data.solution}
          </p>

          <h3 className="mt-10 text-xl font-bold text-brand-deep-navy">
            What&rsquo;s included:
          </h3>
          <ul className="mt-4 space-y-3">
            {data.includes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-1 block size-2 shrink-0 rounded-full bg-brand-royal-purple"
                  aria-hidden="true"
                />
                <span className="text-base leading-relaxed text-brand-deep-navy/80">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative bg-brand-soft-lavender py-20 md:py-28">
        <div className="absolute inset-0 bg-texture-grid opacity-10" />
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading title="Frequently asked questions." centered={false} />
          <div className="mt-10">
            <FAQAccordion faqs={data.faqs} />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        title={data.cta.title}
        description={data.cta.description}
        ctaText={data.cta.ctaText}
        ctaLink="/contact"
        variant="primary"
      />

      {/* ── Related Services ── */}
      {relatedServices.length > 0 && (
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading title="Related services." centered />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((rs) =>
                rs ? (
                  <ServiceCard
                    key={rs.slug}
                    title={rs.shortTitle}
                    description={rs.description}
                    icon={rs.icon}
                    link={`/services/${rs.slug}`}
                    variant={rs.category === "primary" ? "primary" : "secondary"}
                  />
                ) : null
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
