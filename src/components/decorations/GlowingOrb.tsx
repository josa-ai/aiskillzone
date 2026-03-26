"use client";

import { motion } from "framer-motion";

interface GlowingOrbProps {
  className?: string;
  color?: string;
  size?: number;
}

export function GlowingOrb({
  className = "",
  color = "#8D4BBB",
  size = 200,
}: GlowingOrbProps) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <motion.div
        className="rounded-full blur-3xl"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}40 0%, transparent 50%)`,
        }}
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
