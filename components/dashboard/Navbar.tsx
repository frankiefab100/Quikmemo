import Image from "next/image";
import SearchInput from "./ui/SearchInput";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  showMobileSidebar: boolean;
  setShowMobileSidebar: (show: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  showMobileSidebar,
  setShowMobileSidebar,
}) => {
  return (
    <header>
      <nav
        id="navigation"
        className="fixed top-0 left-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 w-full flex flex-row flex-nowrap justify-between items-center"
      >
        <div className="flex justify-around items-center ml-6">
          <button
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            className="flex md:hidden text-gray-800 dark:text-gray-200 cursor-pointer"
          >
            {showMobileSidebar ? (
              <Menu className="h-7 w-7" />
            ) : (
              <X className="h-7 w-7" />
            )}
          </button>

          <Link href="/" className="flex items-center">
            <Image
              src="/icons/quikmemo-mark-logo.svg"
              className="w-8 h-8 md:ml-0 ml-2"
              alt="Quikmemo logo"
              width={150}
              height={150}
            />
          </Link>
          <span className="md:flex hidden ml-2 md:text-xl text-lg font-normal whitespace-nowrap text-gray-900 dark:text-white">
            Quikmemo
          </span>
        </div>
        <SearchInput />
        {/* <UserAccount /> */}
      </nav>
    </header>
  );
};

export default Navbar;
