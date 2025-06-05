"use client";
import React, { useCallback, useEffect, useState } from "react";

export default function ComingSoonSection() {
  const launchDate = new Date("Oct 26, 2025 00:00:00").getTime();

  // Memoize with useCallback to avoid unnecessary re-runs of effects after specifying
  // "calculateTimeLeft" in dependency array to prevent exhaustive-deps eslint highlight
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    let diff = launchDate - now;

    if (diff <= 0) {
      const nextMonthDate = new Date();
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
      if (nextMonthDate.getMonth() === 0) {
        nextMonthDate.setFullYear(nextMonthDate.getFullYear() + 1);
      }
      diff = nextMonthDate.getTime() - now;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      days: days < 10 ? `0${days}` : days.toString(),
      hours: hours < 10 ? `0${hours}` : hours.toString(),
      minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
      seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <section className="py-24 relative overflow-x-hidden">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full md:px-16 px-4 rounded-2xl flex flex-col justify-end items-center md:gap-16 gap-10">
          <div className="flex flex-col justify-center items-center gap-10 max-w-3xl w-full">
            <div className="flex flex-col justify-start items-center gap-2.5 px-2">
              <h2 className="text-center text-blue-400 md:text-6xl text-3xl font-bold leading-normal">
                Coming Soon
              </h2>
              <p className="text-center text-gray-500 md:text-base text-sm font-normal leading-relaxed px-2">
                We&apos;re just {timeLeft.days} days away from launching! Reach
                out to us and be part of the journey.
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-2 w-full max-w-md mx-auto">
              {[
                { label: "DAYS", value: timeLeft.days, key: "days" },
                { label: "HRS", value: timeLeft.hours, key: "hours" },
                { label: "MINS", value: timeLeft.minutes, key: "minutes" },
                { label: "SECS", value: timeLeft.seconds, key: "seconds" },
              ].map(({ label, value, key }, i, arr) => (
                <React.Fragment key={key}>
                  <div className="timer flex flex-col gap-0.5 min-w-[48px]">
                    <h3 className="text-center text-gray-800 text-2xl font-bold leading-9">
                      {value}
                    </h3>
                    <p className="text-center text-gray-500 text-xs font-normal leading-normal w-full">
                      {label}
                    </p>
                  </div>
                  {i < arr.length - 1 && (
                    <h3 className="w-3 text-center text-gray-500 text-2xl font-medium leading-9 select-none">
                      :
                    </h3>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-2.5 w-full max-w-md mx-auto px-2">
              <input
                type="text"
                placeholder="Type your mail..."
                className="w-full sm:flex-grow focus:outline-none px-3.5 py-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] text-gray-700 placeholder-gray-400 text-sm font-normal leading-relaxed h-10 rounded-lg border border-gray-200"
              />
              <button className="sm:w-auto w-full px-3.5 py-2 bg-blue-500 hover:bg-blue-600 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0px)] flex justify-center items-center">
                <span className="px-1.5 text-white text-sm font-medium leading-6 whitespace-nowrap">
                  Notify Me
                </span>
              </button>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm font-normal leading-snug mt-6 px-2 max-w-md mx-auto">
            Get in touch with us:{" "}
            <a
              href="mailto:support@quikmemo.com"
              className="hover:text-gray-800 transition-all duration-700 ease-in-out break-words"
            >
              support@quikmemo.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
