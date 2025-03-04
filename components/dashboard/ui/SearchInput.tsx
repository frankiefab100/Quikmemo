import { Search } from "lucide-react";
import React from "react";

const Searchbar: React.FC = () => {
  return (
    <div className="relative w-full max-w-md mx-2">
      <input
        type="text"
        placeholder="Search note by title, content, or tags"
        className="md:flex hidden w-full md:px-3 md:py-2 px-2 py-1 md:text-base text-sm text-gray-900 dark:text-white border rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-400"
      />
      <Search className="absolute md:right-2 md:top-2.5 w-5 h-5 -right-2 -top-2.5 text-gray-500 dark:text-gray-400" />
    </div>
  );
};

export default Searchbar;
