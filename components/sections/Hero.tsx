import Image from "next/image";
import { ChevronRight, Sparkle } from "lucide-react";
import Link from "next/link";
import HeroImg from "@/assets/images/quikmemo-dashboard-dark.png";

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center pt-40 md:pt-48 px-4 md:px-8 lg:px-12">
      <div className="inline-flex items-center rounded-md border px-3.5 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-secondary/80 mb-2 bg-blue-100 text-blue-700 border-blue-200">
        <Sparkle className="size-3 fill-white stroke-white drop-shadow" />
        <span className="font-medium ml-2">
          Meet Your New Productivity Partner
        </span>
      </div>

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

export default Hero;
