import { IFeatures, IUseCases, ITestimonials, IFooter, IFAQs } from "@/types/types";
import { Sparkles, Code, Image as ImageIcon, ListChecks, PenLine, Share2, Lock, Cloud, Users, Image } from "lucide-react";
import image1 from '../assets/images/hero-image-light.png';
import User3 from "../assets/images/user1.jpg"

export const CONTENT_FEATURES: IFeatures[] = [
    {
        icon: Sparkles,
        title: "Smart Editor",
        description:
            "Edit, format, and organize your notes with markdown, rich text, and AI-powered suggestions.",
    },
    {
        icon: Code,
        title: "Code & Snippet Support",
        description:
            "Perfect for developers—embed code blocks, highlight syntax, and keep your technical notes organized.",
    },
    {
        icon: ImageIcon,
        title: "Media Embeds",
        description:
            "Add images, files, and links to your notes. Visualize your ideas, not just write them.",
    },
    {
        icon: ListChecks,
        title: "Task Management",
        description:
            "Turn notes into actionable tasks. Set reminders, checklists, and never miss a deadline.",
    },
];

export const FEATURES: IFeatures[] = [
    {
        icon: PenLine,
        title: "Effortless Note-Taking",
        description:
            "Quickly jot down your thoughts in a clean, distraction-free space designed to keep your creativity flowing.",
    },
    {
        icon: Cloud,
        title: "Sync Across Devices",
        description:
            "Seamlessly access and edit your notes on any device, with automatic syncing that keeps you up to date everywhere.",
    },
    {
        icon: Share2,
        title: "Easy Sharing & Collaboration",
        description:
            "Share notes in one click and collaborate in real-time to keep everyone on the same page.",
    },
    {
        icon: Lock,
        title: "Secure & Private",
        description:
            "Your notes are encrypted and private by default. Only you control who sees your content.",
    },
    {
        icon: Users,
        title: "Tailored for Everyone",
        description:
            "Adapts to fit your unique workflow, whatever your profession",
    },
    {
        icon: Image,
        title: "Rich Media Support",
        description:
            "Embed images, audio, videos, and files directly into your notes for richer content.",
    },
];


export const USECASES: IUseCases[] = [
    {
        title: "Brainstorming Sessions",
        description:
            "Capture thoughts quickly and organize them into actionable steps later.",
        photo: image1,
    },
    {
        title: "Academic Research",
        description:
            "Keep track of your research notes, citations, and references in one place.",
        photo: image1,
    },
    {
        title: "Project Management",
        description:
            "Stay organized by creating to-do lists, project outlines, and timelines.",
        photo: image1,
    },
    {
        title: "Personal Journal",
        description:
            "Reflect on your daily experiences and thoughts.",
        photo: image1,
    },
    {
        title: "Language Learning",
        description:
            "Take notes on vocabulary, grammar rules, and practice exercises.",
        photo: image1,
    },
    {
        title: "Travel Planning",
        description:
            "Plan your next adventure by saving itineraries, packing lists, and travel tips.",
        photo: image1,
    },
];


export const TESTIMONIALS: ITestimonials[] = [
    {
        avatar: "https://mighty.tools/mockmind-api/content/human/102.jpg",
        name: "James",
        title: "Content Creator",
        quote:
            "Quikmemo has become my second brain for managing my YouTube content calendar. The quick capture feature is a game-changer.",
    },
    {
        avatar: "https://mighty.tools/mockmind-api/content/human/128.jpg",
        name: "Vivian",
        title: "Graduate Student",
        quote:
            "Perfect for keeping track of lecture notes and research. The organization system is intuitive yet powerful.",
    },
    {
        avatar: User3,
        name: "Chris",
        title: "Startup Founder",
        quote:
            "As an indie hacker, I use Quikmemo to document everything from product ideas to customer feedback. It's invaluable.",
    },
    // {
    //     avatar: "https://randomuser.me/api/portraits/men/66.jpg",
    //     name: "Eric",
    //     title: "Entrepreneur",
    //     quote:
    //         "The AI editing feature saves me so much time. I can't imagine note-taking without it now.",
    // },
];


export const FAQS: IFAQs[] = [
    {
        id: 1,
        question: "How is Quikmemo different from other note-taking apps?",
        answer:
            "Quikmemo combines simplicity with powerful features like markdown support, rich text formatting, and AI-powered suggestions. Unlike many apps, it focuses on seamless syncing across devices and a distraction-free interface designed to boost your productivity.",
    },
    {
        id: 2,
        question: "Is Quikmemo free to use?",
        answer:
            "Yes, Quikmemo offers a free tier with access to most core features. For users who want advanced functionalities like enhanced collaboration, increased storage, or priority support, premium subscription plans are available.",
    },
    {
        id: 3,
        question: "What platforms does Quikmemo support?",
        answer:
            "Quikmemo is accessible via the web and as a progressive web app (PWA), allowing you to use it on desktops, tablets, and mobile devices. We are actively working on native apps to further enhance your experience.",
    },
    {
        id: 4,
        question: "Is my data secure with Quikmemo?",
        answer:
            "Absolutely. Quikmemo uses end-to-end encryption to keep your notes private and secure. We never sell your data to third parties and follow strict privacy policies to protect your information.",
    },
    {
        id: 5,
        question: "Can I organize my notes with tags, folders, or links?",
        answer:
            "Yes! Quikmemo supports organizing your notes using tags and folders for easy navigation. Additionally, you can create internal links between notes, similar to apps like Obsidian, helping you build a personal knowledge base.",
    },
    {
        id: 6,
        question: "How can I provide feedback or get support?",
        answer:
            "We value your input! You can reach out to our support team anytime through the chat widget or email. We’re here to help and continuously improve Quikmemo based on your feedback.",
    },
];


export const FOOTER_LINKS: IFooter[] =
    [
        {
            title: "Company",
            links: ["About", "Features", "Blog"],
        },
        {
            title: "Help Center",
            links: [
                "Customer Support",
                "Terms & Conditions",
                "Privacy Policy",
            ],
        },
        {
            title: "Resources",
            links: ["Pricing", "Documentation", "Community"],
        },
        {
            title: "Extra Links",
            links: ["Roadmap", "Changelog", "Press Kit"],
        }
    ]