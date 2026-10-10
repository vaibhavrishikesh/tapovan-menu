import { redirect, notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getOutletBySlug } from "@/lib/outlets";

export default async function AdminLoginPage({ params }: { params: { slug: string } }) {
  const outlet = await getOutletBySlug(params.slug);
  if (!outlet) notFound();
  const session = cookies().get(`tm_admin_${outlet.slug}`)?.value;
  if (session === "demo") redirect(`/admin/${outlet.slug}/ingredients`);
  return (
    <main className="page"><section className="shell hero" style={{ maxWidth: 560 }}><span className="eyebrow">Staff access</span><h1 className="h1" style={{ fontSize: 48 }}>{outlet.name}</h1><p className="lead">Enter staff PIN to update ingredients and live availability.</p><form action="/api/admin/login" method="post" className="grid" style={{ marginTop: 24 }}><input type="hidden" name="slug" value={outlet.slug} /><input className="input" name="pin" inputMode="numeric" pattern="[0-9]*" placeholder="Staff PIN" required /><button className="cta" type="submit">Open ingredient screen</button><p className="notice">Demo PIN: 1234. Replace with real staff PINs when Supabase auth is connected.</p></form></section></main>
  );
}
