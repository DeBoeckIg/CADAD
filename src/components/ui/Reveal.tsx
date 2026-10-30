"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: "div" | "li";
  /** Stagger delay in ms (e.g. index * 80 for card grids). */
  delay?: number;
  className?: string;
};

/**
 * Fades + lifts content in once when it enters the viewport.
 *
 * Progressive enhancement: the server renders content visible. After hydration,
 * only elements still below the fold are hidden (via data-reveal) and then
 * revealed by an IntersectionObserver, so there is no flash, no layout shift
 * and nothing stays hidden without JS. Reduced motion skips the effect entirely.
 */
export function Reveal({ children, as: Tag = "div", delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;
  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}
