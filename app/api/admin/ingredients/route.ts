import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { Ingredient } from "@/data/demo";
import { getOutletBySlug } from "@/lib/outlets";
import { getSupabaseServerClient, hasSupabaseWriteConfig } from "@/lib/supabase";

const statuses = new Set<Ingredient["status"]>(["available", "low", "missing", "not_ready"]);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as null | { slug?: string; ingredientId?: string; status?: Ingredient["status"]; reason?: string };
  const slug = body?.slug ?? "";
  const ingredientId = body?.ingredientId ?? "";
  const status = body?.status;

  if (!slug || !ingredientId || !status || !statuses.has(status)) {
    return NextResponse.json({ error: "Invalid ingredient update" }, { status: 400 });
  }

  const outlet = await getOutletBySlug(slug);
  if (!outlet) return NextResponse.json({ error: "Outlet not found" }, { status: 404 });

  const session = cookies().get(`tm_admin_${outlet.slug}`)?.value;
  if (session !== "demo") return NextResponse.json({ error: "Staff login required" }, { status: 401 });

  if (!hasSupabaseWriteConfig()) {
    return NextResponse.json({ ok: true, persisted: false, reason: "Supabase write key is not configured" });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });

  const current = outlet.ingredients.find((ingredient) => ingredient.id === ingredientId);
  const reason = status === "available" ? null : body?.reason ?? current?.reason ?? null;

  const { error } = await supabase
    .from("ingredients")
    .update({ status, reason, updated_at: new Date().toISOString() })
    .eq("id", ingredientId)
    .eq("outlet_id", outlet.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from("availability_events").insert({
    outlet_id: outlet.id,
    target_type: "ingredient",
    target_id: ingredientId,
    old_status: current?.status ?? null,
    new_status: status,
    reason
  });

  revalidatePath(`/${slug}`);
  revalidatePath(`/admin/${slug}/ingredients`);
  return NextResponse.json({ ok: true, persisted: true });
}
