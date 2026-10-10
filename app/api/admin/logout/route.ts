import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const slug = String(formData.get("slug") ?? "");
  const response = NextResponse.redirect(new URL(`/admin/${slug}`, request.url));
  response.cookies.set(`tm_admin_${slug}`, "", { path: "/", maxAge: 0 });
  return response;
}
