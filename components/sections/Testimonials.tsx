"use client";
import React, { useRef, useEffect, useState } from "react";
import { TESTIMONIALS } from "@/constants/data";
import Image from "next/image";
import QuotationMark from "../../assets/quotation-right-mark.svg";
import { motion } from "motion/react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const Testimonials: React.FC = () => {
  const refTitle = useRef(null);
  const titleInView = useRef(false);
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
  // List refs
  const testimonialRefs = React.useMemo(
    () =>
      Array.from({ length: TESTIMONIALS.length }, () =>
        React.createRef<HTMLLIElement>()
      ),
    []
  );
  const testimonialInViews = useIntersectionObserver(testimonialRefs);
  return (
    <div className="py-14 max-w-screen-xl mx-auto sm:px-6 md:px-8 lg:px-12">
      <motion.div
        ref={refTitle}
        initial={{ opacity: 0, y: 40 }}
        animate={titleAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
        transition={{ duration: 0.7 }}
        className="sm:text-center md:mx-auto"
      >
        <div className="text-center space-y-2 px-4 mx-auto sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold tracking-tight text-gray-900">
            See What Our Community is Saying
          </h3>
          <p className="text-base lg:text-lg font-normal text-gray-600 leading-7 lg:leading-8">
            Don&apos;t just take our word for it
          </p>
        </div>
      </motion.div>
      <div className="mt-12">
        <ul className="p-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item, idx) => (
            <motion.li
              ref={testimonialRefs[idx]}
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={
                testimonialInViews[idx]
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 40 }
              }
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-gray-50 p-4 rounded-xl"
            >
              <Image
                src={QuotationMark}
                className="mb-4"
                width={25}
                height={25}
                alt="quotation mark"
              />
              <figure>
                <blockquote>
                  <p className="text-gray-700 text-sm">{item.quote}</p>
                </blockquote>
                <div className="mt-6 flex items-center gap-x-3">
                  <Image
                    src={item.avatar}
                    className="w-8 h-8 rounded-full"
                    width={10}
                    height={10}
                    alt="customer avatars"
                  />
                  <div>
                    <span className="block text-gray-800 text-sm font-semibold">
                      {item.name}
                    </span>
                    <span className="block text-gray-600 text-xs mt-0.5">
                      {item.title}
                    </span>
                  </div>
                </div>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Testimonials;
