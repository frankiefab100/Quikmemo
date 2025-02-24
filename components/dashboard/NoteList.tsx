"use client";
import Button from "../ui/Button";
import { Plus } from "lucide-react";
import type { INote } from "@/types/types";
import { useNotes } from "@/context/NotesContext";

const NoteList: React.FC = () => {
  const {
    notes,
    selectedNote,
    setSelectedNote,
    setTitle,
    setContent,
    setTags,
  } = useNotes();

  const handleCreateNote = () => {
    setSelectedNote(null);
    setTitle("");
    setContent("");
    setTags([]);
  };

  const onNoteSelect = (note: INote) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags || []);
  };

  return (
    <div className="text-gray-900 dark:text-white dark:bg-gray-800 bg-white border-gray-200 pt-16 flex h-screen flex-col border-r">
      <div className="flex items-center gap-2 p-4 border-b">
        <h1 className="text-xl font-semibold">All Notes</h1>
      </div>
      <div className="p-4 w-full">
        <Button variant="primary" onClick={handleCreateNote}>
          <span className="pr-2">
            <Plus className="w-4 h-4" />
          </span>
          Create New Note
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4 p-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`w-full rounded-lg border p-4 text-left transition-colors dark:hover:bg-gray-700 dark:hover:border-gray-900 hover:bg-gray-100 focus:bg-gray-100 ${
                selectedNote?.id === note.id ? "border-blue-500" : ""
              }`}
              onClick={() => onNoteSelect(note)}
            >
              <h2 className="text-gray-900 dark:text-white font-semibold text-[1.2rem] leading-6 mb-1">
                {note.title}
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {note.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="dark:bg-gray-600 dark:text-gray-400 bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-sm dark:text-gray-300 text-gray-600">
                {new Date(note.updatedAt || note.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
