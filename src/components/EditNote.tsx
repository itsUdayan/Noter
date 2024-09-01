import { NoteData, Tag } from "../App";
import { NewForm } from "./NewForm";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function EditNotes({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteProps) {
  const note = useNote();
  return (
    <>
      <h1 className="mb-3">Edit Note</h1>
      <NewForm
      title={note.title}
      markdown={note.markdown}
      tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
