import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishAvailability } from "@/lib/availability";
import { getOutletBySlug } from "@/lib/outlets";

export default async function LiveMenuPage({ params }: { params: { slug: string } }) {
  const outlet = await getOutletBySlug(params.slug);
  if (!outlet) notFound();

  const enriched = outlet.dishes.map((dish) => ({ dish, availability: getDishAvailability(dish, outlet.ingredients) }));
  const available = enriched.filter((entry) => entry.availability.available);
  const unavailable = enriched.filter((entry) => !entry.availability.available);
  const isLilysCafe = outlet.slug === "lilys-cafe";
  const availableByCategory = outlet.categories
    .map((category) => ({
      category,
      items: available.filter(({ dish }) => dish.category === category)
    }))
    .filter((group) => group.items.length > 0);

  return (
    <main className="page customer-page">
      <div className="shell customer-shell">
        <section className="customer-hero cafe-hero">
          <span className="eyebrow">Live menu</span>
          {isLilysCafe ? (
            <div className="customer-brand-block">
              <img className="customer-logo" src="/brand/lilys-logo.png" alt="Lily's Cafe" />
              <h1 className="sr-only">{outlet.name}</h1>
            </div>
          ) : (
            <h1>{outlet.name}</h1>
          )}
          <p>{outlet.area}</p>
          <div className="customer-meta">
            <span>Available: {available.length}</span>
            <span>Unavailable: {unavailable.length}</span>
            <span>Updated {outlet.updatedAt}</span>
          </div>
        </section>

        <section className="customer-menu-section">
          <div className="simple-section-title">
            <span className="status-dot available" />
            <div>
              <h2>Available now</h2>
              <p>{available.length} items ready</p>
            </div>
          </div>
          <div className="menu-category-list">
            {availableByCategory.map(({ category, items }) => (
              <section className="menu-category" key={category}>
                <h3>{category}</h3>
                <div className="simple-menu-list menu-like-list">
                  {items.map(({ dish }) => (
                    <article className="simple-menu-item" key={dish.id}>
                      <div className="food-img">{dish.emoji}</div>
                      <div>
                        <strong>{dish.name}</strong>
                        <p>{dish.description}</p>
                      </div>
                      <div className="simple-price">₹{dish.price}</div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        {unavailable.length > 0 ? (
          <section className="customer-menu-section unavailable-section">
            <div className="simple-section-title">
              <span className="status-dot off" />
              <div>
                <h2>Unavailable today</h2>
                <p>{unavailable.length} items hidden from ordering</p>
              </div>
            </div>
            <div className="simple-menu-list">
              {unavailable.map(({ dish, availability }) => (
                <article className="simple-menu-item unavailable" key={dish.id}>
                  <div className="food-img">{dish.emoji}</div>
                  <div>
                    <strong>{dish.name}</strong>
                    <p>{availability.reason}</p>
                  </div>
                  <div className="simple-price">₹{dish.price}</div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <footer className="footer-nav">
          <Link className="active" href={`/${outlet.slug}`}>Live menu</Link>
          <Link href={`/admin/${outlet.slug}`}>Staff login</Link>
          <Link href={`/admin/${outlet.slug}/ingredients`}>Ingredients</Link>
        </footer>
      </div>
    </main>
  );
}
