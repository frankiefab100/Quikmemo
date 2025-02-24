"use client";
import { Expand, Clock, Tag } from "lucide-react";
import Button from "../ui/Button";
import EditorFeature, { featureItems } from "./editorFeature";
import { useNotes } from "@/context/NotesContext";
import type { FormEvent } from "react";

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

  return (
    <div className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 bg-white border-gray-200 text-white pt-16 flex flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex-1">
          <input
            className="text-gray-900 dark:text-white w-full bg-transparent text-2xl font-semibold outline-none placeholder:text-muted-foreground"
            placeholder="Note title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <div className="mt-2 block">
            <div className="flex items-center gap-14">
              <span className="flex justify-center items-center text-sm text-gray-900 dark:text-white">
                <span className="pr-2">
                  <Tag className="w-3 h-3" />
                </span>
                Tags
              </span>
              <input
                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white outline-none"
                placeholder="Enter tags, separated by commas"
                value={tags.join(", ")}
                onChange={handleTagChange}
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="flex justify-center items-center text-sm text-gray-900 dark:text-white">
                <span className="pr-2">
                  <Clock className="w-3 h-3" />
                </span>
                Last edited
              </span>
              <span className="text-sm text-gray-900 dark:text-white">
                {selectedNote?.lastEdited
                  ? new Date(selectedNote.lastEdited).toLocaleString()
                  : "Not saved yet"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-4">
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
            <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
              {featureItems.map((feature) => (
                <EditorFeature
                  key={feature.label}
                  label={feature.label}
                  Icon={feature.Icon}
                />
              ))}
            </div>
            <button
              type="button"
              data-tooltip-target="tooltip-fullscreen"
              className="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <Expand className="w-4 h-4" />
              <span className="sr-only">Full screen</span>
            </button>
          </div>
          <div className="px-4 bg-white rounded-b-lg dark:bg-gray-800">
            <textarea
              id="editor"
              className="block w-full h-[45vh] resize-none px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a note..."
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={10}
              required
            ></textarea>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-start gap-2">
          <Button type="submit">
            {selectedNote ? "Update Note" : "Save Note"}
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;
