"use client";
import type React from "react";
import type { LucideIcon } from "lucide-react";
interface SidebarItemProps {
  Icon: LucideIcon;
  name: string;
  isActive: boolean;
  onClick: () => void;
  badgeCount?: number;
  isCollapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  Icon,
  name,
  isActive,
  onClick,
  badgeCount,
  isCollapsed = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full text-left py-2 ${
        isCollapsed ? "px-0 justify-center" : "px-6"
      } ${
        isActive
          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      <Icon
        className={`w-5 h-5 flex-shrink-0 ${
          isActive ? "text-blue-600 dark:text-blue-400" : ""
        }`}
      />
      {!isCollapsed && (
        <span className={`ml-2 text-sm ${isActive ? "font-medium" : ""}`}>
          <span>{name}</span>
          {badgeCount !== undefined && badgeCount > 0 && (
            <span className="ml-4 bg-blue-100 text-gray-800 font-medium rounded-md px-2.5 py-1">
              {badgeCount}
            </span>
          )}
        </span>
      )}
    </button>
  );
};

export default SidebarItem;
