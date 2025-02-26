"use client";
import { FEATURES } from "@/constants/features";
import Placeholder from "../../assets/images/hero-image-light.png";
import { useState } from "react";
import Image from "next/image";

const Features: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-sm uppercase tracking-wider text-blue-600 mb-2">
            Powerful Features
          </h2>
          <h3 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-4">
            You can do more than just taking Notes
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Quikmemo is packed with innovative features designed to empower your
            note-taking experience like never before
          </p>
        </div>
      </div>

      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16 xl:gap-x-24">
          <div className="relative overflow-hidden group lg:order-2">
            <Image
              className="object-cover w-full h-full transition-all duration-200 group-hover:scale-110"
              src={Placeholder}
              alt="SocialProof photo"
            />
          </div>

          <ul className="list-none overflow-hidden divide-y divide-gray-200">
            {FEATURES.map((tab) => (
              <li
                key={tab.id}
                onClick={() => toggleAccordion(tab.id)}
                aria-expanded={activeId === tab.id}
                role="button"
                tabIndex={0}
                className="p-3"
              >
                <div className="flex align-center">
                  <tab.icon className="mr-3 w-5 text-text-primary" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tab.title}
                  </h3>
                </div>

                <div className="flex-1">
                  {activeId === tab.id && (
                    <div className="mt-3 pl-8">
                      <p className="text-base text-gray-600">
                        {tab.description}
                      </p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Features;
