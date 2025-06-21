"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface VerifyEmailMessageProps {
  result: {
    success?: string;
    error?: string;
  };
}

const VerifyEmailMessage = ({ result }: VerifyEmailMessageProps) => {
  const router = useRouter();

  useEffect(() => {
    if (result.success) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [result.success, router]);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 text-center">
        <h1 className="text-2xl font-bold mb-4">
          {result.success ? "Success!" : "Verification Failed"}
        </h1>
        {result.success && <p className="text-green-600">{result.success}</p>}
        {result.error && (
          <div>
            <p className="text-red-600">{result.error}</p>
            <Link
              href="/login"
              className="text-blue-500 hover:underline mt-4 block"
            >
              Return to Login
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default VerifyEmailMessage;
