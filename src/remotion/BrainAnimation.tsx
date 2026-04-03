import { useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";

/**
 * Realistic side-profile AI brain with cortex detail, teal-to-purple gradient,
 * neural network lines, wavy energy waves, and traveling light pulses.
 */

// Detailed lateral brain outline — anatomical side profile with bumpy gyri
function getLateralBrainPath(cx: number, cy: number, s: number): string {
  const x = (v: number) => cx + v * s;
  const y = (v: number) => cy + v * s;

  // Side-view brain: frontal lobe left, occipital right, temporal/cerebellum bottom-right
  // Bumpy gyri texture on top surface
  return [
    // Start at brainstem bottom
    `M${x(0.08)},${y(0.38)}`,
    // Brainstem up to cerebellum
    `C${x(0.10)},${y(0.34)} ${x(0.14)},${y(0.32)} ${x(0.18)},${y(0.30)}`,
    // Cerebellum (small bulge at back-bottom)
    `C${x(0.24)},${y(0.30)} ${x(0.30)},${y(0.28)} ${x(0.34)},${y(0.24)}`,
    `C${x(0.37)},${y(0.21)} ${x(0.38)},${y(0.17)} ${x(0.38)},${y(0.14)}`,
    // Occipital lobe back — slight indent then bump
    `C${x(0.39)},${y(0.10)} ${x(0.41)},${y(0.04)} ${x(0.42)},${y(-0.02)}`,
    `C${x(0.42)},${y(-0.06)} ${x(0.41)},${y(-0.10)} ${x(0.40)},${y(-0.14)}`,
    // Parietal — bumpy gyri along top-back
    `C${x(0.38)},${y(-0.18)} ${x(0.36)},${y(-0.22)} ${x(0.33)},${y(-0.25)}`,
    `Q${x(0.30)},${y(-0.29)} ${x(0.27)},${y(-0.27)}`, // dip
    `Q${x(0.24)},${y(-0.31)} ${x(0.20)},${y(-0.30)}`, // bump
    `Q${x(0.17)},${y(-0.34)} ${x(0.13)},${y(-0.33)}`, // dip
    `Q${x(0.10)},${y(-0.37)} ${x(0.06)},${y(-0.36)}`, // bump
    // Top crown — more gyri bumps
    `Q${x(0.02)},${y(-0.39)} ${x(-0.02)},${y(-0.38)}`, // dip
    `Q${x(-0.06)},${y(-0.41)} ${x(-0.10)},${y(-0.39)}`, // bump
    `Q${x(-0.13)},${y(-0.42)} ${x(-0.17)},${y(-0.40)}`, // dip
    `Q${x(-0.20)},${y(-0.42)} ${x(-0.24)},${y(-0.39)}`, // bump
    // Frontal lobe — large rounded dome
    `C${x(-0.28)},${y(-0.37)} ${x(-0.33)},${y(-0.33)} ${x(-0.37)},${y(-0.27)}`,
    `C${x(-0.40)},${y(-0.22)} ${x(-0.42)},${y(-0.15)} ${x(-0.43)},${y(-0.08)}`,
    `C${x(-0.43)},${y(-0.02)} ${x(-0.43)},${y(0.04)} ${x(-0.42)},${y(0.10)}`,
    // Frontal descent — steep front face
    `C${x(-0.40)},${y(0.16)} ${x(-0.37)},${y(0.20)} ${x(-0.33)},${y(0.22)}`,
    // Temporal lobe bottom — indent for Sylvian fissure then temporal bulge
    `C${x(-0.28)},${y(0.24)} ${x(-0.22)},${y(0.26)} ${x(-0.16)},${y(0.28)}`,
    `C${x(-0.10)},${y(0.30)} ${x(-0.04)},${y(0.32)} ${x(0.02)},${y(0.34)}`,
    // Back to brainstem
    `C${x(0.04)},${y(0.36)} ${x(0.06)},${y(0.37)} ${x(0.08)},${y(0.38)}`,
    `Z`,
  ].join(" ");
}

// Cortex fold lines (sulci) — dense side view detail
function getCortexFolds(cx: number, cy: number, s: number): string[] {
  const x = (v: number) => cx + v * s;
  const y = (v: number) => cy + v * s;

  return [
    // Central sulcus (major divider)
    `M${x(-0.06)},${y(-0.39)} C${x(-0.04)},${y(-0.28)} ${x(-0.02)},${y(-0.16)} ${x(0.0)},${y(-0.04)} C${x(0.02)},${y(0.06)} ${x(0.01)},${y(0.16)} ${x(-0.02)},${y(0.24)}`,
    // Lateral/Sylvian fissure (deep horizontal)
    `M${x(-0.32)},${y(0.14)} C${x(-0.22)},${y(0.10)} ${x(-0.10)},${y(0.08)} ${x(0.02)},${y(0.12)} C${x(0.12)},${y(0.15)} ${x(0.22)},${y(0.12)} ${x(0.30)},${y(0.08)}`,
    // Precentral sulcus
    `M${x(-0.18)},${y(-0.38)} C${x(-0.16)},${y(-0.26)} ${x(-0.15)},${y(-0.14)} ${x(-0.17)},${y(-0.02)}`,
    // Postcentral sulcus
    `M${x(0.08)},${y(-0.35)} C${x(0.10)},${y(-0.24)} ${x(0.11)},${y(-0.14)} ${x(0.09)},${y(-0.04)}`,
    // Superior frontal
    `M${x(-0.38)},${y(-0.12)} C${x(-0.32)},${y(-0.18)} ${x(-0.26)},${y(-0.24)} ${x(-0.18)},${y(-0.30)}`,
    // Inferior frontal
    `M${x(-0.40)},${y(0.04)} C${x(-0.34)},${y(-0.02)} ${x(-0.26)},${y(-0.08)} ${x(-0.18)},${y(-0.14)}`,
    // Middle frontal
    `M${x(-0.40)},${y(-0.04)} C${x(-0.34)},${y(-0.10)} ${x(-0.28)},${y(-0.16)} ${x(-0.20)},${y(-0.22)}`,
    // Superior temporal
    `M${x(-0.20)},${y(0.20)} C${x(-0.10)},${y(0.18)} ${x(0.02)},${y(0.20)} ${x(0.14)},${y(0.22)}`,
    // Middle temporal
    `M${x(-0.16)},${y(0.26)} C${x(-0.06)},${y(0.25)} ${x(0.06)},${y(0.27)} ${x(0.16)},${y(0.26)}`,
    // Intraparietal
    `M${x(0.14)},${y(-0.30)} C${x(0.20)},${y(-0.22)} ${x(0.26)},${y(-0.14)} ${x(0.32)},${y(-0.06)}`,
    // Parieto-occipital
    `M${x(0.24)},${y(-0.28)} C${x(0.28)},${y(-0.18)} ${x(0.34)},${y(-0.08)} ${x(0.38)},${y(0.02)}`,
    // Calcarine
    `M${x(0.32)},${y(0.04)} C${x(0.35)},${y(0.10)} ${x(0.36)},${y(0.16)} ${x(0.34)},${y(0.22)}`,
    // Extra folds for density
    `M${x(-0.34)},${y(-0.24)} C${x(-0.28)},${y(-0.28)} ${x(-0.22)},${y(-0.32)} ${x(-0.14)},${y(-0.36)}`,
    `M${x(0.18)},${y(-0.16)} C${x(0.22)},${y(-0.10)} ${x(0.28)},${y(-0.04)} ${x(0.34)},${y(0.0)}`,
    `M${x(-0.10)},${y(-0.30)} C${x(-0.06)},${y(-0.22)} ${x(-0.04)},${y(-0.14)} ${x(-0.06)},${y(-0.06)}`,
    `M${x(0.04)},${y(-0.28)} C${x(0.06)},${y(-0.20)} ${x(0.08)},${y(-0.12)} ${x(0.06)},${y(-0.04)}`,
    // Cerebellum folds (horizontal lines in back-bottom)
    `M${x(0.20)},${y(0.24)} C${x(0.26)},${y(0.22)} ${x(0.32)},${y(0.20)} ${x(0.36)},${y(0.18)}`,
    `M${x(0.22)},${y(0.27)} C${x(0.28)},${y(0.26)} ${x(0.34)},${y(0.24)} ${x(0.37)},${y(0.22)}`,
  ];
}

// Neural network connection nodes extending from brain
function getNetworkNodes(cx: number, cy: number, s: number, frame: number) {
  const nodes: { x: number; y: number; size: number }[] = [];
  const connections: { x1: number; y1: number; x2: number; y2: number }[] = [];

  // Nodes scattered around the brain at distance
  const nodePositions = [
    [-0.55, -0.30], [-0.60, 0.05], [-0.50, 0.35],
    [0.55, -0.28], [0.58, 0.08], [0.50, 0.32],
    [-0.35, -0.52], [-0.10, -0.55], [0.15, -0.54], [0.38, -0.48],
    [-0.30, 0.45], [0.05, 0.48], [0.30, 0.42],
    [-0.65, -0.15], [0.65, -0.10],
    [-0.48, -0.45], [0.48, -0.42],
    [-0.55, 0.25], [0.55, 0.22],
  ];

  nodePositions.forEach(([nx, ny]) => {
    const wobble = Math.sin(frame * 0.02 + nx * 10 + ny * 7) * s * 0.01;
    nodes.push({
      x: cx + nx * s + wobble,
      y: cy + ny * s + wobble * 0.7,
      size: 2 + Math.abs(Math.sin(nx * 5 + ny * 3)) * 2,
    });
  });

  // Connect nearby nodes
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < s * 0.35) {
        connections.push({
          x1: nodes[i].x, y1: nodes[i].y,
          x2: nodes[j].x, y2: nodes[j].y,
        });
      }
    }
  }

  return { nodes, connections };
}

