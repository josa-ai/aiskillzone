# JOSA.AI Hero Animation Specification
## Remotion Video Component for Homepage

**Document Version:** 1.0
**Created:** 2026-03-25
**Status:** Production Ready
**Framework:** Remotion (React-based video)
**Integration:** Next.js 14+ with TypeScript

---

## 1. OVERVIEW & CREATIVE DIRECTION

### 1.1 Animation Purpose
The hero animation visually communicates JOSA.AI's core value proposition: "We don't just talk about AI. We build it into your business." It should feel modern, professional, and warm—reflecting the brand's approachable expertise in AI implementation for Central Florida small businesses.

### 1.2 Recommended Approach: "Circuit to Solution" Flow
This approach best captures the brand narrative of building and delivering AI solutions:

**Flow Structure:**
- **Phase 1 (0-2s):** Abstract circuit/neural network lines animate across the screen, establishing technology aesthetic
- **Phase 2 (2-5s):** Lines converge to form four business service icons representing core offerings
- **Phase 3 (5-7s):** Icons pulse with brand glow; text reveals in two stages
- **Phase 4 (7-9s):** CTA button animates in
- **Phase 5 (9-10s):** Transition back to flowing lines for seamless loop

**Total Duration:** 10 seconds (seamless loop)

---

## 2. TECHNICAL SPECIFICATIONS

### 2.1 Video Format & Rendering
- **Framework:** Remotion (React video library)
- **Resolution:** 1920 × 1080px (Full HD)
- **Frame Rate:** 30fps
- **Duration:** 10 seconds (300 frames)
- **Aspect Ratio:** 16:9
- **Color Space:** sRGB
- **Responsive:** Scales proportionally down to mobile (320px minimum width)

### 2.2 Playback & Integration
- **Playback Method:** @remotion/player (in-browser, no video file generation)
- **Lazy Loading:** Component loads only when entering viewport
- **SSR Fallback:** Static image fallback for server-side rendering
- **Accessibility:** Respects `prefers-reduced-motion` media query
- **Performance:** Non-blocking, pauses when off-screen

### 2.3 Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 3. COLOR PALETTE & DESIGN TOKENS

### 3.1 Brand Colors
```
PRIMARY PURPLES:
  Midnight Plum:    #421C52   (Darkest, headers, text)
  Royal Purple:     #8D4BBB   (Primary accent, glows)
  Mauve Purple:     #A882EE   (Secondary accent, highlights)
  Soft Lavender:    #E3D4F3   (Light backgrounds, subtle accents)

BLUES:
  Deep Navy:        #1E3A8A   (Dark backgrounds, contrast)
  Tech Blue:        #3B82F6   (Accent lines, highlights)
  Cool Azure:       #93C5FD   (Circuit lines, primary animation)
  Frosted Blue:     #DAF0FF   (Light accents, glow overlays)
```

