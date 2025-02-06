import { Archive, Trash2 } from "lucide-react";

const DeleteArchive = () => {
  return (
    <div className="dark:bg-gray-800  bg-white pt-20 border-l p-6">
      <button
        className="dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-400  flex mb-2 w-full bg-transparent px-5 py-2.5 text-sm font-medium rounded-lg text-left text-gray-700 border border-gray-700 hover:text-red hover:border-gray-900"
        // onClick={onArchive}
      >
        <span className="pr-2">
          <Archive className="w-5 h-5" />
        </span>
        Archive Note
      </button>
      <button
        className="dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-400 flex w-full bg-transparent px-5 py-2.5 text-sm font-medium rounded-lg text-left text-gray-700 border border-gray-700 hover:text-red hover:border-gray-900"
        // onClick={onDelete}
      >
        <span className="pr-2">
          <Trash2 className="w-5 h-5" />
        </span>
        Delete Note
      </button>
    </div>
  );
};

export default DeleteArchive;
