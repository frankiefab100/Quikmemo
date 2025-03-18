import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";
import {
    type FormEvent
} from "react";

export interface IUser {
    userImage?: string | null;
    userName?: string;
    userEmail?: string;
}
export interface IFeatures {
    id: number;
    title: string;
    description: string;
    icon: LucideIcon;
}

export interface IUseCases {
    title: string;
    description: string;
    photo: StaticImageData;
}

export interface ITestimonials {
    avatar: string;
    name: string;
    title: string;
    quote: string
}

export interface IFAQs {
    id: number;
    question: string;
    answer: string
}

export interface IFooter {
    title: string;
    links: string[]
}

export interface INote {
    id: string;
    title: string;
    content: string;
    tags?: string[];
    lastEdited: string | Date;
    isArchived: boolean;
    isFavorite?: boolean
    isDeleted?: boolean
    createdAt: string | Date;
    updatedAt: string | Date;
    userId: string
}
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export type NoteFilter = "all" | "tag" | "archived" | "favorites" | "trash";

export interface NoteContextProps {
    notes: INote[]
    setNotes: (notes: INote[]) => void
    selectedNote: INote | null
    setSelectedNote: (note: INote | null) => void
    title: string
    setTitle: (title: string) => void
    content: string
    setContent: (content: string) => void
    tags: string[]
    setTags: (tags: string[]) => void
    selectedTag: string | null
    setSelectedTag: (tag: string | null) => void
    currentFilterType: NoteFilter
    setCurrentFilterType: (filter: NoteFilter) => void
    handleSaveNote: (event?: FormEvent) => Promise<void>
    handleUpdateNote: (id: string, event?: FormEvent) => Promise<void>
    handleDeleteNote: (id: string) => Promise<void>
    handleArchiveNote: (id: string) => Promise<void>
    showToast: boolean
    setShowToast: (show: boolean) => void
    loading: boolean
    setLoading: (loading: boolean) => void
    error: string | null
    setError: (error: string | null) => void
}


