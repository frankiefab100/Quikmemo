"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useNotes } from "@/context/NotesContext";
import NoteActionsMenu from "./NoteActionsMenu";
import { ChevronLeft, Ellipsis, Plus, Tag, X } from "lucide-react";
import TipTapEditor from "./TipTapEditor";

export default function NoteEditor() {
  const {
    selectedNote,
    title,
    setTitle,
    content,
    setContent,
    tags,
    setTags,
    setIsMobileEditorOpen,
    handleUpdateNote,
    handleSaveNote,
    loading,
  } = useNotes();

  const [newTag, setNewTag] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Track if there are unsaved changes
  useEffect(() => {
    if (selectedNote) {
      const titleChanged = title !== selectedNote.title;
      const contentChanged = content !== selectedNote.content;
      const tagsChanged =
        JSON.stringify(tags.sort()) !==
        JSON.stringify((selectedNote.tags || []).sort());
      setHasUnsavedChanges(titleChanged || contentChanged || tagsChanged);
    } else {
      // For new notes, consider it unsaved if there's any content
      setHasUnsavedChanges(
        title.trim() !== "" || content.trim() !== "" || tags.length > 0
      );
    }
  }, [title, content, tags, selectedNote]);

  const handleSave = async () => {
    if (selectedNote) {
      await handleUpdateNote(selectedNote.id);
    } else {
      await handleSaveNote();
    }
    setHasUnsavedChanges(false);
  };

  const handleBack = () => {
    setIsMobileEditorOpen(false);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const showEditor = true;

  if (!showEditor) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <p className="text-lg font-medium">No note selected</p>
          <p className="text-sm">
            Select a note from the list or create a new one to start editing
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4 md:hidden">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
          Back
        </button>
        <div className="flex items-center gap-2">
          {hasUnsavedChanges && (
            <span className="text-xs text-orange-500">Unsaved</span>
          )}
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim() || loading}
            className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {selectedNote ? "Updating..." : "Saving..."}
              </>
            ) : selectedNote ? (
              "Update"
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-2">
          {selectedNote ? (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Last updated:{" "}
              {new Date(selectedNote.updatedAt).toLocaleDateString()}
            </span>
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              New Note
            </span>
          )}
          {hasUnsavedChanges && (
            <span className="text-xs text-orange-500">• Unsaved changes</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim() || loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {selectedNote ? "Updating..." : "Saving..."}
              </>
            ) : selectedNote ? (
              "Update"
            ) : (
              "Save"
            )}
          </button>

          {/* Ellipsis Menu - Desktop Only - Only show for existing notes */}
          {selectedNote && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600"
              >
                <Ellipsis className="h-5 w-5" />
              </button>
              {showMenu && (
                <NoteActionsMenu onClose={() => setShowMenu(false)} />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-auto p-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className="mb-4 w-full border-none text-2xl font-bold text-gray-900 dark:text-white dark:bg-gray-900 placeholder-gray-400 focus:outline-none"
          autoFocus={!selectedNote}
        />

        {/* Tags Section */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-sm text-blue-800 dark:text-blue-200"
              >
                #{tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tag className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add tag..."
              className="pl-10 pr-16 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleAddTag}
              disabled={!newTag.trim()}
              className="absolute inset-y-0 right-0 flex items-center px-3 rounded-r-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <TipTapEditor
          content={content}
          onChange={setContent}
          placeholder="Start writing your note..."
        />
      </div>
    </div>
  );
}
