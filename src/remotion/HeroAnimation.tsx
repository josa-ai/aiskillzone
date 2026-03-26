"use client";

import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  useVideoConfig,
  Easing,
} from "remotion";

/* ── Colour tokens ── */
const DEEP_NAVY = "#1E3A8A";
const MIDNIGHT_PLUM = "#1a1035";
const TECH_BLUE = "#3B82F6";
const COOL_AZURE = "#93C5FD";
const ROYAL_PURPLE = "#8D4BBB";

/* ── Circuit path data — multiple waves for richer visual ── */
const circuitPaths = [
  "M -100,120 C 200,60 400,200 960,160",
  "M -100,280 C 300,180 500,350 960,260",
  "M -100,440 C 150,340 600,500 960,380",
  "M -100,580 C 250,480 700,620 960,520",
  "M -100,200 C 350,120 550,300 960,220",
  "M -100,360 C 200,300 450,420 960,340",
  "M -100,500 C 300,440 650,560 960,460",
  "M -100,640 C 180,580 500,680 960,600",
];

const circuitColors = [
  COOL_AZURE, TECH_BLUE, COOL_AZURE, TECH_BLUE,
  `${ROYAL_PURPLE}90`, `${COOL_AZURE}80`, `${TECH_BLUE}80`, `${ROYAL_PURPLE}70`,
];

const circuitWidths = [2.5, 2, 2.5, 2, 1.5, 1.5, 1.5, 1];

/* ── Main composition — waves only ── */
export const HeroAnimationComp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const TOTAL = fps * 10;
  const loopFrame = frame % TOTAL;

  /* ── Wave 1: initial draw (0-3s) ── */
  const wave1Progress = interpolate(
    loopFrame,
    [0, fps * 3],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  /* ── Wave 1 fades slightly, wave 2 draws (3-6s) ── */
  const wave1Opacity = interpolate(
    loopFrame,
    [fps * 2.5, fps * 4, fps * 7, fps * 8],
    [1, 0.3, 0.3, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const wave2Progress = interpolate(
    loopFrame,
    [fps * 3, fps * 6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  const wave2Opacity = interpolate(
    loopFrame,
    [fps * 3, fps * 4, fps * 7, fps * 8.5],
    [0, 0.5, 0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  /* ── Ambient glow pulse (continuous, subtle) ── */
  const glowPulse = interpolate(
    loopFrame,
    [0, fps * 2.5, fps * 5, fps * 7.5, TOTAL],
    [0.15, 0.35, 0.2, 0.4, 0.15],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  /* ── Global fade for loop reset (8-10s) ── */
  const globalOpacity = interpolate(
    loopFrame,
    [fps * 8, TOTAL - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 30% 40%, ${DEEP_NAVY} 0%, ${MIDNIGHT_PLUM} 70%)`,
        opacity: globalOpacity,
      }}
    >
      {/* ── Ambient glow orbs ── */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ROYAL_PURPLE}40, transparent 70%)`,
          opacity: glowPulse,
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${TECH_BLUE}30, transparent 70%)`,
          opacity: glowPulse * 0.8,
          filter: "blur(60px)",
        }}
      />

      {/* ── Circuit Wave Lines (primary set) ── */}
      <svg
        width="960"
        height="720"
        viewBox="0 0 960 720"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: wave1Opacity,
        }}
      >
        {circuitPaths.slice(0, 4).map((d, i) => {
          const staggerDelay = i * 0.15;
          const thisProgress = interpolate(
            wave1Progress,
            [staggerDelay, Math.min(staggerDelay + 0.7, 1)],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <path
              key={i}
              d={d}
              stroke={circuitColors[i]}
              strokeWidth={circuitWidths[i]}
              fill="none"
              strokeDasharray="1"
              strokeDashoffset={1 - thisProgress}
              pathLength={1}
              opacity={0.6}
            />
          );
        })}
      </svg>

      {/* ── Circuit Wave Lines (secondary set, offset timing) ── */}
      <svg
        width="960"
        height="720"
        viewBox="0 0 960 720"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: wave2Opacity,
        }}
      >
        {circuitPaths.slice(4).map((d, i) => {
          const staggerDelay = i * 0.2;
          const thisProgress = interpolate(
            wave2Progress,
            [staggerDelay, Math.min(staggerDelay + 0.6, 1)],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <path
              key={i + 4}
              d={d}
              stroke={circuitColors[i + 4]}
              strokeWidth={circuitWidths[i + 4]}
              fill="none"
              strokeDasharray="1"
              strokeDashoffset={1 - thisProgress}
              pathLength={1}
              opacity={0.4}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
