"use client";
import SidebarItem from "./ui/sidebarItem";
import {
  ArchiveIcon,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  MoreHorizontal,
  Star,
  Tag,
  Trash,
} from "lucide-react";
import { useNotes } from "@/context/NotesContext";
import { useEffect, useState } from "react";
import type { NoteFilter } from "@/types/types";
import truncateText from "@/utils/truncateText";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  showMobileSidebar: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  toggleSidebar,
  showMobileSidebar,
}) => {
  const {
    notes,
    currentFilterType,
    setCurrentFilterType,
    selectedTag,
    setSelectedTag,
    selectedNote,
    setSelectedNote,
  } = useNotes();

  const [showAllTags, setShowAllTags] = useState(false);

  const archivedCount = notes.filter((note) => note.isArchived).length;
  const favoritesCount = notes.filter((note) => note.isFavorite).length;
  const trashCount = notes.filter((note) => note.isDeleted).length;

  const allTags = Array.from(
    new Set(notes.flatMap((note) => note.tags || []))
  ).sort();

  const displayedTags = showAllTags ? allTags : allTags.slice(0, 5);

  const recentNotes = [...notes]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 3);

  const handleItemClick = (filter: NoteFilter) => {
    setCurrentFilterType(filter);
    setSelectedTag(null);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setCurrentFilterType("all");
  };

  const handleRecentNoteClick = (noteId: string) => {
    setSelectedNote(notes.find((note) => note.id === noteId) || null);
    setCurrentFilterType("all");
  };

  useEffect(() => {
    setCurrentFilterType("all");
  }, [setCurrentFilterType]);

  return (
    <aside
      id="sidebar"
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] z-20 transition-all duration-300 ease-in-out 
          ${isCollapsed ? "md:w-16" : "md:w-64"}
          ${
            showMobileSidebar
              ? "w-64 translate-x-0"
              : "w-64 -translate-x-full md:translate-x-0"
          }`}
    >
      <div className="pt-5 bg-[#fbfbfc] dark:bg-[#1e2531] flex flex-col h-full border-r border-gray-200 dark:border-gray-700 relative">
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 shadow-sm z-20 hidden md:block"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        <SidebarItem
          Icon={Home}
          name="All Notes"
          isActive={currentFilterType === "all" && !selectedTag}
          onClick={() => handleItemClick("all")}
          isCollapsed={isCollapsed}
        />

        <div className={`py-2 ${isCollapsed ? "flex justify-center" : ""}`}>
          {!isCollapsed && (
            <h2 className="text-gray-500 dark:text-gray-400 font-semibold text-sm pl-6 my-2">
              Recents
            </h2>
          )}

          {!isCollapsed && recentNotes.length > 0
            ? recentNotes.map((note) => (
                <SidebarItem
                  key={note.id}
                  Icon={FileText}
                  name={truncateText(note.title, 20)}
                  isActive={selectedNote?.id === note.id}
                  onClick={() => handleRecentNoteClick(note.id)}
                  isCollapsed={isCollapsed}
                />
              ))
            : !isCollapsed && (
                <div className="text-gray-400 dark:text-gray-500 text-sm pl-6 py-2">
                  No recent notes
                </div>
              )}
        </div>

        {isCollapsed && (
          <SidebarItem
            Icon={Tag}
            name="Tags"
            isActive={currentFilterType === "tag" && !selectedTag}
            onClick={() =>
              setSelectedTag(displayedTags.length > 0 ? displayedTags[0] : null)
            }
            isCollapsed={isCollapsed}
          />
        )}

        {!isCollapsed && (
          <div className="py-2">
            <h2 className="text-gray-500 dark:text-gray-400 font-semibold text-sm pl-6 my-2">
              Tags
            </h2>
            {displayedTags.length > 0 ? (
              <>
                {displayedTags.map((tag) => (
                  <SidebarItem
                    key={tag}
                    Icon={Tag}
                    name={tag}
                    isActive={selectedTag === tag}
                    onClick={() => handleTagClick(tag)}
                    isCollapsed={isCollapsed}
                  />
                ))}
                {allTags.length > 5 && (
                  <button
                    onClick={() => setShowAllTags(!showAllTags)}
                    className="flex items-center text-gray-500 dark:text-gray-400 text-sm py-2 px-6 w-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                    <span className="ml-2 text-sm">
                      {showAllTags ? "Show Less" : "View More"}
                    </span>
                  </button>
                )}
              </>
            ) : (
              <div className="text-gray-400 dark:text-gray-500 text-sm pl-6 py-2">
                No tags found
              </div>
            )}
          </div>
        )}

        <div
          className={`py-2 ${
            isCollapsed ? "flex flex-col justify-center" : ""
          }`}
        >
          {!isCollapsed && (
            <h2 className="text-gray-500 dark:text-gray-400 font-semibold text-sm pl-6 my-2">
              More
            </h2>
          )}
          <SidebarItem
            Icon={Star}
            name="Favorites"
            isActive={currentFilterType === "favorites"}
            onClick={() => handleItemClick("favorites")}
            badgeCount={favoritesCount}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            Icon={ArchiveIcon}
            name="Archived Notes"
            isActive={currentFilterType === "archived"}
            onClick={() => handleItemClick("archived")}
            badgeCount={archivedCount}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            Icon={Trash}
            name="Trash"
            isActive={currentFilterType === "trash"}
            onClick={() => handleItemClick("trash")}
            badgeCount={trashCount}
            isCollapsed={isCollapsed}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
