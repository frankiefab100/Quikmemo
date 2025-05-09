"use client";
import Button from "../ui/Button";
import { Archive, Plus, Trash2 } from "lucide-react";
import type { INote } from "@/types/types";
import { useNotes } from "@/context/NotesContext";
import { useState } from "react";
import Modal from "../ui/Modal";
import removeHtmlTags from "@/utils/removeHtmlTags";

const NoteList: React.FC = () => {
  const {
    notes,
    selectedNote,
    setSelectedNote,
    setTitle,
    setContent,
    setTags,
    currentFilterType,
    selectedTag,
    handleRestoreNote,
    handleDeleteNote,
    selectedTrashNotes,
    setSelectedTrashNotes,
    handleEmptyTrash,
    filteredNotes,
    // loading,
  } = useNotes();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const [isEmptyingTrash, setIsEmptyingTrash] = useState(false);

  const handleCreateNote = () => {
    setSelectedNote(null);
    setTitle("");
    setContent("");
    setTags([]);
  };

  const onNoteSelect = (note: INote) => {
    if (currentFilterType === "trash") {
      // Selecting notes in trash view for deletion
      if (selectedTrashNotes.includes(note.id)) {
        setSelectedTrashNotes(
          selectedTrashNotes.filter((id) => id !== note.id)
        );
      } else {
        setSelectedTrashNotes([...selectedTrashNotes, note.id]);
      }
    } else {
      setSelectedNote(note);
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags || []);
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

  const handleRestore = (noteId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    handleRestoreNote(noteId);
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

  const getCurrentFilterHeading = () => {
    switch (currentFilterType) {
      case "archived":
        return "Archived Notes";
      case "favorites":
        return "Favorites";
      case "trash":
        return "Trash";
      case "all":
      default:
        return "All Notes";
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

  // if (loading) {
  //   return (
  //     <div
  //       className={`w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full ${
  //         selectedNote ? "hidden md:flex" : "flex"
  //       }`}
  //     >
  //       <div className="flex items-center justify-center h-full">
  //         <p className="text-center text-gray-500 dark:text-gray-400">
  //           Please be patient...
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      id="#notes"
      className="text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 md:flex flex-col h-full hidden"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold">
          {selectedTag ? (
            <span>
              Tag:{" "}
              <span className="text-blue-500 dark:text-blue-400">
                {selectedTag}
              </span>
            </span>
          ) : (
            <>{getCurrentFilterHeading()}</>
          )}
        </h1>
      </div>

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
        <div className="p-4 w-full">
          <Button variant="primary" onClick={handleCreateNote}>
            <span className="pr-2">
              <Plus className="w-4 h-4" />
            </span>
            Create New Note
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4 p-4">
          {filteredNotes.length === 0 ? (
            <div className="text-center p-4">
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                {setFilterMessage()}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {setFilterBodyText()}
              </p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`w-full rounded-lg p-4 text-left transition-colors border hover:border-gray-300 dark:hover:border-gray-500 cursor-pointer ${
                  currentFilterType === "trash"
                    ? selectedTrashNotes.includes(note.id)
                      ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-200 dark:border-gray-700"
                    : selectedNote?.id === note.id
                    ? "border-blue-300 dark:border-blue-400"
                    : "border-gray-200 dark:border-gray-700"
                }`}
                onClick={() => onNoteSelect(note)}
              >
                <div className="flex items-center justify-between">
                  {currentFilterType === "trash" && (
                    <div className="float-left mr-2">
                      <input
                        type="checkbox"
                        checked={selectedTrashNotes.includes(note.id)}
                        onChange={() => onNoteSelect(note)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4"
                      />
                    </div>
                  )}
                  <h2 className="text-gray-900 dark:text-white font-semibold text-[1.2rem] leading-6 mb-1">
                    {note.title.length > 20
                      ? `${note.title.substring(0, 20)}...`
                      : note.title}
                  </h2>
                  {note.isFavorite && (
                    <span className="text-yellow-500">★</span>
                  )}
                  {note.isArchived && (
                    <span className="text-yellow-500">
                      <Archive className="w-3 h-3" />
                    </span>
                  )}

                  {currentFilterType === "trash" && (
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => handleRestore(note.id, e)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        title="Restore note"
                      >
                        Restore
                      </button>
                      <button
                        onClick={() => confirmDelete(note.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                        title="Delete permanently"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-5">
                  {removeHtmlTags(note.content).length > 35
                    ? `${removeHtmlTags(note.content)
                        .substring(0, 35)
                        .replace(/(<([^>]+)>)/gi, "")}...`
                    : removeHtmlTags(note.content)}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {note.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-md text-xs ${
                        tag === selectedTag
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                          : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs dark:text-gray-300 text-gray-600">
                  {new Date(note.updatedAt || note.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
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
};

export default NoteList;
