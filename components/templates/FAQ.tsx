"use client";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { FAQS } from "@/constants/faq";
import Demo from "./Demo";

const FAQ: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="py-16 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <h2 className="lg:text-4xl md:text-3xl text-2xl font-semibold tracking-tight text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-base lg:text-lg font-normal text-gray-600 leading-7 lg:leading-8">
            What you need to know about Quikmemo
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-12 overflow-hidden border border-gray-200 divide-y divide-gray-200 sm:mt-16 rounded-xl">
          {FAQS.map((faq) => (
            <div key={faq.id} role="region">
              <h3>
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={activeId === faq.id}
                  className="flex items-center justify-between w-full px-6 py-5 text-lg font-semibold text-left text-gray-900 sm:p-6"
                >
                  <span>{faq.question}</span>
                  <span className="ml-4 text-white bg-white-300 rounded-full">
                    {activeId === faq.id ? (
                      <Minus className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-blue-500" />
                    )}
                  </span>
                </button>
              </h3>
              {activeId === faq.id && (
                <div>
                  <div className="px-6 pb-6">
                    <p className="text-base text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto mt-8 overflow-hidden text-center bg-gray-100 sm:mt-12 rounded-xl">
          <div className="px-6 py-12 sm:p-12">
            <div className="mx-auto">
              <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                Try Quikmemo for free today
              </h3>
              <p className="mt-2 text-base font-normal text-gray-600">
                Transform your thoughts into organized notes effortlessly.
              </p>
              <div className="mt-1">
                <Link
                  href="#"
                  title="Start Live Chat"
                  className="inline-flex items-center justify-center px-6 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700 mt-7"
                >
                  Start writing – it&apos;s free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
