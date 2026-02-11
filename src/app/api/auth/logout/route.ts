import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

export async function GET() {
  const response = NextResponse.redirect(`${BASE_URL}`, 302);
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}
