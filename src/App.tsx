import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NewNotes } from "./components/NewNotes";
import { useLocalStorage } from "./components/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./components/NoteList";
import NoteLayout from "./components/NoteLayout";
import Note from "./components/Note";
import { EditNotes } from "./components/EditNote";
export type Note = {
  id: string;
} & NoteData;
export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};
export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
export type RawNote = {
  id: string;
} & RawNoteData;
export type Tag = {
  id: string;
  label: string;
};
function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithtags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note,...data,  tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  function onDeleteNote(id:string){
    setNotes(prevNotes=>{
      return prevNotes.filter(note=> note.id !== id)
    })
  }

  function updateTag(id: string , label : string){
    setTags(prevTags=>{
      return prevTags.map(tag=>{
        if(tag.id === id){
          return {...tag,label}
        }else{
          return tag
        }
      })
    })
  }

  function deleteTag(id:string){
    setTags(prevTags=>{
      return prevTags.filter(tag=> tag.id !== id)
    })
  }
  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList notes={notesWithtags} availableTags={tags} 
          onUpdateTag={updateTag} onDeleteTag={deleteTag} />}
        />
        <Route
          path="/new"
          element={
            <NewNotes
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithtags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNotes
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
