// import React from "react";
// import RegisterPage from "@/app/(auth)/register/page";
// import { getSession } from "@/lib/getSession";
// import DashboardClient from "./DashboardClient";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Welcome to Quikmemo | Your Favorite Note Editor",
//   description:
//     "Effortlessly create, edit, and organize your notes for maximum productivity.",
// };

// const Dashboard = async () => {
//   const session = await getSession();
//   const user = session?.user;

//   return (
//     <React.Fragment>
//       {user ? <DashboardClient /> : <RegisterPage />}
//     </React.Fragment>
//   );
// };

// export default Dashboard;
// "use client";

// import Layout from "@/components/Layout";

// export default function DashboardPage() {
//   return <Layout />;
// }

"use client";

import { NotesProvider, useNotes } from "@/context/NotesContext";
import Header from "@/components/dashboard/Header";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import Sidebar from "@/components/dashboard/Sidebar";
import NotesList from "@/components/dashboard/NotesList";
import NoteEditor from "@/components/dashboard/NoteEditor";
export default function Layout() {
  const {
    currentFilterType,
    isMobileEditorOpen,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
  } = useNotes();

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-gray-900">
      {/* Header - Always visible */}
      <Header onToggleSidebar={() => setIsMobileSidebarOpen(true)} />

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
}
