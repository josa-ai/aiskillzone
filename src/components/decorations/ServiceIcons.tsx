"use client";

import { motion } from "framer-motion";

interface IconProps {
  className?: string;
  animate?: boolean;
}

export function WebsiteIcon({ className = "", animate = true }: IconProps) {
  const icon = (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="webGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect
        x="4"
        y="8"
        width="40"
        height="28"
        rx="3"
        stroke="url(#webGrad)"
        strokeWidth="2.5"
        fill="none"
      />
      <path d="M4 14H44" stroke="url(#webGrad)" strokeWidth="2" />
      <circle cx="10" cy="11" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="16" cy="11" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="22" cy="11" r="1.5" fill="currentColor" opacity="0.4" />
      <path d="M16 20L20 24L16 28" stroke="url(#webGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 28H32" stroke="url(#webGrad)" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 20H32" stroke="url(#webGrad)" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 24H34" stroke="url(#webGrad)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  if (!animate) return icon;

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
      transition={{ duration: 0.3 }}
    >
      {icon}
    </motion.div>
  );
}

export function VoiceAIIcon({ className = "", animate = true }: IconProps) {
  const icon = (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="voiceGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path
        d="M24 4C13 4 4 13 4 24V28C4 29.1 4.9 30 6 30H10C11.1 30 12 29.1 12 28V24C12 15.2 19.2 8 28 8C36.8 8 44 15.2 44 24V28C44 29.1 44.9 30 46 30H50C51.1 30 52 29.1 52 28V24C52 13 43 4 32 4"
        stroke="url(#voiceGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M16 36C16 38.2 17.8 40 20 40H28C30.2 40 32 38.2 32 36V32H16V36Z"
        stroke="url(#voiceGrad)"
        strokeWidth="2.5"
        fill="none"
      />
      <path d="M20 36V40" stroke="url(#voiceGrad)" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 36V40" stroke="url(#voiceGrad)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.6" />
    </svg>
  );

  if (!animate) return icon;

  return (
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {icon}
    </motion.div>
  );
}

export function AutomationIcon({ className = "", animate = true }: IconProps) {
  const icon = (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="autoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke="url(#autoGrad)"
        strokeWidth="2.5"
        strokeDasharray="8 4"
        fill="none"
      />
      <path
        d="M24 14V24L30 30"
        stroke="url(#autoGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.6" />
      <path
        d="M10 10L14 14"
        stroke="url(#autoGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M34 34L38 38"
        stroke="url(#autoGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M38 10L34 14"
        stroke="url(#autoGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 34L10 38"
        stroke="url(#autoGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  if (!animate) return icon;

  return (
    <motion.div
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {icon}
    </motion.div>
  );
}

export function TrainingIcon({ className = "", animate = true }: IconProps) {
  const icon = (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="trainGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path
        d="M24 6L6 16L24 26L42 16L24 6Z"
        stroke="url(#trainGrad)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 20V36C12 37.1 12.9 38 14 38H18V34H30V38H34C35.1 38 36 37.1 36 36V20"
        stroke="url(#trainGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M18 42V38"
        stroke="url(#trainGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M30 42V38"
        stroke="url(#trainGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="16" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );

  if (!animate) return icon;

  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -3 }}
      transition={{ duration: 0.3 }}
    >
      {icon}
    </motion.div>
  );
}

export function EcommerceIcon({ className = "", animate = true }: IconProps) {
  const icon = (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="ecomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path
        d="M8 10H40L44 38H12L8 10Z"
        stroke="url(#ecomGrad)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8 10H40"
        stroke="url(#ecomGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M20 18C20 16.8954 20.8954 16 22 16H26C27.1046 16 28 16.8954 28 18V20H20V18Z"
        stroke="url(#ecomGrad)"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="18" cy="28" r="3" stroke="url(#ecomGrad)" strokeWidth="2" fill="none" />
      <circle cx="30" cy="28" r="3" stroke="url(#ecomGrad)" strokeWidth="2" fill="none" />
      <circle cx="36" cy="32" r="2" stroke="url(#ecomGrad)" strokeWidth="1.5" fill="none" />
    </svg>
  );

  if (!animate) return icon;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {icon}
    </motion.div>
  );
}

export function BrandIcon({ className = "", animate = true }: IconProps) {
  const icon = (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke="url(#brandGrad)"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M24 12V24L32 32"
        stroke="url(#brandGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.6" />
      <path
        d="M16 16L20 20"
        stroke="url(#brandGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M32 32L36 36"
        stroke="url(#brandGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M32 16L28 20"
        stroke="url(#brandGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 32L20 28"
        stroke="url(#brandGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  if (!animate) return icon;

  return (
    <motion.div
      whileHover={{ rotate: 90 }}
      transition={{ duration: 0.3 }}
    >
      {icon}
    </motion.div>
  );
}

export function DigitalIcon({ className = "", animate = true }: IconProps) {
  const icon = (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="digitalGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect
        x="8"
        y="4"
        width="32"
        height="40"
        rx="3"
        stroke="url(#digitalGrad)"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M16 12H32"
        stroke="url(#digitalGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 18H28"
        stroke="url(#digitalGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 24H32"
        stroke="url(#digitalGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 30H24"
        stroke="url(#digitalGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="30" cy="34" r="6" stroke="url(#digitalGrad)" strokeWidth="2" fill="none" />
      <path d="M28 34L30 36L34 32" stroke="url(#digitalGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (!animate) return icon;

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {icon}
    </motion.div>
  );
}

export function AppIcon({ className = "", animate = true }: IconProps) {
  const icon = (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="appGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect
        x="8"
        y="4"
        width="32"
        height="40"
        rx="4"
        stroke="url(#appGrad)"
        strokeWidth="2.5"
        fill="none"
      />
      <rect
        x="12"
        y="8"
        width="24"
        height="24"
        rx="2"
        stroke="url(#appGrad)"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="24" cy="20" r="4" fill="currentColor" opacity="0.6" />
      <path
        d="M16 36H32"
        stroke="url(#appGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  if (!animate) return icon;

  return (
    <motion.div
      whileHover={{ y: -3, rotate: [0, -3, 3, 0] }}
      transition={{ duration: 0.3 }}
    >
      {icon}
    </motion.div>
  );
}

export function ToolsIcon({ className = "", animate = true }: IconProps) {
  const icon = (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="toolsGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path
        d="M36 8L40 12L24 28L20 24L36 8Z"
        stroke="url(#toolsGrad)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 32L20 40"
        stroke="url(#toolsGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="32"
        r="8"
        stroke="url(#toolsGrad)"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M32 16L36 20"
        stroke="url(#toolsGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  if (!animate) return icon;

  return (
    <motion.div
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {icon}
    </motion.div>
  );
}
