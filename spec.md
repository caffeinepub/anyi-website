# Anyi Website

## Current State
The Solutions page (`SolutionsPage.tsx`) has these sections in order:
1. Hero (with quick-nav buttons)
2. Communication
3. CRM Platform
4. Integrations
5. Hardware / Infra
6. Smart Marks
7. Attendance Management Solution (last, added in previous version)
8. CTA

## Requested Changes (Diff)

### Add
- New `EMERGENCY_CODE_FEATURES` constant array with 8 feature cards for Emergency Code Management
- New Section 7: Emergency Code Management Solution — placed AFTER Attendance and BEFORE the CTA (so it becomes the absolute last solution section)
- The section uses the generated photo `/assets/generated/solutions-emergency-code.dim_800x500.jpg`
- A "Emergency Code" quick-nav button in the Hero section
- New lucide icons as needed: `AlertOctagon`, `Radio`, `Activity`, `ShieldAlert`, `PhoneCall`, `ClipboardList`

### Modify
- Hero quick-nav buttons array: add `{ label: "Emergency Code", id: "emergency" }` as the last item
- Section ordering: Attendance stays where it is; Emergency Code Management is appended after it

### Remove
- Nothing removed

## Implementation Plan
1. Import any additional lucide icons needed (AlertOctagon, Radio, Activity, ShieldAlert, PhoneCall, ClipboardList)
2. Add `EMERGENCY_CODE_FEATURES` constant
3. Add hero nav button for Emergency Code
4. Add Section 7 with Emergency Code Management content and photo
