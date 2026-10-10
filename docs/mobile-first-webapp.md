# Tapovan Menu mobile-first webapp plan

Vaibhav's requirement is clear: Tapovan Menu should start as a **mobile-first webapp**, not a native mobile app. Staff should be able to open a link on any phone and quickly disable ingredients or dishes during cafe operations.

## Why webapp first

- No Play Store/App Store install needed for cafe staff.
- Works from any phone browser: Android, iPhone, tablet, laptop.
- QR customer menu is naturally a web page.
- Faster MVP: one Next.js app can serve customer menu, staff admin and owner dashboard.
- Later it can become a PWA with “Add to Home Screen”.

## Priority screen: ingredient disable/enable

This should be the first serious admin screen in the MVP.

### Staff flow

1. Staff opens `tapovanmenu.com/admin/lilys-cafe` or scans staff QR.
2. Staff enters PIN/login.
3. Staff sees the **Ingredients** screen first.
4. Staff toggles an ingredient:
   - Paneer → unavailable
   - Batter → not ready
   - Milk → low stock
5. Tapovan Menu automatically marks affected dishes unavailable or low stock.
6. Customer live menu updates immediately.

### Mobile screen layout

```text
Lily's Cafe
Tapovan, Rishikesh
Updated just now

Search ingredients...

Ingredients
[ Available ] Fresh Tomatoes       toggle ON
[ Low ]       Milk                  toggle ON + Low label
[ Missing ]   Paneer                toggle OFF
[ Not ready ] Batter                toggle OFF

Affected dishes
Paneer Pasta        Unavailable · Paneer missing
Veg Omelette        Unavailable · Batter not ready
Pancakes            Unavailable · Batter not ready
```

## Admin tabs for MVP

1. **Today** — quick summary: unavailable ingredients, unavailable dishes, last update.
2. **Ingredients** — main daily operation screen.
3. **Dishes** — direct dish-level disable/enable.
4. **Live Menu** — preview what customers see.
5. **QR** — customer QR and staff QR.

## Design rules

- Mobile first: one-thumb operation.
- Big toggles, not small desktop controls.
- Ingredient disable action should take under 5 seconds.
- Cafe name and area must always be visible at the top.
- Show affected dishes immediately after an ingredient is disabled.
- Use simple status labels: Available, Low, Missing, Not ready, Sold out, Back soon.
- Keep owner analytics secondary for MVP; daily staff operation comes first.

## Suggested MVP build order

1. Customer live menu page.
2. Cafe/outlet model with QR URL.
3. Staff PIN/login.
4. Ingredient disable/enable screen.
5. Dish-to-ingredient mapping.
6. Auto affected-dish calculation.
7. Live menu preview.
8. Basic scan/update analytics.

## Pitch line for Vaibhav

Tapovan Menu is a mobile-first webapp. Cafe staff do not install anything. They open the admin link, disable missing ingredients in seconds, and the customer QR menu updates live.