export const BrainAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const cx = width * 0.5;
  const cy = height * 0.48;
  const brainScale = Math.min(width, height) * 0.9;

  const brainPath = getLateralBrainPath(cx, cy, brainScale);
  const foldPaths = getCortexFolds(cx, cy, brainScale);
  const { nodes: netNodes, connections: netConns } = getNetworkNodes(cx, cy, brainScale, frame);

  // Animated glow
  const glowPulse = 0.5 + Math.sin(frame * 0.025) * 0.15;

  // Wave lines behind/through brain
  const numWaves = 10;
  const waves: { y: number; amp: number; freq: number; phase: number; color: string }[] = [];
  for (let i = 0; i < numWaves; i++) {
    const t = i / (numWaves - 1);
    waves.push({
      y: height * 0.15 + t * height * 0.7,
      amp: 12 + Math.sin(i * 1.7) * 8,
      freq: 0.006 + i * 0.0008,
      phase: i * 0.9,
      color: i % 3 === 0
        ? `rgba(0, 200, 255, ${0.15 + t * 0.1})`
        : i % 3 === 1
          ? `rgba(120, 60, 200, ${0.12 + t * 0.08})`
          : `rgba(0, 120, 255, ${0.1 + t * 0.08})`,
    });
  }

  function wavePath(baseY: number, amp: number, freq: number, phase: number): string {
    const pts: string[] = [];
    for (let px = 0; px <= width; px += 3) {
      const py = baseY
        + Math.sin(px * freq + phase + frame * 0.025) * amp
        + Math.sin(px * freq * 0.6 + phase * 1.4 + frame * 0.018) * amp * 0.4;
      pts.push(`${px},${py}`);
    }
    return `M${pts.join(" L")}`;
  }

  // Traveling light pulses on waves
  const numPulses = 30;
  const pulseDots: { wx: number; wy: number; size: number; color: string; opacity: number }[] = [];
  for (let i = 0; i < numPulses; i++) {
    const wIdx = i % numWaves;
    const w = waves[wIdx];
    const speed = 0.6 + (i % 7) * 0.25;
    const xProg = ((i * 131 + frame * speed) % (width + 60)) / width;
    const px = xProg * width;
    const py = w.y
      + Math.sin(px * w.freq + w.phase + frame * 0.025) * w.amp
      + Math.sin(px * w.freq * 0.6 + w.phase * 1.4 + frame * 0.018) * w.amp * 0.4;
    const colors = ["#00d4ff", "#0088ff", "#9944ee", "#00ccaa"];
    pulseDots.push({
      wx: px, wy: py,
      size: 1.5 + (i % 4),
      color: colors[i % colors.length],
      opacity: 0.5 + Math.sin(frame * 0.06 + i * 1.3) * 0.4,
    });
  }

  // Dot texture points on brain surface
  const dotCount = 120;
  const surfaceDots: { dx: number; dy: number; op: number }[] = [];
  for (let i = 0; i < dotCount; i++) {
    const angle = (i / dotCount) * Math.PI * 2 + i * 0.3;
    const r = 0.15 + (i % 7) * 0.035;
    const dx = cx + Math.cos(angle) * r * brainScale + Math.sin(i * 2.1) * brainScale * 0.05;
    const dy = cy + Math.sin(angle) * r * brainScale * 0.85 + Math.cos(i * 1.7) * brainScale * 0.04;
    const op = 0.15 + Math.sin(frame * 0.04 + i * 0.5) * 0.12;
    surfaceDots.push({ dx, dy, op });
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "#060a1f" }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glowStrong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="16" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Brain teal-to-purple gradient fill */}
          <linearGradient id="brainFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(0, 220, 255, ${0.08 * glowPulse})`} />
            <stop offset="40%" stopColor={`rgba(0, 140, 255, ${0.06 * glowPulse})`} />
            <stop offset="100%" stopColor={`rgba(120, 40, 180, ${0.08 * glowPulse})`} />
          </linearGradient>

          {/* Brain stroke gradient: teal top → purple bottom */}
          <linearGradient id="brainStroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00dcff" />
            <stop offset="35%" stopColor="#0088ff" />
            <stop offset="70%" stopColor="#6644cc" />
            <stop offset="100%" stopColor="#9933aa" />
          </linearGradient>

          {/* Fold gradient */}
          <linearGradient id="foldStroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0, 200, 255, 0.5)" />
            <stop offset="50%" stopColor="rgba(80, 120, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(140, 60, 200, 0.35)" />
          </linearGradient>

          {/* Ambient glow behind brain */}
          <radialGradient id="ambientGlow" cx="50%" cy="48%" r="45%">
            <stop offset="0%" stopColor={`rgba(0, 160, 255, ${0.12 * glowPulse})`} />
            <stop offset="40%" stopColor={`rgba(100, 40, 200, ${0.08 * glowPulse})`} />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* Ambient background glow */}
        <ellipse cx={cx} cy={cy} rx={brainScale * 0.5} ry={brainScale * 0.45} fill="url(#ambientGlow)" />

        {/* Neural network connections (behind brain) */}
        {netConns.map((c, i) => (
          <line
            key={`nc${i}`}
            x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
            stroke={`rgba(0, 160, 255, ${0.08 + Math.sin(frame * 0.02 + i) * 0.04})`}
            strokeWidth={0.6}
          />
        ))}

        {/* Neural network nodes */}
        {netNodes.map((n, i) => (
          <circle
            key={`nn${i}`}
            cx={n.x} cy={n.y} r={n.size}
            fill={i % 2 === 0 ? "#00aaff" : "#8844cc"}
            opacity={0.3 + Math.sin(frame * 0.03 + i * 2) * 0.2}
            filter="url(#dotGlow)"
          />
        ))}

        {/* Wave lines */}
        {waves.map((w, i) => (
          <path
            key={`wv${i}`}
            d={wavePath(w.y, w.amp, w.freq, w.phase)}
            fill="none"
            stroke={w.color}
            strokeWidth={1}
          />
        ))}

        {/* Brain filled shape (semi-transparent) */}
        <path d={brainPath} fill="url(#brainFill)" />

        {/* Brain outline with gradient stroke */}
        <path
          d={brainPath}
          fill="none"
          stroke="url(#brainStroke)"
          strokeWidth={3}
          opacity={0.8 + glowPulse * 0.2}
          filter="url(#glow)"
        />

        {/* Second outline for extra glow aura */}
        <path
          d={brainPath}
          fill="none"
          stroke="url(#brainStroke)"
          strokeWidth={6}
          opacity={0.15}
          filter="url(#glowStrong)"
        />

        {/* Cortex fold lines — visible and detailed */}
        {foldPaths.map((fd, i) => (
          <path
            key={`fold${i}`}
            d={fd}
            fill="none"
            stroke="url(#foldStroke)"
            strokeWidth={1.5}
            opacity={0.5 + Math.sin(frame * 0.02 + i * 0.8) * 0.15}
            filter="url(#glow)"
          />
        ))}

        {/* Dot texture on brain surface */}
        {surfaceDots.map((dot, i) => (
          <circle
            key={`sd${i}`}
            cx={dot.dx} cy={dot.dy}
            r={0.8 + (i % 3) * 0.3}
            fill={i % 3 === 0 ? "#00ccff" : i % 3 === 1 ? "#7744dd" : "#0088ff"}
            opacity={dot.op}
          />
        ))}

        {/* Traveling light pulses on waves */}
        {pulseDots.map((p, i) => (
          <circle
            key={`pd${i}`}
            cx={p.wx} cy={p.wy}
            r={p.size}
            fill={p.color}
            opacity={Math.max(0, p.opacity)}
            filter="url(#dotGlow)"
          />
        ))}

        {/* Scattered star particles */}
        {Array.from({ length: 40 }).map((_, i) => {
          const sx = ((i * 89 + frame * 0.08) % width);
          const sy = ((i * 163 + Math.sin(frame * 0.012 + i) * 15) % height);
          const sop = 0.15 + Math.sin(frame * 0.04 + i * 2.3) * 0.25;
          return (
            <circle
              key={`st${i}`}
              cx={sx} cy={sy}
              r={0.8 + (i % 3) * 0.4}
              fill="#ffffff"
              opacity={Math.max(0, sop)}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
