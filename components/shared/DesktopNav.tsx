"use client";
import Link from "next/link";
import type React from "react";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hook/useClickOutside";
import {
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
      data-testid={`dropdown-item-${title.toLowerCase().replace(/\s+/g, "-")}`}
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

const DesktopNav: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const featuresRef = useClickOutside(() => setActiveDropdown(null));
  const resourcesRef = useClickOutside(() => setActiveDropdown(null));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  return (
    <div className="hidden lg:flex lg:items-center lg:space-x-8">
      {/* Features*/}
      <div
        ref={featuresRef}
        className="relative"
        onMouseEnter={() => handleMouseEnter("features")}
        onMouseLeave={handleMouseLeave}
        data-testid="features-dropdown-container"
      >
        <button
          onClick={() => handleDropdownToggle("features")}
          className="group inline-flex items-center text-base font-medium text-gray-700 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-expanded={activeDropdown === "features"}
          aria-haspopup="true"
          data-testid="features-dropdown-button"
        >
          Features
          <ChevronDown
            className={`ml-1 h-4 w-4 transition-transform duration-200 ${
              activeDropdown === "features" ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>
        {activeDropdown === "features" && (
          <div
            className="mt-5 w-full rounded-xl bg-white p-2 lg:absolute lg:left-0 lg:top-full lg:w-[850px] lg:p-8 shadow"
            onMouseEnter={() => handleMouseEnter("features")}
            onMouseLeave={handleMouseLeave}
            data-testid="features-dropdown-content"
          >
            <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
              <div>
                <h4 className="border-b border-gray-200 pb-3 mb-3 text-sm font-semibold text-gray-900">
                  Get Started
                </h4>
                <div data-testid="features-list" className="space-y-2">
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
        data-testid="resources-dropdown-container"
      >
        <button
          onClick={() => handleDropdownToggle("resources")}
          className="group inline-flex items-center text-base font-medium text-gray-700 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-expanded={activeDropdown === "resources"}
          aria-haspopup="true"
          data-testid="resources-dropdown-button"
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
          <div
            className="mt-5 w-full rounded-lg bg-white p-2 lg:absolute lg:left-0 lg:top-full lg:w-[650px] lg:p-8 shadow"
            onMouseEnter={() => handleMouseEnter("resources")}
            onMouseLeave={handleMouseLeave}
            data-testid="resources-dropdown-content"
          >
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
        data-testid="solutions-link"
      >
        Solutions
      </Link>
      <Link
        href="/company"
        className="text-base font-medium text-gray-700 hover:text-blue-600"
        data-testid="company-link"
      >
        Company
      </Link>
    </div>
  );
};

export default DesktopNav;
