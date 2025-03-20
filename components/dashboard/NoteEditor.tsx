"use client";
import { ChevronLeft, CircleEllipsis, Clock, Tag } from "lucide-react";
import type React from "react";
import Button from "../ui/Button";
import EditorFeature, { featureItems } from "./ui/editorFeature";
import { useNotes } from "@/context/NotesContext";
import { type FormEvent, useCallback, useState, useEffect } from "react";
import Toast from "../ui/Toast";
import DeleteArchive from "./ui/DeleteArchive";
import { useClickOutside } from "@/hook/useClickOutside";

const NoteEditor: React.FC = () => {
  const {
    title,
    setTitle,
    content,
    setContent,
    tags,
    setTags,
    selectedNote,
    setSelectedNote,
    handleSaveNote,
    handleUpdateNote,
    setShowToast,
    showToast,
    loading,
    error,
    setError,
  } = useNotes();

  const [showDeleteArchive, setShowDeleteArchive] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setLocalError(error);
      setTimeout(() => setError(null), 100);
    }
  }, [error, setError]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setLocalError(null);
    if (!title.trim()) {
      setLocalError("Title is required");
      return;
    }
    if (!content.trim()) {
      setLocalError("Content is required");
      return;
    }

    if (selectedNote) {
      handleUpdateNote(selectedNote.id, event);
    } else {
      handleSaveNote(event);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setTags([]);
    setSelectedNote(null);
    setLocalError(null);
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value.split(",").map((tag) => tag.trim()));
  };

  const closeDeleteArchive = useCallback(() => {
    setShowDeleteArchive(false);
  }, []);
  const deleteArchiveRef = useClickOutside(closeDeleteArchive);

  if (!selectedNote && window.innerWidth < 768) {
    return null;
  }

  return (
    <div
      className={`flex-1 flex flex-col h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ${
        selectedNote ? "flex" : "hidden md:flex"
      }`}
    >
      <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setSelectedNote(null)}
          className="flex items-center text-gray-600 hover:text-gray-400 dark:text-gray-200 dark:hover:text-gray-500"
        >
          <ChevronLeft className="w-6 h-6 mr-2" />
          <span>Back to notes</span>
        </button>
      </div>

      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
        <div className="relative flex-1">
          <input
            className="w-full text-gray-900 dark:text-white bg-transparent text-2xl font-semibold outline-none placeholder:text-muted-foreground"
            placeholder="Note title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            disabled={loading}
          />

          <div className="relative">
            {showDeleteArchive ? (
              <div ref={deleteArchiveRef}>
                <DeleteArchive onClose={closeDeleteArchive} />
              </div>
            ) : (
              <CircleEllipsis
                onClick={() => setShowDeleteArchive(true)}
                className="absolute right-0 top-0 text-gray-700 dark:text-gray-200 cursor-pointer"
              />
            )}
          </div>

          <div className="mt-2 block">
            <div className="flex items-center gap-4">
              <span className="flex justify-center items-center text-sm text-gray-900 dark:text-white">
                <Tag className="w-3 h-3 mr-2" />
                Tags
              </span>
              <input
                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white outline-none placeholder:italic"
                placeholder="Enter tags, separated by commas"
                value={tags.join(", ")}
                onChange={handleTagChange}
                disabled={loading}
              />
            </div>
            <div className="flex items-center gap-4 mt-1">
              <span className="flex justify-center items-center text-sm text-gray-900 dark:text-white">
                <Clock className="w-3 h-3 mr-2" />
                Last edited
              </span>
              <span className="text-sm text-gray-900 dark:text-white">
                {selectedNote?.createdAt || selectedNote?.updatedAt ? (
                  new Date(
                    selectedNote?.createdAt || selectedNote?.updatedAt
                  ).toLocaleString()
                ) : (
                  <span className="text-xs italic text-gray-400 dark:text-gray-400">
                    DD/MM/YYYY, 00:00:00 AM
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        {showToast && (
          <Toast type="success" onClose={() => setShowToast(false)} />
        )}

        {localError && (
          <div className="p-2 bg-red-50 text-red-700 text-center">
            {localError}
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <div className="flex flex-wrap items-center">
            {featureItems.map((feature) => (
              <EditorFeature
                key={feature.label}
                label={feature.label}
                Icon={feature.Icon}
              />
            ))}
          </div>
          <div className="md:flex justify-between hidden">
            <Button type="submit" variant="secondary" disabled={loading}>
              {selectedNote ? "Update" : "Save"}
            </Button>
            <Button
              style={{ marginLeft: "5px" }}
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <textarea
            id="editor"
            className="w-full h-full min-h-[300px] py-4 px-4 text-base text-gray-800 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-400 resize-none"
            placeholder="Write a note..."
            value={content}
            onChange={(event) => setContent(event.target.value)}
            disabled={loading}
          ></textarea>
        </div>

        {/* Mobile action buttons */}
        <div className="md:hidden flex justify-between p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="submit"
            variant="secondary"
            disabled={loading}
            className="flex-1 mr-2 text-gray-900 dark:text-white"
          >
            {selectedNote ? "Update" : "Save"}
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 ml-2 text-gray-900 dark:text-white"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;
