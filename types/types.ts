// import { ReactElement } from "react";

export interface UserDropdownProps {
    userImage?: string | null;
    // userImage?: string | ReactElement;
    userName?: string;
    userEmail?: string;
}


export interface Features {
    id: number;
    title: string;
    description: string;
    icon: any;
}

export interface UseCasesProps {
    title: string;
    description: string;
    photo: string;
}

export interface Testimonials {
    avatar: string;
    name: string;
    title: string;
    quote: string
}

export interface FAQs {
    id: number;
    question: string;
    answer: string
}

export interface Footer {
    title: string;
    links: string[]
}


export interface Note {
    id: number;
    title: string;
    tags: string[];
    timeline: string;
}

export interface NoteListProps {
    // notes: Note[];
    // selectedNoteId?: string;
    // onNoteSelect: (id: string) => void;
    onCreateNote: () => void;
}

export interface NoteEditorProps {
    // title: string;
    // content: string;
    // tags: string[];
    // lastEdited: string;
    // onArchive: () => void;
    // onDelete: () => void;
    onSave: () => void;
    onCancel: () => void;
}

