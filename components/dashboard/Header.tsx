"use client";

import { useState } from "react";
import { useNotes } from "@/context/NotesContext";
import UserDropdown from "./UserDropdown";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
  session: any;
}

export default function Header({ onToggleSidebar, session }: HeaderProps) {
  const { searchQuery, setSearchQuery } = useNotes();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="hidden md:flex justify-center items-center text-gray-800 dark:text-gray-200 ">
          <Link href="/" className="flex items-center">
            <Image
              src="/icons/quikmemo-mark-logo.svg"
              className="w-8 h-8 md:ml-0 ml-2"
              alt="Quikmemo logo"
              width={150}
              height={150}
            />
          </Link>
          <span className="md:flex hidden ml-2 md:text-lg text-md font-bold whitespace-nowrap text-gray-900 dark:text-white">
            Quikmemo
          </span>
        </div>
      </div>

      <div className="flex items-center md:justify-end gap-4">
        {/* Mobile Search */}
        <div className={`md:hidden ${isSearchExpanded ? "flex-1" : ""}`}>
          {isSearchExpanded ? (
            <div className="relative flex w-full items-center">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-2 pr-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                autoFocus
              />
              <button
                onClick={() => setIsSearchExpanded(false)}
                className="absolute right-2 rounded p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSearchExpanded(true)}
              className="rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Search className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Desktop Search */}
        <div className="relative hidden md:block md:flex-1 md:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* User Profile */}

        {session?.user && (
          <UserDropdown
            userImage={session.user.image ?? null}
            userName={session.user.name ?? ""}
            userEmail={session.user.email ?? ""}
          />
        )}
      </div>
    </header>
  );
}
