"use client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface MobileDropdownProps {
  href: string;
  title: string;
}

export const MobileDropdown = ({ href, title }: MobileDropdownProps) => {
  return (
    <Link
      href={href}
      className="block rounded-md py-2 pl-10 pr-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600"
    >
      <span>{title}</span>
    </Link>
  );
};

const MobileNav = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="md:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {/* Features Mobile */}
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle("features-mobile")}
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            aria-expanded={activeDropdown === "features-mobile"}
          >
            <span>Features</span>
            <ChevronDown
              className={`ml-1 h-5 w-5 transition-transform duration-200 ${
                activeDropdown === "features-mobile" ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {activeDropdown === "features-mobile" && (
            <div className="mt-2 space-y-1 px-4">
              <MobileDropdown
                href="/features/wysiwyg-editor"
                title="WYSIWYG Editor"
              />
              <MobileDropdown
                href="/features/ai-assistant"
                title="AI Assistant"
              />
              <MobileDropdown
                href="/features/offline-mode"
                title="Offline Mode"
              />
              <MobileDropdown
                href="/usecase/project-plan"
                title="Project Plan"
              />
              <MobileDropdown
                href="/usecase/personal-journal"
                title="Personal Journal"
              />
              <MobileDropdown
                href="/usecase/brainstorming"
                title="Brainstorming"
              />
            </div>
          )}
        </div>

        {/* Resources Mobile */}
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle("resources-mobile")}
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            aria-expanded={activeDropdown === "resources-mobile"}
          >
            <span>Resources</span>
            <ChevronDown
              className={`ml-1 h-5 w-5 transition-transform duration-200 ${
                activeDropdown === "resources-mobile" ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {activeDropdown === "resources-mobile" && (
            <div className="mt-2 space-y-1 px-4">
              <MobileDropdown href="/blog" title="Blog" />
              <MobileDropdown href="/help" title=" Help Center" />
              <MobileDropdown href="/docs" title="Documentation" />
              <MobileDropdown href="/faq" title="FAQ" />
            </div>
          )}
        </div>

        <Link
          href="/solution"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
        >
          Solution
        </Link>
        <Link
          href="/company"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
        >
          Company
        </Link>

        <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
          <Link
            href="/login"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-base font-medium text-white hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
