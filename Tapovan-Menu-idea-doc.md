# Tapovan Menu

## One-line idea

Tapovan Menu is a single live-menu platform for cafes, restaurants, hostels, and hotels where customers scan a QR code and see what is actually available right now, while staff update ingredient or dish availability from a simple admin panel.

## Problem

Cafes and hotels usually print menus once, but daily availability changes because ingredients run out, kitchen staff are busy, equipment has issues, or some dishes are paused for the day. Customers still see those items on the printed menu, ask for them, and then get disappointed when staff says “not available.” Staff also wastes time repeating the same explanation many times.

Tapovan has many cafes, hostels, hotels, and food counters. A shared live-menu system can solve this once for many businesses without building a separate app for every cafe.

## Target users

### Customers

Tourists, hostel guests, cafe visitors, and walk-in customers who want to quickly know what they can order right now.

### Cafe / restaurant staff

Kitchen or counter staff who need a fast way to mark ingredients or dishes unavailable during the day.

### Cafe / hotel owners

Owners who want fewer customer complaints, less staff confusion, cleaner menu presentation, and a modern QR-based experience.

## Core concept

Each cafe gets its own QR code and live menu page, but the platform is one shared product.

Example URLs:

- `tapovanmenu.com/lilys-cafe`
- `tapovanmenu.com/ganga-view-cafe`
- `tapovanmenu.com/hostel-rooftop-kitchen`

The cafe prints or displays a QR code beside its normal menu. Customer scans it and sees:

- Available Now
- Sold Out Today
- Category filters like Drinks, Snacks, Meals, Breakfast
- Clear reason if an item is unavailable, such as “Paneer missing” or “Batter not ready”

Admin/staff logs in and updates:

- Ingredients available/unavailable
- Direct dish available/unavailable
- Reason for unavailability
- Optional expected return time

If an ingredient is unavailable, all dishes that depend on it automatically become unavailable.

## Example flow

### Customer flow

1. Customer sees printed menu at Lily’s Cafe.
2. Customer scans “Scan live menu” QR.
3. Mobile page opens for Lily’s Cafe.
4. Customer sees available items first.
5. Sold-out items are still visible below, with reason.
6. Customer orders without asking staff repeatedly.

### Admin flow

1. Staff opens Tapovan Menu admin panel.
2. Staff selects Lily’s Cafe.
3. Staff marks “Paneer” as unavailable.
4. Paneer Sandwich, Paneer Pasta, and Paneer Paratha automatically move to Sold Out Today.
5. Staff restores Paneer when stock arrives.
6. Customer menu updates instantly.

## Professional product flow

Tapovan Menu should be sold as one shared platform for the whole Tapovan market, not as a separate app per cafe. Each business gets its own outlet profile, QR code and live menu page. Staff only need to update ingredients or dish availability during the day, while customers keep using the same QR next to the printed menu.

The professional demo should show three connected surfaces:

1. **Printed-menu QR** — the cafe keeps its existing menu and adds a Tapovan Menu QR sticker or table card.
2. **Customer live menu** — guests scan and see available dishes first, with sold-out dishes faded and explained.
3. **Admin control panel** — staff mark ingredients or dishes as unavailable, and affected menu items update automatically.

This makes the idea easy to explain to Tapovan owners: “aapka printed menu same rahega, bas availability live ho jayegi.”

See the detailed product flow in [docs/product-flow.md](docs/product-flow.md) and the design brief in [docs/design-brief.md](docs/design-brief.md).

## Product modules

### 1. Public live menu

Mobile-first menu page opened by QR code.

Must include:

- Cafe/restaurant name as the first visible header
- Location or branch label, such as Tapovan, Rishikesh
- Basic branding/logo
- Category tabs
- Available items list
- Sold-out items list
- Price
- Short item description if available
- Last updated time

### QR scanner identity rule

The QR scan experience must also show the cafe/restaurant identity below the scanner or QR block. Before the customer even lands on the menu, the screen or poster should confirm which outlet this QR belongs to.

Required scanner/footer text:

- Cafe/restaurant name below the scan area
- Area/branch below the name
- “Powered by Tapovan Menu” as a small trust label

Example:

```text
Scan live menu
[ QR / scanner area ]
Lily’s Cafe
Tapovan, Rishikesh
Powered by Tapovan Menu
```

This is useful when QR stickers or table cards are placed close to each other, or when a hotel/cafe has multiple counters.

### Customer header rule

The live menu must always show the restaurant/cafe name at the top after scan. QR scanning confirms the outlet behind the scenes, but the customer still needs visible trust: “I scanned Lily’s Cafe, and this is Lily’s Cafe live menu.” The header should include:

- Cafe/restaurant name
- Area or branch label
- Live status: Open, Closing soon, Closed, or Updated just now
- Optional logo/photo

This avoids confusion when many Tapovan cafes use the same Tapovan Menu platform.

### 2. Admin panel

Simple staff dashboard.

Must include:

- Login or PIN-based access
- Menu item management
- Ingredient list
- Toggle ingredient availability
- Toggle dish availability directly
- Add reason: missing, low stock, chef unavailable, machine issue, paused today
- Save/publish instantly

### 3. Multi-cafe platform

One backend supports many cafes.

Must include:

- Restaurant/cafe account
- Unique QR link per cafe
- Separate menu data per cafe
- Separate staff access per cafe
- Basic subscription or monthly billing support later

## Data model

### Cafe

- Cafe ID
- Name
- Slug URL
- Address/location
- Logo/photo
- Owner contact
- Active/inactive status

### Menu category

- Category ID
- Cafe ID
- Name: Drinks, Snacks, Breakfast, Meals
- Sort order

### Dish

