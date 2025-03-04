import React from "react";
import {
  ArchiveRestore,
  FileText,
  Home,
  LucideIcon,
  Settings,
  Tags,
} from "lucide-react";
import Link from "next/link";

interface MobileNavItemProps {
  Icon: LucideIcon;
  name: string;
}

export const MobileNavItem: React.FC<MobileNavItemProps> = ({ Icon, name }) => {
  return (
    <Link
      key={name}
      href="#"
      className="my-3 mx-1 p-1 rounded-md hover:bg-gray-200 hover:dark:bg-gray-700 focus:text-gray-700 focus:dark:text-gray-100 transition duration-300 ease-in-out"
    >
      <Icon className="my-0 mx-auto w-6 h-6" />
      <h2 className="text-center text-xs">{name}</h2>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <div
      id="mobile-navigation"
      className="md:hidden fixed z-10 w-full bottom-0"
    >
      <div className="grid grid-cols-5 gap-4 align-center bg-[#fbfbfc] dark:bg-[#1e2531] text-gray-500 dark:text-gray-400 font-normal text-sm">
        <MobileNavItem Icon={Home} name="Home" />
        <MobileNavItem Icon={FileText} name="Notes" />
        <MobileNavItem Icon={Tags} name="Tags" />
        <MobileNavItem Icon={ArchiveRestore} name="Archived" />
        <MobileNavItem Icon={Settings} name="Settings" />
      </div>
    </div>
  );
};

export default MobileNav;
