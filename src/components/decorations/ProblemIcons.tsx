"use client";

import { motion } from "framer-motion";

interface ProblemIconProps {
  type: "phone" | "repeat" | "computer" | "thinking";
  className?: string;
}

export function ProblemIcon({ type, className = "" }: ProblemIconProps) {
  const icons = {
    phone: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <rect x="12" y="4" width="24" height="40" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M18 40H30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M20 10H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 20L20 16L24 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 20V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 30L36 34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="36" cy="36" r="6" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      </svg>
    ),
    repeat: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M12 24H24C30.6274 24 36 29.3726 36 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M36 12H24C17.3726 12 12 17.3726 12 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M16 8L12 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 40L36 36L32 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    computer: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <rect x="4" y="8" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2.5" />
        <path d="M4 36H44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 36V44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M16 44H32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 16H20L16 20L20 24H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 14H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 20H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    thinking: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <circle cx="24" cy="20" r="12" stroke="currentColor" strokeWidth="2.5" />
        <path d="M18 18C18 18 20 22 24 22C28 22 30 18 30 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="16" r="2" fill="currentColor" />
        <circle cx="28" cy="16" r="2" fill="currentColor" />
        <path d="M16 36C16 36 18 32 24 32C30 32 32 36 32 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M36 8C38 6 40 6 40 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="42" cy="4" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="40" cy="8" r="1.5" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  };

  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: [-5, 5, 0] }}
      transition={{ duration: 0.3 }}
    >
      {icons[type]}
    </motion.div>
  );
}
