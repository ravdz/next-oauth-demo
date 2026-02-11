import type { Note } from "@/lib/notes";
import { NoteItem } from "./NoteItem";

type NoteListProps = {
  notes: Note[];
};

export function NoteList({ notes }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <p className="text-center text-zinc-500 dark:text-zinc-400">
        Brak notatek.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ul>
  );
}
