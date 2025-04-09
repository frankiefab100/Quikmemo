import React from "react";
import Link from "next/link";

const Offline: React.FC = () => {
  return (
    <div
      id="login"
      className="xl:py-16 xl:px-14 lg:py-16 lg:px-14 md:py-16 md:px-14 py-6 px-5 bg-tertiary min-h-[100vh] flex justify-center items-center flex-col"
    >
      <div className="text-appGray font-bold text-[22px] mt-3">
        You are offline
      </div>
      <div className="text-primary font-regular text-[15px] text-center mt-2">
        It seems you have lost your internet connection. Please check your
        network settings and try again.
      </div>
      <Link href="/" className="font-medium mt-3">
        Go back to Home
      </Link>
    </div>
  );
};

export default Offline;
