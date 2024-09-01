import { NoteData, Tag } from "../App";
import { NewForm } from "./NewForm";

type NoteNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

export function NewNotes({ onSubmit, onAddTag, availableTags }: NoteNoteProps) {
  return (
    <>
      <h1 className="mb-3">New Note</h1>
      <NewForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
