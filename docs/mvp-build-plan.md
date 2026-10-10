# Tapovan Menu MVP Build Plan

## Week 1: Prototype

- Public live menu page
- Sample cafe data
- Available and sold-out sections
- Admin ingredient toggles
- QR link for one demo cafe

## Week 2: Multi-cafe MVP

- Cafe accounts
- Unique cafe slug URLs
- Menu categories
- Dish editor
- Ingredient editor
- Dish-to-ingredient mapping

## Week 3: Pilot readiness

- QR poster download
- Basic owner onboarding
- Mobile polish
- Basic analytics: scans and unavailable dishes
- Staff activity log

## Week 4: Tapovan pilot

- Onboard 5 to 10 cafes
- Print QR stickers or table stands
- Train staff in 5 minutes
- Collect owner feedback
- Convert active cafes to monthly plan

## MVP acceptance criteria

- A cafe can create or receive a unique QR menu URL.
- A customer can open the menu without login.
- A staff member can mark an ingredient unavailable.
- Dishes using that ingredient become unavailable automatically.
- A staff member can restore the ingredient and dishes become available again.
- The system supports more than one cafe from the same backend.


## Mobile-first admin priority

Build the ingredient disable/enable screen before advanced owner analytics. This is the core cafe-staff workflow Vaibhav asked for.

Acceptance criteria:

- Staff can open admin on mobile browser.
- Cafe name and area are visible at the top.
- Ingredient list has large one-tap toggles.
- Staff can set Available, Low, Missing, Not ready, Sold out, Back soon.
- Affected dishes update immediately after ingredient status changes.
- Customer live menu reflects the latest status.