### 3.2 Color Usage in Animation
- **Circuit Lines:** Cool Azure (#93C5FD) with Tech Blue (#3B82F6) accents
- **Icon Backgrounds:** Royal Purple (#8D4BBB) with Soft Lavender (#E3D4F3) borders
- **Glow Effects:** Tech Blue (#3B82F6) and Royal Purple (#8D4BBB)
- **Text:** Midnight Plum (#421C52) on Soft Lavender backgrounds
- **CTA Button:** Tech Blue (#3B82F6) with Midnight Plum text
- **Gradient Overlays:** Cool Azure → Tech Blue → Royal Purple

---

## 4. SCENE-BY-SCENE BREAKDOWN

### 4.1 PHASE 1: Circuit Flow Introduction (0-60 frames / 0-2.0s)

**Visual Description:**
Abstract neural network/circuit board lines flow across the screen from left to right, creating a sense of digital energy and technological flow.

**Animation Details:**

| Element | Start | Duration | Effect | Notes |
|---------|-------|----------|--------|-------|
| Background | 0fr | 300fr | Deep Navy base | Solid color, consistent throughout |
| Circuit Line 1 | 0fr | 45fr | Opacity: 0→1, X: -200→+300 | Cool Azure, 3px width, ease-in-out-cubic |
| Circuit Line 2 | 15fr | 45fr | Opacity: 0→1, X: -150→+350 | Tech Blue, offset from Line 1, slight curve |
| Circuit Line 3 | 30fr | 45fr | Opacity: 0→1, X: -100→+400 | Cool Azure with pulse effect |
| Circuit Line 4 | 45fr | 45fr | Opacity: 0→1, X: -50→+450 | Tech Blue, completes initial wave |
| Glow Overlay | 0fr | 60fr | Opacity: 0→0.3, then 0.3→0 | Frosted Blue, soft radial gradient |

**Easing Curves:**
- Line movement: `easeInOutCubic` (smooth acceleration/deceleration)
- Opacity changes: `easeInOutQuad` (gentle fade in/out)
- Glow: `easeOutQuad`

**Frame-by-Frame Timing:**
```
Frame 0-15:   Line 1 enters (Cool Azure)
Frame 15-30:  Line 2 enters (Tech Blue)
Frame 30-45:  Line 3 enters (Cool Azure with pulse)
Frame 45-60:  Line 4 enters (Tech Blue); glow fades
```

**Code Example:**
```tsx
import { interpolate, Easing } from "remotion";

<motion.path
  d="M 0 540 Q 480 300 1920 540"
  stroke="#93C5FD"
  strokeWidth={3}
  fill="none"
  opacity={interpolate(
    frame,
    [0, 15],
    [0, 1],
    { easing: Easing.inOutQuad }
  )}
  style={{
    transform: `translateX(${interpolate(
      frame,
      [0, 45],
      [-200, 300],
      { easing: Easing.inOutCubic }
    )}px)`
  }}
/>
```

---

### 4.2 PHASE 2: Convergence & Icon Formation (60-180 frames / 2.0-6.0s)

**Visual Description:**
Circuit lines converge toward the center of the screen and transform into four distinct business service icons. Each icon represents a core JOSA.AI service offering.

**Service Icons:**
1. **Phone/Communication:** Incoming call icon with ringing wave
2. **Website/Web Presence:** Modern responsive device icon
3. **Automation:** Gear/cog system icon
4. **Learning/Education:** Graduation cap or brain icon

**Animation Details:**

| Element | Start | Duration | Effect | Notes |
|---------|-------|----------|--------|-------|
| Lines Converge | 60fr | 30fr | Move to center, opacity fade | All 4 lines converge smoothly |
| Icon 1 (Phone) | 75fr | 45fr | Scale: 0→1, Opacity: 0→1 | Positioned at -30%, +15% offset |
| Icon 2 (Website) | 85fr | 45fr | Scale: 0→1, Opacity: 0→1 | Positioned at +30%, +15% offset |
| Icon 3 (Gear) | 95fr | 45fr | Scale: 0→1, Opacity: 0→1 | Positioned at -30%, -15% offset |
| Icon 4 (Learning) | 105fr | 45fr | Scale: 0→1, Opacity: 0→1 | Positioned at +30%, -15% offset |
| Icon Backgrounds | 90fr | 150fr | Rotate: 0→360° (pulse) | Subtle rotation, 1 rotation per 3s |

**Icon Specifications:**
```
Icon Size (Center):     120px × 120px
Icon Color:             Soft Lavender (#E3D4F3)
Icon Stroke:            Mauve Purple (#A882EE), 2px
Background Circle:      Royal Purple (#8D4BBB) with 0.8 opacity
Positioning:            Arranged in 2×2 grid, centered on canvas
Spacing:                480px apart (horizontal), 360px apart (vertical)
```

**Easing Curves:**
- Icon scale-in: `easeOutElastic` (bouncy, approachable feel)
- Icon opacity: `easeInOutQuad`
- Rotation: `easeLinear` (constant, hypnotic)

**Frame-by-Frame Timing:**
```
Frame 60-90:   Lines converge to center
Frame 75-120:  Icon 1 (Phone) scales and fades in
Frame 85-130:  Icon 2 (Website) scales and fades in
Frame 95-140:  Icon 3 (Gear) scales and fades in
Frame 105-150: Icon 4 (Learning) scales and fades in
Frame 90-240:  Icons rotate continuously (pulse effect)
```

**Code Example:**
```tsx
const iconPositions = [
  { x: -240, y: -180 }, // Phone (top-left)
  { x: 240, y: -180 },  // Website (top-right)
  { x: -240, y: 180 },  // Gear (bottom-left)
  { x: 240, y: 180 }    // Learning (bottom-right)
];

{iconPositions.map((pos, idx) => (
  <g key={idx}>
    <circle
      cx={960 + pos.x}
      cy={540 + pos.y}
      r={60}
      fill="#8D4BBB"
      opacity={interpolate(
        frame,
        [60 + idx * 10, 105 + idx * 10],
        [0, 0.8],
        { easing: Easing.inOutQuad }
      )}
    />
    <g
      style={{
        transform: `scale(${interpolate(
          frame,
          [75 + idx * 10, 120 + idx * 10],
          [0, 1],
          { easing: Easing.outElastic(1.2) }
        )})`,
        opacity: interpolate(
          frame,
          [75 + idx * 10, 120 + idx * 10],
          [0, 1]
        )
      }}
    >
      {/* Icon SVG here */}
    </g>
  </g>
))}
```

---

### 4.3 PHASE 3: Icon Pulse & Text Reveal (180-240 frames / 6.0-8.0s)

**Visual Description:**
Icons settle and pulse with a Royal Purple glow. Simultaneously, the positioning statement animates in via text reveal.

**Text Content:**
```
Line 1: "We don't just talk about AI."
Line 2: "We build it into your business."
```

**Animation Details:**

| Element | Start | Duration | Effect | Notes |
|---------|-------|----------|--------|-------|
| Icon Pulse | 180fr | 120fr | Glow: 0→20px→0, Repeat 2x | Royal Purple outer glow |
| Text Line 1 | 180fr | 30fr | Opacity: 0→1, X: -100→0 | Slide in from left |
| Text Line 2 | 210fr | 30fr | Opacity: 0→1, X: -100→0 | Slide in from left, 1s delay |

**Text Specifications:**
```
Font:           Inter or -apple-system (sans-serif)
Weight:         400 (regular) for body, 600 for emphasis
Size:
  - Desktop:    48px line 1, 48px line 2
  - Tablet:     36px / 36px
  - Mobile:     28px / 28px
Line Height:    1.3
Color:          Midnight Plum (#421C52)
Background:     Soft Lavender (#E3D4F3), 90% opacity
Padding:        20px 40px (desktop), 16px 24px (mobile)
Border Radius:  8px
Max Width:      600px
```

**Easing Curves:**
- Text opacity: `easeOutQuad`
- Text slide-in: `easeOutCubic`
- Glow pulse: `easeInOutQuad`

**Frame-by-Frame Timing:**
```
Frame 180-200: Icons begin glow pulse
Frame 180-210: Text Line 1 fades and slides in
Frame 210-240: Text Line 2 fades and slides in
Frame 180-240: Icons continue subtle pulse rotation
```

**Code Example:**
```tsx
// Icon Glow Effect
const glowRadius = interpolate(
  (frame - 180) % 60, // Create pulsing effect
  [0, 30, 60],
  [0, 20, 0],
  { easing: Easing.inOutQuad }
);

<filter id="iconGlow">
  <feGaussianBlur stdDeviation={glowRadius} result="coloredBlur" />
  <feMerge>
    <feMergeNode in="coloredBlur" />
    <feMergeNode in="SourceGraphic" />
  </feMerge>
</filter>

// Text Animation
<motion.div
  style={{
    opacity: interpolate(
      frame,
      [180, 210],
      [0, 1],
      { easing: Easing.outQuad }
    ),
    transform: `translateX(${interpolate(
      frame,
      [180, 210],
      [-100, 0],
      { easing: Easing.outCubic }
    )}px)`
  }}
>
  We don't just talk about AI.
</motion.div>

<motion.div
  style={{
    opacity: interpolate(
      frame,
      [210, 240],
      [0, 1],
      { easing: Easing.outQuad }
    ),
    transform: `translateX(${interpolate(
      frame,
      [210, 240],
      [-100, 0],
      { easing: Easing.outCubic }
    )}px)`
  }}
>
  We build it into your business.
</motion.div>
```

---

### 4.4 PHASE 4: CTA Button Entrance (240-270 frames / 8.0-9.0s)

**Visual Description:**
A call-to-action button animates in below the text, inviting user engagement.

**CTA Button Specification:**
```
Text:           "Start Your AI Journey"
Background:     Tech Blue (#3B82F6)
Text Color:     White (#FFFFFF)
Border:         2px Mauve Purple (#A882EE)
Padding:        16px 32px
Border Radius:  6px
Font Size:      18px (desktop), 16px (mobile)
Font Weight:    600
Shadow:         0 4px 12px rgba(59, 130, 246, 0.3)

Hover State (not in animation):
  - Background: Royal Purple (#8D4BBB)
  - Shadow: 0 6px 16px rgba(141, 75, 187, 0.4)
  - Transform: translateY(-2px)
```

**Animation Details:**

| Element | Start | Duration | Effect | Notes |
|---------|-------|----------|--------|-------|
| CTA Button | 240fr | 30fr | Scale: 0→1, Opacity: 0→1 | Bouncy entrance |
| CTA Glow | 240fr | 30fr | Glow: 0→8px | Tech Blue glow |

**Easing Curves:**
- Button scale: `easeOutElastic` (bouncy, engaging)
- Button opacity: `easeOutQuad`
- Glow: `easeOutQuad`

**Code Example:**
```tsx
<motion.button
  style={{
    scale: interpolate(
      frame,
      [240, 270],
      [0, 1],
      { easing: Easing.outElastic(1.2) }
    ),
    opacity: interpolate(
      frame,
      [240, 270],
      [0, 1],
      { easing: Easing.outQuad }
    ),
    boxShadow: `0 4px ${interpolate(
      frame,
      [240, 270],
      [0, 12]
    )}px rgba(59, 130, 246, 0.3)`
  }}
  onMouseEnter={() => {
    // Hover effect handled by CSS
  }}
>
  Start Your AI Journey
</motion.button>
```

---

### 4.5 PHASE 5: Loop Transition (270-300 frames / 9.0-10.0s)

**Visual Description:**
All elements fade out smoothly, and the circuit lines reappear for a seamless loop back to Phase 1.

**Animation Details:**

| Element | Start | Duration | Effect | Notes |
|---------|-------|----------|--------|-------|
| Text | 270fr | 15fr | Opacity: 1→0 | Fade out |
| CTA Button | 270fr | 15fr | Opacity: 1→0, Scale: 1→0.8 | Fade and scale down |
| Icons | 270fr | 20fr | Opacity: 0.8→0, Rotate: stop | Icons fade away |
| Circuit Lines | 280fr | 20fr | Opacity: 0→0.8 | New circuit lines fade in |
| Background Glow | 270fr | 30fr | Opacity: 0→0.2 | Transition glow |

**Easing Curves:**
- All fade-outs: `easeInQuad`
- Scale down: `easeInCubic`

**Code Example:**
```tsx
// Loop transition - resets to frame 0
const displayFrame = frame % 300; // Creates seamless loop

if (displayFrame >= 270) {
  // Fade out all content
  const transitionProgress = (displayFrame - 270) / 30;

  return (
    <div style={{ opacity: 1 - transitionProgress }}>
      {/* Text fades */}
      {/* Button fades */}
      {/* Icons fade */}
    </div>
  );
}
```

---

## 5. ANIMATION TIMING & EASING REFERENCE

### 5.1 Easing Functions to Implement

```typescript
// Easing utilities for Remotion
import { Easing } from 'remotion';

const EASING = {
  // Smooth, natural motion
  in: Easing.inQuad,
  out: Easing.outQuad,
  inOut: Easing.inOutQuad,

  // Cubic for smoother curves
  inCubic: Easing.inCubic,
  outCubic: Easing.outCubic,
  inOutCubic: Easing.inOutCubic,

  // Elastic for bouncy, engaging feel
  outElastic: (bounciness = 1.2) =>
    Easing.outElastic(bounciness),

  // Linear for constant rotation
  linear: Easing.linear,

  // Custom bezier curves
  customFlow: Easing.bezier(0.25, 0.46, 0.45, 0.94),
};
```

### 5.2 Complete Timeline View

```
TIME     FRAME    PHASE                ELEMENTS
-------  -------  -------------------  ----------------------
0.0s     0fr      Circuit Intro        Lines flow in
1.0s     30fr     Circuit Intro        Lines continue flowing
2.0s     60fr     Convergence          Lines begin converging
3.0s     90fr     Icon Formation       All 4 icons visible
4.0s     120fr    Icon Pulse           Icons settling
5.0s     150fr    Icon Pulse           Icons pulsing
6.0s     180fr    Text Reveal          Text Line 1 appears
7.0s     210fr    Text Reveal          Text Line 2 appears
8.0s     240fr    CTA Entrance         Button bounces in
9.0s     270fr    Loop Transition      Elements fade out
10.0s    300fr    Loop Reset           Back to Frame 0
```

---

## 6. RESPONSIVE DESIGN BEHAVIOR

### 6.1 Viewport-Based Scaling

The animation scales responsively while maintaining visual integrity:

```typescript
// Responsive sizing logic
const containerWidth = typeof window !== 'undefined'
  ? window.innerWidth
  : 1920;

const scale = Math.min(
  containerWidth / 1920,
  1 // Cap at 1 for desktop
);

const responsiveValues = {
  iconSize: 120 * scale,
  textSize: 48 * scale,
  lineWidth: 3 * scale,
  glowRadius: 20 * scale,
};
```

### 6.2 Breakpoint-Specific Adjustments

| Breakpoint | Width | Adjustments |
|-----------|-------|-------------|
| **Mobile** | < 640px | Text: 28px, Icons: 80px, Layout: vertical stack |
| **Tablet** | 640-1024px | Text: 36px, Icons: 100px, Layout: 2×2 grid (reduced spacing) |
| **Desktop** | > 1024px | Text: 48px, Icons: 120px, Layout: full 2×2 grid |

### 6.3 Responsive Styles Example

```tsx
const getResponsiveStyles = (width: number) => {
  if (width < 640) {
    return {
      textSize: 28,
      iconSize: 80,
      iconSpacing: 200,
      buttonFontSize: 16,
    };
  } else if (width < 1024) {
    return {
      textSize: 36,
      iconSize: 100,
      iconSpacing: 320,
      buttonFontSize: 18,
    };
  } else {
    return {
      textSize: 48,
      iconSize: 120,
      iconSpacing: 480,
      buttonFontSize: 18,
    };
  }
};
```

---

## 7. PERFORMANCE OPTIMIZATION

### 7.1 Rendering Strategy

- **Composition Splitting:** Break animation into smaller sub-components (CircuitFlow, ServiceIcons, TextReveal, CTAButton)
- **Lazy Loading:** Load Remotion Player only when HeroAnimation component enters viewport
- **Code Splitting:** Use dynamic imports for Remotion dependencies
- **Memoization:** Wrap sub-components with `React.memo()` to prevent unnecessary re-renders

### 7.2 Memory Management

```typescript
// Lazy load Remotion Player only in browser
const RemotionPlayer = dynamic(
  () => import('@remotion/player').then(mod => ({
    default: mod.Player
  })),
  { ssr: false, loading: () => <FallbackImage /> }
);

// Memoize animation components
export const CircuitFlow = React.memo(({ duration }) => {
  return (/* Circuit animation */);
});
```

### 7.3 Performance Checklist

- [ ] No inline function definitions inside `<AbsoluteFill>`
- [ ] Use `useMemo()` for complex calculations
- [ ] Avoid re-rendering sub-compositions on frame updates
- [ ] Keep SVG path definitions simple (avoid extremely complex curves)
- [ ] Use CSS transforms instead of layout changes
- [ ] Test with DevTools Performance tab: target < 60fps

### 7.4 File Size Targets

- **Remotion Component Bundle:** < 150KB (gzipped)
- **Fallback Image:** < 50KB (webp format recommended)
- **Total Impact:** < 200KB

---

## 8. ACCESSIBILITY FEATURES

### 8.1 Respects prefers-reduced-motion

```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// If prefers-reduced-motion is set, show static image instead
export const HeroAnimation = ({ fallbackImage }) => {
  if (prefersReducedMotion) {
    return <img src={fallbackImage} alt="JOSA.AI - AI for Small Business" />;
  }

  return <RemotionPlayer {...playerProps} />;
};
```

### 8.2 Semantic HTML & ARIA

```tsx
<section
  role="banner"
  aria-label="JOSA.AI Hero - AI Solutions for Your Business"
>
  <HeroAnimation
    fallbackImage="/images/hero-fallback.jpg"
    aria-hidden="true" // Animation is decorative, not essential content
  />
  <h1 className="sr-only">
    We don't just talk about AI. We build it into your business.
  </h1>
</section>
```

### 8.3 Keyboard Navigation

- CTA button must be keyboard-accessible (Tab, Enter)
- Focus visible state for keyboard users
- No keyboard traps

---

## 9. FALLBACK IMAGE SPECIFICATIONS

### 9.1 Fallback Image

For SSR, slow connections, and devices with `prefers-reduced-motion`:

```
Filename:       hero-fallback.jpg (or .webp)
Dimensions:     1920 × 1080px
Format:         WEBP (primary), JPEG (fallback)
Size:           30-50KB
Content:
  - Static frame capturing Phase 3 state (icons visible, text visible)
  - All 4 service icons displayed
  - Positioning text ("We don't just talk..." / "We build it...")
  - CTA button visible
  - Same color palette and layout as animation
```

**Implementation:**
```tsx
<picture>
  <source srcSet="/images/hero-fallback.webp" type="image/webp" />
  <img
    src="/images/hero-fallback.jpg"
    alt="JOSA.AI - We build AI into your business"
    width={1920}
    height={1080}
  />
</picture>
```

---

## 10. INTEGRATION WITH NEXT.JS

### 10.1 Component Structure

```
src/
├── remotion/
│   ├── HeroComposition.tsx          # Main Remotion composition (300 frames)
│   ├── scenes/
│   │   ├── CircuitFlow.tsx          # Phase 1: Circuit lines (0-60fr)
│   │   ├── ServiceIcons.tsx         # Phase 2-3: Icons & pulse (60-240fr)
│   │   ├── TextReveal.tsx           # Phase 3: Text animation (180-240fr)
│   │   ├── CTAButton.tsx            # Phase 4: Button entrance (240-270fr)
│   │   └── LoopTransition.tsx       # Phase 5: Loop reset (270-300fr)
│   └── constants.ts                 # Colors, timing, config
├── components/
│   └── HeroAnimation.tsx             # Next.js wrapper with Player
└── pages/
    └── index.tsx                     # Homepage
```

### 10.2 HeroComposition.tsx

```typescript
import React from 'react';
import { Composition, SequenceGroup } from 'remotion';
import CircuitFlow from '../scenes/CircuitFlow';
import ServiceIcons from '../scenes/ServiceIcons';
import TextReveal from '../scenes/TextReveal';
import CTAButton from '../scenes/CTAButton';
import LoopTransition from '../scenes/LoopTransition';
import { COMPOSITION_CONFIG } from './constants';

export const HeroComposition = () => {
  return (
    <Composition
      id="HeroAnimation"
      component={HeroScene}
      durationInFrames={COMPOSITION_CONFIG.TOTAL_FRAMES}
      fps={COMPOSITION_CONFIG.FPS}
      width={COMPOSITION_CONFIG.WIDTH}
      height={COMPOSITION_CONFIG.HEIGHT}
    />
  );
};

const HeroScene = ({ frame }: { frame: number }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.deepNavy,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%,
            ${COLORS.deepNavy} 0%,
            #0f0f1e 100%)`,
        }}
      />

      {/* Phase 1: Circuit Flow */}
      <CircuitFlow frame={frame} />

      {/* Phase 2-3: Service Icons */}
      <ServiceIcons frame={frame} />

      {/* Phase 3: Text */}
      <TextReveal frame={frame} />

      {/* Phase 4: CTA Button */}
      <CTAButton frame={frame} />

      {/* Phase 5: Loop Transition */}
      <LoopTransition frame={frame} />
    </div>
  );
};
```

### 10.3 HeroAnimation.tsx (Next.js Wrapper)

```typescript
'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { COMPOSITION_CONFIG } from '@/remotion/constants';

// Lazy load Remotion Player (no SSR)
const Player = dynamic(
  () => import('@remotion/player').then(mod => ({
    default: mod.Player
  })),
  {
    ssr: false,
    loading: () => <HeroFallback />
  }
);

const HeroComposition = dynamic(
  () => import('@/remotion/HeroComposition').then(
    mod => ({ default: mod.HeroComposition })
  ),
  { ssr: false }
);

interface HeroAnimationProps {
  className?: string;
  fallbackImage?: string;
}

export const HeroAnimation = ({
  className = 'w-full h-[600px]',
  fallbackImage = '/images/hero-fallback.jpg'
}: HeroAnimationProps) => {
  const [isInViewport, setIsInViewport] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('hero-animation-root');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Show static fallback if motion is disabled
  if (prefersReducedMotion) {
    return <HeroFallback fallbackImage={fallbackImage} />;
  }

  return (
    <div
      id="hero-animation-root"
      className={className}
      role="banner"
      aria-label="JOSA.AI Hero - AI Solutions for Your Business"
    >
      {isInViewport ? (
        <Player
          component={HeroComposition}
          durationInFrames={COMPOSITION_CONFIG.TOTAL_FRAMES}
          fps={COMPOSITION_CONFIG.FPS}
          controls
          loop
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      ) : (
        <HeroFallback fallbackImage={fallbackImage} />
      )}
    </div>
  );
};

const HeroFallback = ({ fallbackImage }: { fallbackImage?: string }) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#1E3A8A] to-[#0f0f1e]">
      {fallbackImage && (
        <Image
          src={fallbackImage}
          alt="JOSA.AI - We build AI into your business"
          fill
          className="object-cover"
          priority
        />
      )}
    </div>
  );
};

