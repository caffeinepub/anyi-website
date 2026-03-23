# Anyi Website

## Current State
Modern business website with navy/teal color scheme on a light page background. Includes HomePage, AboutPage, SolutionsPage, PortfolioPage, AdminPage. Uses Plus Jakarta Sans font, white cards with shadow-card, bg-page (#F3F6F9) background.

## Requested Changes (Diff)

### Add
- Dark deep-space background (near-black with deep purple undertones)
- Vibrant gradient accents: purple → pink/magenta (oklch-based)
- Glassmorphism card style: semi-transparent frosted glass cards with backdrop-blur
- Subtle gradient glows/blobs in hero and section backgrounds
- Gradient text on headings

### Modify
- index.css: replace navy/teal/page-bg tokens with dark theme tokens (dark bg, purple primary, pink accent, white/light text)
- All pages: update Tailwind classes to use new dark theme tokens
- NavBar: dark glassy header
- Hero, About, Services, Gallery, Testimonials, Contact sections: dark bg with glassmorphism cards
- Footer: even darker panel
- Buttons: gradient purple-to-pink fills
- SolutionsPage, AboutPage, PortfolioPage: match same dark glassmorphism theme

### Remove
- Light page background (#F3F6F9)
- White opaque cards
- Navy/teal color scheme

## Implementation Plan
1. Update index.css with dark theme OKLCH tokens: deep dark bg, purple primary, pink/magenta accent, glass card styles
2. Update tailwind.config.js shadow tokens for glass cards
3. Update HomePage.tsx: dark bg classes, glassmorphism cards, gradient hero text, gradient buttons
4. Update AboutPage.tsx, SolutionsPage.tsx, PortfolioPage.tsx: same dark glassmorphism treatment
5. Validate and build
