import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  Icon: LucideIcon;
  name: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ Icon, name }) => {
  return (
    <Link
      key={name}
      href="#"
      className="flex items-center text-sm py-2 px-4 my-1 mx-2 rounded-md text-gray-900 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-700 focus:text-gray-700 focus:dark:text-gray-100 transition duration-300 ease-in-out"
    >
      <Icon className="mr-3 w-5 h-5" />
      <span>{name}</span>
    </Link>
  );
};

export default SidebarItem;
