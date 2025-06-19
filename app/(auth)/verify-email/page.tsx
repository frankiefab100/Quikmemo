"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("No verification token provided.");
      return;
    }
    fetch(`/api/auth/verify-email?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
          setMessage(
            data.message || "Your email has been verified! You can now log in."
          );
          setTimeout(() => router.push("/login"), 3000);
        } else {
          setStatus("error");
          setMessage(
            data.message ||
              "Verification failed. The token may be invalid or expired."
          );
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("An error occurred while verifying your email.");
      });
  }, [searchParams, router]);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
        {status === "loading" && <p>Verifying your email...</p>}
        {status === "success" && <p className="text-green-600">{message}</p>}
        {status === "error" && <p className="text-red-600">{message}</p>}
      </div>
    </main>
  );
}
