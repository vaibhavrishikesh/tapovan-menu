-- Optional demo directory cafes for Tapovan Menu growth preview.
-- Safe to rerun: uses upsert and does not delete existing live cafe data.

insert into outlets (id, slug, name, area, address, admin_pin, is_active) values
  ('ganga-bliss-cafe', 'ganga-bliss-cafe', 'Ganga Bliss Cafe', 'Laxman Jhula', 'River-view cafe near the bridge', '1234', true),
  ('tapovan-roastery', 'tapovan-roastery', 'Tapovan Roastery', 'Tapovan Market', 'Small-batch coffee bar on the main lane', '1234', true),
  ('sadhu-bowl-house', 'sadhu-bowl-house', 'Sadhu Bowl House', 'Upper Tapovan', 'Healthy bowls and juices near yoga stays', '1234', true),
  ('namaste-breakfast-club', 'namaste-breakfast-club', 'Namaste Breakfast Club', 'Tapovan Road', 'All-day breakfast and chai spot', '1234', true)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  area = excluded.area,
  address = excluded.address,
  admin_pin = excluded.admin_pin,
  is_active = excluded.is_active,
  updated_at = now();

insert into menu_categories (id, outlet_id, name, sort_order) values
  ('ganga-bliss-cafe-coolers', 'ganga-bliss-cafe', 'Coolers', 10),
  ('ganga-bliss-cafe-quick-bites', 'ganga-bliss-cafe', 'Quick Bites', 20),
  ('ganga-bliss-cafe-breakfast', 'ganga-bliss-cafe', 'Breakfast', 30),
  ('tapovan-roastery-coffee', 'tapovan-roastery', 'Coffee', 10),
  ('tapovan-roastery-bakery', 'tapovan-roastery', 'Bakery', 20),
  ('sadhu-bowl-house-bowls', 'sadhu-bowl-house', 'Bowls', 10),
  ('sadhu-bowl-house-juices', 'sadhu-bowl-house', 'Juices', 20),
  ('namaste-breakfast-club-breakfast', 'namaste-breakfast-club', 'Breakfast', 10),
  ('namaste-breakfast-club-toast', 'namaste-breakfast-club', 'Toast', 20),
  ('namaste-breakfast-club-tea', 'namaste-breakfast-club', 'Tea', 30)
on conflict (id) do update set
  outlet_id = excluded.outlet_id,
  name = excluded.name,
  sort_order = excluded.sort_order;

insert into dishes (id, outlet_id, category_id, name, price, description, emoji, manual_status, sort_order) values
  ('ganga-lemon-mint', 'ganga-bliss-cafe', 'ganga-bliss-cafe-coolers', 'Lemon Mint Cooler', 90, 'Fresh lemon, mint and chilled soda.', '🍋', 'available', 10),
  ('ganga-veggie-sandwich', 'ganga-bliss-cafe', 'ganga-bliss-cafe-quick-bites', 'Veggie Sandwich', 160, 'Grilled bread with vegetables and cheese.', '🥪', 'available', 20),
  ('ganga-banana-pancake', 'ganga-bliss-cafe', 'ganga-bliss-cafe-breakfast', 'Banana Pancake', 180, 'Soft pancake with banana and honey.', '🥞', 'available', 30),
  ('roastery-americano', 'tapovan-roastery', 'tapovan-roastery-coffee', 'Americano', 120, 'Clean black coffee, hot or iced.', '☕', 'available', 10),
  ('roastery-cappuccino', 'tapovan-roastery', 'tapovan-roastery-coffee', 'Cappuccino', 160, 'Espresso with steamed milk foam.', '☕', 'available', 20),
  ('roastery-croissant', 'tapovan-roastery', 'tapovan-roastery-bakery', 'Butter Croissant', 140, 'Flaky morning croissant.', '🥐', 'available', 30),
  ('sadhu-sattvic-bowl', 'sadhu-bowl-house', 'sadhu-bowl-house-bowls', 'Sattvic Bowl', 240, 'Rice, dal, seasonal vegetables and chutney.', '🥣', 'available', 10),
  ('sadhu-green-juice', 'sadhu-bowl-house', 'sadhu-bowl-house-juices', 'Green Juice', 140, 'Cucumber, mint, lemon and greens.', '🥤', 'available', 20),
  ('sadhu-fruit-bowl', 'sadhu-bowl-house', 'sadhu-bowl-house-bowls', 'Fruit Bowl', 180, 'Fresh cut seasonal fruits.', '🍓', 'available', 30),
  ('namaste-masala-omelette', 'namaste-breakfast-club', 'namaste-breakfast-club-breakfast', 'Masala Omelette', 140, 'Egg omelette with onion, tomato and herbs.', '🍳', 'available', 10),
  ('namaste-aloo-toast', 'namaste-breakfast-club', 'namaste-breakfast-club-toast', 'Aloo Toast', 120, 'Spiced potato toast with chutney.', '🍞', 'available', 20),
  ('namaste-cutting-chai', 'namaste-breakfast-club', 'namaste-breakfast-club-tea', 'Cutting Chai', 50, 'Strong roadside-style chai.', '☕', 'available', 30)
on conflict (id) do update set
  outlet_id = excluded.outlet_id,
  category_id = excluded.category_id,
  name = excluded.name,
  price = excluded.price,
  description = excluded.description,
  emoji = excluded.emoji,
  manual_status = excluded.manual_status,
  sort_order = excluded.sort_order;
