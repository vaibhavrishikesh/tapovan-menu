import { demoOutlet, type Outlet } from "@/data/demo";
import { hasSupabaseConfig } from "@/lib/supabase";

export async function getOutletBySlug(slug: string): Promise<Outlet | null> {
  if (!hasSupabaseConfig()) return slug === demoOutlet.slug ? demoOutlet : null;
  return slug === demoOutlet.slug ? demoOutlet : null;
}
