"use client";

import { motion } from "framer-motion";

interface Particle {
  id: number;
  size: number;
  x: number;
  startY: number;
  duration: number;
  delay: number;
}

interface ParticleFieldProps {
  count?: number;
  className?: string;
  color?: string;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 2 + (i * 3) % 4,
    x: (i * 19) % 100,
    startY: (i * 13) % 100,
    duration: 6 + (i * 2) % 8,
    delay: (i * 3) % 4,
  }));
}

export function ParticleField({
  count = 12,
  className = "",
  color = "#0061ff",
}: ParticleFieldProps) {
  const particles = generateParticles(count);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.startY}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            boxShadow: `0 0 ${particle.size * 2}px ${color}`,
          }}
          animate={{
            y: [-20, -200],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
