"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsFeaturesOpen(false);
    setIsUseCasesOpen(false);
    setIsResourcesOpen(false);
    setter((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                className="w-auto h-9"
                src="/quikmemo-mark.svg"
                alt="Quikmemo Logo"
                width={150}
                height={36}
              />
              <span className="text-xl font-normal">Quikmemo</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <div className="relative">
                <button
                  onClick={() => toggleDropdown(setIsFeaturesOpen)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                  aria-expanded={isFeaturesOpen}
                  aria-haspopup="true"
                >
                  <span>Features</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isFeaturesOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <Link
                        href="/products"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Products
                      </Link>
                      <Link
                        href="/integrations"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Integrations
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => toggleDropdown(setIsUseCasesOpen)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                  aria-expanded={isUseCasesOpen}
                  aria-haspopup="true"
                >
                  <span>Use Cases</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isUseCasesOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <Link
                        href="/for-teams"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        For Teams
                      </Link>
                      <Link
                        href="/for-individuals"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        For Individuals
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => toggleDropdown(setIsResourcesOpen)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                  aria-expanded={isResourcesOpen}
                  aria-haspopup="true"
                >
                  <span>Resources</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isResourcesOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <Link
                        href="/blog"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Blog
                      </Link>
                      <Link
                        href="/faq"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        FAQ
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/company"
                className="text-gray-600 hover:text-gray-900"
              >
                Company
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 px-4 py-2 hover:underline"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => toggleDropdown(setIsFeaturesOpen)}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Features
            </button>
            {isFeaturesOpen && (
              <div className="pl-4">
                <Link
                  href="/features"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Products
                </Link>
                <Link
                  href="/integrations"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Integrations
                </Link>
              </div>
            )}
            <button
              onClick={() => toggleDropdown(setIsUseCasesOpen)}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Use Cases
            </button>
            {isUseCasesOpen && (
              <div className="pl-4">
                <Link
                  href="/for-teams"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  For Teams
                </Link>
                <Link
                  href="/for-individuals"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  For Individuals
                </Link>
              </div>
            )}
            <button
              onClick={() => toggleDropdown(setIsResourcesOpen)}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Resources
            </button>
            {isResourcesOpen && (
              <div className="pl-4">
                <Link
                  href="/blog"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Blog
                </Link>
                <Link
                  href="/faq"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  FAQ
                </Link>
              </div>
            )}

            <Link
              href="/login"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:underline"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
