'use client';

import React from 'react';
import { motion } from 'framer-motion';

type GradientDotsProps = React.ComponentProps<typeof motion.div> & {
    /** Dot size (default: 8) */
    dotSize?: number;
    /** Spacing between dots (default: 10) */
    spacing?: number;
    /** Animation duration (default: 30) */
    duration?: number;
    /** Background color (default: white) */
    backgroundColor?: string;
};

// Brand palette colors — kept subtle so dots never compete with text
const C1 = 'rgba(141, 75, 187, 0.22)';   // royal purple
const C2 = 'rgba(168, 130, 238, 0.17)';  // mauve purple
const C3 = 'rgba(59, 130, 246, 0.15)';   // tech blue
const C4 = 'rgba(227, 212, 243, 0.25)';  // soft lavender

export function GradientDots({
    dotSize = 3,
    spacing = 16,
    duration = 30,
    backgroundColor = '#ffffff',
    className,
    ...props
}: GradientDotsProps) {
    const hexSpacing = spacing * 1.732;

    return (
        <motion.div
            className={`absolute inset-0 ${className ?? ''}`}
            style={{
                backgroundColor,
                backgroundImage: `
          radial-gradient(circle at 50% 50%, transparent 1.5px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
          radial-gradient(circle at 50% 50%, transparent 1.5px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
          radial-gradient(circle at 50% 50%, ${C1}, transparent 60%),
          radial-gradient(circle at 50% 50%, ${C2}, transparent 60%),
          radial-gradient(circle at 50% 50%, ${C3}, transparent 60%),
          radial-gradient(ellipse at 50% 50%, ${C4}, transparent 60%)
        `,
                backgroundSize: `
          ${spacing}px ${hexSpacing}px,
          ${spacing}px ${hexSpacing}px,
          200% 200%,
          200% 200%,
          200% 200%,
          200% ${hexSpacing}px
        `,
                backgroundPosition: `
          0px 0px, ${spacing / 2}px ${hexSpacing / 2}px,
          0% 0%,
          0% 0%,
          0% 0px
        `,
            }}
            animate={{
                backgroundPosition: [
                    `0px 0px, ${spacing / 2}px ${hexSpacing / 2}px, 800% 400%, 1000% -400%, -1200% -600%, 400% ${hexSpacing}px`,
                    `0px 0px, ${spacing / 2}px ${hexSpacing / 2}px, 0% 0%, 0% 0%, 0% 0%, 0% 0%`,
                ],
            }}
            transition={{
                backgroundPosition: {
                    duration,
                    ease: 'linear',
                    repeat: Number.POSITIVE_INFINITY,
                },
            }}
            {...props}
        />
    );
}
