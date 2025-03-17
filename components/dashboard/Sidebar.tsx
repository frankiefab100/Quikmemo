import Link from "next/link";
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

const Sidebar: React.FC = () => {
  return (
    <aside id="sidebar" className="md:flex fixed h-full z-10 hidden">
      <div className="bg-[#fbfbfc] dark:bg-[#1e2531] flex flex-col w-full lg:max-w-[16%] md:max-w-[25%] max-w-[25vw] h-full fixed overflow-hidden whitespace-nowrap scrollbar hover:overflow-y-scroll z-10">
        <div className="pt-3">
          <SidebarItem Icon={Home} name="All Notes" />
        </div>

        <div className="py-2">
          <h2 className="text-gray-500 dark:text-gray-400 font-semibold text-sm pl-6 my-2">
            Recents
          </h2>
          <SidebarItem Icon={FileText} name="Recent Note 1" />
          <SidebarItem Icon={FileText} name="Recent Note 2" />
          <SidebarItem Icon={FileText} name="Recent Note 3" />
        </div>

        <div className="py-2">
          <h2 className="text-gray-500 dark:text-gray-400 font-semibold text-sm pl-6 my-2">
            Tags
          </h2>
          <SidebarItem Icon={Tag} name="Personal" />
          <SidebarItem Icon={Tag} name="Travel" />
          <SidebarItem Icon={Tag} name="Journal" />
          <SidebarItem Icon={Tag} name="Budget" />
          <SidebarItem Icon={Tag} name="Shopping" />
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
          <SidebarItem Icon={Star} name="Favorites" />
          <SidebarItem Icon={ArchiveRestore} name="Archived Notes" />
          <SidebarItem Icon={Trash} name="Trash" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
