import Image from "next/image";
import SearchInput from "./ui/SearchInput";
import { getSession } from "../../lib/getSession";
import UserDropdown from "./ui/UserDropdown";
import Link from "next/link";
import { Menu } from "lucide-react";

const Navbar: React.FC = async () => {
  const session = await getSession();

  return (
    <header className="sticky top-0 left-0 z-10">
      <nav
        id="navigation"
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 w-full flex flex-row flex-nowrap justify-between items-center"
      >
        <div className="flex justify-around items-center">
          <Menu className="text-gray-800 dark:text-gray-200 cursor-pointer md:h-8 md:w-8 h-5 w-5 lg:mx-6 ml-4 mr-2" />
          <Link href="/" className="flex items-center">
            <Image
              src="/icons/quikmemo-mark-logo.svg"
              className="md:h-8 md:w-8 h-5 w-5"
              alt="QuikMemo logo"
              width={150}
              height={150}
            />
          </Link>
          <span className="ml-2 md:text-xl text-lg font-normal  whitespace-nowrap text-gray-900 dark:text-white">
            Quikmemo
          </span>
        </div>

        <SearchInput />

        <div className="flex justify-between items-center mx-4">
          {session?.user && (
            <UserDropdown
              userImage={session.user.image ?? null}
              userName={session.user.name ?? ""}
              userEmail={session.user.email ?? ""}
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
