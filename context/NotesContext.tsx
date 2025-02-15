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
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<INote[]>(NOTES);
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //   const [tags, setTags] = useState([]);
  //   const [editDate, setEditDate] = useState(null);

  const handleSaveNote = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    console.log("title: ", title);
    console.log("content: ", content);

    const newNote: INote = {
      id: notes.length + 1,
      title: title,
      content: content,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const handleUpdateNote = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    console.log("update note");
    if (!selectedNote) {
      return;
    }

    const updatedNote: INote = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );

    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
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
        handleSaveNote,
        handleUpdateNote,
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
