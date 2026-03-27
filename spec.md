# Anyi Website

## Current State
The backend has a `ContactInfo` type with `email`, `phone`, and `address` fields. `getContactInfo()` and `updateContactInfo()` are already implemented and admin-protected. The frontend Contact section uses a static `src/frontend/src/config/contact.ts` file and does NOT fetch from the backend. There is no UI to update contact info after the admin CMS was removed.

## Requested Changes (Diff)

### Add
- A hidden admin settings page at `/admin-settings` that shows a form to configure the contact email (and phone/address). Admin must be logged in (use `isCallerAdmin()` to gate access). The form reads current values from `getContactInfo()` and saves via `updateContactInfo()`.
- The Contact section (in HomePage or wherever "Get In Touch" is rendered) should fetch the contact email from the backend via `getContactInfo()`, using the static `CONTACT.email` from `contact.ts` as fallback if the backend call fails.

### Modify
- The "Get In Touch" / Contact section on the homepage: fetch `contactInfo` from backend on mount, use `email` from backend response (fallback to `CONTACT.email` from static config if unavailable).

### Remove
- Nothing removed.

## Implementation Plan
1. Create `src/frontend/src/pages/AdminSettingsPage.tsx` — a simple page with:
   - Auth gate: calls `isCallerAdmin()`, shows "Unauthorized" if not admin
   - Form with fields: Email, Phone, Address (pre-filled from `getContactInfo()`)
   - Save button calls `updateContactInfo()` with new values
   - Success/error feedback
2. Add `/admin-settings` route in `App.tsx`
3. Update the Contact section component to call `getContactInfo()` on mount and use the returned email (with static fallback)
