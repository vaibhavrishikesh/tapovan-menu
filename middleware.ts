import { NextResponse, type NextRequest } from "next/server";

const LILYS_HOSTS = new Set(["lilyscafe.in", "www.lilyscafe.in"]);

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (host && LILYS_HOSTS.has(host) && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/lilys-cafe";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/"
};
