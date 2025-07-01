"use client";
import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

const CallToAction: React.FC = () => {
  const refCTA = useRef(null);
  const [ctaAnimated, setCtaAnimated] = useState(false);
  useEffect(() => {
    if (!refCTA.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtaAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(refCTA.current);
    return () => observer.disconnect();
  }, []);
  return (
    <motion.div
      ref={refCTA}
      initial={{ opacity: 0, y: 40 }}
      animate={ctaAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7 }}
      className="bg-[#f7f9ff] max-w-5xl mx-auto overflow-hidden rounded-xl py-16 px-8 text-center"
    >
      <div className="mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
          Try Quikmemo for Free Today
        </h3>
        <p className="my-2 text-base font-normal text-gray-600">
          Transform your thoughts into organized notes effortlessly.
        </p>
      </div>
      <Link
        href="/register"
        title="Get Started for free"
        className="px-6 py-4 font-semibold text-white  bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200"
      >
        Start Writing – It&apos;s free
      </Link>
    </motion.div>
  );
};

export default CallToAction;
