import Image from "next/image";
import { USECASES } from "@/constants/data";

const UseCases = () => (
  <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
    <div className="text-center space-y-2 mb-14">
      <h2 className="text-sm uppercase tracking-wider text-blue-600 mb-2 font-semibold">
        A platform for all note-taking needs
      </h2>
      <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold tracking-tight text-gray-900 mb-4">
        From draft to detailed documentation
      </h3>
      <p className="text-base lg:text-lg font-normal text-gray-600 leading-7 lg:leading-8">
        Whether you&apos;re a writer, student, professional, or anyone in
        between, Quikmemo makes it incredibly simple to get started.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {USECASES.slice(0, 6).map((item, idx) => (
        <div
          key={idx}
          className={`
            group relative rounded-3xl bg-white shadow-sm transition
            hover:shadow-lg border border-gray-100
            flex flex-col aspect-[4/3] overflow-hidden
            ${idx === 0 ? "bg-blue-50" : idx === 3 ? "bg-blue-100" : "bg-white"}
          `}
        >
          <div className="flex-1 flex flex-col p-6 pb-0">
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <p className="text-gray-700">{item.description}</p>
          </div>
          <div className="flex items-end justify-center h-32 md:h-36 p-6">
            <Image
              src={item.photo}
              alt={item.title}
              width={320}
              height={180}
              className="max-h-full max-w-full drop-shadow-lg"
            />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default UseCases;
