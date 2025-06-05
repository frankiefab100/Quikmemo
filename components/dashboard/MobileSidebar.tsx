// "use client";

// import { useNotes } from "@/context/NotesContext";
// import { createNewNote } from "@/utils/noteUtils";

// interface MobileSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const navigationItems = [
//   { id: "all", label: "All Notes", icon: "📝" },
//   { id: "favorites", label: "Favorites", icon: "❤️" },
//   { id: "archived", label: "Archived", icon: "📦" },
//   { id: "trash", label: "Trash", icon: "🗑️" },
// ] as const;

// export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
//   const { state, dispatch } = useNotes();

//   const handleCreateNote = () => {
//     const newNote = createNewNote();
//     dispatch({ type: "ADD_NOTE", payload: newNote });
//     dispatch({ type: "SELECT_NOTE", payload: newNote.id });
//     onClose();
//   };

//   const handleFilterChange = (type: (typeof navigationItems)[number]["id"]) => {
//     dispatch({
//       type: "SET_FILTER",
//       payload: { ...state.filter, type },
//     });
//     onClose();
//   };

//   const handleSelectTag = (tag: string) => {
//     dispatch({
//       type: "SET_FILTER",
//       payload: { type: "all", searchQuery: `#${tag}` },
//     });
//     onClose();
//   };

//   const getNotesCount = (type: string) => {
//     switch (type) {
//       case "favorites":
//         return state.notes.filter((note) => note.isFavorite && !note.isDeleted)
//           .length;
//       case "archived":
//         return state.notes.filter((note) => note.isArchived && !note.isDeleted)
//           .length;
//       case "trash":
//         return state.notes.filter((note) => note.isDeleted).length;
//       default:
//         return state.notes.filter((note) => !note.isDeleted && !note.isArchived)
//           .length;
//     }
//   };

//   // Get all unique tags from notes
//   const allTags = Array.from(
//     new Set(
//       state.notes.filter((note) => !note.isDeleted).flatMap((note) => note.tags)
//     )
//   ).sort();

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
//         onClick={onClose}
//       />

//       {/* Sidebar */}
//       <div className="fixed inset-y-0 left-0 z-50 w-80 max-w-[80vw] bg-white shadow-xl md:hidden">
//         <div className="flex h-full flex-col">
//           <div className="flex items-center justify-between border-b border-gray-200 p-4">
//             <h2 className="text-lg font-semibold text-gray-900">Quikmemo</h2>
//             <button
//               onClick={onClose}
//               className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             <div className="p-4">
//               <button
//                 onClick={handleCreateNote}
//                 className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//               >
//                 <svg
//                   className="h-4 w-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 4v16m8-8H4"
//                   />
//                 </svg>
//                 New Note
//               </button>
//             </div>

//             <div className="px-2">
//               {navigationItems.map((item) => {
//                 const isActive = state.filter.type === item.id;
//                 const count = getNotesCount(item.id);

//                 return (
//                   <button
//                     key={item.id}
//                     onClick={() => handleFilterChange(item.id)}
//                     className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
//                       isActive
//                         ? "bg-blue-100 text-blue-700"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <span className="text-base">{item.icon}</span>
//                       <span>{item.label}</span>
//                     </div>
//                     <span
//                       className={`text-xs ${
//                         isActive ? "text-blue-600" : "text-gray-500"
//                       }`}
//                     >
//                       {count}
//                     </span>
//                   </button>
//                 );
//               })}
//             </div>

//             <div className="mt-6 border-t border-gray-200 pt-4">
//               <div className="px-4 pb-2">
//                 <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                   <span>🏷️</span>
//                   Tags
//                 </h3>
//               </div>
//               <div className="px-2 pb-8">
//                 {allTags.length > 0 ? (
//                   allTags.map((tag) => (
//                     <button
//                       key={tag}
//                       onClick={() => handleSelectTag(tag)}
//                       className="mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-100"
//                     >
//                       <span className="text-gray-400">#</span>
//                       <span>{tag}</span>
//                     </button>
//                   ))
//                 ) : (
//                   <p className="px-3 py-2 text-sm text-gray-500">No tags yet</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useNotes } from "@/context/NotesContext";
import { Image, X } from "lucide-react";
import Link from "next/link";

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
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quikmemo
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="px-2 pt-2">
              {["all", "favorites", "archived", "trash"].map((item) => {
                const isActive = currentFilterType === item;
                const count = getNotesCount(item);
                let icon = "📝";
                if (item === "favorites") icon = "❤️";
                if (item === "archived") icon = "📦";
                if (item === "trash") icon = "🗑️";

                return (
                  <button
                    key={item}
                    onClick={() =>
                      handleFilterChange(
                        item as "all" | "favorites" | "archived" | "trash"
                      )
                    }
                    className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base">{icon}</span>
                      <span className="capitalize">{item}</span>
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
                  <span>🏷️</span>
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
