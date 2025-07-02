"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MobileNav from "./MobileNav";
import MegaMenu from "./MegaMenu";
import { useClickOutside } from "@/hooks/useClickOutside";
import Image from "next/image";
import Logo from "../../public/icons/quikmemo-mark-logo.svg";
import { motion } from "motion/react";

const HamburgerButton: React.FC<{
  isOpen: boolean;
  toggle: () => void;
}> = ({ isOpen, toggle }) => (
  <button
    type="button"
    className="md:mx-0 mx-4 p-2 inline-flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
    aria-controls="mobile-menu"
    aria-label="Open main menu"
    data-testid="mobile-menu-button"
    aria-expanded={isOpen}
    onClick={toggle}
  >
    <span className="sr-only">Open main menu</span>
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block h-6 w-6"
    >
      <motion.line
        x1="3"
        x2="21"
        y1="6"
        y2="6"
        initial={false}
        animate={
          isOpen ? { y1: 12, y2: 12, rotate: 45 } : { y1: 6, y2: 6, rotate: 0 }
        }
        style={{ originX: "50%", originY: "50%" }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      <motion.line
        x1="3"
        x2="21"
        y1="12"
        y2="12"
        initial={false}
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        x1="3"
        x2="21"
        y1="18"
        y2="18"
        initial={false}
        animate={
          isOpen
            ? { y1: 12, y2: 12, rotate: -45 }
            : { y1: 18, y2: 18, rotate: 0 }
        }
        style={{ originX: "50%", originY: "50%" }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </svg>
  </button>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isHoveringMegaMenu, setIsHoveringMegaMenu] = useState(false);
  const navRef = useClickOutside(() => {
    if (!isHoveringMegaMenu) {
      setActiveMenu(null);
    }
  });
  const [isScrolled, setIscrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIscrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    if (!isHoveringMegaMenu) {
      setActiveMenu(null);
    }
  };

  const handleNavLinkClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleMegaMenuMouseEnter = () => {
    setIsHoveringMegaMenu(true);
  };

  const handleMegaMenuMouseLeave = () => {
    setIsHoveringMegaMenu(false);
    setActiveMenu(null);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 text-gray-900 transition-all duration-300 ease-in-out
        ${
          isScrolled
            ? "top-2  mx-4 md:mx-8 lg:mx-12 md:rounded-full rounded-3xl shadow-lg bg-white/90 backdrop-blur-sm max-w-[calc(100%-32px)]"
            : "rounded-none shadow-none md:px-8 lg:px-12"
        }
      `}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="relative block p-4">
          <Link href="/" className="flex items-center">
            <Image
              src={Logo}
              width="40"
              height="40"
              alt="Quikmemo logo"
              className="h-8 w-auto"
              data-testid="logo"
            />
            <span className="hidden md:inline ml-2 text-lg font-bold whitespace-nowrap text-gray-900 dark:text-white">
              Quikmemo
            </span>
          </Link>
        </div>

        <MegaMenu
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onNavLinkClick={handleNavLinkClick}
          onMegaMenuMouseEnter={handleMegaMenuMouseEnter}
          onMegaMenuMouseLeave={handleMegaMenuMouseLeave}
        />

        <div className="hidden lg:pr-8 lg:flex items-center">
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

          <HamburgerButton
            isOpen={isMobileMenuOpen}
            toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <MobileNav setMobileMenuOpen={setIsMobileMenuOpen} />
      )}
    </nav>
  );
}
