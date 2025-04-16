"use client";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface MobileDropdownProps {
  href: string;
  title: string;
  onClick?: () => void;
}

export const MobileDropdown = ({
  href,
  title,
  onClick,
}: MobileDropdownProps) => {
  return (
    <Link
      href={href}
      className="block rounded-md py-2 pl-10 pr-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600"
      onClick={onClick}
      data-testid={`mobile-dropdown-${title
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      <span>{title}</span>
    </Link>
  );
};

interface MobileNavProps {
  setMobileMenuOpen: (isOpen: boolean) => void;
}

const MobileNav = ({ setMobileMenuOpen }: MobileNavProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleLinkClick = () => {
    setActiveDropdown(null);
    if (setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="lg:hidden" id="mobile-menu" data-testid="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {/* Features Mobile */}
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle("features-mobile")}
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            aria-expanded={activeDropdown === "features-mobile"}
            data-testid="mobile-features-button"
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
            <div
              className="mt-2 space-y-1 px-4"
              data-testid="mobile-features-dropdown"
            >
              <MobileDropdown
                href="/features/wysiwyg-editor"
                title="WYSIWYG Editor"
                onClick={handleLinkClick}
              />
              <MobileDropdown
                href="/features/ai-assistant"
                title="AI Assistant"
                onClick={handleLinkClick}
              />
              <MobileDropdown
                href="/features/offline-mode"
                title="Offline Mode"
                onClick={handleLinkClick}
              />
              <MobileDropdown
                href="/usecase/project-plan"
                title="Project Plan"
                onClick={handleLinkClick}
              />
              <MobileDropdown
                href="/usecase/personal-journal"
                title="Personal Journal"
                onClick={handleLinkClick}
              />
              <MobileDropdown
                href="/usecase/brainstorming"
                title="Brainstorming"
                onClick={handleLinkClick}
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
            data-testid="mobile-resources-button"
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
            <div
              className="mt-2 space-y-1 px-4"
              data-testid="mobile-resources-dropdown"
            >
              <MobileDropdown
                href="/blog"
                title="Blog"
                onClick={handleLinkClick}
              />
              <MobileDropdown
                href="/help"
                title="Help Center"
                onClick={handleLinkClick}
              />
              <MobileDropdown
                href="/docs"
                title="Documentation"
                onClick={handleLinkClick}
              />
              <MobileDropdown
                href="/faq"
                title="FAQ"
                onClick={handleLinkClick}
              />
            </div>
          )}
        </div>

        <Link
          href="/solution"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
          data-testid="mobile-solution-link"
          onClick={handleLinkClick}
        >
          Solution
        </Link>
        <Link
          href="/company"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
          data-testid="mobile-company-link"
          onClick={handleLinkClick}
        >
          Company
        </Link>

        <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
          <Link
            href="/login"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            data-testid="mobile-login-link"
            onClick={handleLinkClick}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="md:hidden block rounded-md bg-blue-600 px-3 py-2 text-center text-base font-medium text-white hover:bg-blue-700"
            data-testid="mobile-get-started-link"
            onClick={handleLinkClick}
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
