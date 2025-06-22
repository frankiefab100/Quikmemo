"use client";
import { Google, Github } from "@/assets/SocialIcons";
import { signIn } from "next-auth/react";

export const LoginOAuth: React.FC = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/dashboard",
    });
  };

  const buttonClass =
    "w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <button className={buttonClass} onClick={() => onClick("google")}>
        <Google />
        <span>Sign in with Google</span>
      </button>

      <button className={buttonClass} onClick={() => onClick("github")}>
        <Github />
        <span>Sign in with Github</span>
      </button>
    </div>
  );
};
