"use client";

import { useNotes } from "@/context/NotesContext";
import { Tag, X } from "lucide-react";
import { navigationItems } from "./Sidebar";
import Link from "next/link";
import Image from "next/image";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const {
    notes,
    currentFilterType,
    setCurrentFilterType,
    selectedTag,
    setSelectedTag,
  } = useNotes();

  const handleFilterChange = (
    type: "all" | "favorites" | "archived" | "trash"
  ) => {
    setCurrentFilterType(type);
    setSelectedTag(null);
    onClose();
  };

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
    setCurrentFilterType("all");
    onClose();
  };

  const getNotesCount = (type: string) => {
    switch (type) {
      case "favorites":
        return notes.filter((note) => note.isFavorite && !note.isTrashed)
          .length;
      case "archived":
        return notes.filter((note) => note.isArchived && !note.isTrashed)
          .length;
      case "trash":
        return notes.filter((note) => note.isTrashed).length;
      default:
        return notes.filter((note) => !note.isTrashed && !note.isArchived)
          .length;
    }
  };

  // Get all unique tags from notes
  const allTags = Array.from(
    new Set(
      notes.filter((note) => !note.isTrashed).flatMap((note) => note.tags || [])
    )
  ).sort();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-80 max-w-[80vw] bg-white dark:bg-gray-800 shadow-xl md:hidden">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 py-[12px]">
            {/* <Link href="/" className="flex items-center">
              <Image
                src="/icons/quikmemo-full-lockup-logo.svg"
                className="w-28 h-auto"
                alt="Quikmemo logo"
                width={50}
                height={50}
              />
            </Link> */}
            <div className="flex justify-center items-center text-gray-800 dark:text-gray-200 ">
              <Link href="/" className="flex items-center">
                <Image
                  src="/icons/quikmemo-mark-logo.svg"
                  className="w-6 h-auto"
                  alt="Quikmemo logo"
                  width={50}
                  height={50}
                />
              </Link>
              <span className="flex ml-2 md:text-md text-base font-bold whitespace-nowrap text-gray-900 dark:text-white">
                Quikmemo
              </span>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="px-2 pt-2">
              {navigationItems.map((item) => {
                const isActive = currentFilterType === item.id;
                const count = getNotesCount(item.id);
                const IconComponent = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleFilterChange(item.id)}
                    className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4" />
                      <span className="capitalize">{item.label}</span>
                    </div>
                    <span
                      className={`text-xs ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="px-4 pb-2">
                <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span>
                    <Tag className="w-4 h-4" />
                  </span>
                  Tags
                </h3>
              </div>
              <div className="px-2 pb-8">
                {allTags.length > 0 ? (
                  allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleSelectTag(tag)}
                      className={`mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        selectedTag === tag
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span className="text-gray-400">#</span>
                      <span>{tag}</span>
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                    No tags yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
