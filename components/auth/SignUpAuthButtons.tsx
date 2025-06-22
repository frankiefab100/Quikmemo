"use client";
import { Google, Github } from "@/assets/SocialIcons";
import { signIn } from "next-auth/react";

export const SignUpOAuth: React.FC = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/dashboard",
    });
  };

  const buttonClass =
    "flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100";

  return (
    <div className="grid grid-cols-2 gap-x-3">
      <button className={buttonClass} onClick={() => onClick("google")}>
        <Google />
      </button>

      <button className={buttonClass} onClick={() => onClick("github")}>
        <Github />
      </button>
    </div>
  );
};
