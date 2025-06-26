import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";
import { type FormEvent } from "react";

export interface IUser {
    userImage?: string | null;
    userName?: string;
    userEmail?: string;
}
export interface IFeatures {
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
    avatar: string | StaticImageData;
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
    isArchived: boolean;
    isFavorite: boolean
    isTrashed: boolean
    createdAt: string | Date;
    updatedAt: string | Date;
    userId: string
}
export interface ModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    title: string;
    message?: string;
}

export interface MegaMenuProps {
    activeMenu: string | null;
    setActiveMenu: (menu: string | null) => void;
    onMouseEnter: (menu: string) => void;
    onMouseLeave: () => void;
    onNavLinkClick: (menu: string) => void;
    onMegaMenuMouseEnter: () => void;
    onMegaMenuMouseLeave: () => void;
}

export interface MegaMenuItemProps {
    title: string;
    items: {
        label: string;
        href: string;
        icon: React.ReactNode;
        description: string;
    }[];
}

export interface NavLinkProps {
    label: string;
    onClick?: () => void;
    ariaExpanded?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export interface MobileNavProps {
    setMobileMenuOpen: (isOpen: boolean) => void;
}

export interface MobileMenuProps {
    title: string;
    links: {
        label: string;
        href: string;
        icon: React.ReactNode;
    }[];
    onLinkClick: () => void;
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
    handleFavoriteNote: (id: string) => Promise<void>
    handleTrashNote: (id: string) => Promise<void>
    handleRestoreNote: (id: string) => Promise<void>
    handleEmptyTrash: () => Promise<void>
    selectedTrashNotes: string[]
    setSelectedTrashNotes: (ids: string[]) => void
    isMobileSidebarOpen: boolean
    setIsMobileSidebarOpen: (show: boolean) => void
    isMobileEditorOpen: boolean
    setIsMobileEditorOpen: (show: boolean) => void
    loading: boolean
    setLoading: (loading: boolean) => void
    error: string | null
    setError: (error: string | null) => void
    searchQuery: string
    setSearchQuery: (title: string) => void
    filteredNotes: INote[]
    setFilteredNotes: (notes: INote[]) => void
}


