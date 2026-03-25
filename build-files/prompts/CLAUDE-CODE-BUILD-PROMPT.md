# JOSA.AI Website Build Prompt — Claude Code Master Build

## PROJECT OVERVIEW

Build a complete, production-ready Next.js website for JOSA.AI (Ernesto's AI consulting agency). The site must be fully functional, SEO-optimized, accessible, and ready for immediate deployment to Vercel. This is a comprehensive, single-pass build with no placeholder content — every page, component, and asset must be production-ready.

**Tech Stack:**
- Next.js 14+ with App Router and TypeScript
- Tailwind CSS for all styling
- Remotion for hero animation (separate spec provided)
- GoHighLevel webhook integration for forms
- MDX for blog content management
- Next.js built-in features for SEO (metadata, sitemap, robots.txt)

**Deployment Target:** Vercel (with automatic optimization)

---

## PHASE 1: PROJECT INITIALIZATION & SETUP

### 1.1 Initialize Next.js Project

Create a new Next.js 14+ project with the following configuration:

```bash
npx create-next-app@latest josa-ai --typescript --tailwind --app
```

Configure `next.config.ts` with:
- Image optimization enabled (next/image)
- Vercel deployment settings
- MDX support via `@next/mdx`
- Sitemap and robots.txt generation

### 1.2 Install Dependencies

Required packages:
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/typography": "^0.5.0",
    "@next/mdx": "^14.0.0",
    "gray-matter": "^4.0.3",
    "rss": "^1.2.2",
    "clsx": "^2.1.0",
    "next-seo": "^6.5.0",
    "react-hot-toast": "^2.4.0",
    "framer-motion": "^10.16.0",
    "react-hook-form": "^7.52.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "postcss": "^8.4.0"
  }
}
```

**Note:** Remotion installation and setup is handled in Phase 6 when integrating the hero animation.

### 1.3 Configure TypeScript

Create `tsconfig.json` with strict mode enabled:
- `"strict": true`
- `"noUncheckedIndexedAccess": true`
- `"esModuleInterop": true`
- Path aliases configured: `@/*` pointing to `./src/*`

### 1.4 Set Up Environment Variables

Create `.env.local` with:
```
NEXT_PUBLIC_GHL_WEBHOOK_URL=your_gohighlevel_webhook_url_here
NEXT_PUBLIC_SITE_URL=https://josa.ai
NEXT_PUBLIC_GA_ID=your_google_analytics_id_here
NEXT_PUBLIC_BRAND_EMAIL=contact@josa.ai
```

Create `.env.example` with placeholders for documentation.

---

## PHASE 2: TAILWIND CSS & DESIGN SYSTEM

### 2.1 Configure Tailwind with Brand Palette

Update `tailwind.config.ts` to include all brand colors as custom classes:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'brand': {
          'plum': '#421C52',      // Midnight Plum - hero, primary headings, footer
          'purple': '#8D4BBB',    // Royal Purple - primary accent, buttons, CTAs
          'mauve': '#A882EE',     // Mauve Purple - hover states, highlights, icons
          'lavender': '#E3D4F3',  // Soft Lavender - light section backgrounds, cards
          'navy': '#1E3A8A',      // Deep Navy - secondary dark, body text, nav
          'blue': '#3B82F6',      // Tech Blue - links, secondary buttons
          'azure': '#93C5FD',     // Cool Azure - supporting accent, tags, badges
          'frosted': '#DAF0FF',   // Frosted Blue - alternate light backgrounds
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.7' },
        },
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

### 2.2 Global Styles

Create `app/globals.css` with:
- CSS variables for color accessibility
- Typography scale (h1–h6, body, caption)
- Focus outline styles (WCAG requirement)
- Smooth scroll behavior
- Print-friendly styles

### 2.3 Load Google Fonts

In `app/layout.tsx`, import Inter from `next/font/google`:
```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
```

---

## PHASE 3: CORE COMPONENTS

Build all shared components in `/app/components/`. Each component must:
- Use TypeScript with proper types
- Have alt text on all images
- Support dark/light mode (if applicable)
- Include proper ARIA labels
- Be fully responsive (mobile-first)
- Use Tailwind exclusively (no CSS modules)

### 3.1 Navbar Component

**File:** `/app/components/Navbar.tsx`

Features:
- Logo image (Horizontal Logo.png) on left
- Navigation links: Services (dropdown), Portfolio, About, Blog, Contact
- "Book a Call" CTA button in Royal Purple (#8D4BBB) with hover state (Mauve Purple #A882EE)
- Hamburger menu for mobile (768px breakpoint)
- Active link indicator
- Sticky positioning on scroll
- Fully accessible keyboard navigation

Dropdown menu for Services showing:
- Website Design & Redesign
- Voice AI & Chatbot Setup
- AI Automation & Workflows
- AI Training & Workshops
- E-Commerce Consulting
- Brand Strategy & Marketing
- Digital Product Creation & Lead Magnets
- Custom App Development
- Business Tools

Mobile menu should use `<nav>` landmark with proper ARIA attributes.

### 3.2 Footer Component

**File:** `/app/components/Footer.tsx`

Structure:
- Top section: Logo (Vertical Logo.png)
- Middle section with 4 columns:
  1. **Services** — links to all service pages
  2. **Company** — About, Blog, Portfolio, Contact
  3. **Location** — Lakeland, FL (displayed text and schema)
  4. **Contact** — Email link, social icons (LinkedIn, Twitter/X)
- Bottom section: Copyright, privacy links, legal

Use brand colors:
- Background: Midnight Plum (#421C52)
- Text: Soft Lavender (#E3D4F3)
- Links: Tech Blue (#3B82F6) with hover to Mauve (#A882EE)

Social links must be in `<a>` tags with proper `rel="noopener noreferrer"` and descriptive aria-labels.

### 3.3 Contact Form Component

**File:** `/app/components/ContactForm.tsx`

Fields:
1. **Name** (text input, required)
2. **Email** (email input, required)
3. **Phone** (tel input, required)
4. **Service Interest** (dropdown select, required) — populate from services list
5. **Message** (textarea, optional)
6. **Hidden fields** for UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`)

Behavior:
- Client-side validation (required fields, email format)
- Submit via POST to `process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL`
- Request body format (JSON):
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "service": "string",
  "message": "string",
  "utm_source": "string",
  "utm_medium": "string",
  "utm_campaign": "string"
}
```
- Success state: Toast notification + form reset
- Error state: Toast notification with error message, form preserved
- Loading state: Disabled submit button with spinner
- Use `react-hook-form` for form state management
- Use `react-hot-toast` for notifications

Styling:
- Inputs: Frosted Blue (#DAF0FF) background, Deep Navy (#1E3A8A) text
- Focus: Tech Blue (#3B82F6) border with ring
- Button: Royal Purple (#8D4BBB) with Mauve (#A882EE) hover
- Error states: Red (#EF4444) text and border

Accessibility:
- All inputs have `<label>` with proper `htmlFor` attribute
- Error messages linked to inputs via `aria-describedby`
- Form has role="form" and proper ARIA landmarks

### 3.4 CTA Banner Component

**File:** `/app/components/CTABanner.tsx`

Reusable banner with:
- **Props:** `title` (string), `description` (string), `ctaText` (string), `ctaLink` (string), `variant` (primary/secondary)
- Background: Midnight Plum (#421C52) for primary, Soft Lavender (#E3D4F3) for secondary
- Text color: inverted based on variant
- Button: Royal Purple with Mauve hover
- Responsive padding (mobile: 24px, desktop: 48px)
- Optional background image/accent

### 3.5 Service Card Component

**File:** `/app/components/ServiceCard.tsx`

Props:
- `title` (string)
- `description` (string)
- `icon` (React component or emoji)
- `link` (string)
- `variant` ("primary" | "secondary")

Styles:
- **Primary:** Royal Purple (#8D4BBB) background, white text, Mauve (#A882EE) border on hover
- **Secondary:** Soft Lavender (#E3D4F3) background, Deep Navy (#1E3A8A) text, shadow on hover
- Rounded corners (12px minimum)
- Padding: 24px
- Transition: smooth color/shadow change on hover

### 3.6 Testimonial Carousel Component

**File:** `/app/components/TestimonialCarousel.tsx`

Features:
- Carousel with previous/next arrow buttons
- Auto-advance every 5 seconds
- Pause on hover
- Dots/indicators for current slide
- Smooth fade transitions (Framer Motion)
- Responsive: 1 column mobile, 2–3 columns desktop

Each testimonial card shows:
- Client quote (italic, Soft Lavender background)
- Client name (Bold, Deep Navy)
- Client title/company (smaller, Tech Blue)
- Optional star rating (5 stars)
- Optional client image (small avatar)

### 3.7 FAQ Accordion Component

**File:** `/app/components/FAQAccordion.tsx`

Props:
- `faqs` (Array of `{ question: string, answer: string }`)
- `schema` (boolean, default true) — output JSON-LD schema

Features:
- One accordion item open at a time (or multiple, configurable)
- Smooth height animations
- Chevron icon rotation on expand/collapse
- Full keyboard navigation (arrow keys, Enter/Space to toggle)
- `aria-expanded` and `aria-controls` attributes

Colors:
- Border: Cool Azure (#93C5FD)
- Question text: Deep Navy (#1E3A8A)
- Answer text: Deep Navy (#1E3A8A) at 90% opacity
- Hover background: Soft Lavender (#E3D4F3) at 50% opacity

If `schema={true}`, output `<script type="application/ld+json">` with FAQPage schema at the bottom.

### 3.8 Portfolio Grid Component

**File:** `/app/components/PortfolioGrid.tsx`

Features:
- Responsive grid (1 column mobile, 2 columns tablet, 3+ columns desktop)
- Image lazy loading via `next/image`
- Click to expand image in lightbox (or modal)
- Category/tag filtering
- Hover overlay with project title and link

Each portfolio item:
- Featured image (16:9 aspect ratio, optimized)
- Project title
- Short description (1–2 lines)
- Category tags (Tech Blue text, Frosted Blue background)
- Link to full case study page (or external)

### 3.9 Blog Post Layout Component

**File:** `/app/components/BlogPostLayout.tsx`

Wraps blog post content with:
- Hero image (full width, max-height 400px)
- Breadcrumb navigation
- Post title (h1, Midnight Plum)
- Meta info: Published date, author name, reading time estimate
- Post content (from MDX)
- Related posts sidebar (3 posts, same tags)
- Share buttons (Twitter, LinkedIn, email)
- Author bio (small section at bottom)
- Schema markup (JSON-LD Article)

### 3.10 Skip Navigation Link

**File:** `/app/components/SkipNav.tsx`

Invisible link that becomes visible on focus:
```html
<a href="#main" class="sr-only focus:not-sr-only">Skip to main content</a>
```

Jumps to `<main id="main">` element on the page.

### 3.11 Breadcrumb Component

**File:** `/app/components/Breadcrumb.tsx`

Props:
- `items` (Array of `{ label: string, href?: string }`)

Features:
- Last item is not a link (current page)
- Separator: forward slash (/)
- Schema: BreadcrumbList JSON-LD
- Responsive: hides intermediate items on mobile if needed

---

## PHASE 4: PAGE STRUCTURE & METADATA

### 4.1 Root Layout

**File:** `/app/layout.tsx`

Setup:
- Import Inter font
- Configure viewport metadata
- Add Skip Navigation link (first element in body)
- Render Navbar
- Render children
- Render Footer
- Add Google Analytics script (if GA_ID set)
- Include JSON-LD Organization schema in `<head>`

Root metadata:
```typescript
export const metadata: Metadata = {
  title: 'JOSA.AI — AI Consulting & Automation for Your Business',
  description: 'Expert AI consulting, voice AI setup, automation, and digital product creation from Ernesto (JOSA.AI) in Lakeland, Florida.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'JOSA.AI — AI Consulting & Automation',
    description: 'Expert AI consulting and automation solutions.',
    url: 'https://josa.ai',
    siteName: 'JOSA.AI',
    images: [
      {
        url: 'https://josa.ai/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JOSA.AI - AI Consulting',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JOSA.AI',
    description: 'AI Consulting & Automation',
    images: ['https://josa.ai/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://josa.ai',
  },
};
```

JSON-LD Organization schema in root layout:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "JOSA.AI",
  "url": "https://josa.ai",
  "logo": "https://josa.ai/logo.png",
  "description": "AI consulting, voice AI setup, automation, and digital product creation.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Lakeland",
    "addressLocality": "Lakeland",
    "addressRegion": "FL",
    "postalCode": "",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://linkedin.com/in/ernesto",
    "https://twitter.com/ernesto"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "contact@josa.ai"
  }
}
```

### 4.2 Homepage (`/`)

**File:** `/app/page.tsx`

Sections in order:
1. **Hero Section** — Integrate Remotion animation here. See separate Remotion spec.
   - Fallback: Static background image (Midnight Plum) with gradient overlay
   - Headline: "Build AI-Powered Solutions That Scale"
   - Subheadline: 2–3 line description
   - CTA buttons: "Book a Call" (primary), "View Services" (secondary)
   - Copy sourced from SITE-COPY.md

2. **Services Overview** — Cards in 3×3 grid (responsive)
   - Use ServiceCard component
   - 9 services (link to detail pages)
   - "View All Services" CTA at bottom

3. **How It Works** — Numbered steps (1, 2, 3)
   - Step icons/numbers in Royal Purple (#8D4BBB)
   - Each step: title + description
   - Full width, alternating left/right layout on desktop

4. **Testimonials** — TestimonialCarousel component
   - Background: Soft Lavender (#E3D4F3)
   - Section title: "What Clients Say"

5. **Featured Portfolio** — Portfolio grid showing 3–6 best projects
   - Link to full portfolio page

6. **Blog Preview** — Latest 3 blog posts
   - Card layout with featured image, title, date, excerpt
   - "Read More" link to post
   - "View All Blog Posts" CTA

7. **CTA Banner** — "Ready to Transform Your Business?"
   - Primary variant (Midnight Plum background)
   - "Book a Call" button

Metadata:
```typescript
export const metadata: Metadata = {
  title: 'JOSA.AI — AI Consulting & Automation for Your Business',
  description: 'Transform your business with expert AI consulting, voice AI setup, automation, and digital products. Work with Ernesto in Lakeland, FL.',
  openGraph: {
    title: 'JOSA.AI — AI Consulting & Automation',
    description: 'Transform your business with expert AI consulting, voice AI setup, automation, and digital products.',
    url: 'https://josa.ai',
    images: [{ url: 'https://josa.ai/og-home.png', width: 1200, height: 630 }],
  },
};
```

### 4.3 Services Hub (`/services`)

**File:** `/app/services/page.tsx`

Sections:
1. **Hero** — "Our Services" title + 1-2 line description
2. **Service Grid** — All 9 services in 3×3 grid (responsive)
   - Use ServiceCard component (primary variant)
   - Each links to `/services/[service-slug]`
3. **CTA Banner** — "Let's Discuss Your Needs"

Metadata:
```typescript
export const metadata: Metadata = {
  title: 'Services — JOSA.AI',
  description: 'AI consulting, voice AI, automation, custom apps, and more. Explore all JOSA.AI services.',
};
```

### 4.4 Individual Service Pages (9 total)

**File Pattern:** `/app/services/[service-slug]/page.tsx`

Services:
1. `/services/website-design` — Website Design & Redesign
2. `/services/voice-ai` — Voice AI & Chatbot Setup
3. `/services/ai-automation` — AI Automation & Workflows
4. `/services/ai-training` — AI Training & Workshops
5. `/services/ecommerce-consulting` — E-Commerce Consulting
6. `/services/brand-strategy` — Brand Strategy & Marketing
7. `/services/digital-products` — Digital Product Creation & Lead Magnets
8. `/services/custom-apps` — Custom App Development
9. `/services/business-tools` — Business Tools (Reputation, CRM, Communities/Courses)

**Template Structure for each service page:**

1. **Hero** — Service title (h1) + tagline
   - Background: Midnight Plum (#421C52) with gradient overlay
   - CTA button: "Book a Consultation"

2. **Overview** — 1–2 paragraphs describing the service
   - Copy from SITE-COPY.md

3. **Key Benefits** — Bulleted list (5–7 items)
   - Each with icon (emoji or SVG)
   - Soft Lavender background cards

4. **How It Works** — 4–5 step process
   - Numbered steps with icons
   - Step descriptions

5. **Use Cases** — 3–4 real-world examples
   - Title, description, brief outcome
   - Cool Azure (#93C5FD) accent line

6. **FAQ Section** — Use FAQAccordion component
   - 5–8 FAQs specific to service
   - Include JSON-LD FAQPage schema

7. **CTA Banner** — Service-specific call-to-action
   - Variant: primary
   - "Get Started Today" button

8. **Related Services** — Show 2–3 complementary services
   - Card grid, link to other service pages

Metadata for each (dynamic):
```typescript
export const metadata: Metadata = {
  title: `${serviceName} — JOSA.AI`,
  description: `Professional ${serviceName} services from JOSA.AI. Expert consultation and implementation.`,
  openGraph: {
    title: `${serviceName} — JOSA.AI`,
    description: `Professional ${serviceName} services from JOSA.AI.`,
    url: `https://josa.ai/services/${serviceSlug}`,
    images: [{ url: `https://josa.ai/og-${serviceSlug}.png`, width: 1200, height: 630 }],
  },
};
```

JSON-LD Service schema on each service page:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Service Name",
  "description": "Service description",
  "provider": {
    "@type": "Organization",
    "name": "JOSA.AI",
    "url": "https://josa.ai"
  },
  "serviceType": "Consulting",
  "areaServed": {
    "@type": "Country",
    "name": "US"
  },
  "availableLanguage": "en"
}
```

### 4.5 Portfolio Page (`/portfolio`)

**File:** `/app/portfolio/page.tsx`

Sections:
1. **Hero** — "Our Work" title + tagline
2. **Portfolio Grid** — Use PortfolioGrid component
   - Show all portfolio items
   - Category filtering (optional)
   - Lightbox on image click
3. **CTA Banner** — "Start Your Project Today"

Portfolio data stored in `/public/portfolio-data.json`:
```json
{
  "projects": [
    {
      "id": "1",
      "title": "Project Title",
      "description": "Short description",
      "image": "/portfolio/project-1.jpg",
      "category": "Web Design",
      "link": "/portfolio/project-1",
      "featured": true
    }
  ]
}
```

Metadata:
```typescript
export const metadata: Metadata = {
  title: 'Portfolio — JOSA.AI',
  description: 'View our latest projects and case studies. See how JOSA.AI transforms businesses with AI and digital solutions.',
};
```

### 4.6 About Page (`/about`)

**File:** `/app/about/page.tsx`

Sections:
1. **Hero** — "About Ernesto & JOSA.AI"
   - Profile image
2. **Story** — 2–3 paragraphs about Ernesto and the company's mission
3. **Values** — 3–4 core values with icons
4. **Expertise** — List of specialties/skills
5. **Timeline** — Company milestones (optional)
6. **Team** — If applicable, team member cards
7. **CTA Banner** — "Let's Work Together"

Metadata:
```typescript
export const metadata: Metadata = {
  title: 'About Ernesto — JOSA.AI',
  description: 'Meet Ernesto and learn about JOSA.AI\'s mission to help businesses leverage AI and automation.',
};
```

### 4.7 Contact Page (`/contact`)

**File:** `/app/contact/page.tsx`

Sections:
1. **Hero** — "Let's Talk" title + "Get in touch with our team"
2. **Contact Form** — Use ContactForm component (full width or 2-column layout with info)
3. **Contact Info** (sidebar or below form):
   - Email: `contact@josa.ai`
   - Location: Lakeland, FL
   - Phone: (if available)
   - Social links
4. **FAQ Section** — Common questions about booking

Metadata:
```typescript
export const metadata: Metadata = {
  title: 'Contact — JOSA.AI',
  description: 'Get in touch with JOSA.AI. Book a consultation or ask any questions.',
};
```

### 4.8 Blog Index (`/blog`)

**File:** `/app/blog/page.tsx`

Features:
- List all blog posts with cards
- Pagination (10 posts per page)
- Filtering by tag
- Search by title/excerpt
- Sort by date (newest first)

Card layout:
- Featured image (16:9)
- Title (link to post)
- Date published
- Author name
- Reading time
- Excerpt (150 characters)
- Tags

Metadata:
```typescript
export const metadata: Metadata = {
  title: 'Blog — JOSA.AI',
  description: 'Read articles about AI, automation, digital marketing, and business transformation.',
};
```

### 4.9 Blog Post Layout (`/blog/[slug]`)

**File:** `/app/blog/[slug]/page.tsx`

Uses `BlogPostLayout` component. Post metadata from MDX frontmatter:
```yaml
---
title: "Post Title"
description: "Meta description"
date: "2025-03-25"
author: "Ernesto"
tags: ["AI", "Automation", "Business"]
service: "custom-apps"
featuredImage: "/blog/post-image.jpg"
---
```

Features:
- Hero image (full width)
- Post title (h1, Midnight Plum)
- Meta: date, author, reading time
- Post content (MDX parsed)
- Sidebar: related posts (3), author bio
- Schema markup: JSON-LD Article

Metadata (dynamic from frontmatter):
```typescript
export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  authors: [{ name: post.author }],
  publishedTime: post.date,
  tags: post.tags,
};
```

---

## PHASE 5: BLOG INFRASTRUCTURE

### 5.1 MDX Configuration

Install and configure MDX in `next.config.ts`:
```typescript
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      require('remark-gfm'),
      require('remark-slug'),
    ],
    rehypePlugins: [
      [require('rehype-highlight'), { languages: { javascript: true, typescript: true, python: true } }],
      require('rehype-autolink-headings'),
    ],
  },
});

module.exports = withMDX({
  // ... rest of config
});
```

### 5.2 Blog Content Structure

Create `/content/blog/` directory structure:
```
/content/blog/
  ├── post-slug-1.mdx
  ├── post-slug-2.mdx
  └── ... more posts
```

Each MDX file includes frontmatter:
```yaml
---
title: "Post Title"
description: "Short description for SEO"
date: "2025-03-25"
author: "Ernesto"
tags: ["tag1", "tag2", "tag3"]
service: "service-slug"  # Links to related service
featuredImage: "/images/blog-post-image.jpg"
---

# Content starts here

Your markdown/MDX content...
```

### 5.3 Blog Utils

Create `/lib/blog.ts` with utilities:

```typescript
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: Date;
  author: string;
  tags: string[];
  service?: string;
  featuredImage: string;
  content: string;
  readingTime: number;
}

export function getAllPosts(): BlogPost[] {
  // Read all .mdx files from /content/blog/
  // Parse frontmatter with gray-matter
  // Return sorted by date (newest first)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  // Get single post by slug
}

export function getPostsByTag(tag: string): BlogPost[] {
  // Filter posts by tag
}

export function getRelatedPosts(currentSlug: string, count: number = 3): BlogPost[] {
  // Return posts with same tags, excluding current
}

export function calculateReadingTime(content: string): number {
  // Estimate reading time in minutes
  // 200 words per minute average
}
```

### 5.4 RSS Feed Generation

Create `/app/blog/feed.xml/route.ts` to generate RSS feed:
```typescript
import { getAllPosts } from '@/lib/blog';
import RSS from 'rss';

export async function GET() {
  const feed = new RSS({
    title: 'JOSA.AI Blog',
    description: 'Articles about AI, automation, and business.',
    site_url: 'https://josa.ai',
    feed_url: 'https://josa.ai/blog/feed.xml',
    language: 'en',
  });

  const posts = getAllPosts();
  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      date: post.date,
      author: post.author,
      url: `https://josa.ai/blog/${post.slug}`,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
```

### 5.5 Blog Sitemap

Create `/app/sitemap.xml/route.ts` including blog posts:
```typescript
export async function GET() {
  const baseUrl = 'https://josa.ai';
  const posts = getAllPosts();

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Combine with static pages...
  // Output XML
}
```

---

## PHASE 6: REMOTION HERO ANIMATION INTEGRATION

### 6.1 Install Remotion

```bash
npm install remotion @remotion/cli @remotion/eslint-config
npx remotion init
```

### 6.2 Create Hero Animation Component

**File:** `/app/components/HeroRemotion.tsx`

```typescript
import { Composition } from 'remotion';
import HeroAnimation from '@/remotion/HeroAnimation';

export default function HeroRemotion() {
  return (
    <Composition
      id="HeroAnimation"
      component={HeroAnimation}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  );
}
```

**File:** `/remotion/HeroAnimation.tsx`

Refer to separate Remotion spec for exact animation details. The animation should:
- Display for ~10 seconds (300 frames at 30fps)
- Use brand colors (Midnight Plum, Royal Purple, Mauve)
- Animate text entrance and fade-out
- Include optional particle effects or motion graphics
- Be optimized for web (low file size)

### 6.3 Hero Section Integration

In `/app/page.tsx`, wrap Remotion player in a fallback:

```typescript
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const HeroRemotionClient = dynamic(() => import('@/app/components/HeroRemotionClient'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-brand-plum" />,
});

export default function Home() {
  return (
    <>
      <Suspense fallback={<div className="w-full h-screen bg-brand-plum" />}>
        <HeroRemotionClient />
      </Suspense>
      {/* Rest of page... */}
    </>
  );
}
```

**File:** `/app/components/HeroRemotionClient.tsx` (client-side player)

```typescript
'use client';

