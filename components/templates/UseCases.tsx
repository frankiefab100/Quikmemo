import React from "react";
import Image from "next/image";
import Demo from "./Demo";
import { USECASES } from "@/constants/usecases";

const UseCases: React.FC = () => {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="text-center space-y-2 mb-12">
        <h2 className="text-sm uppercase tracking-wider text-blue-600 mb-2">
          A platform for all note-taking needs
        </h2>
        <h3 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-4">
          From draft to detailed documentation
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Whether you&apos;re a writer, student, professional, or anyone in
          between, Quikmemo makes it incredibly simple to get started.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USECASES.map((item, index) => (
            <div
              key={index}
              className="bg-[#f7f9ff] shadow-[0_2px_2px_0_rgba(7, 10, 45, 0.37)] backdrop-blur-[2.5px] border border-gray-200 rounded-md p-4"
            >
              <div className="w-full">
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p className="text-gray-700">{item.description}</p>
              </div>
              <Image
                src={item.photo}
                alt="Plugins"
                width={80}
                height={80}
                className="w-full px-3 pt-6"
              />
            </div>
          ))}
        </div>
      </div>

      <Demo />
    </div>
  );
};

export default UseCases;
