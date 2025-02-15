"use client";
import Button from "../ui/Button";
import { Plus } from "lucide-react";
import { INote } from "@/types/types";
import { useState } from "react";
import { NOTES } from "@/app/data/data";

const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<INote[]>(NOTES);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);
  // const [tags, setTags] = useState([]);
  // const [editDate, setEditDate] = useState(null);

  const handleCreateNote = () => {
    console.log("title: ", title);
    console.log("content: ", content);

    const newNote: INote = {
      id: notes.length + 1,
      title: title,
      content: content,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const onNoteSelect = (note: INote) => {
    console.log("selected", note.id, note.title);
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdateNote = () => {
    console.log("update note");
    if (!selectedNote) {
      return;
    }

    const updatedNote: INote = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );

    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  return (
    <div className="text-gray-900 dark:text-white dark:bg-gray-800  bg-white  border-gray-200  pt-16 flex h-screen flex-col border-r">
      <div className="flex items-center gap-2 p-4 border-b">
        <h1 className="text-xl font-semibold">All Notes</h1>
      </div>
      <div className="p-4 w-full">
        <Button
          variant="primary"
          onClick={() =>
            selectedNote ? handleUpdateNote() : handleCreateNote()
          }
        >
          <Plus className="mr-2 w-4 h-4" />
          Create New Note
        </Button>
      </div>

      <div className="flex-1">
        <div className="space-y-4 p-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="w-full rounded-lg border p-4 text-left transition-colors dark:hover:bg-gray-700 dark:hover:border-gray-900 hover:bg-gray-100 focus:bg-gray-100"
              onClick={() => onNoteSelect(note)}
              //   className={`w-full rounded-lg border p-4 text-left transition-colors hover:bg-muted/50 ${
              //     selectedNoteId === note.id ? "border-primary bg-muted/50" : ""
              //   }`}
            >
              <h2 className="text-gray-900 dark:text-white font-semibold text-[1.2rem] leading-6 mb-1">
                {note.title}
              </h2>

              <div className="flex">
                {note.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="dark:bg-gray-600 dark:text-gray-400 bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm mr-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-2 text-sm dark:text-gray-300 text-gray-600">
                {note.lastEdited}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
