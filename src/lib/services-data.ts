export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  category: "primary" | "secondary";
}

export const services: Service[] = [
  {
    slug: "website-design",
    title: "Website Design & Redesign",
    shortTitle: "Website Design",
    description:
      "Custom-built websites that convert. No templates, no bloat. Includes SEO, AEO, and ADA compliance built in—never an upcharge.",
    icon: "🌐",
    category: "primary",
  },
  {
    slug: "voice-ai",
    title: "Voice AI & Chatbot Setup",
    shortTitle: "Voice AI",
    description:
      "Stop missing calls. Our AI answers 24/7, handles FAQs, qualifies leads, and books appointments. Like having a front desk person who never takes a break.",
    icon: "🤖",
    category: "primary",
  },
  {
    slug: "ai-automation",
    title: "AI Automation & Workflows",
    shortTitle: "AI Automation",
    description:
      "Tell us what's eating up your day. We build custom automations that handle email, marketing workflows, orders, and processes unique to your business.",
    icon: "⚡",
    category: "primary",
  },
  {
    slug: "ai-training",
    title: "AI Training & Workshops",
    shortTitle: "AI Training",
    description:
      "Hands-on training for your team. Learn how to actually use AI tools like ChatGPT to do your job better. Taught by someone who builds AI solutions daily.",
    icon: "🎓",
    category: "primary",
  },
  {
    slug: "ecommerce-consulting",
    title: "E-Commerce Consulting & Retail Readiness",
    shortTitle: "E-Commerce Consulting",
    description:
      "20+ years of e-commerce experience. We handle marketplace onboarding (Shopify, TikTok Shop, Amazon, Walmart.com), strategy, and optimization for product brands.",
    icon: "🛒",
    category: "secondary",
  },
  {
    slug: "brand-strategy",
    title: "Brand Strategy & Marketing",
    shortTitle: "Brand Strategy",
    description:
      "We develop your brand voice, campaign strategy, and messaging. Usually bundled into other projects, but available as a focused engagement too.",
    icon: "🎯",
    category: "secondary",
  },
  {
    slug: "digital-products",
    title: "Digital Product Creation & Lead Magnets",
    shortTitle: "Digital Products",
    description:
      "Polished digital products that work. PDF guides, templates, downloadable resources, email courses. Capture leads 24/7 while you sleep.",
    icon: "📦",
    category: "secondary",
  },
  {
    slug: "custom-apps",
    title: "Custom App Development",
    shortTitle: "Custom Apps",
    description:
      "Small, focused web applications built clean and modern. When standard software isn't enough, we build the right solution.",
    icon: "💻",
    category: "secondary",
  },
  {
    slug: "business-tools",
    title: "Business Tools (CRM, Communities, Reputation)",
    shortTitle: "Business Tools",
    description:
      "Everything integrated on one platform. CRM for managing relationships, community/course hosting, reputation management. One login. One system. Less friction.",
    icon: "🔧",
    category: "secondary",
  },
];

export const primaryServices = services.filter((s) => s.category === "primary");
export const secondaryServices = services.filter(
  (s) => s.category === "secondary"
);
