"use client";
import { signIn } from "next-auth/react";
import { Google, Github } from "@/assets/SocialIcons";
import Button from "@/components/ui/Button";

export const Socials = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="w-full flex items-center gap-x-2">
      <Button
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <Google />
      </Button>
      <Button
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <Github />
      </Button>
    </div>
  );
};
