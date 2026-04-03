"use client";

import { motion } from "framer-motion";

interface GeometricAccentsProps {
  className?: string;
  variant?: "circles" | "lines" | "dots" | "hexagons";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "corners";
}

export function GeometricAccents({
  className = "",
  variant = "circles",
  position = "corners",
}: GeometricAccentsProps) {
  const positions = {
    "top-left": [{ top: "-40px", left: "-40px" }],
    "top-right": [{ top: "-40px", right: "-40px" }],
    "bottom-left": [{ bottom: "-40px", left: "-40px" }],
    "bottom-right": [{ bottom: "-40px", right: "-40px" }],
    corners: [
      { top: "-40px", left: "-40px" },
      { top: "-40px", right: "-40px" },
      { bottom: "-40px", left: "-40px" },
      { bottom: "-40px", right: "-40px" },
    ],
  };

  const selectedPositions = positions[position];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {selectedPositions.map((pos, index) => (
        <motion.div
          key={index}
          className="absolute hidden md:block"
          style={pos}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          {variant === "circles" && (
            <div className="relative">
              <div
                className="h-32 w-32 rounded-full"
                style={{
                  background: "linear-gradient(135deg, rgba(0, 75, 202, 0.3) 0%, transparent 70%)",
                }}
              />
              <motion.div
                className="absolute inset-4 rounded-full"
                style={{
                  background: "linear-gradient(135deg, rgba(0, 97, 255, 0.2) 0%, transparent 70%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}

          {variant === "lines" && (
            <div className="flex gap-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-24 w-1"
                  style={{
                    background: "linear-gradient(to bottom, transparent, #004bca, transparent)",
                  }}
                  animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          )}

          {variant === "dots" && (
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: "#0061ff" }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          )}

          {variant === "hexagons" && (
            <motion.svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <defs>
                <linearGradient id={`hex-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#004bca" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0061ff" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <polygon
                points="40,5 70,22.5 70,57.5 40,75 10,57.5 10,22.5"
                fill={`url(#hex-grad-${index})`}
                stroke="#0061ff"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
            </motion.svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
