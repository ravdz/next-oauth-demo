import { cookies } from "next/headers";

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export async function getNotes(): Promise<Note[]> {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.BASE_URL}/api/notes`, {
    headers: { Cookie: cookieStore.toString() },
  });
  if (!res.ok) return [];
  return res.json();
}
