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
            <h1 className="h1">Choose your cafe or scan its table QR.</h1>
            <p className="lead">Every cafe gets its own Tapovan Menu QR. Guests scan the code at the table or choose a cafe below to open that cafe’s live menu.</p>
            <div className="landing-actions">
              <Link className="cta" href={`/${featured.slug}`}>Open {featured.name}</Link>
              <a className="cta secondary" href="/print/lilys-cafe-qr-poster.svg" target="_blank" rel="noreferrer">Download Lily's QR</a>
            </div>
          </div>
          <MenuScanner />
        </section>

        <section className="landing-section">
          <div className="section-heading">
            <span className="eyebrow">Cafe directory</span>
            <h2>Live menus by cafe</h2>
            <p className="muted">Lily&apos;s Cafe is live first. When 10 cafes join, they appear here as separate cards with their own QR, cafe code, live menu, and staff login.</p>
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
                  <Link className="cta secondary" href={`/admin/${outlet.slug}`}>Staff login</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="print-section">
          <div>
            <span className="eyebrow">Cafe test print</span>
            <h2>Download the Lily&apos;s Cafe QR poster.</h2>
            <p className="muted">Each cafe gets a Tapovan Menu poster with its cafe name and code under the scan box. This one opens Lily&apos;s Cafe directly.</p>
          </div>
          <a className="poster-link" href="/print/lilys-cafe-qr-poster.svg" target="_blank" rel="noreferrer">
            <img src="/print/lilys-cafe-qr-poster.svg" alt="Printable Tapovan Menu QR poster for Lily's Cafe" />
          </a>
        </section>
      </div>
    </main>
  );
}