import { Player } from '@remotion/player';
import HeroAnimation from '@/remotion/HeroAnimation';

export default function HeroRemotionClient() {
  return (
    <Player
      component={HeroAnimation}
      durationInFrames={300}
      fps={30}
      compositionWidth={1920}
      compositionHeight={1080}
      style={{
        width: '100%',
        aspectRatio: '16/9',
      }}
      autoPlay
      loop
      controls={false}
    />
  );
}
```

---

## PHASE 7: SEO & SCHEMA MARKUP

### 7.1 Sitemap Generation

Create `/app/sitemap.ts` (next/sitemap):

```typescript
import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://josa.ai';

  const staticPages = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/portfolio`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.9 },
  ];

  const servicePages = [
    'website-design',
    'voice-ai',
    'ai-automation',
    'ai-training',
    'ecommerce-consulting',
    'brand-strategy',
    'digital-products',
    'custom-apps',
    'business-tools',
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogPosts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...blogPosts] as MetadataRoute.Sitemap;
}
```

### 7.2 robots.txt

Create `/public/robots.txt`:

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://josa.ai/sitemap.xml
```

### 7.3 JSON-LD Schemas

Include schemas in component/page level or globally:

**HomePage Schema (Organization + LocalBusiness):**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "JOSA.AI",
  "image": "https://josa.ai/logo.png",
  "description": "AI consulting and automation for businesses",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Lakeland",
    "addressLocality": "Lakeland",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "url": "https://josa.ai",
  "telephone": "",
  "sameAs": ["https://linkedin.com/in/ernesto", "https://twitter.com/ernesto"]
}
```

