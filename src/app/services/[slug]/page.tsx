import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { services } from "@/lib/services-data";
import { FAQAccordion } from "@/components/FAQAccordion";
import { AlertTriangle, Check } from "lucide-react";
import { getServiceTheme } from "@/lib/service-themes";

/* ──────────────────────────────────────────────────────────────────────────
   Service detail data
   ────────────────────────────────────────────────────────────────────────── */

interface ServiceDetail {
  tagline: string;
  problem: string;
  agitation: string;
  solution: string;
  includes: { title: string; icon: string }[];
  faqs: { question: string; answer: string }[];
  heroMetric: { value: string; label: string };
  costStat: { value: string; label: string };
  relatedSlugs: string[];
}

const serviceDetails: Record<string, ServiceDetail> = {
  "website-design": {
    tagline: "Your website should work as hard as you do.",
    problem:
      "Most small business websites are built from templates that all look the same, haven't been updated in years, aren't designed to convert visitors into customers, and aren't showing up in search results. If your website isn't actively bringing in leads, it's costing you money.",
    agitation:
      "Every day your website underperforms, potential customers are finding your competitors instead. They're making decisions based on what they see online — and if your site looks outdated, loads slowly, or doesn't answer their questions, they're gone in seconds. That's revenue walking out the door.",
    solution:
      "We build custom websites from the ground up — no templates, no bloat. Every site comes with SEO, AEO (AI Engine Optimization), and ADA compliance built in as standard. Your site will be mobile-optimized, integrated with your CRM, and designed to convert visitors into customers.",
    includes: [
      { title: "Custom design and development — no templates", icon: "Paintbrush" },
      { title: "SEO and AEO built into every page", icon: "Search" },
      { title: "ADA compliance included at no extra cost", icon: "Accessibility" },
      { title: "Mobile-first responsive design", icon: "Smartphone" },
      { title: "CRM integration and lead capture forms", icon: "FormInput" },
      { title: "Analytics and performance tracking setup", icon: "BarChart3" },
    ],
    faqs: [
      { question: "Do you use templates?", answer: "No. Every website we build is custom-designed for your business, your brand, and your customers. Templates are cheap for a reason — they look generic and limit what you can do." },
      { question: "Can I make changes to the site after it launches?", answer: "Absolutely. We build sites that are easy to update, and we offer ongoing support if you want us to handle changes for you." },
      { question: "Is SEO included or does it cost extra?", answer: "SEO is built into every site we create — it's never an add-on or upcharge. We handle technical SEO, on-page optimization, and site structure." },
      { question: "Will my site work on mobile?", answer: "Every site we build is mobile-first. Over 60% of web traffic is mobile — your site needs to look and perform flawlessly on every screen size." },
    ],
    heroMetric: { value: "99/100", label: "Lighthouse Performance Score" },
    costStat: { value: "-$4.2M", label: "Lost Annual Revenue" },
    relatedSlugs: ["voice-ai", "brand-strategy", "ai-automation"],
  },
  "voice-ai": {
    tagline: "Never miss a customer call again.",
    problem:
      "When a customer calls and nobody answers, 85% of them won't leave a voicemail — they'll just call the next business. If you're a small team, you can't be on the phone 24/7. But your customers don't care about your schedule.",
    agitation:
      "Think about how many calls you've missed this month. After hours, during lunch, while you were with another customer. Each one was a potential sale. Most went straight to a competitor who picked up. Missed calls equal lost revenue.",
    solution:
      "Our Voice AI answers your phone 24/7 with a natural-sounding voice. It handles FAQs, qualifies leads, books appointments directly on your calendar, and can take orders. When a call needs a human touch, it transfers seamlessly to your team.",
    includes: [
      { title: "24/7 AI-powered call answering", icon: "Phone" },
      { title: "Custom voice and personality matching your brand", icon: "Mic" },
      { title: "FAQ handling and information delivery", icon: "MessageCircle" },
      { title: "Lead qualification and scoring", icon: "UserCheck" },
      { title: "Appointment booking with calendar integration", icon: "CalendarCheck" },
      { title: "Seamless transfer to live team members", icon: "ArrowRightLeft" },
    ],
    faqs: [
      { question: "Will it sound like a robot?", answer: "Not at all. Modern voice AI sounds remarkably natural. We customize the voice, tone, and personality to match your brand." },
      { question: "What happens if the AI can't handle a question?", answer: "It transfers the call directly to you or a team member. The AI escalates gracefully, and you get a full transcript." },
      { question: "Will customers be annoyed by talking to an AI?", answer: "Customers are annoyed by voicemail and hold music. Our AI gives them instant, helpful responses." },
      { question: "Does it integrate with my calendar and CRM?", answer: "Yes. We integrate with Google Calendar, Outlook, and most popular CRM systems." },
    ],
    heroMetric: { value: "24/7", label: "Availability" },
    costStat: { value: "85%", label: "Never Call Back" },
    relatedSlugs: ["ai-automation", "website-design", "business-tools"],
  },
  "ai-automation": {
    tagline: "Stop doing the same thing over and over.",
    problem:
      "You're spending hours every week on email responses, follow-ups, data entry, scheduling, and repetitive tasks that don't require your expertise — just your time. It keeps you busy but doesn't move your business forward.",
    agitation:
      "Every hour on busywork is an hour not spent on growth. 10 hours a week is 500 hours a year — over 12 full work weeks lost to tasks a smart system could handle in seconds. Your competitors are automating and moving faster.",
    solution:
      "We build custom automations tailored to your specific business processes. Not generic templates — actual workflows designed around how your business operates. We identify what's eating your time and build systems that handle it.",
    includes: [
      { title: "Custom workflow design and implementation", icon: "GitBranch" },
      { title: "Email automation and response sequences", icon: "Mail" },
      { title: "Marketing workflow automation", icon: "Megaphone" },
      { title: "Order processing and fulfillment triggers", icon: "ShoppingCart" },
      { title: "Data entry and CRM update automation", icon: "Database" },
      { title: "Industry-specific process automation", icon: "Settings2" },
    ],
    faqs: [
      { question: "What can be automated?", answer: "Almost anything repetitive — email responses, lead follow-ups, appointment reminders, invoice generation, data entry, social media posting, and more." },
      { question: "How long does it take to set up?", answer: "Most automation projects take 1–2 weeks. Simple automations can be live in days." },
      { question: "Will it break things?", answer: "No. We test extensively before anything goes live with safeguards, error handling, and monitoring." },
      { question: "Do I need special software?", answer: "We work with whatever tools you're already using — Gmail, Outlook, Shopify, QuickBooks, Google Sheets, CRMs." },
    ],
    heroMetric: { value: "10x", label: "Faster Workflows" },
    costStat: { value: "40hrs/mo", label: "Wasted on Manual Tasks" },
    relatedSlugs: ["voice-ai", "business-tools", "website-design"],
  },
  "ai-training": {
    tagline: "Your team can use AI. We'll show them how.",
    problem:
      "Your team knows AI is important but without proper training, they're either not using it at all or using it poorly — missing real opportunities to save time and improve their work.",
    agitation:
      "The gap between businesses that adopt AI effectively and those that don't is growing every day. Every week your team spends struggling with these tools is a week they're falling further behind competitors who are automating and moving faster.",
    solution:
      "We run hands-on workshops that teach your team how to actually use AI in their daily work. Practical skills they can use immediately — tools like ChatGPT, prompt engineering, and AI-powered workflows specific to your industry.",
    includes: [
      { title: "Hands-on workshops tailored to your team's roles", icon: "Users" },
      { title: "ChatGPT and prompt engineering training", icon: "Bot" },
      { title: "Industry-specific AI use cases and workflows", icon: "Lightbulb" },
      { title: "Practical exercises with real business scenarios", icon: "ClipboardList" },
      { title: "Reference materials and prompt libraries", icon: "BookOpen" },
      { title: "Follow-up support and Q&A sessions", icon: "HelpCircle" },
    ],
    faqs: [
      { question: "Does my team need a technical background?", answer: "Not at all. Our workshops are designed for everyday business users, not engineers." },
      { question: "Can training be done remotely?", answer: "Yes. We offer both in-person and remote sessions via Zoom." },
      { question: "How long are the workshops?", answer: "Half-day (3–4 hours) to full-day (6–7 hours), plus multi-session programs available." },
      { question: "Can you customize for our industry?", answer: "Every workshop is tailored to your team's roles and industry with real scenarios." },
    ],
    heroMetric: { value: "500+", label: "Professionals Trained" },
    costStat: { value: "73%", label: "Can't Use AI Tools Effectively" },
    relatedSlugs: ["ai-automation", "voice-ai", "business-tools"],
  },
  "ecommerce-consulting": {
    tagline: "Ready to sell online? We've been doing this for 20+ years.",
    problem:
      "Getting started with e-commerce is overwhelming. Which platform? How do you list products? What about fulfillment, pricing strategy, and marketplace fees?",
    agitation:
      "The e-commerce landscape is more competitive than ever. Amazon, Shopify, TikTok Shop — each has its own rules. Getting it wrong means wasted ad spend and products that sit unsold.",
    solution:
      "With 20+ years of e-commerce experience, we help product brands get set up, optimized, and scaling on the right platforms — from Shopify to TikTok Shop and Amazon.",
    includes: [
      { title: "Platform selection and strategy consulting", icon: "ShoppingBag" },
      { title: "Marketplace onboarding (Shopify, Amazon, Walmart, TikTok Shop)", icon: "Store" },
      { title: "Product listing optimization and SEO", icon: "Tag" },
      { title: "Pricing and competitive analysis", icon: "TrendingUp" },
      { title: "Advertising strategy and campaign setup", icon: "Target" },
      { title: "Ongoing performance monitoring", icon: "LineChart" },
    ],
    faqs: [
      { question: "Which platform should I sell on?", answer: "It depends on your products and audience. We'll analyze your situation and recommend the right mix." },
      { question: "I'm already selling online. Can you help?", answer: "We audit your existing setup and identify specific areas for improvement." },
      { question: "How long does setup take?", answer: "Typical marketplace onboarding takes 2–4 weeks depending on complexity." },
      { question: "Do you handle advertising?", answer: "Yes. We set up and manage campaigns focused on ROI, not just impressions." },
    ],
    heroMetric: { value: "20+", label: "Years Experience" },
    costStat: { value: "-35%", label: "Conversion Rate" },
    relatedSlugs: ["website-design", "brand-strategy", "digital-products"],
  },
  "brand-strategy": {
    tagline: "People should know who you are and what makes you different.",
    problem:
      "You know your business is good — but explaining what makes you different is where the message gets lost. Your website says one thing, social media another, and your elevator pitch changes every time.",
    agitation:
      "Unclear branding means you're invisible. Customers choose businesses they understand and trust. If your messaging is inconsistent, you're giving them no reason to pick you over the next option.",
    solution:
      "We develop your brand voice, messaging framework, and campaign strategy so everything you put out sounds like you — and connects with your audience.",
    includes: [
      { title: "Brand voice and tone development", icon: "MessageSquare" },
      { title: "Messaging framework and key differentiators", icon: "Layers" },
      { title: "Target audience definition and personas", icon: "UserCircle" },
      { title: "Campaign strategy and content direction", icon: "Map" },
      { title: "Competitive positioning analysis", icon: "Crosshair" },
      { title: "Brand guidelines document", icon: "FileText" },
    ],
    faqs: [
      { question: "Can I get brand strategy standalone?", answer: "Yes. It works great as a focused engagement, especially for rebranding or new product launches." },
      { question: "How long does it take?", answer: "A focused brand strategy engagement typically takes 2–3 weeks." },
      { question: "What do I get at the end?", answer: "A complete brand strategy document — voice, messaging framework, personas, positioning, and campaign direction." },
      { question: "Is this usually part of a website project?", answer: "Often yes, but it's not required — you can do either independently." },
    ],
    heroMetric: { value: "3x", label: "Brand Recall" },
    costStat: { value: "67%", label: "of Brands Sound Generic" },
    relatedSlugs: ["website-design", "digital-products", "ecommerce-consulting"],
  },
  "digital-products": {
    tagline: "Turn your expertise into an asset that works 24/7.",
    problem:
      "You have expertise people want — but the only way to share it is one-on-one. No digital assets are capturing leads or establishing your authority while you sleep.",
    agitation:
      "Every day without a lead magnet is a day leaving potential customers on the table. Competitors are offering free guides and templates that capture emails and start relationships automatically.",
    solution:
      "We create polished digital products that capture leads and showcase your expertise — PDF guides, templates, email courses, and resources designed to provide value while building your email list.",
    includes: [
      { title: "Strategy and topic selection for maximum impact", icon: "Compass" },
      { title: "Content development and copywriting", icon: "PenLine" },
      { title: "Professional design and formatting", icon: "LayoutTemplate" },
      { title: "Landing page creation for lead capture", icon: "Monitor" },
      { title: "Email automation for delivery and follow-up", icon: "Send" },
      { title: "Analytics and conversion tracking", icon: "PieChart" },
    ],
    faqs: [
      { question: "What kind of digital products can you create?", answer: "Guides, templates, checklists, email courses, worksheets, and resource libraries." },
      { question: "Do I have to write all the content?", answer: "No. We help with content development, structuring, and copywriting." },
      { question: "Can digital products generate revenue?", answer: "Yes. We create both free lead magnets and paid products like courses and premium templates." },
      { question: "How do people get the product?", answer: "We set up the complete delivery system — landing page, email opt-in, automated delivery, and nurture sequences." },
    ],
    heroMetric: { value: "24/7", label: "Lead Capture" },
    costStat: { value: "90%", label: "of Leads Go Uncaptured" },
    relatedSlugs: ["brand-strategy", "website-design", "ai-automation"],
  },
  "custom-apps": {
    tagline: "When off-the-shelf tools don't cut it.",
    problem:
      "You've tried standard software and none of it quite fits. You're duct-taping three apps together to do what one custom tool could handle.",
    agitation:
      "Every workaround costs time and introduces errors. Data lives in multiple places, nothing integrates cleanly, and you've accepted friction as normal.",
    solution:
      "We build small, focused web applications designed around your specific workflow — clean, modern, and built to do exactly what you need.",
    includes: [
      { title: "Discovery and requirements analysis", icon: "ScanSearch" },
      { title: "UI/UX design tailored to your workflow", icon: "Layers" },
      { title: "Clean, modern web application development", icon: "Code2" },
      { title: "User authentication and role management", icon: "Lock" },
      { title: "Integration with existing tools and databases", icon: "Plug" },
      { title: "Testing, deployment, and documentation", icon: "CheckCircle2" },
    ],
    faqs: [
      { question: "How complex of an app can you build?", answer: "We specialize in simple to moderate complexity — internal tools, dashboards, customer portals, booking systems." },
      { question: "What's the typical timeline?", answer: "Most projects take 4–8 weeks from kickoff to launch." },
      { question: "Do you offer ongoing maintenance?", answer: "Yes. We offer optional support and maintenance plans." },
      { question: "What technologies do you use?", answer: "React, Next.js, TypeScript, and cloud infrastructure — fast, secure, and scalable." },
    ],
    heroMetric: { value: "Built", label: "to Spec" },
    costStat: { value: "80%", label: "of SaaS Features Go Unused" },
    relatedSlugs: ["ai-automation", "business-tools", "website-design"],
  },
  "business-tools": {
    tagline: "One platform. One login. Less friction.",
    problem:
      "You're juggling five different apps to run your business — nothing integrates cleanly and you're spending more time managing tools than using them.",
    agitation:
      "Tool sprawl is a silent productivity killer. Customer data in three places, five separate subscriptions, and hours lost weekly to switching between platforms.",
    solution:
      "We set up an integrated business platform that consolidates your CRM, community hosting, reputation management, and communication tools into one system.",
    includes: [
      { title: "CRM setup and configuration", icon: "Users" },
      { title: "Community and course hosting platform", icon: "GraduationCap" },
      { title: "Reputation management and review automation", icon: "Star" },
      { title: "Email and SMS marketing integration", icon: "MailCheck" },
      { title: "Pipeline and workflow automation", icon: "GitBranch" },
      { title: "Data migration from existing tools", icon: "ArrowRightLeft" },
    ],
    faqs: [
      { question: "Which platforms do you work with?", answer: "Primarily the GoHighLevel ecosystem — CRM, email, SMS, reputation management, courses, and community in one platform." },
      { question: "Can you migrate my data?", answer: "Yes. We handle full migration — contacts, email lists, customer data, pipeline stages, and history." },
      { question: "Is training included?", answer: "Every setup includes hands-on training for you and your team." },
      { question: "How long does setup take?", answer: "Typical setup and migration takes 2–4 weeks." },
    ],
    heroMetric: { value: "1", label: "Login. One System." },
    costStat: { value: "5+", label: "Disconnected Tools Average" },
    relatedSlugs: ["ai-automation", "voice-ai", "website-design"],
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────────────────────── */

function getServiceData(slug: string) {
  const service = services.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];
  if (!service || !detail) return null;
  return { ...service, ...detail };
}

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
    title: data.title,
    description: data.description,
  };
}

