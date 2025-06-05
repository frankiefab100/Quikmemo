"use client";
import type React from "react";
import type { INote, NoteFilter } from "@/types/types";
import type { NoteContextProps } from "@/types/types";
import {
  createContext,
  type FormEvent,
  useContext,
  useState,
  useEffect,
} from "react";
import { useSession } from "next-auth/react";

export const NotesContext = createContext<NoteContextProps | undefined>(
  undefined
);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFilterType, setCurrentFilterType] = useState<NoteFilter>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedTrashNotes, setSelectedTrashNotes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<INote[]>([]);

  // Mobile state
  const [isMobileEditorOpen, setIsMobileEditorOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);

  const { data: session, status } = useSession();

  // Fetch notes when session changes
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      fetchNotes();
    }
  }, [session, status]);

  useEffect(() => {
    const filtered = notes.filter((note) => {
      const lowerCaseSearchTerm = searchQuery.toLowerCase();
      const matchesSearch =
        note.title?.toLowerCase().includes(lowerCaseSearchTerm) ||
        note.content?.toLowerCase().includes(lowerCaseSearchTerm) ||
        note.tags?.some((tag) =>
          tag.toLowerCase().includes(lowerCaseSearchTerm)
        );

      if (selectedTag && !note.tags?.includes(selectedTag)) {
        return false;
      }

      switch (currentFilterType) {
        case "archived":
          return note.isArchived && !note.isTrashed && matchesSearch;
        case "trash":
          return note.isTrashed && matchesSearch;
        case "favorites":
          return (
            note.isFavorite &&
            !note.isTrashed &&
            !note.isArchived &&
            matchesSearch
          );
        case "all":
        default:
          return !note.isArchived && !note.isTrashed && matchesSearch;
      }
    });
    setFilteredNotes(filtered);
  }, [notes, currentFilterType, selectedTag, searchQuery]);

  const fetchNotes = async () => {
    if (status !== "authenticated" || !session?.user) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/notes");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to fetch notes: ${response.status}`
        );
      }

      const fetchedNotes = await response.json();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          tags: tags || [],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to save note: ${response.statusText}`
        );
      }

      const savedNote = await response.json();
      setNotes((prevNotes) => [savedNote, ...prevNotes]);
      setTitle("");
      setContent("");
      setTags([]);
      setIsMobileEditorOpen(true); // Open editor on mobile when creating new note
      setShowToast(true);
    } catch (error) {
      console.error("Error saving note:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while saving the note."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNote = async (id: string, event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    if (!title || !content) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          tags,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to update note: ${response.statusText}`
        );
      }

      const updatedNote = await response.json();

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
      setSelectedNote(null);
      setTitle("");
      setContent("");
      setTags([]);
      setShowToast(true);
    } catch (error) {
      console.error("Error updating note:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while updating the note."
      );
    } finally {
      setLoading(false);
    }
  };

  // Move note to trash instead of deleting
  const handleTrashNote = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isTrashed: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to trash note: ${response.statusText}`
        );
      }

      const updatedNote = await response.json();

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
      if (selectedNote?.id === id) {
        setSelectedNote(null);
        setTitle("");
        setContent("");
        setTags([]);
        setIsMobileEditorOpen(false); // Close mobile editor when trashing current note
      }

      setShowToast(true);
    } catch (error) {
      console.error("Error trashing note:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while trashing the note."
      );
    } finally {
      setLoading(false);
    }
  };

  // Restore note from trash
  const handleRestoreNote = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isTrashed: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to restore note: ${response.statusText}`
        );
      }

      const updatedNote = await response.json();

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
      setSelectedTrashNotes((prev) => prev.filter((noteId) => noteId !== id));

      setShowToast(true);
    } catch (error) {
      console.error("Error restoring note:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while restoring the note."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/notes/${id}/delete`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to delete note: ${response.statusText}`
        );
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      setSelectedTrashNotes((prev) => prev.filter((noteId) => noteId !== id));

      setShowToast(true);
    } catch (error) {
      console.error("Error deleting note:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while deleting the note."
      );
    } finally {
      setLoading(false);
    }
  };

  // Empty trash (delete all selected notes)
  const handleEmptyTrash = async () => {
    if (selectedTrashNotes.length === 0) return;

    try {
      setLoading(true);
      setError(null);

      const promises = selectedTrashNotes.map((id) =>
        fetch(`/api/notes/${id}/delete`, {
          method: "DELETE",
        })
      );

      const results = await Promise.allSettled(promises);
      const failedResults = results.filter(
        (result) => result.status === "rejected"
      );

      if (failedResults.length > 0) {
        throw new Error(`Failed to delete ${failedResults.length} notes`);
      }

      setNotes((prevNotes) =>
        prevNotes.filter((note) => !selectedTrashNotes.includes(note.id))
      );
      setSelectedTrashNotes([]);

      setShowToast(true);
    } catch (error) {
      console.error("Error emptying trash:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while emptying the trash."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleArchiveNote = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const noteToArchive = notes.find((note) => note.id === id);
      if (!noteToArchive) return;

      const response = await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isArchived: !noteToArchive.isArchived,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to archive note: ${response.statusText}`
        );
      }

      const updatedNote = await response.json();

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
      if (selectedNote?.id === id) {
        setSelectedNote(null);
        setTitle("");
        setContent("");
        setTags([]);
        setIsMobileEditorOpen(false);
      }
    } catch (error) {
      console.error("Error archiving note:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while archiving the note."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteNote = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const noteToFavorite = notes.find((note) => note.id === id);
      if (!noteToFavorite) return;

      const response = await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isFavorite: !noteToFavorite.isFavorite,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error ||
            `Failed to add note to favorites: ${response.statusText}`
        );
      }

      const updatedNote = await response.json();

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
      if (selectedNote?.id === id) {
        setSelectedNote(null);
        setTitle("");
        setContent("");
        setTags([]);
        setIsMobileEditorOpen(false);
      }
    } catch (error) {
      console.error("Error bookmarking note as favorite:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while bookmarking note as favorite."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        selectedNote,
        setSelectedNote,
        currentFilterType,
        setCurrentFilterType,
        title,
        setTitle,
        content,
        setContent,
        tags,
        setTags,
        selectedTag,
        setSelectedTag,
        handleSaveNote,
        handleUpdateNote,
        handleDeleteNote,
        handleArchiveNote,
        handleFavoriteNote,
        handleTrashNote,
        handleRestoreNote,
        handleEmptyTrash,
        selectedTrashNotes,
        setSelectedTrashNotes,
        setShowToast,
        showToast,
        setLoading,
        loading,
        setError,
        error,
        searchQuery,
        setSearchQuery,
        filteredNotes,
        setFilteredNotes,
        isMobileEditorOpen,
        setIsMobileEditorOpen,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

// "use client";

// import type React from "react";
// import type { INote, NoteFilter, NoteContextProps } from "@/types/types";
// import {
//   createContext,
//   type FormEvent,
//   useContext,
//   useState,
//   useEffect,
// } from "react";

// export const NotesContext = createContext<NoteContextProps | undefined>(
//   undefined
// );

// // Sample data for demo purposes
// // const notes: INote[] = [
// const sampleNotes: INote[] = [
//   // {
//   //   id: "1",
//   //   title: "Welcome to Quikmemo",
//   //   content:
//   //     "This is your first note! You can edit this content, add new notes, mark favorites, archive, or delete notes. The interface is responsive and works great on both desktop and mobile devices.",
//   //   createdAt: new Date("2024-01-01"),
//   //   updatedAt: new Date("2024-01-01"),
//   //   isFavorite: true,
//   //   isArchived: false,
//   //   isTrashed: false,
//   //   tags: ["welcome", "getting-started"],
//   //   userId: "user1",
//   // },
//   // {
//   //   id: "2",
//   //   title: "Meeting Notes - Project Kickoff",
//   //   content:
//   //     "Discussed project timeline, deliverables, and team responsibilities. Next meeting scheduled for Friday at 2 PM. Action items: 1. Finalize requirements document 2. Set up development environment 3. Create initial wireframes",
//   //   createdAt: new Date("2024-01-02"),
//   //   updatedAt: new Date("2024-01-02"),
//   //   isFavorite: false,
//   //   isArchived: false,
//   //   isTrashed: false,
//   //   tags: ["meeting", "work", "project"],
//   //   userId: "user1",
//   // },
//   // {
//   //   id: "3",
//   //   title: "Shopping List",
//   //   content:
//   //     "Groceries needed: Milk, Bread, Eggs, Apples, Chicken breast, Rice, Vegetables (broccoli, carrots), Yogurt, Cheese, Coffee",
//   //   createdAt: new Date("2024-01-03"),
//   //   updatedAt: new Date("2024-01-03"),
//   //   isFavorite: false,
//   //   isArchived: true,
//   //   isTrashed: false,
//   //   tags: ["personal", "shopping"],
//   //   userId: "user1",
//   // },
//   // {
//   //   id: "4",
//   //   title: "Book Ideas",
//   //   content:
//   //     'Collection of interesting book recommendations: 1. "Atomic Habits" by James Clear 2. "The Psychology of Money" by Morgan Housel 3. "Thinking, Fast and Slow" by Daniel Kahneman',
//   //   createdAt: new Date("2024-01-04"),
//   //   updatedAt: new Date("2024-01-04"),
//   //   isFavorite: true,
//   //   isArchived: false,
//   //   isTrashed: false,
//   //   tags: ["books", "reading", "personal"],
//   //   userId: "user1",
//   // },
//   // {
//   //   id: "5",
//   //   title: "Workout Plan",
//   //   content:
//   //     "Monday: Chest and Triceps\nTuesday: Back and Biceps\nWednesday: Legs\nThursday: Shoulders\nFriday: Cardio\nWeekend: Rest",
//   //   createdAt: new Date("2024-01-05"),
//   //   updatedAt: new Date("2024-01-05"),
//   //   isFavorite: false,
//   //   isArchived: false,
//   //   isTrashed: false,
//   //   tags: ["fitness", "health", "personal"],
//   //   userId: "user1",
//   // },
//   {
//     id: "1",
//     title: "Quick Tips",
//     content:
//       "1. Create new notes with the `Create New Note` button\n2. Add tags to organize your notes\n3. Archive notes you don't need right now\n4. Use the editor toolbar for formatting\n5. Save notes",
//     tags: ["tips", "help"],
//     userId: "",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     isArchived: false,
//     isFavorite: false,
//     isTrashed: false,
//   },
//   {
//     id: "2",
//     title: "Welcome to Quikmemo!",
//     content:
//       "This is your first note. Feel free to edit or delete it.\n\nSome features you can try:\n- Edit this note\n- Add tags\n- Archive it\n- Create new notes\n- Delete notes\n\nThank you for choosing Quikmemo!",
//     tags: ["welcome", "getting-started"],
//     userId: "",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     isArchived: false,
//     isFavorite: false,
//     isTrashed: false,
//   },
// ];

// export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [notes, setNotes] = useState<INote[]>(sampleNotes);
//   const [selectedNote, setSelectedNote] = useState<INote | null>(null);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState<string[]>([]);
//   const [showToast, setShowToast] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [currentFilterType, setCurrentFilterType] = useState<NoteFilter>("all");
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [selectedTrashNotes, setSelectedTrashNotes] = useState<string[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredNotes, setFilteredNotes] = useState<INote[]>([]);

//   // Mobile state
//   const [isMobileEditorOpen, setIsMobileEditorOpen] = useState<boolean>(false);
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
//     useState<boolean>(false);

//   useEffect(() => {
//     const filtered = notes.filter((note) => {
//       const lowerCaseSearchTerm = searchQuery.toLowerCase();
//       const matchesSearch =
//         note.title?.toLowerCase().includes(lowerCaseSearchTerm) ||
//         note.content?.toLowerCase().includes(lowerCaseSearchTerm) ||
//         note.tags?.some((tag) =>
//           tag.toLowerCase().includes(lowerCaseSearchTerm)
//         );

//       if (selectedTag && !note.tags?.includes(selectedTag)) {
//         return false;
//       }

//       switch (currentFilterType) {
//         case "archived":
//           return note.isArchived && !note.isTrashed && matchesSearch;
//         case "trash":
//           return note.isTrashed && matchesSearch;
//         case "favorites":
//           return (
//             note.isFavorite &&
//             !note.isTrashed &&
//             !note.isArchived &&
//             matchesSearch
//           );
//         case "all":
//         default:
//           return !note.isArchived && !note.isTrashed && matchesSearch;
//       }
//     });
//     setFilteredNotes(filtered);
//   }, [notes, currentFilterType, selectedTag, searchQuery]);

//   const generateId = () => Math.random().toString(36).substr(2, 9);

//   const handleSaveNote = async (event?: FormEvent) => {
//     if (event) {
//       event.preventDefault();
//     }

//     if (!title || !content) {
//       setError("Title and content are required");
//       return;
//     }

//     const newNote: INote = {
//       id: generateId(),
//       title,
//       content,
//       tags: tags || [],
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       isFavorite: false,
//       isArchived: false,
//       isTrashed: false,
//       userId: "", // Mock user ID
//     };

//     setNotes((prevNotes) => [newNote, ...prevNotes]);
//     setSelectedNote(newNote);
//     setIsMobileEditorOpen(true); // Open editor on mobile when creating new note
//     setShowToast(true);
//   };

//   const handleUpdateNote = async (id: string, event?: FormEvent) => {
//     if (event) {
//       event.preventDefault();
//     }

//     if (!title || !content) {
//       setError("Title and content are required");
//       return;
//     }

//     setNotes((prevNotes) =>
//       prevNotes.map((note) =>
//         note.id === id
//           ? {
//               ...note,
//               title,
//               content,
//               tags,
//               updatedAt: new Date(),
//             }
//           : note
//       )
//     );
//     setShowToast(true);
//   };

//   const handleTrashNote = async (id: string) => {
//     setNotes((prevNotes) =>
//       prevNotes.map((note) =>
//         note.id === id ? { ...note, isTrashed: true } : note
//       )
//     );

//     if (selectedNote?.id === id) {
//       setSelectedNote(null);
//       setTitle("");
//       setContent("");
//       setTags([]);
//       setIsMobileEditorOpen(false); // Close mobile editor when trashing current note
//     }
//     setShowToast(true);
//   };

//   const handleRestoreNote = async (id: string) => {
//     setNotes((prevNotes) =>
//       prevNotes.map((note) =>
//         note.id === id ? { ...note, isTrashed: false } : note
//       )
//     );
//     setSelectedTrashNotes((prev) => prev.filter((noteId) => noteId !== id));
//     setShowToast(true);
//   };

//   const handleDeleteNote = async (id: string) => {
//     setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
//     setSelectedTrashNotes((prev) => prev.filter((noteId) => noteId !== id));

//     if (selectedNote?.id === id) {
//       setSelectedNote(null);
//       setTitle("");
//       setContent("");
//       setTags([]);
//       setIsMobileEditorOpen(false);
//     }
//     setShowToast(true);
//   };

//   const handleEmptyTrash = async () => {
//     if (selectedTrashNotes.length === 0) return;
//     setNotes((prevNotes) =>
//       prevNotes.filter((note) => !selectedTrashNotes.includes(note.id))
//     );
//     setSelectedTrashNotes([]);
//     setShowToast(true);
//   };

//   const handleArchiveNote = async (id: string) => {
//     const noteToArchive = notes.find((note) => note.id === id);
//     if (!noteToArchive) return;

//     setNotes((prevNotes) =>
//       prevNotes.map((note) =>
//         note.id === id ? { ...note, isArchived: !note.isArchived } : note
//       )
//     );

//     if (selectedNote?.id === id) {
//       setSelectedNote(null);
//       setTitle("");
//       setContent("");
//       setTags([]);
//       setIsMobileEditorOpen(false);
//     }
//   };

//   const handleFavoriteNote = async (id: string) => {
//     const noteToFavorite = notes.find((note) => note.id === id);
//     if (!noteToFavorite) return;

//     setNotes((prevNotes) =>
//       prevNotes.map((note) =>
//         note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
//       )
//     );
//   };

//   return (
//     <NotesContext.Provider
//       value={{
//         notes,
//         setNotes,
//         selectedNote,
//         setSelectedNote,
//         currentFilterType,
//         setCurrentFilterType,
//         title,
//         setTitle,
//         content,
//         setContent,
//         tags,
//         setTags,
//         selectedTag,
//         setSelectedTag,
//         isMobileEditorOpen,
//         setIsMobileEditorOpen,
//         isMobileSidebarOpen,
//         setIsMobileSidebarOpen,
//         handleSaveNote,
//         handleUpdateNote,
//         handleDeleteNote,
//         handleArchiveNote,
//         handleFavoriteNote,
//         handleTrashNote,
//         handleRestoreNote,
//         handleEmptyTrash,
//         selectedTrashNotes,
//         setSelectedTrashNotes,
//         setShowToast,
//         showToast,
//         setLoading,
//         loading,
//         setError,
//         error,
//         searchQuery,
//         setSearchQuery,
//         filteredNotes,
//         setFilteredNotes,
//       }}
//     >
//       {children}
//     </NotesContext.Provider>
//   );
// };

// export const useNotes = () => {
//   const context = useContext(NotesContext);
//   if (!context) {
//     throw new Error("useNotes must be used within a NotesProvider");
//   }
//   return context;
// };
