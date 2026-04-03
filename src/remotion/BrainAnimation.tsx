import { useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";

/**
 * Animated AI brain with wavy particle lines and glowing light points.
 * Renders as a Remotion composition for the homepage hero.
 */

// Brain outline path data — simplified brain silhouette
function getBrainPoints(cx: number, cy: number, scale: number): [number, number][] {
  const raw: [number, number][] = [
    [-0.45, -0.1], [-0.42, -0.35], [-0.35, -0.5], [-0.2, -0.6],
    [-0.05, -0.62], [0.05, -0.62], [0.2, -0.6], [0.35, -0.5],
    [0.42, -0.35], [0.45, -0.1], [0.43, 0.1], [0.38, 0.28],
    [0.3, 0.4], [0.18, 0.48], [0.05, 0.5], [-0.05, 0.5],
    [-0.18, 0.48], [-0.3, 0.4], [-0.38, 0.28], [-0.43, 0.1],
  ];
  return raw.map(([x, y]) => [cx + x * scale, cy + y * scale]);
}

function getBrainFolds(cx: number, cy: number, scale: number): [number, number][][] {
  const folds: [number, number][][] = [
    // Central sulcus
    [[-0.02, -0.55], [-0.03, -0.3], [0.0, -0.05], [0.02, 0.2], [0.0, 0.45]],
    // Left lateral
    [[-0.35, -0.3], [-0.25, -0.15], [-0.15, -0.05], [-0.2, 0.15], [-0.3, 0.3]],
    // Right lateral
    [[0.35, -0.3], [0.25, -0.15], [0.15, -0.05], [0.2, 0.15], [0.3, 0.3]],
    // Upper left
    [[-0.3, -0.45], [-0.15, -0.4], [-0.05, -0.35]],
    // Upper right
    [[0.3, -0.45], [0.15, -0.4], [0.05, -0.35]],
    // Lower curves
    [[-0.15, 0.2], [0.0, 0.25], [0.15, 0.2]],
    [[-0.25, -0.05], [-0.1, 0.05], [0.1, 0.05], [0.25, -0.05]],
  ];
  return folds.map(fold =>
    fold.map(([x, y]) => [cx + x * scale, cy + y * scale])
  );
}

export const BrainAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const cx = width / 2;
  const cy = height / 2;
  const brainScale = Math.min(width, height) * 0.85;

  const brainOutline = getBrainPoints(cx, cy, brainScale);
  const folds = getBrainFolds(cx, cy, brainScale);

  // Wave parameters
  const numWaves = 8;
  const waveLines: { y: number; amplitude: number; frequency: number; phase: number; color: string }[] = [];
  for (let i = 0; i < numWaves; i++) {
    const t = i / (numWaves - 1);
    waveLines.push({
      y: height * 0.2 + t * height * 0.6,
      amplitude: 15 + Math.sin(i * 1.3) * 10,
      frequency: 0.008 + i * 0.001,
      phase: i * 0.7,
      color: i % 3 === 0 ? 'rgba(0, 97, 255, 0.3)' : i % 3 === 1 ? 'rgba(0, 212, 255, 0.25)' : 'rgba(140, 80, 220, 0.2)',
    });
  }

  // Generate wave path
  function wavePath(baseY: number, amp: number, freq: number, phase: number, time: number): string {
    const points: string[] = [];
    for (let x = 0; x <= width; x += 3) {
      const y = baseY + Math.sin(x * freq + phase + time * 0.03) * amp
        + Math.sin(x * freq * 0.5 + phase * 1.3 + time * 0.02) * amp * 0.5;
      points.push(`${x},${y}`);
    }
    return `M${points.join(' L')}`;
  }

  // Light points traveling along waves
  const numPulses = 24;
  const pulses: { waveIdx: number; xProgress: number; size: number; brightness: number }[] = [];
  for (let i = 0; i < numPulses; i++) {
    const waveIdx = i % numWaves;
    const speed = 0.8 + (i % 5) * 0.3;
    const xProgress = ((i * 137.5 + frame * speed) % (width + 100)) / width;
    pulses.push({
      waveIdx,
      xProgress,
      size: 2 + (i % 3),
      brightness: 0.6 + Math.sin(frame * 0.05 + i) * 0.4,
    });
  }

  // Brain outline SVG path
  function pointsToPath(pts: [number, number][], closed = true): string {
    if (pts.length < 2) return '';
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cpx1 = prev[0] + (curr[0] - prev[0]) * 0.5;
      const cpy1 = prev[1];
      const cpx2 = prev[0] + (curr[0] - prev[0]) * 0.5;
      const cpy2 = curr[1];
      d += ` C${cpx1},${cpy1} ${cpx2},${cpy2} ${curr[0]},${curr[1]}`;
    }
    if (closed) d += 'Z';
    return d;
  }

  // Brain glow pulse
  const glowIntensity = 0.4 + Math.sin(frame * 0.03) * 0.15;

  return (
    <AbsoluteFill style={{ backgroundColor: '#080c24' }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          {/* Brain glow filter */}
          <filter id="brainGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Pulse glow */}
          <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Radial brain gradient */}
          <radialGradient id="brainGrad" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor={`rgba(0, 180, 255, ${glowIntensity * 0.3})`} />
            <stop offset="50%" stopColor={`rgba(100, 40, 200, ${glowIntensity * 0.2})`} />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* Background subtle grid */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`vg${i}`}
            x1={i * (width / 20)} y1={0}
            x2={i * (width / 20)} y2={height}
            stroke="rgba(0, 97, 255, 0.03)" strokeWidth={0.5}
          />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <line
            key={`hg${i}`}
            x1={0} y1={i * (height / 15)}
            x2={width} y2={i * (height / 15)}
            stroke="rgba(0, 97, 255, 0.03)" strokeWidth={0.5}
          />
        ))}

        {/* Brain glow background */}
        <ellipse
          cx={cx} cy={cy}
          rx={brainScale * 0.35} ry={brainScale * 0.4}
          fill="url(#brainGrad)"
          opacity={glowIntensity}
        />

        {/* Wave lines */}
        {waveLines.map((wave, i) => (
          <path
            key={`wave${i}`}
            d={wavePath(wave.y, wave.amplitude, wave.frequency, wave.phase, frame)}
            fill="none"
            stroke={wave.color}
            strokeWidth={1.2}
          />
        ))}

        {/* Brain outline */}
        <path
          d={pointsToPath(brainOutline)}
          fill="none"
          stroke={`rgba(0, 180, 255, ${0.5 + glowIntensity * 0.3})`}
          strokeWidth={2}
          filter="url(#brainGlow)"
        />

        {/* Brain folds */}
        {folds.map((fold, i) => (
          <path
            key={`fold${i}`}
            d={pointsToPath(fold, false)}
            fill="none"
            stroke={`rgba(100, 160, 255, ${0.3 + glowIntensity * 0.2})`}
            strokeWidth={1.2}
            filter="url(#brainGlow)"
          />
        ))}

        {/* Light pulses on waves */}
        {pulses.map((pulse, i) => {
          const wave = waveLines[pulse.waveIdx];
          const x = pulse.xProgress * width;
          const y = wave.y +
            Math.sin(x * wave.frequency + wave.phase + frame * 0.03) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + wave.phase * 1.3 + frame * 0.02) * wave.amplitude * 0.5;
          const colors = ['#0061ff', '#00d4ff', '#8c50dc'];
          const color = colors[i % colors.length];

          return (
            <circle
              key={`pulse${i}`}
              cx={x} cy={y}
              r={pulse.size}
              fill={color}
              opacity={pulse.brightness}
              filter="url(#pulseGlow)"
            />
          );
        })}

        {/* Scattered star particles */}
        {Array.from({ length: 30 }).map((_, i) => {
          const px = ((i * 97 + frame * 0.1) % width);
          const py = ((i * 157 + Math.sin(frame * 0.01 + i) * 20) % height);
          const opacity = 0.2 + Math.sin(frame * 0.05 + i * 2) * 0.3;
          return (
            <circle
              key={`star${i}`}
              cx={px} cy={py}
              r={1}
              fill="#ffffff"
              opacity={Math.max(0, opacity)}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
