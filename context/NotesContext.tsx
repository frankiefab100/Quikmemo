"use client";
import type { INote } from "@/types/types";
import type { NoteContextProps } from "@/types/types";
import {
  createContext,
  type FormEvent,
  useContext,
  useState,
  useEffect,
} from "react";
import { NOTES } from "@/app/data/data";

export const NotesContext = createContext<NoteContextProps | undefined>(
  undefined
);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<INote[]>(
    NOTES.map((note) => ({
      ...note,
      isArchived: false,
      createdAt: new Date(note.lastEdited),
      updatedAt: new Date(note.lastEdited),
      id: note.id.toString(),
    }))
  );
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/notes", {
        next: { revalidate: 10 },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.status}`);
      }
      const fetchedNotes = await response.json();

      // // Merge fetched notes with default old notes (if any)
      // const mergedNotes = [
      //   ...fetchedNotes,
      //   ...notes.filter(
      //     (note) => !fetchedNotes.some((notes: any) => notes.id === note.id)
      //   ),
      // ];
      // setNotes(mergedNotes);

      setNotes(fetchedNotes);
    } catch (error) {
      if (error instanceof Error) setError("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, tags }),
      });

      const savedNote = await response.json();

      if (response.ok) {
        setNotes([savedNote, ...notes]);
        setTitle("");
        setContent("");
        setTags([]);

        setShowToast(true);
      } else {
        throw new Error(`Failed to save note: ${response.statusText}`);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while saving the note."
      );
    }
  };

  const handleUpdateNote = async (id: string, event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, tags }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update note: ${response.statusText}`);
      }

      const updatedNote = await response.json();

      setNotes(
        notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
      setSelectedNote(null);
      setTitle("");
      setContent("");
      setTags([]);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while updating the note."
      );
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete note: ${response.statusText}`);
      }

      setNotes(notes.filter((note) => note.id !== id));
      if (selectedNote?.id === id) {
        setSelectedNote(null);
        setTitle("");
        setContent("");
        setTags([]);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while deleting the note."
      );
    }
  };

  const handleArchiveNote = async (id: string) => {
    try {
      const noteToArchive = notes.find((note) => note.id === id);
      if (!noteToArchive) return;

      const response = await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...noteToArchive,
          isArchived: !noteToArchive.isArchived,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to archive note: ${response.statusText}`);
      }

      const updatedNote = await response.json();

      setNotes(
        notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
      if (selectedNote?.id === id) {
        setSelectedNote(null);
        setTitle("");
        setContent("");
        setTags([]);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while archiving the note."
      );
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        selectedNote,
        setSelectedNote,
        title,
        setTitle,
        content,
        setContent,
        tags,
        setTags,
        handleSaveNote,
        handleUpdateNote,
        handleDeleteNote,
        handleArchiveNote,
        archivedNotes: notes.filter((note) => note.isArchived),
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
