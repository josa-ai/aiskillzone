"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ParticleField, GlowingOrb } from "@/components/decorations";

interface CTABannerProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  variant?: "primary" | "secondary";
}

export function CTABanner({
  title,
  description,
  ctaText,
  ctaLink,
  variant = "primary",
}: CTABannerProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "relative overflow-hidden py-16 px-6 md:px-12 lg:px-24",
        variant === "primary"
          ? "bg-gradient-to-br from-[#191c1e] via-[#004bca]/90 to-[#191c1e] text-white"
          : "bg-[#f2f4f6] text-[#191c1e]"
      )}
    >
      {/* Primary variant decorations */}
      {variant === "primary" && (
        <>
          {/* Glowing orbs */}
          <GlowingOrb className="-left-20 -top-20" color="#004bca" size={400} />
          <GlowingOrb className="-right-20 -bottom-20" color="#0061ff" size={350} />

          {/* Floating particles */}
          <ParticleField count={15} color="#0061ff" className="opacity-60" />

          {/* Geometric accents */}
          <div className="pointer-events-none absolute inset-0">
            {/* Animated circles */}
            <motion.div
              className="absolute left-1/4 top-1/4 h-2 w-2 rounded-full bg-white/20"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute right-1/4 top-1/3 h-3 w-3 rounded-full bg-[#0061ff]/30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
            <motion.div
              className="absolute bottom-1/3 left-1/3 h-4 w-4 rounded-full bg-[#004bca]/20"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
            />

            {/* Decorative lines */}
            <motion.div
              className="absolute left-0 top-1/2 h-px w-32 bg-gradient-to-r from-transparent via-[#0061ff]/50 to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3], x: [-20, 20, -20] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              className="absolute right-0 top-1/3 h-px w-24 bg-gradient-to-l from-transparent via-[#004bca]/50 to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3], x: [20, -20, 20] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />
          </div>

          {/* Grain texture */}
          <div className="grain-overlay pointer-events-none absolute inset-0" />

          {/* Animated ring decoration */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0061ff]/20"
            style={{ width: "120%", height: "200%" }}
            animate={{
              scale: [1, 1.02, 1],
              rotate: [0, 1, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Secondary variant decorations */}
      {variant === "secondary" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-[#f2f4f6]/50 via-white/50 to-[#f2f4f6]/50" />
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#004bca]/20 to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h2
          className="text-3xl font-bold md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className={cn(
            "mt-4 text-lg md:text-xl",
            variant === "primary" ? "text-white/80" : "text-[#191c1e]/80"
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href={ctaLink}
            className="group relative mt-8 inline-flex items-center justify-center overflow-hidden rounded-lg bg-primary px-8 py-4 text-base font-semibold text-white shadow-xl transition-all hover:shadow-2xl hover:shadow-[#0061ff]/30 hover:-translate-y-1"
          >
            {/* Button shimmer effect */}
            <motion.div
              className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <span className="relative z-10">{ctaText}</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10 ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
