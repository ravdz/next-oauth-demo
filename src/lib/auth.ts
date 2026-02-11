import { cookies } from "next/headers";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

export const GOOGLE_USERINFO_URL =
  "https://www.googleapis.com/oauth2/v2/userinfo";

const SCOPES = ["openid", "email", "profile"].join(" ");

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  picture: string | null;
};

export async function getUserWithToken(
  token: string
): Promise<SessionUser | null> {
  try {
    const res = await fetch(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as {
      id: string;
      email: string;
      name: string;
      picture?: string;
    };

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture ?? null,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return getUserWithToken(token);
}

export function getGoogleAuthUrl(): string {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.BASE_URL
    ? `${process.env.BASE_URL}/auth/callback`
    : undefined;

  if (!clientId || !redirectUri) {
    throw new Error("Missing GOOGLE_CLIENT_ID or BASE_URL in environment");
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: SCOPES,
    access_type: "offline",
    prompt: "consent",
  });

  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForToken(
  code: string
): Promise<{ access_token: string; expires_in: number }> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.BASE_URL
    ? `${process.env.BASE_URL}/auth/callback`
    : undefined;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error(
      "Missing GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET or BASE_URL in environment"
    );
  }

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Token exchange failed: ${response.status} ${err}`);
  }

  const data = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };
  return { access_token: data.access_token, expires_in: data.expires_in };
}

export const SESSION_COOKIE_NAME = "session";
