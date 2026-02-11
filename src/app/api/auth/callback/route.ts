import { NextResponse } from "next/server";
import { exchangeCodeForToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  let body: { code?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { code } = body;
  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "missing_code" }, { status: 400 });
  }

  try {
    const { access_token, expires_in } = await exchangeCodeForToken(code);

    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE_NAME, access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: expires_in,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "token_exchange_failed" },
      { status: 400 }
    );
  }
}
