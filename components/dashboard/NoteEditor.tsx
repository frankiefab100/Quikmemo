"use client";
import { ChevronLeft, CircleEllipsis, Clock, Tag } from "lucide-react";
import Button from "../ui/Button";
import EditorFeature, { featureItems } from "./ui/editorFeature";
import { useNotes } from "@/context/NotesContext";
import { useState, type FormEvent } from "react";
import Toast from "../ui/Toast";
import Link from "next/link";
import DeleteArchive from "./ui/DeleteArchive";

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
  } = useNotes();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
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
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value.split(",").map((tag) => tag.trim()));
  };

  const [showDeleteArchive, setShowDeleteArchive] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="m-3 md:hidden flex justify-between">
        <Link
          href="/"
          className="flex items-center text-sm text-gray-600 hover:text-gray-400 dark:text-gray-200 dark:hover:text-gray-500"
        >
          <ChevronLeft className="w-6 h-6 mr-2" />
          Go Back
        </Link>

        <div className="flex items-center">
          <Button type="submit">
            {selectedNote ? "Update Note" : "Save Note"}
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative flex-1">
          <input
            className="w-full text-gray-900 dark:text-white bg-transparent text-2xl font-semibold outline-none placeholder:text-muted-foreground"
            placeholder="Note title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <div className="relative">
            {showDeleteArchive ? (
              <DeleteArchive />
            ) : (
              <CircleEllipsis
                onClick={() => setShowDeleteArchive(true)}
                className="absolute right-0 top-0 text-gray-700 dark:text-gray-200 cursor-pointer"
              />
            )}
          </div>

          <div className="mt-2 block">
            <div className="flex items-center gap-14">
              <span className="flex justify-center items-center text-sm text-gray-900 dark:text-white">
                <Tag className="w-3 h-3 mr-2" />
                Tags
              </span>
              <input
                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white outline-none placeholder:italic"
                placeholder="Enter tags, separated by commas"
                value={tags.join(", ")}
                onChange={handleTagChange}
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="flex justify-center items-center text-sm text-gray-900 dark:text-white">
                <Clock className="w-3 h-3 mr-2" />
                Last edited
              </span>

              <span className="text-sm text-gray-900 dark:text-white">
                {selectedNote?.lastEdited ? (
                  new Date(selectedNote.lastEdited).toLocaleString()
                ) : (
                  <span className="text-xs italic text-gray-600 dark:text-gray-400">
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
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-4">
        <div className="flex items-center justify-between mb-2 border-b dark:border-gray-600">
          <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
            {featureItems.map((feature) => (
              <EditorFeature
                key={feature.label}
                label={feature.label}
                Icon={feature.Icon}
              />
            ))}
          </div>
          <div className="md:flex justify-between hidden">
            <Button type="submit">
              {selectedNote ? "Update Note" : "Save Note"}
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
        <div className="w-full">
          <textarea
            id="editor"
            className="w-full min-h-[71vh] px-1 text-base text-gray-800 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-400"
            placeholder="Write a note..."
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={10}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;
