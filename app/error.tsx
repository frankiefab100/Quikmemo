"use client";
import { RefreshCcw, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  const handleTryAgain = async () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className=" mb-6">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Something went wrong!
        </h2>

        <p className="text-gray-600 mb-8">
          An error occurred while loading this page. Please try again.
        </p>

        <button
          onClick={handleTryAgain}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <RefreshCcw className="h-5 w-5" />
          Try again
        </button>
      </div>
    </main>
  );
}
