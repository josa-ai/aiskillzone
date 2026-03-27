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
    { className, categoryIcon, category, title, description, floatingIcon, variant = "primary" },
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

    const rotateX = useTransform(mouseY, [0, 350], [8, -8]);
    const rotateY = useTransform(mouseX, [0, 350], [-8, 8]);
    const springConfig = { stiffness: 300, damping: 20 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const glowX = useTransform(mouseX, [0, 350], [0, 100]);
    const glowY = useTransform(mouseY, [0, 350], [0, 100]);

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => glowOpacity.set(0.45)}
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
          "relative h-[340px] w-full cursor-pointer rounded-2xl shadow-xl transition-shadow duration-300 hover:shadow-2xl",
          variant === "primary"
            ? "shadow-brand-royal-purple/20 hover:shadow-brand-mauve-purple/30"
            : "shadow-brand-royal-purple/10 hover:shadow-brand-mauve-purple/20",
          className
        )}
      >
        {/* Card face — elevated via translateZ */}
        <div
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
          className={cn(
            "absolute inset-0 overflow-hidden rounded-2xl",
            variant === "primary"
              ? "bg-gradient-to-br from-brand-royal-purple via-brand-mauve-purple to-[#5B2D8E]"
              : "bg-gradient-to-br from-brand-soft-lavender via-white to-brand-soft-lavender"
          )}
        >
          {/* Diagonal grid texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff14_1px,transparent_1px),linear-gradient(to_bottom,#ffffff14_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]" />

          {/* Mouse-following glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              opacity: glowOpacity,
              background: `radial-gradient(120px at ${glowX}% ${glowY}%, rgba(255,255,255,0.25), transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-between p-6">
            {/* Top: category icon + label */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-2xl",
                  variant === "primary" ? "bg-white/20" : "bg-brand-royal-purple/10"
                )}
              >
                <div
                  className={cn(
                    "h-7 w-7",
                    variant === "primary" ? "text-white" : "text-brand-royal-purple"
                  )}
                >
                  {categoryIcon}
                </div>
              </div>
              <span
                className={cn(
                  "text-xs font-semibold uppercase tracking-wider",
                  variant === "primary" ? "text-white/60" : "text-brand-deep-navy/50"
                )}
              >
                {category}
              </span>
            </div>

            {/* Bottom: title + description + link */}
            <div>
              <h3
                className={cn(
                  "text-2xl font-bold tracking-tight",
                  variant === "primary" ? "text-white" : "text-brand-deep-navy"
                )}
              >
                {title}
              </h3>
              <p
                className={cn(
                  "mt-2 max-w-[80%] text-sm leading-relaxed",
                  variant === "primary" ? "text-white/75" : "text-brand-deep-navy/65"
                )}
              >
                {description}
              </p>
              <div
                className={cn(
                  "mt-4 flex items-center gap-1 text-sm font-semibold transition-all duration-200",
                  variant === "primary"
                    ? "text-white/80 group-hover:text-white"
                    : "text-brand-royal-purple"
                )}
              >
                Learn more <span className="ml-0.5">→</span>
              </div>
            </div>
          </div>

          {/* Floating large icon — pops out bottom-right */}
          <motion.div
            style={{ transform: "translateZ(50px)" }}
            whileHover={{ scale: 1.12, y: -12, x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "pointer-events-none absolute -bottom-8 -right-8 h-40 w-40",
              variant === "primary" ? "text-white/15" : "text-brand-royal-purple/15"
            )}
          >
            {floatingIcon}
          </motion.div>
        </div>
      </motion.div>
    );
  }
);

ProductHighlightCard.displayName = "ProductHighlightCard";
