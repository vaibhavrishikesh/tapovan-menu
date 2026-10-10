import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page">
      <section className="shell hero">
        <span className="eyebrow">Mobile-first webapp</span>
        <h1 className="h1">Tapovan Menu</h1>
        <p className="lead">Printed menu stays the same. Customer scans QR and sees what is actually available right now. Staff update missing ingredients from a phone browser.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
          <Link className="cta" href="/lilys-cafe">Open Lily&apos;s Cafe live menu</Link>
          <Link className="cta secondary" href="/admin/lilys-cafe">Open staff admin</Link>
        </div>
      </section>
    </main>
  );
}
