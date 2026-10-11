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
        <section className="hero landing-hero directory-hero">
          <div className="landing-copy">
            <span className="eyebrow">Tapovan Menu directory</span>
            <h1 className="h1">Scan a cafe QR or choose a cafe.</h1>
            <p className="lead">Each cafe has its own live menu. Scan the Tapovan Menu QR at the table, or pick the cafe from this list.</p>
            <div className="landing-actions">
              <Link className="cta" href={`/${featured.slug}`}>View {featured.name}</Link>
              <a className="cta secondary" href="/print/lilys-cafe-qr-poster.svg" target="_blank" rel="noreferrer">Print QR for Lily&apos;s Cafe</a>
            </div>
          </div>
        </section>

        <section className="landing-section">
          <div className="section-heading">
            <span className="eyebrow">Cafe list</span>
            <h2>Choose a live menu</h2>
            <p className="muted">As more cafes join Tapovan Menu, they appear here as cards with their area, availability count, and direct menu link.</p>
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
                  <div><strong>Scan for {outlet.name}</strong><small>Code: {outlet.slug} · opens /{outlet.slug}</small></div>
                </div>
                <div className="outlet-actions">
                  <Link className="cta" href={`/${outlet.slug}`}>View live menu</Link>
                  {outlet.slug === "lilys-cafe" ? <a className="cta light" href="/print/lilys-cafe-qr-poster.svg" target="_blank" rel="noreferrer">Download QR</a> : null}
                  <Link className="cta secondary" href={`/admin/${outlet.slug}`}>Staff login</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="scanner-section">
          <div className="section-heading compact-heading">
            <span className="eyebrow">Optional scanner</span>
            <h2>Already at a cafe?</h2>
            <p className="muted">Use this only when a customer wants to scan a Tapovan Menu QR from the browser. The cafe list above stays the main path.</p>
          </div>
          <MenuScanner />
        </section>

        <section className="print-section">
          <div>
            <span className="eyebrow">QR poster</span>
            <h2>Print QR for Lily&apos;s Cafe.</h2>
            <p className="muted">The poster keeps Tapovan Menu as the brand, then shows Lily&apos;s Cafe, code <strong>lilys-cafe</strong>, and a direct link to /lilys-cafe.</p>
          </div>
          <a className="poster-link" href="/print/lilys-cafe-qr-poster.svg" target="_blank" rel="noreferrer">
            <img src="/print/lilys-cafe-qr-poster.svg" alt="Printable Tapovan Menu QR poster for Lily's Cafe" />
          </a>
        </section>
      </div>
    </main>
  );
}
