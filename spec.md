# Anyi Website - About Page

## Current State
- About section exists inline in HomePage.tsx with title, body text, stats (10+ years, 320+ projects, 98% satisfaction), and a team image
- AdminPage has an AboutEditor with title + body text fields only
- Backend: `getAboutContent()` / `updateAboutContent()` return `{ title, body }`

## Requested Changes (Diff)

### Add
- Dedicated `/about` route with a full About page
- Page sections: Hero banner, Who We Are (same as homepage), Mission/Vision cards, Stats row, Team members grid, Values section, CTA
- All text content editable via admin (using existing `about.title` + `about.body`, plus frontend-level extended content)
- Navigation link to /about in NavBar

### Modify
- App.tsx: add `/about` route
- HomePage NavBar: add "About" link navigating to `/about`
- AdminPage AboutEditor: add fields for mission, vision, team tagline (stored as JSON in `about.body` for backward compat)

### Remove
- Nothing

## Implementation Plan
1. Create AboutPage.tsx with full sections: hero, who we are, mission/vision, stats, team grid, values, CTA
2. Update App.tsx routing
3. Update NavBar in HomePage to link About to /about
4. Enhance AdminPage AboutEditor to handle structured body content
