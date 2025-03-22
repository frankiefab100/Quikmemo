"use client";
import React from "react";
import { useEffect } from "react";
import EditorFeature, { featureItems } from "./ui/editorFeature";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Button from "../ui/Button";
import { useNotes } from "@/context/NotesContext";

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  editable?: boolean;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({
  content,
  onChange,
  placeholder = "Write a note...",
  editable = true,
}) => {
  const {
    selectedNote,
    loading,
    setTitle,
    setContent,
    setTags,
    setSelectedNote,
  } = useNotes();

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setTags([]);
    setSelectedNote(null);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        validate: (href) => /^https?:\/\//.test(href),
      }),
      Image,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="flex flex-wrap justify-between items-center py-2 px-2 border-b border-gray-200 dark:border-gray-700">
        <div>
          {featureItems.map((feature, index) => (
            <EditorFeature
              key={index}
              label={feature.label}
              Icon={feature.Icon}
              onClick={() => feature.action && feature.action(editor)}
              isActive={feature.isActive ? feature.isActive(editor) : false}
            />
          ))}
        </div>
        <div className="md:flex justify-center items-center hidden">
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
      <div className="tiptap-editor">
        <EditorContent
          editor={editor}
          className="w-full min-h-[71vh] py-1 text-base text-gray-800 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-400 prose dark:prose-invert max-w-none"
        />
      </div>
    </React.Fragment>
  );
};

export default TipTapEditor;
