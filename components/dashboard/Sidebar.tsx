"use client";

import { useNotes } from "@/context/NotesContext";
import truncateText from "@/utils/truncateText";
import {
  ArchiveIcon,
  Home,
  Trash,
  Star,
  Tag,
  MoreHorizontal,
  FileText,
} from "lucide-react";
import { useState } from "react";

const navigationItems = [
  { id: "all", label: "All Notes", icon: Home },
  { id: "favorites", label: "Favorites", icon: Star },
  { id: "archived", label: "Archived", icon: ArchiveIcon },
  { id: "trash", label: "Trash", icon: Trash },
] as const;

export default function Sidebar() {
  const {
    notes,
    currentFilterType,
    setCurrentFilterType,
    setSelectedNote,
    selectedTag,
    setSelectedTag,
  } = useNotes();

  const [showAllTags, setShowAllTags] = useState(false);

  const allTags = Array.from(
    new Set(notes.flatMap((note) => note.tags || []))
  ).sort();
  const displayedTags = showAllTags ? allTags : allTags.slice(0, 5);

  const recentNotes = [...notes]
    .filter((note) => !note.isTrashed && !note.isArchived)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 3);

  const handleFilterChange = (type: typeof currentFilterType) => {
    setCurrentFilterType(type);
    setSelectedTag(null);
  };

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
    setCurrentFilterType("all");
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

  const handleRecentNoteClick = (noteId: string) => {
    setSelectedNote(notes.find((note) => note.id === noteId) || null);
    setCurrentFilterType("all");
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <div className="flex-1 overflow-y-auto pt-2">
        <div className="px-2">
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
                  <span>{item.label}</span>
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

        <div className="py-2 block">
          <h2 className="text-gray-500 dark:text-gray-400 font-semibold text-sm pl-6 my-2">
            Recents
          </h2>

          {recentNotes.length > 0 ? (
            recentNotes.map((note) => {
              const isActive = currentFilterType === note.id;

              return (
                <button
                  key={note.id}
                  onClick={() => handleRecentNoteClick(note.id)}
                  className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span
                      className={`truncate text-xs ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {truncateText(note.title, 20)}
                    </span>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="text-gray-400 dark:text-gray-500 text-sm pl-6 py-2">
              No recent notes
            </div>
          )}
        </div>

        <div className="my-5 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="px-4 pb-2">
            <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <span>
                {" "}
                <Tag className="w-4 h-4" />{" "}
              </span>
              Tags
            </h3>
          </div>
          <div className="px-2">
            {allTags.length > 0 ? (
              <>
                {displayedTags.map((tag) => (
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
                ))}

                {allTags.length > 5 && (
                  <button
                    onClick={() => setShowAllTags(!showAllTags)}
                    className="flex items-center text-gray-500 dark:text-gray-400 text-sm py-2 px-6 w-full hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                    <span className="ml-2 text-sm">
                      {showAllTags ? "Show Less" : "View More"}
                    </span>
                  </button>
                )}
              </>
            ) : (
              <p className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                No tags yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
