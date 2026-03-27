# JOSA.AI Website Project Memory

## Project Overview

**Client:** JOSA.AI - AI implementation partner for small businesses in Central Florida
**Location:** Lakeland, FL
**Owner:** Ernesto

## Site Information

**Live URL:** https://josa-ai-rebrand.vercel.app
**GitHub Repo:** https://github.com/josa-ai/josa-ai-rebrand
**GitHub Account:** josa-ai (team account)

## Tech Stack

- **Framework:** Next.js 16.2.1 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (with @layer utilities)
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Deployment:** Vercel
- **Backend:** Supabase (planned for future)

## Design System

### Brand Colors (CSS Variables)
```
--color-brand-midnight-plum: #421C52
--color-brand-royal-purple: #8D4BBB
--color-brand-mauve-purple: #A882EE
--color-brand-soft-lavender: #E3D4F3
--color-brand-deep-navy: #1E3A8A
--color-brand-tech-blue: #3B82F6
--color-brand-cool-azure: #93C5FD
--color-brand-frosted-blue: #DAF0FF
```

### Typography
- **Font Size Minimum:** 16px enforced via `@layer utilities` in globals.css
- **text-sm:** 1rem/1.5rem (not Tailwind default 0.875rem)
- **text-xs:** 0.875rem/1.25rem (not Tailwind default 0.75rem)

### Key CSS Utilities
- **Textures:** Inline styles used for visibility (not custom CSS classes)
  - Dot pattern: `radial-gradient(circle, rgba(141, 75, 187, 0.23) 1.5px, transparent 1.5px)`
  - Grid pattern: `linear-gradient(rgba(141, 75, 187, 0.13) 1px, transparent 1px)`
- **Hero gradients:** Purple-blue mesh overlay
- **Card uniformity:** `min-h-[280px] flex flex-col flex-1`

## Pages

### Static Pages
- `/` - Homepage
- `/about` - About page with team/values
- `/services` - Services overview
- `/blog` - Blog listing
- `/contact` - Contact form page
- `/portfolio` - Portfolio showcase

### Dynamic Pages
- `/services/[slug]` - Service detail pages (9 services)
- `/blog/[slug]` - Blog post pages (3 posts)

### API Routes
- `/api/kie-callback` - Kie.ai image generation callback (async, callbacks not working reliably)

## Recent Changes (March 2026)

### Hero Sections
- Removed broken `hero-with-image` divs that referenced non-existent images
- Added visible purple-blue gradient mesh overlays using inline styles
- Gradient: `radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(168,130,238,0.6),transparent)`

### Section Textures
- Dot and grid patterns now use inline styles for guaranteed visibility
- Opacity reduced by 35% (dots: 0.23, grid: 0.13)
- Applied to: about, services, blog, contact, portfolio pages
- Also applied to service detail pages (problem, agitation, solution, FAQ sections)

### Bento Grid
- Homepage "You're leaving money on the table" section converted to bento grid
- First card spans 2 columns on lg screens
- Cards have min-height with uniform sizing

### Card Uniformity
- All cards use `min-h-[280px]` minimum height
- All use `flex flex-col flex-1` for consistent internal layout
- Applied across: HomepageContent, ServiceCard, about values, blog posts, portfolio items, contact info

## Kie.ai Image Generation (Not Working)

**API Endpoint:** `https://api.kie.ai/api/v1/jobs/createTask`
**API Key:** Stored in Vercel environment variables (not in repo)
**Model:** nano-banana-2

### Issue
The Kie.ai API is async and requires a callback URL. All 13 hero image tasks were created but:
1. The API never calls back to our endpoint
2. No polling mechanism exists to check status
3. Vercel serverless can't write files to disk anyway

### Current State
- 13 tasks created with taskIds but no images generated
- Hero sections use gradient fallbacks (look fine without images)

### Hero Images Needed For
about, services, website-design, voice-ai, ai-automation, chatbot-development, ecommerce-solutions, seo-optimization, brand-identity, mobile-app-development, blog, contact, portfolio

## Files Structure

```
src/
├── app/
│   ├── globals.css          # Custom utilities, brand colors, animations
│   ├── layout.tsx           # Root layout with navbar/footer
│   ├── page.tsx            # Homepage (renders HomepageContent)
│   ├── about/page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── contact/page.tsx
│   ├── portfolio/page.tsx
│   └── api/kie-callback/route.ts
├── components/
│   ├── HomepageContent.tsx  # Main homepage sections
│   ├── ServiceCard.tsx     # Reusable service card
│   ├── HeroSection.tsx     # Homepage hero
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── CTABanner.tsx
│   ├── AnimatedSection.tsx
│   ├── SectionHeading.tsx
│   ├── TestimonialCarousel.tsx
│   ├── ContactForm.tsx
│   ├── FAQAccordion.tsx
│   ├── decorations/        # Decorative components
│   └── ui/                # shadcn/ui components
└── lib/
    ├── services-data.ts    # Service definitions
    └── blog.ts            # Blog post utilities
```

## Environment Variables

- `KIE_AI_API_KEY` - Kie.ai API key (set in Vercel, not in .env.local)

## Build & Deploy Commands

```bash
# Local build
npm run build

# Deploy to Vercel production
vercel deploy --prod --yes

# Push to GitHub
git push
```

## Current Status

- Build: Passing
- Vercel: Connected to GitHub repo, auto-deploys on push to main
- GitHub: Pushing to main triggers Vercel deploy

## Next Steps (If Any)

1. **Hero Images:** Either upload manually to `/public/images/heroes/` or try different image API
2. **Supabase Integration:** Not yet implemented - contact form currently static
3. **More Content:** Additional blog posts, portfolio items could be added
