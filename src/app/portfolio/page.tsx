import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "See our work — websites, AI implementations, and automation projects for businesses.",
};

const portfolioItems = [
  {
    title: "U.S. Citizenship Test",
    description:
      "A high-performance preparation platform leveraging AI to personalize study paths for immigrants.",
    category: "Web App",
    categoryColor: "#004bca",
    image: "/images/portfolio/citizenship.jpg",
    url: "https://citizenshipexam.app",
  },
  {
    title: "Synced Soccer",
    description:
      "Youth soccer academy platform with multilingual support, player management, and real-time standings.",
    category: "Website + App",
    categoryColor: "#994700",
    image: "/images/portfolio/syncedsoccer.jpg",
    url: "https://syncedsoccer.com",
  },
  {
    title: "Melanie Lowery Real Estate",
    description:
      "A sophisticated digital presence for a top-tier agent, featuring AI-driven property matching.",
    category: "Website",
    categoryColor: "#00642d",
    image: "/images/portfolio/melanie.jpg",
    url: "https://www.melanieloweryshowings.com/",
  },
  {
    title: "Blueprint AI Training Platform",
    description:
      "Platform for live AI workshops and hands-on courses helping business owners build practical AI skills.",
    category: "Web App",
    categoryColor: "#004bca",
    image: "/images/portfolio/blueprint.jpg",
    url: null,
  },
  {
    title: "Dos Bocas",
    description:
      "Bilingual restaurant website with full menu, online ordering, and immersive photo gallery.",
    category: "Website",
    categoryColor: "#00642d",
    image: "/images/portfolio/dosbocas.jpg",
    url: "https://dosbocas.vercel.app",
  },
  {
    title: "Final Exam Challenge",
    description:
      "Gamified quiz app with animated avatars, leaderboards, and live scoring — an edtech MVP.",
    category: "Web App",
    categoryColor: "#0061ff",
    image: "/images/portfolio/quiz.jpg",
    url: "https://quiz-avatar-leaderboard.vercel.app",
  },
  {
    title: "CRAFT Prompt Builder",
    description:
      "Interactive tool guiding users through the CRAFT framework to build structured, effective AI prompts.",
    category: "Web App",
    categoryColor: "#004bca",
    image: "/images/portfolio/craft.jpg",
    url: "https://craft-app-six.vercel.app",
  },
  {
    title: "Deva Simmons for Congress",
    description:
      "Full campaign website with multilingual support, event management, volunteer portal, and donation integration.",
    category: "Website + App",
    categoryColor: "#994700",
    image: "/images/portfolio/devasimmons.jpg",
    url: "https://devasimmons.com",
  },
  {
    title: "Prime Pulse Logistics",
    description:
      "Professional medical courier website with service listings, career portal, and quote request system.",
    category: "Website",
    categoryColor: "#00642d",
    image: "/images/portfolio/ppl813.jpg",
    url: "https://www.ppl813.com",
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 max-w-7xl mx-auto px-8 relative">
        <div className="absolute top-0 right-0 -z-10 opacity-20">
          <div className="w-[500px] h-[500px] rounded-full bg-[#0061ff] blur-[100px]" />
        </div>
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-12 h-[1px] bg-[#fb7800]" />
            <span className="text-[#994700] font-semibold tracking-widest text-xs uppercase">
              Portfolio
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface tracking-tight leading-[1.1] mb-8 font-heading">
            Proven Impact
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed font-light">
            Transforming industries through intelligent automation and curated
            digital experiences. We don&apos;t just build software; we architect
            competitive advantages.
          </p>
        </div>
      </section>

      {/* Project Masonry Gallery */}
      <section className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-0">
          {portfolioItems.map((item) => (
            <div key={item.title} className="masonry-item group flex flex-col">
              <div className="relative overflow-hidden rounded-3xl bg-surface-container-low transition-transform duration-500 group-hover:-translate-y-2">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute top-6 left-6">
                  <span
                    className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full font-semibold text-xs shadow-sm"
                    style={{
                      color: item.categoryColor,
                      borderColor: `${item.categoryColor}20`,
                      borderWidth: 1,
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="pt-8 px-2">
                <h3 className="text-2xl font-bold mb-3 font-heading">
                  {item.title}
                </h3>
                <p className="text-on-surface-variant mb-6 leading-relaxed max-w-md">
                  {item.description}
                </p>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#004bca] font-bold hover:gap-4 transition-all duration-300"
                  >
                    View Live &rarr;
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
