"use client";
import { CONTENT_FEATURES } from "@/constants/data";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ContentSection: React.FC = () => {
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
  const featureRefs = React.useMemo(
    () =>
      Array.from({ length: CONTENT_FEATURES.length }, () =>
        React.createRef<HTMLDivElement>()
      ),
    []
  );
  const featureInViews = useIntersectionObserver(featureRefs);
  return (
    <section className="bg-gray-100/50 py-24">
      <div className="mx-auto w-full max-w-5xl px-6">
        <motion.div
          ref={refTitle}
          initial={{ opacity: 0, y: 40 }}
          animate={titleAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
            Smart Editor
          </span>
          <h2 className="lg:text-4xl md:text-3xl text-2xl font-semibold tracking-tight text-gray-900">
            Edit, Organize, and Create with Ease
          </h2>
          <p className="text-base lg:text-lg font-normal text-gray-600 leading-7 lg:leading-8 mb-4 mt-4 max-w-prose mx-auto">
            Effortlessly format, embed, and organize your notes with powerful
            tools built for productivity.
          </p>
        </motion.div>

        <div className="border-gray-200 space-y-10 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          {CONTENT_FEATURES.map((feature, index) => {
            const IconComponent = feature.icon;
            const isEven = index % 2 === 0;
            return (
              <motion.div
                ref={featureRefs[index]}
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  featureInViews[index]
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grid sm:grid-cols-5 sm:divide-x sm:divide-gray-200 items-center md:pt-10 pt-0"
              >
                {isEven ? (
                  <>
                    <div className="sm:col-span-2 flex justify-center items-center md:py-8 py-2">
                      <IconComponent className="w-16 h-16 text-blue-600" />
                    </div>
                    <div className="md:mt-6 mt-2 sm:col-span-3 sm:mt-0 sm:border-l sm:border-gray-200 sm:pl-12">
                      <h3 className="text-gray-900 text-xl font-semibold">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 md:my-4 my-0 md:text-base text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="sm:col-span-3 sm:border-r sm:border-gray-200 sm:pr-12">
                      <h3 className="text-gray-900 text-xl font-semibold">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 my-4 md:text-base text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <div className="row-start-1 py-8 flex justify-center items-center sm:col-span-2 sm:row-start-auto">
                      <IconComponent className="w-16 h-16 text-blue-600" />
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
