"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { ProductVideoFrame } from "@/components/ui/ProductVideoFrame";
import type { FeatureTab } from "@/content/vetnet";

/**
 * WAI-ARIA tabs: numbered tab row (01–04) above a full-width soft blush
 * block with a compact description card and the module's video. Only the
 * selected tab's video plays; it restarts from 0 each time its tab is selected.
 */
export function VetNetFeatures({ tabs }: { tabs: FeatureTab[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keyMap: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (event.key in keyMap) {
      event.preventDefault();
      focusTab(keyMap[event.key]);
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Módulos de VetNet"
        aria-orientation="horizontal"
        className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 lg:grid-cols-4"
      >
        {tabs.map((tab, index) => {
          const selected = index === active;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`flex items-start gap-3 rounded-card border-l-4 px-4 py-3 text-left transition-colors lg:border-l-0 lg:border-t-4 lg:py-4 ${
                selected
                  ? "border-magenta bg-white text-onyx shadow-nav"
                  : "border-transparent text-graphite hover:bg-white/60 hover:text-onyx"
              }`}
            >
              <span className={`font-display text-xl ${selected ? "font-black text-magenta" : "font-bold text-steel"}`}>
                {tab.number}
              </span>
              <span className={`pt-0.5 text-base leading-snug ${selected ? "font-semibold" : "font-medium"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={index !== active}
          tabIndex={0}
          className="mt-4 rounded-feature bg-blush p-2 ring-1 ring-blush-strong sm:p-4 lg:p-6"
        >
          <div className="grid gap-4 rounded-card bg-white p-4 sm:p-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-8">
            <div>
              <h4 className="font-display text-2xl font-bold text-navy">{tab.title}</h4>
              <p className="mt-2 leading-relaxed text-charcoal">{tab.body}</p>
            </div>
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {tab.points.map((point) => (
                <li
                  key={point}
                  className="inline-flex items-center gap-1.5 rounded-tag bg-blush px-3 py-1 text-sm font-medium text-plum"
                >
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <ProductVideoFrame
            mp4={tab.video.mp4}
            webm={tab.video.webm}
            poster={tab.screenshot.src}
            label={tab.video.label}
            active={index === active}
            className="mt-2 sm:mt-4 lg:mt-6"
          />
        </div>
      ))}
    </div>
  );
}
