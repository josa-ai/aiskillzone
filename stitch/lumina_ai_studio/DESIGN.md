# Design System Document: High-End AI Consulting Aesthetic

## 1. Overview & Creative North Star

### The Creative North Star: "The Digital Curator"
This design system moves away from the aggressive, dark-mode "tech-bro" aesthetic typical of AI startups. Instead, it embraces the role of a **Digital Curator**: a sophisticated, high-end editorial experience that feels light, airy, and human-centric. 

The goal is to re-imagine complex AI consulting through a lens of clarity and prestige. We achieve this by breaking the "template" look. Instead of rigid, symmetrical grids, we use **intentional asymmetry** and **overlapping elements** to create movement. Typography is treated as a design element itself, utilizing massive scale shifts to establish a clear, authoritative hierarchy. The layout should feel like a premium digital magazine—spacious, intentional, and expensive.

---

## 2. Colors

The palette is anchored in a pristine `background` (#f7f9fb), punctuated by a sophisticated "Blue-Orange-Green" triad that feels vibrant yet professional.

### Surface Hierarchy & Nesting
To achieve a high-end feel, we move beyond flat surfaces. Depth is created through a "Physical Layering" concept.
*   **Layer 0 (Base):** `surface` (#f7f9fb)
*   **Layer 1 (Sectioning):** `surface-container-low` (#f2f4f6)
*   **Layer 2 (Cards/Interaction):** `surface-container-lowest` (#ffffff)
*   **Layer 3 (Floating/Prominent):** `surface-bright` (#f7f9fb)

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders for sectioning or card containment. Boundaries must be defined solely through background color shifts. For example, a `surface-container-lowest` card should sit on a `surface-container-low` background to define its shape. Visual separation is achieved through tonal contrast, not structural lines.

### The "Glass & Gradient" Rule
To bridge the gap between "accessible" and "futuristic," use **Glassmorphism** for floating UI elements (like navigation bars or hovering info chips). 
*   **Glass Specs:** Use `surface` at 70% opacity with a `backdrop-filter: blur(12px)`.
*   **Signature Textures:** Use linear gradients for primary CTAs, transitioning from `primary` (#004bca) to `primary_container` (#0061ff). This adds a "soul" to the UI that flat hex codes cannot provide.

---

## 3. Typography

Our typography strategy uses a "Dual-Typeface High-Contrast" approach. We pair the geometric precision of **Manrope** for high-impact display moments with the industrial clarity of **Inter** for functional reading.

*   **Display & Headlines (Manrope):** These are the "Editorial Voice." Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) to create an authoritative, "New York Times Tech" feel.
*   **Titles & Body (Inter):** These are the "Functional Voice." Inter provides the professional, clean look required for consulting.
*   **Hierarchy Tip:** Never settle for similar sizes. If a Headline is large, the Body text should be significantly smaller to create a "Visual Anchor" effect.

---

## 4. Elevation & Depth

We reject the standard Material Design drop-shadow. Depth must feel ambient and natural.

*   **The Layering Principle:** Stack your surfaces. A white card (`surface-container-lowest`) on a light grey background (`surface-container-low`) provides "Soft Lift."
*   **Ambient Shadows:** If a shadow is required for a floating state, it must be nearly invisible. 
    *   *Spec:* `box-shadow: 0 20px 40px rgba(25, 28, 30, 0.06);` (Using the `on-surface` color at 6% opacity).
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline-variant` (#c2c6d9) at **15% opacity**. This creates a hint of a boundary without "locking" the element in a box.
*   **Glassmorphism Depth:** When using glass elements, ensure the content beneath is slightly visible. This prevents the UI from feeling "pasted on" and makes it feel integrated into the 3D space of the page.

---

## 5. Components

### Buttons
*   **Primary:** A gradient fill (Primary to Primary-Container), `full` roundedness, and a subtle "glow" shadow using the primary color at 10% opacity.
*   **Secondary:** `surface-container-highest` background with `on-surface` text. No border.

### Cards
*   **Forbid dividers.** Use vertical white space (32px+) to separate content sections within a card.
*   **Interaction:** On hover, a card should transition from `surface-container-lowest` to a slightly lifted state with an **Ambient Shadow**, never a border change.

### Input Fields
*   **Styling:** Use `surface-container-low` as the fill. 
*   **State:** On focus, transition to a `ghost-border` (outline-variant at 20%) and a subtle blue tint in the background.

### AI Insight Chips
*   **Contextual Component:** Since this is an AI agency, use "Insight Chips." These are small, glassmorphic labels with a `tertiary` (green) or `secondary` (orange) accent dot to highlight AI-generated data or status.

---

## 6. Do's and Don'ts

### Do
*   **Use Overlapping Layouts:** Allow an image or a glassmorphic card to "bleed" over the edge of a section transition to break the grid.
*   **Embrace Whitespace:** If you think there is enough space, add 20% more. High-end design requires "breathing room."
*   **Use Tonal Shifts:** Use the `surface-container` tiers to guide the user's eye from the least important to the most important information.

### Don't
*   **Don't use 100% Black:** Always use `on-surface` (#191c1e) for text to maintain the soft, premium feel.
*   **Don't use hard borders:** Avoid the "boxed-in" look. Let the background colors do the work.
*   **Don't use standard icons:** Use "Light" weight stroke icons (1px or 1.5px) to match the airy aesthetic of the typography.
*   **Don't crowd the margins:** Keep a minimum of 24px-32px padding inside containers to maintain the "Editorial" feel.