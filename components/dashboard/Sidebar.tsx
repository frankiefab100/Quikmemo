"use client";
import Link from "next/link";
import type React from "react";

import SidebarItem from "./ui/sidebarItem";
import {
  ArchiveRestore,
  Ellipsis,
  FileText,
  Home,
  Star,
  Tag,
  Trash,
} from "lucide-react";
import { useNotes } from "@/context/NotesContext";
import { useState, useEffect } from "react";

const Sidebar: React.FC = () => {
  const { notes, setFilteredNotes } = useNotes();
  const [activeItem, setActiveItem] = useState("All Notes");

  // Set default view to "All Notes" on component mount
  useEffect(() => {
    handleItemClick("All Notes");
  }, [notes]);

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);

    switch (itemName) {
      case "All Notes":
        setFilteredNotes(notes.filter((note) => !note.isArchived));
        break;
      case "Archived Notes":
        setFilteredNotes(notes.filter((note) => note.isArchived));
        break;
      case "Favorites":
        // setFilteredNotes(notes.filter((note) => !note.isFavorite));
        break;
      case "Trash":
        setFilteredNotes(notes.filter((note) => !note.isArchived));
        break;
      default:
        if (itemName.startsWith("Recent")) {
          setFilteredNotes(notes.filter((note) => !note.isArchived));
        } else {
          setFilteredNotes(
            notes.filter(
              (note) => !note.isArchived
              // && note.tags.includes(itemName)
            )
          );
        }
        break;
    }
  };

  return (
    <aside id="sidebar" className="md:flex fixed h-full z-10 hidden">
      <div className="bg-[#fbfbfc] dark:bg-[#1e2531] flex flex-col w-full lg:max-w-[16%] md:max-w-[25%] max-w-[25vw] h-full fixed overflow-hidden whitespace-nowrap scrollbar hover:overflow-y-scroll z-10">
        <div className="pt-3">
          <SidebarItem
            Icon={Home}
            name="All Notes"
            isActive={activeItem === "All Notes"}
            onClick={() => handleItemClick("All Notes")}
          />
        </div>

        <div className="py-2">
          <h2 className="text-gray-500 dark:text-gray-400 font-semibold text-sm pl-6 my-2">
            Recents
          </h2>
          <SidebarItem
            Icon={FileText}
            name="Recent Note 1"
            isActive={activeItem === "Recent Note 1"}
            onClick={() => handleItemClick("Recent Note 1")}
          />
          <SidebarItem
            Icon={FileText}
            name="Recent Note 2"
            isActive={activeItem === "Recent Note 2"}
            onClick={() => handleItemClick("Recent Note 2")}
          />
          <SidebarItem
            Icon={FileText}
            name="Recent Note 3"
            isActive={activeItem === "Recent Note 3"}
            onClick={() => handleItemClick("Recent Note 3")}
          />
        </div>

        <div className="py-2">
          <h2 className="text-gray-500 dark:text-gray-400 font-semibold text-sm pl-6 my-2">
            Tags
          </h2>
          <SidebarItem
            Icon={Tag}
            name="Personal"
            isActive={activeItem === "Personal"}
            onClick={() => handleItemClick("Personal")}
          />
          <SidebarItem
            Icon={Tag}
            name="Travel"
            isActive={activeItem === "Travel"}
            onClick={() => handleItemClick("Travel")}
          />
          <SidebarItem
            Icon={Tag}
            name="Journal"
            isActive={activeItem === "Journal"}
            onClick={() => handleItemClick("Journal")}
          />
          <SidebarItem
            Icon={Tag}
            name="Budget"
            isActive={activeItem === "Budget"}
            onClick={() => handleItemClick("Budget")}
          />
          <SidebarItem
            Icon={Tag}
            name="Shopping"
            isActive={activeItem === "Shopping"}
            onClick={() => handleItemClick("Shopping")}
          />
          <Link
            href="#"
            className="flex items-center text-gray-500 dark:text-gray-400 text-sm py-2 px-6"
          >
            <Ellipsis className="w-5 h-5" />
            <span className="ml-2 text-sm">View More</span>
          </Link>
        </div>

        <div className="py-2">
          <h2 className="text-gray-500 dark:text-gray-400 font-semibold text-sm pl-6 my-2">
            More
          </h2>
          <SidebarItem
            Icon={Star}
            name="Favorites"
            isActive={activeItem === "Favorites"}
            onClick={() => handleItemClick("Favorites")}
          />
          <SidebarItem
            Icon={ArchiveRestore}
            name="Archived Notes"
            isActive={activeItem === "Archived Notes"}
            onClick={() => handleItemClick("Archived Notes")}
          />
          <SidebarItem
            Icon={Trash}
            name="Trash"
            isActive={activeItem === "Trash"}
            onClick={() => handleItemClick("Trash")}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
