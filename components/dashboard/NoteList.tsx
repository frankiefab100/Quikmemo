"use client";
import type React from "react";
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
    loading,
    error,
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

  if (loading) {
    return (
      <div className="text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 md:flex flex-col h-full hidden">
        <div className="flex items-center justify-center h-full">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading notes...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 md:flex flex-col h-full hidden">
        <div className="flex items-center justify-center h-full">
          <p className="text-center text-red-500 dark:text-red-400">
            Unable to fetch notes
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="#notes"
      className="text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 md:flex flex-col h-full hidden"
    >
      <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold">Notes</h1>
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
          {notes.length === 0 ? (
            <div className="text-center p-4">
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                No notes yet
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Click the `Create New Note` button to get started
              </p>
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className={`w-full rounded-lg p-4 text-left transition-colors border hover:border-gray-300 dark:hover:border-gray-500 cursor-pointer ${
                  selectedNote?.id === note.id
                    ? "border-blue-300 dark:border-blue-400"
                    : "border-gray-200 dark:border-gray-700"
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
                      className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-sm dark:text-gray-300 text-gray-600">
                  {new Date(note.updatedAt || note.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
