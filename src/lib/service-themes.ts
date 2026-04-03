export interface ServiceTheme {
  accent: string;
  accentSoft: string;
  accentStrong: string;
  outline: string;
  heroBackground: string;
  panelBackground: string;
  surfaceBackground: string;
  surfaceAltBackground: string;
  spotlight: string;
}

const defaultTheme: ServiceTheme = {
  accent: "#2563eb",
  accentSoft: "rgba(37, 99, 235, 0.14)",
  accentStrong: "rgba(37, 99, 235, 0.28)",
  outline: "rgba(37, 99, 235, 0.2)",
  heroBackground:
    "linear-gradient(135deg, #081020 0%, #10204a 42%, #2563eb 100%)",
  panelBackground:
    "linear-gradient(135deg, rgba(13, 23, 48, 0.96) 0%, rgba(20, 53, 133, 0.92) 58%, rgba(97, 167, 255, 0.88) 100%)",
  surfaceBackground:
    "linear-gradient(180deg, rgba(37, 99, 235, 0.1) 0%, rgba(255, 255, 255, 0.92) 100%)",
  surfaceAltBackground:
    "linear-gradient(180deg, rgba(37, 99, 235, 0.12) 0%, rgba(236, 245, 255, 0.88) 100%)",
  spotlight:
    "radial-gradient(circle at top right, rgba(96, 165, 250, 0.34), transparent 0 52%)",
};

