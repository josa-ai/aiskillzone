"use client";

import { motion } from "framer-motion";

interface Shape {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  type: number;
}

interface FloatingShapesProps {
  count?: number;
  className?: string;
}

function generateShapes(count: number): Shape[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 20 + (i * 17) % 60,
    x: (i * 23) % 100,
    y: (i * 31) % 100,
    duration: 15 + (i * 3) % 10,
    delay: (i * 2) % 5,
    type: i % 4,
  }));
}

export function FloatingShapes({ count = 6, className = "" }: FloatingShapesProps) {
  const shapes = generateShapes(count);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute opacity-20 md:opacity-30"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {shape.type === 0 && (
            <div
              className="h-full w-full rounded-full"
              style={{
                background: "linear-gradient(135deg, #004bca 0%, #0061ff 100%)",
              }}
            />
          )}
          {shape.type === 1 && (
            <div
              className="h-full w-full"
              style={{
                background: "linear-gradient(135deg, #004bca 0%, #c2c6d9 100%)",
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              }}
            />
          )}
          {shape.type === 2 && (
            <div
              className="h-full w-full"
              style={{
                background: "linear-gradient(135deg, #0061ff 0%, #f2f4f6 100%)",
                clipPath:
                  "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              }}
            />
          )}
          {shape.type === 3 && (
            <div
              className="h-full w-full rounded-lg"
              style={{
                background: "linear-gradient(135deg, #191c1e 0%, #004bca 100%)",
                transform: "rotate(45deg)",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
