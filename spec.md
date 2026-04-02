# Anyi Website

## Current State
The Solutions page (`SolutionsPage.tsx`) has the following sections:
- Hero with nav buttons
- Communication (Office PBX, Multi-Channel, WhatsApp, Voice Auto Dialer)
- CRM Platform (Helpdesk Ticketing, Lead Management, Customized Applications)
- Integrations
- Hardware / Infra
- Smart Marks (AI-Powered Features)
- CTA
- Footer

## Requested Changes (Diff)

### Add
- New `ATTENDANCE_FEATURES` constant with key features of the Attendance Management Solution
- New "Attendance Management" section added **after Smart Marks and before the CTA**, making it the last solution section
- Uses the uploaded photo: `/assets/uploads/attandence_solution-019d4dd0-7c8e-71e8-ba1e-964a4dd8509c-1.jpeg`
- Hero nav quick-jump button for "Attendance" linking to `#attendance` anchor

### Modify
- Hero section: add "Attendance Management" quick-jump pill button in the navigation pills row

### Remove
- Nothing removed

## Implementation Plan
1. Add `ATTENDANCE_FEATURES` array constant with feature list for Attendance Management
2. Add hero pill button for "Attendance Management" → `#attendance`
3. Add new `<section id="attendance">` block after Smart Marks section and before CTA
   - Two-column layout: left = content/features, right = uploaded photo
   - Uses the uploaded image `/assets/uploads/attandence_solution-019d4dd0-7c8e-71e8-ba1e-964a4dd8509c-1.jpeg`
   - Consistent styling with other solution sections (glass-card, motion animations, primary colors)
