import Image from "next/image";
import SearchInput from "./SearchInput";
import { getSession } from "../../lib/getSession";
import UserDropdown from "./UserDropdown";
import Link from "next/link";
// import { CircleUser } from "lucide-react";

const MenuBar: React.FC = async () => {
  const session = await getSession();

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-2 lg:px-5 lg:pl-3 flex items-center justify-between">
        <div className="flex items-center justify-start rtl:justify-end">
          {/* Hamburger Menu */}
          <button
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <Link href="/" className="flex">
            <Image
              src="/icons/quikmemo-mark-logo.svg"
              className="h-8 w-8"
              alt="QuikMemo logo"
              width={50}
              height={50}
            />
            <span className="ml-2 text-xl font-normal sm:text-2xl whitespace-nowrap dark:text-white">
              Quikmemo
            </span>
          </Link>
        </div>

        {/* <div className="flex items-center">
          <SearchInput />

          {session?.user && (
            <UserDropdown
              userImage={session.user.image}
              userName={session.user.name}
              userEmail={session.user.email}
            />
          )}
        </div> */}
        <div className="flex items-center">
          <SearchInput />

          {session?.user && (
            <UserDropdown
              // userImage={
              //   session.user.image ?? <CircleUser className="w-8 h-8" />
              // }
              userImage={session.user.image ?? null}
              userName={session.user.name ?? "User"}
              userEmail={session.user.email ?? ""}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
