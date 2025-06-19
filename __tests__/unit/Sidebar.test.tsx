import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Sidebar from "@/components/dashboard/Sidebar";

// Mock the useNotes hook
const mockSetFilteredNotes = vi.fn();
const mockNotes = [
  {
    id: "1",
    title: "Note 1",
    content: "Content 1",
    tags: ["Personal", "Work"],
    lastEdited: new Date().toISOString(),
    isArchived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Note 2",
    content: "Content 2",
    tags: ["Travel"],
    lastEdited: new Date().toISOString(),
    isArchived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Archived Note",
    content: "Archived content",
    tags: [],
    lastEdited: new Date().toISOString(),
    isArchived: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

vi.mock("@/context/NotesContext", () => ({
  useNotes: () => ({
    notes: mockNotes,
    setFilteredNotes: mockSetFilteredNotes,
  }),
}));

describe("Sidebar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all sidebar items", () => {
    render(<Sidebar />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Recents" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Tags" })
    ).toBeInTheDocument();
    expect(screen.getByText(/View More/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "More" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Recent Note 1/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Favorites" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Archived Notes" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Trash" })).toBeInTheDocument();
  });

  it("should set All Notes as active sidebarItem by default", () => {
    render(<Sidebar />);

    const allNotesButton = screen.getByRole("button", {
      name: "All Notes",
    });
    expect(allNotesButton).toHaveClass("bg-blue-100");

    // setFilteredNotes should be called once on mount with non-archived notes
    expect(mockSetFilteredNotes).toHaveBeenCalledTimes(1);
    expect(mockSetFilteredNotes).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: "1", isArchived: false }),
        expect.objectContaining({ id: "2", isArchived: false }),
      ])
    );
  });

  it("should change active sidebarItem when clicked", () => {
    render(<Sidebar />);

    mockSetFilteredNotes.mockClear();
    const archivedNotesButton = screen.getByRole("button", {
      name: "Archived Notes",
    });
    fireEvent.click(archivedNotesButton);
    expect(archivedNotesButton).toHaveClass("bg-blue-100");

    const allNotesButton = screen.getByRole("button", {
      name: "All Notes",
    });
    expect(allNotesButton).not.toHaveClass("bg-blue-100");

    expect(mockSetFilteredNotes).toHaveBeenCalledTimes(1);
    expect(mockSetFilteredNotes).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: "3", isArchived: true }),
      ])
    );
  });

  it("should display all notes when All Notes is clicked", () => {
    render(<Sidebar />);

    const archivedNotesButton = screen.getByRole("button", {
      name: "Archived Notes",
    });
    fireEvent.click(archivedNotesButton);
    mockSetFilteredNotes.mockClear();

    const allNotesButton = screen.getByRole("button", {
      name: "All Notes",
    });
    fireEvent.click(allNotesButton);

    expect(mockSetFilteredNotes).toHaveBeenCalledTimes(1);
    expect(mockSetFilteredNotes).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: "1", isArchived: false }),
        expect.objectContaining({ id: "2", isArchived: false }),
      ])
    );
  });
});
