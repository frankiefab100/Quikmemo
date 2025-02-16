"use client";
import { NOTES } from "@/app/data/data";
import { INote } from "@/types/types";
import React, { createContext, FormEvent, useContext, useState } from "react";

interface NotesContextType {
  notes: INote[];
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
  selectedNote: INote | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<INote | null>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  handleSaveNote: (event?: FormEvent) => void;
  handleUpdateNote: (event?: FormEvent) => void;
  handleDeleteNote: (noteId: number) => void;
  handleArchiveNote: (noteId: number) => void;
  archivedNotes: INote[];
  // tags: [];
  // setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<INote[]>(
    NOTES.map((note) => ({ ...note, isArchived: false }))
  );
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [tags, setTags] = useState<[]>([]);

  const handleSaveNote = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    const newNote: INote = {
      id: notes.length + 1,
      title: title,
      content: content,
      isArchived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const handleUpdateNote = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    if (!selectedNote) {
      return;
    }

    const updatedNote: INote = {
      ...selectedNote,
      title: title,
      content: content,
      updatedAt: new Date(),
    };

    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );

    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleDeleteNote = (noteId: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
      setTitle("");
      setContent("");
    }
  };

  const handleArchiveNote = (noteId: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? { ...note, isArchived: !note.isArchived, updatedAt: new Date() }
          : note
      )
    );
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
      setTitle("");
      setContent("");
    }
  };

  const archivedNotes = notes.filter((note) => note.isArchived);
  const activeNotes = notes.filter((note) => !note.isArchived);

  return (
    <NotesContext.Provider
      value={{
        notes: activeNotes,
        setNotes,
        selectedNote,
        setSelectedNote,
        title,
        setTitle,
        content,
        setContent,
        handleSaveNote,
        handleUpdateNote,
        handleDeleteNote,
        handleArchiveNote,
        archivedNotes,
        // tags,
        // setTags,
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