export default HeroAnimation;
```

### 10.4 constants.ts

```typescript
export const COMPOSITION_CONFIG = {
  WIDTH: 1920,
  HEIGHT: 1080,
  FPS: 30,
  TOTAL_FRAMES: 300, // 10 seconds at 30fps
  DURATION_SECONDS: 10,
};

export const COLORS = {
  midnightPlum: '#421C52',
  royalPurple: '#8D4BBB',
  mauvePurple: '#A882EE',
  softLavender: '#E3D4F3',
  deepNavy: '#1E3A8A',
  techBlue: '#3B82F6',
  coolAzure: '#93C5FD',
  frostedBlue: '#DAF0FF',
};

export const PHASE_TIMING = {
  CIRCUIT_INTRO: { start: 0, end: 60 },        // 0-2s
  CONVERGENCE: { start: 60, end: 90 },         // 2-3s
  ICON_FORMATION: { start: 90, end: 180 },     // 3-6s
  ICON_PULSE: { start: 180, end: 240 },        // 6-8s
  TEXT_REVEAL: { start: 180, end: 240 },       // 6-8s (overlap)
  CTA_ENTRANCE: { start: 240, end: 270 },      // 8-9s
  LOOP_TRANSITION: { start: 270, end: 300 },   // 9-10s
};

