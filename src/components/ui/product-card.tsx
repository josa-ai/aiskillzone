"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductHighlightCardProps {
  categoryIcon: React.ReactNode;
  category: string;
  title: string;
  description: string;
  floatingIcon: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export const ProductHighlightCard = React.forwardRef<HTMLDivElement, ProductHighlightCardProps>(
  (
    { className, categoryIcon, category, title, description, floatingIcon },
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

    const rotateX = useTransform(mouseY, [0, 350], [6, -6]);
    const rotateY = useTransform(mouseX, [0, 350], [-6, 6]);
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
        className={cn(
          "relative h-[340px] w-full cursor-pointer rounded-2xl",
          className
        )}
      >
        {/* Card face */}
        <div
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
          className="absolute inset-0 overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          {/* Subtle grid texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:28px_28px]" />

          {/* Mouse-following glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              opacity: glowOpacity,
              background: `radial-gradient(200px at ${glowX}% ${glowY}%, rgba(139,92,246,0.06), transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-between p-6">
            {/* Top: category icon + label */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-brand-royal-purple">
                <div className="h-4 w-4">
                  {categoryIcon}
                </div>
              </div>
              <span className="text-sm font-medium text-gray-500">
                {category}
              </span>
            </div>

            {/* Bottom: title + description */}
            <div className="relative">
              <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                {title}
              </h3>
              <p className="mt-2 max-w-[65%] text-sm leading-relaxed text-gray-500">
                {description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-royal-purple transition-all duration-200 hover:text-brand-mauve-purple">
                Learn more <span className="ml-0.5">→</span>
              </div>
            </div>
          </div>

          {/* Floating large icon — bottom-right */}
          <motion.div
            style={{ transform: "translateZ(40px)" }}
            whileHover={{ scale: 1.08, y: -8, x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="pointer-events-none absolute -bottom-6 -right-6 h-44 w-44 text-brand-royal-purple/20"
          >
            {floatingIcon}
          </motion.div>
        </div>
      </motion.div>
    );
  }
);

ProductHighlightCard.displayName = "ProductHighlightCard";