/* ──────────────────────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────────────────────── */

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getServiceData(slug);
  if (!data) notFound();
  const theme = getServiceTheme(data.slug);
  const relatedServices = data.relatedSlugs
    .map((rs) => services.find((s) => s.slug === rs))
    .filter(Boolean);

  return (
    <>
      <section className="px-4 pb-12 pt-24 md:px-8 md:pb-16 md:pt-28">
        <div
          className="site-grid relative overflow-hidden rounded-[2rem] border border-white/10 px-6 py-10 shadow-[0_30px_100px_rgba(8,13,30,0.2)] md:rounded-[2.8rem] md:px-10 md:py-12"
          style={{ background: theme.heroBackground }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{ background: theme.spotlight }}
          />

          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="relative z-10 text-white">
              <div className="hero-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-white/72">
                <span
                  className="h-2 w-2 rounded-full shadow-[0_0_18px_rgba(255,255,255,0.4)]"
                  style={{ backgroundColor: theme.accent }}
                />
                {data.category === "primary" ? "Core Service" : "Additional Service"}
              </div>

              <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-[-0.05em] sm:text-6xl md:text-7xl">
                {data.shortTitle.split(" ")[0]}{" "}
                <span className="bg-gradient-to-r from-white via-sky-100 to-amber-100 bg-clip-text text-transparent">
                  {data.shortTitle.split(" ").slice(1).join(" ") || data.shortTitle}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/78">
                {data.tagline}
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/68">
                {data.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-3 md:gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center rounded-full bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-[0_16px_36px_rgba(255,255,255,0.16)] transition-transform hover:-translate-y-0.5 md:px-8 md:py-4 md:text-base"
                >
                  Explore All Services
                </Link>
                <Link
                  href="/portfolio"
                  className="hero-chip inline-flex items-center rounded-full px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/18 md:px-8 md:py-4 md:text-base"
                >
                  View Portfolio
                </Link>
              </div>
            </div>

            <div className="relative z-10">
              <div
                className="glass-panel relative overflow-hidden rounded-[2rem] p-4 md:p-5"
                style={{
                  background: theme.panelBackground,
                  borderColor: theme.outline,
                }}
              >
                <div className="absolute left-5 top-5 z-20 hero-chip inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm text-white/82">
                  <span className="text-xl">{data.icon}</span>
                  <span>{data.shortTitle}</span>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.7rem]">
                  <Image
                    src={`/images/services/${data.slug}.jpg`}
                    alt={data.shortTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/38 via-slate-950/8 to-transparent" />
                </div>

                <div className="absolute bottom-5 left-5 z-20 max-w-[15rem] rounded-[1.5rem] bg-white/90 px-5 py-4 text-slate-950 shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
                  <p className="text-2xl font-heading font-bold">{data.heroMetric.value}</p>
                  <p className="mt-1 text-sm text-slate-600">{data.heroMetric.label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative">
            <span className="section-number absolute -top-12 left-0">01</span>
            <div className="relative z-10 pt-12">
              <h2 className="font-heading text-4xl font-bold tracking-[-0.03em] text-on-surface md:text-5xl">
                The Problem
              </h2>
              <div className="mt-6 space-y-6 text-base leading-relaxed text-on-surface-variant md:text-lg">
                <p>{data.problem}</p>
                <div
                  className="showcase-card rounded-[1.8rem] p-6"
                  style={{ background: theme.surfaceAltBackground }}
                >
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="mt-1 h-6 w-6 flex-shrink-0 text-[#ba1a1a]" />
                    <div>
                      <h3 className="font-bold text-on-surface">Don&apos;t Ignore This</h3>
                      <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                        {data.agitation.split(". ")[0]}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="showcase-card rounded-[2.2rem] p-4"
            style={{ background: theme.surfaceBackground }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.7rem]">
              <Image
                src={`/images/problems/${data.slug}.jpg`}
                alt={`${data.shortTitle} problem visualization`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-4 md:px-8 md:py-6">
        <div className="section-ink relative overflow-hidden rounded-[2.2rem] px-6 py-10 md:px-10 md:py-12">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
            <div className="relative">
              <div
                className="ambient-orb absolute inset-6 rounded-full"
                style={{ backgroundColor: theme.accentSoft }}
              />
              <div className="relative mx-auto max-w-xs rounded-[2rem] border border-white/10 bg-white/8 p-8 text-center backdrop-blur-xl">
                <div
                  className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white text-3xl font-heading font-black"
                  style={{ color: theme.accent }}
                >
                  {data.costStat.value}
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
                  {data.costStat.label}
                </p>
              </div>
            </div>

            <div className="relative text-white">
              <span className="section-number section-number-dark absolute -top-12 left-0">
                02
              </span>
              <div className="relative z-10 pt-12">
                <h2 className="font-heading text-4xl font-bold tracking-[-0.03em] md:text-5xl">
                  The Cost
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 md:text-lg">
                  {data.agitation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-cool relative overflow-hidden px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative mb-12 max-w-2xl">
            <span className="section-number absolute -top-16 left-0">03</span>
            <div className="relative z-10 pt-10">
              <h2 className="font-heading text-4xl font-bold tracking-[-0.03em] text-on-surface md:text-5xl">
                How We Solve It
              </h2>
              <p className="mt-4 text-base leading-relaxed text-on-surface-variant md:text-lg">
                {data.solution}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12">
            {data.includes.map((item, i) => {
              const spanClasses = [
                "xl:col-span-7",
                "xl:col-span-5",
                "xl:col-span-4",
                "xl:col-span-4",
                "xl:col-span-4",
                "xl:col-span-8",
              ];
              const darkCard = i === 1;
              const cardClass = darkCard ? "showcase-card-dark text-white" : "showcase-card";

              return (
                <div
                  key={item.title}
                  className={`${cardClass} ${spanClasses[i] ?? "xl:col-span-4"} rounded-[2rem] p-7 md:p-8`}
                  style={
                    darkCard
                      ? {
                          background: theme.panelBackground,
                          borderColor: theme.outline,
                        }
                      : {
                          background:
                            i === data.includes.length - 1
                              ? theme.surfaceAltBackground
                              : theme.surfaceBackground,
                        }
                  }
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-[1.2rem] ${
                        darkCard ? "bg-white/16" : ""
                      }`}
                      style={
                        darkCard ? undefined : { backgroundColor: theme.accentSoft }
                      }
                    >
                      <Check
                        className="h-5 w-5"
                        style={{ color: darkCard ? "#ffffff" : theme.accent }}
                      />
                    </div>
                    <span
                      className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                        darkCard ? "text-white/50" : "text-on-surface-variant/65"
                      }`}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  <h3
                    className={`mt-8 text-xl font-bold tracking-[-0.03em] md:text-2xl ${
                      darkCard ? "text-white" : "text-on-surface"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center font-heading text-4xl font-bold tracking-[-0.03em] text-on-surface md:text-5xl">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={data.faqs} variant="branded" />
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="px-4 pb-20 pt-4 md:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-10 text-center font-heading text-3xl font-bold tracking-[-0.03em] text-on-surface md:text-4xl">
              Related Services
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedServices.map((rs) => {
                if (!rs) return null;
                const relatedTheme = getServiceTheme(rs.slug);

                return (
                  <Link
                    key={rs.slug}
                    href={`/services/${rs.slug}`}
                    className="showcase-card block rounded-[2rem] p-7"
                    style={{ background: relatedTheme.surfaceBackground }}
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] text-xl"
                      style={{ backgroundColor: relatedTheme.accentSoft }}
                    >
                      {rs.icon}
                    </div>
                    <h3 className="mt-7 text-2xl font-bold tracking-[-0.03em] text-on-surface">
                      {rs.shortTitle}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                      {rs.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
