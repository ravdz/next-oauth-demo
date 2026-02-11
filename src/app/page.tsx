import Link from "next/link";
import { getGoogleAuthUrl } from "@/lib/auth";
import { GoogleIcon } from "@/components/GoogleIcon";

export default function Home() {
  const authUrl = getGoogleAuthUrl();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <main className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-2 text-center text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          OAuth 2.0 Demo
        </h1>
        <p className="mb-8 text-center text-zinc-600 dark:text-zinc-400">
          Login with Google to access the notes.
        </p>
        <Link
          href={authUrl}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          <GoogleIcon />
          Login with Google
        </Link>
      </main>
    </div>
  );
}
