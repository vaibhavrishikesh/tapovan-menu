import Link from "next/link";
import { MenuScanner } from "@/components/MenuScanner";
import { getDishAvailability } from "@/lib/availability";
import { getActiveOutlets } from "@/lib/outlets";

export default async function HomePage() {
  const outlets = await getActiveOutlets();
  const featured = outlets[0];
  const cards = outlets.map((outlet) => {
    const enriched = outlet.dishes.map((dish) => getDishAvailability(dish, outlet.ingredients));
    return {
      outlet,
      ready: enriched.filter((entry) => entry.available).length,
      unavailable: enriched.filter((entry) => !entry.available).length
    };
  });

  return (
    <main className="page">
      <div className="shell landing-shell">
        <section className="hero landing-hero">
          <div className="landing-copy">
            <span className="eyebrow">Tapovan Menu · live availability</span>
            <h1 className="h1">Scan once. See what the cafe can serve right now.</h1>
            <p className="lead">Printed menus stay on the table. Tapovan Menu adds a live QR layer so guests see available dishes, sold-out items, and the exact cafe they scanned.</p>
            <div className="landing-actions">
              <Link className="cta" href={`/${featured.slug}`}>Open {featured.name}</Link>
              <a className="cta secondary" href="/print/lilys-cafe-qr-poster.svg" target="_blank" rel="noreferrer">Print demo QR</a>
            </div>
          </div>
          <MenuScanner />
        </section>

        <section className="landing-section">
          <div className="section-heading">
            <span className="eyebrow">First cafe live</span>
            <h2>Choose a cafe or scan its table QR</h2>
            <p className="muted">Lily&apos;s Cafe is the first demo outlet. As more Tapovan cafes join, this page becomes the directory.</p>
          </div>
          <div className="outlet-grid">
            {cards.map(({ outlet, ready, unavailable }) => (
              <article className="outlet-card" key={outlet.id}>
                <div>
                  <span className="scanner-pill">{outlet.area}</span>
                  <h3>{outlet.name}</h3>
                  <p className="muted">{outlet.address}</p>
                </div>
                <div className="outlet-stats">
                  <span><strong>{ready}</strong> ready</span>
                  <span><strong>{unavailable}</strong> unavailable</span>
                </div>
                <div className="qr-preview">
                  <img src={`/qr/${outlet.slug}.svg`} alt={`${outlet.name} Tapovan Menu QR code`} />
                  <div><strong>Scan for {outlet.name}</strong><small>Connected to /{outlet.slug}</small></div>
                </div>
                <div className="outlet-actions">
                  <Link className="cta" href={`/${outlet.slug}`}>View live menu</Link>
                  <Link className="cta secondary" href={`/admin/${outlet.slug}`}>Staff login</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="print-section">
          <div>
            <span className="eyebrow">Cafe test print</span>
            <h2>Print this QR and place it beside Lily&apos;s menu.</h2>
            <p className="muted">Customers scan the Tapovan Menu code, land directly on Lily&apos;s Cafe, and see live availability from Supabase.</p>
          </div>
          <a className="poster-link" href="/print/lilys-cafe-qr-poster.svg" target="_blank" rel="noreferrer">
            <img src="/print/lilys-cafe-qr-poster.svg" alt="Printable Tapovan Menu QR poster for Lily's Cafe" />
          </a>
        </section>
      </div>
    </main>
  );
}
