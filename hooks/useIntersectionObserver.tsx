"use client";
import { useEffect, useState } from "react";

export function useIntersectionObserver(
  refs: React.RefObject<Element>[],
  options: IntersectionObserverInit = { threshold: 0.1 }
): boolean[] {
  const [inViews, setInViews] = useState<boolean[]>(() =>
    refs.map(() => false)
  );
  useEffect(() => {
    const observers = refs.map((ref, idx) => {
      if (!ref.current) return null;
      const observer = new window.IntersectionObserver(
        ([entry]: IntersectionObserverEntry[]) => {
          if (entry.isIntersecting) {
            setInViews((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            observer.disconnect();
          }
        },
        options
      );
      observer.observe(ref.current);
      return observer;
    });
    return () => {
      observers.forEach((observer) => observer && observer.disconnect());
    };
  }, [refs, options]);
  return inViews;
}
