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
import Image from "next/image";
import type {
  MegaMenuItemProps,
  MegaMenuProps,
  NavLinkProps,
} from "@/types/types";

const NavLink = ({
  label,
  onClick,
  ariaExpanded,
  onMouseEnter,
  onMouseLeave,
}: NavLinkProps) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative block py-6 px-2 lg:p-6 text-sm lg:text-base"
      aria-expanded={ariaExpanded}
    >
      {label}
      <ChevronDown
        className={`inline-block ml-1 h-4 w-4 transition-transform duration-200 ${
          ariaExpanded ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

const MegaMenuItem = ({ title, items }: MegaMenuItemProps) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        {title}
      </h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="group flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-50 text-blue-600 group-hover:bg-blue-100">
                  {item.icon}
                </div>
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900 group-hover:text-blue-600">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MegaMenu: React.FC<MegaMenuProps> = ({
  activeMenu,
  onMouseEnter,
  onMouseLeave,
  onNavLinkClick,
}) => {
  return (
    <div className="hidden lg:flex items-center space-x-8">
      <ul className="flex">
        {/* Features Dropdown */}
        <li className="hover:bg-blue-600 hover:text-white">
          <NavLink
            label="Features"
            onClick={() => onNavLinkClick("features")}
            ariaExpanded={activeMenu === "features"}
            onMouseEnter={() => onMouseEnter("features")}
            onMouseLeave={onMouseLeave}
          />
          {activeMenu === "features" && (
            <div className="mega-menu absolute left-0 w-full bg-white shadow-xl border-t border-gray-200">
              <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <MegaMenuItem
                    title="Core Features"
                    items={[
                      {
                        href: "/features/wysiwyg-editor",
                        icon: <FilePenLine className="h-6 w-6" />,
                        label: "WYSIWYG Editor",
                        description:
                          "Create and edit notes with our powerful rich text editor",
                      },
                      {
                        href: "/features/ai-assistant",
                        icon: <BrainCircuit className="h-6 w-6" />,
                        label: "AI Assistant",
                        description:
                          "Get smart suggestions and help with your notes",
                      },
                      {
                        href: "/features/offline-mode",
                        icon: <Cloud className="h-6 w-6" />,
                        label: "Offline Mode",
                        description:
                          "Work on your notes even without an internet connection",
                      },
                    ]}
                  />

                  <MegaMenuItem
                    title="Use Cases"
                    items={[
                      {
                        href: "/usecases/project-plan",
                        icon: <NotepadText className="h-6 w-6" />,
                        label: "Project Planning",
                        description:
                          "  Organize your projects and track progress efficiently",
                      },
                      {
                        href: "/usecases/personal-journal",
                        icon: <BookOpen className="h-6 w-6" />,
                        label: "Personal Journal",
                        description: " Keep track of your thoughts and ideas",
                      },
                      {
                        href: "/usecases/brainstorming",
                        icon: <Lightbulb className="h-6 w-6" />,
                        label: "Brainstorming Sessions",
                        description:
                          "Capture ideas and organize them effectively",
                      },
                    ]}
                  />

                  <div className="bg-gray-50 rounded-lg p-6 flex flex-col justify-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Ready to get started?
                    </h3>
                    <p className="text-base text-gray-500 mb-4">
                      Join thousands of users who are already using Quikmemo to
                      organize their thoughts and boost productivity.
                    </p>
                    <Link
                      href="/register"
                      className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Try Quikmemo for Free
                    </Link>
                    <p className="mt-2 text-sm text-gray-500">
                      No credit card required
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </li>

        {/* Resources Dropdown */}
        <li className="hover:bg-blue-600 hover:text-white">
          <NavLink
            label="Resources"
            onClick={() => onNavLinkClick("resources")}
            ariaExpanded={activeMenu === "resources"}
            onMouseEnter={() => onMouseEnter("resources")}
            onMouseLeave={onMouseLeave}
          />
          {activeMenu === "resources" && (
            <div className="mega-menu absolute left-0 w-full bg-white shadow-xl border-t border-gray-200">
              <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <MegaMenuItem
                    title="Learn"
                    items={[
                      {
                        href: "/blog",
                        icon: <BookTextIcon className="h-6 w-6" />,
                        label: "Blog",
                        description: "Read the latest articles and updates",
                      },
                      {
                        href: "/docs",
                        icon: <FileText className="h-6 w-6" />,
                        label: "Documentation",
                        description: "Learn how to use Quikmemo effectively",
                      },
                    ]}
                  />

                  <MegaMenuItem
                    title="Support"
                    items={[
                      {
                        href: "/help-center",
                        icon: <Headphones className="h-6 w-6" />,
                        label: "Help Center",
                        description: "Find answers to common questionss",
                      },
                      {
                        href: "/faq",
                        icon: <HelpCircle className="h-6 w-6" />,
                        label: "FAQ",
                        description: "Frequently asked questions",
                      },
                    ]}
                  />

                  {/* Column 3 - Featured */}
                  {/* <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Featured Article
                    </h3>
                    <p className="text-base text-gray-500 mb-4">
                      10 Tips to Boost Your Productivity with Quikmemo
                    </p>
                    <Image
                      src="/assets/images/hero-image-light.png"
                      alt="Productivity tips"
                      className="w-full h-32 object-cover rounded-md mb-4"
                      width={100}
                      height={100}
                    />
                    <Link
                      href="/blog/productivity-tips"
                      className="text-blue-600 font-medium hover:text-blue-800"
                    >
                      Read article →
                    </Link>
                  </div> */}

                  <div className="bg-gray-50 rounded-lg p-6 flex flex-col justify-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Featured Article
                    </h3>
                    <p className="text-base text-gray-500 mb-4">
                      10 Tips to Boost Your Productivity with Quikmemo
                    </p>

                    <Image
                      src="/assets/images/hero-image-light.png"
                      alt="Productivity tips"
                      className="w-full h-16 object-cover rounded-md mb-4"
                      width={100}
                      height={100}
                    />
                    <Link
                      href="/blog/productivity-tips"
                      className="flex items-center text-blue-600 font-medium hover:text-blue-800"
                    >
                      Read article
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </li>

        <li className="hover:bg-blue-600 hover:text-white">
          <Link
            href="/solutions"
            className="relative block py-6 px-2 lg:p-6 text-sm lg:text-base"
          >
            Solutions
          </Link>
        </li>
        <li className="hover:bg-blue-600 hover:text-white">
          <Link
            href="/company"
            className="relative block py-6 px-2 lg:p-6 text-sm lg:text-base"
          >
            Company
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MegaMenu;
