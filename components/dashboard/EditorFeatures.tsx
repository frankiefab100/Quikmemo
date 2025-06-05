"use client";
import type React from "react";
import type { LucideIcon } from "lucide-react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  Strikethrough,
  List,
  ListOrdered,
  Code,
  Quote,
  Undo,
  Redo,
  Link,
} from "lucide-react";
import type { Editor } from "@tiptap/react";
import Tooltip from "@/components/ui/Tooltip";

interface EditorFeatureProps {
  label: string;
  Icon: LucideIcon;
  onClick?: () => void;
  isActive?: boolean;
}

export interface FeatureItem {
  label: string;
  Icon: LucideIcon;
  action?: (editor: Editor) => void;
  isActive?: (editor: Editor) => boolean;
}

export const featureItems: FeatureItem[] = [
  {
    label: "Heading 1",
    Icon: Heading1,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 1 }),
  },
  {
    label: "Heading 2",
    Icon: Heading2,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
  },
  {
    label: "Heading 3",
    Icon: Heading3,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 3 }),
  },
  {
    label: "Bold",
    Icon: Bold,
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive("bold"),
  },
  {
    label: "Italic",
    Icon: Italic,
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive("italic"),
  },
  {
    label: "Underline",
    Icon: Underline,
    action: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive("underline"),
  },
  {
    label: "Strikethrough",
    Icon: Strikethrough,
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive("strike"),
  },
  {
    label: "Bullet List",
    Icon: List,
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
  },
  {
    label: "Ordered List",
    Icon: ListOrdered,
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive("orderedList"),
  },
  {
    label: "Code Block",
    Icon: Code,
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
  },
  {
    label: "Blockquote",
    Icon: Quote,
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
  },
  {
    label: "Undo",
    Icon: Undo,
    action: (editor) => editor.chain().focus().undo().run(),
  },
  {
    label: "Redo",
    Icon: Redo,
    action: (editor) => editor.chain().focus().redo().run(),
  },
  {
    label: "Link",
    Icon: Link,
    action: (editor) => {
      const url = window.prompt("URL");
      if (url) {
        editor.chain().focus().setLink({ href: url }).run();
      }
    },
    isActive: (editor) => editor.isActive("link"),
  },
];

const EditorFeature: React.FC<EditorFeatureProps> = ({
  label,
  Icon,
  onClick,
  isActive,
}) => {
  return (
    <Tooltip content={label} side="bottom">
      <button
        type="button"
        className={`p-2 rounded cursor-pointer ${
          isActive
            ? "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20"
            : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        }`}
        onClick={onClick}
      >
        <Icon className="w-4 h-4" />
        <span className="sr-only">{label}</span>
      </button>
    </Tooltip>
  );
};

export default EditorFeature;
