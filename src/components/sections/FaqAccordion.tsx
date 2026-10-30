"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/content/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <div className="divide-y divide-silver rounded-feature bg-white px-4 shadow-nav sm:px-8">
      {items.map((item, index) => {
        const expanded = open.has(index);
        const buttonId = `faq-button-${index}`;
        const panelId = `faq-panel-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-navy"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-sky transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded} className="pb-6">
              <p className="max-w-3xl leading-relaxed text-graphite">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
