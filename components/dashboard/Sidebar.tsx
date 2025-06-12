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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Tooltip from "@/components/ui/Tooltip";

export const navigationItems = [
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
  const [collapsed, setCollapsed] = useState(false);

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
    <div
      className={`flex h-full flex-col border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition-width duration-300 ${
        collapsed ? "w-16" : "w-64"
      } relative z-0`}
    >
      {/* Collapse/Expand Button */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-6 z-12 rounded-full border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-600 dark:bg-gray-700 hidden md:flex items-center justify-center"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        )}
      </button>

      <div className="flex-1 overflow-y-auto pt-2">
        {/* Navigation Items */}
        <div className="px-2">
          {navigationItems.map((item) => {
            const isActive = currentFilterType === item.id;
            const count = getNotesCount(item.id);
            const IconComponent = item.icon;

            const buttonContent = (
              <button
                key={item.id}
                onClick={() => handleFilterChange(item.id)}
                className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                  ${collapsed ? "justify-center px-0" : ""}
                `}
                style={{ position: "relative" }}
              >
                <div
                  className={`flex items-center gap-3 ${
                    collapsed ? "justify-center w-full" : ""
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed && (
                  <span
                    className={`text-xs ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {count}
                  </span>
                )}

                {/* Badge on icon when collapsed */}
                {collapsed && count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                    {count > 10 ? "10+" : count}
                  </span>
                )}
              </button>
            );

            // Wrap button with Tooltip if collapsed
            return collapsed ? (
              <Tooltip key={item.id} content={item.label} side="right">
                <div className="relative z-[9999]">{buttonContent}</div>{" "}
              </Tooltip>
            ) : (
              buttonContent
            );
          })}
        </div>

        {/* Recents */}
        {!collapsed && (
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
        )}

        {/* Tags */}
        {!collapsed && (
          <div className="my-5 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="px-4 pb-2">
              <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <span>
                  <Tag className="w-4 h-4" />
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
        )}
      </div>
    </div>
  );
}
