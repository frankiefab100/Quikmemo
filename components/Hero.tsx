import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Avatars from "./templates/Avatars";

export const Hero = () => {
  return (
    <section className="min-h-screen max-w-7xl mx-auto py-10 md:pt-20 text-center px-4 lg:px-8">
      <span className="rounded-[15px] inline-flex center border border-blue-500 text-gray-900 px-3 py-1 text-sm w-fit ">
        <Avatars />
        <p className="text-sm text-gray-400 font-medium translate-x-2">
          Join 50+ users
        </p>
      </span>

      <div className="mt-2 space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
          The Ultimate{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-sky-400">
            Note-Taking
          </span>
          {""} Companion
        </h1>

        <p className="md:text-xl text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          Jot down ideas, inspiration, and organize your tasks seamlessly.
        </p>
      </div>

      <Link
        href="/register"
        className="flex flex-wrap justify-center gap-4 my-16"
      >
        <button className="flex items-center gap-2 px-6 py-3.5 text-white bg-blue-600 rounded-lg duration-150 hover:bg-blue-700 active:shadow-lg">
          Try QuikMemo
          <ChevronRight className="h-6 w-6" />
        </button>
      </Link>

      {/* <div className="relative max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden bg-gray-900"> */}
      <Image
        src="/images/hero-image-dark.png"
        alt="QuikMemo Demo"
        width={1400}
        height={900}
        className="object-cover"
      />
      {/* </div> */}
    </section>
  );
};
