// "use client";
// import { Archive, Star, Trash2 } from "lucide-react";
// import { useNotes } from "@/context/NotesContext";
// import { useState } from "react";
// import Modal from "../../ui/Modal";

// interface DeleteArchiveProps {
//   onClose?: () => void;
// }

// const DeleteArchive: React.FC<DeleteArchiveProps> = ({ onClose }) => {
//   const { selectedNote, handleDeleteNote, handleArchiveNote } = useNotes();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOpenModal = () => {
//     setIsOpen(true);
//   };

//   const onArchive = () => {
//     if (selectedNote) {
//       handleArchiveNote(selectedNote.id);
//       if (onClose) return onClose();
//     }
//   };

//   const onDelete = () => {
//     handleOpenModal();
//   };

//   const handleConfirmDelete = () => {
//     if (selectedNote) {
//       handleDeleteNote(selectedNote.id);
//       setIsOpen(false);
//       if (onClose) return onClose();
//     }
//   };

//   const onAddToFavorites = () => {
//     if (onClose) return onClose();
//   };

//   return (
//     <div className="absolute right-0 p-4 rounded shadow bg-gray-100 dark:bg-gray-700 z-10">
//       <button
//         className="flex justify-center mb-2 w-full px-5 py-2.5 text-sm font-medium rounded-lg cursor-pointer text-gray-400 hover:dark:bg-gray-600 hover:bg-gray-200"
//         onClick={onAddToFavorites}
//       >
//         <Star className="w-5 h-5 mr-2" />
//         Add to Favorites
//       </button>

//       <button
//         className={`flex mb-2 w-full px-5 py-2.5 text-sm font-medium rounded-lg cursor-pointer text-gray-400 transition-all duration-200 ${
//           selectedNote
//             ? "dark:text-gray-300 text-gray-700 hover:dark:bg-gray-600 hover:bg-gray-200"
//             : "text-gray-400"
//         }`}
//         onClick={onArchive}
//         disabled={!selectedNote}
//       >
//         <Archive className="w-5 h-5 mr-2" />

//         {selectedNote?.isArchived ? "Unarchive Note" : "Archive Note"}
//       </button>

//       <button
//         className={`flex w-full px-5 py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 ${
//           selectedNote
//             ? "text-red-600 bg-red-200 hover:dark:bg-red-100 hover:bg-red-300"
//             : "text-gray-400"
//         }`}
//         onClick={onDelete}
//         disabled={!selectedNote}
//       >
//         <Trash2 className="w-5 h-5 mr-2" />
//         Delete Note
//       </button>

//       {isOpen && (
//         <Modal
//           isOpen={isOpen}
//           onClose={() => setIsOpen(false)}
//           onConfirm={handleConfirmDelete}
//         />
//       )}
//     </div>
//   );
// };

// export default DeleteArchive;

"use client";
import { Archive, Star, Trash2 } from "lucide-react";
import { useNotes } from "@/context/NotesContext";
import { useState } from "react";
import Modal from "../../ui/Modal";

interface DeleteArchiveProps {
  onClose?: () => void;
}

const DeleteArchive: React.FC<DeleteArchiveProps> = ({ onClose }) => {
  const {
    selectedNote,
    handleDeleteNote,
    handleArchiveNote,
    handleFavoriteNote,
  } = useNotes();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const onArchive = () => {
    if (selectedNote) {
      handleArchiveNote(selectedNote.id);
      if (onClose) return onClose();
    }
  };

  const onDelete = () => {
    handleOpenModal();
  };

  const handleConfirmDelete = () => {
    if (selectedNote) {
      handleDeleteNote(selectedNote.id);
      setIsOpen(false);
      if (onClose) return onClose();
    }
  };

  const onAddToFavorites = () => {
    if (selectedNote) {
      handleFavoriteNote(selectedNote.id);
      if (onClose) return onClose();
    }
  };

  return (
    <div className="absolute right-0 p-4 rounded shadow bg-gray-100 dark:bg-gray-700 z-10">
      <button
        className={`flex mb-2 w-full px-5 py-2.5 text-sm font-medium rounded-lg cursor-pointer text-gray-400 transition-all duration-200 ${
          selectedNote
            ? "dark:text-gray-300 text-gray-700 hover:dark:bg-gray-600 hover:bg-gray-200"
            : "text-gray-400"
        }`}
        onClick={onAddToFavorites}
        disabled={!selectedNote}
      >
        <Star className="w-5 h-5 mr-2" />
        {selectedNote?.isFavorite
          ? "Remove from Favorites"
          : "Add to Favorites"}
      </button>

      <button
        className={`flex mb-2 w-full px-5 py-2.5 text-sm font-medium rounded-lg cursor-pointer text-gray-400 transition-all duration-200 ${
          selectedNote
            ? "dark:text-gray-300 text-gray-700 hover:dark:bg-gray-600 hover:bg-gray-200"
            : "text-gray-400"
        }`}
        onClick={onArchive}
        disabled={!selectedNote}
      >
        <Archive className="w-5 h-5 mr-2" />
        {selectedNote?.isArchived ? "Unarchive Note" : "Archive Note"}
      </button>

      <button
        className={`flex w-full px-5 py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 ${
          selectedNote
            ? "text-red-600 bg-red-200 hover:dark:bg-red-100 hover:bg-red-300"
            : "text-gray-400"
        }`}
        onClick={onDelete}
        disabled={!selectedNote}
      >
        <Trash2 className="w-5 h-5 mr-2" />
        Delete Note
      </button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default DeleteArchive;
