"use client";
import React, { useRef, useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { FAQS } from "@/constants/data";
import { motion } from "motion/react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const FAQ: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(1);
  const toggleAccordion = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };
  const refTitle = useRef(null);
  const [titleAnimated, setTitleAnimated] = useState(false);
  useEffect(() => {
    if (!refTitle.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(refTitle.current);
    return () => observer.disconnect();
  }, []);
  const faqRefs = React.useMemo(
    () =>
      Array.from({ length: FAQS.length }, () =>
        React.createRef<HTMLDivElement>()
      ),
    []
  );
  const faqInViews = useIntersectionObserver(faqRefs);

  return (
    <section className="py-16">
      <div className="px-4 mx-auto sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        <motion.div
          ref={refTitle}
          initial={{ opacity: 0, y: 40 }}
          animate={titleAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center space-y-2"
        >
          <h2 className="lg:text-4xl md:text-3xl text-2xl font-semibold tracking-tight text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-base lg:text-lg font-normal text-gray-600 leading-7 lg:leading-8">
            What you need to know about Quikmemo
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mt-12 overflow-hidden border border-gray-200 divide-y divide-gray-200 sm:mt-16 rounded-xl">
          {FAQS.map((faq, idx) => (
            <motion.div
              ref={faqRefs[idx]}
              key={faq.id}
              initial={{ opacity: 0, y: 40 }}
              animate={
                faqInViews[idx] ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
              }
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              role="region"
            >
              <h3>
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={activeId === faq.id}
                  className="flex items-center justify-between w-full px-6 py-3 text-lg font-semibold text-left text-gray-900 sm:p-6"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
