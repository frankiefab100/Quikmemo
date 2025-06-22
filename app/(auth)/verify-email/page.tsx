"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyEmailComponent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  useEffect(() => {
    if (!token) {
      setError("Missing verification token!");
      return;
    }

    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "An unknown error occurred.");
        }
        return data;
      })
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong!");
      });
  }, [token]);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 text-center">
        <h1 className="text-2xl font-bold mb-4">Verifying your email</h1>
        {!success && !error && <p>Please wait...</p>}
        {success && <p className="text-green-600">{success}</p>}
        {error && (
          <div>
            <p className="text-red-600">{error}</p>
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
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailComponent />
    </Suspense>
  );
}
