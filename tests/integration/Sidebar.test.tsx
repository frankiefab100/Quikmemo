import DashboardClient from "@/app/dashboard/DashboardClient";
import { NotesProvider } from "@/context/NotesContext";
import { render, screen, fireEvent } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { beforeEach, describe, it, expect, vi } from "vitest";

vi.mock("@/context/NotesContext", () => ({
  // ...vi.requireActual("@/context/NotesContext"),
  useNotes: () => ({
    notes: [
      {
        id: "1",
        title: "Quick Tips",
        content: "How to use this note app",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        title: "Welcome to Quikmemo!",
        content: "Edit or delete the default content",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    loading: false,
    error: null,
    setSelectedNote: vi.fn(),
    setTitle: vi.fn(),
    setContent: vi.fn(),
    setTags: vi.fn(),
    setNotes: vi.fn(),
  }),
}));

describe("Sidebar Component", () => {
  beforeEach(() => {
    render(
      <SessionProvider>
        <NotesProvider>
          <DashboardClient />
        </NotesProvider>
      </SessionProvider>
    );
  });

  it("should render the sidebar", () => {
    expect(screen.getByText("All Notes")).toBeInTheDocument();
  });

  it("All Notes should display notes in NoteList", () => {
    const allNotes = screen.getByText("All Notes");
    fireEvent.click(allNotes);

    const noteTitle = screen.getByRole("heading", {
      level: 2,
      name: /Quick Tips/i,
    });
    expect(noteTitle).toBeInTheDocument();

    const anotherNoteTitle = screen.getByRole("heading", {
      level: 2,
      name: /Welcome to Quikmemo!/i,
    });
    expect(anotherNoteTitle).toBeInTheDocument();
  });
});