- Dish ID
- Cafe ID
- Category ID
- Name
- Price
- Description
- Required ingredient IDs
- Manual availability status
- Reason if unavailable
- Photo optional

### Ingredient

- Ingredient ID
- Cafe ID
- Name
- Available/unavailable
- Reason
- Last updated by
- Last updated time

### Staff user

- Staff ID
- Cafe ID
- Name
- Role: owner, manager, staff
- Login method

## MVP scope

### P0 must-have

- One shared platform for multiple cafes
- QR-based public menu page
- Cafe-specific menu URL
- Admin login for each cafe
- Add/edit menu categories and dishes
- Add/edit ingredients
- Mark ingredient unavailable
- Auto-mark dishes unavailable based on missing ingredients
- Mark dish unavailable directly
- Show available and unavailable items clearly to customers

### P1 nice-to-have

- Item photos
- “Back in 30 min” expected time
- WhatsApp order/contact button
- Print-ready QR poster generator
- Basic analytics: QR scans, most viewed items, most unavailable items
- Staff activity log

### P2 future

- OCR scan of printed menu to create digital menu automatically
- Customer ordering and payment
- Table-wise QR codes
- Multi-branch support
- Hotel room-service menu
- Inventory quantity tracking
- POS integration
- Owner mobile app

## Non-goals for v1

- Full food delivery marketplace
- Payment processing
- Complex inventory accounting
- Swiggy/Zomato-style discovery feed
- Separate native app per cafe
- Full POS replacement

## Why one platform is better than separate apps

Building a separate app for every cafe will be slow, expensive, and hard to maintain. Most cafes do not need a full app. They need one QR page and one simple admin panel.

Tapovan Menu should work like a SaaS:

- One product
- Many cafe accounts
- One admin system
- Separate QR link per cafe
- Cafe-specific branding and menu data

This makes it possible to onboard many cafes quickly.

## Business model

### Option 1: Monthly subscription

- Starter: ₹499/month per cafe
- Pro: ₹999/month per cafe with photos, analytics, QR posters
- Hotel/hostel plan: custom pricing for multiple menus or branches

### Option 2: Setup fee + low monthly

- One-time setup: ₹1,999 to digitize menu and create QR
- Monthly: ₹299–₹799 depending on features

### Option 3: Free trial

- 14 days free
- Owner sees value after staff starts using it daily

## Go-to-market for Tapovan

Tapovan has dense cafe/hotel concentration, so this can be sold locally with direct demos.

Pitch line:

> “Your printed menu stays the same, but customers scan QR to see what is actually available right now.”

Initial target businesses:

- Cafes with large menus
- Hostels with rooftop kitchens
- Hotels with room-service menus
- Tourist-heavy restaurants
- Places where items often run out

Sales approach:

1. Create demo for Lily’s Cafe style menu.
2. Show owner the QR customer page.
3. Show staff how ingredient toggle changes menu instantly.
4. Offer free setup for first 5–10 cafes.
5. Print QR standees/table stickers.
6. Convert to monthly plan after trial.

## Demo script for Vaibhav / cafe owner

1. “Aapka printed menu same rahega.”
2. “Bas iske side me QR laga denge.”
3. “Customer scan karega aur live menu khulega.”
4. “Jo item available hai woh top par dikhega.”
5. “Jo item abhi nahi ban sakta woh sold-out reason ke saath dikhega.”
6. “Staff sirf ingredient toggle karega, dish automatic update ho jayegi.”
7. “Har cafe ka alag QR, par product ek hi platform.”

## Success metrics

### For cafes

- Fewer “ye available hai kya?” questions
- Less customer disappointment
- Faster order decisions
- Staff updates menu in under 30 seconds
- Most unavailable items identified over time

### For Tapovan Menu business

- 10 pilot cafes onboarded
- 70% of pilot cafes using admin panel weekly
- 50+ QR scans per active cafe per week
- 5 paid cafes within first month after pilot
- Less than 5 minutes average setup time after menu data entry

## Technical approach

### Frontend

- Public mobile menu page
- Admin web dashboard
- QR poster/download page

### Backend

- Multi-tenant database with cafe ID
- Menu/category/dish/ingredient APIs
- Availability calculation service
- Staff authentication

### Suggested stack

- Web app: Next.js or React
- Backend: Node.js/Express or FastAPI
- Database: PostgreSQL or Supabase
- Hosting: Vercel/Render/Fly.io
- Auth: simple email/password or PIN for MVP

## Risks and mitigations

### Staff may forget to update availability

Mitigation: keep admin panel extremely simple; add morning reminder and quick toggles.

### Menu data entry may take time

Mitigation: offer setup service; later add OCR menu import.

### Owners may resist monthly fee

Mitigation: start with free trial and one-time setup option.

### Customers may still prefer printed menu

Mitigation: QR complements the printed menu; it does not replace it.

## Recommended MVP build plan

### Week 1: Prototype

- Public menu page
- Admin ingredient toggle
- Sample cafe data
- QR link

### Week 2: Multi-cafe MVP

- Cafe accounts
- Unique slugs
- Menu editor
- Dish-to-ingredient mapping

### Week 3: Pilot readiness

- QR poster generator
- Owner onboarding flow
- Basic analytics
- Polish mobile UI

### Week 4: Tapovan pilot

- Onboard 5–10 cafes
- Collect owner/staff feedback
- Track usage
- Improve setup and admin flow

## Final product positioning

Tapovan Menu is not a separate app for every cafe. It is one shared live-menu platform for local cafes and hotels.

The customer benefit is simple: scan QR and know what is available right now.

The owner benefit is simple: fewer confused customers, less repeated staff explanation, and a modern menu experience without reprinting menus every time something changes.
