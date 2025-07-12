import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Sidebar from "@/components/dashboard/Sidebar";

// Mock the useNotes hook
const mockSetCurrentFilterType = vi.fn();
const mockSetSelectedTag = vi.fn();
const mockSetSelectedNote = vi.fn();

const mockNotes = [
  {
    id: "1",
    title: "Note 1",
    content: "Content 1",
    tags: ["Personal", "Work"],
    isArchived: false,
    isFavorite: false,
    isTrashed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: "user1",
  },
  {
    id: "2",
    title: "Note 2",
    content: "Content 2",
    tags: ["Travel"],
    isArchived: false,
    isFavorite: true,
    isTrashed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: "user1",
  },
  {
    id: "3",
    title: "Archived Note",
    content: "Archived content",
    tags: [],
    isArchived: true,
    isFavorite: false,
    isTrashed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: "user1",
  },
];

vi.mock("@/context/NotesContext", () => ({
  useNotes: () => ({
    notes: mockNotes,
    currentFilterType: "all",
    setCurrentFilterType: mockSetCurrentFilterType,
    setSelectedNote: mockSetSelectedNote,
    selectedTag: null,
    setSelectedTag: mockSetSelectedTag,
  }),
}));

describe("Sidebar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all sidebar items", () => {
    render(<Sidebar />);

    expect(
      screen.getByRole("button", { name: "All Notes 2" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Favorites 1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Archived 1" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Trash 0" })).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: "Recents" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Tags" })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Note 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Note 2" })).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "# Personal" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "# Travel" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "# Work" })).toBeInTheDocument();
  });

  it("should set All Notes as active by default", () => {
    render(<Sidebar />);

    const allNotesButton = screen.getByRole("button", { name: "All Notes 2" });
    expect(allNotesButton).toHaveClass("bg-blue-100");
  });

  it("should change active sidebarItem when clicked", () => {
    render(<Sidebar />);

    const archivedButton = screen.getByRole("button", { name: "Archived 1" });
    fireEvent.click(archivedButton);

    expect(mockSetCurrentFilterType).toHaveBeenCalledWith("archived");
    expect(mockSetSelectedTag).toHaveBeenCalledWith(null);
  });

  it("should display all notes when All Notes is clicked", () => {
    render(<Sidebar />);

    const allNotesButton = screen.getByRole("button", { name: "All Notes 2" });
    fireEvent.click(allNotesButton);

    expect(mockSetCurrentFilterType).toHaveBeenCalledWith("all");
    expect(mockSetSelectedTag).toHaveBeenCalledWith(null);
  });

  it("should handle recent note click", () => {
    render(<Sidebar />);

    const recentNoteButton = screen.getByRole("button", { name: "Note 1" });
    fireEvent.click(recentNoteButton);

    expect(mockSetSelectedNote).toHaveBeenCalledWith(mockNotes[0]);
    expect(mockSetCurrentFilterType).toHaveBeenCalledWith("all");
  });

  it("should handle tag selection", () => {
    render(<Sidebar />);

    const personalTagButton = screen.getByRole("button", {
      name: "# Personal",
    });
    fireEvent.click(personalTagButton);

    expect(mockSetSelectedTag).toHaveBeenCalledWith("Personal");
    expect(mockSetCurrentFilterType).toHaveBeenCalledWith("all");
  });

  it("should show collapse/expand button", () => {
    render(<Sidebar />);

    const collapseButton = screen.getByRole("button", {
      name: "Collapse sidebar",
    });
    expect(collapseButton).toBeInTheDocument();
  });

  it("should display correct note counts", () => {
    render(<Sidebar />);

    expect(
      screen.getByRole("button", { name: "All Notes 2" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Favorites 1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Archived 1" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Trash 0" })).toBeInTheDocument();
  });
});
