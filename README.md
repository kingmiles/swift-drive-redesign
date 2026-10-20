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

- `/` — cinematic home, introductory brand note, featured fleet, service preview and booking CTA.
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
- `conceptImages` and each vehicle's `image` — replace the illustrative external photography URLs with owner-approved, correctly licensed vehicle images. Current images do not establish ownership or depict a verified model. Image loading failures show a fallback message.

The four vehicle names and their broad SUV/Pickup categories were supplied in the project brief, not verified against the live business website. They are labeled as unverified references throughout the experience. No price, specification, availability, direct contact channel, customer endorsement or service guarantee is asserted.

The WhatsApp form validates required journey and contact details, checks date order and email format, URL-encodes a readable message, and only opens WhatsApp when a number has been configured. Submitting an enquiry never confirms a reservation or payment.

## Deployment

Vercel is configured in `vercel.json`:

- Build command: `npm run build`
- Output directory: `dist`

External vehicle photography and Google Fonts require an internet connection. Replace them with owner-approved assets before production use.
