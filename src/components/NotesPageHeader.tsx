import Image from "next/image";
import Link from "next/link";

type NotesPageHeaderProps = {
  userName: string;
  userPicture?: string | null;
};

export function NotesPageHeader({
  userName,
  userPicture,
}: NotesPageHeaderProps) {
  return (
    <header className="mb-8 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Notes
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          {userName}
        </span>
        {userPicture && (
          <Image
            src={userPicture}
            alt={userName}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <Link
          href="/api/auth/logout"
          className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Logout
        </Link>
      </div>
    </header>
  );
}
