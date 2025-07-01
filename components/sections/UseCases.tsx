"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { USECASES } from "@/constants/data";
import { motion } from "motion/react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const UseCases = () => {
  const refTitle = useRef(null);
  const [titleAnimated, setTitleAnimated] = useState(false);
  useEffect(() => {
    if (!refTitle.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
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
  const useCaseRefs = React.useMemo(
    () =>
      Array.from({ length: USECASES.length }, () =>
        React.createRef<HTMLDivElement>()
      ),
    []
  );
  const useCaseInViews = useIntersectionObserver(useCaseRefs);
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
      <motion.div
        ref={refTitle}
        initial={{ opacity: 0, y: 40 }}
        animate={titleAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7 }}
        className="text-center space-y-2 mb-14"
      >
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
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {USECASES.slice(0, 6).map((item, idx) => (
          <motion.div
            ref={useCaseRefs[idx]}
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={
              useCaseInViews[idx] ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.6, delay: idx * 0.1 }}
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
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UseCases;
