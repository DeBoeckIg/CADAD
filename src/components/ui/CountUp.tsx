"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  /** Final text, rendered on the server and kept for screen readers. */
  value: string;
  to: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

const formatter = new Intl.NumberFormat("es-AR");
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * Counts a stat up from 0 when it scrolls into view, once.
 * SSR (and reduced motion, and stats already on screen at hydration) show the
 * final value. A hidden copy of the final text reserves width, so the count
 * never shifts layout; tabular-nums keeps digits from jittering.
 */
export function CountUp({ value, to, prefix = "", suffix = "", durationMs = 1200, className = "" }: CountUpProps) {
  const visualRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const visual = visualRef.current;
    const text = visual?.firstChild;
    if (!visual || !text || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (visual.getBoundingClientRect().top < window.innerHeight) return;

    const render = (n: number) => {
      text.nodeValue = `${prefix}${formatter.format(n)}${suffix}`;
    };
    render(0);

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / durationMs);
          render(Math.round(easeOutCubic(progress) * to));
          if (progress < 1) frame = requestAnimationFrame(tick);
          else text.nodeValue = value;
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(visual);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      text.nodeValue = value;
    };
  }, [value, to, prefix, suffix, durationMs]);

  return (
    <span className={`inline-grid tabular-nums ${className}`}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span ref={visualRef} aria-hidden="true" className="col-start-1 row-start-1">
        {value}
      </span>
    </span>
  );
}
