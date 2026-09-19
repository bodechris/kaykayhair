This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This project uses Chakra UI with Next.js App Router. Run the app with Webpack,
not Turbopack, to avoid the known Emotion hydration mismatch in development.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Appointment booking flow (September 2026)

The `/services` page now opens a Chakra UI booking drawer from the floating service tray. The customer flow includes:

- Exact subservice selection for every selected service category.
- Service-specific configurable questions (currently sourced from `components/booking/booking-config.ts`).
- Optional reference image selection (filename-only bridge until secure object storage is connected).
- Bookable dates and duration-aware time-slot UI.
- Customer contact details and a booking note.
- Per-service minimum deposit calculation and explicit non-refundable deposit acknowledgement.
- A `pending_payment` booking draft stored locally as a temporary development bridge.

Important production boundary: the current availability is deterministic frontend sample availability and the draft is not a global reservation. The next backend/admin pass should replace that bridge with database-backed working hours, staff calendars, blocked times, atomic slot holds, secure file uploads, payment-provider verification/webhooks, and persisted policy acceptance.

## Proactive form UX

All new forms should follow the same rule: if the application already knows the valid answer space, prefer a guided control over an empty text input.

- Dates: show human-readable upcoming choices first, with a future-constrained calendar fallback.
- Times: show formatted suggested times first, with a constrained time picker fallback.
- Known answer sets: use choice cards, toggles, chips, or selects rather than free text.
- Contact/payment/address details: provide browser autocomplete, the correct mobile keyboard (`inputMode`), and realistic examples.
- Open-ended text: reserve textareas for information that genuinely cannot be predicted.
- Validation: guide the user to the exact field and explain how to fix it; do not make them hunt for errors.
- Admin-created booking questions can use `date` and `time` types so they inherit the same guided controls automatically.
