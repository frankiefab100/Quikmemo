"use client";
import { Archive, Trash2 } from "lucide-react";
import { useNotes } from "@/context/NotesContext";

const DeleteArchive = () => {
  const { selectedNote, handleDeleteNote, handleArchiveNote } = useNotes();

  const onArchive = () => {
    if (selectedNote) {
      handleArchiveNote(selectedNote.id);
    }
  };

  const onDelete = () => {
    if (selectedNote) {
      if (
        window.confirm(
          "Are you sure you want to delete this note? This action cannot be undone."
        )
      ) {
        handleDeleteNote(selectedNote.id);
      }
    }
  };

  return (
    <div className="dark:bg-gray-800 bg-white pt-20 border-l p-6">
      <button
        className={`flex mb-2 w-full px-5 py-2.5 text-sm font-medium rounded-lg text-left border transition-all duration-200 ${
          selectedNote
            ? "text-gray-700 border-gray-700 hover:bg-gray-50 hover:border-gray-900"
            : "text-gray-400 border-gray-300 cursor-not-allowed"
        }`}
        onClick={onArchive}
        disabled={!selectedNote}
      >
        <span className="pr-2">
          <Archive className="w-5 h-5" />
        </span>
        {selectedNote?.isArchived ? "Unarchive Note" : "Archive Note"}
      </button>
      <button
        className={`flex w-full px-5 py-2.5 text-sm font-medium rounded-lg text-left border transition-all duration-200 ${
          selectedNote
            ? "text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            : "text-gray-400 border-gray-300 cursor-not-allowed"
        }`}
        onClick={onDelete}
        disabled={!selectedNote}
      >
        <span className="pr-2">
          <Trash2 className="w-5 h-5" />
        </span>
        Delete Note
      </button>
    </div>
  );
};

export default DeleteArchive;
