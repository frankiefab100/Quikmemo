import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Avatars from "../shared/Avatars";
import HeroImg from "@/assets/images/hero-image-dark.png";

export const Hero: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center pt-60 md:pt-72 px-4 lg:px-8">
      <span className=" px-3 py-1 rounded-[15px] inline-flex border border-blue-300">
        <Avatars />
        <p className="ml-2 text-sm text-gray-500 font-medium">Join 50+ users</p>
      </span>

      <div className="mt-2 space-y-2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">
          The Ultimate{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-sky-400">
            Note-Taking
          </span>
          {""} Companion
        </h1>

        <p className="lg:text-xl md:text-lg text-base text-gray-500 mb-12 max-w-2xl mx-auto">
          Write down your ideas, inspiration, and organize your tasks
          seamlessly.
        </p>
      </div>

      <button className="my-10 mx-auto rounded-full px-6 py-3.5 text-white bg-blue-600 hover:bg-blue-700 duration-150">
        <Link href="/register" role="button" className="flex justify-center">
          Try Quikmemo
          <ChevronRight className="h-6 w-6" />
        </Link>
      </button>

      <div className="mt-10 max-w-6xl mx-auto rounded-md overflow-hidden">
        <Image
          src={HeroImg}
          alt="QuikMemo Demo"
          width={1400}
          height={900}
          className="object-cover"
        />
      </div>
    </section>
  );
};
