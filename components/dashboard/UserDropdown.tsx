"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { IUser } from "@/types/types";
import {
  CircleUser,
  ChevronDown,
  UserRoundIcon as UserRoundPen,
  Settings,
  Languages,
  Moon,
  type LucideIcon,
  LogOut,
} from "lucide-react";
import { signOutUser } from "@/actions/authActions";
import Link from "next/link";
import { useClickOutside } from "@/hooks/useClickOutside";

interface UserDropdownItemProps {
  Icon: LucideIcon;
  name: string;
  href?: string;
  onClick?: () => void;
}

const UserDropdownItems: React.FC<UserDropdownItemProps> = ({
  Icon,
  name,
  href,
  onClick,
}) => {
  return (
    <Link
      href={href || ""}
      className="flex px-4 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-md mx-2 hover:bg-gray-100 dark:hover:bg-gray-600"
      onClick={onClick}
    >
      <Icon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
      <span>{name}</span>
    </Link>
  );
};

interface UserDropdownProps extends IUser {}

const UserDropdown: React.FC<UserDropdownProps> = ({
  userImage,
  userName,
  userEmail,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const dropdownRef = useClickOutside(() => {
    setIsOpen(false);
  });

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const savedTheme = localStorage.getItem("theme");
      setTheme(savedTheme || (prefersDarkScheme ? "dark" : "light"));
    }
  }, []);

  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, colorTheme]);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        setTheme(e.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, []);

  return (
    <>
      <div ref={dropdownRef} className="flex items-center z-10">
        <button
          type="button"
          className="flex items-center space-x-2 focus:outline-none"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">user profile</span>
          {userImage && !imgError ? (
            <Image
              className="rounded-full w-6 h-6 md:w-8 md:h-8"
              src={userImage}
              alt={`${userName} photo`}
              width={50}
              height={50}
              onError={() => setImgError(true)}
            />
          ) : (
            <CircleUser className="w-6 h-6 md:w-8 md:h-8 text-gray-500 dark:text-gray-400" />
          )}
          <ChevronDown
            className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div className="md:block hidden">
          {isOpen && (
            <div className="absolute right-4 top-12 z-20 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3">
                {userImage && !imgError ? (
                  <Image
                    className="w-8 h-8 rounded-full"
                    src={userImage || "/placeholder.svg"}
                    alt={`${userName} photo`}
                    width={50}
                    height={50}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <CircleUser className="w-8 h-8 text-gray-400" />
                )}
                <p className="text-sm text-gray-900 dark:text-white">
                  {userName}
                </p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                  {userEmail}
                </p>
              </div>
              <UserDropdownItems
                Icon={UserRoundPen}
                name="Profile"
                href="/profile"
                onClick={() => setIsOpen(false)}
              />
              <UserDropdownItems
                Icon={Languages}
                name="Language & Region"
                href="/language"
                onClick={() => setIsOpen(false)}
              />
              <UserDropdownItems
                Icon={Settings}
                name="Settings"
                href="/settings"
                onClick={() => setIsOpen(false)}
              />
              <div className="flex justify-between px-4 py-2 rounded-md mx-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                <div className="flex justify-center align-center">
                  <Moon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                  <span>Dark Mode</span>
                </div>

                <label className="inline-flex items-center cursor-pointer">
                  <input
                    onChange={toggleTheme}
                    type="checkbox"
                    checked={theme === "dark"}
                    className="peer sr-only"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-blue-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="p-2">
                <button
                  type="button"
                  onClick={signOutUser}
                  className="w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg active:bg-blue-600 focus:ring-blue-200 hover:bg-blue-800"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile userdropdown */}
      <div className="md:hidden">
        {isOpen && (
          <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-50">
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-xl shadow-xl p-4 h-64 overflow-y-auto">
              <div className="flex flex-col space-y-2">
                <UserDropdownItems
                  Icon={UserRoundPen}
                  name="Profile"
                  href="/profile"
                />
                <UserDropdownItems
                  Icon={Languages}
                  name="Language & Region"
                  href="/language"
                />
                <UserDropdownItems
                  Icon={Settings}
                  name="Settings"
                  href="/settings"
                />
                <div className="flex justify-between px-4 py-2 rounded-md mx-2 text-sm text-gray-700 dark:text-gray-300  dark:hover:text-white">
                  <div className="flex">
                    <Moon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span>Dark Mode</span>
                  </div>

                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      onChange={toggleTheme}
                      type="checkbox"
                      checked={theme === "dark"}
                      className="peer sr-only"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-blue-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <UserDropdownItems
                  Icon={LogOut}
                  name="Log out"
                  onClick={signOutUser}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDropdown;
