create table if not exists outlets (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  area text not null,
  address text,
  logo_url text,
  admin_pin_hash text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists menu_categories (id uuid primary key default gen_random_uuid(), outlet_id uuid not null references outlets(id) on delete cascade, name text not null, sort_order int not null default 0);
create table if not exists ingredients (id uuid primary key default gen_random_uuid(), outlet_id uuid not null references outlets(id) on delete cascade, name text not null, status text not null default 'available' check (status in ('available','low','missing','not_ready')), reason text, updated_at timestamptz not null default now());
create table if not exists dishes (id uuid primary key default gen_random_uuid(), outlet_id uuid not null references outlets(id) on delete cascade, category_id uuid references menu_categories(id) on delete set null, name text not null, price integer not null, description text, photo_url text, emoji text default '🍽️', manual_status text not null default 'available' check (manual_status in ('available','sold_out','paused')), sort_order int not null default 0);
create table if not exists dish_ingredients (dish_id uuid not null references dishes(id) on delete cascade, ingredient_id uuid not null references ingredients(id) on delete cascade, primary key (dish_id, ingredient_id));
create table if not exists availability_events (id uuid primary key default gen_random_uuid(), outlet_id uuid not null references outlets(id) on delete cascade, target_type text not null check (target_type in ('ingredient','dish')), target_id uuid not null, old_status text, new_status text not null, reason text, created_at timestamptz not null default now());
create table if not exists qr_scans (id uuid primary key default gen_random_uuid(), outlet_id uuid not null references outlets(id) on delete cascade, scanned_at timestamptz not null default now(), user_agent text, referrer text);