export const TEXT_CONTENT = {
  line1: "We don't just talk about AI.",
  line2: "We build it into your business.",
  ctaButton: "Start Your AI Journey",
};

export const SERVICE_ICONS = [
  { id: 'phone', label: 'Communication', position: 'top-left' },
  { id: 'website', label: 'Web Presence', position: 'top-right' },
  { id: 'gear', label: 'Automation', position: 'bottom-left' },
  { id: 'learning', label: 'Education', position: 'bottom-right' },
];
```

### 10.5 Usage in Homepage

```tsx
// pages/index.tsx or app/page.tsx
import HeroAnimation from '@/components/HeroAnimation';

export default function Home() {
  return (
    <>
      <HeroAnimation
        className="w-full h-screen md:h-[600px]"
        fallbackImage="/images/hero-fallback.webp"
      />

      {/* Rest of page content */}
      <section className="container mx-auto py-20">
        {/* Services, Features, etc. */}
      </section>
    </>
  );
}
```

---

## 11. DEVELOPMENT WORKFLOW

### 11.1 Setup Instructions

```bash
# Install dependencies
npm install remotion @remotion/player framer-motion

# Development mode
npx remotion studio

# Test responsive behavior
npm run dev -- --mobile
npm run dev -- --tablet
```

### 11.2 Testing Checklist

- [ ] Animation plays smoothly at 30fps
- [ ] Loop is seamless (no frame gaps)
- [ ] Text is readable at all breakpoints
- [ ] Icons are crisp and clear
- [ ] Glow effects are visible but not overwhelming
- [ ] Accessibility: `prefers-reduced-motion` works correctly
- [ ] Performance: No jank on modern devices (target 60fps)
- [ ] Performance: Lazy loads when out of viewport
- [ ] Mobile: Text scales appropriately
- [ ] Mobile: Icons don't overflow viewport
- [ ] Fallback image displays correctly
- [ ] CTA button is clickable and keyboard-accessible

### 11.3 Browser Testing

- [ ] Chrome/Edge 90+
- [ ] Firefox 88+
- [ ] Safari 14+ (Mac and iOS)
- [ ] Mobile Safari (iOS 14+)
- [ ] Android Chrome

---

## 12. DELIVERABLES & FILE STRUCTURE

### 12.1 Required Files

```
/src/
├── remotion/
│   ├── HeroComposition.tsx
│   ├── scenes/
│   │   ├── CircuitFlow.tsx
│   │   ├── ServiceIcons.tsx
│   │   ├── TextReveal.tsx
│   │   ├── CTAButton.tsx
│   │   └── LoopTransition.tsx
│   └── constants.ts
├── components/
│   └── HeroAnimation.tsx
└── pages/
    └── (or app/ for App Router)

