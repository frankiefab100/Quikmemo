"use client";
import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  BookTextIcon,
  BrainCircuit,
  ChevronDown,
  ChevronRight,
  Cloud,
  FilePenLine,
  FileText,
  Headphones,
  HelpCircle,
  Lightbulb,
  NotepadText,
} from "lucide-react";
import type { MobileMenuProps, MobileNavProps } from "@/types/types";

const MobileMenu: React.FC<MobileMenuProps> = ({
  title,
  links,
  onLinkClick,
}) => {
  return (
    <div className="py-2">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
        {title}
      </h3>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-md"
          onClick={onLinkClick}
        >
          {link.icon}
          {link.label}
        </Link>
      ))}
    </div>
  );
};

const MobileNav: React.FC<MobileNavProps> = ({ setMobileMenuOpen }) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div
      className="lg:hidden bg-white border-t border-gray-200"
      id="mobile-menu"
      data-testid="mobile-menu"
    >
      <div className="px-2 pt-10 pb-3 space-y-1">
        {/* Features Submenu */}
        <div>
          <button
            onClick={() => toggleSubmenu("features")}
            className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
          >
            <span>Features</span>
            {openSubmenu === "features" ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>

          {openSubmenu === "features" && (
            <div className="mt-2 pl-4 space-y-2">
              <MobileMenu
                title="Core Features"
                links={[
                  {
                    label: "WYSIWYG Editor",
                    href: "/features/wysiwyg-editor",
                    icon: (
                      <FilePenLine className="h-5 w-5 mr-3 text-blue-600" />
                    ),
                  },
                  {
                    label: "AI Assistant",
                    href: "/features/ai-assistant",
                    icon: (
                      <BrainCircuit className="h-5 w-5 mr-3 text-blue-600" />
                    ),
                  },
                  {
                    label: "Offline Mode",
                    href: "/features/offline-mode",
                    icon: <Cloud className="h-5 w-5 mr-3 text-blue-600" />,
                  },
                ]}
                onLinkClick={handleLinkClick}
              />

              <MobileMenu
                title="Use Cases"
                links={[
                  {
                    label: "Project Planning",
                    href: "/usecases/project-plan",
                    icon: (
                      <NotepadText className="h-5 w-5 mr-3 text-blue-600" />
                    ),
                  },
                  {
                    label: "Personal Journal",
                    href: "/usecases/personal-journal",
                    icon: <BookOpen className="h-5 w-5 mr-3 text-blue-600" />,
                  },
                  {
                    label: "Brainstorming",
                    href: "/usecases/brainstorming",
                    icon: <Lightbulb className="h-5 w-5 mr-3 text-blue-600" />,
                  },
                ]}
                onLinkClick={handleLinkClick}
              />
            </div>
          )}
        </div>

        {/* Resources Submenu */}
        <div>
          <button
            onClick={() => toggleSubmenu("resources")}
            className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
          >
            <span>Resources</span>
            {openSubmenu === "resources" ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>

          {openSubmenu === "resources" && (
            <div className="mt-2 pl-4 space-y-2">
              <MobileMenu
                title="Learn"
                links={[
                  {
                    label: "Blog",
                    href: "/blog",
                    icon: (
                      <BookTextIcon className="h-5 w-5 mr-3 text-blue-600" />
                    ),
                  },
                  {
                    label: "Documentation",
                    href: "/docs",
                    icon: <FileText className="h-5 w-5 mr-3 text-blue-600" />,
                  },
                ]}
                onLinkClick={handleLinkClick}
              />

              <MobileMenu
                title="Support"
                links={[
                  {
                    label: "Help Center",
                    href: "/help",
                    icon: <Headphones className="h-5 w-5 mr-3 text-blue-600" />,
                  },
                  {
                    label: "FAQ",
                    href: "/faq",
                    icon: <HelpCircle className="h-5 w-5 mr-3 text-blue-600" />,
                  },
                ]}
                onLinkClick={handleLinkClick}
              />
            </div>
          )}
        </div>

        <Link
          href="/solutions"
          className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
          onClick={handleLinkClick}
        >
          Solutions
        </Link>
        <Link
          href="/company"
          className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
          onClick={handleLinkClick}
        >
          Company
        </Link>

        <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
          <Link
            href="/login"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
            onClick={handleLinkClick}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="md:hidden block px-3 py-2 text-center text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
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
