# Tapovan Menu

Tapovan Menu is a mobile-first live-menu webapp for cafes, hotels, hostels, and restaurants. Customers scan a QR code beside the printed menu and see what is actually available right now. Staff update ingredients or dishes from a simple admin panel, and affected dishes become unavailable automatically.

![Tapovan Menu product flow](assets/tapovan-menu-product-flow.svg)

A polished cafe-scene concept mockup is also saved at [assets/tapovan-menu-professional-flow.png](assets/tapovan-menu-professional-flow.png), and the earlier pitch mockup is saved at [assets/tapovan-menu-pitch-mockup.png](assets/tapovan-menu-pitch-mockup.png).

## Why this exists

Printed menus do not change during the day, but real availability changes constantly. Milk runs low, paneer is missing, batter is not ready, a machine stops working, or a chef pauses a dish. Customers still ask for those items because they are printed on the menu.

Tapovan Menu keeps the printed menu, but adds a live QR layer.

## Core flow

1. Owner creates one Tapovan Menu outlet profile.
2. Staff digitizes the printed menu with categories, dishes, prices and photos.
3. Staff maps ingredients like paneer, batter, milk or bread to affected dishes.
4. Cafe places a QR sticker or table stand beside the printed menu.
5. Customer scans the QR code and sees available dishes first.
6. Staff updates ingredients or dishes from the admin panel during the day.
7. The public live menu updates immediately, including every dish affected by a missing ingredient.

## Product model

This is one platform for many cafes, not a separate app for every cafe.

Example URLs:

- `tapovanmenu.com/lilys-cafe`
- `tapovanmenu.com/ganga-view-cafe`
- `tapovanmenu.com/hostel-rooftop-kitchen`

Each cafe gets:

- Unique QR code with cafe/restaurant name printed below it
- Scanner/QR preview area that also shows the cafe/restaurant name below the scan target
- Public live menu page with cafe/restaurant name at the top
- Location or area label so guests know which outlet they scanned
- Admin panel
- Menu categories and dishes
- Ingredient availability controls
- Optional custom branding


## Current implementation demo

The repository now includes a working Next.js MVP shell. With Supabase environment variables configured, Lily's Cafe menu data loads from Supabase and staff ingredient changes persist to the database. If env keys are missing, the app falls back to local demo data so the UI can still be shown.

Run locally:

```bash
npm install
npm run dev
```

Demo routes:

- Customer live menu: `http://localhost:3000/lilys-cafe`
- Staff PIN login: `http://localhost:3000/admin/lilys-cafe`
- Ingredient update screen: `http://localhost:3000/admin/lilys-cafe/ingredients`
- Demo PIN: `1234`

The admin ingredient screen is interactive: tap ingredients to cycle through Available, Low, Missing, and Not ready. Affected dishes update immediately on screen, and with Supabase env configured the change is saved through the server API.

## Supabase setup

Use the existing Supabase project from the dashboard screenshot:

- Project URL: `https://jqtcsnlfeqtazacivnen.supabase.co`
- Region: South Asia / Mumbai

Before Vercel deployment, add these environment variables in Vercel and locally in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://jqtcsnlfeqtazacivnen.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=replace-with-supabase-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=replace-with-service-role-key-for-server-actions-only
ADMIN_SESSION_SECRET=replace-with-long-random-secret
```

Run these in the Supabase SQL editor, in this order:

1. `supabase/schema.sql`
2. `supabase/seed-demo.sql`

The app keeps a local demo fallback when env keys are missing. After adding `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`, the public menu reads Lily's Cafe from Supabase and the staff ingredient screen persists status changes. Keep the service role key only in server/Vercel environment variables; never paste it into client code.

## Vercel deployment

Set these production environment variables on the Vercel project before deploying:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_SESSION_SECRET`

The current Vercel CLI token on this machine is invalid. Run `npx vercel login` or reconnect Vercel in the dashboard, then link/deploy this repository. After env variables are set, a production build should read the same Supabase Lily's Cafe data and persist admin ingredient changes.

## Documents

- [Idea document](Tapovan-Menu-idea-doc.md)
- [Professional product flow](docs/product-flow.md)
- [Design brief](docs/design-brief.md)
- [Supabase architecture](docs/supabase-architecture.md)
- [Mobile-first webapp plan](docs/mobile-first-webapp.md)
- [Flow diagram](docs/flow-diagram.md)
- [MVP build plan](docs/mvp-build-plan.md)

## Demo pitch line

> Keep your printed menu. Tapovan Menu makes availability live.
