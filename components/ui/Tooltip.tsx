"use client";
import type React from "react";
import { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  side = "top",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
  };

  const arrows = {
    top: "bottom-[-5px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent",
    right:
      "left-[-5px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent",
    bottom:
      "top-[-5px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent",
    left: "right-[-5px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {isVisible && (
        <div className={`absolute z-50 ${positions[side]}`}>
          <div className="relative">
            <div className="bg-blue-400 text-white text-base rounded py-1 px-2 whitespace-nowrap">
              {content}
            </div>
            <div
              className={`absolute w-0 h-0 border-4 border-blue-400 ${arrows[side]}`}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
