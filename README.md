# Swift Drive — independent concept redesign

A cinematic, responsive multi-page concept for Swift Drive Service, built with Vite, React, TypeScript and Tailwind CSS. This is an independent portfolio concept, not the official website. It does not confirm bookings, process payments or store enquiry data.

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Build and preview the production output with:

```sh
npm run build
npm run preview
```

## Pages

- `/` — image-led home, five-image reference gallery with category filters, monochrome hero and services banner.
- `/fleet` — category filter and vehicle detail disclosures for the models referenced in the project brief.
- `/book` — validated rental enquiry form and WhatsApp message preparation.
- `/services` — service information deliberately held pending business verification.
- `/contact` — central contact setup guidance and an enquiry CTA.

Navigation uses the browser History API. Vite serves the SPA fallback in development. `vercel.json` rewrites direct route requests to the application entry point for refreshes and direct visits on Vercel.

## Owner-editable business information

Edit `src/config/business.ts`:

- `whatsappNumber` — add only a verified number in international digits (country code plus number, no `+`, spaces or punctuation). Leave blank until confirmed; the form then shows a setup message rather than opening an invented number.
- `phoneNumber`, `emailAddress`, `address` — empty contact slots for owner-approved details.
- `locations` — Abuja and Benin were mentioned in the supplied brief, but remain marked `verified: false`.
- `confirmedServices` — intentionally empty until services have been verified.
- `conceptImages` and each vehicle's `image` — these use local Wikimedia Commons photographs as visual references, not verified Swift Drive fleet imagery. Recent references include a black Prado Black Onyx, a white 2025 Prado 250, and black/white 2024 Hilux models. The homepage hero and service banner are shown in greyscale; fleet reference photographs retain their natural colour. Sources, creators and licences are documented in [`public/images/credits.html`](./public/images/credits.html); paths are listed in [`public/images/README.md`](./public/images/README.md). Confirm owner-approved imagery before presenting any image as an actual business vehicle.

The four vehicle names and their broad SUV/Pickup categories were supplied in the project brief, not verified against the live business website. They are labeled as unverified references throughout the experience. No price, specification, availability, direct contact channel, customer endorsement or service guarantee is asserted.

The WhatsApp form validates required journey and contact details, checks date order and email format, URL-encodes a readable message, and only opens WhatsApp when a number has been configured. Submitting an enquiry never confirms a reservation or payment.

The interface uses Manrope for both display and body text, with system sans-serif fallbacks. Google Fonts is an optional remote font source; the site falls back gracefully if it is unavailable.

## Deployment

Vercel is configured in `vercel.json`:

- Build command: `npm run build`
- Output directory: `dist`

Google Fonts requires an internet connection; the site falls back to system sans-serif fonts. Local vehicle photography remains available offline. Replace illustrative assets with owner-approved photographs before presenting the website as an official business fleet.
