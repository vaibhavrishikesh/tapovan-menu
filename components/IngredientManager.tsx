"use client";

import { useMemo, useState } from "react";
import type { Ingredient, Outlet } from "@/data/demo";
import { getDishAvailability, statusLabel } from "@/lib/availability";

const cycleStatus: Ingredient["status"][] = ["available", "low", "missing", "not_ready"];

export function IngredientManager({ outlet }: { outlet: Outlet }) {
  const [ingredients, setIngredients] = useState(outlet.ingredients);
  const affected = useMemo(
    () => outlet.dishes
      .map((dish) => ({ dish, availability: getDishAvailability(dish, ingredients) }))
      .filter((entry) => !entry.availability.available),
    [ingredients, outlet.dishes]
  );
  const ready = outlet.dishes.length - affected.length;

  function rotateIngredient(id: string) {
    setIngredients((current) => current.map((ingredient) => {
      if (ingredient.id !== id) return ingredient;
      const next = cycleStatus[(cycleStatus.indexOf(ingredient.status) + 1) % cycleStatus.length];
      return {
        ...ingredient,
        status: next,
        reason: next === "available" ? undefined : next === "low" ? "Low stock" : next === "missing" ? `${ingredient.name} missing` : `${ingredient.name} not ready`
      };
    }));
  }

  return (
    <section className="grid two" style={{ marginTop: 22 }}>
      <div className="card">
        <span className="eyebrow">Fast mobile update</span>
        <h2 style={{ margin: "8px 0 0" }}>Ingredients</h2>
        <p className="muted">Tap any row to cycle: Available → Low → Missing → Not ready. Supabase will persist this in production.</p>
        <div className="metric-row">
          <div><strong>{ready}</strong><span>ready dishes</span></div>
          <div><strong>{affected.length}</strong><span>hidden today</span></div>
        </div>
        <div className="item-list">
          {ingredients.map((ingredient) => {
            const isOn = ingredient.status === "available" || ingredient.status === "low";
            return (
              <button className="ingredient-row ingredient-button" key={ingredient.id} type="button" onClick={() => rotateIngredient(ingredient.id)}>
                <div className="food-img">{isOn ? "✅" : "⚠️"}</div>
                <div>
                  <strong>{ingredient.name}</strong>
                  <p className="muted" style={{ margin: "6px 0" }}>{ingredient.reason ?? "Ready"}</p>
                  <span className={isOn ? (ingredient.status === "low" ? "status low" : "status available") : "status off"}>{statusLabel(ingredient.status)}</span>
                </div>
                <span className={isOn ? "toggle on" : "toggle off"}>{isOn ? "ON" : "OFF"}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="card">
        <span className="eyebrow">Auto impact</span>
        <h2 style={{ margin: "8px 0 0" }}>Affected dishes</h2>
        <p className="muted">Missing ingredients automatically remove dishes from the customer&apos;s live menu.</p>
        <div className="item-list">
          {affected.length === 0 ? <div className="notice">All dishes are available from current ingredients.</div> : affected.map(({ dish, availability }) => (
            <article className="menu-item unavailable" key={dish.id}>
              <div className="food-img">{dish.emoji}</div>
              <div>
                <strong>{dish.name}</strong>
                <p className="muted" style={{ margin: "6px 0" }}>{availability.reason}</p>
                <span className="status off">Unavailable</span>
              </div>
              <div className="price">₹{dish.price}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
