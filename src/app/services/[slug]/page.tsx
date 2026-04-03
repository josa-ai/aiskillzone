import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { services } from "@/lib/services-data";
import { FAQAccordion } from "@/components/FAQAccordion";
import { AlertTriangle, Check } from "lucide-react";

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

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex items-center overflow-hidden bg-surface pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-16">
          <div className="z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low mb-6">
              <span className="w-2 h-2 rounded-full bg-[#004bca] animate-pulse" />
              <span className="text-xs font-bold tracking-wider text-on-surface-variant uppercase">
                {data.category === "primary" ? "Core Service" : "Additional Service"}
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-7xl font-extrabold text-on-surface tracking-tighter leading-tight mb-6">
              {data.shortTitle.split(" ")[0]}{" "}
              <span className="text-[#004bca]">
                {data.shortTitle.split(" ").slice(1).join(" ") || data.shortTitle}
              </span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg mb-6 leading-relaxed">
              {data.tagline}
            </p>
            <p className="text-base text-on-surface-variant max-w-lg mb-10 leading-relaxed">
              {data.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/services"
                className="bg-[#004bca] text-white px-8 py-4 rounded-full font-bold text-base shadow-xl shadow-[#004bca]/20 hover:translate-y-[-2px] transition-all inline-block"
              >
                Explore All Services
              </Link>
              <Link
                href="/portfolio"
                className="bg-surface-container-highest text-on-surface px-8 py-4 rounded-full font-bold text-base hover:bg-surface-container-high transition-colors inline-block"
              >
                View Portfolio
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="aspect-[3/2] rounded-3xl overflow-hidden bg-surface-container relative group">
              <Image
                src={`/images/services/${data.slug}.jpg`}
                alt={data.shortTitle}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/30 to-transparent" />
            </div>
            {/* Floating Insight Chip */}
            <div className="absolute -bottom-6 -left-6 bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-[0_20px_40px_rgba(25,28,30,0.06)] border border-white/20 max-w-[240px]">
              <div className="text-2xl font-heading font-bold text-on-surface">
                {data.heroMetric.value}
              </div>
              <div className="text-sm text-on-surface-variant">
                {data.heroMetric.label}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 01 The Problem ── */}
      <section className="bg-surface-container-low py-16 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="text-[8rem] font-heading font-extrabold text-[#004bca]/5 absolute -top-20 -left-8 select-none leading-none">
                01
              </div>
              <h2 className="font-heading text-4xl font-bold text-on-surface mb-6 relative z-10">
                The Problem
              </h2>
            </div>
            <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed">
              <p>{data.problem}</p>
              <div className="flex gap-4 items-start p-6 bg-surface-container-lowest rounded-2xl">
                <AlertTriangle className="w-6 h-6 text-[#ba1a1a] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-on-surface mb-1">
                    Don&apos;t Ignore This
                  </h4>
                  <p className="text-sm">
                    {data.agitation.split(". ")[0]}.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="aspect-video rounded-3xl shadow-sm overflow-hidden relative">
              <Image
                src={`/images/problems/${data.slug}.jpg`}
                alt={`${data.shortTitle} problem visualization`}
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 The Cost ── */}
      <section className="bg-surface py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative max-w-xs mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-[#994700]/5 rounded-full blur-2xl" />
            <div className="relative z-10 flex items-center justify-center">
              <div className="p-10 bg-white rounded-full shadow-2xl text-center border-4 border-surface-container-low">
                <div className="text-4xl md:text-5xl font-heading font-extrabold text-[#994700] mb-1">
                  {data.costStat.value}
                </div>
                <p className="text-on-surface-variant font-bold uppercase tracking-widest text-xs">
                  {data.costStat.label}
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-0 w-20 h-20 bg-[#fb7800]/20 rounded-2xl rotate-12 -z-1" />
          </div>
          <div>
            <div className="relative">
              <div className="text-[8rem] font-heading font-extrabold text-[#994700]/5 absolute -top-20 -left-8 select-none leading-none">
                02
              </div>
              <h2 className="font-heading text-4xl font-bold text-on-surface mb-6 relative z-10">
                The Cost
              </h2>
            </div>
            <div className="text-lg text-on-surface-variant leading-relaxed">
              <p>{data.agitation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 How We Solve It ── */}
      <section className="bg-surface-container-low py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <div className="relative inline-block">
              <div className="text-[8rem] font-heading font-extrabold text-[#00642d]/5 absolute -top-16 left-1/2 -translate-x-1/2 select-none leading-none">
                03
              </div>
              <h2 className="font-heading text-4xl font-bold text-on-surface relative z-10">
                How We Solve It
              </h2>
            </div>
            <p className="text-on-surface-variant mt-4">{data.solution}</p>
          </div>
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.includes.map((item, i) => {
              const isLarge = i === 0 || i === data.includes.length - 1;
              const isGreen = i === 1;
              return (
                <div
                  key={item.title}
                  className={`${isLarge ? "md:col-span-2" : ""} ${
                    isGreen
                      ? "bg-[#00642d] text-white"
                      : "bg-surface-container-lowest border border-outline-variant/10"
                  } p-8 rounded-3xl shadow-sm flex flex-col justify-between group hover:translate-y-[-4px] transition-all`}
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                        isGreen ? "bg-white/20" : "bg-[#00642d]/10"
                      }`}
                    >
                      <Check
                        className={`w-6 h-6 ${isGreen ? "text-white" : "text-[#00642d]"}`}
                      />
                    </div>
                    <h3
                      className={`text-xl font-heading font-bold mb-4 ${
                        isGreen ? "text-white" : ""
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-heading text-4xl font-bold text-on-surface mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={data.faqs} variant="default" />
        </div>
      </section>

      {/* ── Related Services ── */}
      {data.relatedSlugs.length > 0 && (
        <section className="py-20 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="font-heading text-3xl font-bold text-on-surface mb-8 text-center">
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.relatedSlugs
                .map((rs) => services.find((s) => s.slug === rs))
                .filter(Boolean)
                .map((rs) =>
                  rs ? (
                    <Link
                      key={rs.slug}
                      href={`/services/${rs.slug}`}
                      className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 hover:shadow-xl hover:-translate-y-1 transition-all block"
                    >
                      <span className="text-2xl mb-4 block">{rs.icon}</span>
                      <h3 className="text-xl font-bold font-heading mb-3">
                        {rs.shortTitle}
                      </h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        {rs.description}
                      </p>
                    </Link>
                  ) : null
                )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