/public/
├── images/
│   ├── hero-fallback.webp      (Primary)
│   └── hero-fallback.jpg       (Fallback)
└── icons/
    ├── phone.svg
    ├── website.svg
    ├── gear.svg
    └── learning.svg
```

### 12.2 Deliverable Checklist

- [ ] Remotion composition component (HeroComposition.tsx)
- [ ] Scene sub-components (all phases)
- [ ] Next.js wrapper component (HeroAnimation.tsx)
- [ ] Configuration constants (constants.ts)
- [ ] Fallback static image (WEBP + JPEG)
- [ ] Service icon SVGs
- [ ] Type definitions (TypeScript interfaces)
- [ ] Unit tests (Jest)
- [ ] E2E tests (Cypress or Playwright)
- [ ] Performance benchmarks
- [ ] Accessibility audit report
- [ ] Documentation (this file + inline comments)

---

## 13. MAINTENANCE & ITERATION

### 13.1 Future Enhancements

- [ ] Add audio (subtle background music or sound effects)
- [ ] Add particle effects during icon formation
- [ ] Add mascot robot character (from logo)
- [ ] Add interactive hover states on icons
- [ ] Add analytics tracking (impression, CTA click)
- [ ] Internationalization (multi-language text)

### 13.2 A/B Testing Variants

```
Variant A: Current "Circuit to Solution" (recommended)
Variant B: "Robot Helper" with mascot character
Variant C: "Problems to Solutions" (Option B from brief)
```

### 13.3 Performance Monitoring

- Monitor Core Web Vitals: LCP, FID, CLS
- Track animation completion rate
- Monitor memory usage (memory profiler)
- Test on real devices (not just emulation)

---

## 14. TECHNICAL NOTES & GOTCHAS

### 14.1 Common Issues & Solutions

**Issue:** Animation not looping seamlessly
- **Solution:** Ensure frame 300 matches frame 0 visually; use `frame % 300` for calculations

**Issue:** Glow effects cause performance drop
- **Solution:** Reduce blur stdDeviation on mobile; use `will-change` CSS strategically

**Issue:** Text renders blurry on mobile
- **Solution:** Use minimum font size 14px; consider using bitmap fonts for small sizes

**Issue:** SVG icons don't scale smoothly
- **Solution:** Use `preserveAspectRatio="xMidYMid meet"` on all SVG elements

**Issue:** Animation stutters on Safari
- **Solution:** Enable hardware acceleration; test with reduced motion queries

### 14.2 Browser Compatibility Notes

- **Safari:** Requires specific WebGL context fallback; test glow effects thoroughly
- **Firefox:** SVG filters may have slight performance overhead
- **Mobile Safari:** Test with actual device; emulator may not reflect real performance
- **Android Chrome:** Some devices have limited GPU memory; optimize SVG complexity

### 14.3 Debugging Tips

```typescript
// Log frame information during development
const debugFrame = (frame: number) => {
  if (frame % 30 === 0) {
    console.log(`Frame: ${frame} (${(frame / 30).toFixed(2)}s)`);
  }
};

