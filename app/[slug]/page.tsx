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
  return (
    <main className="page"><div className="shell">
      <section className="hero"><div className="header-row"><div><span className="eyebrow">Live menu by Tapovan Menu</span><h1 className="h1" style={{ fontSize: "clamp(38px, 11vw, 82px)" }}>{outlet.name}</h1><p className="lead" style={{ margin: 0 }}>{outlet.area}</p></div><span className="badge">Open now · Updated {outlet.updatedAt}</span></div><div className="category-tabs">{outlet.categories.map((category) => <span key={category}>{category}</span>)}</div></section>
      <section style={{ marginTop: 22 }} className="grid two">
        <div className="card"><span className="eyebrow">Available now</span><h2 style={{ margin: "8px 0 0" }}>{available.length} dishes ready</h2><div className="item-list">{available.map(({ dish, availability }) => <article className="menu-item" key={dish.id}><div className="food-img">{dish.emoji}</div><div><strong>{dish.name}</strong><p className="muted" style={{ margin: "6px 0" }}>{dish.description}</p><span className={availability.label === "Few left" ? "status low" : "status available"}>{availability.label}</span></div><div className="price">₹{dish.price}</div></article>)}</div></div>
        <div className="card"><span className="eyebrow">Sold out today</span><h2 style={{ margin: "8px 0 0" }}>{unavailable.length} unavailable</h2><div className="item-list">{unavailable.map(({ dish, availability }) => <article className="menu-item unavailable" key={dish.id}><div className="food-img">{dish.emoji}</div><div><strong>{dish.name}</strong><p className="muted" style={{ margin: "6px 0" }}>{availability.reason}</p><span className="status off">{availability.label}</span></div><div className="price">₹{dish.price}</div></article>)}</div></div>
      </section>
      <footer className="footer-nav"><Link className="active" href={`/${outlet.slug}`}>Live menu</Link><Link href={`/admin/${outlet.slug}`}>Staff login</Link><Link href={`/admin/${outlet.slug}/ingredients`}>Ingredients</Link></footer>
    </div></main>
  );
}
