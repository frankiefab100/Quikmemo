import type React from "react";
import type { Metadata } from "next";
import { NotesProvider } from "@/context/NotesContext";
import { ToastProvider } from "@/context/ToastContext";

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
    <ToastProvider>
      <NotesProvider>
        <div className="h-screen overflow-hidden">{children}</div>
      </NotesProvider>
    </ToastProvider>
  );
}
