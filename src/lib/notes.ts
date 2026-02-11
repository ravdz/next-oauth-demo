import { cookies } from "next/headers";

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export async function getNotes(): Promise<Note[]> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const cookieStore = await cookies();
  const res = await fetch(`${baseUrl}/api/notes`, {
    headers: { Cookie: cookieStore.toString() },
  });
  if (!res.ok) return [];
  return res.json();
}
