import type React from "react";
import type { Metadata } from "next";
import { NotesProvider } from "@/context/NotesContext";

export const metadata: Metadata = {
  title: "Dashboard - Quikmemo | Your Notes App",
  description: "Access and manage your notes with Quikmemo's features.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotesProvider>
      <div className="h-screen overflow-hidden">{children}</div>
    </NotesProvider>
  );
}
