import Link from "next/link";
import { Archive, ChevronRight, Home, Tag } from "lucide-react";
import { TAGS } from "@/constants/tags";

const Sidebar = () => {
  return (
    <aside
      id="logo-sidebar"
      className=" w-1/5 pt-24 fixed top-0 left-0 z-40 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <Link
            href="#"
            className="flex justify-between items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex justify-center">
              <Home className="h-5 w-5" />
              <span className="ms-3">All Notes</span>
            </div>

            <ChevronRight className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Archive className="h-5 w-5" />
            <span className="ms-3">Archived Notes</span>
          </Link>
          <h3 className="flex items-center p-2 text-gray-900 dark:text-white">
            Tags
          </h3>

          {TAGS.map((tag, index) => {
            return (
              <Link
                href="#"
                key={index}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white"
              >
                <Tag className="h-5 w-5" />
                <span className="ms-3">{tag}</span>
              </Link>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
