"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  BrainCircuit,
  NetworkIcon,
  BookOpen,
  HelpCircle,
  FileText,
  Headphones,
  FolderKanban,
  NotepadText,
  Presentation,
  FilePenLine,
} from "lucide-react";
import { useClickOutside } from "@/hook/useClickOutside";

interface DropdownItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
}

const DropdownItem = ({
  icon: Icon,
  title,
  description,
  href,
}: DropdownItemProps) => {
  return (
    <Link
      href={href}
      className="group flex items-start gap-2 p-3 transition-colors hover:bg-gray-50"
    >
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 group-hover:bg-blue-100">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  );
};

interface MobileDropdownProps {
  href: string;
  title: string;
}

const MobileDropdown = ({ href, title }: MobileDropdownProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <Link
      href={href}
      className="block rounded-md py-2 pl-10 pr-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600"
      onClick={() => setActiveDropdown(null)}
    >
      <span> {title}</span>
    </Link>
  );
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const featuresRef = useClickOutside(() => setActiveDropdown(null));
  const resourcesRef = useClickOutside(() => setActiveDropdown(null));

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownToggle = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <picture>
                <source
                  media="(min-width: 1024px)"
                  srcSet="/icons/quikmemo-full-lockup-logo.svg"
                  width="150"
                  height="32"
                />
                <source
                  media="(min-width: 768px)"
                  srcSet="/icons/quikmemo-full-lockup-logo.svg"
                  width="140"
                  height="32"
                />
                <img
                  src="/icons/quikmemo-mark-logo.svg"
                  width="40"
                  height="40"
                  alt="Quikmemo logo"
                  className="h-8 w-auto"
                />
              </picture>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {/* Features*/}
            <div
              ref={featuresRef}
              className="relative"
              onMouseEnter={() => handleMouseEnter("features")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleDropdownToggle("features")}
                className="group inline-flex items-center text-base font-medium text-gray-700 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-expanded={activeDropdown === "features"}
                aria-haspopup="true"
              >
                <span>Features</span>
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === "features" ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {activeDropdown === "features" && (
                <div className="mt-5 w-full rounded-xl bg-white p-2 lg:absolute lg:left-0 lg:top-full lg:w-[850px] lg:p-8 shadow">
                  <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
                    <div>
                      <h4 className="border-b border-gray-200 pb-3 mb-3 text-sm font-semibold text-gray-900">
                        Get Started
                      </h4>
                      <div className="space-y-2">
                        <DropdownItem
                          icon={FilePenLine}
                          title="WYSIWYG Editor"
                          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                          href="/features/wysiwyg-editor"
                        />
                        <DropdownItem
                          icon={BrainCircuit}
                          title="AI Assistant"
                          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                          href="/features/ai-assistant"
                        />
                        <DropdownItem
                          icon={NetworkIcon}
                          title="Offline Mode"
                          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                          href="/features/offline-mode"
                        />
                      </div>
                    </div>
                    <div className="border-l border-gray-200 px-3">
                      <h4 className="border-b border-gray-200 pb-3 mb-3 text-sm font-semibold text-gray-900">
                        UseCases
                      </h4>
                      <div className="space-y-2">
                        <DropdownItem
                          icon={FolderKanban}
                          title="Project Plan"
                          description="Organize and track your projects"
                          href="/usecases/project-plan"
                        />
                        <DropdownItem
                          icon={NotepadText}
                          title="Personal Journal"
                          description="Keep track of your thoughts"
                          href="/usecases/personal-journal"
                        />
                        <DropdownItem
                          icon={Presentation}
                          title="Brainstorming"
                          description="Capture and ideas"
                          href="/usecases/brainstorming"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources*/}
            <div
              ref={resourcesRef}
              className="relative"
              onMouseEnter={() => handleMouseEnter("resources")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleDropdownToggle("resources")}
                className="group inline-flex items-center text-base font-medium text-gray-700 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-expanded={activeDropdown === "resources"}
                aria-haspopup="true"
              >
                <span>Resources</span>
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === "resources" ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {activeDropdown === "resources" && (
                <div className="mt-5 w-full rounded-lg bg-white p-2 lg:absolute lg:left-0 lg:top-full lg:w-[650px] lg:p-8 shadow">
                  <div className="relative grid grid-cols-2 gap-2">
                    <DropdownItem
                      icon={BookOpen}
                      title="Blog"
                      description="Read the latest articles and updates"
                      href="/blog"
                    />
                    <DropdownItem
                      icon={Headphones}
                      title="Help Center"
                      description="Find answers to common questions"
                      href="/help"
                    />
                    <DropdownItem
                      icon={FileText}
                      title="Documentation"
                      description="Learn how to use Quikmemo effectively"
                      href="/docs"
                    />
                    <DropdownItem
                      icon={HelpCircle}
                      title="FAQ"
                      description="Frequently asked questions"
                      href="/faq"
                    />
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/solutions"
              className="text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Solutions
            </Link>
            <Link
              href="/company"
              className="text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Company
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Link
              href="/login"
              className="text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="ml-8 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden" id="mobile-menu">
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
      )}
    </nav>
  );
}
