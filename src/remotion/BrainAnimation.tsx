import { useCurrentFrame, useVideoConfig, AbsoluteFill, Img, staticFile } from "remotion";

/**
 * Animated brain hero — uses a static brain image as the base,
 * overlays animated traveling light pulses, neural network lines,
 * and glowing particles via SVG.
 */

export const BrainAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Subtle pulsing glow intensity
  const glowPulse = 0.6 + Math.sin(frame * 0.025) * 0.2;

  // Neural network nodes scattered around the brain edges and beyond
  const netNodes: { x: number; y: number; size: number }[] = [];
  const nodeSeeds = [
    [0.08, 0.72], [0.04, 0.55], [0.10, 0.40], [0.15, 0.25],
    [0.06, 0.85], [0.18, 0.90], [0.30, 0.88], [0.25, 0.78],
    [0.35, 0.92], [0.12, 0.60], [0.22, 0.70],
    [0.85, 0.30], [0.90, 0.45], [0.92, 0.60], [0.88, 0.75],
    [0.80, 0.85], [0.75, 0.90], [0.95, 0.55],
    [0.40, 0.95], [0.55, 0.93], [0.65, 0.92], [0.50, 0.88],
    [0.05, 0.30], [0.12, 0.15], [0.25, 0.08], [0.40, 0.05],
    [0.55, 0.06], [0.70, 0.10], [0.82, 0.18],
  ];
  nodeSeeds.forEach(([nx, ny]) => {
    const wobbleX = Math.sin(frame * 0.015 + nx * 20 + ny * 13) * 3;
    const wobbleY = Math.cos(frame * 0.018 + ny * 15 + nx * 9) * 3;
    netNodes.push({
      x: nx * width + wobbleX,
      y: ny * height + wobbleY,
      size: 1.5 + Math.abs(Math.sin(nx * 7 + ny * 5)) * 2,
    });
  });

  // Connect nearby nodes with lines
  const netLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < netNodes.length; i++) {
    for (let j = i + 1; j < netNodes.length; j++) {
      const dx = netNodes[i].x - netNodes[j].x;
      const dy = netNodes[i].y - netNodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < width * 0.22) {
        netLines.push({
          x1: netNodes[i].x, y1: netNodes[i].y,
          x2: netNodes[j].x, y2: netNodes[j].y,
        });
      }
    }
  }

  // Traveling light pulses along network lines
  const numPulses = 20;
  const pulses: { lx: number; ly: number; color: string; size: number; op: number }[] = [];
  for (let i = 0; i < numPulses; i++) {
    if (netLines.length === 0) break;
    const lineIdx = i % netLines.length;
    const line = netLines[lineIdx];
    const speed = 0.005 + (i % 6) * 0.002;
    const progress = ((frame * speed + i * 0.15) % 1);
    const lx = line.x1 + (line.x2 - line.x1) * progress;
    const ly = line.y1 + (line.y2 - line.y1) * progress;
    const colors = ["#00ddff", "#8855ee", "#00aaff", "#bb44ff", "#00ffcc"];
    pulses.push({
      lx, ly,
      color: colors[i % colors.length],
      size: 2 + (i % 3),
      op: 0.5 + Math.sin(frame * 0.06 + i * 2) * 0.35,
    });
  }

  // Sparkle/star particles floating around
  const numStars = 50;
  const stars: { sx: number; sy: number; sr: number; sop: number }[] = [];
  for (let i = 0; i < numStars; i++) {
    const sx = ((i * 83.7 + Math.sin(frame * 0.005 + i * 1.1) * 8) % width + width) % width;
    const sy = ((i * 149.3 + Math.cos(frame * 0.007 + i * 0.9) * 6) % height + height) % height;
    const sr = 0.6 + (i % 4) * 0.5;
    const sop = 0.1 + Math.sin(frame * 0.04 + i * 2.7) * 0.35;
    stars.push({ sx, sy, sr, sop: Math.max(0, sop) });
  }

  // Bright sparkle flashes (cross-shaped)
  const numFlashes = 8;
  const flashes: { fx: number; fy: number; fop: number; fsize: number }[] = [];
  for (let i = 0; i < numFlashes; i++) {
    const fx = ((i * 173 + 50) % width);
    const fy = ((i * 211 + 80) % height);
    const cycle = (frame * 0.02 + i * 1.5) % (Math.PI * 2);
    const fop = Math.max(0, Math.sin(cycle) * 0.6 - 0.2);
    flashes.push({ fx, fy, fop, fsize: 4 + (i % 3) * 3 });
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0820" }}>
      {/* Static brain image as base */}
      <Img
        src={staticFile("images/brain-hero.jpg")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Animated overlay */}
      <AbsoluteFill>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
          style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="sparkGlow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {/* Subtle animated vignette overlay for depth */}
            <radialGradient id="vignette" cx="55%" cy="40%" r="55%">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="70%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor={`rgba(10, 8, 32, ${0.3 + glowPulse * 0.1})`} />
            </radialGradient>
            {/* Pulsing glow behind brain center */}
            <radialGradient id="centerGlow" cx="55%" cy="40%" r="30%">
              <stop offset="0%" stopColor={`rgba(0, 180, 255, ${0.06 * glowPulse})`} />
              <stop offset="50%" stopColor={`rgba(120, 50, 200, ${0.04 * glowPulse})`} />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>

          {/* Subtle pulsing glow over brain area */}
          <rect x={0} y={0} width={width} height={height} fill="url(#centerGlow)" />

          {/* Neural network lines */}
          {netLines.map((l, i) => (
            <line
              key={`nl${i}`}
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke={`rgba(100, 140, 255, ${0.06 + Math.sin(frame * 0.015 + i) * 0.03})`}
              strokeWidth={0.5}
            />
          ))}

          {/* Network nodes */}
          {netNodes.map((n, i) => (
            <circle
              key={`nn${i}`}
              cx={n.x} cy={n.y} r={n.size}
              fill={i % 2 === 0 ? "#4488ff" : "#9955dd"}
              opacity={0.25 + Math.sin(frame * 0.03 + i * 1.7) * 0.15}
              filter="url(#sparkGlow)"
            />
          ))}

          {/* Traveling light pulses */}
          {pulses.map((p, i) => (
            <circle
              key={`tp${i}`}
              cx={p.lx} cy={p.ly}
              r={p.size}
              fill={p.color}
              opacity={Math.max(0, p.op)}
              filter="url(#pulseGlow)"
            />
          ))}

          {/* Star particles */}
          {stars.map((s, i) => (
            <circle
              key={`st${i}`}
              cx={s.sx} cy={s.sy}
              r={s.sr}
              fill="#ffffff"
              opacity={s.sop}
            />
          ))}

          {/* Sparkle flashes (cross-shaped bright stars) */}
          {flashes.map((f, i) => f.fop > 0.05 && (
            <g key={`fl${i}`} opacity={f.fop} filter="url(#pulseGlow)">
              <line
                x1={f.fx - f.fsize} y1={f.fy}
                x2={f.fx + f.fsize} y2={f.fy}
                stroke="#ffffff" strokeWidth={1}
              />
              <line
                x1={f.fx} y1={f.fy - f.fsize}
                x2={f.fx} y2={f.fy + f.fsize}
                stroke="#ffffff" strokeWidth={1}
              />
              <circle cx={f.fx} cy={f.fy} r={1.5} fill="#ffffff" />
            </g>
          ))}

          {/* Vignette overlay */}
          <rect x={0} y={0} width={width} height={height} fill="url(#vignette)" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
