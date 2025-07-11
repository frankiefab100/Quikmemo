"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { ChevronRight, Sparkle } from "lucide-react";
import Link from "next/link";
import HeroImg from "@/assets/images/quikmemo-dashboard-dark.png";

const Hero: React.FC = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const [inView1, setInView1] = useState(false);
  const [inView2, setInView2] = useState(false);
  const [inView3, setInView3] = useState(false);
  const [inView4, setInView4] = useState(false);

  useEffect(() => {
    if (!ref1.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView1(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref1.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!ref2.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView2(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref2.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!ref3.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView3(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref3.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!ref4.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView4(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref4.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center text-center pt-40 md:pt-48 px-4 md:px-8 lg:px-12">
      <motion.div
        ref={ref1}
        initial={{ opacity: 0, y: 40 }}
        animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center rounded-md border px-3.5 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-secondary/80 mb-2 bg-blue-100 text-blue-700 border-blue-200"
      >
        <Sparkle className="size-3 fill-white stroke-white drop-shadow" />
        <span className="font-medium ml-2">
          Meet Your New Productivity Partner
        </span>
      </motion.div>
      <motion.div
        ref={ref2}
        initial={{ opacity: 0, y: 40 }}
        animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-2 space-y-2"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">
          The Ultimate{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-sky-400">
            Note-Taking
          </span>
          {""} Companion
        </h1>
        <p className="lg:text-lg md:text-md text-base text-gray-500 mb-12 max-w-5xl mx-auto">
          Write down your ideas, inspiration, and organize your tasks
          seamlessly.
        </p>
      </motion.div>
      <motion.button
        ref={ref3}
        initial={{ opacity: 0, y: 40 }}
        animate={inView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="my-10 mx-auto rounded-full px-6 py-3.5 text-white bg-blue-600 hover:bg-blue-700 duration-150"
      >
        <Link href="/register" role="button" className="flex justify-center">
          Try Quikmemo
          <ChevronRight className="h-6 w-6" />
        </Link>
      </motion.button>
      <motion.div
        ref={ref4}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          inView4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-10 max-w-6xl mx-auto rounded-md overflow-hidden"
      >
        <Image
          src={HeroImg}
          alt="QuikMemo Demo"
          width={1400}
          height={900}
          className="object-cover"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
