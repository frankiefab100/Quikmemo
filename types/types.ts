export interface IUserDropdown {
    userImage?: string | null;
    userName?: string;
    userEmail?: string;
}
export interface IFeatures {
    id: number;
    title: string;
    description: string;
    icon: any;
}

export interface IUseCases {
    title: string;
    description: string;
    photo: string;
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
    id: number;
    title: string;
    tags: string[];
    timeline: string;
}

export interface INoteList {
    // notes: Note[];
    // selectedNoteId?: string;
    // onNoteSelect: (id: string) => void;
    onCreateNote: () => void;
}

export interface INoteEditor {
    // title: string;
    // content: string;
    // tags: string[];
    // lastEdited: string;
    // onArchive: () => void;
    // onDelete: () => void;
    onSave: () => void;
    onCancel: () => void;
}

