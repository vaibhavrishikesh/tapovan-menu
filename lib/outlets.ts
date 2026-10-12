import { demoOutlet, demoOutlets, type Dish, type Ingredient, type Outlet } from "@/data/demo";
import { getSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase";

type OutletRow = {
  id: string;
  slug: string;
  name: string;
  area: string;
  address: string | null;
  admin_pin: string | null;
  updated_at: string;
  menu_categories: Array<{ id: string; name: string; sort_order: number }> | null;
  ingredients: Array<{ id: string; name: string; status: Ingredient["status"]; reason: string | null; updated_at: string }> | null;
  dishes: Array<{
    id: string;
    name: string;
    price: number;
    description: string | null;
    emoji: string | null;
    manual_status: Dish["manualStatus"];
    sort_order: number;
    category_id: string | null;
    dish_ingredients: Array<{ ingredient_id: string }> | null;
  }> | null;
};

function formatUpdatedAt(value: string | null | undefined) {
  if (!value) return "just now";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "just now";
  return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });
}

function rowToOutlet(row: OutletRow): Outlet {
  const categories = [...(row.menu_categories ?? [])].sort((a, b) => a.sort_order - b.sort_order);
  const categoryById = new Map(categories.map((category) => [category.id, category.name]));
  const ingredients = [...(row.ingredients ?? [])]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((ingredient) => ({
      id: ingredient.id,
      name: ingredient.name,
      status: ingredient.status,
      reason: ingredient.reason ?? undefined
    } satisfies Ingredient));
  const latestIngredientUpdate = (row.ingredients ?? []).map((ingredient) => ingredient.updated_at).sort().at(-1);

  const dishes = [...(row.dishes ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((dish) => ({
      id: dish.id,
      name: dish.name,
      category: categoryById.get(dish.category_id ?? "") ?? "Menu",
      price: dish.price,
      description: dish.description ?? "",
      emoji: dish.emoji ?? "🍽️",
      ingredientIds: (dish.dish_ingredients ?? []).map((entry) => entry.ingredient_id),
      manualStatus: dish.manual_status
    } satisfies Dish));

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    area: row.area,
    address: row.address ?? "",
    adminPin: row.admin_pin ?? demoOutlet.adminPin,
    updatedAt: formatUpdatedAt(latestIngredientUpdate ?? row.updated_at),
    categories: categories.map((category) => category.name),
    ingredients,
    dishes
  };
}

export async function getOutletBySlug(slug: string): Promise<Outlet | null> {
  if (!hasSupabaseConfig()) return demoOutlets.find((outlet) => outlet.slug === slug) ?? null;
  const supabase = getSupabaseServerClient();
  if (!supabase) return demoOutlets.find((outlet) => outlet.slug === slug) ?? null;

  const { data, error } = await supabase
    .from("outlets")
    .select(`
      id,
      slug,
      name,
      area,
      address,
      admin_pin,
      updated_at,
      menu_categories(id,name,sort_order),
      ingredients(id,name,status,reason,updated_at),
      dishes(id,name,price,description,emoji,manual_status,sort_order,category_id,dish_ingredients(ingredient_id))
    `)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle<OutletRow>();

  if (error) {
    console.error("Supabase outlet lookup failed", error.message);
    return demoOutlets.find((outlet) => outlet.slug === slug) ?? null;
  }
  if (!data) return demoOutlets.find((outlet) => outlet.slug === slug) ?? null;
  return rowToOutlet(data);
}


export async function getActiveOutlets(): Promise<Outlet[]> {
  if (!hasSupabaseConfig()) return demoOutlets;
  const supabase = getSupabaseServerClient();
  if (!supabase) return demoOutlets;

  const { data, error } = await supabase
    .from("outlets")
    .select(`
      id,
      slug,
      name,
      area,
      address,
      admin_pin,
      updated_at,
      menu_categories(id,name,sort_order),
      ingredients(id,name,status,reason,updated_at),
      dishes(id,name,price,description,emoji,manual_status,sort_order,category_id,dish_ingredients(ingredient_id))
    `)
    .eq("is_active", true)
    .order("name")
    .returns<OutletRow[]>();

  if (error) {
    console.error("Supabase outlets lookup failed", error.message);
    return demoOutlets;
  }
  return data?.length ? data.map(rowToOutlet) : demoOutlets;
}
