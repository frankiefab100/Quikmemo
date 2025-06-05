"use client";

import type React from "react";
import { Archive, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNotes } from "@/context/NotesContext";
import Modal from "@/components/ui/Modal";

interface NoteActionsProps {
  onClose?: () => void;
}

const NoteActionsMenu: React.FC<NoteActionsProps> = ({ onClose }) => {
  const {
    selectedNote,
    handleTrashNote,
    handleArchiveNote,
    handleFavoriteNote,
  } = useNotes();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onArchive = () => {
    if (selectedNote) {
      handleArchiveNote(selectedNote.id);
      if (onClose) return onClose();
    }
  };

  const onTrash = () => {
    if (selectedNote) {
      setShowDeleteModal(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedNote) {
      handleTrashNote(selectedNote.id);
      setShowDeleteModal(false);
      if (onClose) return onClose();
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const onAddToFavorites = () => {
    if (selectedNote) {
      handleFavoriteNote(selectedNote.id);
      if (onClose) return onClose();
    }
  };

  return (
    <div className="absolute right-0 top-12 p-4 text-sm rounded-lg shadow-lg bg-white dark:bg-gray-700 z-20 min-w-48">
      <button
        className={`flex mb-2 w-full px-2 py-2 text-sm font-medium rounded-lg cursor-pointer text-gray-400 transition-all duration-200 ${
          selectedNote
            ? "dark:text-gray-300 text-gray-700 hover:dark:bg-gray-600 hover:bg-gray-100"
            : "text-gray-400"
        }`}
        onClick={onAddToFavorites}
        disabled={!selectedNote}
      >
        <Star className="w-4 h-4 mr-2" />
        {selectedNote?.isFavorite
          ? "Remove from Favorites"
          : "Add to Favorites"}
      </button>

      <button
        className={`flex mb-2 w-full px-3 py-2 text-sm font-medium rounded-lg cursor-pointer text-gray-400 transition-all duration-200 ${
          selectedNote
            ? "dark:text-gray-300 text-gray-700 hover:dark:bg-gray-600 hover:bg-gray-100"
            : "text-gray-400"
        }`}
        onClick={onArchive}
        disabled={!selectedNote}
      >
        <Archive className="w-4 h-4 mr-2" />
        {selectedNote?.isArchived ? "Unarchive Note" : "Archive Note"}
      </button>

      <button
        className={`flex w-full px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 ${
          selectedNote
            ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            : "text-gray-400"
        }`}
        onClick={onTrash}
        disabled={!selectedNote}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Delete Note
      </button>

      {showDeleteModal && selectedNote && (
        <Modal
          isOpen={showDeleteModal}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          title={selectedNote.title}
        />
      )}
    </div>
  );
};

export default NoteActionsMenu;
