import { Mic } from "lucide-react";

const Demo: React.FC = () => {
  return (
    <div className="mt-12 bg-gray-50 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Try It Now</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Note Title"
            className="w-full mt-1 px-1.5 py-1 sm:px-3 sm:py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-300 shadow-sm rounded-md"
          />
          <textarea
            rows={6}
            placeholder="Start writing your note..."
            className="w-full mt-1 px-1.5 py-1 sm:px-3 sm:py-2 text-gray-500 bg-transparent outline-none border focus:border-blue-300 shadow-sm rounded-md"
          />
          <div className="flex justify-end space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Mic className="w-4 h-4 mr-2" />
              Voice Input
            </button>
            {/* Save note should redirect to sign up page */}
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
