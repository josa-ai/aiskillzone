"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  gradient?: boolean;
  underline?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
  gradient = false,
  underline = false,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center")}>
      <motion.h2
        className={cn(
          "text-3xl font-bold md:text-4xl",
          gradient
            ? "bg-gradient-to-r from-[#004bca] via-[#0061ff] to-[#004bca] bg-clip-text text-transparent text-gradient-animated"
            : light
              ? "text-white"
              : "text-[#191c1e]"
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>
      {underline && (
        <motion.div
          className={cn(
            "mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#004bca] to-[#0061ff]",
            centered && "mx-auto"
          )}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />
      )}
      {subtitle && (
        <motion.p
          className={cn(
            "mt-4 text-lg",
            light ? "text-white/80" : "text-[#191c1e]/80"
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
