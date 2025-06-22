"use client";
import { useNotes } from "@/context/NotesContext";
import Header from "@/components/dashboard/Header";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import Sidebar from "@/components/dashboard/Sidebar";
import NotesList from "@/components/dashboard/NotesList";
import NoteEditor from "@/components/dashboard/NoteEditor";

export function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold text-red-600 mb-2">Dashboard Error</h2>
      <pre className="text-sm text-gray-600 bg-gray-100 p-2 rounded">
        {error.message}
      </pre>
    </div>
  );
}

export default function DashboardClient({ session }: { session: any }) {
  const {
    currentFilterType,
    isMobileEditorOpen,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
  } = useNotes();

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-gray-900">
      {/* Header - Always visible */}
      <Header
        onToggleSidebar={() => setIsMobileSidebarOpen(true)}
        session={session}
      />

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar - Always visible on desktop */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Notes List - Hidden on mobile when editor is open */}
        <div
          className={`w-full md:w-80 border-r border-gray-200 dark:border-gray-700 ${
            isMobileEditorOpen ? "hidden md:block" : ""
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <h2 className="font-semibold text-gray-900 dark:text-white capitalize">
                {currentFilterType === "all" ? "All Notes" : currentFilterType}
              </h2>
            </div>
            <div className="flex-1 overflow-hidden">
              <NotesList />
            </div>
          </div>
        </div>

        {/* Note Editor - Always visible on desktop, conditional on mobile */}
        <div
          className={`flex-1 ${!isMobileEditorOpen ? "hidden md:block" : ""}`}
        >
          <NoteEditor />
        </div>
      </div>
    </div>
  );

  // return (
  //   <div style={{ padding: "50px", textAlign: "center", color: "black" }}>
  //     <h1>Dashboard Test</h1>
  //     <p>I want to confirm if this shows, then redirect loop is fixed.</p>
  //   </div>
  // );
}
