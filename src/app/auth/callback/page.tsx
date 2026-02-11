"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "error">("loading");

  useEffect(() => {
    const error = searchParams.get("error");
    const code = searchParams.get("code");

    if (error) {
      router.replace(`/?error=${encodeURIComponent(error)}`);
      return;
    }

    if (!code) {
      router.replace("/?error=no_code");
      return;
    }

    const exchange = async () => {
      const res = await fetch("/api/auth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        credentials: "include",
      });

      if (res.ok) {
        router.replace("/notes");
        return;
      }
      setStatus("error");
      router.replace("/?error=auth_failed");
    };

    exchange();
  }, [searchParams, router]);

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <p className="text-zinc-600 dark:text-zinc-400">
          Log in failed. Redirecting…
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <p className="text-zinc-600 dark:text-zinc-400">
        Logged in. Redirecting to notes…
      </p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
          <p className="text-zinc-600 dark:text-zinc-400">Loading…</p>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