const themes: Record<string, ServiceTheme> = {
  "website-design": defaultTheme,
  "voice-ai": {
    accent: "#c86d1d",
    accentSoft: "rgba(200, 109, 29, 0.14)",
    accentStrong: "rgba(200, 109, 29, 0.26)",
    outline: "rgba(200, 109, 29, 0.2)",
    heroBackground:
      "linear-gradient(135deg, #190d05 0%, #4a2406 42%, #c86d1d 100%)",
    panelBackground:
      "linear-gradient(135deg, rgba(30, 16, 8, 0.96) 0%, rgba(111, 53, 15, 0.9) 55%, rgba(255, 196, 134, 0.82) 100%)",
    surfaceBackground:
      "linear-gradient(180deg, rgba(200, 109, 29, 0.1) 0%, rgba(255, 255, 255, 0.94) 100%)",
    surfaceAltBackground:
      "linear-gradient(180deg, rgba(255, 212, 166, 0.44) 0%, rgba(255, 247, 238, 0.92) 100%)",
    spotlight:
      "radial-gradient(circle at top right, rgba(251, 146, 60, 0.3), transparent 0 52%)",
  },
  "ai-automation": {
    accent: "#0f8a5f",
    accentSoft: "rgba(15, 138, 95, 0.14)",
    accentStrong: "rgba(15, 138, 95, 0.26)",
    outline: "rgba(15, 138, 95, 0.22)",
    heroBackground:
      "linear-gradient(135deg, #07150f 0%, #0c3e2f 42%, #0f8a5f 100%)",
    panelBackground:
      "linear-gradient(135deg, rgba(8, 22, 16, 0.96) 0%, rgba(11, 85, 59, 0.92) 58%, rgba(96, 236, 170, 0.78) 100%)",
    surfaceBackground:
      "linear-gradient(180deg, rgba(15, 138, 95, 0.1) 0%, rgba(255, 255, 255, 0.94) 100%)",
    surfaceAltBackground:
      "linear-gradient(180deg, rgba(191, 255, 228, 0.54) 0%, rgba(241, 255, 250, 0.9) 100%)",
    spotlight:
      "radial-gradient(circle at top right, rgba(45, 212, 191, 0.28), transparent 0 54%)",
  },
  "ai-training": {
    accent: "#2b6ee7",
    accentSoft: "rgba(43, 110, 231, 0.14)",
    accentStrong: "rgba(43, 110, 231, 0.24)",
    outline: "rgba(43, 110, 231, 0.22)",
    heroBackground:
      "linear-gradient(135deg, #091120 0%, #183067 42%, #2b6ee7 100%)",
    panelBackground:
      "linear-gradient(135deg, rgba(9, 19, 39, 0.96) 0%, rgba(28, 60, 141, 0.9) 52%, rgba(147, 197, 253, 0.8) 100%)",
    surfaceBackground:
      "linear-gradient(180deg, rgba(43, 110, 231, 0.1) 0%, rgba(255, 255, 255, 0.94) 100%)",
    surfaceAltBackground:
      "linear-gradient(180deg, rgba(214, 233, 255, 0.62) 0%, rgba(244, 249, 255, 0.92) 100%)",
    spotlight:
      "radial-gradient(circle at top right, rgba(96, 165, 250, 0.3), transparent 0 54%)",
  },
  "ecommerce-consulting": {
    accent: "#9a6228",
    accentSoft: "rgba(154, 98, 40, 0.14)",
    accentStrong: "rgba(154, 98, 40, 0.24)",
    outline: "rgba(154, 98, 40, 0.2)",
    heroBackground:
      "linear-gradient(135deg, #150d07 0%, #3d2410 42%, #9a6228 100%)",
    panelBackground:
      "linear-gradient(135deg, rgba(24, 14, 9, 0.96) 0%, rgba(90, 54, 24, 0.9) 58%, rgba(232, 190, 132, 0.8) 100%)",
    surfaceBackground:
      "linear-gradient(180deg, rgba(154, 98, 40, 0.1) 0%, rgba(255, 255, 255, 0.94) 100%)",
    surfaceAltBackground:
      "linear-gradient(180deg, rgba(255, 228, 196, 0.55) 0%, rgba(255, 249, 241, 0.92) 100%)",
    spotlight:
      "radial-gradient(circle at top right, rgba(245, 158, 11, 0.24), transparent 0 54%)",
  },
  "brand-strategy": {
    accent: "#d14e43",
    accentSoft: "rgba(209, 78, 67, 0.14)",
    accentStrong: "rgba(209, 78, 67, 0.24)",
    outline: "rgba(209, 78, 67, 0.22)",
    heroBackground:
      "linear-gradient(135deg, #180b0a 0%, #4f1c1a 44%, #d14e43 100%)",
    panelBackground:
      "linear-gradient(135deg, rgba(27, 13, 12, 0.96) 0%, rgba(111, 34, 28, 0.9) 56%, rgba(255, 179, 170, 0.8) 100%)",
    surfaceBackground:
      "linear-gradient(180deg, rgba(209, 78, 67, 0.1) 0%, rgba(255, 255, 255, 0.94) 100%)",
    surfaceAltBackground:
      "linear-gradient(180deg, rgba(255, 221, 217, 0.6) 0%, rgba(255, 246, 245, 0.92) 100%)",
    spotlight:
      "radial-gradient(circle at top right, rgba(248, 113, 113, 0.26), transparent 0 54%)",
  },
  "digital-products": {
    accent: "#c99611",
    accentSoft: "rgba(201, 150, 17, 0.14)",
    accentStrong: "rgba(201, 150, 17, 0.24)",
    outline: "rgba(201, 150, 17, 0.22)",
    heroBackground:
      "linear-gradient(135deg, #171106 0%, #4b3511 42%, #c99611 100%)",
    panelBackground:
      "linear-gradient(135deg, rgba(24, 19, 9, 0.96) 0%, rgba(106, 77, 19, 0.9) 56%, rgba(252, 211, 77, 0.78) 100%)",
    surfaceBackground:
      "linear-gradient(180deg, rgba(201, 150, 17, 0.1) 0%, rgba(255, 255, 255, 0.94) 100%)",
    surfaceAltBackground:
      "linear-gradient(180deg, rgba(255, 238, 186, 0.58) 0%, rgba(255, 251, 240, 0.92) 100%)",
    spotlight:
      "radial-gradient(circle at top right, rgba(250, 204, 21, 0.26), transparent 0 54%)",
  },
  "custom-apps": {
    accent: "#3f5aa9",
    accentSoft: "rgba(63, 90, 169, 0.14)",
    accentStrong: "rgba(63, 90, 169, 0.24)",
    outline: "rgba(63, 90, 169, 0.22)",
    heroBackground:
      "linear-gradient(135deg, #0b1020 0%, #1a2645 42%, #3f5aa9 100%)",
    panelBackground:
      "linear-gradient(135deg, rgba(14, 19, 32, 0.96) 0%, rgba(33, 47, 95, 0.92) 56%, rgba(171, 189, 255, 0.78) 100%)",
    surfaceBackground:
      "linear-gradient(180deg, rgba(63, 90, 169, 0.1) 0%, rgba(255, 255, 255, 0.94) 100%)",
    surfaceAltBackground:
      "linear-gradient(180deg, rgba(224, 231, 255, 0.66) 0%, rgba(246, 248, 255, 0.92) 100%)",
    spotlight:
      "radial-gradient(circle at top right, rgba(129, 140, 248, 0.24), transparent 0 54%)",
  },
  "business-tools": {
    accent: "#0a7e87",
    accentSoft: "rgba(10, 126, 135, 0.14)",
    accentStrong: "rgba(10, 126, 135, 0.24)",
    outline: "rgba(10, 126, 135, 0.22)",
    heroBackground:
      "linear-gradient(135deg, #071417 0%, #0c3940 42%, #0a7e87 100%)",
    panelBackground:
      "linear-gradient(135deg, rgba(8, 19, 21, 0.96) 0%, rgba(10, 71, 77, 0.92) 56%, rgba(125, 211, 221, 0.78) 100%)",
    surfaceBackground:
      "linear-gradient(180deg, rgba(10, 126, 135, 0.1) 0%, rgba(255, 255, 255, 0.94) 100%)",
    surfaceAltBackground:
      "linear-gradient(180deg, rgba(199, 246, 250, 0.6) 0%, rgba(243, 255, 255, 0.92) 100%)",
    spotlight:
      "radial-gradient(circle at top right, rgba(34, 211, 238, 0.24), transparent 0 54%)",
  },
};

export function getServiceTheme(slug: string): ServiceTheme {
  return themes[slug] ?? defaultTheme;
}
