import { Search } from "lucide-react";
import React from "react";

const Searchbar: React.FC = () => {
  return (
    <div className="relative w-full max-w-md mx-2">
      <input
        type="text"
        placeholder="Search note by title, content, or tags"
        className="w-full md:px-3 md:py-2 md:text-base text-sm text-gray-900 dark:text-white border rounded-lg border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-400"
      />
      <div>
        <Search className="w-5 h-5 absolute right-2 top-2.5 text-gray-500 dark:text-gray-400" />
      </div>
    </div>
  );
};

export default Searchbar;
