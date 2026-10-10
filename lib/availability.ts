import type { Dish, Ingredient } from "@/data/demo";

export function getDishAvailability(dish: Dish, ingredients: Ingredient[]) {
  if (dish.manualStatus !== "available") return { available: false, label: "Sold out", reason: "Paused by staff" };
  const missing = dish.ingredientIds.map((id) => ingredients.find((ingredient) => ingredient.id === id)).filter(Boolean).filter((ingredient) => ingredient!.status === "missing" || ingredient!.status === "not_ready");
  if (missing.length > 0) return { available: false, label: "Sold out today", reason: missing[0]!.reason ?? `${missing[0]!.name} unavailable` };
  const low = dish.ingredientIds.map((id) => ingredients.find((ingredient) => ingredient.id === id)).filter(Boolean).find((ingredient) => ingredient!.status === "low");
  if (low) return { available: true, label: "Few left", reason: low.reason ?? `${low.name} low stock` };
  return { available: true, label: "Available", reason: "Ready now" };
}

export function statusLabel(status: Ingredient["status"]) {
  switch (status) {
    case "available": return "Available";
    case "low": return "Low";
    case "missing": return "Missing";
    case "not_ready": return "Not ready";
  }
}
