import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import type { Note } from "@/lib/notes";

const MOCK_NOTES: Note[] = [
  {
    id: "1",
    title: "Optimize React Rendering",
    content:
      "Investigate performance gains by splitting large components with React.lazy and Suspense.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Next.js Image Optimization",
    content:
      "Test the new Next.js image component with custom loader to improve LCP scores.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Reusable UI Components",
    content:
      "Extract shared UI elements into a separate package for easier maintenance across projects.",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(MOCK_NOTES);
}
