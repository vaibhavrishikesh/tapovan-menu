# Tapovan Menu implementation notes

## Confirmed choices

- Product type: mobile-first webapp/PWA
- Stack: Next.js + Supabase + Vercel
- First auth style: staff PIN login
- First demo outlet: Lily's Cafe, Tapovan, Rishikesh

## Implemented first pass

- Next.js app scaffold
- Customer live menu page: `/lilys-cafe`
- Staff PIN login page: `/admin/lilys-cafe`
- Mobile ingredient screen: `/admin/lilys-cafe/ingredients`
- Demo PIN: `1234`
- Local Lily's Cafe menu data from the provided photos in `data/demo.ts`
- Availability logic in `lib/availability.ts`
- Interactive client-side ingredient toggles in `components/IngredientManager.tsx`
- Supabase schema draft in `supabase/schema.sql`

## Next implementation steps

1. Copy Supabase anon/service keys into `.env.local` and Vercel.
2. Apply `supabase/schema.sql` in the Supabase SQL editor.
3. Convert the interactive ingredient toggles from local state to Supabase server actions.
4. Replace local fallback reads with Supabase reads.
5. Deploy to Vercel.
6. Generate printable QR/table stand links for Lily's Cafe.


## Menu photos processed

The first Lily's Cafe demo menu uses the supplied Downloads photos:

- `IMG_0279.HEIC`: Lily's Cafe cover
- `IMG_0280.HEIC`: Blended Garden + Lily's Kitchen
- `IMG_0281.HEIC`: Toast House + Mediterranean
- `IMG_0282.HEIC`: Warm drinks + refreshing drinks

Converted inspection copies were generated under `/private/tmp/tapovan-menu-images` during implementation; the app data is stored as text in `data/demo.ts`.

## Supabase project

Dashboard screenshot shows the project URL as `https://jqtcsnlfeqtazacivnen.supabase.co`. Use that as `NEXT_PUBLIC_SUPABASE_URL`; do not commit Supabase keys.
