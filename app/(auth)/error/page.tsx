"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

const errorMessages = {
  OAuthAccountNotLinked: {
    title: "Account Already Exists",
    description:
      "An account with this email already exists. Please sign in with your original method or link your accounts.",
    action:
      "Try signing in with email/password first, then link your social accounts from your profile.",
  },
  EmailSignin: {
    title: "Email Verification Required",
    description: "Please check your email and click the verification link.",
    action: "Check your email for a verification link.",
  },
  CredentialsSignin: {
    title: "Invalid Credentials",
    description: "The email or password you entered is incorrect.",
    action: "Please check your credentials and try again.",
  },
  Default: {
    title: "Authentication Error",
    description: "An error occurred during authentication.",
    action: "Please try again or contact support if the problem persists.",
  },
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") as keyof typeof errorMessages;

  const errorInfo = errorMessages[error] || errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200">
        <header className="text-center p-6 border-b border-gray-200">
          <h1 className="flex items-center justify-center gap-2 text-red-600 text-xl font-semibold">
            <AlertCircle className="h-6 w-6" />
            {errorInfo.title}
          </h1>
          <p className="mt-2 text-gray-700">{errorInfo.description}</p>
        </header>

        <main className="p-6 space-y-4">
          <p className="text-sm text-gray-500 text-center">
            {errorInfo.action}
          </p>

          {error === "OAuthAccountNotLinked" ? (
            <div className="space-y-3">
              <Link
                href="/login"
                className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
              >
                Sign in with Email/Password
              </Link>
              <Link
                href="/forgot-password"
                className="block w-full text-center border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 rounded-md transition"
              >
                Forgot Password?
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                href="/login"
                className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
              >
                Back to Login
              </Link>
              <Link
                href="/register"
                className="block w-full text-center border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 rounded-md transition"
              >
                Create New Account
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
