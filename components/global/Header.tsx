"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import MobileNav from "../shared/MobileNav";
import DesktopNav from "../shared/DesktopNav";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

          <DesktopNav />

          <div className="hidden md:flex md:items-center md:space-x-4">
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

          <div className="flex md:hidden">
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
      {isMobileMenuOpen && <MobileNav />}
    </nav>
  );
}
