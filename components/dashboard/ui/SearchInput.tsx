"use client";
import { useNotes } from "@/context/NotesContext";
import { Search } from "lucide-react";

const SearchInput: React.FC = () => {
  const { searchQuery, setSearchQuery } = useNotes();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex-1 max-w-md mx-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search note by title, content, or tags..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
    </form>
  );
};

export default SearchInput;
