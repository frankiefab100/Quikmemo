"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
}

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

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  side = "top",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipContainer, setTooltipContainer] = useState<HTMLElement | null>(
    null
  );
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Runs only on client
    let root = document.getElementById("tooltip-root");
    if (!root) {
      root = document.createElement("div");
      root.setAttribute("id", "tooltip-root");
      document.body.appendChild(root);
    }
    setTooltipContainer(root);
  }, []);

  useEffect(() => {
    if (isVisible && childRef.current) {
      const rect = childRef.current.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;

      let top = 0;
      let left = 0;

      switch (side) {
        case "top":
          top = rect.top + scrollY - 8;
          left = rect.left + scrollX + rect.width / 2;
          break;
        case "right":
          top = rect.top + scrollY + rect.height / 2;
          left = rect.right + scrollX + 8;
          break;
        case "bottom":
          top = rect.bottom + scrollY + 8;
          left = rect.left + scrollX + rect.width / 2;
          break;
        case "left":
          top = rect.top + scrollY + rect.height / 2;
          left = rect.left + scrollX - 8;
          break;
      }

      setCoords({ top, left });
    }
  }, [isVisible, side]);

  const tooltipElement =
    isVisible && tooltipContainer
      ? createPortal(
          <div
            style={{
              position: "absolute",
              top: coords.top,
              left: coords.left,
              transform:
                side === "top"
                  ? "translate(-50%, -100%)"
                  : side === "right"
                  ? "translate(0, -50%)"
                  : side === "bottom"
                  ? "translate(-50%, 0)"
                  : "translate(-100%, -50%)",
              zIndex: 9999,
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            <div className="relative">
              <div className="bg-blue-500 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                {content}
              </div>
              <div
                className={`absolute w-0 h-0 border-4 border-blue-500 ${arrows[side]}`}
              />
            </div>
          </div>,
          tooltipContainer
        )
      : null;

  return (
    <div
      className="relative inline-block"
      ref={childRef}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {tooltipElement}
    </div>
  );
};

export default Tooltip;
