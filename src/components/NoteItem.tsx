import type { Note } from "@/lib/notes";

type NoteItemProps = {
  note: Note;
};

export function NoteItem({ note }: NoteItemProps) {
  return (
    <li className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
      <h2 className="font-medium text-zinc-900 dark:text-zinc-100">
        {note.title}
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {note.content}
      </p>
      <time
        dateTime={note.createdAt}
        className="mt-2 block text-xs text-zinc-500 dark:text-zinc-500"
      >
        {new Date(note.createdAt).toLocaleDateString("pl-PL")}
      </time>
    </li>
  );
}
