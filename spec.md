# Anyi Website

## Current State
Full-stack ANYI website with pages: Home (`/`), About (`/about`), Solutions (`/solutions`), BPO Services (`/bpo`), Portfolio (`/portfolio`). Navigation includes Home, About, Solutions, BPO Services, Services, Portfolio, Testimonials, Contact. No Careers page exists.

## Requested Changes (Diff)

### Add
- `/careers` route in App.tsx
- `CareerPage.tsx` – full career page with:
  - Navbar (consistent with other pages, Careers highlighted)
  - Hero banner with breadcrumb
  - "Why Work at ANYI" section (culture, growth, values)
  - Open Positions section with job listing cards (department, location, type, apply button)
  - Perks & Benefits section (icons + short text)
  - CTA to send CV to email
  - Footer (consistent with other pages)
- "Careers" link in navbar across all pages (Home, About, BPO, Solutions, Portfolio, CareerPage)
- "Careers" link in footer navigation across all pages

### Modify
- `App.tsx` – add `/careers` route
- All page NavBars – add "Careers" to nav items list
- All page footers – add "Careers" link under Navigation column

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/pages/CareerPage.tsx` with full content
2. Update `src/frontend/src/App.tsx` to add `/careers` route
3. Update NavBar and footer in: HomePage, AboutPage, BPOPage, SolutionsPage, PortfolioPage to include Careers link
