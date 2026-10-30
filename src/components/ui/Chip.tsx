import type { ReactNode } from "react";

type Tone = "marigold" | "peach" | "pale-sky" | "white" | "dark" | "outline-light";

const tones: Record<Tone, string> = {
  marigold: "bg-marigold text-onyx",
  peach: "bg-peach text-onyx",
  "pale-sky": "bg-pale-sky text-navy",
  white: "bg-white text-navy",
  dark: "bg-onyx text-white",
  "outline-light": "border border-white/40 text-white",
};

export function Chip({ children, tone = "pale-sky", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-tag px-3 py-1 text-sm font-medium leading-tight ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
