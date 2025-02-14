import { IFeatures } from "@/types/types";
import { NotebookPen, AudioLines, Heading6, BrainCircuit } from "lucide-react";

export const FEATURES: IFeatures[] = [
    {
        id: 1,
        title: "Intuitive Organization",
        description:
            "Easily categorize your notes by topics, projects, or subjects. Find what you need in seconds with our powerful search functionality.",
        icon: NotebookPen,
    },
    {
        id: 2,
        title: "Voice-Activated Notes",
        description:
            "Use a speech recognition engine to quickly create notes, allowing you to capture ideas on the go without missing a beat.",
        icon: AudioLines,
    },
    {
        id: 3,
        title: "Rich Text Support",
        description:
            "Write using the flexible Markdown, retaining all your formatting and links—making it easy to move your content across different platforms.",
        icon: Heading6,
    },
    {
        id: 4,
        title: "AI-Powered Insights",
        description:
            "Get suggestions and enhancements for your notes with our AI assistant. From summarizing content to suggesting related topics.",
        icon: BrainCircuit,
    },
];