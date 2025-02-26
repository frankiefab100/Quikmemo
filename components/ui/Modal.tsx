import { Trash2, X } from "lucide-react";

const Modal: React.FC = () => {
  return (
    <div
      id="confirmationModal"
      aria-hidden="true"
      className="flex items-center justify-center fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <button
          type="button"
          className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <X />
          <span className="sr-only">Close modal</span>
        </button>
        <Trash2 className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
        <p className="mb-4 text-gray-500 dark:text-gray-300">
          Are you sure you want to delete this note?
        </p>
        <div className="flex justify-center items-center space-x-4">
          <button
            type="button"
            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            No, cancel
          </button>
          <button
            type="submit"
            className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Yes, I&apos;m sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