**Service Page Schema:**
Implemented on each service page (see Phase 4.4)

**BlogPost Schema:**
Implemented via BlogPostLayout component:
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "description": "Post description",
  "image": "https://josa.ai/image.jpg",
  "datePublished": "2025-03-25",
  "author": {
    "@type": "Person",
    "name": "Ernesto"
  }
}
```

**FAQ Schema:**
Implemented via FAQAccordion component (see Phase 3.7)

### 7.4 Open Graph Images

Generate OG images using `@vercel/og` (optional but recommended):

Create `/app/og/route.tsx` for dynamic OG image generation for blog posts:

```typescript
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'JOSA.AI';
    const description = searchParams.get('description') || 'AI Consulting & Automation';

    return new ImageResponse(
      (
        <div style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#421C52', // Midnight Plum
          padding: '40px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#E3D4F3', // Soft Lavender
          fontSize: '60px',
          fontWeight: 'bold',
        }}>
          <div>{title}</div>
          <div style={{ fontSize: '30px', marginTop: '20px' }}>{description}</div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e) {
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
```

---

## PHASE 8: ACCESSIBILITY (ADA/WCAG AA)

### 8.1 Color Contrast Verification

All text color combinations must meet WCAG AA (4.5:1 for normal text, 3:1 for large text):

- Midnight Plum (#421C52) on Soft Lavender (#E3D4F3): ✓ 8.2:1
- Deep Navy (#1E3A8A) on Soft Lavender (#E3D4F3): ✓ 10.5:1
- Deep Navy (#1E3A8A) on white: ✓ 7.5:1
- Royal Purple (#8D4BBB) on white: ✓ 4.6:1

Verify using WebAIM contrast checker during build.

### 8.2 Semantic HTML

- Use proper heading hierarchy (h1 > h2 > h3, no skipping levels)
- Use `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>` landmarks
- All form inputs have associated `<label>` elements
- Use `<button>` for buttons, never `<div>` or `<a>` for actions
- Use `<a>` for navigation only
- Lists use `<ul>`, `<ol>`, `<li>`

### 8.3 ARIA Attributes

- Add `aria-label` to icon buttons
- Add `aria-expanded` to accordion/dropdown items
- Add `aria-current="page"` to active nav links
- Add `aria-describedby` to form inputs with error messages
- Add `role` attributes where needed (e.g., `role="button"` for keyboard-accessible divs)
- Add `aria-live="polite"` to toast notifications

### 8.4 Keyboard Navigation

- All interactive elements are keyboard accessible
- Tab order is logical and visible
- Focus outline is clear and visible (min 2px, high contrast)
- Escape key closes modals/dropdowns
- Arrow keys work in carousels, accordions
- Enter/Space activates buttons

### 8.5 Images

- All images have descriptive `alt` text
- Decorative images have empty `alt=""`
- Logos have `alt="JOSA.AI"`
- Screenshot images have descriptive alt (e.g., "Dashboard showing AI automation metrics")

### 8.6 Forms

- All inputs have `<label>` elements
- Required fields are marked with asterisk (*) and aria-required
- Error messages are in `<span id="field-error">` and linked via `aria-describedby`
- Form has `novalidate` to allow custom validation UI
- Success/error states are announced via `aria-live`

### 8.7 Skip Navigation

- Skip link on every page (visible on focus)
- Links to `<main id="main">` element
- First focusable element on page

### 8.8 Testing

Use tools:
- axe DevTools (automated accessibility testing)
- WAVE (WebAIM accessibility plugin)
- Manual keyboard navigation testing
- Screen reader testing (NVDA, JAWS, or VoiceOver)

---

## PHASE 9: RESPONSIVE DESIGN & MOBILE-FIRST

### 9.1 Breakpoints

Use Tailwind defaults:
- `sm`: 640px
- `md`: 768px (primary mobile-to-tablet breakpoint)
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Mobile-first approach: base styles for mobile, expand with `md:`, `lg:`, `xl:` prefixes.

### 9.2 Responsive Images

Use `next/image` component:
- Set `width` and `height` props (aspect ratio)
- Enable `priority` for above-fold images
- Use `fill` prop for background images
- Implement srcset for multiple resolutions

### 9.3 Viewport Settings

In root layout:
```typescript
viewport: {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}
```

### 9.4 Touch Targets

All clickable elements are minimum 44×44px (touch-friendly).

### 9.5 Font Sizing

- Base: 16px
- h1: 36px (mobile), 48px (desktop)
- h2: 28px (mobile), 36px (desktop)
- h3: 24px
- body: 16px
- caption: 12px–14px

Use relative units (rem) for scalability.

---

## PHASE 10: PERFORMANCE & OPTIMIZATION

### 10.1 Code Splitting

- Use `next/dynamic` for heavy components
- Lazy load below-fold sections
- Lazy load Remotion player (already done)

### 10.2 Image Optimization

- Use `next/image` for all images
- Serve WebP format (automatic via Next.js)
- Set appropriate `quality` (default 75)
- Use `placeholder="blur"` with `blurDataURL` for above-fold images
- Optimize source images (max 1920px width for full-width images)

### 10.3 CSS Optimization

- Tailwind purges unused styles
- Critical CSS inlined via Next.js
- Minified in production

### 10.4 JavaScript Optimization

- Minimize third-party scripts
- Defer analytics/tracking scripts
- Use `next/script` strategy="lazyOnload" for non-critical scripts

### 10.5 Caching Strategy

- Next.js ISR (Incremental Static Regeneration) for blog posts
- Set revalidate time (e.g., 3600s) for semi-dynamic content
- Vercel CDN handles caching automatically

---

## PHASE 11: DEPLOYMENT & VERIFICATION

### 11.1 Vercel Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "installCommand": "npm ci",
  "env": {
    "NEXT_PUBLIC_GHL_WEBHOOK_URL": "@ghl_webhook_url",
    "NEXT_PUBLIC_SITE_URL": "@site_url",
    "NEXT_PUBLIC_GA_ID": "@ga_id"
  },
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/api/contact",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    }
  ]
}
```

### 11.2 Build Checklist

Before deployment, verify:
- [ ] All images optimized and alt text present
- [ ] All links working (internal and external)
- [ ] Contact form submits to GoHighLevel (test with dummy data)
- [ ] Blog posts render correctly with markdown formatting
- [ ] Responsive design tested on mobile/tablet/desktop
- [ ] Keyboard navigation works on all pages
- [ ] Lighthouse score >90 (Performance, Accessibility, Best Practices, SEO)
- [ ] No console errors
- [ ] Analytics script configured (if applicable)
- [ ] 404 page exists and styled consistently
- [ ] Sitemap.xml generates correctly
- [ ] robots.txt present
- [ ] All env variables set in Vercel dashboard

### 11.3 Lighthouse Audit Targets

- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 90+
- **SEO:** 100

### 11.4 Custom 404 Page

Create `/app/not-found.tsx`:

```typescript
export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-plum flex flex-col justify-center items-center text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <a href="/" className="px-6 py-3 bg-brand-purple rounded hover:bg-brand-mauve">
        Back to Home
      </a>
    </div>
  );
}
```

---

## PHASE 12: README & DOCUMENTATION

Create `/README.md` with:

```markdown
# JOSA.AI Website

Production-ready Next.js 14+ website for JOSA.AI AI consulting agency.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Remotion
- **Blog:** MDX
- **Hosting:** Vercel
- **Forms:** GoHighLevel webhook integration

## Getting Started

### Prerequisites
- Node.js 18+ (recommended 20+)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see `.env.example`):
   ```bash
   cp .env.example .env.local
   # Fill in your GoHighLevel webhook URL and other variables
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Development

- **Edit pages:** `/app/` directory
- **Edit blog posts:** `/content/blog/` (MDX format)
- **Edit components:** `/app/components/`
- **Edit styles:** `tailwind.config.ts` or Tailwind classes in components
- **Add images:** `/public/` directory

### Building for Production

```bash
npm run build
npm run start
```

### Deployment to Vercel

1. Push code to GitHub
2. Connect repository to Vercel dashboard
3. Set environment variables in Vercel project settings
4. Vercel automatically deploys on push to main branch

## Project Structure

```
├── /app                      # Next.js app router pages
│   ├── components/          # Shared React components
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── services/            # Service pages
│   ├── portfolio/           # Portfolio pages
│   ├── about/               # About page
│   ├── blog/                # Blog pages
│   └── contact/             # Contact page
├── /content/blog/           # MDX blog posts
├── /lib/                    # Utility functions
├── /public/                 # Static assets (images, logos, etc.)
├── /remotion/               # Remotion animation components
├── tailwind.config.ts       # Tailwind configuration
├── next.config.ts           # Next.js configuration
└── package.json             # Dependencies
```

## Brand Colors

- **Midnight Plum:** #421C52
- **Royal Purple:** #8D4BBB
- **Mauve Purple:** #A882EE
- **Soft Lavender:** #E3D4F3
- **Deep Navy:** #1E3A8A
- **Tech Blue:** #3B82F6
- **Cool Azure:** #93C5FD
- **Frosted Blue:** #DAF0FF

## Content Management

### Blog Posts

Add new blog posts in `/content/blog/` with MDX format:

```yaml
---
title: "Your Post Title"
description: "Short meta description"
date: "2025-03-25"
author: "Ernesto"
tags: ["tag1", "tag2"]
service: "service-slug"
featuredImage: "/images/post-image.jpg"
---

# Your Content

Write your content in markdown...
```

### Services

Edit service content in `/app/services/[service-slug]/page.tsx` and update the copy directly in the component.

## SEO

- All pages include meta tags (title, description, OG tags)
- JSON-LD schemas included on all pages
- Sitemap auto-generated at `/sitemap.xml`
- Blog posts include structured data

## Accessibility

- WCAG AA compliant
- Semantic HTML throughout
- Keyboard navigation support
- Screen reader friendly
- Proper color contrast ratios

## Performance

- Images optimized via `next/image`
- Code splitting with dynamic imports
- Tailwind CSS purging
- ISR for blog posts
- Lighthouse score 90+

## Troubleshooting

**Contact form not submitting?**
- Check `NEXT_PUBLIC_GHL_WEBHOOK_URL` is set in `.env.local`
- Verify webhook URL format
- Check browser console for errors

**Blog posts not showing?**
- Ensure `.mdx` files are in `/content/blog/`
- Check frontmatter YAML formatting
- Rebuild with `npm run build`

**Images not loading?**
- Verify image paths in `/public/` directory
- Use `next/image` component
- Check alt text present

## Support

For questions or issues, contact: contact@josa.ai

## License

Copyright 2025 JOSA.AI. All rights reserved.
```

---

## IMPLEMENTATION NOTES & BEST PRACTICES

### Code Organization
- Use TypeScript strictly (no `any` types)
- Keep components small and focused
- Use custom hooks for shared logic
- Centralize API calls in `/lib/` utilities
- Use environment variables for configuration

### File Naming
- Components: PascalCase (e.g., `ContactForm.tsx`)
- Utilities: camelCase (e.g., `useContactForm.ts`)
- Pages: lowercase with hyphens (e.g., `/services/website-design`)
- Types: Define in component file or `/types/` directory

### Component Patterns
- Export named components, not default
- Include proper TypeScript interfaces
- Use React.FC<Props> for typed functional components
- Memoize expensive components with React.memo()
- Use useCallback for event handlers

### Styling
- No inline styles
- Use Tailwind classes exclusively
- Create Tailwind component classes for repeated patterns
- Use CSS custom properties sparingly
- Leverage Tailwind plugins for complex styling

### State Management
- Use React hooks (useState, useContext) for simple state
- Use react-hook-form for form state
- Avoid prop drilling (use context for deeply nested state)
- Keep state as close to usage as possible

### Performance Considerations
- Lazy load images with priority prop for critical images
- Use dynamic imports for heavy components
- Implement proper caching headers
- Minimize third-party scripts
- Use production builds for performance testing

### Testing (if needed)
- Use Jest for unit tests
- Use React Testing Library for component tests
- Keep tests close to implementation (same directory)
- Aim for >80% coverage on critical paths

---

## FINAL DELIVERABLES

Upon completion, the following should exist:

1. **Fully functional Next.js website** with all 15 pages
2. **All components** built and responsive
3. **Blog infrastructure** with MDX support
4. **Remotion hero animation** integrated
5. **SEO & schema markup** on all pages
6. **Accessibility compliance** (WCAG AA)
7. **Contact form** integrated with GoHighLevel
8. **Portfolio section** with lightbox
9. **Responsive design** across all devices
10. **Production-ready code** (TypeScript, no console errors)
11. **README** with setup and deployment instructions
12. **Vercel configuration** files
13. **Environment variables** template
14. **High Lighthouse scores** (90+)
15. **Deployed preview URL** (Vercel)

---

## SUCCESS CRITERIA

The build is complete when:

✓ All 15 pages exist and are accessible
✓ Navigation works on desktop and mobile
✓ Contact form submits successfully to GoHighLevel
✓ All images load and have alt text
✓ Blog posts render with proper formatting
✓ No console errors or warnings
✓ Lighthouse scores: Performance 90+, Accessibility 95+, SEO 100
✓ Mobile responsive (tested on iPhone, iPad, desktop)
✓ Keyboard accessible (Tab navigation works)
✓ Deployed to Vercel with custom domain (josa.ai)
✓ All environment variables configured
✓ README provides clear setup/deployment instructions

---

**END OF BUILD PROMPT**

This prompt is designed to be comprehensive and autonomous. Claude Code should be able to follow these instructions step-by-step without requiring clarification, assuming SITE-COPY.md and Remotion spec are available.
