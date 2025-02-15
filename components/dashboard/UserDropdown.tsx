"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { signOutUser } from "@/actions/user";
import { IUser } from "@/types/types";
import { CircleUser } from "lucide-react";

const UserDropdown: React.FC<IUser> = ({
  userImage,
  userName = "User",
  userEmail = "",
}: IUser) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || (prefersDarkScheme ? "dark" : "light")
  );
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div className="flex items-center ms-3">
      <button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        <span className="sr-only">user profile</span>
        {userImage ? (
          <Image
            className="w-8 h-8 rounded-full"
            src={userImage}
            alt={userName}
            width={50}
            height={50}
          />
        ) : (
          <CircleUser className="w-8 h-8 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 top-12 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-4 py-3" role="none">
            {userImage ? (
              <Image
                className="w-8 h-8 rounded-full"
                src={userImage}
                alt={userName}
                width={50}
                height={50}
              />
            ) : (
              <CircleUser className="w-8 h-8 text-gray-400" />
            )}
            <p className="text-sm text-gray-900 dark:text-white" role="none">
              {userName}
            </p>
            <p
              className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
              role="none"
            >
              {userEmail}
            </p>
          </div>
          <ul className="py-1" role="none">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Edit Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                All Notes
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Settings
              </a>
            </li>

            <label className="ml-3 inline-flex items-center mb-5 cursor-pointer">
              <input
                onChange={toggleTheme}
                type="checkbox"
                id="checkbox"
                value=""
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-blue-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
            </label>
          </ul>
          <form action={signOutUser} className="p-4">
            <button
              type="submit"
              className="w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg active:bg-blue-600 focus:ring-blue-200 hover:bg-blue-800"
            >
              Sign Out
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
