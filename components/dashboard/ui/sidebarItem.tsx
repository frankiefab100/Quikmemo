// "use client";
// import type React from "react";
// import type { LucideIcon } from "lucide-react";

// interface SidebarItemProps {
//   Icon: LucideIcon;
//   name: string;
//   isActive?: boolean;
//   onClick?: () => void;
// }

// const SidebarItem: React.FC<SidebarItemProps> = ({
//   Icon,
//   name,
//   isActive = false,
//   onClick,
// }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center text-sm py-2 px-4 my-1 mx-2 rounded-md w-full text-left transition duration-300 ease-in-out
//         ${
//           isActive
//             ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
//             : "text-gray-900 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-700"
//         }`}
//     >
//       <Icon
//         className={`mr-3 w-5 h-5 ${
//           isActive ? "text-blue-600 dark:text-blue-300" : ""
//         }`}
//       />
//       <span>{name}</span>
//     </button>
//   );
// };

// export default SidebarItem;

"use client";
import type React from "react";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  Icon: LucideIcon;
  name: string;
  isActive?: boolean;
  badgeCount?: number;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  Icon,
  name,
  isActive = false,
  badgeCount,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center text-sm py-2 px-4 my-1 mx-2 rounded-md w-full text-left transition duration-300 ease-in-out
        ${
          isActive
            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
            : "text-gray-900 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-700"
        }`}
    >
      <Icon
        className={`mr-3 w-5 h-5 ${
          isActive ? "text-blue-600 dark:text-blue-300" : ""
        }`}
      />
      <span>{name}</span>
      {badgeCount !== undefined && badgeCount > 0 && (
        <span className="ml-4 bg-blue-100 text-gray-800 font-medium rounded-md px-2.5 py-1">
          {badgeCount}
        </span>
      )}
    </button>
  );
};

export default SidebarItem;
