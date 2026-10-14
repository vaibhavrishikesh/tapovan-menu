import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishAvailability } from "@/lib/availability";
import { getOutletBySlug } from "@/lib/outlets";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const outlet = await getOutletBySlug(params.slug);

  if (!outlet) {
    return {
      title: "Menu not found",
      description: "This Tapovan Menu cafe could not be found."
    };
  }

  const canonicalUrl = `https://tapovan-menu.vercel.app/${outlet.slug}`;
  const description = `Open ${outlet.name}'s live menu in ${outlet.area}. See what is available right now before ordering.`;

  return {
    title: `${outlet.name} Live Menu`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${outlet.name} Live Menu`,
      description,
      url: canonicalUrl,
      siteName: "Tapovan Menu",
      type: "website"
    },
    twitter: {
      card: "summary",
      title: `${outlet.name} Live Menu`,
      description
    }
  };
}

export default async function LiveMenuPage({ params }: { params: { slug: string } }) {
  const outlet = await getOutletBySlug(params.slug);
  if (!outlet) notFound();

  const enriched = outlet.dishes.map((dish) => {
    const availability = getDishAvailability(dish, outlet.ingredients);
    const hasLowStock = dish.ingredientIds.some((id) => outlet.ingredients.find((ingredient) => ingredient.id === id)?.status === "low");
    const status = availability.available ? (hasLowStock ? "low" : "available") : "off";

    return { dish, availability, status };
  });
  const isLilysCafe = outlet.slug === "lilys-cafe";
  const menuByCategory = outlet.categories
    .map((category) => ({
      category,
      items: enriched.filter(({ dish }) => dish.category === category)
    }))
    .filter((group) => group.items.length > 0);

  return (
    <main className="page customer-page">
      <div className="shell customer-shell">
        <header className="customer-topline">
          <div className="breadcrumb-line">
            <Link href="/">Tapovan Menu</Link>
            <span>/</span>
            <span>{outlet.name}</span>
          </div>
          <div className="customer-title-row">
            <div>
              <p className="customer-area">{outlet.area}</p>
              <h1>{outlet.name}</h1>
            </div>
            {isLilysCafe ? <img className="customer-logo-mini" src="/brand/lilys-logo.png" alt="Lily's Cafe logo" /> : null}
          </div>
        </header>

        <section className="customer-menu-section menu-only-section">
          <div className="menu-legend" aria-label="Menu status guide">
            <span><i className="status-dot available" /> Available</span>
            <span><i className="status-dot low" /> Few left</span>
            <span><i className="status-dot off" /> Not available</span>
          </div>
          <div className="menu-category-list">
            {menuByCategory.map(({ category, items }) => (
              <section className="menu-category" key={category}>
                <h2>{category}</h2>
                <div className="simple-menu-list menu-like-list">
                  {items.map(({ dish, availability, status }) => (
                    <article className={availability.available ? "simple-menu-item" : "simple-menu-item unavailable"} key={dish.id}>
                      <span className={`status-dot item-dot ${status}`} aria-label={status === "available" ? "Available" : status === "low" ? "Few left" : "Not available"} />
                      <div>
                        <strong>{dish.name}</strong>
                        <p>{availability.available ? dish.description : availability.reason}</p>
                      </div>
                      <div className="simple-price">₹{dish.price}</div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
