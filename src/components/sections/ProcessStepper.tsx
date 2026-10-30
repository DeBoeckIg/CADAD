"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { ProcessStep } from "@/content/custom-software";

const AUTOPLAY_MS = 2000;

/**
 * Horizontal stepper: every stage is visible at a glance, but only the selected
 * one shows its description. Implemented as an ARIA tablist (arrow keys move
 * between steps).
 *
 * Auto-advances every AUTOPLAY_MS and wraps around, but only while on screen,
 * not hovered or focused, and when motion is allowed.
 */
export function ProcessStepper({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [held, setHeld] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const progress = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 0;

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Re-armed on every step change, so a manual pick also gets the full interval.
  useEffect(() => {
    if (!visible || held) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % steps.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, visible, held, steps.length]);

  const onKeyDown = (event: KeyboardEvent) => {
    const delta = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + steps.length) % steps.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div
      ref={root}
      className="mt-12"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false);
      }}
    >
      <div className="relative">
        <div className="absolute top-5 right-[12.5%] left-[12.5%] h-0.5 bg-white/20" aria-hidden="true">
          <div className="h-full bg-sky-light transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <div role="tablist" aria-label="Etapas del proceso" onKeyDown={onKeyDown} className="relative grid grid-cols-4">
          {steps.map((step, index) => {
            const selected = index === active;
            const reached = index <= active;
            return (
              <button
                key={step.title}
                ref={(el) => {
                  tabs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${index}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className="group flex flex-col items-center gap-3 rounded-card px-1 py-1 text-center"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-lg font-black transition-colors duration-300 ${
                    reached ? "bg-sky-light text-navy" : "bg-blue text-white/60 ring-2 ring-white/25 group-hover:ring-white/60"
                  } ${selected ? "scale-110 shadow-[0_0_0_6px_rgba(125,211,252,0.25)]" : ""}`}
                >
                  {index + 1}
                </span>
                <span
                  className={`text-xs font-semibold transition-colors sm:text-base ${
                    selected ? "text-white" : "text-white/60 group-hover:text-white/85"
                  }`}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        aria-live={held ? "polite" : "off"}
        className="mx-auto mt-10 max-w-2xl text-center"
      >
        <p key={active} className="animate-rise font-display text-2xl leading-snug font-bold text-white sm:text-3xl">
          {steps[active].body}
        </p>
      </div>
    </div>
  );
}
