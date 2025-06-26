"use client";

import type React from "react";
import { useNotes } from "@/context/NotesContext";
import { Archive, Plus, Trash2, Undo } from "lucide-react";
import removeHtmlTags from "@/utils/removeHtmlTags";
import { useState } from "react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import LoadingSpinner from "@/app/loading";

export default function NotesList() {
  const {
    notes,
    filteredNotes,
    selectedNote,
    setSelectedNote,
    setTitle,
    setContent,
    setTags,
    setIsMobileEditorOpen,
    currentFilterType,
    selectedTrashNotes,
    setSelectedTrashNotes,
    handleEmptyTrash,
    handleDeleteNote,
    handleFavoriteNote,
    handleArchiveNote,
    handleTrashNote,
    handleRestoreNote,
    loading,
  } = useNotes();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const [isEmptyingTrash, setIsEmptyingTrash] = useState(false);

  const handleSelectNote = (note: any) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags || []);
    setIsMobileEditorOpen(true); // Open editor on mobile when selecting a note
  };

  const handleCreateNewNote = () => {
    // Clear the current note selection and form
    setSelectedNote(null);
    setTitle("");
    setContent("");
    setTags([]);

    // Open the editor for creating a new note
    setIsMobileEditorOpen(true);
  };

  const handleToggleFavorite = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    handleFavoriteNote(noteId);
  };

  const handleArchiveNoteAction = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    handleArchiveNote(noteId);
  };

  const handleDeleteNoteAction = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    handleTrashNote(noteId);
  };

  const handleRestoreNoteAction = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    handleRestoreNote(noteId);
  };

  const handlePermanentDelete = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    if (
      window.confirm(
        "Are you sure you want to permanently delete this note? This action cannot be undone."
      )
    ) {
      handleDeleteNote(noteId);
    }
  };

  const confirmDelete = (noteId: string) => {
    setNoteToDelete(noteId);
    setShowDeleteModal(true);
  };

  const confirmEmptyTrash = () => {
    setIsEmptyingTrash(true);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (isEmptyingTrash) {
      handleEmptyTrash();
    } else if (noteToDelete) {
      handleDeleteNote(noteToDelete);
    }
    setShowDeleteModal(false);
    setNoteToDelete(null);
    setIsEmptyingTrash(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setNoteToDelete(null);
    setIsEmptyingTrash(false);
  };

  const trashedNotes = notes.filter((note) => note.isTrashed);

  const toggleSelectAll = () => {
    if (trashedNotes.length === selectedTrashNotes.length) {
      // If all are selected, deselect all
      setSelectedTrashNotes([]);
    } else {
      // Otherwise, select all
      setSelectedTrashNotes(trashedNotes.map((note) => note.id));
    }
  };

  const setFilterMessage = () => {
    switch (currentFilterType) {
      case "archived":
        return "No archived notes";
      case "favorites":
        return "No favorite notes";
      case "trash":
        return "Trash is empty";
      case "all":
      default:
        return "No notes in this category";
    }
  };

  const setFilterBodyText = () => {
    switch (currentFilterType) {
      case "archived":
        return "You don't have any archived notes";
      case "favorites":
        return "You don't have any favorite notes";
      case "trash":
        return "Your trash is empty";
      case "all":
      default:
        return "Click the `Create New Note` button to get started";
    }
  };

  return (
    <div className="h-full overflow-y-auto flex flex-col">
      {/* New Note Button */}

      {currentFilterType === "trash" ? (
        <div className="p-4 w-full flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={
                trashedNotes.length > 0 &&
                trashedNotes.length === selectedTrashNotes.length
              }
              onChange={toggleSelectAll}
              className="mr-2 h-4 w-4"
            />
            <span className="text-sm">
              {selectedTrashNotes.length} of {trashedNotes.length} selected
            </span>
          </div>
          <Button
            variant="secondary"
            onClick={confirmEmptyTrash}
            disabled={selectedTrashNotes.length === 0}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete All
          </Button>
        </div>
      ) : (
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <button
            onClick={handleCreateNewNote}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            New Note
          </button>
        </div>
      )}

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto">
        {loading && notes.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <p className="text-lg font-medium"> {setFilterMessage()}</p>
              <p className="text-sm"> {setFilterBodyText()}</p>
            </div>
          </div>
        ) : (
          <div className="p-2">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleSelectNote(note)}
                className={`group relative mb-2 cursor-pointer rounded-lg border p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  selectedNote?.id === note.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {note.title.length > 20
                        ? `${note.title.substring(0, 20)}...`
                        : note.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                      {removeHtmlTags(note.content).length > 35
                        ? `${removeHtmlTags(note.content).substring(0, 35)}...`
                        : removeHtmlTags(note.content)}
                    </p>

                    {/* Tags */}
                    {note.tags && note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(
                          note.updatedAt || note.createdAt
                        ).toLocaleString()}
                      </span>
                      {note.isFavorite && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                          ❤️ Favorite
                        </span>
                      )}
                      {note.isArchived && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                          📦 Archived
                        </span>
                      )}
                      {note.isTrashed && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                          🗑️ Deleted
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* <button
                      onClick={(e) => handleToggleFavorite(e, note.id)}
                      className={`p-1 rounded hover:bg-yellow-100 dark:hover:bg-yellow-800  ${
                        note.isFavorite ? "text-yellow-600" : "text-gray-400"
                      }`}
                    >
                      <svg
                        className="h-4 w-4"
                        fill={note.isFavorite ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={(e) => handleArchiveNoteAction(e, note.id)}
                      className="p-1 rounded text-gray-400 hover:bg-indigo-100 dark:hover:bg-indigo-800 hover:text-indigo-600"
                    >
                      <Archive className="h-4 w-4" />
                    </button>

                    <button
                      onClick={(e) => handleDeleteNoteAction(e, note.id)}
                      className="p-1 rounded text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button> */}

                    {note.isTrashed ? (
                      <>
                        <button
                          onClick={(e) => handleRestoreNoteAction(e, note.id)}
                          className="p-1 rounded text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 hover:text-green-700"
                          title="Restore note"
                        >
                          <Undo className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => handlePermanentDelete(e, note.id)}
                          className="p-1 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-700"
                          title="Delete permanently"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      // Regular actions: Favorite, Archive, Delete
                      <>
                        <button
                          onClick={(e) => handleToggleFavorite(e, note.id)}
                          className={`p-1 rounded hover:bg-yellow-100 dark:hover:bg-yellow-800  ${
                            note.isFavorite
                              ? "text-yellow-600"
                              : "text-gray-400"
                          }`}
                          title={
                            note.isFavorite
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                        >
                          <svg
                            className="h-4 w-4"
                            fill={note.isFavorite ? "currentColor" : "none"}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>

                        <button
                          onClick={(e) => handleArchiveNoteAction(e, note.id)}
                          className="p-1 rounded text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-600"
                          title={
                            note.isArchived ? "Unarchive note" : "Archive note"
                          }
                        >
                          <Archive className="h-4 w-4" />
                        </button>

                        <button
                          onClick={(e) => handleDeleteNoteAction(e, note.id)}
                          className="p-1 rounded text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600"
                          title="Move to trash"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title={isEmptyingTrash ? "Empty Trash" : "Delete Note"}
          message={
            isEmptyingTrash
              ? `Are you sure you want to permanently delete ${selectedTrashNotes.length} selected note(s)? This action cannot be undone.`
              : "Are you sure you want to permanently delete this note? This action cannot be undone."
          }
        />
      )}
    </div>
  );
}
