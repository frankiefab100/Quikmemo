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
import { useEffect } from "react";
import { NoteFilter } from "@/types/types";

const Sidebar: React.FC = () => {
  const { currentFilterType, setCurrentFilterType } = useNotes();

  const handleItemClick = (filter: NoteFilter) => {
    setCurrentFilterType(filter);
  };

  useEffect(() => {
    setCurrentFilterType("all");
  }, [setCurrentFilterType]);

  return (
    <aside id="sidebar" className="md:flex fixed h-full z-10 hidden">
      <div className="bg-[#fbfbfc] dark:bg-[#1e2531] flex flex-col w-full lg:max-w-[16%] md:max-w-[25%] max-w-[25vw] h-full fixed overflow-hidden whitespace-nowrap scrollbar hover:overflow-y-scroll z-10">
        <div className="pt-3">
          <SidebarItem
            Icon={Home}
            name="All Notes"
            isActive={currentFilterType === "all"}
            onClick={() => handleItemClick("all")}
          />
        </div>

        <div className="py-2">
          <h2 className="text-gray-500 dark:text-gray-400 font-semibold text-sm pl-6 my-2">
            Recents
          </h2>
          <SidebarItem
            Icon={FileText}
            name="Recent Note 1"
            isActive={false}
            onClick={() => {}}
          />
          <SidebarItem
            Icon={FileText}
            name="Recent Note 2"
            isActive={false}
            onClick={() => {}}
          />
          <SidebarItem
            Icon={FileText}
            name="Recent Note 3"
            isActive={false}
            onClick={() => {}}
          />
        </div>

        <div className="py-2">
          <h2 className="text-gray-500 dark:text-gray-400 font-semibold text-sm pl-6 my-2">
            Tags
          </h2>
          <SidebarItem
            Icon={Tag}
            name="Personal"
            isActive={false}
            onClick={() => {}}
          />
          <SidebarItem
            Icon={Tag}
            name="Travel"
            isActive={false}
            onClick={() => {}}
          />
          <SidebarItem
            Icon={Tag}
            name="Journal"
            isActive={false}
            onClick={() => {}}
          />
          <SidebarItem
            Icon={Tag}
            name="Budget"
            isActive={false}
            onClick={() => {}}
          />
          <SidebarItem
            Icon={Tag}
            name="Shopping"
            isActive={false}
            onClick={() => {}}
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
            isActive={currentFilterType === "favorites"}
            onClick={() => handleItemClick("favorites")}
          />
          <SidebarItem
            Icon={ArchiveRestore}
            name="Archived Notes"
            isActive={currentFilterType === "archived"}
            onClick={() => handleItemClick("archived")}
          />
          <SidebarItem
            Icon={Trash}
            name="Trash"
            isActive={currentFilterType === "trash"}
            onClick={() => handleItemClick("trash")}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
