import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserWithToken, SESSION_COOKIE_NAME } from "@/lib/auth";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/" || pathname === "/auth/callback") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/notes")) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/", BASE_URL));
    }

    const user = await getUserWithToken(token);
    if (!user) {
      return NextResponse.redirect(new URL("/", BASE_URL));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notes", "/notes/:path*"],
};
