import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getNotes } from "@/lib/notes";
import { NotesPageHeader } from "@/components/NotesPageHeader";
import { NoteList } from "@/components/NoteList";

export default async function NotesPage() {
  const user = await getSession();

  if (!user) {
    redirect("/");
  }

  const notes = await getNotes();

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl">
        <NotesPageHeader userName={user.name} userPicture={user.picture} />
        <main className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <NoteList notes={notes} />
        </main>
      </div>
    </div>
  );
}