// Use React DevTools to profile performance
// Install: chrome extension or Firefox addon
// Record performance timeline during playback
```

---

## 15. VERSION HISTORY

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-03-25 | Initial specification | Design System Team |

---

## 16. APPENDIX: COLOR REFERENCE

### 16.1 Color Hex Values

```
#421C52 - Midnight Plum   (RGB: 66, 28, 82)
#8D4BBB - Royal Purple    (RGB: 141, 75, 187)
#A882EE - Mauve Purple    (RGB: 168, 130, 238)
#E3D4F3 - Soft Lavender   (RGB: 227, 212, 243)
#1E3A8A - Deep Navy       (RGB: 30, 58, 138)
#3B82F6 - Tech Blue       (RGB: 59, 130, 246)
#93C5FD - Cool Azure      (RGB: 147, 197, 253)
#DAF0FF - Frosted Blue    (RGB: 218, 240, 255)
```

### 16.2 Gradient Combinations

```
Primary Gradient (Circuit Lines):
  Cool Azure (#93C5FD) → Tech Blue (#3B82F6)

Glow Overlay:
  Frosted Blue (#DAF0FF) radial gradient

Icon Background:
  Royal Purple (#8D4BBB) with Soft Lavender border
```

---

## END OF SPECIFICATION

**Questions or clarifications?** Contact the Design System Team.

**Last Updated:** 2026-03-25
**Status:** Production Ready
**Approval:** Pending Brand Team Review
