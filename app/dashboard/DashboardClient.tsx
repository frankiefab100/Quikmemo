"use client";
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import NoteEditor from "@/components/dashboard/NoteEditor";
import NoteList from "@/components/dashboard/NoteList";
import { NotesProvider } from "@/context/NotesContext";
import Navbar from "@/components/dashboard/Navbar";

const DashboardClient = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen pt-16">
      <Navbar
        showMobileSidebar={showMobileSidebar}
        setShowMobileSidebar={setShowMobileSidebar}
      />
      <NotesProvider>
        <Sidebar
          showMobileSidebar={showMobileSidebar}
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
        <div
          className={`flex flex-1 overflow-hidden transition-all duration-300 ${
            isSidebarCollapsed ? "md:ml-16" : "md:ml-64"
          }`}
        >
          <NoteList />
          <NoteEditor />
        </div>
      </NotesProvider>
    </div>
  );
};

export default DashboardClient;
