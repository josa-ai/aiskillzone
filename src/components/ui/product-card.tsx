"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductHighlightCardProps {
  categoryIcon: React.ReactNode;
  category: string;
  title: string;
  description: string;
  floatingIcon?: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export const ProductHighlightCard = React.forwardRef<HTMLDivElement, ProductHighlightCardProps>(
  (
    { className, categoryIcon, category, title, description },
    ref
  ) => {
    const mouseX = useMotionValue(175);
    const mouseY = useMotionValue(175);
    const glowOpacity = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    };

    const rotateX = useTransform(mouseY, [0, 350], [5, -5]);
    const rotateY = useTransform(mouseX, [0, 350], [-5, 5]);
    const springConfig = { stiffness: 300, damping: 20 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const glowX = useTransform(mouseX, [0, 350], [0, 100]);
    const glowY = useTransform(mouseY, [0, 350], [0, 100]);

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => glowOpacity.set(0.6)}
        onMouseLeave={() => {
          mouseX.set(175);
          mouseY.set(175);
          glowOpacity.set(0);
        }}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          perspective: 800,
        }}
        className={cn("h-full w-full cursor-pointer rounded-2xl", className)}
      >
        {/* Card face */}
        <div
          style={{ transform: "translateZ(16px)" }}
          className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          {/* Subtle grid texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:28px_28px]" />

          {/* Mouse-following glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              opacity: glowOpacity,
              background: `radial-gradient(200px at ${glowX}% ${glowY}%, rgba(139,92,246,0.06), transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-3 p-5">
            {/* Top: category icon + label */}
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-brand-royal-purple">
                <div className="h-3.5 w-3.5">
                  {categoryIcon}
                </div>
              </div>
              <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                {category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold tracking-tight text-gray-900 leading-snug">
              {title}
            </h3>

            {/* Description */}
            <p className="text-[15px] leading-relaxed text-gray-500">
              {description}
            </p>

            {/* Learn more */}
            <div className="flex items-center gap-1 text-[13px] font-semibold text-brand-royal-purple transition-colors duration-200 hover:text-brand-mauve-purple">
              Learn more <span className="ml-0.5">→</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

ProductHighlightCard.displayName = "ProductHighlightCard";
