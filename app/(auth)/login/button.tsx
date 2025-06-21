"use client";
import { signInUser } from "@/actions/authActions";

interface ButtonProps {
  provider: "google" | "github";
  text: string;
  Icon: React.ComponentType;
}

const Button: React.FC<ButtonProps> = ({ provider, text, Icon }) => {
  return (
    <button
      type="button"
      onClick={signInUser.bind(null, provider)}
      className={`w-full flex items-center justify-center gap-2 px-4 py-2 font-medium rounded-lg duration-150
          ${
            provider === "google"
              ? "text-black bg-gray-100 hover:bg-gray-50 active:bg-white"
              : provider === "github"
                ? "text-white bg-gray-800 hover:bg-gray-700 active:bg-gray-900"
                : "text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-600"
          }`}
    >
      <Icon />
      <span className="ml-1">{text}</span>
    </button>
  );
};

export default Button;
