# Anyi Website

## Current State
New project with no existing application files.

## Requested Changes (Diff)

### Add
- Public marketing website with sections: Hero, About, Services, Gallery/Portfolio, Testimonials, Contact, Footer
- Navigation bar with smooth scrolling to sections
- Content Management Panel (admin dashboard) protected by authorization
- CMS capabilities: edit hero text, about text, services list, gallery images (via blob storage), testimonials, contact info
- Subtle animations on scroll (fade-in, slide-in)
- Mobile-responsive layout
- Social media links in footer
- Large bold typography, generous whitespace, modern design

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: Store site content (hero, about, services, testimonials, contact info) in stable variables. CRUD APIs for each content section. Authorization for admin access. Blob storage for gallery images.
2. Frontend public site: Full-page scrollable marketing site with all sections, smooth scroll nav, scroll animations.
3. Frontend CMS panel: Admin login -> dashboard to edit all text content and manage gallery images (upload/delete via blob storage).
4. Wire authorization component for admin login/logout.
5. Wire blob-storage component for gallery image uploads.
