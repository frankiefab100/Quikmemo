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
import { motion, AnimatePresence } from "motion/react";

const MobileMenu: React.FC<MobileMenuProps> = ({
  title,
  links,
  onLinkClick,
}) => {
  return (
    <div className="border-b border-gray-200 pb-4 py-2">
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
      className="lg:hidden max-h-screen overflow-y-scroll bg-white border-t border-gray-200"
      id="mobile-menu"
      data-testid="mobile-menu"
    >
      <div className="rounded-b-3xl px-2 pb-3 space-y-1">
        {/* Features Submenu */}
        <div>
          <button
            onClick={() => toggleSubmenu("features")}
            className="border-b border-gray-200 pb-4 w-full flex justify-between items-center px-3 py-6 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
          >
            <span>Features</span>
            <motion.span
              animate={{ rotate: openSubmenu === "features" ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.span>
          </button>

          {openSubmenu === "features" && (
            <AnimatePresence>
              <motion.div
                key="features-submenu"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="mt-2 pl-4 space-y-2 overflow-hidden"
              >
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
                      icon: (
                        <Lightbulb className="h-5 w-5 mr-3 text-blue-600" />
                      ),
                    },
                  ]}
                  onLinkClick={handleLinkClick}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Resources Submenu */}
        <div>
          <button
            onClick={() => toggleSubmenu("resources")}
            className="border-b border-gray-200 pb-4 w-full flex justify-between items-center px-3 py-6 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
          >
            <span>Resources</span>
            <motion.span
              animate={{ rotate: openSubmenu === "resources" ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.span>
          </button>

          <AnimatePresence>
            {openSubmenu === "resources" && (
              <motion.div
                key="resources-submenu"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="mt-2 pl-4 space-y-2 overflow-hidden"
              >
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
                      icon: (
                        <Headphones className="h-5 w-5 mr-3 text-blue-600" />
                      ),
                    },
                    {
                      label: "FAQ",
                      href: "/faq",
                      icon: (
                        <HelpCircle className="h-5 w-5 mr-3 text-blue-600" />
                      ),
                    },
                  ]}
                  onLinkClick={handleLinkClick}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          href="/solutions"
          className="border-b border-gray-200 pb-4 block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
          onClick={handleLinkClick}
        >
          Solutions
        </Link>
        <Link
          href="/contact"
          className="border-b border-gray-200 pb-4 block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
          onClick={handleLinkClick}
        >
          Contact
        </Link>

        <div className="flex justify-center items-center pt-6 space-x-4">
          <Link
            href="/register"
            className="md:hidden flex justify-center items-center px-6 py-3 text-center text-base font-medium text-white bg-blue-600 hover:bg-blue-600 rounded-full md:rounded-md"
            onClick={handleLinkClick}
          >
            Get Started <ChevronRight className="w-5 h-5" />
          </Link>
          <Link
            href="/login"
            className="px-3 py-2 mt-0 text-base font-medium text-gray-700 hover:text-blue-600 md:w-full md:text-white md:bg-blue-600 md:hover:bg-blue-600 md:rounded-md"
            onClick={handleLinkClick}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
