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
    currentFilterType,
    selectedTag,
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

  const filteredNotes = notes.filter((note) => {
    if (selectedTag && !note.tags?.includes(selectedTag)) {
      return false;
    }

    switch (currentFilterType) {
      case "archived":
        return note.isArchived;
      case "favorites":
        return note.isFavorite;
      case "trash":
        return note.isDeleted;
      case "all":
      default:
        return !note.isArchived && !note.isDeleted;
    }
  });

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

  if (loading) {
    return (
      <div
        className={`w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full ${
          selectedNote ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading notes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="#notes"
      className={`w-full md:w-1/3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full ${
        selectedNote ? "hidden md:flex" : "flex"
      }`}
    >
      <div className="flex flex-col sticky top-0 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
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

        {currentFilterType === "all" && (
          <div className="p-4 w-full">
            <Button variant="primary" onClick={handleCreateNote}>
              <Plus className="w-6 h-6 pr-2" />
              Create New Note
            </Button>
          </div>
        )}
      </div>

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
                  selectedNote?.id === note.id
                    ? "border-blue-300 dark:border-blue-400"
                    : "border-gray-200 dark:border-gray-700"
                }`}
                onClick={() => onNoteSelect(note)}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-gray-900 dark:text-white font-semibold text-[1.2rem] leading-6 mb-1">
                    {note.title}
                  </h2>
                  {note.isFavorite && (
                    <span className="text-yellow-500">★</span>
                  )}
                </div>
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
