"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import MobileNav from "./MobileNav";
import MegaMenu from "./MegaMenu";
import { useClickOutside } from "@/hook/useClickOutside";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navRef = useClickOutside(() => setActiveMenu(null));

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setActiveMenu(null);
    }, 4000);
  };

  const handleNavLinkClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b-2 border-gray-300 text-gray-900"
    >
      <div className="container mx-auto flex justify-between">
        <div className="relative block p-4 lg:p-6">
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
                data-testid="logo"
              />
            </picture>
          </Link>
        </div>

        <MegaMenu
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onNavLinkClick={handleNavLinkClick}
        />

        <div className="hidden lg:flex items-center">
          <Link
            href="/login"
            className="relative block py-6 px-2 lg:p-6 text-sm lg:text-base font-medium hover:underline hover:text-blue-500"
            data-testid="login-link"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-base font-medium text-white hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
            data-testid="get-started-link"
          >
            Get Started
          </Link>
        </div>

        <div className="flex lg:hidden items-center">
          <Link
            href="/register"
            className="hidden md:flex mr-6 items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            data-testid="get-started-link"
          >
            Get Started
          </Link>

          <button
            type="button"
            className="md:mx-0 mx-4 p-2 inline-flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-controls="mobile-menu"
            aria-label="Open main menu"
            data-testid="mobile-menu-button"
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

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <MobileNav setMobileMenuOpen={setIsMobileMenuOpen} />
      )}
    </nav>
  );
}
