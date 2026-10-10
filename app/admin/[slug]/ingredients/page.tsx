import Link from "next/link";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getOutletBySlug } from "@/lib/outlets";
import { IngredientManager } from "@/components/IngredientManager";

export default async function IngredientsPage({ params }: { params: { slug: string } }) {
  const outlet = await getOutletBySlug(params.slug);
  if (!outlet) notFound();
  const session = cookies().get(`tm_admin_${outlet.slug}`)?.value;
  if (session !== "demo") redirect(`/admin/${outlet.slug}`);
  return (
    <main className="page"><div className="shell">
      <section className="hero"><div className="header-row"><div><span className="eyebrow">Staff panel · Ingredients</span><h1 className="h1" style={{ fontSize: "clamp(36px, 10vw, 68px)" }}>{outlet.name}</h1><p className="lead" style={{ margin: 0 }}>{outlet.area} · Updated {outlet.updatedAt}</p></div><form action="/api/admin/logout" method="post"><input type="hidden" name="slug" value={outlet.slug} /><button className="cta secondary" type="submit">Logout</button></form></div></section>
      <IngredientManager outlet={outlet} />
      <footer className="footer-nav"><Link href={`/${outlet.slug}`}>Live menu</Link><Link href={`/admin/${outlet.slug}`}>Staff login</Link><Link className="active" href={`/admin/${outlet.slug}/ingredients`}>Ingredients</Link></footer>
    </div></main>
  );
}
