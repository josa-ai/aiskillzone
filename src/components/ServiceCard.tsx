"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
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

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  variant?: "primary" | "secondary";
}

export function ServiceCard({
  title,
  description,
  icon,
  link,
  variant = "primary",
}: ServiceCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <Link href={link} className="group block">
      <motion.div
        whileHover={{ scale: 1.05, y: -8 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative"
      >
        <Card
          className={cn(
            "relative flex h-full min-h-[340px] flex-col overflow-hidden p-6 transition-all duration-300 ease-out",
            variant === "primary"
              ? "bg-gradient-to-br from-brand-royal-purple via-brand-mauve-purple to-brand-royal-purple text-white shadow-xl shadow-brand-royal-purple/20 hover:shadow-2xl hover:shadow-brand-mauve-purple/30"
              : "bg-gradient-to-br from-brand-soft-lavender via-white to-brand-soft-lavender text-brand-deep-navy shadow-lg shadow-brand-royal-purple/10 hover:shadow-xl hover:shadow-brand-mauve-purple/20"
          )}
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background: "linear-gradient(135deg, #8D4BBB, #3B82F6, #A882EE, #8D4BBB)",
                backgroundSize: "300% 300%",
                animation: "gradientShift 3s ease infinite",
                padding: "2px",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
          </div>

          {/* Glassmorphism overlay */}
          <div
            className={cn(
              "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
              variant === "primary" ? "bg-white/10" : "bg-brand-royal-purple/5"
            )}
          />

          {/* Floating decorative shapes */}
          <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-20 md:h-32 md:w-32">
            <div
              className={cn(
                "h-full w-full rounded-full blur-xl",
                variant === "primary" ? "bg-brand-tech-blue" : "bg-brand-mauve-purple"
              )}
            />
          </div>

          {/* Icon container with glow */}
          <div className="relative mb-4 inline-block">
            <motion.div
              className={cn(
                "relative flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                variant === "primary"
                  ? "bg-white/20 shadow-brand-tech-blue/30 group-hover:shadow-brand-tech-blue/50"
                  : "bg-brand-royal-purple/10 shadow-brand-mauve-purple/20 group-hover:shadow-brand-mauve-purple/40"
              )}
              whileHover={{ scale: 1.1 }}
            >
              {/* Icon glow effect */}
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  variant === "primary" ? "bg-brand-tech-blue/30" : "bg-brand-mauve-purple/30"
                )}
                style={{ filter: "blur(8px)" }}
              />
              <div className="relative h-10 w-10">
                {IconComponent ? (
                  <IconComponent
                    className={cn(
                      "h-full w-full",
                      variant === "primary" ? "text-white" : "text-brand-royal-purple"
                    )}
                  />
                ) : (
                  <span className="text-3xl">{icon}</span>
                )}
              </div>
            </motion.div>
          </div>

          <CardContent className="relative flex flex-1 flex-col gap-3 p-0">
            <h3 className="text-xl font-bold">{title}</h3>
            <p
              className={cn(
                "flex-1 text-base leading-relaxed",
                variant === "primary" ? "text-white/90" : "text-brand-deep-navy/80"
              )}
            >
              {description}
            </p>

            {/* Animated arrow */}
            <div className="mt-2 flex items-center gap-2 overflow-hidden">
              <motion.span
                className={cn(
                  "text-base font-semibold transition-all duration-300 group-hover:translate-x-2",
                  variant === "primary" ? "text-white/80" : "text-brand-royal-purple"
                )}
              >
                Learn more
              </motion.span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  "h-4 w-4 transition-all duration-300 group-hover:translate-x-4",
                  variant === "primary" ? "text-white/80" : "text-brand-royal-purple"
                )}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: 4 }}
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </motion.svg>
            </div>
          </CardContent>

          {/* Bottom accent line */}
          <motion.div
            className={cn(
              "absolute bottom-0 left-0 h-1 rounded-b-xl",
              variant === "primary"
                ? "bg-gradient-to-r from-brand-tech-blue to-brand-mauve-purple"
                : "bg-gradient-to-r from-brand-royal-purple to-brand-tech-blue"
            )}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
          />
        </Card>
      </motion.div>
    </Link>
  );
}
