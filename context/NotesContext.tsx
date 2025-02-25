"use client";
import type { INote } from "@/types/types";
import {
  createContext,
  type FormEvent,
  useContext,
  useState,
  useEffect,
} from "react";
import { NOTES } from "@/app/data/data";

export interface NoteContextProps {
  notes: INote[];
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
  selectedNote: INote | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<INote | null>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  handleSaveNote: (event?: FormEvent) => Promise<void>;
  handleUpdateNote: (id: string, event?: FormEvent) => Promise<void>;
  handleDeleteNote: (id: string) => Promise<void>;
  handleArchiveNote: (id: string) => Promise<void>;
  archivedNotes: INote[];
}

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

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/notes", {
        next: { revalidate: 3600 },
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
      console.error(`Error fetching notes: ${error}`);
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

      if (!response.ok) {
        throw new Error(`Failed to save note: ${response.statusText}`);
      }

      const savedNote = await response.json();

      setNotes([savedNote, ...notes]);
      setTitle("");
      setContent("");
      setTags([]);
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the note.");
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
      console.error(error);
      alert("An error occurred while updating the note.");
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
      console.error(error);
      alert("An error occurred while deleting the note.");
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
      console.error(error);
      alert("An error occurred while archiving the note.");
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
