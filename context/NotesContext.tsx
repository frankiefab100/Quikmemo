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

  const { data: session, status } = useSession();

  // Fetch notes when session changes
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      fetchNotes();
    }
  }, [session, status]);

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
