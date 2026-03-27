"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProductHighlightCard } from "@/components/ui/product-card";
import {
  WebsiteIcon,
  VoiceAIIcon,
  AutomationIcon,
  TrainingIcon,
  EcommerceIcon,
  BrandIcon,
  DigitalIcon,
  AppIcon,
  ToolsIcon,
} from "@/components/decorations";
import { ComponentType } from "react";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  "🌐": WebsiteIcon,
  "🤖": VoiceAIIcon,
  "⚡": AutomationIcon,
  "🎓": TrainingIcon,
  "🛒": EcommerceIcon,
  "🎯": BrandIcon,
  "📦": DigitalIcon,
  "💻": AppIcon,
  "🔧": ToolsIcon,
};

const categoryLabel: Record<string, string> = {
  "🌐": "Design",
  "🤖": "AI Voice",
  "⚡": "Automation",
  "🎓": "Training",
  "🛒": "E-Commerce",
  "🎯": "Strategy",
  "📦": "Digital",
  "💻": "Development",
  "🔧": "Tools",
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  variant?: "primary" | "secondary";
}

export function ServiceCard({ title, description, icon, link, variant = "primary" }: ServiceCardProps) {
  const IconComponent = iconMap[icon];
  const category = categoryLabel[icon] ?? "Service";

  const iconNode = IconComponent ? <IconComponent className="h-full w-full" /> : <span className="text-3xl">{icon}</span>;

  return (
    <Link href={link} className="group block">
      <ProductHighlightCard
        categoryIcon={iconNode}
        category={category}
        title={title}
        description={description}
        floatingIcon={iconNode}
        variant={variant}
      />
    </Link>
  );
}
