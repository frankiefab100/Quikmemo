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
import { useToast } from "./ToastContext";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentFilterType, setCurrentFilterType] = useState<NoteFilter>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedTrashNotes, setSelectedTrashNotes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<INote[]>([]);

  const { showToast } = useToast();
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
      showToast({
        type: "error",
        message: "Title and content are required",
        title: "Validation Error",
      });
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
      showToast({
        type: "success",
        action: "create",
        message: `"${title}" created successfully`,
      });
    } catch (error) {
      // console.error("Error saving note:", error);
      showToast({
        type: "error",
        message: "Failed to create note",
        title: "Error",
      });
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
      showToast({
        type: "error",
        message: "Title and content are required",
        title: "Validation Error",
      });
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
      showToast({
        type: "success",
        action: "update",
        message: `"${title}" updated successfully`,
      });
    } catch (error) {
      // console.error("Error updating note:", error);
      showToast({
        type: "error",
        message: "Failed to update note",
        title: "Error",
      });
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
    const noteToTrash = notes.find((note) => note.id === id);
    if (!noteToTrash) return;

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
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, isTrashed: true } : note
        )
      );

      if (selectedNote?.id === id) {
        setSelectedNote(null);
        setTitle("");
        setContent("");
        setTags([]);
        setIsMobileEditorOpen(false); // Close mobile editor when trashing current note
      }

      showToast({
        type: "warning",
        action: "delete",
        message: `"${noteToTrash.title}" moved to trash`,
      });
    } catch (error) {
      // console.error("Error trashing note:", error);
      showToast({
        type: "error",
        message: "Failed to move note to trash",
        title: "Error",
      });
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
    const noteToRestore = notes.find((note) => note.id === id);
    if (!noteToRestore) return;

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
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, isTrashed: false } : note
        )
      );
      setSelectedTrashNotes((prev) => prev.filter((noteId) => noteId !== id));

      showToast({
        type: "success",
        action: "restore",
        message: `"${noteToRestore.title}" restored successfully`,
      });
    } catch (error) {
      // console.error("Error restoring note:", error);
      showToast({
        type: "error",
        message: "Failed to restore note",
        title: "Error",
      });
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
    const noteToDelete = notes.find((note) => note.id === id);
    if (!noteToDelete) return;

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

      showToast({
        type: "error",
        action: "permanentDelete",
        message: `"${noteToDelete.title}" permanently deleted`,
      });
    } catch (error) {
      // console.error("Error deleting note:", error);
      showToast({
        type: "error",
        message: "Failed to delete note",
        title: "Error",
      });
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

    const trashedNotes = notes.filter((note) => note.isTrashed);

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

      showToast({
        type: "error",
        action: "emptyTrash",
        message: `${trashedNotes.length} notes permanently deleted`,
      });
    } catch (error) {
      // console.error("Error emptying trash:", error);
      showToast({
        type: "error",
        message: "Failed to empty trash",
        title: "Error",
      });
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

      const newArchivedState = !noteToArchive.isArchived;

      const response = await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isArchived: newArchivedState,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Failed to archive note: ${response.statusText}`
        );
      }

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, isArchived: !note.isArchived } : note
        )
      );
      if (selectedNote?.id === id) {
        setSelectedNote(null);
        setTitle("");
        setContent("");
        setTags([]);
        setIsMobileEditorOpen(false);
      }

      showToast({
        type: "success",
        action: newArchivedState ? "archive" : "unarchive",
        message: `"${noteToArchive.title}" has been ${
          newArchivedState ? "archived" : "unarchived"
        } successfully.`,
        title: "Success",
      });
    } catch (error) {
      // console.error("Error archiving note:", error);
      showToast({
        type: "error",
        message: "Failed to update archive status",
        title: "Error",
      });
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

      showToast({
        type: "success",
        action: !noteToFavorite.isFavorite ? "favorite" : "unfavorite",
        message: !noteToFavorite.isFavorite
          ? `"${noteToFavorite.title}" added to favorites`
          : `"${noteToFavorite.title}" removed from favorites`,
      });
    } catch (error) {
      // console.error("Error bookmarking note as favorite:", error);
      showToast({
        type: "error",
        message: "Failed to update favorite status",
        title: "Error",
      });
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
