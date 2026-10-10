import { NextResponse } from "next/server";
import { getOutletBySlug } from "@/lib/outlets";

export async function POST(request: Request) {
  const formData = await request.formData();
  const slug = String(formData.get("slug") ?? "");
  const pin = String(formData.get("pin") ?? "");
  const outlet = await getOutletBySlug(slug);
  if (!outlet || pin !== outlet.adminPin) return NextResponse.redirect(new URL(`/admin/${slug}?error=pin`, request.url));
  const response = NextResponse.redirect(new URL(`/admin/${slug}/ingredients`, request.url));
  response.cookies.set(`tm_admin_${slug}`, "demo", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
  return response;
}
